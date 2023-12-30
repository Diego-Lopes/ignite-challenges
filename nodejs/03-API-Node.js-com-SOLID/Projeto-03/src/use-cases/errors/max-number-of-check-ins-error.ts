export class MaxNumberOfCheckInsEror extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
