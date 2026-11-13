# 🐾 PetLove — Pet Shop & Cuidado

Uma experiência digital criada para uma marca de pet shop que acredita que cuidado, conforto e carinho fazem parte da rotina de todo pet.

O **PetLove** é um projeto front-end multipágina que combina uma identidade visual acolhedora com uma navegação simples e recursos de loja virtual demonstrativos. A interface foi pensada para apresentar produtos, destacar serviços e facilitar a descoberta de tudo o que os tutores precisam para seus melhores amigos.

## ✨ Visão geral

- **Tipo:** Website institucional + loja virtual demonstrativa
- **Idioma:** Português (Brasil)
- **Estrutura:** Multipágina
- **Tecnologias:** HTML5, CSS3 e JavaScript
- **Persistência no navegador:** `localStorage`
- **Ícones:** Font Awesome
- **Tipografia:** Google Fonts — DM Sans e Nunito

## 🧩 Funcionalidades

### Página inicial
- Seção principal de apresentação da marca.
- Destaques de produtos e categorias.
- Apresentação dos serviços e diferenciais.
- Chamadas para ação direcionando às áreas da loja.

### Loja e catálogo
- Listagem de produtos com informações e preços.
- Pesquisa, filtros e opções de ordenação.
- Navegação para a página individual de cada produto.
- Imagens próprias para os produtos do catálogo.

### Detalhes do produto
- Página de produto baseada no identificador informado na URL.
- Exibição das informações e características do item.
- Ação para adicionar o produto ao carrinho.

### Carrinho e checkout demonstrativo
- Inclusão e remoção de itens.
- Ajuste de quantidades e atualização do resumo.
- Dados do carrinho mantidos no `localStorage`.
- Formulário de checkout com validações no navegador.

### Conteúdo institucional
- Página sobre a história e os valores da marca.
- Página de serviços, com destaque para os cuidados oferecidos.
- Página de contato com formulário e seção de dúvidas frequentes.

## 🛠️ Tecnologias e organização

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura semântica das páginas |
| CSS3 | Identidade visual, layout e responsividade |
| JavaScript | Interações, catálogo e lógica do carrinho |
| localStorage | Persistência local dos dados do carrinho |
| Font Awesome | Ícones da interface |
| Google Fonts | Tipografia |

```text
petlove/
├── assets/
│   └── images/
│       └── produtos/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── index.html
├── produtos.html
├── produto.html
├── carrinho.html
├── checkout.html
├── servicos.html
├── sobre.html
└── contato.html
```

## 🚀 Como executar

O projeto não exige etapa de build. Você pode abrir `index.html` diretamente no navegador ou executar um servidor estático na pasta do projeto.

Com Python:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

Também é possível utilizar a extensão **Live Server** no Visual Studio Code.

## 🎨 Personalização

- **Estilos globais:** `css/style.css`
- **Comportamentos e dados dos produtos:** `js/app.js`
- **Imagens e ilustrações:** `assets/images/`
- **Conteúdo das páginas:** arquivos `.html` na raiz do projeto

Para substituir imagens, mantenha os caminhos e nomes esperados pelo código ou atualize as referências correspondentes.

## ⚠️ Escopo e observações

Este repositório representa uma implementação front-end demonstrativa. O carrinho utiliza armazenamento local do navegador e os formulários não estão conectados a um serviço de envio ou processamento.

Antes de utilizar comercialmente, será necessário integrar uma API/backend para catálogo, estoque, pedidos e clientes; configurar frete e gateway de pagamento; implementar validações no servidor; e revisar requisitos de segurança, privacidade e LGPD. **Não utilize dados reais de pagamento nesta demonstração.**

---

<p align="center">
  Feito com carinho por quem acredita que todo pet merece o melhor. 🐶🐱
</p>
