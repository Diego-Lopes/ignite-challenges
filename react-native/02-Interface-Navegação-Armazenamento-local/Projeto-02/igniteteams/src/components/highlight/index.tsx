import { Container, Subtitle, Title } from "./styles";

type HighlightProps = {
  title: string;
  subTitle: string;
}
export function Highlight({ title, subTitle }: HighlightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subTitle}</Subtitle>
    </Container>
  )
}