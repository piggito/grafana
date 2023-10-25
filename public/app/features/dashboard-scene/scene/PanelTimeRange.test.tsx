import { SceneCanvasText, SceneFlexItem, SceneFlexLayout, SceneTimeRange } from '@piggito/scenes';
import { advanceTo, clear } from 'jest-date-mock';

import { dateTime } from '@grafana/data';

import { activateFullSceneTree } from '../utils/test-utils';

import { PanelTimeRange } from './PanelTimeRange';

describe('PanelTimeRange', () => {
  const fakeCurrentDate = dateTime('2019-02-11T19:00:00.000Z').toDate();

  beforeAll(() => {
    advanceTo(fakeCurrentDate);
  });

  afterAll(() => {
    clear();
  });

  it('should apply relative time override', () => {
    const panelTime = new PanelTimeRange({ timeFrom: '2h' });

    buildAndActivateSceneFor(panelTime);

    expect(panelTime.state.value.from.toISOString()).toBe('2019-02-11T17:00:00.000Z');
    expect(panelTime.state.value.to.toISOString()).toBe(fakeCurrentDate.toISOString());
    expect(panelTime.state.value.raw.from).toBe('now-2h');
    expect(panelTime.state.timeInfo).toBe('Last 2 hours');
  });

  it('should apply time shift', () => {
    const panelTime = new PanelTimeRange({ timeShift: '2h' });

    buildAndActivateSceneFor(panelTime);

    expect(panelTime.state.value.from.toISOString()).toBe('2019-02-11T11:00:00.000Z');
    expect(panelTime.state.value.to.toISOString()).toBe('2019-02-11T17:00:00.000Z');
    expect(panelTime.state.timeInfo).toBe(' timeshift -2h');
  });

  it('should apply both relative time and time shift', () => {
    const panelTime = new PanelTimeRange({ timeFrom: '2h', timeShift: '2h' });

    buildAndActivateSceneFor(panelTime);

    expect(panelTime.state.value.from.toISOString()).toBe('2019-02-11T15:00:00.000Z');
    expect(panelTime.state.timeInfo).toBe('Last 2 hours timeshift -2h');
  });
});

function buildAndActivateSceneFor(panelTime: PanelTimeRange) {
  const panel = new SceneCanvasText({ text: 'Hello', $timeRange: panelTime });
  const scene = new SceneFlexLayout({
    $timeRange: new SceneTimeRange({ from: 'now-6h', to: 'now' }),
    children: [new SceneFlexItem({ body: panel })],
  });
  activateFullSceneTree(scene);
}
