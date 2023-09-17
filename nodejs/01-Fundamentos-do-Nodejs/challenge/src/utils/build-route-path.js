// estração de variável :id

export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  );

  console.log(Array.from(path.matchAll(routeParametersRegex)));
  // [ ':id', 'id', index: 7, input: '/users/:id', groups: undefined ]
  console.log({pathWithParams});
  // /users/([a-z0-9-_]+)
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  // const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex
}
