import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import * as S from './styles'
export function Transaction() {
  return (
    <S.ContainerTransaction>
      <Header />
      <Summary />
    </S.ContainerTransaction>
  )
}