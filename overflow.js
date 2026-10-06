/* One-use ultimates of the selected main ability. */
(function(root){'use strict';
const overflows={
 x:{title:'絶対零度・灼熱崩壊',desc:'周囲300以内の敵を1.8秒凍結し、熱衝撃と4秒の灼熱で攻撃する。'},
 ashara:{title:'雷帝の裁き',desc:'生き残った敵本体へ、連鎖と麻痺を伴う追尾雷を3発ずつ放つ。'},
 mu:{title:'金剛王冠',desc:'最大HP45%分の盾とダイヤ兵3体を展開し、6本の貫通ダイヤを放つ。'},
 ojo:{title:'終幕・連鎖大爆発',desc:'追尾する巨大爆発弾を5発放ち、広い爆風で敵を巻き込む。'},
 titan:{title:'完全未来視',desc:'8秒間、消去以外の攻撃への回避率を65%に高め、接触攻撃を確定会心にする。被ダメージも軽減する。'},
 tsukichiyo:{title:'世界暗転',desc:'敵全員の視界を6秒奪い、短く停止させる。自身は5秒隠れ、近い敵へ強打する。'},
 beret:{title:'幸運独占',desc:'運を最大まで奪い、8秒間は回避と確定会心を強化。敵全員を7秒不運にする。'},
 minus:{title:'質量崩壊',desc:'周囲300以内の敵を引き寄せて5秒超重量化し、質量の一撃。自身は5秒加速・防御する。'},
 plus_final:{title:'質量特異点',desc:'最大HP40%分の盾と6秒の攻撃・防御強化、3秒の加速。周囲280以内へ重力衝撃波を放ち、大きく押し出す。'},
 gumon:{title:'絶対無敵',desc:'6秒間、通常攻撃と能力ダメージを無効にする。消去と能力封じには対抗できない。'},
 judge:{title:'最終判決・敗北却下',desc:'最大HP45%を回復し30%分の盾を得る。「命中した」を現実にし、標的の盾を除いて必中攻撃。'},
 serena:{title:'傷の反転・完全再生',desc:'HPを全回復し、継続ダメージと状態異常を解除。6秒間、与えたダメージの半分で自身の傷を癒す。'},
 hattan_final:{title:'無限分身・影の軍勢',desc:'強化分身を最大8体へ展開し、既存の分身も強化・再生。自身は4秒隠れ、最大HP20%分の盾を得る。'}
};
if(typeof module!=='undefined')module.exports=overflows;else root.KASU_OVERFLOWS=overflows;
})(typeof globalThis!=='undefined'?globalThis:this);
