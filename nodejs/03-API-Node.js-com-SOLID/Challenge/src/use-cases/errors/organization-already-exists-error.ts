export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
