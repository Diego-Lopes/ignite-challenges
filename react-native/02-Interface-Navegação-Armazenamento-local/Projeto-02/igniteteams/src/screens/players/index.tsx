import { ButtonIcon } from "@components/buttonIcon";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { Container, Form } from "./styles";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
     <Form>
      <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
          
        />
      <ButtonIcon icon="add" />
     </Form>
    </Container>
  )
}