# gerenciamento de produtos

## acesso

entre no painel administrativo e abra **produtos** no menu lateral.

## recursos

- cadastrar produtos com nome, descrição, categoria, espécie, preço e preço anterior;
- enviar imagem jpg, png ou webp de até 5 mb;
- informar sku, etiqueta e especificações em json;
- editar, ativar, desativar e excluir produtos;
- marcar produtos para destaque na página inicial;
- acompanhar o estoque e filtrar itens com estoque baixo.

## catálogo e banco de dados

o catálogo é armazenado na tabela `products` do sqlite. na primeira inicialização após a atualização, os 12 produtos que já existiam no código são inseridos automaticamente, sem apagar pedidos, agendamentos ou outros dados. a vitrine pública passa a consultar `/api/products`, e alterações salvas no painel aparecem no site.

o estoque dos produtos antigos começa como **não controlado**, pois a quantidade real não estava registrada no projeto. para ativar o controle, edite cada produto e informe a quantidade correta. quando um produto tem estoque controlado, o checkout valida a quantidade disponível e o estoque é reduzido após a confirmação do pagamento pelo mercado pago.

## instalação

1. faça backup do banco sqlite e dos arquivos atuais.
2. preserve o `.env` original.
3. instale as dependências com `npm install`.
4. inicie o servidor com `npm start`.

as imagens enviadas pelo painel ficam em `assets/images/produtos/`. preserve essa pasta e o banco de dados nos backups.
