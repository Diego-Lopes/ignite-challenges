// fazendo o 1 teste

import { expect, test } from 'vitest'

test('O usuário consegue criar uma nova transação', () => {
  // fazer a chamada http para criar uma nova transação

  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
