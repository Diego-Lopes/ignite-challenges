export class OrganizationNotExisteError extends Error {
  constructor() {
    super('Not Exists organization.')
  }
}
