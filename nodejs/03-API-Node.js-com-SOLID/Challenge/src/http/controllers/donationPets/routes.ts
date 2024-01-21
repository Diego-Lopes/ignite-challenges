import { FastifyInstance } from 'fastify'
import { registerDonationPet } from './register'

/**
 * @param app tipado com FastifyInstance faz com que podemos usar um register do fastify
 */

export async function donationPetRoutes(app: FastifyInstance) {
  app.post('/donationPets', registerDonationPet)
}
