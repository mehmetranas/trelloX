import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { List } from 'src/app/shared/models/schemas';
import { BoardService } from '../../board.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: List[] = [];
  newList: List;
  displayCreateNewList: boolean = false;
  constructor(
    private boardService: BoardService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.fetchLists();
  }

  fetchLists(): void {
    this.boardService.getLists().subscribe((lists: List[]) => {
      this.lists = [...lists];
      console.log('on subs', lists);
    });
  }
  onListDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  createNewList(list: List) {
    this.boardService.addNewList(list);
    this.displayCreateNewList = false;
  }

  deleteList(listId: string) {
    this._bottomSheet
      .open(ConfirmationComponent, { data: 'Are you sure to delete list?' })
      .afterDismissed()
      .pipe(takeWhile((result) => result))
      .subscribe(() => this.boardService.deleteList(listId));
  }

  get listIds(): string[] {
    return this.lists.map((l) => l.id);
  }
}
