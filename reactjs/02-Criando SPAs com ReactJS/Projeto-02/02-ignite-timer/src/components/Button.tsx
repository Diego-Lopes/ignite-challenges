import { ButtonContainer, VariantType } from "./Button.styles";

interface IButtonProps {
  variant?: VariantType
}

export function Button({variant = "primary"}: IButtonProps) {
  return (
    <>
      <ButtonContainer variant={variant}>color</ButtonContainer>
    </>
  );
}
