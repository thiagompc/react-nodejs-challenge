# Desafio React/Node.js Waid

Olá! Esse é o projeto Waid, o qual foca no desenvolvimento de uma api para cadastro de usuários e posts, além do desenvolvimento da aplicação web para consumir essa api.

## Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [Typeorm](https://typeorm.io/)
- [Redux](https://redux.js.org/)
- [Chakra](https://chakra-ui.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Ferramentas

- [Visual Studio Code](https://code.visualstudio.com)
- [Insomnia](https://insomnia.rest)

## Como rodar

### Backend

#### Requisitos:

- Docker
- Docker Compose

Para executar o serviço do backend e seu banco de dados é apenas necessário subir os respectivos conteineres. Eles são orquestrados pelo `Docker Compose`, assim, fazendo necessário apenas utilizar um comando:

```bash
sudo docker-compose up
```

Caso aconteça algum erro relacionado ao banco de dados, pode ser que seja necessário subir somente o banco de dados primeiro, o que você pode fazer com o seguinte comando:

```bash
sudo docker-compose up db
```

### Frontend

#### Requisitos:

- yarn ou npm

Para executar o a aplicação do front é apenas necessário instalar as dependências e subir o mesmo, fazendo necessário apenas utilizar um comando:

```bash
yarn install
yarn start
```


```bash
npm install
npm run start
```
