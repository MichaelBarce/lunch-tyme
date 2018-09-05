import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DialogBodyComponent>,) { 
      console.log("DialogBodyComponent :: constructor");
    }

  ngOnInit() {
    console.log("ngOnInit()");
    console.log("this.dialogRef");
    console.log(this.dialogRef);
    console.log(this.dialogRef.componentInstance.data);
  }

  close() {
    console.log("DialogBodyComponent :: close");
    this.dialogRef.close("Thanks for using me!");
  }

}
