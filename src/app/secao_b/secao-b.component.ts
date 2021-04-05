import { ApiService } from './../api.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'secao-b',
  templateUrl: './secao-b.component.html',
  styleUrls: ['./styles.css']
})
export class SecaoBComponent implements OnInit {
  
  @Output() mudouValor = new EventEmitter();

  secao_b: any ={
    terceiros:{
      nome: '',
      cpf: '',
      rg: '',
      custo: '',
    }   
  }
  

  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.emitirSecao.subscribe(
      ()=> this.getSecaoB()
    )
  }
  getSecaoB(){
    this.mudouValor.emit({secao_b: this.secao_b})
  }

  

}
