

export class Socios {

    socios: any = {
        nome: '',
        cgccpf: '',
        nacionalidade: '',
        cargo: '',
        participacao: 0
    }

    constructor(socios: any) {
    this.socios.nome = socios.nome
    this.socios.cgccpf = socios.cgccpf
    this.socios.nacionalidade = socios.nacionalidade
    this.socios.cargo = socios.cargo
    this.socios.participacao = parseFloat(socios.participacao)
    }
}

export class Validate {

    responseJson: any = {

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
        },
        terceiros: {
            nome: '',
            cpf: '',
            rg: '',
            custo: 0,
        },
        societarias: {
            responsaveis: "",
            socios: [],
            fileIndexes: {
                documentacao: [],
                comprovante: [],
                procuracao: [],
                qsc: [],
            }
        },
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
        },
        segurancaInformacao: {
            dadoInseridoNaPlataforma: '',
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
            }
        },
        responsavelPreenchimento: ''
    }

    formularioObj: any
    revisarCampos: any = []
    files: any = []
    constructor(responseFormulario: any) {
        this.formularioObj = responseFormulario
    }

    formatJson() {
        // Se????o A
        this.responseJson.empresa = this.formularioObj.empresa
        this.responseJson.tipoCadastro = this.formularioObj.tipoCadastro
        this.responseJson.nome = this.formularioObj.nome
        this.responseJson.pessoa = this.formularioObj.pessoa
        this.responseJson.cgccpf = this.formularioObj.cgccpf
        this.responseJson.endereco = this.formularioObj.endereco
        this.responseJson.numero = this.formularioObj.numero
        this.responseJson.complemento = this.formularioObj.complemento
        this.responseJson.bairro = this.formularioObj.bairro
        this.responseJson.cidade = this.formularioObj.cidade
        this.responseJson.uf = this.formularioObj.uf
        this.responseJson.cep = this.formularioObj.cep
        this.responseJson.telefone = this.formularioObj.telefone
        this.responseJson.email = this.formularioObj.email
        this.responseJson.quantColaboradores = this.formularioObj.quantColaboradores
        this.responseJson.historico = this.formularioObj.historico
        this.responseJson.principaisProdutos = this.formularioObj.principaisProdutos
        this.responseJson.objeto = this.formularioObj.objeto
        this.responseJson.contato.nome = this.formularioObj.contato.nome
        this.responseJson.contato.telefone = this.formularioObj.contato.telefone
        this.responseJson.contato.cargo = this.formularioObj.contato.cargo
        this.responseJson.contato.email = this.formularioObj.contato.email
        this.responseJson.banco = this.formularioObj.banco
        this.responseJson.agencia = this.formularioObj.agencia
        this.responseJson.conta = this.formularioObj.conta
        this.responseJson.favorecido.nome = this.formularioObj.favorecido.nome
        this.responseJson.favorecido.cgccpf = this.formularioObj.favorecido.cgccpf
        
        //Se????o B
        this.responseJson.terceiros.nome = this.formularioObj.terceiros.nome
        this.responseJson.terceiros.cpf = this.formularioObj.terceiros.cpf
        this.responseJson.terceiros.rg = this.formularioObj.terceiros.rg
        this.responseJson.terceiros.custo = parseFloat(this.formularioObj.terceiros.custo)

        // Se????o C
        this.responseJson.societarias.responsaveis = this.formularioObj.societarias.responsaveis
        this.formatSocios()
        this.orderFiles()

        //Se????o D
        var respostaReus = this.formularioObj.etica.reus.resposta == 'true'
        this.responseJson.etica.reus.resposta = respostaReus
        this.responseJson.etica.reus.justificativa = this.formularioObj.etica.reus.justificativa

        var respostaVinculo = this.formularioObj.etica.vinculoPessoal.resposta == 'true'
        this.responseJson.etica.vinculoPessoal.resposta = respostaVinculo
        this.responseJson.etica.vinculoPessoal.justificativa = this.formularioObj.etica.vinculoPessoal.justificativa
        
        var respostaParentesco = this.formularioObj.etica.parentescoServidorPublico.resposta == 'true'
        this.responseJson.etica.parentescoServidorPublico.resposta = respostaParentesco
        this.responseJson.etica.parentescoServidorPublico.justificativa = this.formularioObj.etica.parentescoServidorPublico.justificativa
        
        var atividades = this.formularioObj.etica.atividadeOutrasInstituicoes.resposta == 'true'
        this.responseJson.etica.atividadeOutrasInstituicoes.resposta = atividades
        this.responseJson.etica.atividadeOutrasInstituicoes.justificativa = this.formularioObj.etica.atividadeOutrasInstituicoes.justificativa
        
        
        this.responseJson.etica.principalCliente1 = this.formularioObj.etica.principalCliente1
        this.responseJson.etica.principalCliente2 = this.formularioObj.etica.principalCliente2
        this.responseJson.etica.principalCliente3 = this.formularioObj.etica.principalCliente3

        var respostaServicos = this.formularioObj.etica.jaPrestouServicos.resposta == 'true'
        this.responseJson.etica.jaPrestouServicos.resposta = respostaServicos
        this.responseJson.etica.jaPrestouServicos.justificativa = this.formularioObj.etica.jaPrestouServicos.justificativa

        // Secao E
        var respostaDado = this.formularioObj.segurancaInformacao.dadoInseridoNaPlataforma == 'true'
        this.responseJson.segurancaInformacao.dadoInseridoNaPlataforma = respostaDado
        this.responseJson.segurancaInformacao.quaisDadosProcessados = this.formularioObj.segurancaInformacao.quaisDadosProcessados

        var respostaSensiveis = this.formularioObj.segurancaInformacao.dadosSensiveis.resposta == 'true'
        this.responseJson.segurancaInformacao.dadosSensiveis.resposta = respostaSensiveis
        this.responseJson.segurancaInformacao.dadosSensiveis.origemRacialEtnica = this.formularioObj.segurancaInformacao.dadosSensiveis.origemRacialEtnica 
        this.responseJson.segurancaInformacao.dadosSensiveis.opiniaoPolitica = this.formularioObj.segurancaInformacao.dadosSensiveis.opiniaoPolitica
        this.responseJson.segurancaInformacao.dadosSensiveis.saude = this.formularioObj.segurancaInformacao.dadosSensiveis.saude
        this.responseJson.segurancaInformacao.dadosSensiveis.orientacaoSexual = this.formularioObj.segurancaInformacao.dadosSensiveis.orientacaoSexual
        this.responseJson.segurancaInformacao.dadosSensiveis.religiao = this.formularioObj.segurancaInformacao.dadosSensiveis.religiao
        this.responseJson.segurancaInformacao.dadosSensiveis.sindicado = this.formularioObj.segurancaInformacao.dadosSensiveis.sindicado
        this.responseJson.segurancaInformacao.dadosSensiveis.genetico = this.formularioObj.segurancaInformacao.dadosSensiveis.genetico
        this.responseJson.segurancaInformacao.instaladoNasDependencias = this.formularioObj.segurancaInformacao.instaladoNasDependencias
        this.responseJson.segurancaInformacao.modeloNuvem = this.formularioObj.segurancaInformacao.modeloNuvem 
        this.responseJson.segurancaInformacao.paisDados = this.formularioObj.segurancaInformacao.paisDados 
        this.responseJson.segurancaInformacao.impactoIndisponibilidade = this.responseJson.segurancaInformacao.impactoIndisponibilidade
        
        //Se????o F

        this.responseJson.responsavelPreenchimento = this.formularioObj.responsavelPreenchimento

        return this.responseJson
    }

    orderFiles() {
        let contador = 0

        for (let i = 0; i < this.formularioObj.societarias.fileIndexes.documentacao.length; i++) {
            this.files.push(this.formularioObj.societarias.fileIndexes.documentacao[i].gradeItem.file)
            this.responseJson.societarias.fileIndexes.documentacao.push(contador)
            contador++
        }

        for (let i = 0; i < this.formularioObj.societarias.fileIndexes.comprovante.length; i++) {
            this.files.push(this.formularioObj.societarias.fileIndexes.comprovante[i].gradeItem.file)
            this.responseJson.societarias.fileIndexes.comprovante.push(contador)
            contador++
        }
        for (let i = 0; i < this.formularioObj.societarias.fileIndexes.procuracao.length; i++) {
            this.files.push(this.formularioObj.societarias.fileIndexes.procuracao[i].gradeItem.file)
            this.responseJson.societarias.fileIndexes.procuracao.push(contador)
            contador++
        }
        for (let i = 0; i < this.formularioObj.societarias.fileIndexes.qsc.length; i++) {
            this.files.push(this.formularioObj.societarias.fileIndexes.qsc[i].gradeItem.file)
            this.responseJson.societarias.fileIndexes.qsc.push(contador)
            contador++
        }

        for (let i = 0; i < this.formularioObj.segurancaInformacao.fileIndexes.contrato.length; i++) {
            this.files.push(this.formularioObj.segurancaInformacao.fileIndexes.contrato[i].gradeItem.file)
            this.responseJson.segurancaInformacao.fileIndexes.contrato.push(contador)
            contador++
        }

    }

    formatSocios() {
        
        for (let i = 0; i < this.formularioObj.societarias.socios.length; i++){
            let socios = new Socios(this.formularioObj.societarias.socios[i])
            this.responseJson.societarias.socios.push(socios.socios)
        }

        //this.responseJson.societarias.socios
    }

    validate() {
        if (this.formularioObj.empresa.codigo == '')
            this.revisarCampos.push("Se????o A preencher Empresa-- ")

        if (this.formularioObj.tipoCadastro.id == '')
            this.revisarCampos.push("Se????o A preencher Tipo cadastro-- ")

        if (this.formularioObj.nome == '')
            this.revisarCampos.push("Se????o A preencher Razao Social-- ")

        if (this.formularioObj.pessoa == '')
            this.revisarCampos.push("Se????o A preencher pessoa-- ")

        if (this.formularioObj.cgccpf == '')
            this.revisarCampos.push("Se????o A preencher Cpf/Cnpj-- ")

        if (this.formularioObj.endereco == '')
            this.revisarCampos.push("Se????o A preencher endereco-- ")

        if (this.formularioObj.numero == '')
            this.revisarCampos.push("Se????o A preencher Numero-- ")

        if (this.formularioObj.complemento == '')
            this.revisarCampos.push("Se????o A preencher Complemento-- ")

        if (this.formularioObj.bairro == '')
            this.revisarCampos.push("Se????o A preencher Bairro-- ")

        if (this.formularioObj.cidade == '')
            this.revisarCampos.push("Se????o A preencher Cidade-- ")

        if (this.formularioObj.uf == '')
            this.revisarCampos.push("Se????o A preencher Estado-- ")

        if (this.formularioObj.cep == '')
            this.revisarCampos.push("Se????o A preencher Cep-- ")

        if (this.formularioObj.telefone == '')
            this.revisarCampos.push("Se????o A preencher Telefone-- ")

        if (this.formularioObj.email == '')
            this.revisarCampos.push("Se????o A preencher Email-- ")

        if (this.formularioObj.quantColaboradores == 0)
            this.revisarCampos.push("Se????o A preencher Quantidade de Colaboradores-- ")

        if (this.formularioObj.historico == '')
            this.revisarCampos.push("Se????o A preencher Historico-- ")

        if (this.formularioObj.principaisProdutos == '')
            this.revisarCampos.push("Se????o A preencher Principais produtos-- ")

        if (this.formularioObj.objeto == '')
            this.revisarCampos.push("Se????o A preencher Produto Servi??o ou Objeto-- ")

        if (this.formularioObj.contato.nome == '')
            this.revisarCampos.push("Se????o A preencher Nome do Contato-- ")

        if (this.formularioObj.contato.telefone == '')
            this.revisarCampos.push("Se????o A preencher Telefone do Contato-- ")

        if (this.formularioObj.contato.cargo == '')
            this.revisarCampos.push("Se????o A preencher Cargo do Contato-- ")

        if (this.formularioObj.contato.email == '')
            this.revisarCampos.push("Se????o A preencher Email do Contato-- ")

        if (this.formularioObj.banco == '')
            this.revisarCampos.push("Se????o A preencher Banco-- ")

        if (this.formularioObj.agencia == '')
            this.revisarCampos.push("Se????o A preencher Agencia-- ")

        if (this.formularioObj.conta == '')
            this.revisarCampos.push("Se????o A preencher Conta-- ")

        if (this.formularioObj.favorecido.nome == '')
            this.revisarCampos.push("Se????o A preencher Nome Favorecido-- ")

        if (this.formularioObj.favorecido.cgccpf == '')
            this.revisarCampos.push("Se????o A preencher cpf/cnpj do Favorecido-- ")

        if (this.formularioObj.terceiros.nome == '')
            this.revisarCampos.push("Se????o B preencher Nome Profissional-- ")

        if (this.formularioObj.terceiros.cpf == '')
            this.revisarCampos.push("Se????o B preencher cpf Profissional-- ")

        if (this.formularioObj.terceiros.rg == '')
            this.revisarCampos.push("Se????o B preencher RG Profissional-- ")

        if (this.formularioObj.terceiros.custo == '')
            this.revisarCampos.push("Se????o B preencher Custo Profissional-- ")

        if (this.formularioObj.societarias.responsaveis == '')
            this.revisarCampos.push("Se????o C preencher Resposavel Societarias-- ")

        if (this.formularioObj.societarias.socios.length > 0) {
            let contador = 0
            for (let i = 0; i < this.formularioObj.societarias.socios.length; i++) {

                contador += parseFloat(this.formularioObj.societarias.socios[i].participacao)
            }
            if (contador != 100) {
                this.revisarCampos.push("Se????o C a Soma da Participa????o dos acionarios ?? diferente de 100%-- ")
            }
        }
        else {
            this.revisarCampos.push("Se????o C campo Acionario N??o preenchido-- ")
        }

        if (this.formularioObj.societarias.fileIndexes.checkDocumento == true) {
            if (this.formularioObj.societarias.fileIndexes.documentacao.length <= 0) {
                this.revisarCampos.push("Se????o C Faltando documenta????o societaria-- ")
            }
        }

        if (this.formularioObj.societarias.fileIndexes.checkComprovante == true) {
            if (this.formularioObj.societarias.fileIndexes.comprovante.length <= 0) {
                this.revisarCampos.push("Se????o C Faltando documento de comprovante e situa????o cadastral-- ")
            }
        }

        if (this.formularioObj.societarias.fileIndexes.checkProcuracao == true) {
            if (this.formularioObj.societarias.fileIndexes.procuracao.length <= 0) {
                this.revisarCampos.push("Se????o C Faltando documento de procuracao-- ")
            }
        }

        if (this.formularioObj.societarias.fileIndexes.checkQsc == true) {
            if (this.formularioObj.societarias.fileIndexes.qsc.length <= 0) {
                this.revisarCampos.push("Se????o C Faltando documento de Quadro Societario e Administrativo-- ")
            }
        }

        if (this.formularioObj.etica.reus.resposta == 'true')
            if (this.formularioObj.etica.reus.justificativa == '')
                this.revisarCampos.push("Se????o D Campo de justificativa em branco das Quest??es ??ticas-- ")

        if (this.formularioObj.etica.vinculoPessoal.resposta == 'true')
            if (this.formularioObj.etica.vinculoPessoal.justificativa == '')
                this.revisarCampos.push("Se????o D Campo de justificativa em branco das Quest??es ??ticas-- ")

        if (this.formularioObj.etica.parentescoServidorPublico.resposta == 'true')
            if (this.formularioObj.etica.parentescoServidorPublico.justificativa == '')
                this.revisarCampos.push("Se????o D Campo de justificativa em branco das Quest??es ??ticas-- ")

        if (this.formularioObj.etica.atividadeOutrasInstituicoes.resposta == 'true')
            if (this.formularioObj.etica.atividadeOutrasInstituicoes.justificativa == '')
                this.revisarCampos.push("Se????o D Campo de justificativa em branco das Quest??es ??ticas-- ")

        if (this.formularioObj.etica.principalCliente1 == '')
            this.revisarCampos.push("Se????o D Campo de principal cliente 1 em branco-- ")

        if (this.formularioObj.etica.principalCliente2 == '')
            this.revisarCampos.push("Se????o D Campo de principal cliente 2 em branco-- ")

        if (this.formularioObj.etica.principalCliente3 == '')
            this.revisarCampos.push("Se????o D Campo de principal cliente 3 em branco-- ")

        if (this.formularioObj.etica.jaPrestouServicos.resposta == 'true')
            if (this.formularioObj.etica.jaPrestouServicos.justificativa == '')
                this.revisarCampos.push("Se????o D Campo de justificativa em Branco das Questoes ??ticas-- ")

        
            
        if (this.formularioObj.segurancaInformacao.dadoInseridoNaPlataforma == 'true'){
            if (this.formularioObj.segurancaInformacao.quaisDadosProcessados == '')
                this.revisarCampos.push("Se????o E Campo de justificativa em Branco das Questoes de seguran??a da informa????o-- ")

        if (this.formularioObj.segurancaInformacao.dadosSensiveis.resposta == 'true')
            if (this.formularioObj.segurancaInformacao.dadosSensiveis.origemRacialEtnica == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.opiniaoPolitica == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.saude == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.orientacaoSexual == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.religiao == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.sindicado == false
                && this.formularioObj.segurancaInformacao.dadosSensiveis.genetico == false)
                this.revisarCampos.push("Se????o E Preencher Dados Sensiveis-- ")

        if (this.formularioObj.segurancaInformacao.instaladoNasDependencias.id == '')
            this.revisarCampos.push("Se????o E Selecionar Dependencia-- ")

        if (this.formularioObj.segurancaInformacao.modeloNuvem.id == '')
            this.revisarCampos.push("Se????o E Selecionar Modelo de Nuvem-- ")

        if (this.formularioObj.segurancaInformacao.paisDados == '')
            this.revisarCampos.push("Se????o E Pais dos Dados em branco-- ")

        if (this.formularioObj.segurancaInformacao.impactoIndisponibilidade.resposta == 'true')
            if (this.formularioObj.segurancaInformacao.impactoIndisponibilidade.justificativa == '')
                this.revisarCampos.push("Se????o E justificativa de Impacto de Indisponibilidade em branco-- ")

        if (this.formularioObj.segurancaInformacao.fileIndexes.checkDocumento == true)
            if (this.formularioObj.segurancaInformacao.fileIndexes.contrato.length <= 0)
                this.revisarCampos.push("Se????o E Faltando documento contrato de Presta????o de Servi??os de software-- ")
            }

        if (this.formularioObj.responsavelPreenchimento == '')
            this.revisarCampos.push("Se????o F Compo de responsavel pelo preenchimento em branco-- ")

        return this.revisarCampos
    }


}
