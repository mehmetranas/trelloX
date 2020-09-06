import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-card-input',
  templateUrl: './create-card-input.component.html',
  styleUrls: ['./create-card-input.component.scss'],
})
export class CreateCardInputComponent implements OnInit {
  title: string;
  @Output() cardTitle = new EventEmitter<string>();
  @Output() onClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  createCard(): void {
    this.cardTitle.emit(this.title);
  }

  close(): void {
    this.onClose.emit();
  }
}
