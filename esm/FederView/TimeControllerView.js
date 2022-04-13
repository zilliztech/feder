import * as d3 from 'd3';

const iconGap = 10;
const rectW = 36;
const sliderBackGroundWidth = 200;
const sliderWidth = sliderBackGroundWidth * 0.8;
const sliderHeight = rectW * 0.15;
const sliderBarWidth = 10;
const sliderBarHeight = rectW * 0.6;
const resetW = 16;
const resetIconD = `M12.3579 13.0447C11.1482 14.0929 9.60059 14.6689 7.99992 14.6667C4.31792 14.6667 1.33325 11.682 1.33325 8.00004C1.33325 4.31804 4.31792 1.33337 7.99992 1.33337C11.6819 1.33337 14.6666 4.31804 14.6666 8.00004C14.6666 9.42404 14.2199 10.744 13.4599 11.8267L11.3333 8.00004H13.3333C13.3332 6.77085 12.9085 5.57942 12.131 4.6273C11.3536 3.67519 10.2712 3.02084 9.06681 2.77495C7.86246 2.52906 6.61014 2.70672 5.5217 3.27788C4.43327 3.84905 3.57553 4.77865 3.0936 5.90943C2.61167 7.04021 2.53512 8.30275 2.87691 9.48347C3.2187 10.6642 3.95785 11.6906 4.96931 12.3891C5.98077 13.0876 7.20245 13.4152 8.42768 13.3166C9.65292 13.218 10.8065 12.6993 11.6933 11.848L12.3579 13.0447Z`;

export class TimeControllerView {
  constructor(dom) {
    this.render(dom);
    this.moveSilderBar = () => {};
  }
  render(dom) {
    const svg = d3
      .select(`#${dom.id}`)
      .append('svg')
      .attr('width', 300)
      .attr('height', 100)
      .style('position', 'absolute')
      .style('left', '40px')
      .style('bottom', '12px');
    // .style('border', '1px solid red');

    const playPauseG = svg.append('g');
    playPauseG
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', rectW)
      .attr('height', rectW)
      .attr('fill', '#fff');
    playPauseG
      .append('path')
      .attr(
        'd',
        `M${rectW * 0.36},${rectW * 0.3}L${rectW * 0.64},${rectW * 0.5}L${
          rectW * 0.36
        },${rectW * 0.7}Z`
      )
      .attr('fill', '#000');

    const sliderG = svg
      .append('g')
      .attr('transform', `translate(${rectW + iconGap}, 0)`);
    sliderG
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', sliderBackGroundWidth)
      .attr('height', rectW)
      .attr('fill', '#1D2939');
    sliderG
      .append('rect')
      .attr('x', sliderBackGroundWidth / 2 - sliderWidth / 2)
      .attr('y', rectW / 2 - sliderHeight / 2)
      .attr('width', sliderWidth)
      .attr('height', sliderHeight)
      .attr('fill', '#fff');
    const sliderBar = sliderG
      .append('g')
      .append('rect')
      .datum({ x: 0, y: 0 })
      .attr(
        'transform',
        `translate(${
          sliderBackGroundWidth / 2 - sliderWidth / 2 - sliderBarWidth / 2
        },0)`
      )
      .attr('x', 0)
      .attr('y', rectW / 2 - sliderBarHeight / 2)
      .attr('width', sliderBarWidth)
      .attr('height', sliderBarHeight)
      .attr('fill', '#fff');

    const resetG = svg
      .append('g')
      .attr(
        'transform',
        `translate(${rectW + iconGap + sliderBackGroundWidth + iconGap}, 0)`
      );
    resetG
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', rectW)
      .attr('height', rectW)
      .attr('fill', '#fff');

    resetG
      .append('path')
      .attr('d', resetIconD)
      .attr('fill', '#000')
      .attr(
        'transform',
        `translate(${rectW / 2 - resetW / 2},${rectW / 2 - resetW / 2})`
      );

    this.playPauseG = playPauseG;
    this.sliderBar = sliderBar;
    this.resetG = resetG;
  }

  setTimer(timer) {
    this.playPauseG.on('click', () => timer.playPause());
    this.resetG.on('click', () => timer.restart());

    const drag = d3
      .drag()
      .on('start', () => timer.stop())
      .on('drag', (e, d) => {
        const x = Math.max(0, Math.min(e.x, sliderWidth));
        sliderBar.attr('x', (d.x = x));
        timer.setTimeP(x / sliderWidth);
      });
    // .on('end', continue);

    const sliderBar = this.sliderBar;
    sliderBar.call(drag);

    this.moveSilderBar = (p) => {
      const x = p * sliderWidth;
      sliderBar.datum().x = x;
      sliderBar.attr('x', x);
    };
  }
}

export default TimeControllerView;
