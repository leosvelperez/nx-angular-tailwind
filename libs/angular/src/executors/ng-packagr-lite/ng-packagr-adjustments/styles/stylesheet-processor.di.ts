import { FactoryProvider, InjectionToken } from 'injection-js';
import { StylesheetProcessor } from './stylesheet-processor';

export const NX_STYLESHEET_PROCESSOR_TOKEN =
  new InjectionToken<StylesheetProcessor>(`nx.v1.stylesheetProcessor`);

export const NX_STYLESHEET_PROCESSOR: FactoryProvider = {
  provide: NX_STYLESHEET_PROCESSOR_TOKEN,
  useFactory: () => StylesheetProcessor,
  deps: [],
};
