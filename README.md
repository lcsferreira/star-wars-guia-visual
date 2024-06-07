# Guia visual de Star Wars

Este é um web-app interativo onde você pode navegar pelos personagens, filmes, planetas e naves do universo de Star Wars. Voc~e pode acessá-lo em https://star-wars-guia-visual.vercel.app/

## API

O projeto usa a API aberta do SWAPI. você pode conferir sua documentação aqui https://swapi.dev/documentation

## Tecnologias e bibliotecas

O projeto foi criado em React com TypeScript, utilizando axios para efetuar requisições, styled-components para a estilização personalizada dos componentes e Ant Design como biblioteca de componentes. Docker e Docker-compose para simular um ambiente de desenvolvimento

## Como executar

### Pré-requisitos

Caso opte por utilzar o docker e criar o ambiente de Dev, será necessário Docker e Docker compose

1. Clone o repositório:

```bash
git clone https://github.com/lcsferreira/star-wars-guia-visual.git
cd star-wars-guia-visual
```

2. Executar localmente

```bash
npm install
npm run start
```

3. A aplicação ficará disponível em http://localhost:3000

### Usando Docker (Simulando ambiente de Dev)

2. Executar

```bash
docker-compose up --build
```

3. A aplicação ficará disponível em http://localhost:4000

## Testes

Os testes são feitos em Jest. Você pode executá-los localmente com

```bash
npm test
```
