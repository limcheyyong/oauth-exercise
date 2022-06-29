import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class SharedMaterialModule {}
