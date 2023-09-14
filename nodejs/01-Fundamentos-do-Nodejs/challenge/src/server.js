import http from "node:http";
import { routes } from "./routes.js";
import { json } from "./middleware/json.js";
import { extractQueryParams } from "./utils/extract-query-params.js";


const port = 3333;


const server = http.createServer(async (req, res) => {
  const {method, url} = req

  await json(req, res)//implementação stream

  // console.log({method, url}) //tudo certo até aqui.

  //routers
  const route = routes.find(route => {
    // console.log(route);
    return route.method === method && route.path.test(url)
  })

  console.log({route}) //tudo certo até aqui

  if (route) { //validando se route bate com tipo de url de requisição
    const routeParams = req.url.match(route.path)
    console.log({routeParams});

    const { query, ...params } = routeParams.groups

    console.log({query, ...params});
    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end();
});

server.listen(port, () => {
  console.log("Server online port: " + port);
});
