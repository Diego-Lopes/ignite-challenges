/** importamos o modulo styled-components  */
import 'styled-components'
/** Chamamos nosso theme */
import { defaultTheme } from '../styles/themes/default'
/** aqui fazendo a partilha de tipagem do nosso theme para uma variável
 * que criamos que pode ser qualquer nome.
 */
type ThemeType = typeof defaultTheme
/** agora fazemos a declaração de tipagem, usamos próprio módulo styled-components
 * para reutilizar os existentes pois nossa declaração sobrescreve o que já existe,
 * feito isso fazemos a adição da nossa tipagem para interface DefaultTheme da lib.
 * desse modo vai conter toda nossa tipagem automaticamente com a nova adição de elementos
 * no defaultTheme.
 */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}
