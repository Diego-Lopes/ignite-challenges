//Streams ->

/**
 * stdin: entrada de escrita
 * stdout: saída de escrita
 * process.stdin.pipe() entendendo esse comando: "Tudo que estou recebendo como entrada("process.stdin")
 * encaminhar para (.pipe()) uma saída(process.stdout)
 */

// process.stdin.pipe(process.stdout);

/**
 * agora fundamentos de Readable de node:stream
 */

import { Readable, Transform, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    //esse método obrigatório
    //aqui nunca podera está em um formato primitivo string, boolean, float, etc...
    //precisamos trabalhar com buffer
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

//stream de escrita
//stream de escrita vai apenas processar os dados
class MultiplyByTenStream extends Writable {
  //método obrigatório _write, recebe 3 parãmetros

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback(); //callback faz com que encerre
  }
}

//transformando stream com Transform
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
