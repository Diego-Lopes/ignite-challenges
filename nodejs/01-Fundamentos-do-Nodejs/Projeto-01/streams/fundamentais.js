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

import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    //esse método obrigatório
    //aqui nunca podera está em um formato primitivo string, boolean, float, etc...
    //precisamos trabalhar com buffer
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
  }
}

new OneToHundredStream().pipe(process.stdout)
