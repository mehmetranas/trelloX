import { Injectable } from '@angular/core';
import { List, Card } from 'src/app/shared/models/schemas';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
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

  getLists(): Observable<List[]> {
    return this.lists$;
  }

  addCard(card: Card, listId: string) {
    let currentState = this.lists.getValue();
    let list = currentState.find((list) => list.id === listId);
    card.id = String(list.cards.length + 1);
    list.cards.push(card);
  }
  private seedListsData(): void {
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
    }

    this.lists.next(lists);
  }
}
