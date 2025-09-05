import fs from "fs"
import readline from "readline";

const arquivo = "alunos.json"

export function cadastrarAlunos(){
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
  
  rl.question("Qual o nome do aluno: ", (nome) =>{
    rl.question("Qual a idade do aluno: ", (idadeStr) =>{
      const idade = Number(idadeStr)
      rl.question("Digite as notas separadas por virgulas: ", (notasStr)=>{
        const notas = notasStr.split(",").map(Number)
        const aluno = {nome, idade, notas}

	let alunos = []

	if (fs.existsSync(arquivo)){
	  const conteudo = fs.readFileSync(arquivo, "utf-8")
	  alunos = JSON.parse(conteudo)
	}

	alunos.push(aluno)
	const dadosDosAlunos = JSON.stringify(alunos, null, 2)
	fs.writeFileSync(arquivo, dadosDosAlunos)
	console.log("\nAluno cadastrado com sucesso!")
        rl.close()
      })
    })
  })
}
