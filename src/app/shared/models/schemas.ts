export class Tag {
  id: string;
  color: string;
  title: string;
}

export class UserComment {
  id: string;
  content: string;
}

export interface ICard {
  id: string;
  listId: string;
  title: string;
  tags: Tag[];
  comments: UserComment[];
}

export class Card implements ICard {
  id: string;
  listId: string;
  title: string;
  tags: Tag[] = [];
  comments: UserComment[] = [];
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
