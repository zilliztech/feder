import { hexWithOpacity } from 'FederView/renderUtils2D';

export const staticPanelStyles = ({ width, height, padding }) => ({
  position: 'absolute',
  left: '16px',
  top: '16px',
  width: padding ? `${padding[3] + 10}px` : `${width * 0.3}px`,
  'max-height': `${height - 110}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
  pointerEvents: 'none',
});

export const clickedPanelStyles = ({ width, height, padding }) => ({
  position: 'absolute',
  right: '16px',
  top: '16px',
  width: padding ? `${padding[1] - 10}px` : `${width * 0.3}px`,
  'max-height': `${height - 60}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
});

export const hoveredPanelStyles = ({ width }) => ({
  position: 'absolute',
  width: `${width * 0.3}px`,
  paddingLeft: '6px',
  left: 0,
  top: 0,
  pointerEvents: 'none',
  backgroundColor: hexWithOpacity('#000000', 0.6),
});
