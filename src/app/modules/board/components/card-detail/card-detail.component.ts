import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/shared/models/schemas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  cardForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public card: Card
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.cardForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
    });
    if (this.card != null) {
      this.cardForm.patchValue({
        title: this.card.title,
        id: this.card.id,
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
