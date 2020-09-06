export class Tag {
  id: string;
  color: string;
  title: string;
}

export interface ICard {
  id: string;
  title: string;
  tags: Tag[];
}

export class Card implements ICard {
  id: string;
  title: string;
  tags: Tag[] = [];
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
