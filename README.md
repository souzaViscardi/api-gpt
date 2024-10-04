# link de prod
https://gptuserapi-0271d233bfa0.herokuapp.com/api-docs/

COMO INICIAR O APP
    Obrigatorio ter docker instalado!
    no cmd da raiz do projeto rode os seguintes comandos:
        docker-compose build 
        docker-compose up -d
        
voce deve configurar o aarquivo env localmente .env:
  APP_URL="http://localhost"
  PORT="4000"
  APP_ENV="dev"
  DB_DATABASE="db"
  DB_HOSTNAME="mongodb://db:27017/db"
  DB_PORT="27017"
  OPENAI_API_KEY="sua key open appi"
  API_TOKEN="token de acesso  aminha api"

O App esta desenvolvido em nodejs, a arquitetura foi baseada no MVC, onde as models ficam na pasta database/models
as controllers sao nossas routes e cada controller é alimentada por um service, a responsabilidade da controller é apenas trantar as respostas dos modulos de services e servir para o usuario

As rotas pode ser usadas /api/{nome da rota}

api/user POST
cria um usuario no banco de dados

api/gpt POST
conecta com o gpt enviando uma pergunta e guardando sua resposta na collection do usuario requisitado é obrigatorio enviar o email do usuario
 
TESTES
foram feitos testes unitarios e testes de integracao estao todos em /__tests__ 

Mddleweres
    ValidateSchema
        server para validar os inputs de cada rota 
    auth
        é uma simples authenticacao jwt, ja q o app vai ficar online nao quero ngm usando minha api do gpt a nao ser voces
