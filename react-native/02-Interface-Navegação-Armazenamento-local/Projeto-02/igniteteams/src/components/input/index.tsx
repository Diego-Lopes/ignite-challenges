import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

type InputPros = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({inputRef, ...rest }: InputPros) {
  const { COLORS } = useTheme()

  return (
    <Container 
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest} 
    />
  )
}