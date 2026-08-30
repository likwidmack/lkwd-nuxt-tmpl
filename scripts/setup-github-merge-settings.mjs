#!/usr/bin/env node
/**
 * Repo merge-button settings for lkwd-nuxt-tmpl.
 *
 * Policy (enforced per-branch via rulesets when available):
 *   - development → PR only; squash + rebase (auto-squash OK)
 *   - main → PR only; auto-merge (squash)
 *
 * Repo-level: squash + rebase on, merge commits off, auto-merge on.
 *
 * Usage:
 *   node scripts/setup-github-merge-settings.mjs
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @returns {Promise<{ code: number, stdout: string, stderr: string }>} */
function gh(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('gh', args, {
      env: process.env,
      shell: process.platform === 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const out = [];
    const err = [];
    child.stdout.on('data', (d) => out.push(d));
    child.stderr.on('data', (d) => err.push(d));
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

export const SQUASH_MERGE_TITLE = 'PR_TITLE';
export const SQUASH_MERGE_MESSAGE = 'BLANK';

async function resolveRepo() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  const res = await gh(['repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner']);
  if (res.code !== 0 || !res.stdout.trim()) {
    throw new Error(`Could not resolve repository.\n${res.stderr}`);
  }
  return res.stdout.trim();
}

async function main() {
  const repo = await resolveRepo();
  console.log(`Configuring pull-request merge settings for ${repo}`);

  const patch = await gh([
    'api',
    `repos/${repo}`,
    '-X',
    'PATCH',
    '-F',
    'allow_squash_merge=true',
    '-F',
    'allow_rebase_merge=true',
    '-F',
    'allow_merge_commit=false',
    '-F',
    'allow_auto_merge=true',
    '-F',
    'delete_branch_on_merge=true',
    '-f',
    `squash_merge_commit_title=${SQUASH_MERGE_TITLE}`,
    '-f',
    `squash_merge_commit_message=${SQUASH_MERGE_MESSAGE}`,
    '--jq',
    '{allow_squash_merge,allow_rebase_merge,allow_merge_commit,allow_auto_merge,delete_branch_on_merge,squash_merge_commit_title,squash_merge_commit_message}',
  ]);
  if (patch.code !== 0) {
    throw new Error(patch.stderr || patch.stdout || 'failed to patch repository settings');
  }
  console.log(patch.stdout.trim());
  console.log('✓ squash + rebase enabled (no merge commits); auto-merge on; squash uses PR title + blank body');
  console.log(
    '  Per-branch: development=PR + squash/rebase (auto-squash); main=PR + auto-merge squash (see gh:setup-rulesets)'
  );
}

const isMain = process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
