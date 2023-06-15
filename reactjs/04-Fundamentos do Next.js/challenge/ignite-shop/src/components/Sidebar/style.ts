import { styled } from "../../styles";
import { Sidebar} from 'react-pro-sidebar';

export const SidebarContainer = styled('div', {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    right: 0,
    top: 0,
    width: '100%',
    maxWidth: '30rem',
    height: '100%',
    overflow: "auto",
    background: '$gray800',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
    variants: {
        collapsed: {
            true: {transform: 'translateX(0%)', opacity: 1,},
            false: { transform: 'translateX(110%)', opacity: 0, },
        }
    },

    h1: {
        color: '$gray300',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: '4.5rem',
        marginLeft: '3rem',
    }
})

export const ProductContainer = styled('div', {
    display: "flex",
    margin: '2rem 3rem', 

})

export const SidebarProductDescription = styled('div', {
    display: "flex",
        flexDirection: "column",
        marginLeft: '1.25rem',
        justifyContent: 'space-between',        
        marginTop: '0.5rem',
        marginBottom: '0.5rem',

        h2: {
            fontSize: '1.125rem',
            color: '$gray300',
            fontWeight: 'normal',
            display: "inline",
        }
})

export const SidebarImageContainer = styled('div', {
    width: '100%',
    maxWidth: 100,
    height: 100,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    }
})

export const SidebarRemoveProduct = styled('p', {
    color: '$green300',
    fontWeight: 'bold',
    marginTop: '0.5rem',

    '&:hover': {
        cursor: 'pointer',
        color: '$green500',
    }
})

export const SidebarFooterContainer = styled('div', {
    margin: '0 3rem', 
    marginTop: 'auto',
})

export const SidebarQuantityContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const SidebarTotalContainer = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',

    strong: {
        fontSize: '1.125rem',
    }
})

export const SidebarButtonCheckout = styled('button', {
    display: "flex",
    alignItems:'center',
    justifyContent: 'center',
    padding: '1.25rem 7.7813rem',
    width: '100%',
    marginTop: '3.45rem',
    marginBottom: '3rem', 
    borderRadius: 8,
    backgroundColor: '$green500',
    border: 0,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '$white',

    '&:not(:disabled):hover': {
        cursor: 'pointer',
        backgroundColor: '$green300',
    },

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
    },


})

export const SidebarCloseContainer = styled('div', {
    position: 'absolute',
    top: '2.5rem',
    right: '2.5rem',

    fontWeight: 'bold',
    fontSize: '2.5rem',

    '&:hover': {
        cursor: 'pointer',
    }
})