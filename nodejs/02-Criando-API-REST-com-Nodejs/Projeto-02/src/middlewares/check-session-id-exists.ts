import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    // se não exister retornar erro de não autorizado.
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }
}
