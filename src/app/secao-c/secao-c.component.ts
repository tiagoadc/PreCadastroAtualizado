import { ApiService } from './../api.service';
import { element } from 'protractor';
import { DialogComponent } from './../dialog/dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Gradeitem } from './gradeitem';




export interface ElementSocios {
  id: any;
  nome: string;
  cgccpf: string;
  nacionalidade: string;
  cargo: string;
  participacao: number;
}

export interface ElementDocumento {
  nome: any
}

export interface ElementComprovante {
  nome: any
}

export interface ElementProcuracao {
  nome: any
}

export interface ElementQsc {
  nome: any
}

const ELEMENT_DATA_SOCIOS: ElementSocios[] = [];
const ELEMENT_DATA_DOCUMENTO: ElementDocumento[] = [];
const ELEMENT_DATA_COMPROVANTE: ElementComprovante[] = [];
const ELEMENT_DATA_PROCURACAO: ElementProcuracao[] = [];
const ELEMENT_DATA_QSC: ElementQsc[] = [];

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

@Component({
  selector: 'secao-c',
  templateUrl: './secao-c.component.html',
  styleUrls: ['./styles.css']
})


export class SecaoCComponent implements OnInit {

  @Output() mudouValor = new EventEmitter();

  filesDocumento: any = []
  filesComprovante: any = []
  filesProcuracao: any = []
  filesQsc: any = []

  secao_c: any = {
    societarias: {
      responsaveis: "",
      socios: [],
      fileIndexes: {
        documentacao: [],
        comprovante: [],
        procuracao: [],
        qsc: [],
        checkDocumento: '',
        checkComprovante: '',
        checkProcuracao: '',
        checkQsc: '',

      }
    }
  }
  //secao_DisplayAcionario = []

  displayedColumns: string[] = ['nome', 'cgccpf', 'nacionalidade', 'cargo', 'participacao', 'remover'];
  dataSource = new MatTableDataSource<ElementSocios>(ELEMENT_DATA_SOCIOS);

  displayedDocumento: string[] = ['nome'];
  dataSourceDocumento = new MatTableDataSource<ElementDocumento>(ELEMENT_DATA_DOCUMENTO);

  displayedComprovante: string[] = ['nome'];
  dataSourceComprovante = new MatTableDataSource<ElementComprovante>(ELEMENT_DATA_COMPROVANTE);

  displayedProcuracao: string[] = ['nome'];
  dataSourceProcuracao = new MatTableDataSource<ElementProcuracao>(ELEMENT_DATA_PROCURACAO);

  displayedQsc: string[] = ['nome'];
  dataSourceQsc = new MatTableDataSource<ElementQsc>(ELEMENT_DATA_QSC);

  checkDocumento: boolean = false
  checkComprovante: any = false
  checkProcuracao: any = false
  checkQsc: any = false
  info: any
  infoArquivo = 0
  hidden = false;
  contadorInvalidos: any

  constructor(public dialog: MatDialog, public change: ChangeDetectorRef, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.emitirSecao.subscribe(
      () => this.getSecaoC()
    )

  }
  getSecaoC() {
    this.salvarObjeto()
    this.mudouValor.emit({ secao_c: this.secao_c })
    //this.change.markForCheck();
  }
  
  // ------ display acionarios ------
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.verifyDialog(result)

    });
  }

  verifyDialog(data: any) {
    if (data != null) {
      ELEMENT_DATA_SOCIOS.push(data);
      // this.secao_DisplayAcionario.push(data)
      if (!this.validateFields(data)) {
        //this.secao_c.societarias.socios.push(data)
        this.refreshTableSorce()
      }
      else {
        alert("Preencha todos os campos")
      }

    }
  }

  validateFields(data) {

    if (data.nome == null
      || data.cgccpf == null
      || data.nacionalidade == null
      || data.cargo == null
      || data.participacao == null) {
      return true

    } else {
      return false
    }
  }


  refreshTableSorce() {
    this.dataSource = new MatTableDataSource<ElementSocios>(ELEMENT_DATA_SOCIOS);
  }

  // -------- select files documentação-------

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
        this.contadorInvalidos = 1
      }
    }
    if (this.contadorInvalidos > 0) {
      alert("Erro: Arquivos inválidos não foram inseridos")
      this.contadorInvalidos = 0
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

  refreshTableSorceFileDocumento() {
    this.dataSourceDocumento = new MatTableDataSource<ElementDocumento>(ELEMENT_DATA_DOCUMENTO);
  }


  //--------- select files Comprovante -----------


  selectFilesComprovante(fileInputEvent: any) {

    for (var i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        let gradeitem = new Gradeitem(
          fileInputEvent.target.files[i].name,
          fileInputEvent.target.files[i]
        )
        this.filesComprovante.push(gradeitem)
      }
      else {
        this.contadorInvalidos = 1
      }
    }
    if (this.contadorInvalidos > 0) {
      alert("Erro: Arquivos inválidos não foram inseridos")
      this.contadorInvalidos = 0
    }
    this.addNameFilesGradeComprovante(fileInputEvent)
  }

  addNameFilesGradeComprovante(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        ELEMENT_DATA_COMPROVANTE.push({ nome: fileInputEvent.target.files[i].name })
      }
    }
    this.refreshTableSorceFileComprovante()
  }


  refreshTableSorceFileComprovante() {
    this.dataSourceComprovante = new MatTableDataSource<ElementComprovante>(ELEMENT_DATA_COMPROVANTE);
  }


  //--------- select files Procuração -----------


  selectFilesProcuracao(fileInputEvent: any) {

    for (var i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        let gradeitem = new Gradeitem(
          fileInputEvent.target.files[i].name,
          fileInputEvent.target.files[i]
        )
        this.filesProcuracao.push(gradeitem)
      }
      else {
        this.contadorInvalidos = 1
      }
    }
    if (this.contadorInvalidos > 0) {
      alert("Erro: Arquivos inválidos não foram inseridos")
      this.contadorInvalidos = 0
    }
    this.addNameFilesGradeProcuracao(fileInputEvent)
  }

  addNameFilesGradeProcuracao(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        ELEMENT_DATA_PROCURACAO.push({ nome: fileInputEvent.target.files[i].name })

      }
    }
    this.refreshTableSorceFileProcuracao()
  }

  refreshTableSorceFileProcuracao() {
    this.dataSourceProcuracao = new MatTableDataSource<ElementProcuracao>(ELEMENT_DATA_PROCURACAO);
  }

  //--------- select files QSC -----------

  selectFilesQsc(fileInputEvent: any) {

    for (var i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        let gradeitem = new Gradeitem(
          fileInputEvent.target.files[i].name,
          fileInputEvent.target.files[i]
        )
        this.filesQsc.push(gradeitem)
      }
      else {
        this.contadorInvalidos = 1
      }
    }
    if (this.contadorInvalidos > 0) {
      alert("Erro: Arquivos inválidos não foram inseridos")
      this.contadorInvalidos = 0
    }
    this.addNameFilesGradeQsc(fileInputEvent)
  }

  addNameFilesGradeQsc(fileInputEvent: any) {
    for (let i = 0; i < fileInputEvent.target.files.length; i++) {
      if (this.validFileType(fileInputEvent.target.files[i])) {
        ELEMENT_DATA_QSC.push({ nome: fileInputEvent.target.files[i].name })
      }
    }
    this.refreshTableSorceFileQsc()
  }

  refreshTableSorceFileQsc() {
    this.dataSourceQsc = new MatTableDataSource<ElementQsc>(ELEMENT_DATA_QSC);
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
  }

  cleanFilesComprovante() {
    this.checkComprovante = !this.checkComprovante
    if (this.filesComprovante.length > 0) {
      if (!this.checkComprovante) {
        if (confirm(" Ao desmarcar os checkbox, os arquivos serão apagados")) {

          if (!this.checkComprovante) {
            ELEMENT_DATA_COMPROVANTE.splice(0, ELEMENT_DATA_COMPROVANTE.length)
            this.filesComprovante.splice(0, this.filesComprovante.length)
            this.refreshTableSorceFileComprovante()
            this.checkComprovante = !this.checkComprovante
          }
        }
        else {
          this.checkComprovante = false
        }
      } else {
        this.checkComprovante = !this.checkComprovante
      }
    } else {
      this.checkComprovante = !this.checkComprovante
    }

  }

  cleanFilesProcuracao() {
    this.checkProcuracao = !this.checkProcuracao
    if (this.filesProcuracao.length > 0) {
      if (!this.checkProcuracao) {
        if (confirm(" Ao desmarcar os checkbox, os arquivos serão apagados")) {

          if (!this.checkProcuracao) {
            ELEMENT_DATA_PROCURACAO.splice(0, ELEMENT_DATA_PROCURACAO.length)
            this.filesProcuracao.splice(0, this.filesProcuracao.length)
            this.refreshTableSorceFileProcuracao()
            this.checkProcuracao = !this.checkProcuracao
          }
        }
        else {
          this.checkProcuracao = false
        }
      } else {
        this.checkProcuracao = !this.checkProcuracao
      }
    } else {
      this.checkProcuracao = !this.checkProcuracao
    }
  }

  cleanFilesQsc() {
    this.checkQsc = !this.checkQsc
    if (this.filesQsc.length > 0) {
      if (!this.checkQsc) {
        if (confirm(" Ao desmarcar os checkbox, os arquivos serão apagados")) {

          if (!this.checkQsc) {
            ELEMENT_DATA_QSC.splice(0, ELEMENT_DATA_QSC.length)
            this.filesQsc.splice(0, this.filesQsc.length)
            this.refreshTableSorceFileQsc()
            this.checkQsc = !this.checkQsc
          }
        }
        else {
          this.checkQsc = false
        }
      } else {
        this.checkQsc = !this.checkQsc
      }
    } else {
      this.checkQsc = !this.checkQsc
    }
  }

  showInfo(info: any) {
    this.info = info

  }
  showInfoArquivos(info: any) {
    this.infoArquivo = info

  }

  deletAcionario(element) {
    for (let i = 0; i < ELEMENT_DATA_SOCIOS.length; i++) {
      if (ELEMENT_DATA_SOCIOS[i].id == element.id) {
        ELEMENT_DATA_SOCIOS.splice(i, 1);
      }

    }
    this.refreshTableSorce()


  }
  questionIsFilled(questao: any) {

    if (questao == '') {

      return true
    }
    else {
      return false
    }
  }

  salvarObjeto() {
    this.secao_c.societarias.fileIndexes.checkProcuracao = this.checkProcuracao
    this.secao_c.societarias.fileIndexes.checkDocumento = this.checkDocumento
    this.secao_c.societarias.fileIndexes.checkQsc = this.checkQsc
    this.secao_c.societarias.fileIndexes.checkComprovante = this.checkComprovante

    this.secao_c.societarias.socios = ELEMENT_DATA_SOCIOS
    this.secao_c.societarias.fileIndexes.documentacao = this.filesDocumento
    this.secao_c.societarias.fileIndexes.comprovante = this.filesComprovante
    this.secao_c.societarias.fileIndexes.procuracao = this.filesProcuracao
    this.secao_c.societarias.fileIndexes.qsc = this.filesQsc
  }

  
}

