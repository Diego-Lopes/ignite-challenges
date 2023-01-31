import { ReactNode } from 'react';
import * as S from './styles';

interface CicleIconsProps {
  children: ReactNode;
  color: string
}

export function CicleIcons({children, color}:CicleIconsProps) {
  return (
    <S.ClicleIconsContainer color={color}>
      {children}
    </S.ClicleIconsContainer>
  )
}