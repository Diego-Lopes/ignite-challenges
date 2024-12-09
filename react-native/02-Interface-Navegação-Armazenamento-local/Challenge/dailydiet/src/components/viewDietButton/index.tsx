import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Content, Description, IconArrowURight, Title } from "./styles";

type ViewDietButtonProps = TouchableOpacityProps & {
  type?: ButtonTypeStyleProps
}

export function ViewDietButton({ type = 'PRIMARY', ...rest }: ViewDietButtonProps) {
  return (
    <Container type={type} activeOpacity={0.7} {...rest}>
     <IconArrowURight type={type} />
      <Content>
        <Title>90,86%</Title>
        <Description>das refeições dentro da dieta</Description>
      </Content>
    </Container>
  );
}