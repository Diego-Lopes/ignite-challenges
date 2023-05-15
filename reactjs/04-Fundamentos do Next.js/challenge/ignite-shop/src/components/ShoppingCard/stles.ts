import { styled } from "@/styles";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "rgba(0,0,0, 0.75)",
});

export const Content = styled(Dialog.Content, {
  'minWidth': '48rem',
  padding: '2.4rem',
  height: '100%',

  position: "fixed",
  top: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)'
})
