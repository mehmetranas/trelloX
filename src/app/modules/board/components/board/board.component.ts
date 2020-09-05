import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { List } from 'src/app/shared/models/schemas';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists: List[] = [];
  newList: List;
  displayCreateNewList: boolean = false;
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.fetchLists();
  }

  fetchLists(): void {
    this.boardService.getLists().subscribe((lists: List[]) => {
      this.lists = [...lists];
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

  get listIds(): string[] {
    return this.lists.map((l) => l.id);
  }
}
