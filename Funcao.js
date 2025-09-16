import fs from "fs"
import readline from "readline";

const arquivo = "alunos.json"

export function mediaGeral(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

  let totalMedia

  totalMedia = alunos.reduce((acumulador, elemento)=>{
    return acumulador += elemento.media
}, 0)

  return totalMedia/alunos.length
}
export function maiorMedia(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

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
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)
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
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

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
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

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
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

  console.log("=======Alunos cadastrados=======\n")
  alunos.map((elemento, indice)=>{
    console.log(`Nome:${elemento.nome}\nIdade:${elemento.idade}\nNotas ${elemento.notas[0]} ${elemento.notas[1]} ${elemento.notas[2]}\n`)
  })
}

export function listarAlunosAprovados(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

  const aprovados = alunos.filter(elemento => elemento.media >= 7)

  console.log("=====Aprovados=====")
  aprovados.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nmedia: ${elemento.media.toFixed(2)}\n`)
  })
}

export function listarAlunosRecuperacao(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

  const recuperacao = alunos.filter(elemento => elemento.media >= 5 && elemento.media < 7)

  console.log("=====Recuperação=====")
  recuperacao.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nMedia: ${elemento.media.toFixed(2)}\n`)
  })
}

export function listarAlunosReprovados(){
  const conteudo = fs.readFileSync(arquivo, "utf-8")
  const alunos = JSON.parse(conteudo)

  const reprovados = alunos.filter(elemento => elemento.media < 5)

  console.log("=====Reprovados=====")
  reprovados.map((elemento)=>{
    console.log(`Nome: ${elemento.nome}\nidade: ${elemento.idade}\nMedia: ${elemento.media.toFixed(2)}\n`)
  })
}

