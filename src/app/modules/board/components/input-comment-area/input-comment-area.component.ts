import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserComment } from 'src/app/shared/models/schemas';

@Component({
  selector: 'app-input-comment-area',
  templateUrl: './input-comment-area.component.html',
  styleUrls: ['./input-comment-area.component.scss'],
})
export class InputCommentAreaComponent implements OnInit, OnChanges {
  @Input() content: string;
  @Input() isEdit: boolean = false;
  @Output() commentChanged = new EventEmitter<string>();
  onNewComment: boolean = false;

  @ViewChild('inputArea') inputArea: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName))
        if (propName === 'content' && this.content && this.content.length > 0)
          this.inputArea.nativeElement.focus();
    }
  }

  _commentChanged() {
    this.commentChanged.emit(this.content);
    this.inputArea.nativeElement.blur();
    this.onNewComment = false;
    this.content = '';
  }
}
