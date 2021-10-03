export interface ICardDetails {
  abilities: Abilities[];
  height: number;
  weight: number;
  name: string;
  sprites: ISprites;
}

export interface ISprites {
  other: any;
}

export interface Abilities {
  ability: Ability;
  is_hidden: boolean;
}

export interface Ability {
  name: string;
  url: string;
}
