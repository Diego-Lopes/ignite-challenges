import * as S from "@/styles/pages/product";
import { useRouter } from "next/router";

import camisa1 from "../../assets/camisetas/1.png";
import Image from "next/image";
export default function ProductId() {
  const { query } = useRouter();
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={camisa1} alt={""} quality={100} />
      </S.ImageContainer>
      <S.ProductDatails>
        <h1>Camiseta Y</h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque sit
          placeat labore sapiente explicabo saepe, architecto blanditiis
          exercitationem amet vero quos corporis et voluptatum fugiat, in odit,
          adipisci molestiae doloremque!
        </p>

        <button>
          Comprar agora
        </button>
      </S.ProductDatails>
    </S.ProductContainer>
  );
}
