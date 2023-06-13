import { styled, keyframes } from "@/styles";
import * as Dialog from "@radix-ui/react-dialog";

export const Portal = styled(Dialog.Portal, {});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "50%": { opacity: 0.75 },
  "100%": { opacity: 1 },
});

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  animation: `${overlayShow} 350ms ease-in-out`,
});

const animatModal = keyframes({
  "0%": { right: "-500px" },
  // "50%": { right: "-250px" },
  // "75%": { rigth: "-50px" },
  "100%": { right: 0 },
});

export const Content = styled(Dialog.Content, {
  minWidth: "480px",
  minHeight: "100vh",
  padding: "2.4rem",
  position: "fixed",
  // right: "-500px",
  top: 0,
  background: "$gray800",
  "box-shadow": "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  animation: `${animatModal} 450ms ease-in-out forwards`,
});

export const Close = styled(Dialog.Close, {
  background: "transparent",
  border: 0,

  position: "relative",
  left: "calc( 100% - 5%)",

  svg: {
    color: "White",
    "&:hover": {
      transition: "all 350ms ease-in-out",
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
});

export const WrapperList = styled("div", {
  marginTop: "2rem",
  width: "100%",
  maxHeight: "522px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: ".75rem 0",
});

export const BoxInfo = styled("div", {
  marginTop: "6px",
  display: "flex",
  gap: "7px",
  flexDirection: "column",

  div: {
    display: "flex",
    justifyContent: "space-between",
  },

  ".font": {
    fontSize: "1.125rem",
  },
});

export const ButtonFinished = styled("button", {
  marginTop: "3.25rem",
  minHeight: "4.3125rem",
  backgroundColor: "$green500",
  border: "0",
  borderRadius: "8px",
  color: "$white",
  fontSize: "1.125rem",
  fontWeight: "bold",
  lineHeight: "160%",

  "&:hover": {
    transition: "all 450ms ease-in-out",
    backgroundColor: "$green300",
  },
});
