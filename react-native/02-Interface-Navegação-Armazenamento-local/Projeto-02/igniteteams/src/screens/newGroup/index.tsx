import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const navegation = useNavigation()
  function handleNew() {
    navegation.navigate('players', { group: 'time a' })
  }

  return(
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subTitle="Crie a turma para adicionar as pessoas" />
        <Input placeholder="Adicione o nome da turma"/>
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew}/>
      </Content>
    </Container>
  )
}