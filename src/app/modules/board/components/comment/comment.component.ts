import { Component, OnInit, Input } from '@angular/core';
import { UserComment } from 'src/app/shared/models/schemas';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: UserComment;
  constructor() {}

  ngOnInit(): void {}
}
