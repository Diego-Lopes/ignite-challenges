// essa tipagem é para ajudar na navegação de rotas no useNavigation().

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      new: undefined;
      players: {
        group: string;
      }
    }
  }
}