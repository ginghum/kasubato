'use strict';
(() => {
 const baseRoster = globalThis.KASU_ROSTER;
 const roster = Array.isArray(baseRoster) ? [...baseRoster, ...(globalThis.KASU_FINAL_MODES || [])] : null;
 const $ = id => document.getElementById(id);
 const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize = s => String(s).normalize('NFKC').toLowerCase().replace(/[\s・･]/g, '');
 const notes = {
  darkness:'5秒ごとに最大HPの12%を自己回復し、距離180未満の味方を8%回復。生命体は最大2体。致命傷時は一度だけHP40%で再生し、能力封じ中には再生しません。',
  nine:'命中判定の回避・視界不良を無視します。盾・防御軽減・無敵・空中への接触無効は有効です。能力封じ中は必中が解除されます。',
  aqua:'原作の5分後の予言を短い試合向けに圧縮。5秒ごとに2秒間、回避率を18ポイント加算します。',
  luka:'盾などを除いた実ダメージの12%を自身のHPへ戻します。',
  menou:'原作の1分間の支配を2.2秒に圧縮。5.5秒ごとに距離220未満の敵1人を支配。本人の攻撃を封じ、他の敵へ攻撃させます。元のチーム所属は変化せず、支配者の脱落・能力封じで解除されます。',
  menou_final:'4.5秒ごとに距離260未満の敵を最大2人、3.2秒間支配。通常版と別のGrade 5参加者です。',
  oga:'3秒ごとに距離320未満の味方（召喚物を含む）を4秒間強化。能力攻撃と砲台弾は1.6倍、通常の接触攻撃は1.4倍。自身には付与せず、複数のオーガによる倍率は重複しません。',
  beret:'運は2秒間隔で最大9まで蓄積。能力による回避率は最大46%（SPD分は別途加算）、接触攻撃の会心率は最大48%。確定回避ではありません。',
  mu:'3秒ごとに最大HPの11%の盾と結晶弾。ダイヤ兵は6秒間隔・最大1体。',
  clarine:'石化と拘束は1秒。再使用3.5秒、有効距離245。石化相手への自分の攻撃は1.3倍、他者からの通常攻撃は0.6倍。',
  itoguchi:'消去攻撃は通常の回避・盾・防御軽減を無視。盾の除去と短い能力封じも行います。',
  empress:'開始時は捕食＋非参加キャラ10人の能力をランダムに所持（+版も候補）。同じ試合シードで再現。参加キャラは通常版・+版とも候補から除きます。自分が倒した本体から能力を獲得し、最大HPの12%を回復します。',
  milk:'自身は3秒ごとに最大HPの9%を回復。同じチームの近い支援者も回復します。',
  tanaka:'HP55%未満で全回復・状態異常解除。発動間隔は10秒。致命傷後の復活能力ではありません。',
  devil:'機械弾の無効化と砲台の掌握が特徴。ゴーレムやダイヤ兵は掌握対象の機械ではありません。',
  morpheus:'近くに眠っている敵がいると睡眠を延長。自分で最初の睡眠を付ける処理はありません。',
  soi:'致命傷を受けると一度だけ最大HPまで回復。2回目の致命傷では脱落します。',
  baroo:'引き合わせには敵が2体必要。最後の1対1では能力が発動しません。',
  chick:'3秒前の位置へ戻り、HPが減っていれば差分を回復。脱落後には発動できません。',
  guardian:'5秒間隔で最大HP22%分の盾を追加。消去系の攻撃には盾が機能しません。',
  torie:'盾が吸収した魔法ダメージの半分を反射。反射の再反射は起こりません。',
  lusai:'隠れている間も、接近や索敵能力、範囲攻撃には注意。',
  plus:'3秒ごとに強化とダッシュを交互に使います。接触火力と移動の切り替えに注目。',
  titan:'能力による回避24%（SPD分は別途加算）・接触攻撃の会心28%。どちらも確率で、消去攻撃には回避できません。'
 };
 function render() {
  if (!Array.isArray(roster)) { $('count').textContent = '読み込みに失敗しました'; $('character-list').textContent = 'ページを再読み込みしてください。'; return; }
  const query = normalize($('query').value), grade = $('grade').value, sort = $('sort').value;
  const list = roster.filter(p => (!grade || p.grade === grade) && normalize([p.name,p.realName,p.title,p.desc,p.sourceAbility,p.club,...p.aliases,notes[p.id] || ''].join(' ')).includes(query));
  list.sort((a,b) => (sort === 'grade' ? Number(b.grade)-Number(a.grade) : sort === 'name' ? 0 : b.stats[sort]-a.stats[sort]) || baseRoster.compareNames(a,b));
  $('count').textContent = `${list.length} / ${roster.length}人`;
  $('character-list').innerHTML = list.length ? list.map(p => `<article class="char"><div class="char-head"><span class="char-icon" aria-hidden="true">${escape(p.icon)}</span><div><h3>${escape(p.name)}</h3><small>Grade ${escape(p.grade)} / ${escape(p.club)}</small></div></div><p>${escape(p.realName)}</p><div class="ability">${escape(p.title)}</div><p>${escape(p.desc)}</p><div class="stats"><span>ATK ${p.stats.atk}</span><span>HP ${p.stats.hp}</span><span>SPD ${p.stats.speed}</span></div>${notes[p.id] ? `<p class="tip">${escape(notes[p.id])}</p>` : ''}<a href="https://ginghum.github.io/START/characters/${encodeURIComponent(p.baseId || p.id)}.html" target="_blank" rel="noopener">名鑑で設定を読む ↗</a></article>`).join('') : '<p class="empty">該当するキャラクターがいません。検索語やGradeを変えてください。</p>';
 }
 $('query').addEventListener('input', render);
 $('grade').addEventListener('change', render);
 $('sort').addEventListener('change', render);
 render();
})();
