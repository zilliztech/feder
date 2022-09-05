export const defaultTInfoPanelStyles = {
  position: 'absolute',
};

export const cssDefinition = `
.panel-border {
  border-style: dashed;
  border-width: 1px;
}
.panel {
  padding: 6px 8px;
  font-size: 12px;
}
.hide {
  opacity: 0;
}
.panel-item {
  margin-bottom: 6px;
}
.panel-img {
  width: 150px;
  height: 100px;
  background-size: cover;
  margin-bottom: 12px;
  border-radius: 4px;
}
.panel-item-display-flex {
  display: flex;
}
.panel-item-title {
  font-weight: 600;
  margin-bottom: 3px;
}
.panel-item-text {
  font-weight: 400;
  font-size: 10px;
  word-break: break-all;
}
.panel-item-text-flex {
  margin-left: 8px;
}
.panel-item-text-margin {
  margin: 0 6px;
}
.text-no-wrap {
  white-space: nowrap;
}
.panel-img-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;
}
.panel-img-gallery-item {
  width: 100%;
  height: 44px;
  background-size: cover;
  border-radius: 2px;
}
.panel-item-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  // pointer-events: auto;
}
.panel-item-option-icon {
  width: 6px;
  height: 6px;
  border-radius: 7px;
  border: 2px solid #FFFC85;
  margin-left: 2px;
}
.panel-item-option-icon-active {
  background-color: #FFFC85;
}
.panel-item-option-label {
  margin-left: 6px;
}
`;

export const defaultInfoPanelStyles_Overview = {};

export const defaultTInfoPanelStyles_Detail = {};

export const defaultTInfoPanelStyles_Tooltip = {};
