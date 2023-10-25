import { PanelBuilders, SceneFlexItem, SceneQueryRunner } from '@piggito/scenes';
import React from 'react';

import { DataSourceRef, GraphDrawStyle, TooltipDisplayMode } from '@grafana/schema';

import { overrideToFixedColor, PANEL_STYLES } from '../../../home/Insights';
import { InsightsRatingModal } from '../../RatingModal';

export function getInstancesPercentageByStateScene(datasource: DataSourceRef, panelTitle: string) {
  const query = new SceneQueryRunner({
    datasource,
    queries: [
      {
        refId: 'A',
        expr: 'sum by (alertstate) (ALERTS) / ignoring(alertstate) group_left sum(ALERTS)',
        range: true,
        legendFormat: '{{alertstate}}',
      },
    ],
  });

  return new SceneFlexItem({
    ...PANEL_STYLES,
    body: PanelBuilders.timeseries()
      .setTitle(panelTitle)
      .setDescription('See what percentage of your alert rules are firing versus pending')
      .setData(query)
      .setCustomFieldConfig('drawStyle', GraphDrawStyle.Line)
      .setCustomFieldConfig('fillOpacity', 45)
      .setUnit('percentunit')
      .setMax(1)
      .setOption('tooltip', { mode: TooltipDisplayMode.Multi })
      .setOverrides((b) => b.matchFieldsWithName('firing').overrideColor(overrideToFixedColor('firing')))
      .setHeaderActions(<InsightsRatingModal panel={panelTitle} />)
      .build(),
  });
}
