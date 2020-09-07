import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BoardService } from '../../board.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-select-color-menu-button',
  templateUrl: './select-color-menu-button.component.html',
  styleUrls: ['./select-color-menu-button.component.scss'],
})
export class SelectColorMenuButtonComponent implements OnInit {
  bgColorClasses$: Observable<string[]>;
  @Output() selectedClassName = new EventEmitter<string>();
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.bgColorClasses$ = this.boardService
      .listBgColorClasses()
      .pipe(tap((res) => console.log('classes', res)));
  }
  _selectedBgColorClass(className: string) {
    this.selectedClassName.emit(className);
  }
}
