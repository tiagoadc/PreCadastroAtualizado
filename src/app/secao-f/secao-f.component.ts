import { ApiService } from './../api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'secao-f',
  templateUrl: './secao-f.component.html',
  styleUrls: ['./styles.css']
})
export class SecaoFComponent implements OnInit {

  @Output() mudouValor = new EventEmitter();  

  secao_f: any= {
    responsavelPreenchimento: ''    
  }
  local: any
  date: any

  constructor(private dateAdapter: DateAdapter<Date>, private apiService: ApiService) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.apiService.emitirSecao.subscribe(
      ()=> this.getSecaoF()
    )
  }
  getSecaoF(){
    this.mudouValor.emit({secao_f: this.secao_f})
    
  }
}
