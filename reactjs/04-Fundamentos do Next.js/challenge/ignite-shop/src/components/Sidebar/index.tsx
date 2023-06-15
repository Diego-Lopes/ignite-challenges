import Image from 'next/image';
import { useProSidebar } from 'react-pro-sidebar';
import { ProductContainer, SidebarButtonCheckout, SidebarCloseContainer, SidebarContainer, SidebarFooterContainer, SidebarImageContainer, SidebarProductDescription, SidebarQuantityContainer, SidebarRemoveProduct, SidebarTotalContainer } from './style';
import { useShoppingCart } from 'use-shopping-cart'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { X } from 'phosphor-react';
import { Circles } from 'react-loader-spinner';

export default function Sidebar() {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const {collapsed, collapseSidebar} = useProSidebar();
    const {cartCount, cartDetails, removeItem, totalPrice, clearCart } =  useShoppingCart();
    const router = useRouter();

    if(cartCount <1) {
        return (
            <SidebarContainer collapsed={collapsed}>
            <SidebarCloseContainer onClick={() => {collapseSidebar()}}><X size={32} /></SidebarCloseContainer>
            <h1>Nenhum item na sacola</h1>
        </SidebarContainer>
        )
    }

    const formattedData = Object.entries(cartDetails).map(([key, value]) => {
        return {
            product_id: key,
            ...value,
        }
    })

    const totalPriceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL',
    }).format(totalPrice / 100)

    function handleRemoveItem(productId: string) {
        removeItem(productId);
    }

    async function handleGoCheckout() {
        try {
            setIsRedirecting(true);
            const response = await axios.post('/api/checkout', {
                items: cartDetails,
            });

            const checkoutSessionId = String(response.data.checkoutSessionId);
            
            console.log('checkout session id', checkoutSessionId);

            router.push(checkoutSessionId);

            clearCart();
        }catch (error) {
            alert('Falha ao redirecionar ao checkout' + error)
            setIsRedirecting(false);
        }
    }

    return (
        <SidebarContainer collapsed={collapsed}>
            <SidebarCloseContainer onClick={() => {collapseSidebar()}}><X size={32} /></SidebarCloseContainer>
            <h1>Sacola de compras</h1>

            {formattedData.map(product => (
                <React.Fragment key={product.product_id}>
                    <ProductContainer>
                    <SidebarImageContainer>
                        <Image src={product.image} alt="" width={100} height={100}/>
                    </SidebarImageContainer>
                    <SidebarProductDescription>
                        <h2>{product.name}</h2>
                        <strong>{product.formattedValue}</strong>
                        <SidebarRemoveProduct onClick={() => handleRemoveItem(product.product_id)}>
                            Remover
                        </SidebarRemoveProduct>
                    </SidebarProductDescription>
                    </ProductContainer>
                </React.Fragment>
            ))}
            <SidebarFooterContainer>
                <SidebarQuantityContainer>
                    <p>Quantidade</p>
                    <p>{cartCount} itens</p>
                </SidebarQuantityContainer>
                <SidebarTotalContainer>
                    <strong>Valor total</strong>
                    <h2>{totalPriceFormatted}</h2>
                </SidebarTotalContainer>
                <SidebarButtonCheckout onClick={handleGoCheckout} disabled={isRedirecting}>
                    {isRedirecting ? <Circles width="30" height="21" color="white"/>: 'Finalizar compra'} {/*Finalizarcompra*/}
                    
                </SidebarButtonCheckout>
            </SidebarFooterContainer>
            
        </SidebarContainer>
    )
}