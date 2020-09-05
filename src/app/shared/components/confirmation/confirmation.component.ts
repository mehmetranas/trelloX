import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input('text') text: string = 'Are you sure?';
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<ConfirmationComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.text = this.data;
    }
  }

  onConfirm(): void {
    this._bottomSheetRef.dismiss(true);
  }
  onCancel(): void {
    this._bottomSheetRef.dismiss();
  }
}
