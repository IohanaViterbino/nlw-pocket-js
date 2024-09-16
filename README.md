# NLW Pocket: js
App de controles de metas semanais. Projeto da Rocket Seat da edição do NLW Pocket: Javascript

### Como rodar o projeto:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/IohanaViterbino/nlw-pocket-js.git
   cd nlw-pocket-js
   ```

2. **Instale as dependências:** em ambos os projetos
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:** Crie um arquivo `.env` na raiz do projeto e adicione a string de conexão do banco de dados:
   ```bash
   DATABASE_URL=postgres://docker:docker@localhost:5432/inorbit
   ```
   
4. **Inicie os containers Docker no server:** No server rode este comando e ele fara as migrações e iniciará o servidor.
   ```bash
   docker-compose up --build
   ```

5. **Alimentando o banco de dados:** 
   ```bash
    npm run seed
   ```

6. **Inicie o servidor react:**
   ```bash
   npm run dev
   ```
