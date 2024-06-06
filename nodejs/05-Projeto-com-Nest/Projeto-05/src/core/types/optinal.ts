/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 *
 * @description
 *
 * faz com que passamos quais propriedades deixamos opcionais,
 * depois que passamos interface de referencia podemos escolher
 * qualquer um como opcional
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
