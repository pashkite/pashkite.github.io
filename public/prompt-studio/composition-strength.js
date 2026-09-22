(() => {
  const STORAGE_KEY = 'promptStudioCompositionStrength';
  const allowed = new Set(['normal', 'strong', 'exact']);
  let strength = 'normal';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (allowed.has(saved)) strength = saved;
  } catch (_) {}

  function physicalCameraCues(level) {
    const e = Number(state.el);
    const d = Number(state.dist);
    const cues = [];

    if (e <= -55) {
      cues.push("camera placed at ground level directly beside the subject's feet");
      cues.push("lens tilted steeply upward along the subject's body");

      if (level !== 'normal') {
        cues.push('feet dominate the immediate foreground and appear much larger than the head');
        cues.push('head is much farther away near the upper part of the frame');
        cues.push('strong vertical perspective and dramatic foreshortening from feet to head');
        cues.push('the subject towers above the camera');
        if (d <= 1.2) cues.push('camera is extremely close to the feet');
      }

      if (level === 'exact') {
        cues.push('strict composition requirement: keep the camera beside the feet at ground height');
        cues.push('the feet must remain the nearest visible body part to the lens');
        cues.push('preserve the steep upward perspective even if the face appears smaller');
        cues.push('do not change this to eye-level, waist-level, chest-level, or ordinary low-angle framing');
        cues.push('do not flatten the perspective or move the camera farther away');
      }
    } else if (e <= -35) {
      cues.push('camera positioned around ankle height and tilted upward toward the face');
      if (level !== 'normal') cues.push('pronounced low-angle perspective with the lower body closer to the lens');
      if (level === 'exact') {
        cues.push('preserve ankle-height camera placement');
        cues.push('do not convert this into an eye-level portrait');
      }
    } else if (e <= -15) {
      cues.push('camera positioned below waist level and tilted upward');
      if (level === 'exact') cues.push('keep the camera clearly below the subject, not at eye level');
    } else if (e >= 55) {
      cues.push('camera positioned almost directly above the subject with the lens aimed steeply downward');
      if (level !== 'normal') {
        cues.push('top of the head and shoulders are closest to the camera');
        cues.push('ground is clearly visible around the subject in a steep top-down perspective');
      }
      if (level === 'exact') {
        cues.push('strict composition requirement: maintain a near-overhead camera position');
        cues.push('do not change this to a normal high-angle or eye-level view');
      }
    } else if (e >= 35) {
      cues.push('camera positioned well above head height and tilted downward');
      if (level !== 'normal') cues.push('strong high-angle perspective with the ground visible behind the subject');
      if (level === 'exact') cues.push('keep the camera clearly above the subject and do not lower it to eye level');
    } else if (e >= 15) {
      cues.push('camera positioned above eye level and tilted downward');
      if (level === 'exact') cues.push('preserve the elevated camera height');
    }

    if (level === 'exact') {
      cues.push('follow the specified camera direction, height, distance, and lens as composition constraints');
      cues.push('do not replace the requested framing with a conventional centered eye-level portrait');
    }

    return cues;
  }

  cameraParts = function() {
    const e = Number(state.el);
    const d = Number(state.dist);
    const l = Number(state.lens);
    const arr = [
      shotText(d, l),
      azText(state.az),
      elText(e),
      placementText(),
      `${l}mm lens`,
      ...physicalCameraCues(strength),
    ];

    if (Math.abs(state.roll) >= 5) {
      arr.push(`${state.roll > 0 ? 'clockwise' : 'counterclockwise'} dutch angle ${Math.abs(state.roll)} degrees`);
    }

    return arr.filter(Boolean);
  };

  function hintText() {
    if (strength === 'strong') return '카메라 위치와 원근관계를 명시해 구도를 강하게 고정합니다.';
    if (strength === 'exact') return '카메라 위치·원근·금지 조건까지 반복해 구도 준수도를 최우선으로 합니다.';
    return '핵심 카메라 정보만 넣어 프롬프트를 비교적 간결하게 유지합니다.';
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
      badge.textContent = names[strength];
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
