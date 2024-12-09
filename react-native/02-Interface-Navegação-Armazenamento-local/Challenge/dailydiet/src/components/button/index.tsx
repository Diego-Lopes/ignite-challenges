import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Text } from "./styles";

type ButtonProps = TouchableOpacityProps & {}

export function Button({...rest}: ButtonProps) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon weight="bold"/>
      <Text>Nova refeição</Text>
    </Container>
  )
}