# Desafio 01 - Curso Ignite Nodejs

### Trata-se de realizar CRUD (create, read, update, delete) de tarefas em um banco de dados. 
---
### As tarefas (tasks) tem a seguinte estrutura:
- id
- title
- description
- completed_at
- created_at
- updated_at
---
### Nesta aplicação, como banco de dados foi usado um arquivo db.json no qual os dados são salvos em um array de json.
---
### Rotas da aplicação:
- POST /tasks >> Faz a criação de um tarefa, passando o título e descrição desta no corpo da requisição.
- GET /tasks >> Faz a listagem das tarefas existentes no banco de dados.
- PUT /tasks/:id >> Faz a atualização do título, da descrição ou de ambos de uma determinada tarefa.
- PATCH /tasks/:id/complete >> atualiza uma tarefa para concluída.
- DELETE /tasks/:id >> exclui uma tarefa do banco de dados

### Arquivo tasks.csv: este arquivo é salvo no banco de dados automaticamente através da execução do código stream-csv.js. Observação: a aplicação do servidor deve ser inicilizada na porta 3333 antes da execução de stream-csv.js.
---
## Como baixar o projeto

```bash
git clone https://github.com/AndreDalSantos/desafio-01-ignite-nodejs.git
```
## Instalar dependências

### Acessar página do projeto

```bash
    cd desafio-01-ignite-nodejs
```

### instalar dependências:

```bash
    npm install
```

### Iniciar o servidor
```bash
    npm run dev
```

### Salvar as tarefas do arquivo "tasks.csv" no banco de dados:

```bash
    node src/stream-csv.js
```

