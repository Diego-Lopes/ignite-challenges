export async function json(req, res) {

  //implementação de leitura do stream com buffer
  const buffers = []

  //depois que ler o arquivo por complete passamos para try
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
    //usando JSON.parse para transformar em um objeto json válido.
  } catch {
    req.body = null
  }

  //devolvendo no formato json
  res.setHeader("Content-type", "application/json")
}