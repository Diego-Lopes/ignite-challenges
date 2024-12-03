import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  return(
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subTitle="Crie a turma para adicionar as pessoas" />

        <Button title="Criar"/>
      </Content>
    </Container>
  )
}