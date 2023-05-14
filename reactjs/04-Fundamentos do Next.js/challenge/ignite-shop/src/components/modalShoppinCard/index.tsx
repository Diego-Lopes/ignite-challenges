import * as Dialog from '@radix-ui/react-dialog';

export function modalShoppingCard() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay/>
      <Dialog.Content>
        <Dialog.Close>
          X
        </Dialog.Close>
        <Dialog.Title>Sacola de compra</Dialog.Title>
      </Dialog.Content>
    </Dialog.Portal>
  )
}