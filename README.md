# Mentoria Preparamente — Landing Page Premium

Landing page de alta conversão da Mentoria Preparamente, com dados reais extraídos dos
sites oficiais, identidade visual (verde-teal `#02AA91`, creme `#F3F0E8`, navy `#2B347C`,
fontes Anton + Poppins) e layout testado em Desktop, Tablet e Mobile.

## Arquivos

- `index.html` — landing completa (versão para GitHub / hospedagem própria)
- `css/styles.css` — estilos
- `js/main.js` — header sticky, nav mobile, scrollspy, reveal on scroll, carrossel ecossistema, FAQ
- `assets/img/` — imagens otimizadas (WebP)
- `elementor-widget.html` — versão 100% autocontida (CSS escopado em `.pp-lp`, imagens em base64, JS inline) para colar no widget HTML do Elementor

## Conteúdo (dados reais)

- **Plano Básico** — R$ 527 por R$ 299 ou 3x R$ 99,66
- **Plano Performance** — R$ 820 por R$ 499 ou 3x R$ 166,33
- **Plano Alta Performance** — R$ 1.300 por R$ 799 ou 3x R$ 266,33
- **WhatsApp** — 55 41 98512-6848, com mensagem personalizada por plano
- Vídeo de apresentação embutido: https://youtu.be/sIXC3d7DKdg

## Deploy — GitHub Pages (ou qualquer host estático)

```bash
# 1. Suba os arquivos (index.html, css/, js/, assets/) para o repositório
git init
git add .
git commit -m "feat: landing page Mentoria Preparamente"
git branch -M main
git remote add origin git@github.com:SEU_USUARIO/SEU_REPO.git
git push -u origin main

# 2. No GitHub: Settings > Pages > Source: Deploy from a branch > main > /
# O site fica em https://SEU_USUARIO.github.io/SEU_REPO/
```

O `index.html` não depende de build nem de servidor — basta servir a pasta estaticamente.

## Deploy — Elementor (WordPress)

1. No editor do Elementor, adicione um widget **HTML** (drag & drop `HTML`).
2. Abra o arquivo `elementor-widget.html` em um editor de texto e **copie todo o conteúdo**.
3. Cole dentro do widget HTML e clique em **Update**.
4. O arquivo já inclui `<meta charset="UTF-8">`, CSS escopado em `.pp-lp`, imagens em base64 e JS inline.
   Nenhum asset externo é necessário (apenas Google Fonts via `@import`).

Dica: para a foto do casal no hero, substitua `assets/img/hero-bg.webp` (em `index.html`)
ou a string base64 correspondente (em `elementor-widget.html`) pela nova imagem.

## Testes automatizados

Testes de renderização (Playwright) rodam contra um servidor estático na raiz do projeto
(vide `test3.js` / `test_el2.js`): sem overflow horizontal, sem imagens quebradas, sem erros
de console, em Desktop (1280px), Tablet (768px) e Mobile (375px).
