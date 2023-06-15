import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useProSidebar } from "react-pro-sidebar";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesContainer, SuccessContainer } from "../styles/pages/success";

interface Props {
    customerName: string;
    products: Stripe.Product[];
}

export default function Success({customerName, products}: Props) {
    console.log();
    const {collapsed,collapseSidebar} = useProSidebar();

    const quantityDescription = products.length >1 ? 
        `${products.length} camisetas` : `1 camiseta`;

        useEffect(() => {
            console.log('Collapsed',collapsed);
        },[])

    return (
        <>
        <Head>
            <title>Compra efetuada | Ignite Shop</title>

            <meta name="robots" content="noindex"/>
        </Head>
        <SuccessContainer>
            <h1>Compra efetuada!</h1>
            <ImagesContainer>
                {products.map(product => (
                    <ImageContainer key={product.id}>
                        <Image src={product.images[0]} width={120} height={110} alt="" />
                    </ImageContainer>
                ))}
            </ImagesContainer>

            <p>
                Uhuul <strong>{customerName}</strong>, sua compra de {quantityDescription} já está a caminho da sua casa.
            </p>

            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if(!query.session_id) {
        return {
           redirect: {
            destination: '/',
            permanent: false,
           } 
        }
    }

    const sessionId = String(query.session_id);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    });

    const customerName = session.customer_details.name;
    const product = session.line_items.data[0].price.product as Stripe.Product
    const products = session.line_items.data.map(items => items.price.product as Stripe.Product);

    return {
        props: {
            customerName, 
            products: products,
        }
    }
    // return {
    //     props: {
    //         customerName, 
    //         product: {
    //             name: product.name,
    //             imageUrl: product.images[0],
    //         }
    //     }
    // }
}