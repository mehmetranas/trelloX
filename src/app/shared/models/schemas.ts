export interface ICard {
  id: string;
  title: string;
}

export class Card implements ICard {
  id: string;
  title: string;
}

export interface IList {
  id: string;
  title: string;
  cards: Card[];
}

export class List implements IList {
  id: string;
  title: string;
  cards: Card[];
}
