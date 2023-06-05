import { ShoppingCart } from "@/styles/pages/app";
import Image from "next/image";
import bagDark from "./assets/BagDark.svg";

import * as Dialog from "@radix-ui/react-dialog";
import {  WrapperModal } from "../contentModal";

export function ModalShoppingCart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ShoppingCart onClick={() => console.log("clicou, header")}>
          <Image src={bagDark} alt="" />
          <div className="value">100</div>
        </ShoppingCart>
      </Dialog.Trigger>
      <WrapperModal />
    </Dialog.Root>
  );
}
