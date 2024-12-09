import { Header } from "@components/header";
import { ViewDietButton } from "@components/viewDietButton";
import { Container, Content } from "./styles";

export function HomeScreen() {
  return (
    <Container>
      <Header />
      <Content>
        <ViewDietButton type="PRIMARY"  />
      </Content>
    </Container>
  );
}