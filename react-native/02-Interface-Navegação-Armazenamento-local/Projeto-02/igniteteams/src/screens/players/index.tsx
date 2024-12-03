import { ButtonIcon } from "@components/buttonIcon";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Container } from "./styles";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
      <ButtonIcon />
    </Container>
  )
}