import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserComment } from 'src/app/shared/models/schemas';

@Component({
  selector: 'app-input-comment-area',
  templateUrl: './input-comment-area.component.html',
  styleUrls: ['./input-comment-area.component.scss'],
})
export class InputCommentAreaComponent implements OnInit {
  @Input() content: string;
  @Input() isEdit: boolean = false;
  @Output() commentChanged = new EventEmitter<string>();
  onNewComment: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  _commentChanged() {
    this.commentChanged.emit(this.content);
    this.content = '';
  }
}
