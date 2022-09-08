import { hexWithOpacity } from 'FederView/renderUtils2D';

export const staticPanelStyles = ({ height, padding }) => ({
  position: 'absolute',
  left: '16px',
  top: '10px',
  width: `${padding[3] + 10}px`,
  'max-height': `${height - 110}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
});

export const clickedPanelStyles = ({ height, padding }) => ({
  position: 'absolute',
  right: '16px',
  top: '10px',
  width: `${padding[1] - 10}px`,
  'max-height': `${height - 20}px`,
  overflow: 'auto',
  borderColor: '#FFFFFF',
  backgroundColor: hexWithOpacity('#000000', 0.6),
});

export const hoveredPanelStyles = ({}) => ({
  position: 'absolute',
  width: '300px',
  paddingLeft: '6px',
  left: 0,
  top: 0,
});
