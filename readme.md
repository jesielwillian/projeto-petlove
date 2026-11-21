# 🐾 PetLove

> Uma experiência digital para quem ama cuidar de pets. A PetLove reúne uma vitrine de produtos, páginas institucionais e uma área administrativa, com interface responsiva desenvolvida em tecnologias web nativas.

![Status](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-orange?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/SUPABASE-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/POSTGRESQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📌 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades e páginas](#-funcionalidades-e-páginas)
- [Tecnologias](#-tecnologias)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Executar localmente](#-executar-localmente)
- [Configurar o Supabase](#-configurar-o-supabase)
- [Publicar na Vercel](#-publicar-na-vercel)
- [Painel administrativo](#-painel-administrativo)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Documentação complementar](#-documentação-complementar)
- [Estado atual e limitações](#-estado-atual-e-limitações)
- [Segurança](#-segurança)
- [Próximos passos sugeridos](#-próximos-passos-sugeridos)
- [Licença](#-licença)

---

## 💗 Sobre o projeto

A **PetLove** é um projeto de loja virtual voltado ao universo pet. O repositório contém páginas de navegação e apresentação, catálogo de produtos, fluxo visual de compra, páginas de serviços e conteúdo institucional, além de uma interface administrativa.

A aplicação foi construída principalmente com **HTML, CSS e JavaScript**, sem framework frontend. A pasta `api/` contém funções serverless destinadas à Vercel, e a pasta `supabase/` contém a migração inicial do banco PostgreSQL.

> **Importante:** este repositório deve ser considerado uma versão de protótipo/em desenvolvimento. Consulte [Estado atual e limitações](#-estado-atual-e-limitações) antes de disponibilizar a loja para clientes ou receber pagamentos reais.

## 🧩 Funcionalidades e páginas

### Área pública

| Página | Arquivo | Finalidade |
|---|---|---|
| Início | `index.html` | Apresentação da marca e destaques |
| Produtos | `produtos.html` | Vitrine e navegação pelo catálogo |
| Produto | `produto.html` | Detalhes de um produto |
| Carrinho | `carrinho.html` | Revisão dos itens selecionados |
| Checkout | `checkout.html` | Interface de finalização da compra |
| Serviços | `servicos.html` | Apresentação dos serviços |
| Sobre | `sobre.html` | História e informações da marca |
| Contato | `contato.html` | Canais e formulário de contato |
| Rastreio | `rastreio.html` | Interface de consulta de pedido |

### Painel administrativo

O painel está disponível em `admin/` e possui telas para:

- visão geral;
- consulta de pedidos;
- consulta de agendamentos;
- leitura de mensagens;
- consulta e gerenciamento visual de produtos.

A disponibilidade de cada operação depende dos endpoints existentes na versão atual da API. Algumas ações de edição ainda retornam resposta de funcionalidade não habilitada.

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Layout, identidade visual, responsividade e animações |
| JavaScript (ES6+) | Interações e lógica da interface |
| Node.js 20+ | Runtime das funções de API |
| Vercel Functions | Execução serverless dos endpoints |
| Supabase / PostgreSQL | Persistência de dados prevista na migração |
| Font Awesome 6.7.2 | Ícones |
| Google Fonts | Tipografia |

O frontend utiliza arquivos JavaScript próprios em `js/`. Não há framework frontend declarado no `package.json`.

## 🗂️ Estrutura de pastas

```text
petlove/
├── admin/
│   ├── index.html          # Interface do painel administrativo
│   ├── admin.css           # Estilos do painel
│   └── admin.js            # Lógica do painel
│
├── api/
│   ├── [...path].js        # Handler principal das funções de API
│   ├── health.js           # Verificação de disponibilidade da API
│   └── admin/
│       └── [...path].js    # Rota administrativa complementar
│
├── assets/
│   └── images/             # Imagens do site e dos produtos
│
├── css/
│   └── style.css           # Estilos globais do site
│
├── js/
│   ├── app.js              # Interações e funcionalidades do frontend
│   └── backend.js          # Comunicação do frontend com a API
│
├── supabase/
│   └── migrations/
│       └── 202611210001_initial_schema.sql
│
├── .env.example            # Modelo de variáveis de ambiente
├── .gitignore
├── vercel.json             # Configuração das funções na Vercel
├── package.json
├── index.html
├── produtos.html
├── produto.html
├── carrinho.html
├── checkout.html
├── rastreio.html
├── servicos.html
├── sobre.html
├── contato.html
└── README.md
```

## 💻 Pré-requisitos

Para visualizar o frontend:

- navegador atualizado;
- Python 3 (ou outra ferramenta para servir arquivos estáticos).

Para trabalhar com a API e o deploy:

- Node.js 20 ou superior;
- conta na [Vercel](https://vercel.com/);
- projeto no [Supabase](https://supabase.com/).

O `package.json` atual declara o runtime mínimo de Node.js, mas **não define scripts `start`, `dev` ou dependências npm**. Portanto, `npm start` não é um comando de inicialização disponível nesta versão.

## 🚀 Executar localmente

### 1. Obter os arquivos

Clone o repositório ou extraia o pacote do projeto. Entre na pasta `petlove/`:

```bash
cd petlove
```

### 2. Iniciar um servidor estático

Com Python 3:

```bash
python -m http.server 8000
```

Abra no navegador:

```text
http://localhost:8000
```

Também é possível utilizar a extensão Live Server do Visual Studio Code.

> **Atenção:** o servidor estático serve apenas os arquivos do frontend. Ele não executa as funções serverless de `api/`. Assim, funcionalidades que dependem de `/api` não estarão operacionais nesse modo, a menos que a API seja executada em um ambiente compatível.

## 🗄️ Configurar o Supabase

A migração inicial está em:

```text
supabase/migrations/202611210001_initial_schema.sql
```

### Passo a passo

1. Crie um projeto no Supabase.
2. Abra o **SQL Editor** do projeto.
3. Abra o arquivo SQL acima, copie seu conteúdo e execute-o no SQL Editor.
4. Confirme a criação das tabelas e do bucket de armazenamento.
5. Copie a URL do projeto e gere uma chave secreta apropriada para uso exclusivamente no servidor.
6. Configure as variáveis de ambiente na Vercel, conforme a próxima seção.

A migração cria, entre outras, as tabelas:

- `products`
- `orders`
- `order_events`
- `contacts`
- `subscribers`
- `bookings`
- `webhook_events`
- `admins`
- `admin_sessions`

Também habilita Row Level Security (RLS) nas tabelas e cria o bucket público `petlove-products`, destinado às imagens de produtos.

**Não coloque a chave secreta do Supabase no frontend.** O acesso administrativo ao banco deve permanecer no servidor.

## ☁️ Publicar na Vercel

O projeto contém `vercel.json` e funções em `api/`, portanto a estrutura está preparada para um deploy na Vercel.

1. Envie o projeto para um repositório Git.
2. Na Vercel, importe esse repositório.
3. Configure a pasta `petlove/` como **Root Directory** caso o repositório tenha o projeto dentro de uma subpasta.
4. Utilize Node.js 20 ou superior para as funções.
5. Cadastre as variáveis de ambiente necessárias.
6. Faça o deploy.
7. Após a publicação, teste a rota `/api/health`.

Uma resposta esperada da verificação de saúde é semelhante a:

```json
{
  "ok": true,
  "backend": "supabase"
}
```

A rota de saúde confirma que a função está respondendo; ela não substitui testes de cada fluxo da loja.

## 🔐 Painel administrativo

A interface fica em:

```text
/admin/
```

O backend atual implementa operações de autenticação e consulta administrativa, incluindo:

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/me`
- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `GET /api/admin/orders`
- `GET /api/admin/bookings`
- `GET /api/admin/contacts`

### Primeiro acesso

1. Configure `SUPABASE_URL` e `SUPABASE_SECRET_KEY`.
2. Defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` com credenciais próprias e fortes.
3. Confirme que a migração do Supabase foi executada.
4. Publique/reinicie as funções.
5. Acesse `/admin/` e entre com o e-mail e a senha configurados.

O administrador inicial é criado pelo backend quando ocorre o primeiro login válido com as credenciais configuradas. A autenticação utiliza hash de senha com `scrypt`, token de sessão aleatório armazenado como hash e cookie `HttpOnly`.

> Use uma senha exclusiva e longa. Não reutilize credenciais de exemplo nem compartilhe o arquivo `.env`.

## ⚙️ Variáveis de ambiente

Crie as variáveis no painel da Vercel em **Project → Settings → Environment Variables**. O arquivo `.env.example` serve como referência.

| Variável | Obrigatória | Descrição |
|---|---:|---|
| `SUPABASE_URL` | Sim, para a API | URL do projeto Supabase |
| `SUPABASE_SECRET_KEY` | Sim, para a API | Chave secreta do Supabase, somente no servidor |
| `ADMIN_EMAIL` | Sim, para primeiro acesso | E-mail do administrador inicial |
| `ADMIN_PASSWORD` | Sim, para primeiro acesso | Senha forte do administrador |
| `ADMIN_COOKIE_NAME` | Não | Nome do cookie de sessão; padrão `petlove_admin` |

O código também aceita `SUPABASE_SERVICE_ROLE_KEY` como alternativa legada para a chave do Supabase. Prefira a chave secreta atual e mantenha qualquer chave privilegiada exclusivamente nas variáveis server-side.

Após alterar variáveis na Vercel, faça um novo deploy para garantir que as funções recebam os valores atualizados.

## 📚 Documentação complementar

O projeto possui documentos adicionais com informações específicas:

| Arquivo | Conteúdo |
|---|---|
| `readme-backend.md` | Notas anteriores sobre backend e integrações |
| `mercado-pago-setup.md` | Orientações de configuração do Checkout Pro |
| `gerenciamento-produtos.md` | Descrição do gerenciamento de catálogo |
| `atualizacao-pedidos.md` | Notas de atualização do painel de pedidos |
| `assets/readme.md` | Organização dos recursos visuais |
| `assets/images/readme.md` | Imagens gerais |
| `assets/images/produtos/readme.md` | Imagens de produtos |
| `css/readme.md` | Organização dos estilos |
| `js/readme.md` | Organização dos scripts |

**Observação:** alguns desses documentos descrevem uma arquitetura anterior ou funcionalidades planejadas. Em caso de divergência, considere o código atual de `api/`, `js/backend.js`, `package.json` e a migração SQL como referência para o comportamento desta versão.

## ⚠️ Estado atual e limitações

A leitura do código desta versão identificou os seguintes pontos que devem ser considerados antes de utilizar a loja em produção:

1. **API pública incompleta:** `js/backend.js` chama rotas públicas como `/api/products`, `/api/orders`, `/api/contact`, `/api/newsletter`, `/api/bookings`, `/api/bot`, `/api/shipping/quote` e `/api/coupons/validate`. O handler atual `api/[...path].js` não implementa essas rotas públicas e retorna `404` para caminhos que não sejam os caminhos administrativos reconhecidos.
2. **Painel parcialmente operacional:** as rotas administrativas atuais permitem autenticação e consultas. O handler retorna `501` para ações de edição que não estejam implementadas.
3. **Pagamento:** o handler atual não contém integração com Mercado Pago nem processamento de webhook. O documento `mercado-pago-setup.md` é uma orientação complementar, não prova que a integração esteja ativa nesta versão.
4. **PetBot:** o frontend prevê chamada para `/api/bot`, mas essa rota não está implementada no handler atual.
5. **Frete e rastreio:** o frontend possui interfaces para esses fluxos, mas as respectivas rotas públicas não estão implementadas no handler atual.
6. **Execução local:** não há script npm de inicialização nem servidor local de API configurado no `package.json`.

Esses pontos não impedem a visualização das páginas estáticas, mas impedem considerar os fluxos de compra, atendimento e operação como prontos para produção. As rotas precisam ser implementadas e testadas antes de anunciar essas funcionalidades como disponíveis.

## 🛡️ Segurança

- Nunca envie `.env` ou credenciais para o Git.
- Nunca exponha chaves secretas do Supabase, tokens de pagamento ou chaves de IA no JavaScript do navegador.
- Utilize HTTPS em produção.
- Utilize senha administrativa forte e exclusiva.
- Restrinja o acesso às funções administrativas e revise as políticas RLS.
- Faça backups regulares do banco.
- Antes de receber pedidos reais, implemente e teste validação server-side de preços, estoque, cupons, frete e pagamentos.
- Configure política de privacidade e procedimentos compatíveis com a LGPD antes de coletar dados de clientes.

## 🧭 Próximos passos sugeridos

- [ ] Implementar as rotas públicas utilizadas pelo frontend.
- [ ] Completar as operações de criação, edição e exclusão do painel administrativo.
- [ ] Integrar e validar o fluxo de pagamento e os webhooks do provedor.
- [ ] Implementar cotação logística e atualização real de rastreio.
- [ ] Adicionar testes automatizados para API e fluxos de compra.
- [ ] Revisar acessibilidade, SEO, desempenho e responsividade.
- [ ] Definir backups, monitoramento e política de privacidade.

## 📄 Licença

Nenhum arquivo de licença foi identificado nesta versão do projeto. Defina e inclua uma licença antes de permitir reutilização, distribuição ou contribuição externa.

---

<p align="center">
  Feito com carinho para quem ama pets. 🐾
</p>
