import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Head from 'next/head';
import { useProSidebar } from 'react-pro-sidebar';

interface Props {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
        priceNormal: string;
    }
}

export default function Product({ product }: Props) {
    const { isFallback } = useRouter();
    const {addItem } = useShoppingCart();
    const {collapsed, toggleSidebar} = useProSidebar();

    async function handleBuyProduct() {
        addItem({
            name: product.name,
            price_id: product.defaultPriceId,
            price: Number(product.priceNormal),
            image: product.imageUrl,
            currency: 'BRL',
        })

    }

    if(isFallback) {
        return (
            <ProductContainer>

                <Skeleton baseColor='#121214' inline={true} height='450px'/>
                <ProductDetails>
                    <h1><Skeleton baseColor='#121214'/></h1>
                    <span><Skeleton baseColor='#121214'/></span>
                    <p><Skeleton baseColor='#121214' count={1}/></p>
                    <div><Skeleton baseColor='#121214' height="100px"/></div>
                </ProductDetails>
        </ProductContainer>
        )
    }

    return (
        <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <button onClick={handleBuyProduct}>Comprar agora</button>

            
            </ProductDetails>
        </ProductContainer>
        </>
        
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
    const productId = params.id;

    const productStripe = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });

    const price = productStripe.default_price as Stripe.Price;

    const product = {
        id: productStripe.id,
        name: productStripe.name, 
        imageUrl: productStripe.images[0],
        price: new Intl.NumberFormat('pt-BR', {
            style: 'currency', 
            currency: 'BRL',
        }).format(price.unit_amount / 100),
        priceNormal: price.unit_amount,
        description: productStripe.description,
        defaultPriceId: price.id,
    }

    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}