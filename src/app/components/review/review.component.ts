import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  review: string;

  constructor(private dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      if(data){
        this.review=data;
      }
    }

    save(){
      this.dialogRef.close(this.review)
    }

    close(){
      this.dialogRef.close(null);
    }

}
