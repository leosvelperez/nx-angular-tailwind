export interface NgPackagrLiteExecutorOptions {
  project: string;
  tailwindConfig?: string;
  tsConfig?: string;
  buildableProjectDepsInPackageJsonType?: 'dependencies' | 'peerDependencies';
  updateBuildableProjectDepsInPackageJson?: boolean;
  watch?: boolean;
}
