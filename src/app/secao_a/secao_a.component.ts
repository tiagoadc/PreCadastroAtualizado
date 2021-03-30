import { ApiService } from './../api.service';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';



const EMPRESAS: any[] = [
  { codigo: 1, nome: 'BANCO PINE S.A. - CNPJ: 62.144.175/0001-20' },
  { codigo: 2, nome: 'PINE CORRETORA DE SEGUROS LTDA - CNPJ: 27.107.955/0001-07' },
  { codigo: 3, nome: 'PINE INVESTIMENTOS DISTR.TITS.VAL.MO - CNPJ: 92.236.777/0001-78' },
  { codigo: 4, nome: 'PINE PLANEJAMENTO E SERVIÇO LTDA - CNPJ: 16.417.799/0001-56' },
  { codigo: 5, nome: 'PINE ASSESSORIA E CONSULTORIA LTDA - CNPJ: 14.802.384/0001-70' },
  { codigo: 6, nome: 'PINE ATIVOS IMOBILIÁRIOS SPE LTDA - CNPJ: 32.196.276/0001-83' }
];
const TIPOCADASTRO: any[] = [
  { id: 1, descricao: 'ATUALIZAÇÃO CADASTRAL' },
  { id: 2, descricao: 'CADASTRO FILIAL' },
  { id: 3, descricao: 'NOVO CADASTRO' }
];

@Component({
  selector: 'secao-a',
  templateUrl: './secao_a.component.html',
  styleUrls: ['./styles.css']
})


export class FormularioComponent implements OnInit {

  @Output() mudouValor = new EventEmitter();
  email = new FormControl('', [Validators.required, Validators.email]);
  emailContato = new FormControl('', [Validators.required, Validators.email]);

  isFilled: boolean = false

  ESTADOS: any[] = [

    { uf: "AC" },
    { uf: "AL" },
    { uf: "AM" },
    { uf: "AP" },
    { uf: "BA" },
    { uf: "CE" },
    { uf: "DF" },
    { uf: "ES" },
    { uf: "GO" },
    { uf: "MA" },
    { uf: "MT" },
    { uf: "MS" },
    { uf: "MG" },
    { uf: "PA" },
    { uf: "PB" },
    { uf: "PR" },
    { uf: "PE" },
    { uf: "PI" },
    { uf: "RJ" },
    { uf: "RN" },
    { uf: "RO" },
    { uf: "RS" },
    { uf: "RR" },
    { uf: "SC" },
    { uf: "SE" },
    { uf: "SP" },
    { uf: "TO" }
    
  ]

  secao_a: any = {

    empresa: {
      codigo: '',
      nome: '',
    },
    tipoCadastro: {
      id: '',
      descricao: '',
    },
    nome: '',
    pessoa: '',
    cgccpf: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    telefone: '',
    email: '',
    quantColaboradores: 0,
    historico: '',
    principaisProdutos: '',
    objeto: '',
    contato: {
      nome: '',
      telefone: '',
      cargo: '',
      email: '',
    },
    banco: '',
    agencia: '',
    conta: '',
    favorecido: {
      nome: '',
      cgccpf: ''
    }

  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  this.apiService.emitirSecao.subscribe(
    ()=> this.getSecaoA()
  )
  }

  getSecaoA() {
    this.getPessoa()
    this.getNomeEmpresa()
    this.getTipoCadastro()
    this.mudouValor.emit({ secao_a: this.secao_a })
    
  }

  getPessoa(){
    if(this.secao_a.cgccpf.length > 11)
      this.secao_a.pessoa = 'J'    
    else
    this.secao_a.pessoa = 'f'    
    
  }

  getNomeEmpresa() {
    for (let i = 0; i < EMPRESAS.length; i++) {
      if (this.secao_a.empresa.codigo == EMPRESAS[i].codigo) {
        this.secao_a.empresa.nome = EMPRESAS[i].nome
      }
    }
  }

  getTipoCadastro() {
    for (let i = 0; i < TIPOCADASTRO.length; i++) {
      if (this.secao_a.tipoCadastro.id == TIPOCADASTRO[i].id) {
        this.secao_a.tipoCadastro.descricao = TIPOCADASTRO[i].descricao
      }
    }
  }

  getErrorMessageContato() {
    if (this.emailContato.hasError('required')) {
      return 'Email requerido';
    }

    return this.emailContato.hasError('email') ? 'Email invalido' : '';
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email requerido';
    }

    return this.email.hasError('email') ? 'Email invalido' : '';
  }
  
  addEmail() {
    this.secao_a.contato.email = this.emailContato.value
    this.secao_a.email = this.email.value
        
  }


}
