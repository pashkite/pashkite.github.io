(() => {
  const style = document.createElement('style');
  style.textContent = `
    #selectedArea{display:grid!important;gap:10px!important;min-height:34px}
    .selectedGroup{display:grid;gap:7px;padding:9px 10px;border:1px solid #ffffff12;border-radius:12px;background:#0b0d11}
    .selectedGroup.negativeGroup{border-color:#ff5c7240;background:#ff334408}
    .selectedGroupHeader{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:10px;color:#8e94a3}
    .selectedGroupTitle{display:flex;align-items:center;gap:6px;font-weight:700}
    .selectedGroupDot{width:7px;height:7px;border-radius:50%;background:#ff7a1a;box-shadow:0 0 0 3px #ff7a1a18}
    .negativeGroup .selectedGroupDot{background:#ff5c72;box-shadow:0 0 0 3px #ff5c7218}
    .selectedGroupCount{font-size:9px;color:#747b8b}
    .selectedChipList{display:flex;gap:6px;flex-wrap:wrap}
    .selectedChip.negativeChip{border-color:#ff5c7270;background:#ff5c7212;color:#ffc1ca}
    .selectedChip.negativeChip:hover{border-color:#ff8294;background:#ff5c7220;color:#fff}
    .negativeMark{font-size:8px;font-weight:800;letter-spacing:.04em;color:#ff8d9d;margin-right:3px}
  `;
  document.head.appendChild(style);

  if (typeof renderSelected !== 'function') return;

  renderSelected = function(){
    const items=[...selected]
      .map(id=>tags.find(t=>t.id===id))
      .filter(Boolean)
      .map(t=>({
        key:t.id,
        text:t.labels[lang],
        type:'tag',
        negative:Boolean(t.negative||t.category==='negative')
      }));

    custom.forEach((x,i)=>items.push({
      key:i,
      text:`${CAT_KO[x.category]||x.category}: ${x.text}`,
      type:'custom',
      negative:x.category==='negative'
    }));

    if(!items.length){
      $('selectedArea').innerHTML='<span class="empty">선택된 태그가 없습니다.</span>';
      return;
    }

    const positive=items.filter(x=>!x.negative);
    const negative=items.filter(x=>x.negative);

    const group=(title,list,isNegative)=>{
      if(!list.length)return'';
      return `<div class="selectedGroup ${isNegative?'negativeGroup':''}">
        <div class="selectedGroupHeader">
          <span class="selectedGroupTitle"><span class="selectedGroupDot"></span>${title}</span>
          <span class="selectedGroupCount">${list.length}개</span>
        </div>
        <div class="selectedChipList">
          ${list.map(x=>`<button class="selectedChip ${isNegative?'negativeChip':''}" data-type="${x.type}" data-key="${x.key}">${isNegative?'<span class="negativeMark">제외</span> ':''}${x.text} ×</button>`).join('')}
        </div>
      </div>`;
    };

    $('selectedArea').innerHTML=
      group('일반 태그',positive,false)+
      group('네거티브 태그',negative,true);

    $('selectedArea').querySelectorAll('button').forEach(b=>b.onclick=()=>{
      if(b.dataset.type==='tag')selected.delete(b.dataset.key);
      else custom.splice(+b.dataset.key,1);
      renderTags();
      renderSelected();
      compile();
    });
  };

  if (Array.isArray(tags) && tags.length) renderSelected();
})();
