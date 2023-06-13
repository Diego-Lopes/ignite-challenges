import {
  Close,
  Content,
  Overlay,
  Portal,
  WrapperList,
  BoxInfo,
  ButtonFinished,
} from "@/styles/components/contentModal/wrapperModal";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { Card } from "../Card";

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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </WrapperList>
        <BoxInfo className="boxInfo">
          <div>
            <span>Quantidade</span> <span className="font">3 itens</span>
          </div>
          <div>
            <span className="font">
              <strong>Valor total</strong>
            </span>
            <span className="font">
              <strong>R$ 270,00</strong>
            </span>
          </div>
          <ButtonFinished>Finalizar compra</ButtonFinished>
        </BoxInfo>
      </Content>
    </Portal>
  );
}
