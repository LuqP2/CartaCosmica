# Carta Cósmica

Site estático para organizar e preservar os textos do blog Carta Cósmica.

## Estrutura

O site fica dentro de `public/`, para deploy simples no Vercel.

- `public/index.html` — página inicial
- `public/biblioteca.html` — biblioteca com busca e filtro
- `public/comece-aqui.html` — trilha de leitura
- `public/arquivo.html` — arquivo cronológico
- `public/sobre.html` — apresentação da autora
- `public/atendimentos.html` — showcase/contato
- `public/textos/` — páginas individuais dos textos
- `public/data/posts.json` — índice dos textos
- `public/assets/css/style.css` — visual do site
- `public/assets/js/site.js` — renderização da biblioteca e busca local
- `vercel.json` — configuração de deploy apontando para `public/`

## Publicação

Projeto estático puro, sem build. No Vercel, o `outputDirectory` está configurado como `public`.
