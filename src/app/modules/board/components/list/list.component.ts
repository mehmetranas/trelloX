import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../board.service';
import { List, Card } from 'src/app/shared/models/schemas';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { takeWhile, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input() list;
  @Input() listIds;
  @Output() cancelNewListEvent = new EventEmitter();
  @Output() createNewListEvent: EventEmitter<List> = new EventEmitter<List>();
  displayCreateCardInput: boolean = false;
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.XSmall
  );

  @ViewChild('listTitleBox', { static: true }) listTitleBox: ElementRef;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private boardService: BoardService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.list == undefined) {
      this.list = new List();
    }
  }

  ngAfterViewInit(): void {
    if (!this.list.id) {
      this.listTitleBox.nativeElement.focus();
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
      event.item.data.listId = event.container.id;
    }
  }

  createNewList() {
    const listClone = { ...this.list };
    this.createNewListEvent.emit(listClone);
  }
  cancelNewList() {
    this.cancelNewListEvent.emit();
  }

  createCard(title: string) {
    const card = new Card();
    card.title = title;
    card.tags = [];
    card.comments = [];
    this.boardService.addCard(card, this.list.id);
    this.displayCreateCardInput = false;
  }
  openCardPanel(card?: Card) {
    const dialogRef = this.matDialog.open(CardDetailComponent, {
      width: '60%',
      maxWidth: '100vw',
      data:
        {
          card: card,
          cardId: card ? card.id : undefined,
          listId: this.list.id,
        } || undefined,
    });
    const smallDialogSubscription = this.isExtraSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100vw', '100vh');
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        finalize(() => smallDialogSubscription.unsubscribe()),
        takeWhile((card: Card) => card != null)
      )
      .subscribe((card: Card) => {
        if (card.id) {
          this.boardService.updateCard(card, this.list.id);
        } else {
          this.boardService.addCard(card, this.list.id);
        }
      });
  }

  deleteCard(event: MouseEvent, cardId: string): void {
    event.stopPropagation();
    this._bottomSheet
      .open(ConfirmationComponent, {
        data: 'Are you sure to delete this card?',
      })
      .afterDismissed()
      .pipe(takeWhile((result) => result))
      .subscribe(() => {
        this.boardService.deleteCard(cardId, this.list.id);
      });
  }
}
