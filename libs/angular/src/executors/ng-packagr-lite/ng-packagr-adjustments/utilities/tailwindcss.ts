import { logger } from '@nrwl/devkit';
import { appRootPath } from '@nrwl/tao/src/utils/app-root';
import { existsSync } from 'fs';
import { join, relative } from 'path';
import * as postcssImport from 'postcss-import';

export function getTailwindPostCssPluginsIfPresent(
  basePath: string,
  tailwindConfig: string,
  includePaths?: string[],
  watch?: boolean
) {
  // Try to find TailwindCSS configuration file in the project or workspace root.
  const tailwindConfigPath = join(appRootPath, tailwindConfig);
  if (!existsSync(tailwindConfigPath)) {
    throw new Error(
      `TailwindCSS configuration file not found at ${tailwindConfigPath}.`
    );
  }

  // Only load Tailwind CSS plugin if configuration file was found.
  if (!tailwindConfigPath) {
    return [];
  }

  let tailwindPackagePath: string | undefined;
  try {
    tailwindPackagePath = require.resolve('tailwindcss');
  } catch {
    const relativeTailwindConfigPath = relative(
      appRootPath,
      tailwindConfigPath
    );
    logger.warn(
      `Tailwind CSS configuration file found (${relativeTailwindConfigPath})` +
        ` but the 'tailwindcss' package is not installed.` +
        ` To enable Tailwind CSS, please install the 'tailwindcss' package.`
    );

    return [];
  }

  if (!tailwindPackagePath) {
    return [];
  }

  if (process.env['TAILWIND_MODE'] === undefined) {
    process.env['TAILWIND_MODE'] = watch ? 'watch' : 'build';
  }

  return [
    postcssImport({
      addModulesDirectories: includePaths ?? [],
      resolve: (url: string) => (url.startsWith('~') ? url.substr(1) : url),
    }),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(tailwindPackagePath)({ config: tailwindConfigPath }),
  ];
}
