# Gestão Escolar - Node.js

Um sistema simples de **gestão escolar** desenvolvido em **Node.js**, que permite cadastrar, editar, listar e remover alunos, além de gerar relatórios de médias e status da turma. O projeto utiliza **ES Modules**, arquivos JSON para armazenamento dos dados e interface via **CLI (Command Line Interface)**.

---

📝 Autor

Cauã Maciel Silva

Projeto educativo para praticar Node.js, manipulação de arquivos JSON e lógica de programação.

---

## 📁 Estrutura do Projeto

gestao-escolar/ 
│ ├── src/                     # Código-fonte 

│   ├── Main.js              # Arquivo principal (interface CLI) 

│   └── Funcao.js            # Funções do sistema (CRUD, cálculos,validações) 

│ ├── dados/                   # Arquivos de dados

│   └── alunos.json          # Armazena os alunos cadastrados 

│ ├── package.json             # Dependências do Node.js 

└── README.md                # Documentação do projeto

---

## ⚡ Funcionalidades

O sistema permite:

1. **Cadastrar aluno**  
   - Informar nome, idade e notas.  
   - Validações:
     - Nome deve ter pelo menos 2 letras e não ser apenas números.
     - Idade entre 0 e 100.
     - Notas entre 0 e 10.

2. **Apagar aluno**
   - Pelo **nome** ou **ID**.

3. **Listar alunos**
   - Exibe todos os alunos cadastrados.
   - Possibilidade de filtrar:
     - Alunos **aprovados** (média ≥ 7)
     - Alunos em **recuperação** (5 ≤ média < 7)
     - Alunos **reprovados** (média < 5)

4. **Editar aluno**
   - Alterar nome, idade ou notas do aluno pelo **ID**.

5. **Relatórios**
   - **Aluno com maior média**.
   - **Média geral da turma**.

---

## 🛠 Tecnologias

- Node.js v24+
- ES Modules (`"type": "module"` no `package.json`)
- JSON para armazenamento de dados
- CLI via módulo `readline`

---

🗂 Estrutura do arquivo alunos.json

O arquivo armazena os alunos em formato JSON, por exemplo:

[
  {
    "id": 1,
    "nome": "João Silva",
    "idade": 18,
    "notas": [8, 7, 9],
    "media": 8
  },
  {
    "id": 2,
    "nome": "Maria Souza",
    "idade": 19,
    "notas": [6, 5, 7],
    "media": 6
  }
]

---

🔧 Observações importantes

- Funciona exclusivamente no terminal/CLI, sem interface gráfica.

- Todas as funções de CRUD e relatórios estão em Funcao.js, enquanto Main.js contém o menu de interação.

- Este projeto foi desenvolvido totalmente pelo celular, pois não foi possível, no momento, utilizar computador. Durante o processo, tive alguns problemas com o histórico de commits e autenticação no Git e afins. Apesar disso, todo o código foi implementado corretamente e cumpre as funcionalidades propostas. Agradeço a compreensão.