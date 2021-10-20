import { InjectionToken, Provider } from 'injection-js';
import type { Transform } from 'ng-packagr/lib/graph/transform';
import { transformFromPromise } from 'ng-packagr/lib/graph/transform';
import { provideTransform } from 'ng-packagr/lib/graph/transform.di';
import {
  isEntryPoint,
  isEntryPointInProgress,
} from 'ng-packagr/lib/ng-package/nodes';
import {
  NgPackagrOptions,
  OPTIONS_TOKEN,
} from 'ng-packagr/lib/ng-package/options.di';
import { compileSourceFiles } from 'ng-packagr/lib/ngc/compile-source-files';
import { setDependenciesTsConfigPaths } from 'ng-packagr/lib/ts/tsconfig';
import * as path from 'path';
import * as ts from 'typescript';
import { StylesheetProcessor as StylesheetProcessorClass } from './styles/stylesheet-processor';
import {
  NX_STYLESHEET_PROCESSOR,
  NX_STYLESHEET_PROCESSOR_TOKEN,
} from './styles/stylesheet-processor.di';

export const nxCompileNgcTransformFactory = (
  StylesheetProcessor: typeof StylesheetProcessorClass,
  options: NgPackagrOptions
): Transform => {
  return transformFromPromise(async (graph) => {
    const entryPoint = graph.find(isEntryPointInProgress());
    const entryPoints = graph.filter(isEntryPoint);
    // Add paths mappings for dependencies
    const tsConfig = setDependenciesTsConfigPaths(
      entryPoint.data.tsConfig,
      entryPoints
    );

    // Compile TypeScript sources
    const { esm2015, declarations } = entryPoint.data.destinationFiles;
    const { moduleResolutionCache } = entryPoint.cache;
    const { basePath, cssUrl, styleIncludePaths } = entryPoint.data.entryPoint;
    const stylesheetProcessor = new StylesheetProcessor(
      basePath,
      options,
      cssUrl,
      styleIncludePaths
    );

    await compileSourceFiles(
      graph,
      tsConfig,
      moduleResolutionCache,
      stylesheetProcessor as any,
      {
        outDir: path.dirname(esm2015),
        declarationDir: path.dirname(declarations),
        declaration: true,
        target: ts.ScriptTarget.ES2015,
      }
    );

    return graph;
  });
};

export const NX_COMPILE_NGC_TOKEN = new InjectionToken<Transform>(
  `nx.v1.compileNgc`
);

export const NX_COMPILE_NGC_TRANSFORM = provideTransform({
  provide: NX_COMPILE_NGC_TOKEN,
  useFactory: nxCompileNgcTransformFactory,
  deps: [NX_STYLESHEET_PROCESSOR_TOKEN, OPTIONS_TOKEN],
});

export const NX_COMPILE_NGC_PROVIDERS: Provider[] = [
  NX_STYLESHEET_PROCESSOR,
  NX_COMPILE_NGC_TRANSFORM,
];
