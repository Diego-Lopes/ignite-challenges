import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState<string>('')
  
  const navegation = useNavigation()
  
  async function handleNew() {
    try {
      await groupCreate(group)

      navegation.navigate('players', { group })
    } catch (error) {
      console.log(error);
      
    }
   
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight 
          title="Nova turma" 
          subTitle="Crie a turma para adicionar as pessoas" 
        />
        <Input 
          placeholder="Adicione o nome da turma"
          onChangeText={setGroup}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}