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

### 4. Ficha técnica dos produtos (agora num carrossel 3D)
A seção `#produtos` virou um carrossel "coverflow" (card do centro em destaque,
os outros em arco ao redor — arraste, use as setas, os pontinhos ou os atalhos
de categoria). Os 6 modelos em `index.html` continuam com **nomes e specs
provisórios**:

| Nome provisório | Categoria | Precisa de | Foto de referência |
|---|---|---|---|
| ES Urbano | Scooter | nome real, autonomia, velocidade, potência, preço | ✅ scooter prata/cinza — aprovada |
| ES City Plus | Scooter | idem | ✅ scooter azul + baú (marca "NIZ") — aprovada |
| ES Max | Maxi-scooter | idem | ✅ citycoco verde "FX2" — aprovada (estilo diferente do "com para-brisa" original, mas cliente confirmou manter) |
| ES Trail | Moto | idem | ✅ moto trail preta — aprovada |
| ES Bike | Bicicleta | idem | ✅ moped rosa "Smart Bike" — aprovada como imagem de apoio (ver observação abaixo) |
| ES Kick | Patinete | idem | ❌ nenhuma foto de patinete recebida ainda |

> Cliente confirmou usar todas as fotos acima como enviadas ("pode deixar
> como enviei mesmo"), incluindo as marcas de terceiros visíveis nas
> carenagens (NIZ, FX2, Streetgo, Smart Bike) — não vamos mexer nisso.
> Falta só: (1) os arquivos originais chegarem por anexo — coladas no chat
> eu só consigo ver e descrever, não salvar o binário — e (2) uma foto de
> patinete elétrico, que ainda não veio.
>
> Também foi recebida uma e-bike cinza "Streetgo" (fat tire, câmbio Shimano)
> sem slot definido — pode virar um 7º modelo ou substituir a "Smart Bike"
> na ES Bike, à critério de vocês.

Se algum modelo não existir, basta apagar o `<article class="coverflow__card">`
inteiro (e o `<button class="cf-dot">` correspondente).

### 5. Números não confirmados
- **"90% menos custo por km"** — estimativa. Confirmar ou trocar.
- **"R$ 0 de IPVA"** — confirmar a regra vigente em SP para elétricos.
- **Depoimentos** — os 12 (em 3 colunas rolando) são ilustrativos, nomes e
  falas fictícios. Substituir por avaliações reais (idealmente com nome e
  autorização do cliente).

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
> vieram como arquivo (ver observação importante logo abaixo sobre 2 delas).
> Envie os `.jpg` originais para irem para `site/assets/img/`.

> ⚠️ **Uma foto "de loja" recebida não é a ElectricShop e não foi usada.** A
> foto aérea com as marcas **"E-ELECTRIC"** e **"ATTO MOTORS"** é de outra
> empresa — cliente confirmou que não tem problema, ela simplesmente não
> entra no site. As outras duas fotos aéreas/fachada (letreiro "ELECTRIC
> SHOP" correto) foram aprovadas para uso como enviadas: a fachada de vidro
> na esquina é a loja de **São Vicente**; a foto com o prédio preto, placas
> solares e a ponte ao fundo o cliente confirmou manter como está, mesmo com
> a ponte lembrando mais São Paulo capital do que a Baixada Santista.

### 7. ✅ Vídeo do hero — comprimido em alta qualidade
Resolvido. `assets/video/hero.mp4` caiu de 25 MB para **18 MB**, mantendo
qualidade alta (CRF 18, perfil "High", ~7 Mbps) — sem áudio (o vídeo já toca
mudo) e com faststart para começar a tocar antes de baixar tudo por completo.
`assets/video/oficina.mp4` caiu de 2,4 MB para 404 KB.

> Testamos primeiro uma compressão mais agressiva (5,3 MB) mas a qualidade
> ficou visivelmente pior — por isso foi refeito priorizando qualidade.

Se quiser comprimir mais no futuro (ex.: o site carregar mais rápido em 4G,
trocando um pouco de nitidez por tamanho), o comando usado foi:

```bash
ffmpeg -i hero-original.mp4 -an -vf "scale=1920:-2" \
  -c:v libx264 -crf 18 -preset slow -movflags +faststart hero.mp4
```

`-crf 18` = alta qualidade (usado agora). Valores maiores (20–24) reduzem o
tamanho com perda de qualidade praticamente imperceptível; acima de 26 a
perda começa a ficar visível.

### 8. ✅ Poster do vídeo — já é um frame real
Resolvido. `assets/img/hero-poster.jpg` e `assets/img/oficina-poster.jpg` são
frames reais extraídos dos próprios vídeos (não mais um gradiente genérico):

```bash
ffmpeg -i hero.mp4 -ss 00:00:03 -vframes 1 -q:v 3 hero-poster.jpg
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
