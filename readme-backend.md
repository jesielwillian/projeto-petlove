# petlove — backend e integrações

## o que foi conectado
- api node.js/express com persistência sqlite (pedidos, eventos de rastreio, contatos, newsletter e agendamentos).
- validação server-side de produtos, quantidades, cupons, descontos, frete e total do pedido. o navegador não é autoridade para preço.
- checkout hospedado mercado pago (pix/cartão/boleto conforme conta e disponibilidade); o site não recebe nem armazena número de cartão/cvv.
- webhook mercado pago para atualização do estado de pagamento; assinatura pode ser validada com `MP_WEBHOOK_SECRET`.
- rastreamento consulta pedidos reais e histórico de eventos no banco.
- petbot via openai responses api, com respostas locais de contingência.
- formulário de contato, newsletter e agendamentos persistidos na base.

## executar localmente
requer node.js 20+.

```bash
npm install
cp .env.example .env
npm start
```
abra `http://localhost:3000`. o sqlite será criado em `../data/petlove.sqlite`.

## configuração de produção
preencha `.env` com:
- `MERCADOPAGO_ACCESS_TOKEN`: token de produção da conta mercado pago.
- `MP_WEBHOOK_URL`: url pública `/api/webhooks/mercadopago`.
- `MP_WEBHOOK_SECRET`: segredo de assinatura de webhook do painel mercado pago.
- `PUBLIC_URL` e urls de retorno https.
- `OPENAI_API_KEY` para respostas generativas do petbot (sem ela, o fallback de faq continua ativo).
- `SHIPPING_STANDARD_PRICE` e `SHIPPING_EXPRESS_PRICE` para as tarifas iniciais.

**frete:** o endpoint oferece tarifas configuráveis e valida cep; não representa cotação ao vivo de transportadora. para cotação/etiqueta real, conecte uma conta melhor envio ou contrato dos correios no adapter de logística e configure credenciais. não anuncie prazo garantido sem integração operacional.

**persistência:** sqlite é adequado para instalação em vps/servidor com disco persistente. não use sqlite em filesystem efêmero de funções serverless. para vercel/ambiente serverless, migre as tabelas para postgresql gerenciado e adapte o driver.

**operação:** configure https, backups do banco, monitoramento, política de privacidade/lgpd, e-mail transacional, estoque, antifraude e processo de expedição antes de vender em produção. o webhook atual atualiza o pagamento; o status logístico deve ser atualizado por integração com erp/transportadora ou painel administrativo autenticado.

## endpoints
`GET /api/health`, `GET /api/products`, `POST /api/coupons/validate`, `POST /api/shipping/quote`, `POST /api/orders`, `GET /api/orders/:code/tracking`, `POST /api/contact`, `POST /api/newsletter`, `POST /api/bookings`, `POST /api/bot`, `POST /api/webhooks/mercadopago`.

## segurança importante
- nunca coloque tokens de mercado pago ou openai no javascript do navegador.
- use somente checkout hospedado/tokenização do provedor; não trafegue pan/cvv pelo backend da loja.
- ative assinatura de webhook e restrinja cors em produção.
- antes de operar, acrescente painel administrativo com autenticação forte para atualizar estoque, preços, pedidos e status de expedição.

## painel administrativo

acesse `http://localhost:3000/admin/` para abrir a central de gestão. o painel oferece:

- visão geral com faturamento de pagamentos aprovados, pedidos, pendências e clientes.
- listagem, busca e filtro de pedidos; visualização de cliente, endereço, itens e totais.
- atualização do status logístico e do status de pagamento, com registro automático no histórico público de rastreamento.
- edição do código de rastreio exibido ao cliente.
- gestão dos status dos agendamentos e leitura das mensagens recebidas.
- login administrativo com senha derivada via scrypt, sessão aleatória armazenada como hash no sqlite e cookie httponly/samesite.

### primeiro acesso ao painel

1. copie `.env.example` para `.env`.
2. o arquivo `.env` já está preenchido com o e-mail e a senha administrativa solicitados. a configuração é aplicada ao administrador desse e-mail sempre que o servidor inicia.
3. inicie o servidor. na primeira inicialização, o administrador é criado no banco. acesse `/admin/` e entre com essas credenciais.
4. não publique o `.env`, não use as credenciais de exemplo e habilite https em produção (`NODE_ENV=production`, proxy https configurado).

o administrador definido em `ADMIN_EMAIL` tem sua senha sincronizada com `ADMIN_PASSWORD` a cada inicialização. mantenha o `.env` privado, fora do git e nunca o envie para hospedagens públicas ou repositórios. outros administradores já cadastrados não são alterados.

o painel não processa pagamentos manualmente: o status de pagamento deve vir do webhook do mercado pago ou ser atualizado pela equipe após conferência no provedor. o painel é uma interface operacional interna, não substitui integração logística com transportadora, emissão fiscal, controle de estoque ou envio de e-mails.
