import { hexWithOpacity } from 'FederView/renderUtils2D';

export const staticPanelStyles = ({
  height,
  staticPanelWidth,
}: {
  height: number;
  staticPanelWidth?: number;
}) => ({
  position: 'absolute',
  left: '16px',
  top: '16px',

  width: `${staticPanelWidth}px`,
  'max-height': `${height - 110}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
  // pointerEvents: 'none',
});

export const clickedPanelStyles = ({
  height,
  clickedPanelWidth,
}: {
  height: number;
  clickedPanelWidth?: number;
}) => ({
  position: 'absolute',
  right: '16px',
  top: '16px',
  width: `${clickedPanelWidth}px`,
  'max-height': `${height - 60}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
});

export const hoveredPanelStyles = ({
  hoveredPanelWidth,
}: {
  hoveredPanelWidth: number;
}) => ({
  position: 'absolute',
  width: `${hoveredPanelWidth}px`,
  paddingLeft: '6px',
  left: 0,
  top: 0,
  // pointerEvents: 'none',
});
