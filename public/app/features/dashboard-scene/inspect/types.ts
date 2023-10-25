import { SceneObject, SceneObjectState } from '@piggito/scenes';

import { InspectTab } from 'app/features/inspector/types';

export interface SceneInspectTab<T extends SceneObjectState = SceneObjectState> extends SceneObject<T> {
  getTabValue(): InspectTab;
  getTabLabel(): string;
}
