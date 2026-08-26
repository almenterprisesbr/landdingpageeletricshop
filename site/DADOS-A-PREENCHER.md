# Dados a preencher antes de publicar

> Tudo que está no site hoje e **não é definitivo**. O site funciona 100% assim,
> mas estes pontos precisam dos dados reais da empresa antes de ir ao ar.
>
> 💡 Dica: abra o site com **`?revisao`** no fim da URL
> (ex.: `index.html?revisao`) para destacar em laranja todos os textos provisórios.

---

## 🔴 Crítico — não publicar sem isso

### 1. Contato e endereços
Aparecem na seção **Contato**, nos cards de **Lojas** e no **rodapé**.

| Item | Valor atual (placeholder) | Onde aparece |
|---|---|---|
| Endereço Santos | `Av. Exemplo, 000 — Gonzaga` | Lojas, rodapé |
| Endereço São Vicente | `Av. Exemplo, 000 — Centro` | Lojas, rodapé |
| WhatsApp | `(13) 90000-0000` | Contato, rodapé |
| E-mail | `contato@electricshop.com.br` | Contato, rodapé |
| CNPJ | `00.000.000/0001-00` | Rodapé |
| Horários loja/oficina | `Seg a Sex 9h–18h · Sáb 9h–13h` | Cards de loja |

### 2. Links reais
- **Redes sociais** no rodapé estão como `href="#"` — trocar por Instagram, Facebook e WhatsApp reais.
- **Botão flutuante de WhatsApp** aponta para `#contato` — trocar por
  `https://wa.me/55DDDNUMERO?text=Olá! Vim pelo site.`
- **"Como chegar"** nos cards de loja — apontar para o Google Maps de cada unidade.

### 3. Formulário sem back-end
Hoje o envio apenas **simula** sucesso (não envia nada para ninguém).
Em `assets/js/main.js`, bloco 13, substituir o `setTimeout` por um envio real.
Opções: Formspree, Web3Forms, EmailJS, ou um endpoint próprio.

```js
const res = await fetch('SUA_URL_AQUI', {
  method: 'POST',
  body: new FormData(form)
});
```

### 4. Ficha técnica dos produtos
Os 6 modelos em `index.html` (seção `#produtos`) usam **nomes e specs provisórios**:

| Nome provisório | Categoria | Precisa de |
|---|---|---|
| ES Urbano | Scooter | nome real, autonomia, velocidade, potência, preço |
| ES City Plus | Scooter | idem |
| ES Max | Maxi-scooter | idem |
| ES Trail | Moto | idem |
| ES Bike | Bicicleta | idem |
| ES Kick | Patinete | idem |

Se algum modelo não existir, basta apagar o bloco `<article class="product">` inteiro.

### 5. Números não confirmados
- **"90% menos custo por km"** — estimativa. Confirmar ou trocar.
- **"R$ 0 de IPVA"** — confirmar a regra vigente em SP para elétricos.
- **Depoimentos** — os 3 são ilustrativos. Substituir por avaliações reais
  (idealmente com nome e foto do cliente, com autorização).

---

## 🟡 Importante — melhora bastante o resultado

### 6. Fotos reais
Todas as imagens hoje são **blocos placeholder** (`<div class="ph">`).
Para trocar, substitua o bloco pelo `<img>`:

```html
<!-- antes -->
<div class="ph ph--loja"><span>Foto: fachada da loja ao anoitecer</span></div>

<!-- depois -->
<img src="assets/img/fachada-santos.jpg" alt="Fachada da loja ElectricShop em Santos ao anoitecer" loading="lazy" width="1600" height="1000">
```

Fotos necessárias:

| Onde | Foto |
|---|---|
| Bento — card grande | Fachada da loja ao anoitecer |
| Bento — oficina | Interior da oficina |
| Bento — showroom | Interior do showroom |
| Produtos (6×) | Cada modelo em estúdio, fundo branco |
| Lojas (2×) | Fachada de Santos e de São Vicente |

> As fotos já enviadas por chat estão descritas em `referencias/` mas ainda não
> vieram como arquivo. Envie os `.jpg` originais para irem para `site/assets/img/`.

### 7. Vídeo do hero — compressão
`assets/video/hero.mp4` tem **25 MB**. Funciona, mas é pesado para celular no 4G.
Recomendado comprimir para 3–6 MB antes de publicar:

```bash
ffmpeg -i hero.mp4 -t 15 -an -vf "scale=1920:-2" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart hero-web.mp4
```

- `-t 15` corta em 15s (ideal para loop de hero)
- `-an` remove o áudio (o vídeo já toca mudo)
- `-movflags +faststart` faz o vídeo começar antes de baixar tudo

Gerar também uma versão `.webm` melhora ainda mais em navegadores modernos.

> Não consegui fazer isso aqui: o ffmpeg disponível neste ambiente é uma build
> reduzida, sem suporte a H.264.

### 8. Poster do vídeo
`assets/img/hero-poster.svg` é um gradiente genérico que aparece enquanto o vídeo
carrega. O ideal é um frame real do próprio vídeo:

```bash
ffmpeg -i hero.mp4 -ss 00:00:02 -vframes 1 -q:v 2 hero-poster.jpg
```

---

## 🟢 Opcional — quando o domínio existir

- **URL canônica e Open Graph** no `<head>` do `index.html` (hoje aponta para
  `https://www.electricshop.com.br/`, que é suposição).
- **Imagem de compartilhamento** (`og:image`) — 1200×630px, para o link ficar
  bonito ao ser enviado no WhatsApp/Instagram.
- **Google Analytics / Meta Pixel**, se for fazer tráfego pago.
- **Logo em SVG** — hoje o raio da marca é um SVG que desenhei por aproximação
  a partir das fotos. Se existir o arquivo vetorial oficial, vale substituir.

---

## Como rodar o site localmente

Não precisa de build, framework nem instalação. É HTML/CSS/JS puro.

```bash
cd site
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

Para publicar, basta subir a pasta `site/` inteira em qualquer hospedagem
(Hostinger, Vercel, Netlify, GitHub Pages...).
