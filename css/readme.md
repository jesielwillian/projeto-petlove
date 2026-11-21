# css

`style.css` concentra os estilos compartilhados do projeto. o índice no início do arquivo acompanha as áreas funcionais das páginas html.

## organização

1. tokens e reset global (`:root`, seletores universais e tipografia).
2. componentes compartilhados e estilos específicos das páginas.
3. media queries consolidadas por condição, preservando a ordem interna das regras.
4. keyframes agrupados ao final do arquivo.

as propriedades são ordenadas alfabeticamente quando isso não altera a precedência entre shorthand e longhand. regras com dependência de cascata mantêm sua ordem original.
