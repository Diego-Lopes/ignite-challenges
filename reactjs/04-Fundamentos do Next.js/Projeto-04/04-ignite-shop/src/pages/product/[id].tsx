import * as S from "@/styles/pages/product";

import camisa1 from "../../assets/camisetas/1.png";
import Image from "next/image";
import { GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface ProductIdProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function ProductId({ product }: ProductIdProps) {
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt={""} quality={100} width={520} height={480}/>
      </S.ImageContainer>
      <S.ProductDatails>
        <h1>{product?.name}</h1>
        <span>{product?.price}</span>
        <p>{product?.description}</p>

        <button>Comprar agora</button>
      </S.ProductDatails>
    </S.ProductContainer>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  };
};
