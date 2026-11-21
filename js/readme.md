# js

`app.js` contém a lógica front-end compartilhada.

## módulos lógicos

- catálogo e configurações de produtos.
- persistência local e estado de carrinho, favoritos e avaliações.
- montagem do cabeçalho, rodapé e widgets compartilhados.
- componentes de interface, renderização e eventos globais.
- busca e assistente virtual.
- controladores das páginas e fluxos de compra.
- utilitários de formulário, seletores e máscaras.
- inicialização no evento `DOMContentLoaded`.

os dados persistidos usam `localStorage`; limpar os dados do site no navegador reinicia esse estado local.
