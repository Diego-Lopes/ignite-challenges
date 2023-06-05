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

export const Content = styled(Dialog.Content, {
  minWidth: "480px",
  minHeight: "100vh",

  position: "fixed",
  right: 0,
  top: 0,
  background: "rgba(255,255,255,0.20)",
});
