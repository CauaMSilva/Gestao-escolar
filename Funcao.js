import fs from "fs"
import readline from "readline";

const arquivo = "alunos.json"

export function lerAlunos(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)
  return alunos
}
export function validarAluno(nome, idade, notas) {
  if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
    return { valido: false, mensagem: "Nome inválido. Deve ter pelo menos 2 letras." }
  }

  if (/^\d+$/.test(nome)) {
    return { valido: false, mensagem: "Nome não pode ser apenas números." }
  }

  for (let i = 0; i < notas.length; i++){
    if (notas[i] < 0 || notas[i] > 10){
      return {valido: false, mensagem: "Nota deve estar entre 0 e 10."}
    }
    if (isNaN(notas[i])){
      return {valido: false, mensagem: "Nota deve ser número"}
    }
  }

  if (idade < 0 || idade > 100){
    return {valido: false, mensagem: "Idade inválida"}
  }

  return { valido: true, mensagem: "Aluno válido!" }
}

export function mediaGeral(){
  const alunos = lerAlunos()

  let totalMedia

  totalMedia = alunos.reduce((acumulador, elemento)=>{
    return acumulador += elemento.media
}, 0)

  return totalMedia/alunos.length
}
export function maiorMedia(){
  const alunos = lerAlunos()

  let melhorAluno
  let quantTopUm

  melhorAluno = alunos.reduce((acumulador, elemento)=>{
    return elemento.media > acumulador.media ? elemento : acumulador
}, alunos[0])

  quantTopUm = alunos.filter(elemento => elemento.media === melhorAluno.media)

  console.log("=====Melhor(es) estudante(s)=====")
  quantTopUm.map((elemento) => {
  console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nMédia: ${elemento.media.toFixed(2)}`)
})
}

export function calcularMedia(notas){
  let soma = 0
  for(let i = 0; i < notas.length; i++)
    soma += notas[i]

  const media = soma/notas.length

  return media
}

export function gerarProximoId(){
  const alunos = lerAlunos()
  let maiorId = 0

  alunos.map((elemento, indice)=>{
    if (elemento.id > maiorId){
      maiorId = elemento.id
    }
  })
  return maiorId + 1
}

export function cadastrarAlunos(id, nome, idadeStr, notasStr){
  const notas = notasStr.split(",").map(Number)
  const idade = Number(idadeStr)
  const media = calcularMedia(notas)

  const validacao = validarAluno(nome, notas, idade)
  if (!validacao.valido) {
    console.log(validacao.mensagem)
    return
  }

  const aluno = {id, nome, idade, notas, media}

  let alunos = []

  if (fs.existsSync(arquivo)){
    const conteudo = fs.readFileSync(arquivo, "utf-8")
    alunos = JSON.parse(conteudo)
  }

  alunos.push(aluno)
  const dadosDosAlunos = JSON.stringify(alunos, null, 2)
  fs.writeFileSync(arquivo, dadosDosAlunos)
  console.log("\nAluno cadastrado com sucesso!")
}

export function apagarAlunoPorId(id){
  const alunos = lerAlunos()

  const novosAlunos = alunos.filter(aluno => aluno.id != id)
  const dadosAlunos = JSON.stringify(novosAlunos, null, 2)

  if (novosAlunos.length === alunos.length){
    console.log("Id não encontrado")
  }
  else{
    fs.writeFileSync(arquivo, JSON.stringify(novosAlunos, null, 2))
    console.log("Aluno excluído com sucesso!")
  }
}

export function apagarAlunoPorNome(nome){
  const alunos = lerAlunos()

  const novosAlunos = alunos.filter(aluno => aluno.nome != nome)
  const dadosAlunos = JSON.stringify(novosAlunos, null, 2)

  if (novosAlunos.length === alunos.length){
    console.log("Nome não encontrado")
  }
  else{
    fs.writeFileSync(arquivo, JSON.stringify(novosAlunos, null, 2))
    console.log("Aluno excluído com sucesso!")
  }
}

export function listarAlunos(){
  const alunos = lerAlunos()

  console.log("=======Alunos cadastrados=======\n")
  alunos.map((elemento, indice)=>{
    console.log(`Nome:${elemento.nome}\nIdade:${elemento.idade}\nNotas ${elemento.notas[0]} ${elemento.notas[1]} ${elemento.notas[2]}\n`)
  })
}

export function listarAlunosAprovados(){
  const alunos = lerAlunos()

  const aprovados = alunos.filter(elemento => elemento.media >= 7)

  console.log("=====Aprovados=====")
  aprovados.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nmedia: ${elemento.media.toFixed(2)}\n`)
  })
}

export function listarAlunosRecuperacao(){
  const alunos = lerAlunos()

  const recuperacao = alunos.filter(elemento => elemento.media >= 5 && elemento.media < 7)

  console.log("=====Recuperação=====")
  recuperacao.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nMedia: ${elemento.media.toFixed(2)}\n`)
  })
}

export function listarAlunosReprovados(){
  const alunos = lerAlunos()

  const reprovados = alunos.filter(elemento => elemento.media < 5)

  console.log("=====Reprovados=====")
  reprovados.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nMedia: ${elemento.media.toFixed(2)}\n`)
  })
}

export function editarAluno(idEditar, nomeMod, idadeMod, notasMod) {
  const alunos = lerAlunos()
  const idEdit = Number(idEditar)

  let alunoEdit = alunos.find(elemento => elemento.id == idEdit)

  if (!alunoEdit) {
    console.log("Aluno não encontrado")
    return
  }

  if (nomeMod) alunoEdit.nome = nomeMod
  if (idadeMod) alunoEdit.idade = idadeMod
  if (notasMod) alunoEdit.notas = notasMod.split(",").map(Number)

  const validacao = validarAluno(alunoEdit.nome, alunoEdit.idade, alunoEdit.notas)
  alunoEdit.media = calcularMedia(alunoEdit.notas)

  if (!validacao.valido) {
    console.log(validacao.mensagem)
    return
  }

  fs.writeFileSync(arquivo, JSON.stringify(alunos, null, 2))

  console.log("\nAluno editado com sucesso!")
}
