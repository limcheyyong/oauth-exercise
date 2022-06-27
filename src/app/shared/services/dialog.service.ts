import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { AlertData } from '../models/alert-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  alert(
    alertData: AlertData,
    config: MatDialogConfig = {}
  ): MatDialogRef<AlertComponent> {
    const dialogConfig: MatDialogConfig = { ...config, data: alertData };
    return this.matDialog.open(AlertComponent, dialogConfig);
  }
}
