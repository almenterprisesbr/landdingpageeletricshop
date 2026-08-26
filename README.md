# ElectricShop — Site Institucional

Site institucional da **ElectricShop**, rede de lojas de mobilidade elétrica na Baixada Santista (SP).

## Status: 🟢 Primeira versão do site construída

O site está funcional e navegável. Falta apenas substituir fotos e dados reais —
tudo catalogado em **[`site/DADOS-A-PREENCHER.md`](site/DADOS-A-PREENCHER.md)**.

## Estrutura de pastas

| Pasta | O que tem |
|---|---|
| **[`site/`](site/)** | O site em si — HTML, CSS, JS e mídias. |
| **[`briefing/`](briefing/)** | Informações da empresa e perguntas ainda em aberto. |
| **[`referencias/`](referencias/)** | Fotos, vídeos e material de apoio enviados pelo cliente. |

## Rodando o site no seu computador

Não precisa de build, framework nem `npm install`. É HTML/CSS/JS puro.

**Jeito fácil — sem digitar comando:**

| Sistema | O que fazer |
|---|---|
| Windows | dois cliques em `site/rodar-windows.bat` |
| Mac / Linux | `bash site/rodar-mac-linux.sh` |

Os dois sobem o servidor e já abrem o navegador em `http://localhost:8000`.
Para parar, feche a janela (Windows) ou aperte `Ctrl+C`.

**Na mão, se preferir:**

```bash
cd site
python3 -m http.server 8000
```

> Dá para abrir o `site/index.html` com dois cliques também — o site funciona
> inteiro assim, mas alguns navegadores bloqueiam vídeo local, então o hero
> pode ficar sem o vídeo de fundo. Com o servidor, tudo funciona.

Para publicar, suba a pasta `site/` em qualquer hospedagem estática
(Hostinger, Vercel, Netlify, GitHub Pages).

> Dica: acesse com `?revisao` no fim da URL para destacar todos os textos que
> ainda são provisórios.

## Direção de design

Referências aprovadas: [363sudbury.com](https://363sudbury.com/) e
[vincentetdussault.com](https://vincentetdussault.com/) — daí vieram o
**bento grid escuro**, os cards com ícone e seta diagonal, os números grandes
e o clima cinematográfico.

- **Paleta:** preto e branco da marca + verde-limão `#C8FF3D` de destaque
  (mesma família do verde já usado na comunicação das lojas)
- **Tipografia:** Space Grotesk (títulos) + Inter (texto)
- **Movimento:** revelação ao rolar, contadores, ticker, parallax sutil —
  tudo desligado automaticamente para quem usa "reduzir movimento" no sistema

## Seções

Hero com vídeo em tela cheia → ticker → a empresa (bento) → números →
catálogo com filtros → oficina → fabricação nacional → lojas → depoimentos →
FAQ → formulário de test-ride → rodapé.

## O que foi verificado

Testado em navegador real (Chromium via Playwright), a 1440px e 390px:

- ✅ Sem rolagem horizontal em nenhuma das duas larguras
- ✅ Filtro de produtos, validação do formulário, menu mobile, acordeão e contadores
- ✅ Nenhum erro de JavaScript
- ✅ Contraste: 7,49:1 no texto secundário e 9,01:1 no card verde (mínimo exigido: 4,5:1)
- ✅ Hierarquia de títulos sem saltos; todos os alvos de toque ≥ 44px
- ✅ Campos com rótulo, links com nome acessível, `prefers-reduced-motion` respeitado

## Pendências conhecidas

1. **Fotos reais** — hoje o site usa blocos placeholder. As fotos enviadas por
   chat estão descritas em `referencias/`, mas ainda não vieram como arquivo.
2. **Vídeo do hero com 25 MB** — funciona, mas o ideal é comprimir para 3–6 MB.
   O comando está em `site/DADOS-A-PREENCHER.md`.
3. **Formulário sem back-end** — hoje só simula o envio.
4. **Dados de contato, endereços e fichas técnicas** — todos provisórios.
