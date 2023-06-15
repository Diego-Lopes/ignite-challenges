import { styled } from "../../styles"

export const Header = styled('header', {
    display: "flex",
    justifyContent: "space-between",
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
})

export const CartContainer = styled('div', {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',

    '&:hover': {
        cursor: "pointer",
    },

    p: {
        position: 'absolute',
        top: 0,
        right: -10,
        fontWeight: 'bold',
        fontSize: '0.875rem',

        borderRadius: 100,
        backgroundColor: '$green300',
        padding: '2px 6px',
    }
})