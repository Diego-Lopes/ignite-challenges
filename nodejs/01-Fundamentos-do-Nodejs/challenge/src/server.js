import http from "node:http";
import { routes } from "../routes";
const port = 3333;
const server = http.createServer((req, res) => {
  const {method, url} = req

  console.log(method, url);

  //routers
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  return res.writeHead(200).end("ok");
});

server.listen(port, () => {
  console.log("Server online port: " + port);
});
