// importando data mock
import data from './data.json'

// o nome da função tem que ser qual método http vai ser exposto
export async function GET() {
  // Response é um variável global.
  return Response.json(data.products)
}
