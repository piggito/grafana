import { SceneObject } from '@piggito/scenes';

import { BusEventWithPayload } from '@grafana/data';

export interface DashboardRepeatsProcessedEventPayload {
  source: SceneObject;
}

export class DashboardRepeatsProcessedEvent extends BusEventWithPayload<DashboardRepeatsProcessedEventPayload> {
  public static type = 'dashboard-repeats-processed';
}
