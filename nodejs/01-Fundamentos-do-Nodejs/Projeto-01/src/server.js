import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários
// - HTTP
//   - Método HTTP
//   - URL
// GET, POST, PUT, PATCH, DELETE
// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end
// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// JSON - JavaScript Object Notation

//Cabeçalhos (Requisição/resposta) => Metadados (informações para auxiliar os dados enviados da requisição)



const server = http.createServer(async (req, res) => {
  const { method, url } = req
  
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  console.log(route);

  if (route) {
    const routeParams = req.url.match(route.path)

    console.log(routeParams)

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
});

server.listen(3333)
