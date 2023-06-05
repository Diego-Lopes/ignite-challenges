import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart } from "@/styles/pages/app";
import Image from "next/image";
import bagDark from "../../../public/BagDark.svg";
import logoImg from "../../assets/logo.svg";
import { ShoppingCard } from "../ShoppingCard";

export function HeaderComponent() {
  return (
    <>
      <Image src={logoImg} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ShoppingCart onClick={() => console.log("clicou, header")}>
            <Image src={bagDark} alt="" />
            <div className="value">100</div>
          </ShoppingCart>
        </Dialog.Trigger>
        <ShoppingCard />
      </Dialog.Root>
    </>
  );
}
