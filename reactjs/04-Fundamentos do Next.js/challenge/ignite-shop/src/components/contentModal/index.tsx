import {
  Close,
  Content,
  Overlay,
  Portal,
  WrapperList,
} from "@/styles/components/contentModal/wrapperModal";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

export function WrapperModal() {
  return (
    <Portal>
      <Overlay />
      <Content>
        <Close>
          <X size={24} weight="bold" />
        </Close>
        <Dialog.Title>Sacola de compra</Dialog.Title>
        <WrapperList>
          <h3>coloca os dados da sacola aqui.</h3>
        </WrapperList>
      </Content>
    </Portal>
  );
}
