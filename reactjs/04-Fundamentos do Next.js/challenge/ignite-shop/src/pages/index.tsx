import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import camiseta1 from "../assets/camisetas/1.png";
import bag from "../../public/Bag.svg";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  console.log(products);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <>
      <Head>
        <title> Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={""}
                  quality={95}
                  placeholder="blur"
                  blurDataURL={`${camiseta1}`}
                />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <Image
                  src={bag}
                  alt={""}
                  quality={95}
                  placeholder="blur"
                  blurDataURL={`${camiseta1}`}
                  onClick={() => console.log("clickou")}
                />
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };
  });
  // console.log(response.data);

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //a cada duas horas,
  };
};
