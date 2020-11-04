# Utilizar a versão mais simples do node
FROM node:alpine

# Diretório utilizado dentro da máquina 
WORKDIR /usr/app

# Configurando dependências do projeto
COPY package*.json ./
RUN yarn
COPY . .

# Porta a ser utilizada
EXPOSE 3000

# Comando de inicialização da aplicação
ENTRYPOINT yarn run start