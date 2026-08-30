import { existsSync } from 'node:fs';

const shouldInstall =
  process.env.HUSKY !== '0' && process.env.NODE_ENV !== 'production' && process.env.CI !== 'true' && existsSync('.git');

if (shouldInstall) {
  const husky = (await import('husky')).default;
  const message = husky();
  if (message) console.log(message);
}
