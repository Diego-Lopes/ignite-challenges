import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/appError";
import { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState<string>('')
  
  const navegation = useNavigation()
  
  async function handleNew() {
    try {
      if(group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      await groupCreate(group)

      navegation.navigate('players', { group })
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      } else {
        Alert.alert('Novo grupo', 'Ocorreu um erro ao criar a turma.')
        console.log(error);
      }
      
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