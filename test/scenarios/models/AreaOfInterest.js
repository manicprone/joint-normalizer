
export default class AreaOfInterest {
  constructor(options = {}) {
    this.model = 'AreaOfInterest';
    this.id = options.id || null;
    this.name = options.name || null;
    this.description = options.description || null;
    this.info = options.info || {};
    this.image_url = options.image_url || null;
    this.owner_id = options.owner_id || null;
    this.is_public = options.is_public || false;
    this.is_shared = options.is_shared || false;
    this.created_by = options.created_by || null;
  }
}
