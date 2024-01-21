export class NotExistDonationPetByCity extends Error {
  constructor() {
    super('Não encontramos nem um amiguinho para cidade informada.')
  }
}
