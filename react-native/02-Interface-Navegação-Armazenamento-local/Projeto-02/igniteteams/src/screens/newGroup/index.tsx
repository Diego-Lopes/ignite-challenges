import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  return(
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subTitle="Crie a turma para adicionar as pessoas" />
        <Input placeholder="Adicione o nome da turma"/>
        <Button title="Criar" style={{ marginTop: 20 }}/>
      </Content>
    </Container>
  )
}