import { ValueProvider } from 'injection-js';
import {
  NgPackagrOptions as NgPackagrOptionsBase,
  OPTIONS_TOKEN,
} from 'ng-packagr/lib/ng-package/options.di';

export interface NgPackagrOptions extends NgPackagrOptionsBase {
  tailwindConfig?: string;
}

export const nxProvideOptions = (
  options: NgPackagrOptions = {}
): ValueProvider => ({
  provide: OPTIONS_TOKEN,
  useValue: options,
});
