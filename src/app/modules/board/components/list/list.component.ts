import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service';
import { List } from 'src/app/shared/models/schemas';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list;
  @Input() listIds;
  @Output() cancelNewListEvent = new EventEmitter();
  @Output() createlNewListEvent: EventEmitter<List> = new EventEmitter<List>();
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    if (this.list == undefined) {
      this.list = new List();
    }
  }

  onCardDrop(event: CdkDragDrop<any[]>) {
    console.log('fired');
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  createNewList() {
    const listClone = { ...this.list };
    this.createlNewListEvent.emit(listClone);
  }
  cancelNewList() {
    this.cancelNewListEvent.emit();
  }
}
