import { ApiService } from './api.service';
import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, Output } from '@angular/core';
import { Validate } from './validate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.css']
})
export class AppComponent {
  title = 'PreCadastro';
  response: any = {}
  @Output() novoObj = new EventEmitter();

  secao_a: any
  secao_b: any
  secao_c: any
  secao_d: any
  secao_e: any
  secao_f: any
  junto: any
  token: any 
  chave: boolean

  constructor(private apiServie: ApiService) {
    this.apiServie.getChave()
    
    
  }


  onGetSecaoA(event: any) {
    this.secao_a = event.secao_a
  }
  onGetSecaoB(event: any) {
    this.secao_b = event.secao_b
  }
  onGetSecaoC(event: any) {
    this.secao_c = event.secao_c
  }
  onGetSecaoD(event: any) {
    this.secao_d = event.secao_d
  }
  onGetSecaoE(event: any) {
    this.secao_e = event.secao_e
  }
  onGetSecaoF(event: any) {
    this.secao_f = event.secao_f
  }
  clique() {
    this.apiServie.getSecao()
    var obj = Object.assign({}, this.secao_a, this.secao_b, this.secao_c, this.secao_d, this.secao_e, this.secao_f);

    var validate = new Validate(obj)
    var revisarCampos = validate.validate()
    this.apiServie.postJson(validate.formatJson())

    if (revisarCampos.length > 0) {
      alert(revisarCampos)
    }
    else {
      //console.log(validate.formatJson())
      alert("Cadastro Realizado com Sucesso!")
    }
   
  }



}
