import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type  GroupCardProps = TouchableOpacityProps & {
  title: string

}

export function GroupCard({ title, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon weight="fill"/>
      <Title>{title}</Title>
    </Container>
  )
}