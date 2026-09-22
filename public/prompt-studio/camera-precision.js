(() => {
  // Make camera settings describe physical placement, not only abstract angle names.
  elText = function(v) {
    const e = Number(v);
    if (e >= 55) return "near-overhead bird's-eye view";
    if (e >= 35) return 'steep high angle';
    if (e >= 15) return 'high angle';
    if (e > -15) return 'eye level';
    if (e > -35) return 'low angle';
    if (e > -55) return 'very low angle';
    return "extreme ground-level worm's-eye view";
  };

  cameraParts = function() {
    const e = Number(state.el);
    const d = Number(state.dist);
    const l = Number(state.lens);
    const arr = [shotText(d, l), azText(state.az), elText(e), placementText(), `${l}mm lens`];

    if (e <= -55) {
      arr.push('camera placed at ground level directly beside the subject\'s feet');
      arr.push('lens tilted steeply upward along the subject\'s body');
      arr.push('feet very large in the immediate foreground');
      arr.push('head much farther away near the top of the frame');
      arr.push('strong vertical perspective foreshortening');
      arr.push('the subject towers above the camera');
      if (d <= 1.2) arr.push('camera extremely close to the feet');
    } else if (e <= -35) {
      arr.push('camera positioned around ankle height');
      arr.push('camera tilted upward toward the face');
      arr.push('pronounced low-angle perspective');
    } else if (e <= -15) {
      arr.push('camera positioned below waist level and tilted upward');
    } else if (e >= 55) {
      arr.push('camera positioned almost directly above the subject');
      arr.push('lens aimed steeply downward toward the subject');
      arr.push('top-down perspective with the ground clearly visible around the subject');
    } else if (e >= 35) {
      arr.push('camera positioned well above head height and tilted downward');
    } else if (e >= 15) {
      arr.push('camera positioned above eye level and tilted downward');
    }

    if (Math.abs(state.roll) >= 5) {
      arr.push(`${state.roll > 0 ? 'clockwise' : 'counterclockwise'} dutch angle ${Math.abs(state.roll)} degrees`);
    }
    return arr.filter(Boolean);
  };

  // Add physically meaningful extreme-angle presets and allow presets to set lens.
  if (!PRESETS.some((p) => p[0] === '발밑 웜즈아이')) {
    PRESETS.push(['발밑 웜즈아이', 0, -58, 0.6, 24]);
  }
  if (!PRESETS.some((p) => p[0] === '머리 위 탑뷰')) {
    PRESETS.push(['머리 위 탑뷰', 0, 60, 1.2, 28]);
  }

  renderPresets = function() {
    $('presetButtons').innerHTML = PRESETS.map((p, i) => `<button class="preset" data-i="${i}">${p[0]}</button>`).join('');
    $('presetButtons').querySelectorAll('button').forEach((b) => {
      b.onclick = () => {
        const p = PRESETS[+b.dataset.i];
        state.az = p[1];
        state.el = p[2];
        state.dist = p[3];
        if (p[4] != null) state.lens = p[4];
        syncControls();
        compile();
      };
    });
  };

  // app.js initializes asynchronously, but re-render now as well so this also works from cache.
  if (document.getElementById('presetButtons')) renderPresets();
})();

// Composition-strength UI/strict prompting loads after the base precision overrides above.
(() => {
  if (document.querySelector('script[data-composition-strength]')) return;
  const script = document.createElement('script');
  script.src = 'composition-strength.js';
  script.defer = true;
  script.dataset.compositionStrength = 'true';
  document.head.appendChild(script);
})();
