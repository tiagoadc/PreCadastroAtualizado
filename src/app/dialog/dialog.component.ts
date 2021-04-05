import { NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    id: any 
    nome: string;
    cgccpf: string;
    nacionalidade: string;
    cargo: string;
    participacao: number;

    
 
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  {
  
  btnDesabilitado: boolean = true
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.data.id = Math.random()
    }

  onNoClick(): void {
    
    this.dialogRef.close();
  }    

  disabled(){
    if(
    this.data.nome != null &&
    this.data.cgccpf != null&& 
    this.data.nacionalidade != null&&
    this.data.cargo != null &&
    this.data.participacao != null )
    {
      return false
    }
    else{
      return true
    }

  }

}
