# Me Escolhe !

Plataforma de seleções de projetos.

## Preparando Ambiente

Primeiro de tudo, instalamos as dependências utilizadas pelo Node.js:

```
npm install
```

Em seguida, instalamos o MongoDB. Para tal, temos duas opções:

1. Instalar localmente e definir **27017** como porta de comunicação;
2. Utilizar um contâiner docker com uma imagem **mongodb**:
```
docker pull mongo
docker run --name mongodb -p 27017:27017 -d mongo
```

## Rodando o Servidor

Podemos executar a API REST em dois modos:
1. Em **modo de produção**, utilizando o seguinte comando:
```
npm run prod
```
2. Em **modo de desenvolvimento**, utilizando o seguinte comando:
```
npm run dev
```

Opcionalmente podemos executar a aplicação em modo de produção através de um contâiner **docker** com os comandos:
```
docker build --tag me-escolhe-core .
docker run --name core -p 3000:3000 -d me-escolhe-core
```

## Requisitos

Para executar corretamente, e em ambiente seguro, a API é necessário utilizar as dependências necessárias nas seguintes versões:

1. Node.js na versão **10.x**;
2. MongoDB na versão **4.x**.

> AVISO: 
> Caso sejam usadas outras versões, podem haver problemas de compilação e comportamentos indesejados. Isso pode causar transtornos não apenas em ambiente de desenvolvimento, como também em produção. Esteja avisado.