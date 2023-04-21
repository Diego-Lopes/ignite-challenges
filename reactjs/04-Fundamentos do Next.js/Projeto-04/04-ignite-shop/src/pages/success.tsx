import Link from "next/link";
import * as S from "../styles/pages/success";

export default function Success() {
  return (
    <S.SuccessContainer>
      <h1>Compra efetuada</h1>
      <S.ImageContainer></S.ImageContainer>
      <p>
        Uhuuul <strong>Diego Lopes</strong>, sua{" "}
        <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua
        casa.
      </p>
      <Link href={"/"}>Voltar ao catálogo</Link>
    </S.SuccessContainer>
  );
}
