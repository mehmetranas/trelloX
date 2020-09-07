import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-create-card-input',
  templateUrl: './create-card-input.component.html',
  styleUrls: ['./create-card-input.component.scss'],
})
export class CreateCardInputComponent implements OnInit, AfterViewInit {
  title: string;
  @Output() cardTitle = new EventEmitter<string>();
  @Output() onClose = new EventEmitter();
  @ViewChild('titleInputArea') titleInputArea: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.titleInputArea.nativeElement.focus();
  }

  createCard(): void {
    this.cardTitle.emit(this.title);
  }

  close(): void {
    this.onClose.emit();
  }
}
