/* ============================= DEFAULT STATE ============================= */
/* All text values below are generic placeholders — replace them with your own
   organisation's details in the Letterhead / Letter content tabs. */
const DEFAULT_STATE = {
  images:{
    leftLogo:   { data:null, size:66,  x:0, y:0 },
    rightLogo:  { data:null, size:66,  x:0, y:0 },
    headerImage:{ data:null, size:100, x:0, y:0 },
    subHeaderImage:{ data:null, size:100, x:0, y:0 },
    footerImage:{ data:null, size:100, x:0, y:0 },
    signature:  { data:null, size:120, x:0, y:0 }
  },
  letterhead:{
    ministry:{ si:"අමාත්‍යාංශයේ නම", ta:"அமைச்சின் பெயர்", en:"Name of Ministry" },
    institute:{ si:"ආයතනයේ නම", ta:"நிறுவனத்தின் பெயர்", en:"Name of Institute" },
    addressLocal:"ලිපිනය මෙතන ලියන්න - முகவரி இங்கே",
    addressEn:"Address line, City, Country.",
    textStyles:{
      ministrySi:{ size:11.5, x:0, y:0 },
      ministryTa:{ size:11.5, x:0, y:0 },
      ministryEn:{ size:12.5, x:0, y:0 },
      instituteSi:{ size:13.5, x:0, y:0 },
      instituteTa:{ size:13.5, x:0, y:0 },
      instituteEn:{ size:16, x:0, y:0 },
      addressLocal:{ size:10.5, x:0, y:0 },
      addressEn:{ size:10, x:0, y:0 }
    },
    refLabels:{
      myNo:{ si:"මගේ අංක", ta:"எனது இல", en:"My No" },
      yourNo:{ si:"ඔබේ අංක", ta:"உமது இல", en:"Your No" },
      date:{ si:"දිනය", ta:"திகதி", en:"Date" }
    },
    footerLabels:{
      dg:{ si:"අධ්‍යක්ෂ ජනරාල්", ta:"இயக்குநர் நாயகம்", en:"Director General" },
      office:{ si:"කාර්යාලය", ta:"அலுவலகம்", en:"Office" },
      fax:{ si:"ෆැක්ස්", ta:"தொலைநகல்", en:"Fax" }
    },
    footerDG:"0XX-XXXXXXX",
    footerOffice:"0XX-XXXXXXX",
    footerFax:"0XX-XXXXXXX",
    footerEmail:"info@example.gov.lk",
    footerWeb:"www.example.gov.lk"
  },
  content:{
    subjectTitle:"Name of the Programme",
    subjectDateRange:"2026.01.01 – 2026.01.31",
    salutation:"මහත්මයාණෙනි / මහත්මියනි,",
    refLetterDate:"2026.01.01",
    bodyIntro:"උක්ත පුහුණු වැඩසටහනට අදාළව ඔබ ආයතනය විසින් යොමු කර ඇති {refDate} දිනැති ලිපි හා බැඳේ.",
    bodyList:"ලිපියෙහි නම් කර එවන ලද නිලධාරීන් ({count}) අදාළ පුහුණු වැඩසටහන සඳහා ලියාපදිංචි කරගන්නා ලද අතර, අදාල දිනයේ දී එම නිලධාරීන් ({count}) ඒ සඳහා සහභාගී කරවන ලෙස කාරුණිකව දන්වා සිටිමි.",
    detailsIntro:"පුහුණු වැඩසටහනේ තොරතුරු පහත පරිදි වේ.",
    closing:"මෙයට විශ්වාසී,",
    programDate:"2026 ජනවාරි 01",
    programTime:"පෙ.ව. 8.45 සිට ප.ව. 4.30 දක්වා",
    programVenue:"ආයතනයේ නම, ලිපිනය",
    feePerPerson:0,
    signerName:"Full Name,",
    signerTitle:"Designation",
    myNoPrefix:"REF/26/",
    myNoSeq:1,
    textStyles:{
      subjectTitle:{ size:13.5, x:0, y:0 },
      subjectDateRange:{ size:13, x:0, y:0 },
      salutation:{ size:13, x:0, y:0 },
      bodyIntro:{ size:13, x:0, y:0 },
      bodyList:{ size:13, x:0, y:0 },
      detailsIntro:{ size:13, x:0, y:0 },
      closing:{ size:13, x:0, y:0 },
      signerName:{ size:13, x:0, y:0 },
      signerTitle:{ size:13, x:0, y:0 }
    }
  },
  recipients:[
    {
      id:"r1", institutionName:"Sample Institution",
      addressBlock:"Designation of recipient,\nName of Institution,\nDivision / Address",
      yourNo:"YOUR-REF-001", myNo:"REF/26/1", date:"2026.01.",
      officers:["A.B.C. Perera","S.M.N. Fernando","K.L.R. Silva"],
      programDateOverride:"", programTimeOverride:"", programVenueOverride:"", feePerPersonOverride:""
    }
  ],
  settings:{ autoBackupInterval:"off", backupHistory:[], showCredit:true, typography:{ bodyFontSize:13, lineHeight:1.85 } }
};

const STORE_KEY = "rlLetterGenState_v3";
let state = loadState();
let genResults = []; // {recipientId, name, blob}
let backupTimer = null;

function deepMerge(base, extra){
  const out = JSON.parse(JSON.stringify(base));
  if(extra && typeof extra==='object'){
    Object.keys(extra).forEach(k=>{
      if(extra[k] && typeof extra[k]==='object' && !Array.isArray(extra[k]) && out[k] && typeof out[k]==='object' && !Array.isArray(out[k])){
        out[k] = deepMerge(out[k], extra[k]);
      } else {
        out[k] = extra[k];
      }
    });
  }
  return out;
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    return deepMerge(DEFAULT_STATE, JSON.parse(raw));
  }catch(e){ return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}
function saveState(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){ console.warn("Save failed", e); }
}
function uid(){ return 'r'+Math.random().toString(36).slice(2,10); }

/* ============================= NAV / TABS ============================= */
const TABS = [
  {id:"letterhead", label:"Letterhead"},
  {id:"content", label:"Letter content"},
  {id:"recipients", label:"Recipients"},
  {id:"generate", label:"Generate & export"},
  {id:"settings", label:"Settings & backup"}
];
function buildNav(){
  const nav = document.getElementById('navList');
  nav.innerHTML = TABS.map(t=>`<div class="nav-item" data-tab="${t.id}"><span class="dot"></span>${t.label}</div>`).join('')
    + `<div class="nav-foot">Everything is saved in this browser as you type. Export a backup from <b>Settings</b> before switching computers.</div>`;
  nav.querySelectorAll('.nav-item').forEach(el=>{
    el.addEventListener('click', ()=>showTab(el.dataset.tab));
  });
}
function showTab(id){
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active', el.dataset.tab===id));
  document.querySelectorAll('.panel').forEach(el=>el.classList.toggle('active', el.dataset.panel===id));
  if(id==='generate'){ renderPreviewSelect(); renderPreview(); }
  refreshStickyPreviews();
}

/* ============================= STICKY PREVIEW PANELS ============================= */
/* The preview stays permanently position:fixed on screen while its tab is active,
   so scrolling the left-hand fields never moves it — only window resize repositions it. */
const stickyPins = [];
function registerStickyPreview(anchorId, pinId){
  const anchor = document.getElementById(anchorId);
  const pin = document.getElementById(pinId);
  if(!anchor || !pin) return;
  anchor.style.position = 'relative';
  stickyPins.push({anchor, pin});
}
function updateStickyPreview(entry){
  const {anchor, pin} = entry;
  if(anchor.offsetParent===null) return; // hidden (inactive tab) — skip
  if(window.innerWidth <= 1000){
    pin.style.position=''; pin.style.top=''; pin.style.left=''; pin.style.width='';
    return;
  }
  const rect = anchor.getBoundingClientRect();
  pin.style.position='fixed';
  pin.style.top='90px';
  pin.style.left=rect.left+'px';
  pin.style.width=anchor.offsetWidth+'px';
}
function refreshStickyPreviews(){
  stickyPins.forEach(updateStickyPreview);
}
function initStickyPreviews(){
  registerStickyPreview('lhPreviewAnchor','lhPreviewPin');
  registerStickyPreview('ctPreviewAnchor','ctPreviewPin');
  window.addEventListener('resize', refreshStickyPreviews);
  refreshStickyPreviews();
}

/* ============================= GENERIC IMAGE CONTROL (upload + size + X/Y) ============================= */
/* Renders an upload dropzone plus size/X/Y sliders into a container for any image in state.images */
function renderImageControl(containerId, key, opts){
  opts = opts || {};
  const img = state.images[key];
  const container = document.getElementById(containerId);
  if(!container) return;
  const unit = opts.unit || 'px';
  container.innerHTML = `
    <div class="logo-drop" data-imgkey="${key}">
      <input type="file" accept="image/*" class="img-input" data-imgkey="${key}">
      ${img.data ? `<img src="${img.data}"><div class="rm" data-imgkey="${key}">✕</div>` : `<span>${opts.placeholder || 'Click to upload'}</span>`}
    </div>
    <div class="img-ctrl-adjust">
      <div class="field">
        <label>${opts.sizeLabel || 'Size'} <span class="size-val" data-sizeval="${key}">${img.size}${unit}</span></label>
        <input type="range" class="img-size" data-imgkey="${key}" min="${opts.min}" max="${opts.max}" step="${opts.step||1}" value="${img.size}">
      </div>
      <div class="grid2">
        <div class="field"><label>Horizontal position (X)</label><input type="range" class="img-x" data-imgkey="${key}" min="-150" max="150" value="${img.x}"></div>
        <div class="field"><label>Vertical position (Y)</label><input type="range" class="img-y" data-imgkey="${key}" min="-150" max="150" value="${img.y}"></div>
      </div>
    </div>
  `;
  container.querySelector('.logo-drop').addEventListener('click', e=>{
    if(e.target.classList.contains('rm')) return;
    container.querySelector('.img-input').click();
  });
  container.querySelector('.img-input').addEventListener('change', e=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev=>{ state.images[key].data = ev.target.result; saveState(); renderImageControl(containerId, key, opts); renderPreview(); };
    reader.readAsDataURL(file);
  });
  const rm = container.querySelector('.rm');
  if(rm) rm.addEventListener('click', e=>{
    e.stopPropagation();
    state.images[key].data = null; saveState();
    renderImageControl(containerId, key, opts); renderPreview();
  });
  container.querySelector('.img-size').addEventListener('input', e=>{
    state.images[key].size = Number(e.target.value);
    container.querySelector('.size-val').textContent = e.target.value+unit;
    saveState(); renderPreview();
  });
  container.querySelector('.img-x').addEventListener('input', e=>{
    state.images[key].x = Number(e.target.value); saveState(); renderPreview();
  });
  container.querySelector('.img-y').addEventListener('input', e=>{
    state.images[key].y = Number(e.target.value); saveState(); renderPreview();
  });
}
function initImageControls(){
  renderImageControl('ctrl-leftLogo', 'leftLogo', {placeholder:'Click to upload logo', sizeLabel:'Size', min:30, max:160});
  renderImageControl('ctrl-rightLogo', 'rightLogo', {placeholder:'Click to upload logo', sizeLabel:'Size', min:30, max:160});
  renderImageControl('ctrl-headerImage', 'headerImage', {placeholder:'Click to upload (replaces logos + org name)', sizeLabel:'Width', unit:'%', min:30, max:100});
  renderImageControl('ctrl-subHeaderImage', 'subHeaderImage', {placeholder:'Click to upload (shown below header)', sizeLabel:'Width', unit:'%', min:20, max:100});
  renderImageControl('ctrl-footerImage', 'footerImage', {placeholder:'Click to upload (replaces footer block)', sizeLabel:'Width', unit:'%', min:20, max:100});
  renderImageControl('ctrl-signature', 'signature', {placeholder:'Click to upload signature', sizeLabel:'Size', min:50, max:260});
}

/* Per-field text style controls (size / X / Y), reused for Letterhead org-name lines and Letter content fields */
const TEXT_STYLE_KEYS = ['ministrySi','ministryTa','ministryEn','instituteSi','instituteTa','instituteEn','addressLocal','addressEn'];
const CONTENT_STYLE_KEYS = ['subjectTitle','subjectDateRange','salutation','bodyIntro','bodyList','detailsIntro','closing','signerName','signerTitle'];
function renderTextStyleControl(containerId, scope, key){
  const container = document.getElementById(containerId);
  if(!container) return;
  const st = state[scope].textStyles[key];
  container.innerHTML = `
    <div class="ts-row">
      <label>Size <input type="number" class="ts-size" value="${st.size}" step="0.5" min="6" max="40"></label>
      <label>X <input type="number" class="ts-x" value="${st.x}" step="1"></label>
      <label>Y <input type="number" class="ts-y" value="${st.y}" step="1"></label>
    </div>`;
  container.querySelector('.ts-size').addEventListener('input', e=>{ st.size=Number(e.target.value); saveState(); renderPreview(); });
  container.querySelector('.ts-x').addEventListener('input', e=>{ st.x=Number(e.target.value); saveState(); renderPreview(); });
  container.querySelector('.ts-y').addEventListener('input', e=>{ st.y=Number(e.target.value); saveState(); renderPreview(); });
}
function initTextStyleControls(){
  TEXT_STYLE_KEYS.forEach(key=> renderTextStyleControl('ts-'+key, 'letterhead', key));
}
function initContentTextStyleControls(){
  CONTENT_STYLE_KEYS.forEach(key=> renderTextStyleControl('ts-c-'+key, 'content', key));
}

/* ============================= LETTERHEAD TEXT BINDINGS ============================= */
function triField(id, obj, key){
  document.getElementById(id).value = obj[key];
  document.getElementById(id).addEventListener('input', e=>{ obj[key]=e.target.value; saveState(); renderPreview(); });
}
function bindLetterhead(){
  const L = state.letterhead;
  triField('ministrySi', L.ministry,'si'); triField('ministryTa', L.ministry,'ta'); triField('ministryEn', L.ministry,'en');
  triField('instituteSi', L.institute,'si'); triField('instituteTa', L.institute,'ta'); triField('instituteEn', L.institute,'en');
  document.getElementById('addressLocal').value = L.addressLocal;
  document.getElementById('addressLocal').addEventListener('input', e=>{ L.addressLocal=e.target.value; saveState(); renderPreview(); });
  document.getElementById('addressEn').value = L.addressEn;
  document.getElementById('addressEn').addEventListener('input', e=>{ L.addressEn=e.target.value; saveState(); renderPreview(); });

  triField('lblMyNoSi', L.refLabels.myNo,'si'); triField('lblMyNoTa', L.refLabels.myNo,'ta'); triField('lblMyNoEn', L.refLabels.myNo,'en');
  triField('lblYourNoSi', L.refLabels.yourNo,'si'); triField('lblYourNoTa', L.refLabels.yourNo,'ta'); triField('lblYourNoEn', L.refLabels.yourNo,'en');
  triField('lblDateSi', L.refLabels.date,'si'); triField('lblDateTa', L.refLabels.date,'ta'); triField('lblDateEn', L.refLabels.date,'en');

  triField('lblDgSi', L.footerLabels.dg,'si'); triField('lblDgTa', L.footerLabels.dg,'ta'); triField('lblDgEn', L.footerLabels.dg,'en');
  triField('lblOfficeSi', L.footerLabels.office,'si'); triField('lblOfficeTa', L.footerLabels.office,'ta'); triField('lblOfficeEn', L.footerLabels.office,'en');
  triField('lblFaxSi', L.footerLabels.fax,'si'); triField('lblFaxTa', L.footerLabels.fax,'ta'); triField('lblFaxEn', L.footerLabels.fax,'en');

  ['footerDG','footerOffice','footerFax','footerEmail','footerWeb'].forEach(fld=>{
    document.getElementById(fld).value = L[fld];
    document.getElementById(fld).addEventListener('input', e=>{ L[fld]=e.target.value; saveState(); renderPreview(); });
  });

  initImageControls();
  initTextStyleControls();
}

/* ============================= CONTENT BINDINGS ============================= */
function bindContent(){
  const C = state.content;
  const map = {
    subjectTitle:'subjectTitle', subjectDateRange:'subjectDateRange', salutation:'salutation',
    refLetterDate:'refLetterDate', bodyIntro:'bodyIntro', bodyList:'bodyList', detailsIntro:'detailsIntro',
    closing:'closing', programDate:'programDate', programTime:'programTime', programVenue:'programVenue',
    feePerPerson:'feePerPerson', signerName:'signerName', signerTitle:'signerTitle',
    myNoPrefix:'myNoPrefix', myNoSeq:'myNoSeq'
  };
  Object.keys(map).forEach(id=>{
    const el = document.getElementById(id);
    el.value = C[map[id]];
    el.addEventListener('input', ()=>{
      const v = el.type==='number' ? Number(el.value||0) : el.value;
      state.content[map[id]] = v; saveState();
      if(id==='feePerPerson') renderRecipients();
      renderPreview();
    });
  });
  initContentTextStyleControls();
}

/* ============================= RECIPIENTS ============================= */
function calcFee(rec){
  if(rec.includeOfficers===false) return {per:0, count:0, total:0};
  const per = rec.feePerPersonOverride!=='' && rec.feePerPersonOverride!=null ? Number(rec.feePerPersonOverride) : Number(state.content.feePerPerson||0);
  const count = rec.officers.filter(o=>o.trim()!=='').length || 0;
  return {per, count, total: per*count};
}
function fmtMoney(n){ return Number(n||0).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function nextMyNo(){
  const prefix = state.content.myNoPrefix || '';
  let maxNum = Number(state.content.myNoSeq||0) - 1;
  state.recipients.forEach(r=>{
    if(r.myNo && r.myNo.indexOf(prefix)===0){
      const n = parseFloat(r.myNo.slice(prefix.length));
      if(!isNaN(n) && n>maxNum) maxNum = n;
    }
  });
  return prefix + (maxNum+1);
}
function addRecipient(){
  const rec = {
    id:uid(), institutionName:"", addressBlock:"", yourNo:"",
    myNo: nextMyNo(), date:new Date().toISOString().slice(0,10).replace(/-/g,'.'),
    officers:[""], refLetterDateOverride:"", programDateOverride:"", programTimeOverride:"", programVenueOverride:"", feePerPersonOverride:""
  };
  state.recipients.push(rec); saveState(); renderRecipients();
  setTimeout(()=>{ const els=document.querySelectorAll('.recipient-card'); if(els.length){ els[els.length-1].classList.add('open'); els[els.length-1].scrollIntoView({behavior:'smooth', block:'center'}); } }, 30);
}
function removeRecipient(id){
  if(!confirm('Remove this recipient?')) return;
  state.recipients = state.recipients.filter(r=>r.id!==id); saveState(); renderRecipients();
}
function duplicateRecipient(id){
  const rec = state.recipients.find(r=>r.id===id); if(!rec) return;
  const clone = JSON.parse(JSON.stringify(rec)); clone.id = uid(); clone.myNo = nextMyNo();
  state.recipients.push(clone); saveState(); renderRecipients();
}

function renderRecipients(){
  const list = document.getElementById('recipientsList');
  const empty = document.getElementById('recipientsEmpty');
  document.getElementById('recipCount').textContent = state.recipients.length;
  if(state.recipients.length===0){ list.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';

  const openIds = new Set([...list.querySelectorAll('.recipient-card.open')].map(el=>el.dataset.id));

  list.innerHTML = state.recipients.map((rec,i)=>{
    const fee = calcFee(rec);
    return `
    <div class="recipient-card ${openIds.has(rec.id)?'open':''}" data-id="${rec.id}">
      <div class="recipient-head" data-toggle="${rec.id}">
        <div class="idx">${i+1}</div>
        <div class="title">${rec.institutionName || 'Untitled institution'}</div>
        <div class="meta">${fee.count} officer(s) · Rs. ${fmtMoney(fee.total)}</div>
        <div class="chev">›</div>
      </div>
      <div class="recipient-body">
        <div class="grid2">
          <div class="field"><label>Institution name (for file naming)</label><input type="text" data-f="institutionName" value="${escAttr(rec.institutionName)}"></div>
          <div class="field"><label>Your No</label><input type="text" data-f="yourNo" value="${escAttr(rec.yourNo)}"></div>
        </div>
        <div class="field"><label>Recipient designation & address block</label><textarea data-f="addressBlock" rows="3">${escHtml(rec.addressBlock)}</textarea></div>
        <div class="grid2">
          <div class="field"><label>My No</label><input type="text" data-f="myNo" value="${escAttr(rec.myNo)}"></div>
          <div class="field"><label>Date</label><input type="text" data-f="date" value="${escAttr(rec.date)}"></div>
        </div>
        <div class="field"><label>Ref letter date <span class="hint" style="display:inline;font-size:11px;font-style:italic">(used for {refDate} — leave blank to use the global default)</span></label><input type="text" data-f="refLetterDateOverride" value="${escAttr(rec.refLetterDateOverride||'')}" placeholder="${escAttr(state.content.refLetterDate)}"></div>

        <div class="grid2" style="align-items:start">
          <div class="rec-section">
            <div class="rec-section-head">
              <label>Officers attending</label>
              <button class="btn btn-ghost btn-sm toggle-officers">${rec.includeOfficers===false?'+ Add section':'Remove section'}</button>
            </div>
            ${rec.includeOfficers===false ? `<div class="rec-section-empty">Not included — this letter will have no officer list, confirmation line or fee row.</div>` : `
            <div class="officer-list" data-officers="${rec.id}">
              ${rec.officers.map((o,oi)=>`
                <div class="officer-row">
                  <input type="text" data-officer-idx="${oi}" value="${escAttr(o)}" placeholder="Officer full name">
                  <div class="icon-btn rm-officer" data-oidx="${oi}">✕</div>
                </div>`).join('')}
            </div>
            <button class="btn btn-ghost btn-sm add-officer" style="margin-top:4px">+ Add officer</button>
            `}
          </div>

          <div class="rec-section">
            <div class="rec-section-head">
              <label>Override programme details (optional)</label>
              <button class="btn btn-ghost btn-sm toggle-overrides">${rec.showOverrides===false?'+ Add section':'Remove section'}</button>
            </div>
            ${rec.showOverrides===false ? `<div class="rec-section-empty">Using the default programme date/time/venue/fee from Letter content.</div>` : `
            <div class="field"><label>Date override</label><input type="text" data-f="programDateOverride" value="${escAttr(rec.programDateOverride)}" placeholder="${escAttr(state.content.programDate)}"></div>
            <div class="field"><label>Time override</label><input type="text" data-f="programTimeOverride" value="${escAttr(rec.programTimeOverride)}" placeholder="${escAttr(state.content.programTime)}"></div>
            <div class="field"><label>Venue override</label><input type="text" data-f="programVenueOverride" value="${escAttr(rec.programVenueOverride)}" placeholder="${escAttr(state.content.programVenue)}"></div>
            <div class="field"><label>Fee per person override (LKR)</label><input type="number" data-f="feePerPersonOverride" value="${escAttr(rec.feePerPersonOverride)}" placeholder="${state.content.feePerPerson}"></div>
            `}
          </div>
        </div>

        <div class="fee-preview">Total course fee: <b>Rs. ${fmtMoney(fee.total)}.00</b> (per person Rs. ${fmtMoney(fee.per)}.00 × ${fee.count})</div>

        <div class="row-flex" style="margin-top:14px">
          <button class="btn btn-ghost btn-sm dup-rec">Duplicate</button>
          <button class="btn btn-danger btn-sm del-rec">Remove recipient</button>
        </div>
      </div>
    </div>`;
  }).join('');

  list.querySelectorAll('.recipient-head').forEach(h=>{
    h.addEventListener('click', ()=>{ h.closest('.recipient-card').classList.toggle('open'); });
  });
  list.querySelectorAll('[data-f]').forEach(inp=>{
    inp.addEventListener('input', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      const f = e.target.dataset.f;
      rec[f] = e.target.value;
      saveState();
      if(f==='institutionName'){ card.querySelector('.title').textContent = e.target.value || 'Untitled institution'; }
    });
  });
  list.querySelectorAll('[data-officer-idx]').forEach(inp=>{
    inp.addEventListener('input', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      rec.officers[Number(e.target.dataset.officerIdx)] = e.target.value;
      saveState();
      const fee = calcFee(rec);
      card.querySelector('.meta').textContent = `${fee.count} officer(s) · Rs. ${fmtMoney(fee.total)}`;
      card.querySelector('.fee-preview').innerHTML = `Total course fee: <b>Rs. ${fmtMoney(fee.total)}.00</b> (per person Rs. ${fmtMoney(fee.per)}.00 × ${fee.count})`;
    });
  });
  list.querySelectorAll('.rm-officer').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      const idx = Number(e.target.dataset.oidx);
      if(rec.officers.length<=1){ rec.officers=[""]; } else { rec.officers.splice(idx,1); }
      saveState(); renderRecipients();
      card2open(rec.id);
    });
  });
  list.querySelectorAll('.add-officer').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      rec.officers.push(""); saveState(); renderRecipients();
      card2open(rec.id);
    });
  });
  list.querySelectorAll('.toggle-officers').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      rec.includeOfficers = rec.includeOfficers===false ? true : false;
      if(rec.includeOfficers && (!rec.officers || rec.officers.length===0)) rec.officers=[""];
      saveState(); renderRecipients(); card2open(rec.id); renderPreview();
    });
  });
  list.querySelectorAll('.toggle-overrides').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.target.closest('.recipient-card');
      const rec = state.recipients.find(r=>r.id===card.dataset.id);
      rec.showOverrides = rec.showOverrides===false ? true : false;
      saveState(); renderRecipients(); card2open(rec.id);
    });
  });
  list.querySelectorAll('.del-rec').forEach(btn=>{
    btn.addEventListener('click', e=>{ removeRecipient(e.target.closest('.recipient-card').dataset.id); });
  });
  list.querySelectorAll('.dup-rec').forEach(btn=>{
    btn.addEventListener('click', e=>{ duplicateRecipient(e.target.closest('.recipient-card').dataset.id); });
  });
}
function card2open(id){ setTimeout(()=>{ const el=document.querySelector(`.recipient-card[data-id="${id}"]`); if(el) el.classList.add('open'); },30); }

function escHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(s){ return (s===undefined||s===null? '': String(s)).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

/* Bulk import (paste) */
function bindBulkImport(){
  document.getElementById('bulkImportBtn').addEventListener('click', ()=>{
    document.getElementById('bulkImportPanel').style.display='block';
  });
  document.getElementById('bulkImportCancel').addEventListener('click', ()=>{
    document.getElementById('bulkImportPanel').style.display='none';
  });
  document.getElementById('bulkImportApply').addEventListener('click', ()=>{
    const text = document.getElementById('bulkImportText').value.trim();
    if(!text) return;
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
    lines.forEach(line=>{
      const parts = line.split('|').map(p=>p.trim());
      const [inst, addr, yourNo, officersStr] = parts;
      addRecipientFromParts(inst, addr, yourNo, officersStr);
    });
    saveState(); renderRecipients();
    document.getElementById('bulkImportText').value='';
    document.getElementById('bulkImportPanel').style.display='none';
    showTab('recipients');
  });
}
function addRecipientFromParts(inst, addr, yourNo, officersStr, refLetterDate){
  const rec = {
    id:uid(), institutionName: inst||'', addressBlock:(addr||'').split('/').map(s=>s.trim()).join('\n'),
    yourNo: yourNo||'', myNo: nextMyNo(), date:new Date().toISOString().slice(0,10).replace(/-/g,'.'),
    officers: (officersStr||'').split(/[,;]/).map(s=>s.trim()).filter(Boolean),
    refLetterDateOverride: refLetterDate||'', programDateOverride:"", programTimeOverride:"", programVenueOverride:"", feePerPersonOverride:""
  };
  if(rec.officers.length===0) rec.officers=[""];
  state.recipients.push(rec);
}

/* Bulk import (Excel / CSV) */
function bindExcelImport(){
  document.getElementById('excelImportBtn').addEventListener('click', ()=> document.getElementById('excelImportInput').click());
  document.getElementById('excelImportInput').addEventListener('change', e=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev=>{
      try{
        const wb = XLSX.read(ev.target.result, {type:'binary'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, {defval:''});
        if(!rows.length){ alert('That file has no data rows.'); return; }
        let added = 0;
        rows.forEach(row=>{
          const keys = Object.keys(row).reduce((m,k)=>{ m[k.toLowerCase().trim()] = row[k]; return m; }, {});
          const inst = keys['institution name'] || keys['institution'] || keys['name'] || '';
          const addr = keys['address'] || '';
          const yourNo = keys['your no'] || keys['yourno'] || keys['reference'] || '';
          const officers = keys['officers'] || keys['officer names'] || keys['names'] || '';
          const refLetterDate = keys['ref letter date'] || keys['ref date'] || keys['refdate'] || '';
          if(!inst && !addr && !officers) return;
          addRecipientFromParts(inst, String(addr).split('\n').join('/'), yourNo, officers, String(refLetterDate));
          added++;
        });
        saveState(); renderRecipients(); showTab('recipients');
        alert(added + ' recipient(s) imported.');
      }catch(err){ console.error(err); alert('Could not read that file. Please use the downloadable template format.'); }
      document.getElementById('excelImportInput').value='';
    };
    reader.readAsBinaryString(file);
  });
  document.getElementById('excelTemplateBtn').addEventListener('click', ()=>{
    const wsData = [
      ['Institution Name','Address','Your No','Ref Letter Date','Officers'],
      ['Sample Institution','Designation, Division\nCity','YOUR-REF-001','2026.01.15','A.B.C. Perera, S.M.N. Fernando']
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Recipients');
    XLSX.writeFile(wb, 'RL_Letter_Generator_Recipients_Template.xlsx');
  });
}

/* ============================= LETTER RENDERING ============================= */
function formatAddressBlock(text){
  // Break onto a new line after every comma, in addition to any manual line breaks the user typed.
  return (text||'').split('\n').map(line=> line.replace(/,\s*/g, ',\n')).join('\n');
}
function refCell(label, value){
  return `<div class="ref-cell">
    <div class="ref-labels"><span>${escHtml(label.si)}</span><span>${escHtml(label.ta)}</span><span class="en">${escHtml(label.en)}</span></div>
    <span class="ref-brace">}</span>
    <span class="ref-val">${escHtml(value)}</span>
  </div>`;
}
function footerCol(label, value){
  return `<div class="fcol">
    <div class="flabels"><div>${escHtml(label.si)}</div><div>${escHtml(label.ta)}</div><div class="en">${escHtml(label.en)}</div></div>
    <div class="fval">${escHtml(value)}</div>
  </div>`;
}
function imgStyle(img, extra){
  return `width:${img.size}${extra&&extra.pct?'%':'px'};transform:translate(${img.x}px,${img.y}px);${extra&&extra.css?extra.css:''}`;
}
function logoAnchorStyle(img){
  // Anchored to the centre of a fixed-size box, so changing size/X/Y never reflows sibling content.
  return `width:${img.size}px;transform:translate(-50%,-50%) translate(${img.x}px,${img.y}px);`;
}
function textStyleInline(scope, key){
  const st = state[scope] && state[scope].textStyles && state[scope].textStyles[key];
  if(!st) return '';
  return `font-size:${st.size}px;transform:translate(${st.x}px,${st.y}px);`;
}
function textStyleAttr(scope, key){
  const s = textStyleInline(scope, key);
  return s ? `style="${s}"` : '';
}
/* buildLetterHTML(rec, opts)
   opts.page2        = true  → compact header, skip address/salutation/intro, show remaining officers
   opts.officerStart = N     → first officer index to show (default 0)
   opts.officerEnd   = N     → one-past-last officer index (default all)
   opts.showPTO      = true  → append P.T.O. line, suppress details/closing/sign
*/
function buildLetterHTML(rec, opts){
  opts = opts || {};
  const isPage2  = !!opts.page2;
  const showPTO  = !!opts.showPTO;
  const showEnd  = !showPTO; // details + closing + sign only when NOT showing PTO

  const L = state.letterhead, C = state.content, IMG = state.images;
  const fee = calcFee(rec);
  const introText = C.bodyIntro.replace(/{refDate}/g, rec.refLetterDateOverride || C.refLetterDate);
  const listText  = C.bodyList.replace(/{count}/g, fee.count);
  const pDate = rec.programDateOverride || C.programDate;
  const pTime = rec.programTimeOverride || C.programTime;
  const pVenue = rec.programVenueOverride || C.programVenue;

  // Officers slice
  const allOfficers = rec.officers.filter(o=>o.trim()!=='');
  const oStart = opts.officerStart || 0;
  const oEnd   = (opts.officerEnd !== undefined) ? opts.officerEnd : allOfficers.length;
  const officers = allOfficers.slice(oStart, oEnd);

  /* ---- Header block ---- */
  let headerBlock;
  if(isPage2){
    // Compact header: just org name text, no logos
    headerBlock = `<div class="lt-header" style="justify-content:center;text-align:center;">
      <div class="lt-org">
        <div class="t2" style="font-size:12px;">${escHtml(L.institute.si)}</div>
        <div class="t2" style="font-size:12px;">${escHtml(L.institute.ta)}</div>
        <div class="t2-en" style="font-size:14px;">${escHtml(L.institute.en)}</div>
      </div>
    </div>
    <div class="lt-addr">${escHtml(L.addressLocal)}</div>
    <div class="lt-addr-en">${escHtml(L.addressEn)}</div>`;
  } else {
    headerBlock = IMG.headerImage.data
      ? `<img class="lt-header-img" src="${IMG.headerImage.data}" style="${imgStyle(IMG.headerImage,{pct:true})}">` 
      : `<div class="lt-header">
          <div class="logo-box">${IMG.leftLogo.data?`<img src="${IMG.leftLogo.data}" style="${logoAnchorStyle(IMG.leftLogo)}">`:''}</div>
          <div class="lt-org">
            <div class="t1" ${textStyleAttr('letterhead','ministrySi')}>${escHtml(L.ministry.si)}</div>
            <div class="t1" ${textStyleAttr('letterhead','ministryTa')}>${escHtml(L.ministry.ta)}</div>
            <div class="t1-en" ${textStyleAttr('letterhead','ministryEn')}>${escHtml(L.ministry.en)}</div>
            <div class="t2" ${textStyleAttr('letterhead','instituteSi')}>${escHtml(L.institute.si)}</div>
            <div class="t2" ${textStyleAttr('letterhead','instituteTa')}>${escHtml(L.institute.ta)}</div>
            <div class="t2-en" ${textStyleAttr('letterhead','instituteEn')}>${escHtml(L.institute.en)}</div>
          </div>
          <div class="logo-box">${IMG.rightLogo.data?`<img src="${IMG.rightLogo.data}" style="${logoAnchorStyle(IMG.rightLogo)}">`:''}</div>
        </div>
        <div class="lt-addr" ${textStyleAttr('letterhead','addressLocal')}>${escHtml(L.addressLocal)}</div>
        <div class="lt-addr-en" ${textStyleAttr('letterhead','addressEn')}>${escHtml(L.addressEn)}</div>`;
  }

  /* ---- Subheader (page 1 only) ---- */
  const subHeaderBlock = (!isPage2 && IMG.subHeaderImage.data)
    ? `<img class="lt-subheader-img" src="${IMG.subHeaderImage.data}" style="${imgStyle(IMG.subHeaderImage,{pct:true})}">` : '';

  /* ---- Footer block (same on both pages) ---- */
  const footerBlock = IMG.footerImage.data
    ? `<hr class="lt-footer-rule"><img class="lt-footer-img" src="${IMG.footerImage.data}" style="${imgStyle(IMG.footerImage,{pct:true})}">`
    : `<hr class="lt-footer-rule">
      <div class="lt-footer-cols">
        ${footerCol(L.footerLabels.dg, L.footerDG)}
        ${footerCol(L.footerLabels.office, L.footerOffice)}
        ${footerCol(L.footerLabels.fax, L.footerFax)}
      </div>
      <div class="lt-footer-bottom"><span>Website : ${escHtml(L.footerWeb)}</span><span>E-mail : ${escHtml(L.footerEmail)}</span></div>`;

  /* ---- Signature ---- */
  const signatureImg = IMG.signature.data
    ? `<img class="lt-signature-img" src="${IMG.signature.data}" style="${imgStyle(IMG.signature)}">` : '';

  /* ---- Details + Closing + Sign block (shared) ---- */
  const detailsBlock = `
      <p ${textStyleAttr('content','detailsIntro')}>${escHtml(C.detailsIntro)}</p>
      <div class="lt-details">
        <table>
          <tr><td class="k">පැවැත්වෙන දිනය</td><td>- ${escHtml(pDate)}</td></tr>
          <tr><td class="k">වේලාව</td><td>- ${escHtml(pTime)}</td></tr>
          <tr><td class="k">ස්ථානය</td><td>- ${escHtml(pVenue)}</td></tr>
          ${rec.includeOfficers!==false ? `<tr><td class="k">පාඨමාලා ගාස්තුව</td><td>- රු.${fmtMoney(fee.total)} (එක් අයෙකු සඳහා රු.${fmtMoney(fee.per)})</td></tr>` : ''}
        </table>
      </div>
      <p ${textStyleAttr('content','closing')}>${escHtml(C.closing)}</p>
      <div class="lt-sign">
        ${signatureImg}
        <div ${textStyleAttr('content','signerName')}>${escHtml(C.signerName)}</div>
        <div ${textStyleAttr('content','signerTitle')}>${escHtml(C.signerTitle)}</div>
      </div>`;

  /* ---- Ref block (page 1) or Continued marker (page 2) ---- */
  const refOrCont = isPage2
    ? `<div style="border-top:1px solid #aaa;margin:6px 0 10px;padding-top:5px;font-size:10px;color:#555;text-align:right;font-family:var(--font-body);font-style:italic;">...ඉදිරිය (Continued)</div>`
    : `<div class="lt-ref">
        ${refCell(L.refLabels.myNo, rec.myNo)}
        ${refCell(L.refLabels.yourNo, rec.yourNo)}
        ${refCell(L.refLabels.date, rec.date)}
      </div>`;

  /* ---- Body content ---- */
  let bodyHTML;
  if(isPage2){
    // Page 2: remaining officers + details + closing + sign
    bodyHTML = `
      ${rec.includeOfficers!==false && officers.length>0 ? `
      <div class="lt-names">
        ${officers.map((o,i)=>`<div>${String(oStart+i+1).padStart(2,'0')}. ${escHtml(o)}</div>`).join('')}
      </div>` : ''}
      ${detailsBlock}`;
  } else {
    // Page 1 (or single page)
    bodyHTML = `
      <div class="lt-addr-block" style="white-space:pre-line">${escHtml(formatAddressBlock(rec.addressBlock))}</div>
      <div style="margin-bottom:14px;${textStyleInline('content','salutation')}">${escHtml(C.salutation)}</div>
      <div class="en-title" ${textStyleAttr('content','subjectTitle')}>${escHtml(C.subjectTitle)}</div>
      <div class="range" ${textStyleAttr('content','subjectDateRange')}>${escHtml(C.subjectDateRange)}</div>
      <p ${textStyleAttr('content','bodyIntro')}>${escHtml(introText)}</p>
      ${rec.includeOfficers!==false ? `
      <p ${textStyleAttr('content','bodyList')}>${escHtml(listText)}</p>
      <div class="lt-names">
        ${officers.map((o,i)=>`<div>${String(oStart+i+1).padStart(2,'0')}. ${escHtml(o)}</div>`).join('')}
      </div>` : ''}
      ${showPTO ? `<div style="text-align:right;font-size:11px;font-weight:800;color:#333;margin-top:10px;font-family:var(--font-body);letter-spacing:1px;">P.T.O.</div>` : ''}
      ${showEnd ? detailsBlock : ''}`;
  }

  if(isPage2){
    /* Page 2: NO header — just body content + footer */
    return `
  <div class="lt-top" style="padding-top:6mm;">
    <div class="lt-body">${bodyHTML}
    </div>
  </div>
  <div class="lt-bottom">
    ${footerBlock}
    ${state.settings.showCredit ? '<div class="lt-credit">System by V.P.R. Lakshan Vidanapathirana</div>' : ''}
  </div>
  `;
  }

  /* Page 1 or single-page */
  return `
  <div class="lt-top">
    ${headerBlock}
    <hr class="lt-rule">
    ${subHeaderBlock}
    <div class="lt-ref">
      ${refCell(L.refLabels.myNo, rec.myNo)}
      ${refCell(L.refLabels.yourNo, rec.yourNo)}
      ${refCell(L.refLabels.date, rec.date)}
    </div>
    <div class="lt-body">${bodyHTML}
    </div>
  </div>
  <div class="lt-bottom">
    ${footerBlock}
    ${state.settings.showCredit ? '<div class="lt-credit">System by V.P.R. Lakshan Vidanapathirana</div>' : ''}
  </div>
  `;
}

function renderPreviewSelect(){
  const sel = document.getElementById('previewSelect');
  sel.innerHTML = state.recipients.map(r=>`<option value="${r.id}">${escHtml(r.institutionName||'Untitled')}</option>`).join('') || '<option disabled>No recipients yet</option>';
}
function applyTypography(paperEl){
  const t = state.settings.typography || {bodyFontSize:13, lineHeight:1.85};
  paperEl.style.setProperty('--lt-fs', t.bodyFontSize+'px');
  paperEl.style.setProperty('--lt-lh', t.lineHeight);
}
function renderPreview(){
  const rec = getPreviewRecipient();
  const html = rec ? buildLetterHTML(rec) : '<p style="text-align:center;color:#999;margin-top:100px">Add a recipient to preview a letter.</p>';
  ['previewPaper','letterheadPreviewPaper','contentPreviewPaper'].forEach(id=>{
    const paper = document.getElementById(id);
    if(!paper) return;
    applyTypography(paper);
    paper.innerHTML = html;
  });
  refreshStickyPreviews();
}
function getPreviewRecipient(){
  const sel = document.getElementById('previewSelect');
  if(sel && sel.value){
    const found = state.recipients.find(r=>r.id===sel.value);
    if(found) return found;
  }
  return state.recipients[0];
}

/* ============================= PDF GENERATION ============================= */

/* Renders one paper div and returns its canvas */
async function _renderPaperToCanvas(html, typography){
  const host = document.getElementById('offscreenHost');
  const paper = document.createElement('div');
  paper.className = 'paper for-pdf';
  paper.style.boxShadow = 'none';
  if(typography) applyTypography(paper);
  paper.innerHTML = html;
  host.appendChild(paper);
  await new Promise(r=>setTimeout(r, 70));
  const canvas = await html2canvas(paper, {scale:2, useCORS:true, backgroundColor:'#ffffff'});
  host.removeChild(paper);
  return canvas;
}

/* Returns an array of canvases (1 for single-page, 2 for overflow) */
async function renderRecipientToCanvases(rec){
  const host = document.getElementById('offscreenHost');
  const MM   = 3.7795; // px per mm at 96 dpi
  const AVAIL= Math.round((297-12)*MM); // paper height minus top padding ≈ 1077 px
  const BPAD = Math.round(40*MM);       // lt-top padding-bottom ≈ 151 px

  /* --- Step 1: measure full letter in unconstrained div --- */
  host.innerHTML = '';
  const mp = document.createElement('div');
  mp.className = 'paper for-pdf';
  mp.style.cssText = 'box-shadow:none;height:auto;overflow:visible;';
  applyTypography(mp);
  mp.innerHTML = buildLetterHTML(rec);
  host.appendChild(mp);
  await new Promise(r=>setTimeout(r, 80));

  const ltTop  = mp.querySelector('.lt-top');
  const overflow = ltTop && ltTop.scrollHeight > AVAIL;

  if(!overflow){
    /* single page — use existing simple path */
    host.innerHTML = '';
    return [await _renderPaperToCanvas(buildLetterHTML(rec), true)];
  }

  /* --- Step 2: find officer split index --- */
  const ltBody  = mp.querySelector('.lt-body');
  const ltNames = mp.querySelector('.lt-names');
  let splitIdx  = -1;

  if(ltBody && ltNames){
    // AVAIL_FULL = full paper height in px; bodyOffsetTop is measured from paper border
    // (includes the 12mm top padding), so we use the full 297mm, not (297-12)mm
    const AVAIL_FULL     = Math.round(297*MM);          // ≈ 1122 px
    const bodyOffsetTop  = ltBody.offsetTop;             // from paper border (includes top-pad)
    const availForBody   = AVAIL_FULL - bodyOffsetTop - BPAD - 28; // 28px PTO buffer
    const bodyChildren   = Array.from(ltBody.children);
    const namesChildIdx  = bodyChildren.indexOf(ltNames);
    let cumH = 0;
    for(let i=0;i<namesChildIdx;i++){
      const el = bodyChildren[i];
      const cs = getComputedStyle(el);
      cumH += el.offsetHeight + parseFloat(cs.marginTop||0) + parseFloat(cs.marginBottom||0);
    }
    const spaceForNames = availForBody - cumH;
    const officerDivs   = Array.from(ltNames.children);
    let nameCumH = 0;
    for(let i=0;i<officerDivs.length;i++){
      const rowH = officerDivs[i].offsetHeight + 3;
      if(nameCumH + rowH > spaceForNames){ splitIdx = i; break; }
      nameCumH += rowH;
    }
  }
  host.innerHTML = '';

  const allOfficers = rec.officers.filter(o=>o.trim()!=='');
  if(splitIdx<=0) splitIdx=1;
  if(splitIdx>=allOfficers.length){
    /* officers all fit — something else causes overflow; render single page */
    return [await _renderPaperToCanvas(buildLetterHTML(rec), true)];
  }

  /* --- Step 3: render page 1 + page 2 --- */
  const c1 = await _renderPaperToCanvas(
    buildLetterHTML(rec, {officerEnd:splitIdx, showPTO:true}), true);
  const c2 = await _renderPaperToCanvas(
    buildLetterHTML(rec, {page2:true, officerStart:splitIdx}), true);
  return [c1, c2];
}

/* Backwards-compat wrapper (used nowhere now but kept safe) */
async function renderRecipientToCanvas(rec){
  const canvases = await renderRecipientToCanvases(rec);
  return canvases[0];
}

/* Build a multi-page PDF blob from an array of canvases */
async function canvasesToPdfBlob(canvases){
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','mm','a4');
  for(let i=0;i<canvases.length;i++){
    if(i>0) pdf.addPage();
    pdf.addImage(canvases[i].toDataURL('image/jpeg',0.95),'JPEG',0,0,210,297);
  }
  return pdf.output('blob');
}
async function canvasToPdfBlob(canvas){ return canvasesToPdfBlob([canvas]); }
function safeFileName(s){ return (s||'letter').replace(/[^a-zA-Z0-9_\-\u0D80-\u0DFF\u0B80-\u0BFF ]/g,'').trim().replace(/\s+/g,'_').slice(0,60) || 'letter'; }

async function generateAll(){
  if(state.recipients.length===0){ alert('Add at least one recipient first.'); return; }
  const btn = document.getElementById('generateAllBtn'); btn.disabled = true;
  document.getElementById('downloadZipBtn').disabled = true;
  document.getElementById('downloadCombinedBtn').disabled = true;
  genResults = [];
  const genList = document.getElementById('genList');
  genList.innerHTML = state.recipients.map(r=>`<div class="gen-row" data-id="${r.id}"><div class="name">${escHtml(r.institutionName||'Untitled')}</div><div class="status">Waiting…</div></div>`).join('');
  const bar = document.getElementById('progressBar');

  for(let i=0;i<state.recipients.length;i++){
    const rec = state.recipients[i];
    const row = genList.querySelector(`.gen-row[data-id="${rec.id}"]`);
    row.querySelector('.status').textContent = 'Rendering…';
    try{
      const canvases = await renderRecipientToCanvases(rec);
      const blob = await canvasesToPdfBlob(canvases);
      const pages = canvases.length;
      genResults.push({id:rec.id, name: safeFileName(rec.institutionName)+'.pdf', blob});
      row.classList.add('done');
      row.querySelector('.status').textContent = pages>1 ? `Done ✓ (${pages} pages)` : 'Done ✓';
    }catch(e){
      row.querySelector('.status').textContent = 'Failed';
      console.error(e);
    }
    bar.style.width = Math.round(((i+1)/state.recipients.length)*100)+'%';
  }
  btn.disabled = false;
  if(genResults.length){
    document.getElementById('downloadZipBtn').disabled = false;
    document.getElementById('downloadCombinedBtn').disabled = false;
  }
}

async function downloadZip(){
  if(!genResults.length) return;
  const zip = new JSZip();
  genResults.forEach(r=> zip.file(r.name, r.blob));
  const blob = await zip.generateAsync({type:'blob'});
  triggerDownload(blob, 'RL_Letters_'+Date.now()+'.zip');
}
async function downloadCombined(){
  if(!genResults.length) return;
  const { jsPDF } = window.jspdf;
  const combined = new jsPDF('p','mm','a4');
  let firstPage = true;
  for(let i=0;i<state.recipients.length;i++){
    const rec = state.recipients[i];
    const canvases = await renderRecipientToCanvases(rec);
    for(let j=0;j<canvases.length;j++){
      if(!firstPage) combined.addPage();
      combined.addImage(canvases[j].toDataURL('image/jpeg',0.95),'JPEG',0,0,210,297);
      firstPage = false;
    }
  }
  triggerDownload(combined.output('blob'), 'RL_Letters_Combined_'+Date.now()+'.pdf');
}
function triggerDownload(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
}

/* ============================= SETTINGS / BACKUP ============================= */
function bindSettings(){
  const t = state.settings.typography || {bodyFontSize:13, lineHeight:1.85};
  const fsEl = document.getElementById('typoFontSize');
  const fsVal = document.getElementById('typoFontSizeVal');
  const lhEl = document.getElementById('typoLineHeight');
  const lhVal = document.getElementById('typoLineHeightVal');
  fsEl.value = t.bodyFontSize; fsVal.textContent = t.bodyFontSize+'px';
  lhEl.value = t.lineHeight; lhVal.textContent = t.lineHeight;
  fsEl.addEventListener('input', ()=>{
    state.settings.typography.bodyFontSize = Number(fsEl.value);
    fsVal.textContent = fsEl.value+'px';
    saveState(); renderPreview();
  });
  lhEl.addEventListener('input', ()=>{
    state.settings.typography.lineHeight = Number(lhEl.value);
    lhVal.textContent = lhEl.value;
    saveState(); renderPreview();
  });

  const creditToggle = document.getElementById('showCreditToggle');
  creditToggle.checked = state.settings.showCredit !== false;
  creditToggle.addEventListener('change', ()=>{
    state.settings.showCredit = creditToggle.checked; saveState(); renderPreview();
  });

  const sel = document.getElementById('autoBackupInterval');
  sel.value = state.settings.autoBackupInterval;
  sel.addEventListener('change', ()=>{
    state.settings.autoBackupInterval = sel.value; saveState(); setupAutoBackup();
  });
  document.getElementById('exportBackupBtn').addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
    triggerDownload(blob, 'rl-letter-generator-backup_'+Date.now()+'.json');
  });
  document.getElementById('importBackupBtn').addEventListener('click', ()=> document.getElementById('importBackupInput').click());
  document.getElementById('importBackupInput').addEventListener('change', e=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev=>{
      try{
        const data = JSON.parse(ev.target.result);
        state = deepMerge(DEFAULT_STATE, data);
        saveState(); renderAll();
        alert('Backup imported successfully.');
      }catch(err){ alert('Could not read that file — please choose a valid backup .json'); }
    };
    reader.readAsText(file);
  });
  document.getElementById('resetBtn').addEventListener('click', ()=>{
    if(!confirm('This clears all letterhead, content and recipient data from this browser. Continue?')) return;
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState(); renderAll();
  });
  renderBackupHistory();
}
function setupAutoBackup(){
  if(backupTimer){ clearInterval(backupTimer); backupTimer=null; }
  const iv = state.settings.autoBackupInterval;
  const ms = {'30s':30000,'1m':60000,'5m':300000,'30m':1800000,'1h':3600000,'daily':86400000}[iv];
  if(!ms) return;
  backupTimer = setInterval(()=>{
    const snap = { timestamp: Date.now(), data: JSON.parse(JSON.stringify({images:state.images, letterhead:state.letterhead, content:state.content, recipients:state.recipients})) };
    state.settings.backupHistory.unshift(snap);
    state.settings.backupHistory = state.settings.backupHistory.slice(0,20);
    saveState(); renderBackupHistory();
  }, ms);
}
function renderBackupHistory(){
  const wrap = document.getElementById('backupHistory');
  const hist = state.settings.backupHistory||[];
  if(hist.length===0){ wrap.innerHTML = '<p class="hint">No snapshots yet.</p>'; return; }
  wrap.innerHTML = hist.map((h,i)=>`
    <div class="backup-item">
      <div class="t"><b>${new Date(h.timestamp).toLocaleString()}</b>${h.data.recipients.length} recipient(s)</div>
      <button class="btn btn-ghost btn-sm restore-snap" data-i="${i}">Restore</button>
    </div>`).join('');
  wrap.querySelectorAll('.restore-snap').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const i = Number(e.target.dataset.i);
      if(!confirm('Restore this snapshot? Current unsaved changes to images/letterhead/content/recipients will be replaced.')) return;
      const snap = state.settings.backupHistory[i];
      if(snap.data.images) state.images = snap.data.images;
      state.letterhead = snap.data.letterhead; state.content = snap.data.content; state.recipients = snap.data.recipients;
      saveState(); renderAll();
    });
  });
}

/* ============================= INIT ============================= */
function renderAll(){
  bindLetterhead(); bindContent(); renderRecipients(); renderPreviewSelect(); renderPreview(); renderBackupHistory();
}
function init(){
  buildNav();
  showTab('letterhead');
  bindLetterhead();
  bindContent();
  renderRecipients();
  bindBulkImport();
  bindExcelImport();
  renderPreviewSelect();
  renderPreview();
  document.getElementById('addRecipientBtn').addEventListener('click', addRecipient);
  document.getElementById('clearAllRecipientsBtn').addEventListener('click', ()=>{
    if(!state.recipients.length) return;
    if(!confirm('This will remove all ' + state.recipients.length + ' recipient(s). Are you sure?')) return;
    state.recipients = [];
    saveState(); renderRecipients(); renderPreviewSelect(); renderPreview();
  });
  document.getElementById('previewSelect').addEventListener('change', renderPreview);
  document.getElementById('generateAllBtn').addEventListener('click', generateAll);
  document.getElementById('clearGenResultsBtn').addEventListener('click', ()=>{
    genResults = [];
    document.getElementById('genList').innerHTML = '';
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('downloadZipBtn').disabled = true;
    document.getElementById('downloadCombinedBtn').disabled = true;
  });
  document.getElementById('downloadZipBtn').addEventListener('click', downloadZip);
  document.getElementById('downloadCombinedBtn').addEventListener('click', downloadCombined);
  bindSettings();
  setupAutoBackup();
  initStickyPreviews();
  window.addEventListener('beforeunload', saveState);
}
init();
