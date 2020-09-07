import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/models/schemas';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit(): void {}
}
