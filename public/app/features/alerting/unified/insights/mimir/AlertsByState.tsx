import { PanelBuilders, SceneFlexItem, SceneQueryRunner } from '@piggito/scenes';
import React from 'react';

import { DataSourceRef, GraphDrawStyle, TooltipDisplayMode } from '@grafana/schema';

import { overrideToFixedColor, PANEL_STYLES } from '../../home/Insights';
import { InsightsRatingModal } from '../RatingModal';

export function getAlertsByStateScene(datasource: DataSourceRef, panelTitle: string) {
  const query = new SceneQueryRunner({
    datasource,
    queries: [
      {
        refId: 'A',
        expr: 'sum by (state) (grafanacloud_instance_alertmanager_alerts)',
        range: true,
        legendFormat: '{{state}}',
      },
    ],
  });

  return new SceneFlexItem({
    ...PANEL_STYLES,
    body: PanelBuilders.timeseries()
      .setTitle(panelTitle)
      .setDescription('A breakdown of all of your firing alert rule instances based on state')
      .setData(query)
      .setCustomFieldConfig('drawStyle', GraphDrawStyle.Line)
      .setOption('tooltip', { mode: TooltipDisplayMode.Multi })
      .setOverrides((b) => b.matchFieldsWithName('active').overrideColor(overrideToFixedColor('active')))
      .setHeaderActions(<InsightsRatingModal panel={panelTitle} />)
      .build(),
  });
}
