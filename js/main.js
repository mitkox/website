(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
  let userPaused = false;
  let updateScene = () => {};
  const motionToggle = document.getElementById('motionToggle');
  const syncMotion = () => {
    const paused = userPaused || reducedMotion.matches;
    root.classList.toggle('motion-paused', paused);
    if (motionToggle) {
      motionToggle.hidden = false;
      motionToggle.disabled = reducedMotion.matches;
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.innerHTML = reducedMotion.matches ? 'Reduced motion on' : paused ? 'Play motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    }
    updateScene();
  };
  motionToggle?.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();

  // Disclosures become a keyboard-operable tab set only after enhancement.
  const tabs = [...document.querySelectorAll('[data-domain]')];
  if (tabs.length) {
    const activate = (tab, moveFocus = false) => {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        panel.hidden = !selected;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', item.id);
        panel.tabIndex = 0;
        panel.classList.toggle('is-entering', selected);
      });
      if (moveFocus) tab.focus();
    };
    document.querySelector('.domain-tabs').hidden = false;
    document.querySelector('.domain-panels').classList.add('enhanced');
    activate(tabs[0]);
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        activate(tabs[next], true);
      });
    });
  }

  // Content starts visible: animation never gates reading, find, or navigation.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches && !userPaused) entry.target.classList.add('is-revealed');
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.13 });
    document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
  }

  const copy = document.getElementById('copyEmail');
  const status = document.getElementById('contactStatus');
  if (copy && status && navigator.clipboard && isSecureContext) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('sales@mitkox.com');
        copy.textContent = 'Copied';
        status.textContent = 'Email address copied. Paste it into your email service.';
      } catch {
        copy.textContent = 'Copy';
        status.textContent = 'Copy was blocked. Select sales@mitkox.com and copy it manually.';
      }
    });
  }

  // A geometric illustration: scattered capability resolves into an ordered system.
  // No libraries, telemetry, or remote assets. 30 fps with a bounded pixel ratio.
  const canvas = document.getElementById('signalCanvas');
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    const field = canvas.parentElement;
    const hero = document.querySelector('.hero');
    const resolution = 11;
    const count = resolution ** 3;
    const particles = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - 2 * (i + .5) / count;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      particles.push({
        cloud: [Math.cos(angle) * radius * 1.35, y * 1.35, Math.sin(angle) * radius * 1.35],
        grid: [(i % resolution) / 5 - 1, (Math.floor(i / resolution) % resolution) / 5 - 1, Math.floor(i / (resolution * resolution)) / 5 - 1],
        bright: i % 29 === 0
      });
    }
    let width = 0, height = 0, time = 0;
    let frame = 0, last = 0, visible = true;
    let pointerX = 0, pointerY = 0;
    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * .255;
      const centerX = width * .52, centerY = height * .49;
      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, scale * 2.1);
      glow.addColorStop(0, 'rgba(50,92,177,.12)');
      glow.addColorStop(1, 'rgba(50,92,177,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      const morph = (1 - Math.cos(time * .36)) / 2;
      const turn = time * .075 + .6 + pointerX;
      const tilt = -.22 + Math.sin(time * .13) * .12 + pointerY;
      const cy = Math.cos(turn), sy = Math.sin(turn), cx = Math.cos(tilt), sx = Math.sin(tilt);
      const project = vector => {
        const [x,y,z] = vector;
        const rx = x * cy - z * sy, rz = x * sy + z * cy;
        const ry = y * cx - rz * sx, depth = y * sx + rz * cx;
        const perspective = 4.8 / (4.8 + depth);
        return { x: centerX + rx * scale * perspective, y: centerY + ry * scale * perspective, depth, perspective };
      };
      const points = particles.map((particle, index) => {
        const position = particle.cloud.map((v, axis) => v * (1 - morph) + particle.grid[axis] * morph);
        // Organic movement fades away as the regular lattice takes shape.
        position[0] += Math.sin(time * .8 + index * .12) * .055 * (1 - morph);
        position[1] += Math.cos(time * .6 + index * .1) * .04 * (1 - morph);
        return { ...project(position), index, bright: particle.bright };
      });
      if (morph > .35) {
        ctx.lineWidth = .55;
        ctx.strokeStyle = `rgba(115,158,247,${(morph - .35) * .17})`;
        ctx.beginPath();
        // Sparse structural lines keep the geometry legible without visual noise.
        points.forEach((p,i) => {
          const layer = Math.floor(i / (resolution * resolution));
          const row = Math.floor(i / resolution) % resolution;
          if (![0,5,10].includes(layer) || ![0,5,10].includes(row)) return;
          if (i % resolution < resolution - 1) { const q = points[i+1]; ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y); }
        });
        ctx.stroke();
      }
      points.sort((a,b) => b.depth - a.depth);
      points.forEach(point => {
        const depthAlpha = Math.max(.12, Math.min(.85, (.9 - point.depth * .2)));
        const size = (point.bright ? 1.7 : .95) * point.perspective;
        ctx.fillStyle = point.bright ? `rgba(216,231,255,${depthAlpha})` : `rgba(113,157,242,${depthAlpha * .77})`;
        ctx.beginPath();ctx.arc(point.x,point.y,size,0,Math.PI*2);ctx.fill();
      });
    };
    const running = () => visible && !document.hidden && !userPaused && !reducedMotion.matches;
    const tick = stamp => {
      frame = 0;
      if (!running()) { last = 0; return; }
      if (!last || stamp - last >= 1000 / 30) {
        time += last ? Math.min((stamp - last) / 1000, .07) : 0;
        last = stamp;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    updateScene = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0; last = 0;
      draw();
      if (running()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = field.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
      draw();
    };
    resize();
    field.classList.add('canvas-ready');
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(field);
    else window.addEventListener('resize', resize, { passive: true });
    if ('IntersectionObserver' in window) {
      const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 0;
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > .02;
        updateScene();
      }, { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: [0, .02] }).observe(hero);
    }
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      hero.addEventListener('pointermove', event => {
        if (!running()) return;
        const rect = hero.getBoundingClientRect();
        pointerX = (event.clientX / rect.width - .5) * .2;
        pointerY = ((event.clientY - rect.top) / rect.height - .5) * .12;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
    }
    updateScene();
  }
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('page-inactive', document.hidden);
    updateScene();
  });

  // Remove the previous offline worker; Git-deployed updates should stay current.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister().catch(() => {}));
    }).catch(() => {});
  }
})();
