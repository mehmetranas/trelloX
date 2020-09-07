import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board.service';
import { Card } from 'src/app/shared/models/schemas';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailComponent } from 'src/app/modules/board/components/card-detail/card-detail.component';
import { MatInput } from '@angular/material/input';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  data: Card[];
  searchTerm = new FormControl();
  filteredStates: Observable<Card[]>;
  @ViewChild(MatInput) matInput: MatInput;
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  constructor(
    private boardService: BoardService,
    private matDialog: MatDialog
  ) {
    this.filteredStates = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : []))
    );
  }

  private _filterStates(value: string): Card[] {
    const filterValue = value.toLowerCase();

    return this.data.filter(
      (state) => state.title.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ngOnInit(): void {
    this.boardService
      .getLists()
      .pipe(
        map((lists) =>
          lists
            .map((list) => list.cards)
            .reduce((flat, next) => flat.concat(next), [])
        )
      )
      .subscribe((result) => (this.data = result));
  }

  onSelected(card: Card) {
    this.matInput.value = '';
    this.matDialog.open(CardDetailComponent, {
      width: '60%',
      maxWidth: '100vw',
      data: { card: card, cardId: card.id, listId: card.listId },
    });
  }
}
