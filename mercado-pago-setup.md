# mercado pago checkout pro — petlove

o checkout apresenta pix, cartão e boleto como formas de pagamento da petlove. ao confirmar, cria uma preferência no servidor e redireciona o cliente para `init_point` do mercado pago. o boleto é emitido pelo próprio mercado pago; a petlove não gera pdf nem recebe dados de cartão.

## configuração obrigatória

no `.env` do servidor, configure:

- `PUBLIC_URL`: url https pública da loja (ex.: `https://www.seudominio.com.br`).
- `MERCADOPAGO_ACCESS_TOKEN`: access token da aplicação mercado pago. use credenciais de teste primeiro.
- `MP_WEBHOOK_URL`: `https://www.seudominio.com.br/api/webhooks/mercadopago`.
- `MP_WEBHOOK_SECRET`: chave secreta de assinatura gerada/configurada para webhooks no painel do mercado pago.
- `PAYMENT_SUCCESS_URL`, `PAYMENT_FAILURE_URL` e `PAYMENT_PENDING_URL`: urls absolutas https de retorno (opcionais; há padrões no código).

não publique o access token no frontend, não o envie ao navegador e não o versione no git. o arquivo `.env` deve permanecer fora do repositório.

## formas de pagamento

- pix: preferência restringida ao tipo `bank_transfer`; o desconto de 5% é calculado no servidor.
- cartão: preferência restringida a cartão de crédito, com até 6 parcelas (sujeito às regras da conta e da transação).
- boleto: preferência restringida ao tipo `ticket`; a emissão e vencimento são apresentados pelo mercado pago. o pedido fica pendente até a confirmação da liquidação.

## confirmação e testes

o webhook consulta o pagamento diretamente na api do mercado pago e só então atualiza o pedido. configure o segredo de webhook; sem ele, a rota recusa notificações. teste em sandbox com credenciais de teste e usuários de teste antes de trocar para produção. verifique no painel do mercado pago se os meios pix e boleto estão habilitados para sua conta.

sem `MERCADOPAGO_ACCESS_TOKEN`, `PUBLIC_URL` https e `MP_WEBHOOK_SECRET`, o servidor não cria pedido sem cobrança: retorna erro explícito e não simula pagamento. a disponibilidade final de boleto/pix depende da habilitação e análise da conta mercado pago.
