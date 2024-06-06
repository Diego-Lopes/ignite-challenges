import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('Error')
  }
}

test('success result', () => {
  const result = doSomething(true)
  if (result.isRight()) {
    console.log(result.value)
  }

  // criamos métodos auxiliares na classe para facilitar nossa lógica aqui.
  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})

test('error result', () => {
  const result = doSomething(false)
  // criamos métodos auxiliares na classe para facilitar nossa lógica aqui.
  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})
