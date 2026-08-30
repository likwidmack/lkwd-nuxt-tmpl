#!/usr/bin/env node
/**
 * Document and optionally upsert GitHub Rulesets so `development` and `main`
 * only accept changes via pull request (admin bypass still available).
 *
 * Usage:
 *   node scripts/setup-github-rulesets.mjs
 *   APPLY_RULESETS=1 node scripts/setup-github-rulesets.mjs
 *
 * Required status check names must match CI job `name:` fields exactly.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {string[]} args
 * @param {{ input?: string }} [opts]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
function gh(args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('gh', args, {
      env: process.env,
      shell: process.platform === 'win32',
      stdio: opts.input !== undefined ? ['pipe', 'pipe', 'pipe'] : ['ignore', 'pipe', 'pipe'],
    });
    const out = [];
    const err = [];
    child.stdout.on('data', (d) => out.push(d));
    child.stderr.on('data', (d) => err.push(d));
    if (opts.input !== undefined) {
      child.stdin.write(opts.input);
      child.stdin.end();
    }
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({
        code: code ?? 1,
        stdout: Buffer.concat(out).toString('utf8'),
        stderr: Buffer.concat(err).toString('utf8'),
      });
    });
  });
}

async function resolveRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY;
  }
  const res = await gh(['repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner']);
  if (res.code !== 0 || !res.stdout.trim()) {
    throw new Error(
      `Could not resolve repository. Set GITHUB_REPOSITORY=owner/repo or run from a gh-linked clone.\n${res.stderr}`
    );
  }
  return res.stdout.trim();
}

/** Status check names must match `.github/workflows/ci.yml` job `name:` fields. */
export function recommendedRulesets() {
  return [
    {
      name: 'devenv',
      target: 'branch',
      enforcement: 'active',
      conditions: {
        ref_name: {
          include: ['refs/heads/develop*', '~DEFAULT_BRANCH'],
          exclude: [],
        },
      },
      rules: [
        { type: 'deletion' },
        { type: 'non_fast_forward' },
        {
          type: 'pull_request',
          parameters: {
            required_approving_review_count: 0,
            dismiss_stale_reviews_on_push: false,
            require_code_owner_review: false,
            require_last_push_approval: false,
            required_review_thread_resolution: false,
            allowed_merge_methods: ['rebase'],
          },
        },
        {
          type: 'required_status_checks',
          parameters: {
            strict_required_status_checks_policy: true,
            do_not_enforce_on_create: false,
            required_status_checks: [{ context: 'Branch policy' }, { context: 'Regression / test' }],
          },
        },
      ],
      bypass_actors: [{ actor_id: 5, actor_type: 'RepositoryRole', bypass_mode: 'always' }],
    },
    {
      name: 'main',
      target: 'branch',
      enforcement: 'active',
      conditions: {
        ref_name: {
          include: ['refs/heads/main'],
          exclude: [],
        },
      },
      rules: [
        { type: 'deletion' },
        { type: 'non_fast_forward' },
        {
          type: 'pull_request',
          parameters: {
            required_approving_review_count: 0,
            dismiss_stale_reviews_on_push: false,
            require_code_owner_review: false,
            require_last_push_approval: false,
            required_review_thread_resolution: true,
            allowed_merge_methods: ['squash'],
          },
        },
        {
          type: 'required_status_checks',
          parameters: {
            strict_required_status_checks_policy: true,
            do_not_enforce_on_create: false,
            required_status_checks: [
              { context: 'Branch policy' },
              { context: 'Regression / test' },
              { context: 'Playwright e2e' },
            ],
          },
        },
      ],
      bypass_actors: [{ actor_id: 5, actor_type: 'RepositoryRole', bypass_mode: 'always' }],
    },
  ];
}

export function rulesetManualChecklist() {
  return `
Manual GitHub Ruleset checklist (Settings → Rules → Rulesets)
--------------------------------------------------------------
1. development (name: devenv, include refs/heads/develop*)
   - Require a pull request before merging
   - Allowed merge methods: Rebase only
   - Block force pushes / deletions
   - Required status checks (strict): "Branch policy", "Regression / test"
   - Admin bypass allowed

2. main (include refs/heads/main)
   - Require a pull request before merging (PR only)
   - Allowed merge methods: Squash only (auto-merge squash OK)
   - Require conversation resolution
   - Block force pushes / deletions
   - Required status checks (strict): "Branch policy", "Regression / test", "Playwright e2e"
   - Admin bypass allowed

Private GitHub Free may not enable rulesets. Until they do, rely on
.github/workflows/branch-policy.yml and the CI Branch policy job.
Use rebase when merging into development; squash (+ auto-merge) into main.

Do NOT leave unprotected direct push as the default path for development or main.
`.trim();
}

async function listRulesets(repo) {
  const [owner, name] = repo.split('/');
  const res = await gh(['api', `/repos/${owner}/${name}/rulesets`]);
  if (res.code !== 0) {
    console.warn(`⚠ could not list rulesets:\n${res.stderr || res.stdout}`);
    return [];
  }
  try {
    return JSON.parse(res.stdout || '[]');
  } catch {
    return [];
  }
}

async function upsertRuleset(repo, body, existingId) {
  const [owner, name] = repo.split('/');
  if (existingId) {
    const res = await gh(['api', '-X', 'PUT', `/repos/${owner}/${name}/rulesets/${existingId}`, '--input', '-'], {
      input: JSON.stringify(body),
    });
    if (res.code !== 0) {
      throw new Error(`Failed to update ruleset "${body.name}":\n${res.stderr || res.stdout}`);
    }
    console.log(`✓ ruleset "${body.name}" updated (id=${existingId})`);
    return;
  }
  const res = await gh(['api', '-X', 'POST', `/repos/${owner}/${name}/rulesets`, '--input', '-'], {
    input: JSON.stringify(body),
  });
  if (res.code !== 0) {
    throw new Error(`Failed to create ruleset "${body.name}":\n${res.stderr || res.stdout}`);
  }
  console.log(`✓ ruleset "${body.name}" created`);
}

async function main() {
  const repo = await resolveRepo();
  console.log(`GitHub Rulesets for ${repo}\n`);
  console.log(rulesetManualChecklist());
  console.log('');

  const existing = await listRulesets(repo);
  if (existing.length) {
    console.log('Current rulesets:');
    for (const r of existing) {
      console.log(`  - ${r.name} (id=${r.id}, enforcement=${r.enforcement}, target=${r.target})`);
    }
  } else {
    console.log('No rulesets returned (missing admin scope, Free plan limits, or none configured).');
  }

  if (process.env.APPLY_RULESETS !== '1') {
    console.log(`
Dry-run only. To create missing development/main rulesets:

  APPLY_RULESETS=1 npm run gh:setup-rulesets

Documented in docs/engineering/cicd.md
`);
    return;
  }

  const recommended = recommendedRulesets();
  for (const body of recommended) {
    const match = existing.find((r) => r.name === body.name && r.target === body.target);
    if (match) {
      console.log(
        `ℹ ruleset "${body.name}" already exists (id=${match.id}) — not overwriting. Verify checklist in UI.`
      );
      continue;
    }
    try {
      await upsertRuleset(repo, body, undefined);
    } catch (err) {
      console.warn(`⚠ ${err.message || err}`);
      console.warn('  Apply this ruleset manually via the checklist above.');
    }
  }
}

const isMain = process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
