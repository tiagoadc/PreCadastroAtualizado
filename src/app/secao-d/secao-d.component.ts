import { ApiService } from './../api.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'secao-d',
  templateUrl: './secao-d.component.html',
  styleUrls: ['./styles.css']
})
export class SecaoDComponent implements OnInit {

  @Output() mudouValor = new EventEmitter();

  secao_d: any = {
    etica: {
      reus: {
        resposta: false,
        justificativa: '',
      },
      vinculoPessoal: {
        resposta: false,
        justificativa: '',
      },
      parentescoServidorPublico: {
        resposta: false,
        justificativa: '',
      },
      atividadeOutrasInstituicoes: {
        resposta: false,
        justificativa: '',
      },
      principalCliente1: '',
      principalCliente2: '',
      principalCliente3: '',
      jaPrestouServicos: {
        resposta: false,
        justificativa: '',
      }
    }

  }


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.emitirSecao.subscribe(
      () => this.getSecaoD()
    )
  }

  getSecaoD() {
    this.cleanJustificativa()
    this.mudouValor.emit({ secao_d: this.secao_d })

  }    
  cleanJustificativa(){
    if(this.secao_d.etica.reus.resposta == 'false' || this.secao_d.etica.reus.resposta == false )
    this.secao_d.etica.reus.justificativa = ''

    if(this.secao_d.etica.vinculoPessoal.resposta == 'false' || this.secao_d.etica.vinculoPessoal.resposta == false )
    this.secao_d.etica.vinculoPessoal.justificativa = ''

    if(this.secao_d.etica.parentescoServidorPublico.resposta == 'false' || this.secao_d.etica.parentescoServidorPublico.resposta == false )
    this.secao_d.etica.parentescoServidorPublico.justificativa = ''

    if(this.secao_d.etica.atividadeOutrasInstituicoes.resposta == 'false' || this.secao_d.etica.atividadeOutrasInstituicoes.resposta == false )
    this.secao_d.etica.atividadeOutrasInstituicoes.justificativa = ''

    if(this.secao_d.etica.jaPrestouServicos.resposta == 'false' || this.secao_d.etica.jaPrestouServicos.resposta == false )
    this.secao_d.etica.jaPrestouServicos.justificativa = ''
    
    
  }
}
