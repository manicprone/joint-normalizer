export default class Collection {
  constructor(options = {}) {
    this.model = 'Collection';
    this.items = options.items || [];
    this.meta = options.meta || {};
  }
}
