import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  lists = [
    {
      title: 'First List',
      id: 'first-list',
      cards: [
        {
          title: 'First Card',
        },
        {
          title: 'Second Card',
        },
        {
          title: 'Third Card',
        },
      ],
    },
    {
      title: 'Second List',
      id: 'second-list',
      cards: [
        {
          title: 'First Card',
        },
        {
          title: 'Second Card',
        },
        {
          title: 'Third Card',
        },
      ],
    },
    {
      title: 'Third List',
      id: 'third-list',
      cards: [
        {
          title: 'First Card',
        },
        {
          title: 'Second Card',
        },
        {
          title: 'Third Card',
        },
      ],
    },
  ];
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}
  onListDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  get listIds(): string[] {
    return this.lists.map((l) => l.id);
  }
}
