export class OrganizationNotExisteError extends Error {
  constructor() {
    super('Not Existe organization.')
  }
}