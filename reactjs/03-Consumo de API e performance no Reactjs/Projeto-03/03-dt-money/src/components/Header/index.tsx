import * as S from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

/**
 * esse asChild ele faz com que o Dialog.trigger não crie um novo botton e
 * sim incorpora o botton que está dentro dele no caso o NewTransactionButton.
 */
export function Header() {
  return (
    <S.ContainerHeader>
      <S.HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.ContainerHeader>
  );
}
