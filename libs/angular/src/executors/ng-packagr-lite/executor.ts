import * as ng from '@angular/compiler-cli';
import type { ExecutorContext } from '@nrwl/devkit';
import { readCachedProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies,
  updatePaths,
} from '@nrwl/workspace/src/utilities/buildable-libs-utils';
import { NgPackagr } from 'ng-packagr';
import { resolve } from 'path';
import { from } from 'rxjs';
import { eachValueFrom } from 'rxjs-for-await';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { NX_ENTRY_POINT_PROVIDERS } from './ng-packagr-adjustments/entry-point.di';
import { nxProvideOptions } from './ng-packagr-adjustments/options.di';
import {
  NX_PACKAGE_PROVIDERS,
  NX_PACKAGE_TRANSFORM,
} from './ng-packagr-adjustments/package.di';
import { NgPackagrLiteExecutorOptions } from './schema';

export async function* ngPackagrLiteExecutor(
  options: NgPackagrLiteExecutorOptions,
  context: ExecutorContext
) {
  const { target, dependencies } = calculateProjectDependencies(
    readCachedProjectGraph(),
    context.root,
    context.projectName,
    context.targetName,
    context.configurationName
  );
  if (
    !checkDependentProjectsHaveBeenBuilt(
      context.root,
      context.projectName,
      context.targetName,
      dependencies
    )
  ) {
    return Promise.resolve({ success: false });
  }

  function updatePackageJson(): void {
    if (
      dependencies.length > 0 &&
      options.updateBuildableProjectDepsInPackageJson
    ) {
      updateBuildableProjectPackageJsonDependencies(
        context.root,
        context.projectName,
        context.targetName,
        context.configurationName,
        target,
        dependencies,
        options.buildableProjectDepsInPackageJsonType
      );
    }
  }

  if (options.watch) {
    return yield* eachValueFrom(
      from(initializeNgPackgrLite(options, context, dependencies)).pipe(
        switchMap((packagr) => packagr.watch()),
        tap(() => updatePackageJson()),
        mapTo({ success: true })
      )
    );
  }

  return from(initializeNgPackgrLite(options, context, dependencies))
    .pipe(
      switchMap((packagr) => packagr.build()),
      tap(() => updatePackageJson()),
      mapTo({ success: true })
    )
    .toPromise();
}

export default ngPackagrLiteExecutor;

async function initializeNgPackgrLite(
  options: NgPackagrLiteExecutorOptions,
  context: ExecutorContext,
  projectDependencies: DependentBuildableProjectNode[]
): Promise<NgPackagr> {
  const packager = new NgPackagr([
    // Add default providers to this list.
    ...NX_PACKAGE_PROVIDERS,
    ...NX_ENTRY_POINT_PROVIDERS,
    nxProvideOptions({
      tailwindConfig: options.tailwindConfig,
      watch: options.watch,
    }),
  ]);
  packager.forProject(resolve(context.root, options.project));
  packager.withBuildTransform(NX_PACKAGE_TRANSFORM.provide);

  if (options.tsConfig) {
    // read the tsconfig and modify its path in memory to
    // pass it on to ngpackagr
    const parsedTSConfig = ng.readConfiguration(options.tsConfig);
    updatePaths(projectDependencies, parsedTSConfig.options.paths);
    packager.withTsConfig(parsedTSConfig);
  }

  return packager;
}
