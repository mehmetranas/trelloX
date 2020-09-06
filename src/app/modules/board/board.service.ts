import { Injectable } from '@angular/core';
import { List, Card, Tag } from 'src/app/shared/models/schemas';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import * as faker from 'faker';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public tags$: Observable<Tag[]> = this.tags.asObservable();
  private lists: BehaviorSubject<List[]> = new BehaviorSubject<List[]>([]);
  public lists$: Observable<List[]> = this.lists.asObservable();

  constructor() {
    this.seedListsData();
  }
  addNewList(newList: List): void {
    let currentState = this.lists.getValue();
    currentState.push(newList);
    newList.id = String(currentState.length + 1);
    newList.cards = [];
    this.lists.next(currentState);
  }

  deleteList(listId: string): void {
    let currentState = this.lists.getValue();
    const i = currentState.findIndex((list) => list.id === listId);
    if (i > -1) {
      currentState.splice(i, 1);
      this.lists.next(currentState);
    }
  }
  getLists(): Observable<List[]> {
    return this.lists$;
  }

  addCard(card: Card, listId: string) {
    let currentState = this.lists.getValue();
    let list = currentState.find((list) => list.id === listId);
    card.id = String(list.cards.length + 1);
    list.cards.push(card);
  }

  updateCard(card: Card, listId: string) {
    let currentState = this.lists.getValue();
    let list = currentState.find((list) => list.id === listId);
    let currentCard = list.cards.find((c) => c.id === card.id);
    Object.assign(currentCard, card);
  }

  deleteCard(cardId: string, listId: string) {
    let currentState = this.lists.getValue();
    let list = currentState.find((list) => list.id === listId);
    const i = list.cards.findIndex((c) => c.id === cardId);
    if (i > -1) {
      list.cards.splice(i, 1);
    }
  }

  listTags(): Observable<Tag[]> {
    return this.tags$;
  }

  updateTagTitle(tag: Tag) {
    let currentState = this.tags.getValue();
    currentState.find((t) => t.id === tag.id).title = tag.title;
  }
  private seedListsData(): void {
    // Seed List and Cards data
    let lists: List[] = [];
    for (let i = 1; i < 3; i++) {
      const list = new List();
      list.id = 'list' + i;
      list.title = faker.lorem.words(2);
      list.cards = [];
      for (let j = 0; j < 4; j++) {
        const card = new Card();
        card.id = 'card' + j;
        card.title = faker.lorem.words(3);
        list.cards.push(card);
      }
      lists.push(list);
      this.lists.next(lists);

      // Seed Tags
      let tags: Tag[] = [];
      const tagColors = [
        'badge-warning',
        'badge-primary',
        'badge-secondary',
        'badge-danger',
      ];
      tagColors.forEach((color, index) => {
        const tag = new Tag();
        tag.id = 'tag-' + index;
        tag.color = color;
        tags.push(tag);
      });

      this.tags.next(tags);
    }
  }
}
