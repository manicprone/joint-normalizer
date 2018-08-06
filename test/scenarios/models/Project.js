
export default class Project {
  constructor(options = {}) {
    this.model = 'Project';
    this.id = options.id || null;
    this.name = options.name || null;
    this.alias = options.alias || null;
    this.description = options.description || null;
    this.image_url = options.image_url || null;
    this.owner_id = options.owner_id || null;
    this.is_public = options.is_public || false;
  }
}
