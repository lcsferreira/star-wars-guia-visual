# Use uma imagem base do Node
FROM node:20.11.0

# Defina o diretório de trabalho no container
WORKDIR /app

# adicione o diretório node_modules/.bin ao PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copie o package.json e package-lock.json
COPY package*.json ./
COPY package-lock.json .

# Instale as dependências do projeto
RUN npm install

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Copy the Docker-specific environment file
COPY .env.prod .env

# Compile o projeto
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 4000

# Defina o comando para iniciar a aplicação
CMD ["npm", "run", "start"]
