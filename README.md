# 🚀 Backend API Recepção 10

Este repositório contém o backend da aplicação Recepção Nota 10, responsável por gerenciar dados de visitantes e visitas em uma organização religiosa. Desenvolvido utilizando Node.js, Express, Prisma e Pino para logging.

<br>

## 🛠️ Tecnologias Utilizadas

- **Node.js e npm:** Ambiente de execução e gerenciador de pacotes para JavaScript.
- **Express:** Framework web para Node.js.
- **Prisma:** ORM (Object-Relational Mapping) para mapeamento de banco de dados.
- **Pino:** Biblioteca para logging.

<br>

## 📋 Pré-requisitos  

- **Node.js e npm:** Baixe em [https://nodejs.org/](https://nodejs.org/).
- **Git:** Baixe em [https://git-scm.com/](https://git-scm.com/).
- **Banco de Dados:** Certifique-se de ter um banco de dados configurado e acessível. Este projeto utiliza o Prisma com suporte a diversos bancos de dados.

<br>

## ⚙️ Configuração do Projeto

1. **Clonar o Repositório:**

    ```bash
    git clone https://github.com/Super-Easy-Softwares/backend-recepcao10-expressJS.git
    cd backend-recepcao10-expressJS
    ```

2. **Instalar Dependências:**

    ```bash
    npm install
    ```

3. **Criar arquivo `.env`:**

   Crie um arquivo chamado `.env` na raiz do projeto para armazenar as variáveis de ambiente. O arquivo `.env` deve conter as seguintes informações:

    ```env
    DATABASE_URL="sua_url_do_banco_de_dados_mongodb"
    ```

   Substitua `sua_url_do_banco_de_dados_mongodb` pela URL do seu banco de dados MongoDB.

4. **Iniciar o Prisma**

    ```bash
    npx prisma generate
    ```

5. **Iniciar o Projeto em Ambiente de Desenvolvimento**

    ```bash
    npm run dev
    ```

6. **Executar Testes**

    ```bash
    npm test
    ```

    Isso iniciará o Jest no modo de observação para execução dos testes automaticamente.

<br>

## 📄 Endpoints e Funcionalidades

A aplicação oferece endpoints para gerenciar visitantes e visitas. Abaixo estão as principais rotas disponíveis:

### Visitantes

#### 1. **Listar Todos os Visitantes**

- **Endpoint:** `GET /api/visitantes`

#### 2. **Buscar Visitante por ID**

- **Endpoint:** `GET /api/visitantes/:id`
- Substitua `:id` pelo ID do visitante desejado.

#### 3. **Criar Novo Visitante**

- **Endpoint:** `POST /api/visitantes`
- **Payload de Exemplo:**
  ```json
  {
    "name": "John Doe",
    "visitsCount": 0,
    "phone": "123456789",
    "address": "123 Main St",
    "cityAndState": "City, State",
    "age": 25,
    "gender": "Male",
    "religion": "Christian",
    "smallGroup": "Group A",
    "bibleStudy": true
  }
  ```

#### 4. **Atualizar Visitante por ID**

- **Endpoint:** `PATCH /api/visitantes/:id`
- Substitua `:id` pelo ID do visitante desejado.
- **Payload de Exemplo:**
  ```json
  {
    "name": "New Name",
    "visitsCount": 1
  }
  ```

#### 5. **Deletar Visitante por ID**

- **Endpoint:** `DELETE /api/visitantes/:id`
- Substitua `:id` pelo ID do visitante desejado.

### Visitas

#### 1. **Listar Todas as Visitas**

- **Endpoint:** `GET /api/visitas`

#### 2. **Buscar Visita por ID**

- **Endpoint:** `GET /api/visitas/:id`
- Substitua `:id` pelo ID da visita desejada.

#### 3. **Criar Nova Visita**

- **Endpoint:** `POST /api/visitas`
- **Payload de Exemplo:**
  ```json
  {
    "visitDate": "2023-11-14",
    "visitanteId": "xyz123"
  }
  ```

#### 4. **Atualizar Visita por ID**

- **Endpoint:** `PATCH /api/visitas/:id`
- Substitua `:id` pelo ID da visita desejada.
- **Payload de Exemplo:**
  ```json
  {
    "visitDate": "2023-11-15"
  }
  ```

#### 5. **Deletar Visita por ID**

- **Endpoint:** `DELETE /api/visitas/:id`
- Substitua `:id` pelo ID da visita desejada.

<br>

## 🧑‍💻 Testes Automatizados

O projeto utiliza o Jest para testes automatizados. Os testes abrangem as principais operações da API, garantindo que as funcionalidades estão corretas e seguras.

Para executar os testes, utilize o comando:

```bash
npm test
```

Isso iniciará o Jest no modo de observação para execução dos testes automaticamente.

Lembre-se de substituir `http://localhost:3000` pelo endereço correto da sua aplicação se estiver rodando em um ambiente diferente.

<br>

## 🧑‍💻 Autores

Este projeto foi desenvolvido por Edison Matos.

![Edison Matos](https://avatars.githubusercontent.com/u/17342047?s=200)

Edison Matos é um entusiasta da tecnologia, desenvolvedor backend de software e apaixonado por criar soluções inovadoras.<br>
Saiba mais sobre no [GitHub](https://github.com/EdisonMatos) para descobrir mais projetos e colaborações.

<br>

## 🤝 Contribuição

Se deseja contribuir para o desenvolvimento deste projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para suas alterações: `git checkout -b feature/nome-da-sua-feature`.
3. Faça as alterações desejadas e commit: `git commit -m 'Adiciona nova feature'`.
4. Push para a branch: `git push origin feature/nome-da-sua-feature`.
5. Abra um pull request para revisão.

<br>

## 📄 Licença

Este projeto é licenciado sob a Licença MIT.

