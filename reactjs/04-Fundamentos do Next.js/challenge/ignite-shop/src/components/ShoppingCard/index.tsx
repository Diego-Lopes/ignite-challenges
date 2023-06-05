import * as Dialog from "@radix-ui/react-dialog";
import * as S from './stles';
export function ShoppingCard() {
  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <Dialog.Close>X</Dialog.Close>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <form>
          <input type="text" />
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}
