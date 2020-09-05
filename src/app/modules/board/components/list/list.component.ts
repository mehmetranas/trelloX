import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service';
import { List, Card } from 'src/app/shared/models/schemas';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { takeWhile } from 'rxjs/operators';

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
  constructor(
    private boardService: BoardService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.list == undefined) {
      this.list = new List();
    }
  }

  onCardDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createNewList() {
    const listClone = { ...this.list };
    this.createlNewListEvent.emit(listClone);
  }
  cancelNewList() {
    this.cancelNewListEvent.emit();
  }
  openCardPanel() {
    const dialogRef = this.matDialog.open(CardDetailComponent, {
      width: '35vw',
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile((card: Card) => card != null))
      .subscribe((card: Card) => {
        this.boardService.addCard(card, this.list.id);
      });
  }
}
