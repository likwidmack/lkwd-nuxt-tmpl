import { describe, expect, it } from 'vitest';
import {
  deploymentTargetFor,
  nitroPresetFor,
  parseSysEnv,
  resolveRuntimeEnvironment,
} from '../../shared/utils/runtimeEnvironment';

describe('runtimeEnvironment', () => {
  it('parses SYS_ENV with local default', () => {
    expect(parseSysEnv('server')).toBe('server');
    expect(parseSysEnv(undefined)).toBe('local');
  });

  it('maps SYS_ENV to deployment target and nitro preset', () => {
    expect(deploymentTargetFor('local')).toBe('local');
    expect(deploymentTargetFor('image')).toBe('docker');
    expect(deploymentTargetFor('server')).toBe('aws');
    expect(nitroPresetFor('local')).toBe('node-server');
    expect(nitroPresetFor('server')).toBe('aws-lambda');
  });

  it('resolves house env matrix', () => {
    const resolved = resolveRuntimeEnvironment({
      SYS_ENV: 'image',
      NUXT_PUBLIC_APP_ENV: 'test',
    });
    expect(resolved.sysEnv).toBe('image');
    expect(resolved.appEnv).toBe('test');
    expect(resolved.deploymentTarget).toBe('docker');
    expect(resolved.nitroPreset).toBe('node-server');
  });
});
