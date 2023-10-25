import { VariableCustomFormatterFn } from '@piggito/scenes';

import { ScopedVars } from '@grafana/data';

export interface MacroHandler {
  (
    match: string,
    fieldPath: string | undefined,
    scopedVars: ScopedVars | undefined,
    format: string | VariableCustomFormatterFn | undefined
  ): string;
}
