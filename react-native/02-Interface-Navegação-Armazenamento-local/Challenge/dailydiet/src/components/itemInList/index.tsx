import { Container, Divider, IsDiet, Text, Wrapper, } from "./styles";

type ItemInListProps = {
  isDiet?: boolean
  hours: string
  description: string
}

export function ItemInList({ description, hours, isDiet }: ItemInListProps) {
  return (
    <Container>
      <Wrapper>
        <Text>{hours}</Text>
        <Divider />
        <Text isText >{description}</Text>
      </Wrapper>
      <IsDiet isDiet={isDiet} />
    </Container>
  )
}