export const sysEnvs = ['local', 'image', 'server'] as const;
export const nodeLifecycleEnvs = ['development', 'test', 'production'] as const;

export type SysEnv = (typeof sysEnvs)[number];
export type NodeLifecycleEnv = (typeof nodeLifecycleEnvs)[number];
export type DeploymentTarget = 'local' | 'docker' | 'aws';
export type NitroPreset = 'node-server' | 'aws-lambda';

export interface ResolvedRuntimeEnvironment {
  sysEnv: SysEnv;
  nodeEnv: NodeLifecycleEnv;
  appEnv: NodeLifecycleEnv;
  deploymentTarget: DeploymentTarget;
  nitroPreset: NitroPreset;
}

const isSysEnv = (value: string): value is SysEnv => sysEnvs.includes(value as SysEnv);

const isNodeLifecycleEnv = (value: string): value is NodeLifecycleEnv =>
  nodeLifecycleEnvs.includes(value as NodeLifecycleEnv);

const sysEnvFromLegacyTarget = (target: string | undefined): SysEnv | undefined => {
  switch (target) {
    case 'local':
      return 'local';
    case 'docker':
      return 'image';
    case 'aws':
      return 'server';
    default:
      return undefined;
  }
};

const nodeEnvFromLegacyAppEnv = (appEnv: string | undefined): NodeLifecycleEnv | undefined => {
  switch (appEnv) {
    case 'local':
    case 'development':
      return 'development';
    case 'test':
      return 'test';
    case 'production':
      return 'production';
    default:
      return undefined;
  }
};

export const parseSysEnv = (value: string | undefined): SysEnv => {
  const normalized = (value || '').trim().toLowerCase();
  return isSysEnv(normalized) ? normalized : 'local';
};

export const parseNodeLifecycleEnv = (value: string | undefined): NodeLifecycleEnv => {
  const normalized = (value || '').trim().toLowerCase();
  return isNodeLifecycleEnv(normalized) ? normalized : 'development';
};

export const deploymentTargetFor = (sysEnv: SysEnv): DeploymentTarget => {
  switch (sysEnv) {
    case 'local':
      return 'local';
    case 'image':
      return 'docker';
    case 'server':
      return 'aws';
    default: {
      const exhaustive: never = sysEnv;
      throw new Error(`Unhandled SYS_ENV: ${exhaustive}`);
    }
  }
};

export const nitroPresetFor = (sysEnv: SysEnv): NitroPreset => {
  switch (sysEnv) {
    case 'local':
    case 'image':
      return 'node-server';
    case 'server':
      return 'aws-lambda';
    default: {
      const exhaustive: never = sysEnv;
      throw new Error(`Unhandled SYS_ENV: ${exhaustive}`);
    }
  }
};

export const resolveRuntimeEnvironment = (
  env: Record<string, string | undefined> = process.env
): ResolvedRuntimeEnvironment => {
  const explicitSys = env.SYS_ENV?.trim();
  const explicitNode = env.NODE_ENV?.trim();
  const sysEnv = isSysEnv((explicitSys || '').toLowerCase())
    ? parseSysEnv(explicitSys)
    : (sysEnvFromLegacyTarget(env.NUXT_PUBLIC_DEPLOYMENT_TARGET) ?? parseSysEnv(explicitSys));
  const nodeEnv = nodeEnvFromLegacyAppEnv(env.NUXT_PUBLIC_APP_ENV) ?? parseNodeLifecycleEnv(explicitNode);

  return {
    sysEnv,
    nodeEnv,
    appEnv: nodeEnv,
    deploymentTarget: deploymentTargetFor(sysEnv),
    nitroPreset: nitroPresetFor(sysEnv),
  };
};
