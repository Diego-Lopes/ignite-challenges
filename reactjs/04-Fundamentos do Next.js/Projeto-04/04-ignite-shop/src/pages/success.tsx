import Link from "next/link";
import * as S from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <S.SuccessContainer>
      <h1>Compra efetuada com sucesso!</h1>
      <S.ImageContainer>
        <Image
          src={product.imageUrl}
          alt={product.name}
          quality={100}
          width={114}
          height={106}
        />
      </S.ImageContainer>
      <p>
        Uhuuul <strong>{customerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>
      <Link href={"/"}>Voltar ao catálogo</Link>
    </S.SuccessContainer>
  );
}

/**
 * podemos escolher 3 formas para receber o fetch de dados
 *
 * podemos usar
 * 1 Client-side (useEffect)( 2 problemática
 * 1 tela de loading, para simbolizar tela de carregamento,
 * stripe não permite chamada pelo client pois nossa api secret estaria exposta.
 * )
 * 2 getServerSideProps (melhor opção )
 * 3 getStaticProps
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  //tratando erro quando não recebemos um session_id
  // no getserversideprops ele permite pelo lado do servidor redirecionar o usuário
  // vamos testar para quando não temos session_id
  if(!context.query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


  
  const sessionId = String(context.query.session_id);

  //buscando os dados lá do stripe usando o parametro sessionId;
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
