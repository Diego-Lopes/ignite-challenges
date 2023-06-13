import {
  BoxInfo,
  Button,
  CardContainer,
  CardContent,
  Img,
} from "@/styles/components/card";
import camisa from "./assets/Card2.png";
export function Card() {
  return (
    <CardContainer>
      <CardContent>
        <Img src={camisa} alt="" width={101} height={93} quality={100} />
        <BoxInfo>
          <p>Camiseta Beyond the Limits</p>
          <span>R$ 79,90</span>
          <Button>Remover</Button>
        </BoxInfo>
      </CardContent>
    </CardContainer>
  );
}
