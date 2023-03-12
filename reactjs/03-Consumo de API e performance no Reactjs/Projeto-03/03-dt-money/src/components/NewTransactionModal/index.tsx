import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import * as S from "./style";
export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />
          <button type="submit">Cadastrar</button>
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}
