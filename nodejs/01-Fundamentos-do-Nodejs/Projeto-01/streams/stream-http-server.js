import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer((req, res) => {
  return req.pipe(new InverseNumberStream()).pipe(res)
})

const server1 = http.createServer(async (req, res) => {
  const buffers = []
  console.log('Iniciado o recebimento do dado em stream...');

  for await (const chunk of req) {
    console.log('Recebendo dados da stream...');

    buffers.push(chunk)
  }
  console.log('Finalizado o recebimento do dado stream...');

  const fullStreamContent = Buffer.concat(buffers)

  console.log(fullStreamContent);

  return res.end(fullStreamContent)

  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server1.listen(3334);
