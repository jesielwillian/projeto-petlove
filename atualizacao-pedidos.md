# atualização do painel de pedidos petlove

## o que mudou
- filtro por status, período (data inicial/final) e situação do histórico (ativos, arquivados ou todos).
- arquivar pedidos sem apagar os dados; pedidos arquivados podem ser restaurados.
- exclusão permanente com confirmação explícita; remove também os eventos de histórico daquele pedido.
- atualização manual sem cache e com botão desabilitado enquanto a consulta está em andamento.
- migração automática adiciona `archived_at` à tabela `orders`, sem apagar pedidos existentes.
- a consulta administrativa passa a exibir até 1.000 registros por vez (antes eram 300).

## como atualizar sem perder pedidos
1. faça uma cópia de segurança do arquivo sqlite indicado em `DB_FILE` (ou do arquivo `data/petlove.sqlite`).
2. preserve seu `.env` atual; este pacote contém apenas `.env.example` sem credenciais.
3. substitua os arquivos do projeto pelos arquivos deste pacote, sem substituir/apagar a pasta de dados.
4. na pasta do projeto, execute `npm install` para instalar/recompilar dependências no sistema onde o site será executado.
5. reinicie o servidor. a coluna de arquivamento será criada automaticamente na primeira inicialização.

**importante:** o sqlite só mantém os pedidos após reinícios se o arquivo do banco estiver em armazenamento persistente. não coloque o banco em uma pasta temporária da hospedagem. faça backups regulares.

arquivar é reversível. excluir é permanente e também remove o histórico de eventos do pedido; use somente quando tiver certeza.
