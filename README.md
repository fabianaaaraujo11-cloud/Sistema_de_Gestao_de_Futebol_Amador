# FutGestao - Sistema de Gerenciamento de Peladas

Sistema completo para organizacao e gestao de peladas de futebol, desenvolvido com React + TypeScript no frontend e Node.js + Express no backend, utilizando MongoDB como banco de dados.

## Deploy no Vercel

Acesse a aplicacao: [https://sistema-de-gestao-de-futebol-amador.vercel.app](https://sistema-de-gestao-de-futebol-amador.vercel.app)

## Equipe de Desenvolvimento

### Frontend
- **Fabula de Araujo Brandao** - Desenvolvedora Frontend
  - Responsavel por: Interface React/TypeScript, experiencia do usuario, design responsivo

### Backend
- **Laura Carolina** - Desenvolvedora Backend Lead
  - Responsavel por: Arquitetura Node.js, APIs REST, autenticacao JWT

- **Vinicius Abreu Vasconcelos dos Santos** - Desenvolvedor Backend
  - Responsavel por: Modelos de dados, logica de negocios, integracao MongoDB

---

## Sobre o Projeto

O FutGestao e uma solucao moderna e completa para organizadores de peladas que precisam:
- Cadastrar e gerenciar jogadores com niveis de habilidade
- Agendar e organizar partidas
- Controlar listas de presenca em tempo real
- Confirmar participacao e pagamentos
- Visualizar estatisticas e historico
- Gerenciar times e campeonatos

### Caracteristicas Principais

- **Frontend React** - React 19 + TypeScript + Tailwind CSS
- **Backend Node.js** - Express + MongoDB com autenticacao JWT
- **Design Responsivo** - Interface adaptavel para desktop e mobile
- **Autenticacao Segura** - Sistema de login com JWT
- **Deploy Automatico** - Configurado para Vercel
- **Banco MongoDB** - MongoDB Atlas para producao
- **Real-time** - Socket.IO para atualizacoes em tempo real

---

## Tecnologias Utilizadas

### Frontend
| Tecnologia | Versao | Funcao |
|-----------|--------|--------|
| React | 19.0.0 | Framework JavaScript |
| TypeScript | 5.8.2 | Tipagem estatica |
| Tailwind CSS | 4.1.14 | Framework CSS |
| React Router | 7.14.0 | Roteamento |
| Axios | 1.14.0 | Cliente HTTP |
| React Hot Toast | 2.6.0 | Notificacoes |
| Lucide React | 0.546.0 | Icones |

### Backend
| Tecnologia | Versao | Funcao |
|-----------|--------|--------|
| Node.js | 18+ | Runtime JavaScript |
| Express | 4.21.2 | Framework web |
| MongoDB | 7.2.0 | Banco de dados NoSQL |
| JWT | 9.0.3 | Autenticacao |
| Socket.IO | 4.8.3 | Comunicacao real-time |
| bcryptjs | 3.0.3 | Hash de senhas |
| CORS | 2.8.6 | Controle de CORS |

---

## Instalacao e Execucao Local

### Pre-requisitos

- Node.js (versao 18 ou superior)
- npm ou yarn
- Conta no MongoDB Atlas (ou MongoDB local)

### Passo 1: Clone o projeto

```bash
git clone <url-do-repositorio>
cd futgestao
```

### Passo 2: Instale as dependencias

```bash
npm install
```

### Passo 3: Configure as variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb+srv://fabiulabrandao15_db_user:hGT5wxGilTYu6D9l@cluster0.cislst7.mongodb.net/
MONGODB_NAME=futgestao

# Django
SECRET_KEY=sk-django-futgestao-2026-a7b3c9d4e5f6g8h1i2j3k4l5m6n7o8p9
DEBUG=False

# JWT
JWT_SECRET=jwt-futgestao-2026-x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

### Passo 4: Inicie o servidor

```bash
npm run dev
```

O sistema estara rodando em `http://localhost:3000`

### Passo 5: Acesse o sistema

Abra seu navegador e acesse:

```
http://localhost:3000
```

---

## Estrutura do Projeto

```
futgestao/
|
+-- src/                    # Frontend React
|   +-- components/         # Componentes reutilizaveis
|   |   +-- Layout.tsx      # Layout principal
|   +-- pages/              # Paginas da aplicacao
|   |   +-- Login.tsx       # Pagina de login
|   |   +-- Register.tsx    # Pagina de cadastro
|   |   +-- Dashboard.tsx   # Dashboard principal
|   |   +-- Players.tsx     # Gestao de jogadores
|   |   +-- Peladas.tsx     # Gestao de peladas
|   |   +-- PeladaDetail.tsx # Detalhes da pelada
|   |   +-- PeladaSorteio.tsx # Sorteio de times
|   |   +-- PeladaLive.tsx  # Jogo ao vivo
|   |   +-- PlayerProfile.tsx # Perfil do jogador
|   |   +-- Teams.tsx       # Gestao de times
|   |   +-- Championships.tsx # Campeonatos
|   |   +-- ChampionshipDetail.tsx # Detalhes do campeonato
|   |   +-- Profile.tsx     # Perfil do usuario
|   +-- context/            # Context API (Auth)
|   |   +-- AuthContext.tsx # Contexto de autenticacao
|   +-- services/           # Servicos (API)
|   |   +-- api.ts          # Cliente HTTP
|   |   +-- socket.ts       # Socket.IO client
|   +-- lib/                # Utilitarios
|       +-- utils.ts        # Funcoes utilitarias
|
+-- server.ts               # Servidor Express + Vite
+-- vercel.json             # Configuracao Vercel
+-- package.json            # Dependencias Node.js
+-- .env                    # Variaveis de ambiente
+-- README.md               # Este arquivo
```

---

## Deploy no Vercel

### Configuracao Automatica

O projeto esta configurado para deploy automatico no Vercel:

1. **Frontend**: Build estatico com Vite
2. **Backend**: Serverless functions com Express
3. **Banco**: MongoDB Atlas

### Variaveis de Ambiente no Vercel

Configure no painel do Vercel:

```env
# MongoDB
MONGODB_URI=mongodb+srv://fabiulabrandao15_db_user:hGT5wxGilTYu6D9l@cluster0.cislst7.mongodb.net/
MONGODB_NAME=futgestao

# Django
SECRET_KEY=sk-django-futgestao-2026-a7b3c9d4e5f6g8h1i2j3k4l5m6n7o8p9
DEBUG=False

# JWT
JWT_SECRET=jwt-futgestao-2026-x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## Como Usar o Sistema

### 1. Primeiro Acesso

1. Acesse a aplicacao
2. Clique em **"Cadastre-se"** para criar sua conta
3. Preencha: Nome, Email, Senha
4. Clique em **"Cadastrar"**

### 2. Gerenciar Jogadores

1. No menu lateral, clique em **"Meus Jogadores"**
2. Clique no botao **"Novo Jogador"**
3. Informe o nome e selecione o nivel de estrelas (0.5 a 5.0)
4. Clique em **"Salvar Jogador"**

### 3. Agendar Pelada

1. No menu lateral, clique em **"Minhas Peladas"**
2. Clique no botao **"Nova Pelada"**
3. Preencha os dados:
   - Titulo (ex: "Pelada de Sexta")
   - Data e horario
   - Local
   - Jogadores por time
4. Clique em **"Criar Pelada"**

### 4. Gerenciar Lista de Presenca

1. Na tela de **"Minhas Peladas"**, clique em uma pelada
2. Voce vera os detalhes e a lista de inscritos
3. Clique em **"Adicionar a Lista"** para incluir participantes
4. Use os botoes para:
   - Confirmar presenca (clique no icone de check)
   - Confirmar pagamento (clique no icone de dolar)
   - Reordenar lista (setas para cima/baixo)
   - Remover da lista (icone de lixeira)

### 5. Sorteio de Times

1. Na tela de detalhes da pelada, clique em **"Sorteio de Times"**
2. Escolha entre sorteio aleatorio ou balanceado
3. Arraste jogadores entre times para ajustar
4. Clique em **"Confirmar Times"** para iniciar o jogo

### 6. Jogo ao Vivo

1. Apos confirmar os times, voce sera redirecionado para a tela ao vivo
2. Controle o cronometro e o placar
3. Registre eventos (gols, assistencias, cartoes)
4. Gire os times (proximos entram no lugar dos atuais)

### 7. Gerenciar Times

1. No menu lateral, clique em **"Gestao de Times"**
2. Clique em **"Novo Time"** para criar um time
3. Preencha nome e cidade
4. Gerencie seus times cadastrados

### 8. Campeonatos

1. No menu lateral, clique em **"Campeonatos"**
2. Crie um novo campeonato com formato e datas
3. Adicione times participantes
4. Gere a tabela de jogos automaticamente

### 9. Dashboard

O Dashboard mostra:
- Total de jogadores cadastrados
- Jogadores ativos
- Total de peladas
- Nivel medio dos jogadores

---

## API Endpoints

### Base URL
- **Local**: `http://localhost:3000/api/`
- **Producao**: `https://futgestao.vercel.app/api/`

### Autenticacao

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| POST | `/register` | Cadastrar novo usuario |
| POST | `/token` | Fazer login |
| GET | `/me` | Obter dados do usuario |

### Jogadores

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/jogadores` | Listar jogadores |
| POST | `/jogadores` | Criar jogador |
| PUT | `/jogadores/{id}` | Atualizar jogador |
| DELETE | `/jogadores/{id}` | Desativar jogador |

### Peladas

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/peladas` | Listar peladas |
| GET | `/peladas/{id}` | Obter detalhes |
| POST | `/peladas` | Criar pelada |
| PUT | `/peladas/{id}` | Atualizar pelada |
| POST | `/peladas/{id}/sortear` | Sortear times |
| GET | `/peladas/{id}/times` | Listar times da pelada |
| POST | `/peladas/{id}/encerrar` | Encerrar pelada |

### Gestao de Listas

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| POST | `/peladas/{id}/jogadores` | Adicionar jogador |
| DELETE | `/peladas/{id}/jogadores/{jogador_id}` | Remover jogador |
| PUT | `/peladas/{id}/jogadores/reordenar` | Reordenar lista |
| PUT | `/peladas/{id}/jogadores/confirmar-presenca` | Confirmar presenca |
| PUT | `/peladas/{id}/jogadores/confirmar-pagamento` | Confirmar pagamento |
| PATCH | `/pelada-jogadores/{id}` | Atualizar inscricao (presenca/pagamento) |
| DELETE | `/pelada-jogadores/{id}` | Remover inscricao |

### Times

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/times` | Listar times |
| POST | `/times` | Criar time |
| PUT | `/times/{id}` | Atualizar time |
| DELETE | `/times/{id}` | Excluir time |

### Campeonatos

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/campeonatos` | Listar campeonatos |
| POST | `/campeonatos` | Criar campeonato |
| GET | `/campeonatos/{id}` | Detalhes do campeonato |
| POST | `/campeonatos/{id}/gerar_tabela` | Gerar tabela de jogos |

---

## Seguranca

### Autenticacao JWT
- Todas as rotas protegidas requerem token JWT
- Token e enviado no header `Authorization: Bearer <token>`
- Tokens tem expiracao configuravel

### Senhas
- Hash seguro com bcryptjs
- Validacao de forca de senha no frontend

### CORS
- Configurado para aceitar requisicoes do frontend
- Restrito em producao para dominios especificos

### MongoDB
- Conexao segura via MongoDB Atlas
- Validacao de dados no servidor
- Fallback para armazenamento em memoria em caso de falha

---

## Troubleshooting

### Erro de Conexao MongoDB

- Verifique se a URL do MongoDB esta correta no .env
- Verifique se o IP esta liberado no MongoDB Atlas
- Teste a conexao diretamente

### Erro de CORS

- Verifique se o CORS esta configurado corretamente no server.ts
- Em desenvolvimento, deve aceitar localhost:3000

### Erro de Build no Vercel

- Verifique se todas as dependencias estao no package.json
- Verifique se as variaveis de ambiente estao configuradas no Vercel
- Verifique os logs de build no painel do Vercel

### Frontend nao conecta com API

- Verifique se a URL da API esta correta em src/services/api.ts
- Em desenvolvimento: http://localhost:3000/api/
- Em producao: https://seu-dominio.vercel.app/api/

### Presenca/Pagamento nao marca

- Certifique-se de que o endpoint PATCH `/pelada-jogadores/{id}` esta acessivel
- Verifique o console do navegador para erros de rede
- O toggle de presenca e pagamento usa o endpoint PATCH sem barra final

---

## Build para Producao

### Build Local

```bash
# Build otimizado
npm run build

# Preview local
npm run preview
```

### Verificacao de Tipos

```bash
# Verificar tipos TypeScript
npm run lint
```

---

## Proximas Funcionalidades

- [ ] Sistema de notificacoes push
- [ ] Geracao automatica de times balanceados
- [ ] Integracao com pagamento (PIX/Cartao)
- [ ] Chat em tempo real
- [ ] Estatisticas avancadas por jogador
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Exportacao de relatorios
- [ ] Sistema de ranking
- [ ] Integracao com calendario
- [ ] Historico de partidas
- [ ] Sistema de pontuacao

---

## Licenca

Este projeto e de uso educacional e pode ser modificado e distribuido livremente.

---

## Suporte

Para duvidas ou problemas:

1. Verifique a secao de Troubleshooting acima
2. Revise os logs do Vercel
3. Inspecione o console do navegador (F12)
4. Verifique a conexao com MongoDB Atlas
5. Entre em contato com a equipe de desenvolvimento

---

## Changelog

### v3.1.0 (Abril 2026)
- Correcao do toggle de presenca e pagamento na lista de inscritos
- Adicao do endpoint de confirmacao de pagamento no backend
- Correcao de rotas com barra final inconsistente
- Atualizacao do README com documentacao completa de endpoints
- Configuracao das variaveis de ambiente para producao

### v3.0.0 (Abril 2026)
- Migracao para Node.js + Express + MongoDB
- Implementacao de Socket.IO para real-time
- Melhoria na arquitetura do backend
- Otimizacao para deploy no Vercel
- Correcao de todos os bugs conhecidos
- Atualizacao das dependencias

### v2.0.0 (Abril 2026)
- Sistema completo Django + React
- Autenticacao JWT
- Gestao de peladas e jogadores

### v1.0.0 (Março 2026)
- Versao inicial do projeto
