import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { A11yModule } from '@angular/cdk/a11y';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    A11yModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  entryComponents: [ConfirmationComponent],
  exports: [
    MatToolbarModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    ConfirmationComponent,
    A11yModule,
    MatTooltipModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
