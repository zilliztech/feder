/* Feder class */
export default class Feder {
  constructor({
    core = {},
    file = '',
    type = '',
    vis = { render: function () {} },
    domContainer,
  } = {}) {
    console.info('feder initialized');
    this.core = core;
    this.vis = vis;
    this.domContainer = domContainer;
    this.vis_records = null;
    this.meta = core.meta;
    this._render();
  }
  update() {
    // update core

    // render
    this._render();
  }
  search() {
    this.vis_records = core.search(target, params);
    this._render();
  }
  reset() {
    this.vis_records = null;
    this._render();
  }
  _render() {
    this.vis.render(this.meta, this.vis_records, this.domContainer);
  }
}
