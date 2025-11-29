import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ElementData } from '../../views/home/home';



@Component({
  selector: 'app-element-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './element-dialog.html',
  styleUrl: './element-dialog.css',
})
export class ElementDialog {
  element: ElementData | null = null;
  ischange: boolean = false;


     constructor(@Inject(MAT_DIALOG_DATA) 
     public data: ElementData,
     public dialogRef: MatDialogRef<ElementDialog>) {

      
     }
    


     ngOnInit() : void {
        if(this.data.id != null){
          this.ischange = true;
        }
     }

     onNoClick(): void {
        this.dialogRef.close();
     }

}

