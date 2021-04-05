import { ApiService } from './../api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Gradeitem } from '../secao-c/gradeitem';

export interface ElementDocumento {
  nome: any
}
const ELEMENT_DATA_DOCUMENTO: ElementDocumento[] = [];

const fileTypes = [
  "application/pdf",
  "image/ico",
  "image/cur",
  "image/jfif",
  "image/pjp",
  "image/tif",
  "image/tiff",
  "image/rtf",
  "text/plain",
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

const instaladoNasDependencias: any = [
  { id: 1, descricao: 'Dependência do banco, sem a integração com serviços externos' },
  { id: 2, descricao: 'Dependência do banco, com a integração com serviços externos' },
  { id: 3, descricao: 'Computação em Nuvem (SaaS / IaaS / PaaS)' }]

const modeloNuvem: any = [
  { id: 1, descricao: 'SaaS' },
  { id: 2, descricao: 'IaaS' },
  { id: 3, descricao: 'PaaS' }]



@Component({
  selector: 'secao-e',
  templateUrl: './secao-e.component.html',
  styleUrls: ['./styles.css']
})
export class SecaoEComponent implements OnInit {
  info: false
  @Output() mudouValor = new EventEmitter();

  secao_e: any = {
    segurancaInformacao: {
      dadoInseridoNaPlataforma: false,
      quaisDadosProcessados: '',
      dadosSensiveis: {
        resposta: '',
        origemRacialEtnica: false,
        opiniaoPolitica: false,
        saude: false,
        orientacaoSexual: false,
        religiao: false,
        sindicado: false,
        genetico: false,
      },
      instaladoNasDependencias: {
        id: '',
        descricao: ''
      },
      modeloNuvem: {
        id: '',
        descricao: '',
      },
      paisDados: '',
      impactoIndisponibilidade: {
        resposta: '',
        justificativa: '',
      },
      fileIndexes: {
        contrato: [],
        checkDocumento: ''
      }
    }
  }
  checkDocumento: boolean = false
  displayedDocumento: string[] = ['nome'];
  dataSourceDocumento = new MatTableDataSource<ElementDocumento>(ELEMENT_DATA_DOCUMENTO);
  filesDocumento: any = []
  contador: any
  constructor(public dialog: MatDialog, public change: ChangeDetectorRef, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.emitirSecao.subscribe(
      () => this.getSecaoE()
    )
  }

  getSecaoE() {
    this.cleanJustificativa()    
    this.getFileIndexes()
    this.getInstaladoNasDependencias()
    this.getModeloNuvem()
    this.secao_e.segurancaInformacao.fileIndexes.checkDocumento = this.checkDocumento
    this.mudouValor.emit({ secao_e: this.secao_e })

  }

  getInstaladoNasDependencias() {
    for (let i = 0; i < instaladoNasDependencias.length; i++) {
      if (this.secao_e.segurancaInformacao.instaladoNasDependencias.id == instaladoNasDependencias[i].id) {
        this.secao_e.segurancaInformacao.instaladoNasDependencias.descricao = instaladoNasDependencias[i].descricao
      }
    }
  }
  getModeloNuvem() {
    for (let i = 0; i < modeloNuvem.length; i++) {
      if (this.secao_e.segurancaInformacao.modeloNuvem.id == modeloNuvem[i].id) {
        this.secao_e.segurancaInformacao.modeloNuvem.descricao = modeloNuvem[i].descricao
      }
    }
  }
  getFileIndexes() {

    this.secao_e.segurancaInformacao.fileIndexes.contrato = this.filesDocumento
  }

  dadosSensiveisChech() {

    this.secao_e.segurancaInformacao.dadosSensiveis.origemRacialEtnica = false
    this.secao_e.segurancaInformacao.dadosSensiveis.opiniaoPolitica = false
    this.secao_e.segurancaInformacao.dadosSensiveis.saude = false
    this.secao_e.segurancaInformacao.dadosSensiveis.orientacaoSexual = false
    this.secao_e.segurancaInformacao.dadosSensiveis.religiao = false
    this.secao_e.segurancaInformacao.dadosSensiveis.sindicado = false
    this.secao_e.segurancaInformacao.dadosSensiveis.genetico = false
    //console.log(this.secao_e)
    //console.log(event.target.checked)

  }
  showInfo(info: any) {
    this.info = info
  }

  selectFilesDocumento(fileInputEvent: any) {

    for (var i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        let gradeitem = new Gradeitem(
          fileInputEvent.target.files[i].name,
          fileInputEvent.target.files[i]
        )
        this.filesDocumento.push(gradeitem)

      }
      else {
        this.contador = 1
      }
    }

    if (this.contador > 0) {
      alert("Erro: Arquivos inválidos não foram inseridos")
      this.contador = 0
    }
    this.addNameFilesGradeDocumento(fileInputEvent)
  }

  addNameFilesGradeDocumento(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        ELEMENT_DATA_DOCUMENTO.push({ nome: fileInputEvent.target.files[i].name })
      }
    }
    this.refreshTableSorceFileDocumento()
  }

  validFileType(file: any) {
    return fileTypes.includes(file.type);
  }

  cleanFilesDocumento() {
  
    this.checkDocumento = !this.checkDocumento
    if (this.filesDocumento.length > 0) {
      if (!this.checkDocumento) {
        if (confirm(" Ao desmarcar os checkbox, os arquivos serão apagados")) {

          if (!this.checkDocumento) {
            ELEMENT_DATA_DOCUMENTO.splice(0, ELEMENT_DATA_DOCUMENTO.length)
            this.filesDocumento.splice(0, this.filesDocumento.length)
            this.refreshTableSorceFileDocumento()
            this.checkDocumento = !this.checkDocumento
          }
        }
        else {
          this.checkDocumento = false
        }
      }
      else {
        this.checkDocumento = !this.checkDocumento
      }
    }
    else {
      this.checkDocumento = !this.checkDocumento
    }

   /* this.checkDocumento = !this.checkDocumento
    if (!this.checkDocumento) {
      ELEMENT_DATA_DOCUMENTO.splice(0, ELEMENT_DATA_DOCUMENTO.length)
      this.filesDocumento.splice(0, this.filesDocumento.length)
      this.refreshTableSorceFileDocumento()
    } */
  }
  refreshTableSorceFileDocumento() {
    this.dataSourceDocumento = new MatTableDataSource<ElementDocumento>(ELEMENT_DATA_DOCUMENTO);
  }

  cleanJustificativa() {
    if (this.secao_e.segurancaInformacao.dadoInseridoNaPlataforma == 'false' || this.secao_e.segurancaInformacao.dadoInseridoNaPlataforma == false)
      this.secao_e.segurancaInformacao.quaisDadosProcessados = ''

      if (this.secao_e.segurancaInformacao.impactoIndisponibilidade.resposta == 'false' || this.secao_e.segurancaInformacao.impactoIndisponibilidade.resposta == false)
      this.secao_e.segurancaInformacao.impactoIndisponibilidade.justificativa = ''
  }

  cleanDados(){
    this.cleanJustificativa()
    this.dadosSensiveisChech()
    this.secao_e.segurancaInformacao.dadoInseridoNaPlataforma = false
    this.secao_e.segurancaInformacao.quaisDadosProcessados = ''
    this.secao_e.segurancaInformacao.instaladoNasDependencias.id = ''
    this.secao_e.segurancaInformacao.instaladoNasDependencias.descricao = ''
    this.secao_e.segurancaInformacao.dadosSensiveis.resposta = ''
    this.secao_e.segurancaInformacao.modeloNuvem.id = ''
    this.secao_e.segurancaInformacao.modeloNuvem.descricao = ''
    this.secao_e.segurancaInformacao.paisDados = ''
    this.secao_e.segurancaInformacao.impactoIndisponibilidade.resposta = ''
    this.secao_e.segurancaInformacao.impactoIndisponibilidade.justificativa = ''
    ELEMENT_DATA_DOCUMENTO.splice(0, ELEMENT_DATA_DOCUMENTO.length)
    this.filesDocumento.splice(0, this.filesDocumento.length)
    this.checkDocumento = false
    this.refreshTableSorceFileDocumento()
  }

}
