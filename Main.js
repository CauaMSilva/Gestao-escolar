import { lerAlunos, editarAluno, validarAluno, mediaGeral, listarAlunosRecuperacao, listarAlunosAprovados, listarAlunosReprovados, maiorMedia, calcularMedia, cadastrarAlunos, apagarAlunoPorNome, apagarAlunoPorId, gerarProximoId, listarAlunos } from "./Funcao.js"
import readline from "readline"

let processo, opcaoApagar

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("Bem vindo à gestão escolar, o que deseja?\n1.cadastrar aluno\n2.apagar aluno\n3.Listar alunos\n4.Ver o aluno com maior media\n5.Relatório de turma\n6.Editar Aluno\n0.Sair\n", (processo)=>{
  switch (processo){
  case "1":
    rl.question("Digite o nome do aluno: ", (nomeAluno)=>{
      rl.question("Digite a idade do aluno: ", (idadeAluno)=>{
        rl.question("Digite as notas separada por virgulas: ", (notasAluno)=>{
          const idAluno = gerarProximoId()
          cadastrarAlunos(idAluno, nomeAluno, idadeAluno, notasAluno)
          rl.close()
        })
      })
    })
    break
  case "2":
    rl.question("Você deseja apagar pelo nome ou id?\n1.Pelo nome\n2.Pelo id\n", (opcaoApagar)=>{
      if (opcaoApagar == "1"){
        rl.question("Qual o nome do aluno: ", (nomeAluno)=>{
          apagarAlunoPorNome(nomeAluno)
          rl.close()
        })
      }
      else if(opcaoApagar == "2"){
        rl.question("Qual o id do aluno: ", (idAluno)=>{
          apagarAlunoPorId(idAluno)
          rl.close()
        })
      }
    })
    break
    case "3":
      listarAlunos()
      rl.close()
      break
    case "4":
      maiorMedia()
      rl.close()
      break
    case "5":
      listarAlunos()
      listarAlunosAprovados()
      listarAlunosReprovados()
      listarAlunosRecuperacao()
      console.log(`\nMedia geral da turma: ${mediaGeral().toFixed(2)}`)
      rl.close()
      break
    case "6":
      rl.question("Digite o id do aluno a ser editado: ", (idEstudante)=>{
        rl.question("Novo nome(ou deixe vazio): ", (nomeAluno)=>{
          rl.question("Nova idade(ou deixe vazio): ", (idadeAluno)=>{
            rl.question("Digite as novas notas separadas por virgula(1,2,3)(ou deixe vazio): ", (notasAluno)=>{
              editarAluno(idEstudante, nomeAluno, idadeAluno, notasAluno)
              rl.close()
            })
          })
        })
      })
      break
    case "0":
      console.log("\nPrograma encerrado")
      rl.close()
      break
  default:
    console.log("Opção inválida")
    rl.close()
  }
})
