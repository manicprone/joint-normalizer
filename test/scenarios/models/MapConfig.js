
export default class MapConfig {
  constructor(options = {}) {
    this.model = 'MapConfig';
    this.id = options.id || null;
    this.name = options.name || null;
    this.description = options.description || null;
    this.config = options.config || {};
    this.image_url = options.image_url || null;
    this.owner_id = options.owner_id || null;
    this.is_public = options.is_public || false;
    this.is_shared = options.is_shared || false;
    this.created_by = options.created_by || null;
  }
}
