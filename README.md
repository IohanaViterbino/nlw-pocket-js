# NLW Pocket: js
App de controles de metas semanais. Projeto da Rocket Seat da edição do NLW Pocket: Javascript

## Server

### Tecnologias Utilizadas:

* **Node.js:** O ambiente de execução JavaScript que permite criar aplicações de servidor.
* **Fastify:** Um framework web rápido e leve para Node.js, ideal para construir APIs RESTful.
* **Zod:** Uma biblioteca de validação de dados que garante a integridade dos dados que entram e saem da aplicação.
* **Drizzle ORM:** Um ORM (Object-Relational Mapper) que simplifica a interação com bancos de dados relacionais, no caso, PostgreSQL.
* **Docker Compose:** Uma ferramenta para definir e executar aplicações multi-container Docker.
* **TypeScript:** Uma superset do JavaScript que adiciona tipagem estática, melhorando a segurança e a manutenibilidade do código.

### Como rodar o projeto:

1. **Clone o repositório:**
   ```bash
   git clone https://seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:** Crie um arquivo .env na raiz do projeto e adicione a string de conexão do banco de dados:
   ```bash
   DATABASE_URL=postgres://docker:docker@localhost:5432/inorbit
   ```
   
4. **Inicie os containers Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Executando as migrações:** Antes de iniciar o servidor, é necessário executar as migrações para criar as tabelas e outras estruturas do banco de dados:
   ```bash
    npx drizzle-kit migrate
   ```
   Este comando irá executar todas as migrações pendentes, criando as tabelas e índices definidos nos arquivos de migração dentro da pasta drizzle/migrations.

6. **Alimentando o banco de dados:** 
   ```bash
    npm run seed
   ```

7. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
