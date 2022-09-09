import * as d3 from 'd3';
import clearCanvas from 'FederView/clearCanvas';
import IvfflatSearchView, { EStepType } from '.';
import transitionClustersExit from './transitionClustersExit';
import transitionNodesEnter from './transitionNodesEnter';
import transitionNodesMove from './transitionNodesMove';
import transitionTargetMove from './transitionTargetMove';
import transitionPolarAxisEnter from './transtionPolarAxisEnter';
import updateStaticPanel from './updateStaticPanel';

export default function switchView(
  this: IvfflatSearchView,
  newStepType: EStepType
) {
  console.log('switch view:', this.stepType, '=>', newStepType);
  if (newStepType === this.stepType) return;

  this.mouseLeaveHandler = null;
  this.mouseMoveHandler = null;
  this.mouseClickHandler = null;

  updateStaticPanel.call(this, newStepType);

  const {
    transitionClustersExitTime,
    transitionReplaceTime,
    transitionNodesEnterTime,
    transitionNodesMoveTime,
  } = this.viewParams;

  const allTime =
    transitionClustersExitTime +
    transitionReplaceTime +
    transitionNodesEnterTime;

  if (newStepType === EStepType.voronoi) {
    // node => voronoi
    const timer = d3.timer((elapsed) => {
      if (elapsed > allTime) {
        timer.stop();
        this.stepType = newStepType;
        this.initVoronoiView();
      } else {
        clearCanvas.call(this);
        // nodes exit and clusters enter
        const reverse = true;
        transitionClustersExit.call(
          this,
          elapsed - transitionNodesEnterTime,
          reverse
        );
        this.stepType === EStepType.polar &&
          transitionPolarAxisEnter.call(this, elapsed, reverse);
        transitionNodesEnter.call(this, elapsed, this.stepType, reverse);
        transitionTargetMove.call(
          this,
          elapsed,
          transitionNodesEnterTime,
          this.stepType,
          EStepType.polar
        );
        transitionTargetMove.call(
          this,
          elapsed - transitionNodesEnterTime,
          transitionReplaceTime,
          EStepType.polar,
          EStepType.polar
        );
        transitionTargetMove.call(
          this,
          elapsed - transitionNodesEnterTime - transitionReplaceTime,
          transitionClustersExitTime,
          EStepType.polar,
          newStepType
        );
      }
    });
  } else if (this.stepType === EStepType.voronoi) {
    // voronoi => node
    const timer = d3.timer((elapsed) => {
      if (elapsed > allTime) {
        timer.stop();
        this.stepType = newStepType;
        this.initNodesView();
      } else {
        clearCanvas.call(this);
        transitionClustersExit.call(this, elapsed);
        newStepType === EStepType.polar &&
          transitionPolarAxisEnter.call(
            this,
            elapsed - transitionClustersExitTime - transitionReplaceTime
          );
        transitionNodesEnter.call(
          this,
          elapsed - transitionClustersExitTime,
          newStepType
        );
        transitionTargetMove.call(
          this,
          elapsed,
          transitionClustersExitTime,
          this.stepType,
          EStepType.polar
        );
        transitionTargetMove.call(
          this,
          elapsed - transitionClustersExitTime,
          transitionReplaceTime,
          EStepType.polar,
          EStepType.polar
        );
        transitionTargetMove.call(
          this,
          elapsed - transitionClustersExitTime - transitionReplaceTime,
          transitionNodesEnterTime,
          EStepType.polar,
          newStepType
        );
      }
    });
  } else {
    // node => node
    const timer = d3.timer((elapsed) => {
      if (elapsed > transitionNodesMoveTime) {
        timer.stop();
        this.stepType = newStepType;
        this.initNodesView();
      } else {
        clearCanvas.call(this);
        transitionPolarAxisEnter.call(
          this,
          elapsed,
          newStepType === EStepType.project
        );
        transitionNodesMove.call(this, elapsed);
        transitionTargetMove.call(
          this,
          elapsed,
          transitionClustersExitTime,
          this.stepType,
          newStepType
        );
      }
    });
  }
}
