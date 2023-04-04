import { styled } from "@/styles";
import { HomeContainer, Product } from "@/styles/pages/home";
import { Inter } from "next/font/google";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import camiseta3 from "../assets/camisetas/3.png";
import camiseta4 from "../assets/camisetas/4.png";
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={480} alt={""} />
        <footer>
          <strong>Camisate X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480} alt={""} />
        <footer>
          <strong>Camisate X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={480} alt={""} />
        <footer>
          <strong>Camisate X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta4} width={520} height={480} alt={""} />
        <footer>
          <strong>Camisate X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list();

  console.log(response.data);

  return {
    props: {
      products: ""
    }
  }
  
}