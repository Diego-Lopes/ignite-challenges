import {
  Content,
  Overlay,
  Portal,
} from "@/styles/components/contentModal/wrapperModal";
import * as Dialog from "@radix-ui/react-dialog";

export function WrapperModal() {
  return (
    <Portal>
      <Overlay />
      <Content>
        <Dialog.Close>X</Dialog.Close>
        <Dialog.Title>Sacola de compra</Dialog.Title>
        <h2>Estou aqui</h2>
        <h3>coloca os dados da sacola aqui.</h3>
      </Content>
    </Portal>
  );
}
