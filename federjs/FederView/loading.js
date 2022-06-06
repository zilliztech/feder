import * as d3 from 'd3';

const loadingSvgId = 'feder-loading';
const loadingWidth = 30;
const loadingStrokeWidth = 6;

export const initLoadingStyle = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
      @keyframes rotation {
        from {
          transform: translate(${loadingWidth / 2}px,${
    loadingWidth / 2
  }px) rotate(0deg);
        }
        to {
          transform: translate(${loadingWidth / 2}px,${
    loadingWidth / 2
  }px) rotate(359deg);
        }
      }
      .rotate {
        animation: rotation 2s infinite linear;
      }
    `;
  document.getElementsByTagName('head').item(0).appendChild(style);
};

export const renderLoading = (domNode, width, height) => {
  const dom = d3.select(domNode);
  // const { width, height } = dom.node().getBoundingClientRect();
  if (!dom.select(`#${loadingSvgId}`).empty()) return;
  const svg = dom
    .append('svg')
    .attr('id', loadingSvgId)
    .attr('width', loadingWidth)
    .attr('height', loadingWidth)
    .style('position', 'absolute')
    .style('left', width / 2 - loadingWidth / 2)
    .style('bottom', height / 2 - loadingWidth / 2)
    .style('overflow', 'visible');

  const defsG = svg.append('defs');
  const linearGradientId = `feder-loading-gradient`;
  const linearGradient = defsG
    .append('linearGradient')
    .attr('id', linearGradientId)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 1);
  linearGradient
    .append('stop')
    .attr('offset', '0%')
    .style('stop-color', '#1E64FF');
  linearGradient
    .append('stop')
    .attr('offset', '100%')
    .style('stop-color', '#061982');

  const loadingCircle = svg
    .append('circle')
    .attr('cx', loadingWidth / 2)
    .attr('cy', loadingWidth / 2)
    .attr('fill', 'none')
    .attr('r', loadingWidth / 2)
    .attr('stroke', '#1E64FF')
    .attr('stroke-width', loadingStrokeWidth);

  const semiCircle = svg
    .append('path')
    .attr(
      'd',
      `M0,${-loadingWidth / 2} a ${loadingWidth / 2} ${
        loadingWidth / 2
      } 0 1 1 ${0} ${loadingWidth}`
    )
    .attr('fill', 'none')
    // .style('transform', ``)
    .attr('stroke', `url(#${linearGradientId})`)
    .attr('stroke-width', loadingStrokeWidth)
    .classed('rotate', true);
};

export const finishLoading = (domNode) => {
  const dom = d3.select(domNode);
  dom.selectAll(`#${loadingSvgId}`).remove();
};
