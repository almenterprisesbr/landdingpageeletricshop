/* ==========================================================================
   ELECTRICSHOP — Interações
   JavaScript puro, sem dependências externas. Cada bloco é independente:
   se um falhar, os outros continuam funcionando.
   ========================================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     1. PRELOADER
     Sai assim que a página carrega — com teto de 2,2s para nunca travar
     o usuário caso um recurso pesado (o vídeo) demore.
     --------------------------------------------------------------------- */
  (function preloader() {
    const el = $('#preloader');
    if (!el) return;
    const bar = $('span', el);
    let pct = 0;

    const tick = setInterval(() => {
      pct = Math.min(pct + Math.random() * 22, 92);
      if (bar) bar.style.width = pct + '%';
    }, 180);

    const finish = () => {
      clearInterval(tick);
      if (bar) bar.style.width = '100%';
      setTimeout(() => {
        el.classList.add('is-done');
        document.body.classList.add('is-loaded');
      }, 260);
    };

    window.addEventListener('load', finish, { once: true });
    setTimeout(finish, 2200); // rede lenta não pode prender a tela
  })();

  /* ---------------------------------------------------------------------
     2. VÍDEO DO HERO
     Autoplay + loop. Se o navegador bloquear (política de economia de
     bateria em alguns celulares), tentamos de novo no primeiro toque.
     --------------------------------------------------------------------- */
  (function heroVideo() {
    const video = $('#heroVideo');
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    tryPlay();
    ['touchstart', 'click', 'scroll'].forEach(evt =>
      window.addEventListener(evt, tryPlay, { once: true, passive: true })
    );

    // Economiza bateria: pausa quando o hero sai da tela.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(e => (e.isIntersecting ? tryPlay() : video.pause()));
      }, { threshold: 0.05 }).observe(video);
    }
  })();

  /* ---------------------------------------------------------------------
     3. HEADER — fundo ao rolar + esconde ao descer, aparece ao subir
     --------------------------------------------------------------------- */
  (function header() {
    const el = $('#header');
    if (!el) return;
    let last = 0;

    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle('is-stuck', y > 40);
      // só esconde depois de passar do hero e enquanto o menu estiver fechado
      const menuOpen = $('#mobile-menu')?.classList.contains('is-open');
      if (!menuOpen && y > 600) {
        el.classList.toggle('is-hidden', y > last && y - last > 4);
      } else {
        el.classList.remove('is-hidden');
      }
      last = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------------------------------------------------------------------
     4. MENU MOBILE
     --------------------------------------------------------------------- */
  (function mobileMenu() {
    const burger = $('#burger');
    const menu = $('#mobile-menu');
    if (!burger || !menu) return;

    const close = () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 300);
    };

    const open = () => {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
    };

    burger.addEventListener('click', () =>
      burger.getAttribute('aria-expanded') === 'true' ? close() : open()
    );
    $$('a', menu).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => e.key === 'Escape' && close());
    window.addEventListener('resize', () => window.innerWidth > 900 && close());
  })();

  /* ---------------------------------------------------------------------
     5. REVEAL AO ROLAR
     --------------------------------------------------------------------- */
  (function reveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => io.observe(el));
  })();

  /* ---------------------------------------------------------------------
     6. CONTADORES ANIMADOS
     --------------------------------------------------------------------- */
  (function counters() {
    const nums = $$('.count');
    if (!nums.length) return;

    const run = el => {
      const to = parseFloat(el.dataset.to) || 0;
      const suffix = el.dataset.suffix || '';
      if (reduceMotion || to === 0) { el.textContent = to + suffix; return; }

      const dur = 1500;
      const start = performance.now();
      const step = now => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        el.textContent = Math.round(to * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        run(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(el => io.observe(el));
  })();

  /* ---------------------------------------------------------------------
     7. FILTRO DE PRODUTOS
     --------------------------------------------------------------------- */
  (function filters() {
    const btns = $$('.filter');
    const cards = $$('.product');
    if (!btns.length || !cards.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;

        btns.forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        cards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.classList.toggle('is-hidden', !show);
          if (show) {
            card.classList.remove('is-in');
            requestAnimationFrame(() => card.classList.add('is-in'));
          }
        });
      });
    });
  })();

  /* ---------------------------------------------------------------------
     8. LINK ATIVO NA NAVEGAÇÃO
     --------------------------------------------------------------------- */
  (function activeNav() {
    const links = $$('.nav a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const map = new Map();
    links.forEach(a => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) map.set(sec, a);
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const link = map.get(e.target);
        if (link && e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' });

    map.forEach((_, sec) => io.observe(sec));
  })();

  /* ---------------------------------------------------------------------
     9. VÍDEO DA OFICINA — carrega e toca só quando entra na tela
     --------------------------------------------------------------------- */
  (function lazyVideo() {
    const vids = $$('[data-lazyvideo]');
    if (!vids.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target;
        if (e.isIntersecting) {
          // play() já dispara o download; chamar load() aqui cancelaria
          // a requisição em andamento (ERR_ABORTED no console).
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else if (!v.paused) {
          // só pausa o que realmente está tocando — pausar um vídeo que ainda
          // nem começou a carregar cancela a requisição à toa
          v.pause();
        }
      });
    }, { threshold: 0.1 });

    vids.forEach(v => io.observe(v));
  })();

  /* ---------------------------------------------------------------------
     10. BARRA DE PROGRESSO + BOTÃO WHATSAPP
     --------------------------------------------------------------------- */
  (function progressAndWa() {
    const bar = $('#progress');
    const wa = $('.wa');

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (wa) wa.classList.toggle('is-visible', window.scrollY > 700);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ---------------------------------------------------------------------
     11. CURSOR PERSONALIZADO (só mouse fino)
     --------------------------------------------------------------------- */
  (function cursor() {
    const el = $('#cursor');
    if (!el || reduceMotion) return;
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    const dot = $('.cursor__dot', el);
    const ring = $('.cursor__ring', el);
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    $$('a, button, .bento__card, .product, .store, summary').forEach(node => {
      node.addEventListener('mouseenter', () => el.classList.add('is-hover'));
      node.addEventListener('mouseleave', () => el.classList.remove('is-hover'));
    });
  })();

  /* ---------------------------------------------------------------------
     12. ACORDEÃO — mantém apenas um aberto por vez
     --------------------------------------------------------------------- */
  (function accordion() {
    const items = $$('.acc');
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach(other => { if (other !== item) other.open = false; });
      });
    });
  })();

  /* ---------------------------------------------------------------------
     13. FORMULÁRIO — máscara de telefone e validação inline
     ATENÇÃO: não há back-end. Hoje o envio apenas simula sucesso.
     Ver DADOS-A-PREENCHER.md para conectar a um destino real.
     --------------------------------------------------------------------- */
  (function form() {
    const form = $('#form');
    if (!form) return;
    const status = $('#formStatus');
    const tel = $('#tel');

    // Máscara (13) 90000-0000
    if (tel) {
      tel.addEventListener('input', () => {
        let v = tel.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
          v = `(${v.slice(0, 2)}) ${v.slice(2, v.length - 4)}-${v.slice(-4)}`;
        } else if (v.length > 2) {
          v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
          v = `(${v}`;
        }
        tel.value = v;
      });
    }

    const setError = (field, msg) => {
      const wrap = field.closest('.field');
      if (!wrap) return;
      const box = $('[data-err]', wrap);
      wrap.classList.toggle('has-error', Boolean(msg));
      if (box) box.textContent = msg || '';
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    const validate = field => {
      const val = field.value.trim();
      if (field.hasAttribute('required') && !val) {
        setError(field, 'Campo obrigatório.'); return false;
      }
      if (field.id === 'tel' && val.replace(/\D/g, '').length < 10) {
        setError(field, 'Informe DDD + número.'); return false;
      }
      if (field.id === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError(field, 'E-mail inválido.'); return false;
      }
      setError(field, '');
      return true;
    };

    // valida ao sair do campo, limpa o erro enquanto digita
    $$('input, select, textarea', form).forEach(f => {
      f.addEventListener('blur', () => validate(f));
      f.addEventListener('input', () => {
        if (f.closest('.field')?.classList.contains('has-error')) validate(f);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = $$('[required]', form);
      let ok = true;
      let firstBad = null;

      fields.forEach(f => {
        if (!validate(f)) { ok = false; firstBad = firstBad || f; }
      });

      if (!ok) {
        if (status) { status.textContent = 'Confira os campos destacados.'; status.classList.remove('is-ok'); }
        firstBad?.focus();
        return;
      }

      const btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = true; btn.style.opacity = '.7'; }
      if (status) { status.textContent = 'Enviando…'; status.classList.remove('is-ok'); }

      // Simulação — trocar por fetch() para o destino real.
      setTimeout(() => {
        form.reset();
        if (btn) { btn.disabled = false; btn.style.opacity = ''; }
        if (status) {
          status.textContent = 'Recebemos seu contato! A equipe da loja fala com você em breve.';
          status.classList.add('is-ok');
        }
      }, 900);
    });
  })();

  /* ---------------------------------------------------------------------
     14. ANO NO RODAPÉ
     --------------------------------------------------------------------- */
  (function year() {
    const el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

  /* ---------------------------------------------------------------------
     15. MODO REVISÃO — destaca os textos ainda provisórios.
     Ative digitando no console:  document.body.classList.add('show-placeholders')
     ou acrescente ?revisao na URL.
     --------------------------------------------------------------------- */
  if (location.search.includes('revisao')) {
    document.body.classList.add('show-placeholders');
  }
})();
