(() => {
  const STORAGE_KEY = 'promptStudioCompositionStrength';
  const allowed = new Set(['normal', 'strong', 'exact']);
  let strength = 'normal';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (allowed.has(saved)) strength = saved;
  } catch (_) {}

  function activeModel() {
    return document.getElementById('model')?.value || 'generic';
  }

  function cameraProfile(model) {
    if (model === 'midjourney') return 'tag';
    if (model === 'flux') return 'hybrid';
    if (model === 'gpt-image' || model === 'nano-banana') return 'instruction';
    return 'generic';
  }

  function pushExtremeLow(cues, level, profile, d) {
    if (profile === 'tag') {
      cues.push('ground-level camera beside the feet', "extreme worm's-eye perspective", 'steep upward camera angle');
      if (level !== 'normal') cues.push('feet dominant in foreground', 'dramatic feet-to-head foreshortening', 'towering subject perspective');
      if (d <= 1.2) cues.push('camera extremely close to the feet');
      if (level === 'exact') cues.push('strict ground-level foot-side viewpoint', 'preserve extreme upward perspective', 'eye-level framing excluded');
      return;
    }

    if (profile === 'hybrid') {
      cues.push("camera at ground level directly beside the subject's feet", 'lens aimed steeply upward along the body');
      if (level !== 'normal') cues.push('feet fill the near foreground while the head recedes toward the top of frame', 'strong vertical foreshortening');
      if (d <= 1.2) cues.push('camera extremely close to the feet');
      if (level === 'exact') cues.push('keep this exact ground-level camera placement; do not normalize it into an eye-level portrait');
      return;
    }

    if (profile === 'instruction') {
      cues.push("Place the camera on the ground directly beside the subject's feet.", "Tilt the lens steeply upward along the subject's body.");
      if (level !== 'normal') {
        cues.push('Make the feet the largest and nearest body parts in the immediate foreground.');
        cues.push('Keep the head much farther away near the upper part of the frame, with strong feet-to-head foreshortening.');
        cues.push('The subject should visibly tower above the camera.');
      }
      if (d <= 1.2) cues.push('Keep the lens extremely close to the feet.');
      if (level === 'exact') {
        cues.push('Treat this camera placement as a hard composition constraint.');
        cues.push('Do not move the camera up to eye, chest, waist, or ordinary low-angle height.');
        cues.push('Do not flatten the perspective or reduce the foreground size of the feet.');
      }
      return;
    }

    cues.push("camera placed at ground level directly beside the subject's feet", "lens tilted steeply upward along the subject's body");
    if (level !== 'normal') cues.push('feet dominate the foreground', 'head recedes toward the top of frame', 'strong vertical foreshortening');
    if (level === 'exact') cues.push('preserve this ground-level viewpoint; do not convert it to eye level');
  }

  function pushLow(cues, level, profile, band) {
    const ankle = band === 'ankle';
    if (profile === 'tag') {
      cues.push(ankle ? 'ankle-height camera' : 'below-waist camera', 'upward camera angle');
      if (level !== 'normal') cues.push('pronounced low-angle perspective');
      if (level === 'exact') cues.push(ankle ? 'preserve ankle-height viewpoint' : 'preserve below-waist viewpoint', 'eye-level framing excluded');
    } else if (profile === 'instruction') {
      cues.push(ankle ? 'Place the camera around ankle height and tilt it upward toward the face.' : 'Place the camera clearly below waist height and tilt it upward.');
      if (level !== 'normal') cues.push('Keep the lower body visibly closer to the lens than the upper body.');
      if (level === 'exact') cues.push('Do not raise the camera to eye level.');
    } else {
      cues.push(ankle ? 'camera positioned around ankle height and tilted upward toward the face' : 'camera positioned below waist level and tilted upward');
      if (level !== 'normal') cues.push('pronounced low-angle perspective with the lower body closer to the lens');
      if (level === 'exact') cues.push('preserve the low camera height; do not convert this into an eye-level portrait');
    }
  }

  function pushExtremeHigh(cues, level, profile) {
    if (profile === 'tag') {
      cues.push('near-overhead camera', 'steep top-down view', 'ground visible around subject');
      if (level !== 'normal') cues.push('head and shoulders nearest to lens', 'strong top-down perspective');
      if (level === 'exact') cues.push('strict near-overhead viewpoint', 'eye-level framing excluded');
    } else if (profile === 'instruction') {
      cues.push('Place the camera almost directly above the subject and aim the lens steeply downward.');
      if (level !== 'normal') {
        cues.push('Keep the top of the head and shoulders closest to the camera.');
        cues.push('Show the ground clearly around the subject to preserve the steep top-down perspective.');
      }
      if (level === 'exact') {
        cues.push('Treat the near-overhead camera position as a hard composition constraint.');
        cues.push('Do not lower the camera into a normal high-angle or eye-level view.');
      }
    } else {
      cues.push('camera positioned almost directly above the subject with the lens aimed steeply downward');
      if (level !== 'normal') cues.push('top of head and shoulders nearest to camera', 'ground clearly visible around the subject');
      if (level === 'exact') cues.push('maintain the near-overhead camera position; do not normalize to eye level');
    }
  }

  function pushHigh(cues, level, profile, band) {
    const steep = band === 'steep';
    if (profile === 'tag') {
      cues.push(steep ? 'camera well above head height' : 'camera above eye level', 'downward camera angle');
      if (level !== 'normal') cues.push('strong high-angle perspective');
      if (level === 'exact') cues.push('preserve elevated camera height');
    } else if (profile === 'instruction') {
      cues.push(steep ? 'Place the camera well above the subject’s head and tilt it downward.' : 'Place the camera above eye level and tilt it downward.');
      if (level !== 'normal') cues.push('Keep the elevated viewpoint visually obvious in the final framing.');
      if (level === 'exact') cues.push('Do not lower the camera to eye level.');
    } else {
      cues.push(steep ? 'camera positioned well above head height and tilted downward' : 'camera positioned above eye level and tilted downward');
      if (level !== 'normal') cues.push('strong high-angle perspective');
      if (level === 'exact') cues.push('preserve the elevated camera height');
    }
  }

  function physicalCameraCues(level, model) {
    const e = Number(state.el);
    const d = Number(state.dist);
    const profile = cameraProfile(model);
    const cues = [];

    if (e <= -55) pushExtremeLow(cues, level, profile, d);
    else if (e <= -35) pushLow(cues, level, profile, 'ankle');
    else if (e <= -15) pushLow(cues, level, profile, 'waist');
    else if (e >= 55) pushExtremeHigh(cues, level, profile);
    else if (e >= 35) pushHigh(cues, level, profile, 'steep');
    else if (e >= 15) pushHigh(cues, level, profile, 'mild');

    if (level === 'exact') {
      if (profile === 'tag') {
        cues.push('camera direction and lens are composition constraints', 'requested framing only');
      } else if (profile === 'instruction') {
        cues.push('Follow the specified camera direction, height, distance, lens, and framing as hard composition constraints.');
        cues.push('Do not replace the requested framing with a conventional centered eye-level portrait.');
      } else {
        cues.push('follow the specified camera direction, height, distance, lens, and framing as strict composition constraints');
        cues.push('do not replace the requested framing with a conventional centered eye-level portrait');
      }
    }

    return cues;
  }

  cameraParts = function() {
    const model = activeModel();
    const e = Number(state.el);
    const d = Number(state.dist);
    const l = Number(state.lens);
    const arr = [
      shotText(d, l),
      azText(state.az),
      elText(e),
      placementText(),
      `${l}mm lens`,
      ...physicalCameraCues(strength, model),
    ];

    if (Math.abs(state.roll) >= 5) {
      arr.push(`${state.roll > 0 ? 'clockwise' : 'counterclockwise'} dutch angle ${Math.abs(state.roll)} degrees`);
    }

    return arr.filter(Boolean);
  };

  function modelLabel() {
    const names = {
      midjourney: 'Midjourney 태그형',
      flux: 'Flux 혼합형',
      'gpt-image': 'GPT Image 지시형',
      'nano-banana': 'Nano Banana 지시형',
      generic: '범용형',
    };
    return names[activeModel()] || '범용형';
  }

  function hintText() {
    const prefix = modelLabel();
    if (strength === 'strong') return `${prefix} · 카메라 위치와 원근관계를 강하게 명시합니다.`;
    if (strength === 'exact') return `${prefix} · 카메라 위치·원근·금지 조건까지 넣어 구도 준수를 최우선으로 합니다.`;
    return `${prefix} · 핵심 카메라 정보만 간결하게 넣습니다.`;
  }

  function updateUi() {
    document.querySelectorAll('#compositionStrength [data-strength]').forEach((btn) => {
      btn.classList.toggle('on', btn.dataset.strength === strength);
    });
    const hint = document.getElementById('compositionStrengthHint');
    if (hint) hint.textContent = hintText();
    const badge = document.getElementById('compositionStrengthBadge');
    if (badge) {
      const names = { normal: '구도 보통', strong: '구도 강하게', exact: '구도 정확히' };
      badge.textContent = `${names[strength]} · ${modelLabel()}`;
    }
  }

  function installUi() {
    if (document.getElementById('compositionStrength')) return;
    const coord = document.querySelector('#compositionCard .coord');
    if (!coord) return;

    const wrap = document.createElement('div');
    wrap.className = 'compositionStrengthBlock';
    wrap.innerHTML = `
      <div class="compositionStrengthHead">
        <span>구도 강도</span>
        <span class="compositionStrengthHint" id="compositionStrengthHint"></span>
      </div>
      <div class="seg compositionStrengthSeg" id="compositionStrength">
        <button type="button" class="tab" data-strength="normal">보통</button>
        <button type="button" class="tab" data-strength="strong">강하게</button>
        <button type="button" class="tab" data-strength="exact">정확히</button>
      </div>`;
    coord.insertAdjacentElement('afterend', wrap);

    document.getElementById('compositionStrength').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-strength]');
      if (!btn) return;
      strength = btn.dataset.strength;
      try { localStorage.setItem(STORAGE_KEY, strength); } catch (_) {}
      updateUi();
      compile();
    });

    const modelSelect = document.getElementById('model');
    modelSelect?.addEventListener('change', () => {
      updateUi();
      compile();
    });

    const badges = document.querySelector('.resultPanel .badges');
    if (badges && !document.getElementById('compositionStrengthBadge')) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.id = 'compositionStrengthBadge';
      badges.appendChild(badge);
    }

    const style = document.createElement('style');
    style.textContent = `
      .compositionStrengthBlock{margin-top:2px;padding:10px 11px;border:1px solid #ffffff12;border-radius:12px;background:#0b0d11}
      .compositionStrengthHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
      .compositionStrengthHead>span:first-child{font-size:10px;color:#b8bdc9;font-weight:700;white-space:nowrap}
      .compositionStrengthHint{font-size:9px;color:#777f8e;text-align:right;line-height:1.4}
      .compositionStrengthSeg{gap:6px}
      .compositionStrengthSeg .tab{flex:1;min-width:72px;text-align:center}
      .compositionStrengthSeg .tab[data-strength="exact"].on{border-color:#ff5f5f99;background:#ff5f5f16;color:#ffc3c3}
      @media(max-width:700px){.compositionStrengthHead{align-items:flex-start;flex-direction:column}.compositionStrengthHint{text-align:left}}
    `;
    document.head.appendChild(style);

    updateUi();
  }

  installUi();
  compile();
})();
