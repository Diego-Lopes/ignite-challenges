import { Container } from "./styles";

type TitleProps = {
  title: string;
}

export function TitleInList({title}: TitleProps) {
  return (
    <Container>{title}</Container>
  )
}