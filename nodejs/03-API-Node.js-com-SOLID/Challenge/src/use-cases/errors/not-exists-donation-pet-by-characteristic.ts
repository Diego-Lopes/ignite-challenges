export class NotExistDonationPetByCharacteristic extends Error {
  constructor() {
    super('Não encontramos nem um amiguinho com caracteristica informada.')
  }
}
