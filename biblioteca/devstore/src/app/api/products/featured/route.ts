// importando data mock
import data from '../data.json'

// o nome da função tem que ser qual método http vai ser exposto
export async function GET() {
  // delay manual
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  // retornando apenas produtos que tem featured com valor true, produtos em destaques.
  const featuredProducts = data.products.filter((product) => product.featured)

  // Response é um variável global.
  return Response.json(featuredProducts)
}
