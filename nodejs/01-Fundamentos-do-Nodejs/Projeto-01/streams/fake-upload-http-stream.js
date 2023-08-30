import { Readable } from 'node:stream'

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

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
})