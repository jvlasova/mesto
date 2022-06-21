export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.append(element);
  }
}
