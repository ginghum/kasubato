/* START snapshot 350d11086d1efd3faf3f14252bc825b8a792b29a; combat numbers are simulator estimates. */
(function(root){
const roster = [
  {
    "icon": "☠",
    "title": "毒を蓄積",
    "desc": "毒攻撃を吸収し、蓄積毒を周囲へ放出。最大6段階。",
    "id": "an",
    "name": "アン",
    "realName": "アン・ユーシ",
    "aliases": [
      "アン",
      "アン・ユーシ"
    ],
    "grade": "4",
    "height": 160,
    "club": "薬学サークル",
    "position": "",
    "sourceAbility": "毒を蓄積する",
    "summary": "毒と実験を愛し、不死身の部長ソイを容赦なく巻き込む、薬学サークルの愉快な副部長。",
    "stats": {
      "atk": 29,
      "hp": 1510,
      "speed": 5.8
    },
    "sourcePath": "characters-data/an/profile.json"
  },
  {
    "icon": "⚡",
    "title": "雷撃連鎖",
    "desc": "高速の雷弾を放ち、近くの別の敵にも連鎖して短く痺れさせる。",
    "id": "ashara",
    "name": "アシャラ",
    "realName": "アシャラ・シルヴァ",
    "aliases": [
      "アシャラ",
      "アシャラ・シルヴァ"
    ],
    "grade": "5",
    "height": 186,
    "club": "サッカーサークル",
    "position": "サッカーサークル部長／生徒会役員",
    "sourceAbility": "雷を操る",
    "summary": "世界最強の決定力と華を独占し、学園内外の視線をさらう天才ストライカー。",
    "stats": {
      "atk": 44.0,
      "hp": 2306,
      "speed": 6.0
    },
    "sourcePath": "characters-data/ashara/profile.json"
  },
  {
    "icon": "🔫",
    "title": "身体銃器化",
    "desc": "身体を銃に変え、標的へ5発の弾を扇状連射。",
    "id": "balalaika",
    "name": "バラライカ",
    "realName": "ヴィアンカ・ブリュード",
    "aliases": [
      "バラライカ",
      "ヴィアンカ・ブリュード"
    ],
    "grade": "4",
    "height": 172,
    "club": "軍事サークル",
    "position": "軍事サークル部長",
    "sourceAbility": "体を銃器に変える",
    "summary": "祖国への忠義と規律を胸に、自分にも部員にも厳しい鍛錬を課す、軍事サークルの鬼教官。",
    "stats": {
      "atk": 30,
      "hp": 1558,
      "speed": 5.8
    },
    "sourcePath": "characters-data/balalaika/profile.json"
  },
  {
    "icon": "🗿",
    "title": "ゴーレム操作",
    "desc": "耐久型ゴーレムを最大2体使役。本体脱落で停止。",
    "id": "bane",
    "name": "ベイン",
    "realName": "ミィーティー・ベイン",
    "aliases": [
      "ベイン",
      "ミィーティー・ベイン"
    ],
    "grade": "2",
    "height": 180,
    "club": "なんでも屋サークル",
    "position": "",
    "sourceAbility": "ゴーレムを操る",
    "summary": "気だるげな返事とは裏腹に、ゴーレムと確かな仕事で依頼を片づける、なんでも屋の現場担当。",
    "stats": {
      "atk": 23,
      "hp": 1290,
      "speed": 5.5
    },
    "sourcePath": "characters-data/bane/profile.json"
  },
  {
    "icon": "🧲",
    "title": "引き合わせ",
    "desc": "近い敵2人を互いに引き寄せ、衝突させる。",
    "id": "baroo",
    "name": "バルー",
    "realName": "バルー・バノーレ",
    "aliases": [
      "バルー",
      "バルー・バノーレ"
    ],
    "grade": "1",
    "height": 151,
    "club": "新聞部",
    "position": "",
    "sourceAbility": "物同士を引き合わせる",
    "summary": "広い交友関係から噂を引き寄せ、笑顔で新聞を売り歩く情報通のギャル。",
    "stats": {
      "atk": 16,
      "hp": 1024,
      "speed": 5.4
    },
    "sourcePath": "characters-data/baroo/profile.json"
  },
  {
    "icon": "⚙",
    "title": "製作設計",
    "desc": "準備した材料で自動砲台を製作。材料補充まで時間が必要。",
    "id": "bell",
    "name": "ベル",
    "realName": "ベル・グラハム",
    "aliases": [
      "ベル",
      "ベル・グラハム"
    ],
    "grade": "2",
    "height": 163,
    "club": "eスポーツサークル",
    "position": "",
    "sourceAbility": "なんでも作り方がわかる",
    "summary": "思いついた遊びを機械へ変え、秘密のゲームセンターを賑やかにする発明少女。",
    "stats": {
      "atk": 21,
      "hp": 1222,
      "speed": 5.5
    },
    "sourcePath": "characters-data/bell/profile.json"
  },
  {
    "icon": "🍀",
    "title": "運の収奪",
    "desc": "近い敵から運を奪い、自分の回避と会心率を上げ、相手の命中率を下げる。",
    "id": "beret",
    "name": "ベレー",
    "realName": "ベレー・ベレッタ",
    "aliases": [
      "ベレー",
      "ベレー・ベレッタ"
    ],
    "grade": "5",
    "height": 152,
    "club": "美術サークル",
    "position": "美術サークル部長／生徒会役員",
    "sourceAbility": "他人の運を吸い取る",
    "summary": "柔らかな笑顔の奥で他人の運を奪い、秘密ごと作品へ変える世界的な美術サークル部長。",
    "stats": {
      "atk": 36.0,
      "hp": 1796,
      "speed": 6.0
    },
    "sourcePath": "characters-data/beret/profile.json"
  },
  {
    "icon": "👂",
    "title": "超聴覚",
    "desc": "足音で接近を察知。近接攻撃を回避しやすい。",
    "id": "bonbori",
    "name": "ボンボリ",
    "realName": "文月ぼんぼり",
    "aliases": [
      "ボンボリ",
      "文月ぼんぼり"
    ],
    "grade": "1",
    "height": 162,
    "club": "美食サークル",
    "position": "",
    "sourceAbility": "超聴覚",
    "summary": "明るい笑顔と超聴覚で巨大な美食組織を支える、カガチの小さな片腕。",
    "stats": {
      "atk": 17,
      "hp": 1068,
      "speed": 5.4
    },
    "sourcePath": "characters-data/bonbori/profile.json"
  },
  {
    "icon": "🕸",
    "title": "捕虫網",
    "desc": "網弾を撃ち、命中した敵の移動を一時的に止める。",
    "id": "bug",
    "name": "バグ",
    "realName": "バグ・フォレスト",
    "aliases": [
      "バグ",
      "バグ・フォレスト"
    ],
    "grade": "3",
    "height": 160,
    "club": "オカルト&昆虫サークル",
    "position": "昆虫部門部長",
    "sourceAbility": "網を飛ばす",
    "summary": "虫を見つければ笑顔がさらに輝く、裏山育ちの素直な昆虫部長。",
    "stats": {
      "atk": 25,
      "hp": 1360,
      "speed": 5.7
    },
    "sourcePath": "characters-data/bug/profile.json"
  },
  {
    "icon": "🟠",
    "title": "球体化",
    "desc": "球体に変身して高速体当たり。変身中は衝撃を軽減。",
    "id": "bunbu",
    "name": "ブンブ",
    "realName": "ブンブ・ブーブー",
    "aliases": [
      "ブンブ",
      "ブンブ・ブーブー"
    ],
    "grade": "3",
    "height": 204,
    "club": "ボディビルサークル",
    "position": "",
    "sourceAbility": "球体になる",
    "summary": "無邪気な笑顔でダンベルを掲げ、強さと優しさを覚えようとするボディビルサークルの巨漢。",
    "stats": {
      "atk": 31,
      "hp": 2000,
      "speed": 4.8
    },
    "sourcePath": "characters-data/bunbu/profile.json"
  },
  {
    "icon": "🧠",
    "title": "閉眼思考",
    "desc": "目を閉じて2秒分析した後、次の接触攻撃を会心にする。分析中は遅くなる。",
    "id": "chaka",
    "name": "チャカ",
    "realName": "チャカチャカ・チャカ",
    "aliases": [
      "チャカ",
      "チャカチャカ・チャカ"
    ],
    "grade": "1",
    "height": 183,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "目を閉じるとIQが上がる",
    "summary": "勉強を心から楽しみ、明るさと遠慮のない一言で周囲を揺さぶる勉強オタク。",
    "stats": {
      "atk": 19,
      "hp": 1152,
      "speed": 5.4
    },
    "sourcePath": "characters-data/chaka/profile.json"
  },
  {
    "icon": "↶",
    "title": "小さな巻き戻し",
    "desc": "3秒前の自分の位置とHPへ戻る。致命傷には間に合わない。",
    "id": "chick",
    "name": "チック",
    "realName": "シャーク・チック",
    "aliases": [
      "チック",
      "シャーク・チック"
    ],
    "grade": "1",
    "height": 176,
    "club": "新聞部",
    "position": "新聞部副部長・編集者",
    "sourceAbility": "少しだけ時間を戻す",
    "summary": "表舞台をユーヒに任せ、咳をこらえて紙面を完成させる新聞部の裏方編集者。",
    "stats": {
      "atk": 18,
      "hp": 1124,
      "speed": 5.4
    },
    "sourcePath": "characters-data/chick/profile.json"
  },
  {
    "icon": "🎵",
    "title": "音弾",
    "desc": "扇状に3発の音弾を放つ。",
    "id": "chuba",
    "name": "チュウバ",
    "realName": "志島中場",
    "aliases": [
      "チュウバ",
      "志島中場"
    ],
    "grade": "3",
    "height": 167,
    "club": "吹奏楽サークル",
    "position": "",
    "sourceAbility": "音弾を飛ばす",
    "summary": "卓越した演奏技術と冷静な印象操作で、部長へ静かに重圧をかける吹奏楽サークルの実力者。",
    "stats": {
      "atk": 26,
      "hp": 1388,
      "speed": 5.7
    },
    "sourcePath": "characters-data/chuba/profile.json"
  },
  {
    "icon": "🪨",
    "title": "石化",
    "desc": "近い敵を石化して停止させる。石化中は硬くなるが、石化させた本人は弱点を捉えて攻撃できる。",
    "id": "clarine",
    "name": "クラリーヌ",
    "realName": "クラリーヌ・メイリィ",
    "aliases": [
      "クラリーヌ",
      "クラリーヌ・メイリィ"
    ],
    "grade": "5",
    "height": 165,
    "club": "吹奏楽サークル",
    "position": "吹奏楽サークル部長／生徒会役員",
    "sourceAbility": "石化",
    "summary": "期待に応えようと責任を抱え込みながら、吹奏楽サークルと生徒会を支える優等生。",
    "stats": {
      "atk": 50.5,
      "hp": 2725,
      "speed": 6.0
    },
    "sourcePath": "characters-data/clarine/profile.json"
  },
  {
    "icon": "📍",
    "title": "標点転移",
    "desc": "開始地点をマーク。HP低下時にそこへ帰還し、接近を避ける。",
    "id": "dai",
    "name": "ダイ",
    "realName": "九代大",
    "aliases": [
      "ダイ",
      "九代大"
    ],
    "grade": "1",
    "height": 182,
    "club": "新聞部",
    "position": "",
    "sourceAbility": "マーク地点への瞬間移動",
    "summary": "疑わしい新聞さえ爽やかに売り込む、顔も足も広い敏腕営業マン。",
    "stats": {
      "atk": 19,
      "hp": 1148,
      "speed": 5.4
    },
    "sourcePath": "characters-data/dai/profile.json"
  },
  {
    "icon": "🟤",
    "title": "泥の身体",
    "desc": "泥となって接触攻撃を大幅軽減。周期的に泥へ潜って回避。",
    "id": "dancho",
    "name": "ダンチョー",
    "realName": "権田愛吉",
    "aliases": [
      "ダンチョー",
      "権田愛吉"
    ],
    "grade": "5",
    "height": 186,
    "club": "将棋サークル",
    "position": "",
    "sourceAbility": "身体を泥と化す",
    "summary": "誰にも傷ついてほしくない一心で、平和を守る盾となる実直な応援団長。",
    "stats": {
      "atk": 32.7,
      "hp": 1600,
      "speed": 6.0
    },
    "sourcePath": "characters-data/dancho/profile.json"
  },
  {
    "icon": "🔧",
    "title": "万能工具",
    "desc": "用意した工具を使い分け、攻撃と防御の構えを交互に取る。",
    "id": "dankachi",
    "name": "ダンカチ",
    "realName": "星野団勝",
    "aliases": [
      "ダンカチ",
      "星野団勝"
    ],
    "grade": "1",
    "height": 158,
    "club": "建設サークル",
    "position": "",
    "sourceAbility": "どんな道具も使いこなす",
    "summary": "道具だけなら一人前、判断力はまだ下っ端。恐れ知らずに現場へ飛び込む建設サークルの元気印。",
    "stats": {
      "atk": 17,
      "hp": 1052,
      "speed": 5.4
    },
    "sourcePath": "characters-data/dankachi/profile.json"
  },
  {
    "icon": "🟡",
    "title": "レジン操作",
    "desc": "レジンを固めて盾を補充し、敵の足元へ粘着床を作る。",
    "id": "deji",
    "name": "デヂ",
    "realName": "電池派百図",
    "aliases": [
      "デヂ",
      "電池派百図"
    ],
    "grade": "4",
    "height": 142,
    "club": "建設サークル",
    "position": "建設サークル部長・現場監督",
    "sourceAbility": "レジンを操る",
    "summary": "愚痴をこぼしながら誰より確実に現場を回す、建設サークルの小さな姉貴分。",
    "stats": {
      "atk": 28,
      "hp": 1438,
      "speed": 5.8
    },
    "sourcePath": "characters-data/deji/profile.json"
  },
  {
    "icon": "🎮",
    "title": "機械掌握",
    "desc": "会場に用意された砲台を1台操作。敵の機械召喚を奪い、機械弾を無効化する。機械を生成する能力ではない。",
    "id": "devil",
    "name": "デビル",
    "realName": "マーク・チルド",
    "aliases": [
      "デビル",
      "マーク・チルド"
    ],
    "grade": "5",
    "height": 153,
    "club": "eスポーツサークル",
    "position": "eスポーツサークル部長／反生徒会連合",
    "sourceAbility": "周囲の機械を操作する",
    "summary": "隠しゲームセンターに居座り、機械も対戦相手も思いどおりに動かす小柄な毒舌王者。",
    "stats": {
      "atk": 49.8,
      "hp": 2751,
      "speed": 6.0
    },
    "sourcePath": "characters-data/devil/profile.json"
  },
  {
    "icon": "🔴",
    "title": "レーザー",
    "desc": "一直線に貫通レーザーを撃つ。",
    "id": "doma",
    "name": "ドーマ",
    "realName": "ドーマ・ブレーン",
    "aliases": [
      "ドーマ",
      "ドーマ・ブレーン"
    ],
    "grade": "1",
    "height": 160,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "レーザー",
    "summary": "真面目すぎてロボットのように見える、素直で愛されるポンコツ勉強家。",
    "stats": {
      "atk": 17,
      "hp": 1060,
      "speed": 5.4
    },
    "sourcePath": "characters-data/doma/profile.json"
  },
  {
    "icon": "🎨",
    "title": "色の塗り替え",
    "desc": "体と背景の色を合わせ、3秒間狙われにくくなる。",
    "id": "don",
    "name": "ドン",
    "realName": "ドン・クライン",
    "aliases": [
      "ドン",
      "ドン・クライン"
    ],
    "grade": "1",
    "height": 173,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "色を塗り変える",
    "summary": "自信はなくても、誰かの危機には体が先に動く勉強サークルのネガティブ青年。",
    "stats": {
      "atk": 18,
      "hp": 1112,
      "speed": 5.4
    },
    "sourcePath": "characters-data/don/profile.json"
  },
  {
    "icon": "🎭",
    "title": "性別変更",
    "desc": "姿と声の変化で相手の先入観を外し、短時間だけ命中を乱す。身体能力は変わらない。",
    "id": "doppel",
    "name": "ドッペル",
    "realName": "ドッペル・ミラー",
    "aliases": [
      "ドッペル",
      "ドッペル・ミラー"
    ],
    "grade": "3",
    "height": 174,
    "club": "決闘委員会",
    "position": "",
    "sourceAbility": "性別を変更する",
    "summary": "姿を変えながら、案内から実況まで軽やかにこなす決闘委員会の万能役。",
    "stats": {
      "atk": 26,
      "hp": 1416,
      "speed": 5.7
    },
    "sourcePath": "characters-data/doppel/profile.json"
  },
  {
    "icon": "👑",
    "title": "捕食・能力獲得",
    "desc": "複数の獲得済み能力を使用。自分で倒した本体の能力を固定コピーし、重複なく蓄積。",
    "id": "empress",
    "name": "エンプレス",
    "realName": "エンプレス・メイジ",
    "aliases": [
      "エンプレス",
      "エンプレス・メイジ"
    ],
    "grade": "5",
    "height": 174,
    "club": "未所属",
    "position": "カース帝国女帝／生徒会長",
    "sourceAbility": "捕食した人間の能力を得る",
    "summary": "カース帝国と家族を愛し、強者が育つ学園を自らの農場として見守る現女帝にして真の生徒会長。",
    "stats": {
      "atk": 62,
      "hp": 3300,
      "speed": 6.5
    },
    "sourcePath": "characters-data/empress/profile.json"
  },
  {
    "icon": "🌪",
    "title": "風操作",
    "desc": "風弾と突風で敵を吹き飛ばす。",
    "id": "eris",
    "name": "エリス",
    "realName": "エリス・バーナー",
    "aliases": [
      "エリス",
      "エリス・バーナー"
    ],
    "grade": "2",
    "height": 176,
    "club": "なんでも屋サークル",
    "position": "",
    "sourceAbility": "風を操る",
    "summary": "冷静な受付と揺るがない判断で依頼を整理し、なんでも屋の仕事を滞りなく回す実務担当。",
    "stats": {
      "atk": 22,
      "hp": 1274,
      "speed": 5.5
    },
    "sourcePath": "characters-data/eris/profile.json"
  },
  {
    "icon": "⬇",
    "title": "重力操作",
    "desc": "敵を引き寄せる重力場を設置。場の中の敵は遅くなる。",
    "id": "grav",
    "name": "グラブ",
    "realName": "フォール・グラビティ",
    "aliases": [
      "グラブ",
      "フォール・グラビティ"
    ],
    "grade": "4",
    "height": 180,
    "club": "不良サークル",
    "position": "",
    "sourceAbility": "重力操作",
    "summary": "弱者には重く、強者には軽い態度を取る、ハッタン付きの小心なチンピラ。",
    "stats": {
      "atk": 31,
      "hp": 1590,
      "speed": 5.8
    },
    "sourcePath": "characters-data/grav/profile.json"
  },
  {
    "icon": "🛡",
    "title": "壁生成",
    "desc": "自身の周囲に壁の盾を作る。一定時間後に再構築。",
    "id": "guardian",
    "name": "ガーディアン",
    "realName": "ガロン・ダイアン",
    "aliases": [
      "ガーディアン",
      "ガロン・ダイアン"
    ],
    "grade": "3",
    "height": 175,
    "club": "サッカーサークル",
    "position": "副部長／ゴールキーパー",
    "sourceAbility": "壁を作り出す",
    "summary": "気難しい言葉でゴール前に立ちはだかる、世界最強格チームの堅実な守護神。",
    "stats": {
      "atk": 26,
      "hp": 1420,
      "speed": 5.7
    },
    "sourcePath": "characters-data/guardian/profile.json"
  },
  {
    "icon": "✊",
    "title": "無敵化",
    "desc": "6秒ごとに1.7秒間、通常攻撃と能力ダメージを無効。消滅・封印には対処できない。",
    "id": "gumon",
    "name": "グモン",
    "realName": "俺田愚門",
    "aliases": [
      "グモン",
      "俺田愚門"
    ],
    "grade": "5",
    "height": 189,
    "club": "不良サークル",
    "position": "不良サークル部長／平和主義者",
    "sourceAbility": "無敵になる",
    "summary": "無敵の拳で頂点に立ち、恋によって牙を抜かれた不良たちの王。",
    "stats": {
      "atk": 38.9,
      "hp": 2226,
      "speed": 5.6
    },
    "sourcePath": "characters-data/gumon/profile.json"
  },
  {
    "icon": "⏩",
    "title": "体感速度操作",
    "desc": "自身の動きを加速させ、近い敵の知覚を遅らせる。",
    "id": "hat",
    "name": "ハット",
    "realName": "ハット・スルヨーナ",
    "aliases": [
      "ハット",
      "ハット・スルヨーナ"
    ],
    "grade": "4",
    "height": 182,
    "club": "演劇サークル",
    "position": "演劇サークル部長",
    "sourceAbility": "体感速度を操る",
    "summary": "自らを万能の天才と信じ、学園で人気の映画を監督・編集する、演劇サークルの自信家な部長。",
    "stats": {
      "atk": 31,
      "hp": 1598,
      "speed": 5.8
    },
    "sourcePath": "characters-data/hat/profile.json"
  },
  {
    "icon": "👥",
    "title": "分身",
    "desc": "自分の分身を最大3体作る。本体脱落で消える。",
    "id": "hattan",
    "name": "ハッタン",
    "realName": "ウサギ・カポネ",
    "aliases": [
      "ハッタン",
      "ウサギ・カポネ"
    ],
    "grade": "4",
    "height": 186,
    "club": "不良サークル",
    "position": "",
    "sourceAbility": "分身する",
    "summary": "軽薄な笑顔と無数の手駒で不良たちを操る、嘘つきの知能派フィクサー。",
    "stats": {
      "atk": 31,
      "hp": 1614,
      "speed": 5.8
    },
    "sourcePath": "characters-data/hattan/profile.json"
  },
  {
    "icon": "🐦",
    "title": "動物を惹きつける",
    "desc": "動物の友達が最大2体、敵の注意を引いて支援する。",
    "id": "helios",
    "name": "ヘリオス",
    "realName": "ヘリオス・プリシュカ",
    "aliases": [
      "ヘリオス",
      "ヘリオス・プリシュカ"
    ],
    "grade": "1",
    "height": 170,
    "club": "保健委員会",
    "position": "",
    "sourceAbility": "動物を惹きつける",
    "summary": "動物たちを友達と呼び、優しい手当てと医学の勉強に励む保健委員会の一年生。",
    "stats": {
      "atk": 18,
      "hp": 1100,
      "speed": 5.4
    },
    "sourcePath": "characters-data/helios/profile.json"
  },
  {
    "icon": "🔶",
    "title": "物体変形",
    "desc": "敵の盾を変形させて減らし、周囲の物を刃へ変えて飛ばす。",
    "id": "hikaru",
    "name": "ヒカル",
    "realName": "ヒカル・オリマー",
    "aliases": [
      "ヒカル",
      "ヒカル・オリマー"
    ],
    "grade": "4",
    "height": 184,
    "club": "コスプレサークル",
    "position": "コスプレサークル部長",
    "sourceAbility": "物体を変形させる",
    "summary": "美しいものだけを手元に置く、コスプレサークルという名の美術館の支配者。",
    "stats": {
      "atk": 31,
      "hp": 1606,
      "speed": 5.8
    },
    "sourcePath": "characters-data/hikaru/profile.json"
  },
  {
    "icon": "🌍",
    "title": "地面へ流す",
    "desc": "地面に立つ間、接触ダメージの55%を地面へ逃がす。浮かされると無効。",
    "id": "hime",
    "name": "ヒメ",
    "realName": "姫宮月満",
    "aliases": [
      "ヒメ",
      "姫宮月満"
    ],
    "grade": "1",
    "height": 181,
    "club": "腐女子サークル",
    "position": "",
    "sourceAbility": "ダメージを地面に流す",
    "summary": "あらゆる同人ジャンルを自然体で受け入れ、女子ばかりの腐女子サークルにも雲のように馴染む青年。",
    "stats": {
      "atk": 19,
      "hp": 1144,
      "speed": 5.4
    },
    "sourcePath": "characters-data/hime/profile.json"
  },
  {
    "icon": "💗",
    "title": "感情操作",
    "desc": "近い敵を怯ませ、攻撃力を一時的に下げる。",
    "id": "himeyuri",
    "name": "ヒメユリ",
    "realName": "舞園百合彦",
    "aliases": [
      "ヒメユリ",
      "舞園百合彦"
    ],
    "grade": "3",
    "height": 178,
    "club": "演劇サークル",
    "position": "",
    "sourceAbility": "人の感情を操る",
    "summary": "男役も女役も華麗にこなす、中性的な美貌とプリンスのたたずまいを持つ演劇サークルの看板俳優。",
    "stats": {
      "atk": 27,
      "hp": 1432,
      "speed": 5.7
    },
    "sourcePath": "characters-data/himeyuri/profile.json"
  },
  {
    "icon": "⛰",
    "title": "土操作",
    "desc": "土の盾を補充し、敵の足元に土塊を立ち上げる。",
    "id": "hiyoko",
    "name": "ヒヨコ",
    "realName": "八代日和",
    "aliases": [
      "ヒヨコ",
      "八代日和"
    ],
    "grade": "1",
    "height": 156,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "土を操る",
    "summary": "都会に来てもほどほどの頑張りを崩さない、素朴で自由な勉強サークルの一年生。",
    "stats": {
      "atk": 17,
      "hp": 1044,
      "speed": 5.4
    },
    "sourcePath": "characters-data/hiyoko/profile.json"
  },
  {
    "icon": "👁",
    "title": "超視力",
    "desc": "遠くの敵まで見極める。隠れた相手を発見し、通常攻撃の命中が安定する。",
    "id": "hoozuki",
    "name": "ホオズキ",
    "realName": "鬼灯てまり",
    "aliases": [
      "ホオズキ",
      "鬼灯てまり"
    ],
    "grade": "1",
    "height": 162,
    "club": "美食サークル",
    "position": "",
    "sourceAbility": "超視力",
    "summary": "ボンボリの言葉に「ですでーす！」と重ねる、そっくり笑顔のもう一人の片腕。",
    "stats": {
      "atk": 17,
      "hp": 1068,
      "speed": 5.4
    },
    "sourcePath": "characters-data/hoozuki/profile.json"
  },
  {
    "icon": "∅",
    "title": "概念・物体消滅",
    "desc": "標的の盾と強化を消し、能力を短く封じて防御を貫く消滅攻撃。",
    "id": "itoguchi",
    "name": "イトグチ",
    "realName": "糸口御虎",
    "aliases": [
      "イトグチ",
      "糸口御虎"
    ],
    "grade": "5",
    "height": 188,
    "club": "未所属",
    "position": "生徒会副会長",
    "sourceAbility": "概念と物体を消滅させる",
    "summary": "丁寧な言葉と絶対的な力で秩序を執行し、学園を実質的に統べる生徒会副会長。",
    "stats": {
      "atk": 60,
      "hp": 2800,
      "speed": 7.2
    },
    "sourcePath": "characters-data/itoguchi/profile.json"
  },
  {
    "icon": "✕",
    "title": "現実を嘘に",
    "desc": "標的の盾・召喚を嘘として消し、身体へ貫通ダメージを与える。",
    "id": "jend",
    "name": "ジェンド",
    "realName": "ジェンド・リベラ",
    "aliases": [
      "ジェンド",
      "ジェンド・リベラ"
    ],
    "grade": "5",
    "height": 152,
    "club": "決闘委員会",
    "position": "",
    "sourceAbility": "現実を嘘にする",
    "summary": "ジャッジの双子の妹として振る舞い、星を失った生徒を無邪気に管理する幻。",
    "stats": {
      "atk": 33,
      "hp": 1628,
      "speed": 6.0
    },
    "sourcePath": "characters-data/jend/profile.json"
  },
  {
    "icon": "⚖",
    "title": "嘘を真実に",
    "desc": "「盾がある」「傷は浅い」「命中した」を順に現実化して防御・回復・必中攻撃。",
    "id": "judge",
    "name": "ジャッジ",
    "realName": "ジャッジ・リベラ",
    "aliases": [
      "ジャッジ",
      "ジャッジ・リベラ"
    ],
    "grade": "5",
    "height": 152,
    "club": "決闘委員会",
    "position": "決闘委員会会長／生徒会役員",
    "sourceAbility": "嘘を真実にする",
    "summary": "公平な暴力舞台を愛し、存在しない妹を真実として生きる決闘委員会会長。",
    "stats": {
      "atk": 33.4,
      "hp": 1643,
      "speed": 6.0
    },
    "sourcePath": "characters-data/judge/profile.json"
  },
  {
    "icon": "🪡",
    "title": "針射出",
    "desc": "細い針を3本飛ばす。",
    "id": "junko",
    "name": "ジュンコ",
    "realName": "笹田純子",
    "aliases": [
      "ジュンコ",
      "笹田純子"
    ],
    "grade": "1",
    "height": 158,
    "club": "腐女子サークル",
    "position": "",
    "sourceAbility": "針を飛ばす",
    "summary": "純愛だけを正義と信じ、文句を言いながらも頼まれた原稿は断れない腐女子サークルの過激派絵師。",
    "stats": {
      "atk": 17,
      "hp": 1052,
      "speed": 5.4
    },
    "sourcePath": "characters-data/junko/profile.json"
  },
  {
    "icon": "🦣",
    "title": "巨大化",
    "desc": "巨大な身体で攻撃範囲と体当たりを強化。動きは遅くなる。",
    "id": "kagachi",
    "name": "カガチ",
    "realName": "カガチ・ビックマン",
    "aliases": [
      "カガチ",
      "カガチ・ビックマン"
    ],
    "grade": "5",
    "height": 193,
    "club": "美食サークル",
    "position": "美食サークル部長／反生徒会連合",
    "sourceAbility": "巨大化",
    "summary": "学園中の非公式飲食店を束ね、誰にでも腹いっぱい食べさせる巨大な敏腕社長。",
    "stats": {
      "atk": 52.1,
      "hp": 3639,
      "speed": 4.2
    },
    "sourcePath": "characters-data/kagachi/profile.json"
  },
  {
    "icon": "🧣",
    "title": "布操作",
    "desc": "布の盾を纏い、近い敵を布で拘束する。",
    "id": "kamatsuka",
    "name": "カマツカ",
    "realName": "一尺八寸四葉",
    "aliases": [
      "カマツカ",
      "一尺八寸四葉"
    ],
    "grade": "2",
    "height": 158,
    "club": "生活サークル",
    "position": "",
    "sourceAbility": "布を操る",
    "summary": "何もしない生活サークルを実務で支え、タナカを静かに見守る真面目な副部長。",
    "stats": {
      "atk": 21,
      "hp": 1202,
      "speed": 5.5
    },
    "sourcePath": "characters-data/kamatsuka/profile.json"
  },
  {
    "icon": "🩸",
    "title": "傷の悪化",
    "desc": "負傷した相手ほど接触攻撃が強くなる。追加出血を与える。",
    "id": "kirara",
    "name": "キララ",
    "realName": "倉本きらり",
    "aliases": [
      "キララ",
      "倉本きらり"
    ],
    "grade": "2",
    "height": 151,
    "club": "腐女子サークル",
    "position": "",
    "sourceAbility": "傷を悪化させる",
    "summary": "お嬢様然とした優雅な振る舞いの裏で、血と涙に彩られた猟奇的な愛へ静かに陶酔する腐女子サークルの一年生。",
    "stats": {
      "atk": 20,
      "hp": 1174,
      "speed": 5.5
    },
    "sourcePath": "characters-data/kirara/profile.json"
  },
  {
    "icon": "👊",
    "title": "チャージパンチ",
    "desc": "2秒溜めた後、敵に踏み込んで強烈な一撃。溜め中は遅くなる。",
    "id": "kobal",
    "name": "コバル",
    "realName": "ボンレス・モヤシ",
    "aliases": [
      "コバル",
      "ボンレス・モヤシ"
    ],
    "grade": "4",
    "height": 176,
    "club": "オタクサークル",
    "position": "オタクサークル部長",
    "sourceAbility": "チャージパンチを放つ",
    "summary": "あらゆる作品を語れる、心優しき二次元愛者。オタクサークルの部長。",
    "stats": {
      "atk": 27,
      "hp": 1650,
      "speed": 5.2
    },
    "sourcePath": "characters-data/kobal/profile.json"
  },
  {
    "icon": "🧪",
    "title": "毒生成",
    "desc": "毒弾を撃ち、命中した相手に持続毒を付ける。",
    "id": "konke",
    "name": "コンケ",
    "realName": "コンケ・ケンコ",
    "aliases": [
      "コンケ",
      "コンケ・ケンコ"
    ],
    "grade": "3",
    "height": 177,
    "club": "不良サークル",
    "position": "",
    "sourceAbility": "毒を生成する",
    "summary": "悪ぶり方はまだ修行中。毒と小細工で勝ちにいく、不良サークルの新人。",
    "stats": {
      "atk": 27,
      "hp": 1428,
      "speed": 5.7
    },
    "sourcePath": "characters-data/konke/profile.json"
  },
  {
    "icon": "⚔",
    "title": "金属生成",
    "desc": "生成した剣で接触攻撃を強化し、金属片を飛ばす。",
    "id": "lance",
    "name": "ランス",
    "realName": "ジェイル・アルムダイン",
    "aliases": [
      "ランス",
      "ジェイル・アルムダイン"
    ],
    "grade": "1",
    "height": 169,
    "club": "オタクサークル",
    "position": "",
    "sourceAbility": "金属を生成する",
    "summary": "高い決闘実力を持ちながら、何よりもゆきめろへの愛を優先する戦士。",
    "stats": {
      "atk": 29,
      "hp": 1450,
      "speed": 5.8
    },
    "sourcePath": "characters-data/lance/profile.json"
  },
  {
    "icon": "💣",
    "title": "小物生成",
    "desc": "手のひらサイズの爆弾を生成。敵の近くで遅れて爆発。",
    "id": "leorka",
    "name": "レオルカ",
    "realName": "レオン・オルガード",
    "aliases": [
      "レオルカ",
      "レオン・オルガード"
    ],
    "grade": "4",
    "height": 183,
    "club": "美術サークル",
    "position": "",
    "sourceAbility": "手のひらサイズの物体を生成する",
    "summary": "紳士の微笑みで導火線を見つめ、校舎さえ作品へ変える美術サークルの爆発芸術家。",
    "stats": {
      "atk": 31,
      "hp": 1602,
      "speed": 5.8
    },
    "sourcePath": "characters-data/leorka/profile.json"
  },
  {
    "icon": "◌",
    "title": "透明化",
    "desc": "周期的に透明になり、狙いを外す。攻撃すると姿が見える。",
    "id": "lusai",
    "name": "ルサイ",
    "realName": "ルサイ・サイレン",
    "aliases": [
      "ルサイ",
      "ルサイ・サイレン"
    ],
    "grade": "1",
    "height": 176,
    "club": "勉強サークル",
    "position": "勉強サークル副部長",
    "sourceAbility": "透明化",
    "summary": "手作りスイーツと世話焼きぶりでXを支える、飄々としたパティシエ副部長。",
    "stats": {
      "atk": 17,
      "hp": 1100,
      "speed": 5.6
    },
    "sourcePath": "characters-data/lusai/profile.json"
  },
  {
    "icon": "🔒",
    "title": "金縛り",
    "desc": "近い敵を短時間停止させる。",
    "id": "machio",
    "name": "マチオ",
    "realName": "マチルダ・オーディ",
    "aliases": [
      "マチオ",
      "マチルダ・オーディ"
    ],
    "grade": "2",
    "height": 160,
    "club": "腐女子サークル",
    "position": "",
    "sourceAbility": "金縛り",
    "summary": "面白そうな騒ぎには何でも飛び込み、嫌がる相手まで明るく煽り続ける腐女子サークルの陽気なギャル。",
    "stats": {
      "atk": 21,
      "hp": 1210,
      "speed": 5.5
    },
    "sourcePath": "characters-data/machio/profile.json"
  },
  {
    "icon": "☁",
    "title": "ネガティブ化",
    "desc": "近い敵の攻撃意欲を下げ、攻撃力と移動速度を下げる。",
    "id": "makura",
    "name": "マクラ",
    "realName": "尾崎万倉",
    "aliases": [
      "マクラ",
      "尾崎万倉"
    ],
    "grade": "1",
    "height": 170,
    "club": "自由サークル",
    "position": "",
    "sourceAbility": "相手をネガティブにする",
    "summary": "誰より人を疑いながら、一度だけ振り絞った勇気をマサに拾われた自由サークルの毒舌家。",
    "stats": {
      "atk": 18,
      "hp": 1100,
      "speed": 5.4
    },
    "sourcePath": "characters-data/makura/profile.json"
  },
  {
    "icon": "💧",
    "title": "水操作",
    "desc": "水の波で押し流し、敵を短時間遅くする。",
    "id": "mane",
    "name": "マーネ",
    "realName": "紅羽旭",
    "aliases": [
      "マーネ",
      "紅羽旭"
    ],
    "grade": "3",
    "height": 180,
    "club": "演劇サークル",
    "position": "",
    "sourceAbility": "水を操る",
    "summary": "悪役も別人のように演じきり、監督の無茶に振り回されながら撮影を支える、演劇サークルの実力派。",
    "stats": {
      "atk": 27,
      "hp": 1440,
      "speed": 5.7
    },
    "sourcePath": "characters-data/mane/profile.json"
  },
  {
    "icon": "💪",
    "title": "筋力上昇",
    "desc": "戦闘中に筋力が上がる。上昇は基礎攻撃力の80%まで。",
    "id": "masa",
    "name": "マサ",
    "realName": "正義正",
    "aliases": [
      "マサ",
      "正義正"
    ],
    "grade": "4",
    "height": 185,
    "club": "自由サークル",
    "position": "自由サークル部長",
    "sourceAbility": "筋力が上昇する",
    "summary": "己の正義を旗印に、グレード制度へ真っ向から拳を突きつける自由サークル部長。",
    "stats": {
      "atk": 31,
      "hp": 1610,
      "speed": 5.8
    },
    "sourcePath": "characters-data/masa/profile.json"
  },
  {
    "icon": "➰",
    "title": "縄生成",
    "desc": "縄弾で拘束。命中した敵を引き寄せる。",
    "id": "meimei",
    "name": "メイメイ",
    "realName": "鳴梅梅",
    "aliases": [
      "メイメイ",
      "鳴梅梅"
    ],
    "grade": "3",
    "height": 172,
    "club": "忍者サークル",
    "position": "",
    "sourceAbility": "縄を生成する",
    "summary": "本物の忍者へ一直線、底なしの笑顔で忍者サークルを引っ張る自称くのいち。",
    "stats": {
      "atk": 26,
      "hp": 1408,
      "speed": 5.7
    },
    "sourcePath": "characters-data/meimei/profile.json"
  },
  {
    "icon": "🌀",
    "title": "転移ゲート",
    "desc": "対の転移門を設置。標的の近くへ転移して接触攻撃を行い、着地直後は防御の構えを取る。誰でも門を通れる。",
    "id": "mikael",
    "name": "ミカエル",
    "realName": "三蛙貴託",
    "aliases": [
      "ミカエル",
      "三蛙貴託"
    ],
    "grade": "5",
    "height": 153,
    "club": "帰宅サークル",
    "position": "",
    "sourceAbility": "転移ゲートの作成",
    "summary": "学園の真実を知り、転移門の向こうへ引きこもった元決闘常連の少女。",
    "stats": {
      "atk": 54.3,
      "hp": 2744,
      "speed": 6.0
    },
    "sourcePath": "characters-data/mikael/profile.json"
  },
  {
    "icon": "✚",
    "title": "治癒",
    "desc": "自分と近い味方の傷を癒す。攻撃的な変身は名鑑に未記載のため使用しない。",
    "id": "milk",
    "name": "ミルク",
    "realName": "ミルク・メイジ",
    "aliases": [
      "ミルク",
      "ミルク・メイジ"
    ],
    "grade": "不明",
    "height": 161,
    "club": "未所属",
    "position": "生徒会長代理",
    "sourceAbility": "傷を癒す",
    "summary": "帝国のプリンセスにして、恐れを隠しながら学園の頂点に立つ生徒会長代理。",
    "stats": {
      "atk": 13,
      "hp": 1500,
      "speed": 5.1
    },
    "sourcePath": "characters-data/milk/profile.json"
  },
  {
    "icon": "💞",
    "title": "洗脳",
    "desc": "敵の召喚を奪い、近い敵本人は混乱させて進行方向を乱す。",
    "id": "mimari",
    "name": "ミマリ",
    "realName": "柳美鞠",
    "aliases": [
      "ミマリ",
      "柳美鞠"
    ],
    "grade": "3",
    "height": 154,
    "club": "サッカーサークル",
    "position": "",
    "sourceAbility": "洗脳する",
    "summary": "アシャラだけを一途に見つめ、可愛い笑顔の裏で周囲を計算どおりに動かすマネージャー。",
    "stats": {
      "atk": 25,
      "hp": 1336,
      "speed": 5.7
    },
    "sourcePath": "characters-data/mimari/profile.json"
  },
  {
    "icon": "✦",
    "title": "極限の質量操作",
    "desc": "敵の質量を増して停止に近い遅化。自分は軽く動き、超重量の一撃を与える。",
    "id": "minus",
    "name": "マイナス",
    "realName": "マイナス・ゼロ",
    "aliases": [
      "マイナス",
      "マイナス・ゼロ"
    ],
    "grade": "5",
    "height": 175,
    "club": "未所属",
    "position": "",
    "sourceAbility": "質量を変化させる",
    "summary": "木漏れ日の下で静かに本を開く、穏やかで人好きな学園最強の一角。",
    "stats": {
      "atk": 54.0,
      "hp": 2985,
      "speed": 6.8
    },
    "sourcePath": "characters-data/minus/profile.json"
  },
  {
    "icon": "💤",
    "title": "夢を見せる",
    "desc": "眠った敵の夢を長引かせる。覚醒中には効かず、負傷して休息している敵にのみ使用。",
    "id": "morpheus",
    "name": "モルペウス",
    "realName": "モルズ・ヒュプノス",
    "aliases": [
      "モルペウス",
      "モルズ・ヒュプノス"
    ],
    "grade": "1",
    "height": 165,
    "club": "新聞部",
    "position": "",
    "sourceAbility": "夢を見せる",
    "summary": "頼まれれば断れず、眠い目をこすりながら編集作業を支える、心優しい夢見せ役。",
    "stats": {
      "atk": 18,
      "hp": 1080,
      "speed": 5.4
    },
    "sourcePath": "characters-data/morpheus/profile.json"
  },
  {
    "icon": "💎",
    "title": "ダイヤ操作",
    "desc": "ダイヤ兵を最大1体作って戦わせ、盾と結晶弾でも攻防を行う。兵のHPは本人の24%、攻撃力50%。",
    "id": "mu",
    "name": "ミュー",
    "realName": "ミューライズ・スターダスト",
    "aliases": [
      "ミュー",
      "ミューライズ・スターダスト"
    ],
    "grade": "5",
    "height": 150,
    "club": "アイドルグループ「S.O.Bright」",
    "position": "S.O.Brightリーダー／生徒会役員",
    "sourceAbility": "ダイヤモンドを操る",
    "summary": "誰もが憧れる完璧なアイドルを演じながら、その裏で不満と野心を隠さないS.O.Brightのリーダー。",
    "stats": {
      "atk": 23.6,
      "hp": 1263,
      "speed": 6.0
    },
    "sourcePath": "characters-data/mu/profile.json"
  },
  {
    "icon": "💨",
    "title": "高速移動",
    "desc": "短い高速移動を繰り返す。高速時は接触をかわしやすい。",
    "id": "muchiko",
    "name": "ムチコ",
    "realName": "村上千子",
    "aliases": [
      "ムチコ",
      "村上千子"
    ],
    "grade": "2",
    "height": 175,
    "club": "腐女子サークル",
    "position": "腐女子サークル副部長",
    "sourceAbility": "高速移動",
    "summary": "逃げる部長と奔放な部員たちを黙って支え、締め切りだけは絶対に見捨てない腐女子サークルの苦労人副部長。",
    "stats": {
      "atk": 17,
      "hp": 1050,
      "speed": 8.0
    },
    "sourcePath": "characters-data/muchiko/profile.json"
  },
  {
    "icon": "🧵",
    "title": "糸生成",
    "desc": "糸の拘束床を設置し、敵の速度を下げる。",
    "id": "natori",
    "name": "ナトリ",
    "realName": "名取四欲",
    "aliases": [
      "ナトリ",
      "名取四欲"
    ],
    "grade": "2",
    "height": 179,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "糸を作り出す",
    "summary": "努力も実力も自分の美しさの証明に変える、折れない自信のナルシスト。",
    "stats": {
      "atk": 23,
      "hp": 1286,
      "speed": 5.5
    },
    "sourcePath": "characters-data/natori/profile.json"
  },
  {
    "icon": "📈",
    "title": "他者能力強化",
    "desc": "近い味方の能力威力を強化。個人戦では他人への強化を使わず、鍛えた肉体で戦う。",
    "id": "oga",
    "name": "オーガ",
    "realName": "王ヶ崎卵太郎",
    "aliases": [
      "オーガ",
      "王ヶ崎卵太郎"
    ],
    "grade": "4",
    "height": 197,
    "club": "不良サークル",
    "position": "不良サークル副部長",
    "sourceAbility": "他人の能力を強化する",
    "summary": "怪物じみた姿で仲間の生活を支える、不良サークルの世話焼き副部長。",
    "stats": {
      "atk": 31,
      "hp": 2050,
      "speed": 5.3
    },
    "sourcePath": "characters-data/oga/profile.json"
  },
  {
    "icon": "💥",
    "title": "爆発弾操作",
    "desc": "標的を追う爆発弾を撃つ。着弾時は周囲も巻き込む。",
    "id": "ojo",
    "name": "オジョー",
    "realName": "オジョーニア・ブロンディー",
    "aliases": [
      "オジョー",
      "オジョーニア・ブロンディー"
    ],
    "grade": "5",
    "height": 154,
    "club": "令嬢サークル",
    "position": "令嬢サークル部長",
    "sourceAbility": "爆発弾を操る",
    "summary": "誰の下にもつかず、爆炎さえ自らの美学へ変える高潔なお嬢様。",
    "stats": {
      "atk": 48.3,
      "hp": 2580,
      "speed": 6.0
    },
    "sourcePath": "characters-data/ojo/profile.json"
  },
  {
    "icon": "🔩",
    "title": "オリハルコン化",
    "desc": "身体を硬質化して接触・射撃を軽減。",
    "id": "oriha",
    "name": "オリハ",
    "realName": "オリハ・ブラックハート",
    "aliases": [
      "オリハ",
      "オリハ・ブラックハート"
    ],
    "grade": "3",
    "height": 175,
    "club": "オタクサークル",
    "position": "",
    "sourceAbility": "体をオリハルコンに変える",
    "summary": "憧れの冷笑系キャラを演じながら、決闘で鬱憤を晴らす長身オタク女子。",
    "stats": {
      "atk": 26,
      "hp": 1420,
      "speed": 5.7
    },
    "sourcePath": "characters-data/oriha/profile.json"
  },
  {
    "icon": "🐺",
    "title": "フェンリル変身",
    "desc": "巨大な狼へ変身し、噛みつき・速度・耐久を高める。",
    "id": "paster",
    "name": "パスター",
    "realName": "ロパスター・スージー",
    "aliases": [
      "パスター",
      "ロパスター・スージー"
    ],
    "grade": "5",
    "height": 179,
    "club": "天文サークル",
    "position": "天文サークル部長",
    "sourceAbility": "フェンリルに変身する",
    "summary": "誰もが才能を自由に輝かせられる世界を夢見る、天文サークルのきらめくフェンリル少女。",
    "stats": {
      "atk": 51.7,
      "hp": 2806,
      "speed": 6.0
    },
    "sourcePath": "characters-data/paster/profile.json"
  },
  {
    "icon": "⚖",
    "title": "質量操作",
    "desc": "軽くなって移動し、重くなって接触攻撃を強化する構えを交互に使う。",
    "id": "plus",
    "name": "プラス",
    "realName": "プラス・ゼロ",
    "aliases": [
      "プラス",
      "プラス・ゼロ"
    ],
    "grade": "1",
    "height": 184,
    "club": "無所属",
    "position": "",
    "sourceAbility": "質量を変化させる",
    "summary": "記憶のない転校生。夢は、学園の全員と友達になること。",
    "stats": {
      "atk": 19,
      "hp": 1156,
      "speed": 5.4
    },
    "sourcePath": "characters-data/plus/profile.json"
  },
  {
    "icon": "🩹",
    "title": "接着",
    "desc": "敵の足と地面をくっつけて短く拘束する。",
    "id": "rindou",
    "name": "リンドウ",
    "realName": "リンドウ・フェアリル",
    "aliases": [
      "リンドウ",
      "リンドウ・フェアリル"
    ],
    "grade": "3",
    "height": 176,
    "club": "保健委員会",
    "position": "",
    "sourceAbility": "物と物をくっつける",
    "summary": "おしゃべりと軽いノリで評判を集め、治療の失敗はセレナに任せがちな保健委員会副会長。",
    "stats": {
      "atk": 26,
      "hp": 1424,
      "speed": 5.7
    },
    "sourcePath": "characters-data/rindou/profile.json"
  },
  {
    "icon": "❄",
    "title": "雪生成",
    "desc": "雪の床を広げ、敵の足取りを遅くする。",
    "id": "rokka",
    "name": "ロッカ",
    "realName": "垂氷六花",
    "aliases": [
      "ロッカ",
      "垂氷六花"
    ],
    "grade": "1",
    "height": 178,
    "club": "自由サークル",
    "position": "",
    "sourceAbility": "雪を作り出す",
    "summary": "面倒事を避け続けながら、最後には冷静な判断と雪で仲間を救う自由サークルの常識人。",
    "stats": {
      "atk": 19,
      "hp": 1132,
      "speed": 5.4
    },
    "sourcePath": "characters-data/rokka/profile.json"
  },
  {
    "icon": "🎒",
    "title": "無限収納",
    "desc": "常備した投擲道具・救急用品・盾を順に取り出す。生物は収納しない。",
    "id": "romanchi",
    "name": "ロマンチ",
    "realName": "ロマンチ・フランボワーズ",
    "aliases": [
      "ロマンチ",
      "ロマンチ・フランボワーズ"
    ],
    "grade": "3",
    "height": 183,
    "club": "令嬢サークル",
    "position": "",
    "sourceAbility": "無限収納のポケット",
    "summary": "無限のポケットと隙のない気配りで令嬢たちを支える、薔薇を携えた万能執事。",
    "stats": {
      "atk": 27,
      "hp": 1452,
      "speed": 5.7
    },
    "sourcePath": "characters-data/romanchi/profile.json"
  },
  {
    "icon": "🌑",
    "title": "影踏み封印",
    "desc": "近い敵の影を踏み、一定時間その能力を封印。",
    "id": "ruto",
    "name": "ルト",
    "realName": "ルト・カルメン",
    "aliases": [
      "ルト",
      "ルト・カルメン"
    ],
    "grade": "3",
    "height": 170,
    "club": "オカルト&昆虫サークル",
    "position": "オカルト部門部長",
    "sourceAbility": "影を踏んだ相手の能力を封じる",
    "summary": "裏山の夜に後輩を連れ出し、怪しい笑い声とともにUFOを待つオカルト部長。",
    "stats": {
      "atk": 26,
      "hp": 1400,
      "speed": 5.7
    },
    "sourcePath": "characters-data/ruto/profile.json"
  },
  {
    "icon": "⏱",
    "title": "正確な時刻",
    "desc": "攻撃間隔を正確に計り、接触攻撃の連打間隔を短くする。時間停止はしない。",
    "id": "sakuo",
    "name": "サクオ",
    "realName": "開押咲男",
    "aliases": [
      "サクオ",
      "開押咲男"
    ],
    "grade": "1",
    "height": 180,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "正確な時間が分かる",
    "summary": "正確な時刻と空疎な雑談を淡々と告げる、感情の読めない勉強サークル部員。",
    "stats": {
      "atk": 19,
      "hp": 1140,
      "speed": 5.4
    },
    "sourcePath": "characters-data/sakuo/profile.json"
  },
  {
    "icon": "⚕",
    "title": "傷による治癒",
    "desc": "医療技術で自身の傷へ処置して回復。4.5秒ごとに最大HPの10%回復し、継続ダメージを除く。",
    "id": "serena",
    "name": "セレナ",
    "realName": "セレナ・ミレイヌ",
    "aliases": [
      "セレナ",
      "セレナ・ミレイヌ"
    ],
    "grade": "5",
    "height": 186,
    "club": "保健委員会",
    "position": "保健委員会会長・生徒会役員",
    "sourceAbility": "傷を与えると傷が癒える",
    "summary": "確かな医療技術と優しい笑顔で生徒を治療する、善に優しく悪に厳しい保健委員会会長。",
    "stats": {
      "atk": 35.8,
      "hp": 1879,
      "speed": 6.2
    },
    "sourcePath": "characters-data/serena/profile.json"
  },
  {
    "icon": "🌧",
    "title": "雨雲生成",
    "desc": "雨雲の下の敵は足元が滑り、進行方向が乱れる。",
    "id": "shiika",
    "name": "シイカ",
    "realName": "江本詩歌",
    "aliases": [
      "シイカ",
      "江本詩歌"
    ],
    "grade": "1",
    "height": 162,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "雨雲をつくる",
    "summary": "雨の日を好み、どんな作業も自分のペースで丁寧に進める勉強サークルの天然少女。",
    "stats": {
      "atk": 17,
      "hp": 1068,
      "speed": 5.4
    },
    "sourcePath": "characters-data/shiika/profile.json"
  },
  {
    "icon": "🍶",
    "title": "酩酊",
    "desc": "敵を酔わせ、移動と攻撃の狙いを乱す。",
    "id": "sigma",
    "name": "シグマ",
    "realName": "シズマ・アビゲイル",
    "aliases": [
      "シグマ",
      "シズマ・アビゲイル"
    ],
    "grade": "3",
    "height": 177,
    "club": "未所属",
    "position": "",
    "sourceAbility": "人を酔わせられる",
    "summary": "マイナスの幸せだけを願い、今日も笑顔で付きまとう自称・運命の側近。",
    "stats": {
      "atk": 27,
      "hp": 1428,
      "speed": 5.7
    },
    "sourcePath": "characters-data/sigma/profile.json"
  },
  {
    "icon": "♻",
    "title": "一日一回の不死身",
    "desc": "一試合に一度だけ致命傷から全回復する。",
    "id": "soi",
    "name": "ソイ",
    "realName": "川井添",
    "aliases": [
      "ソイ",
      "川井添"
    ],
    "grade": "3",
    "height": 173,
    "club": "薬学サークル",
    "position": "薬学サークル部長",
    "sourceAbility": "一日一回の不死身",
    "summary": "優しすぎるがゆえに副部長の実験に付き合い、毎日不憫な目に遭う薬学サークル部長。",
    "stats": {
      "atk": 26,
      "hp": 1412,
      "speed": 5.7
    },
    "sourcePath": "characters-data/soi/profile.json"
  },
  {
    "icon": "◇",
    "title": "ガラス操作",
    "desc": "ガラス片を散射し、薄いガラスの盾を作る。",
    "id": "sunny",
    "name": "サニー",
    "realName": "サニー・レティシア",
    "aliases": [
      "サニー",
      "サニー・レティシア"
    ],
    "grade": "3",
    "height": 159,
    "club": "決闘委員会",
    "position": "",
    "sourceAbility": "ガラスを操る",
    "summary": "公平な審判役を務めながら、自らも星取りに熱くなる明るい決闘委員。",
    "stats": {
      "atk": 25,
      "hp": 1356,
      "speed": 5.7
    },
    "sourcePath": "characters-data/sunny/profile.json"
  },
  {
    "icon": "🙂",
    "title": "普通の状態",
    "desc": "HPが55%未満になると肉体と状態異常を健康な状態へ戻す。再使用10秒。HP0からの復活はしない。",
    "id": "tanaka",
    "name": "タナカ",
    "realName": "田中聖",
    "aliases": [
      "タナカ",
      "田中聖"
    ],
    "grade": "5",
    "height": 172,
    "club": "生活サークル",
    "position": "生活サークル部長／生徒会役員",
    "sourceAbility": "普通の状態になる",
    "summary": "何もしなくていい安全地帯を守り、弱い生徒の平穏を支える飄々とした生徒会役員。",
    "stats": {
      "atk": 26.5,
      "hp": 1041,
      "speed": 5.2
    },
    "sourcePath": "characters-data/tanaka/profile.json"
  },
  {
    "icon": "🦾",
    "title": "未来予知",
    "desc": "わずか先を読むことで回避率と会心率が高い。巨体の肉体も強力。",
    "id": "titan",
    "name": "タイタン",
    "realName": "アルバルク・シュタイン",
    "aliases": [
      "タイタン",
      "アルバルク・シュタイン"
    ],
    "grade": "5",
    "height": 220,
    "club": "ボディビルサークル",
    "position": "ボディビルサークル部長／生徒会役員",
    "sourceAbility": "未来を読む",
    "summary": "誰かを守る強さを掲げる豪快な兄貴分であり、学園を内側から見張る生徒会の巨漢。",
    "stats": {
      "atk": 42.6,
      "hp": 2381,
      "speed": 5.7
    },
    "sourcePath": "characters-data/titan/profile.json"
  },
  {
    "icon": "🔰",
    "title": "反射バリア",
    "desc": "一定量の盾を張り、盾で受け止めた能力ダメージの一部を相手へ返す。",
    "id": "torie",
    "name": "トリエ",
    "realName": "トリー・エドワード",
    "aliases": [
      "トリエ",
      "トリー・エドワード"
    ],
    "grade": "4",
    "height": 180,
    "club": "美術サークル",
    "position": "美術サークル副部長",
    "sourceAbility": "反射するバリアを張る",
    "summary": "ベレーの作品を無言で守り、その横顔をノートへ描き続ける美術サークルの寡黙な副部長。",
    "stats": {
      "atk": 31,
      "hp": 1590,
      "speed": 5.8
    },
    "sourcePath": "characters-data/torie/profile.json"
  },
  {
    "icon": "👁",
    "title": "視覚操作",
    "desc": "敵の視界を奪って狙いを乱し、その隙に近接の一撃。自身は透明化・幻覚を見抜く。",
    "id": "tsukichiyo",
    "name": "ツキチヨ",
    "realName": "月千詠七女",
    "aliases": [
      "ツキチヨ",
      "月千詠七女"
    ],
    "grade": "5",
    "height": 170,
    "club": "忍者サークル",
    "position": "忍者サークル部長／生徒会役員",
    "sourceAbility": "視覚を操る",
    "summary": "女帝への忠義を胸に、学園の秩序を影から守る盲目のくのいち。",
    "stats": {
      "atk": 58.5,
      "hp": 3141,
      "speed": 7.6
    },
    "sourcePath": "characters-data/tsukichiyo/profile.json"
  },
  {
    "icon": "🗝",
    "title": "解錠",
    "desc": "フィールドの補給箱を開けて道具の盾を得る。縄・金縛りを消す能力ではない。",
    "id": "tsukuri",
    "name": "ツクリ",
    "realName": "ツクリ・ハラペーニョ",
    "aliases": [
      "ツクリ",
      "ツクリ・ハラペーニョ"
    ],
    "grade": "1",
    "height": 157,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "鍵を開ける",
    "summary": "弱気でも安全確認は譲らない、ドーマを見守る合理派リアクション担当。",
    "stats": {
      "atk": 17,
      "hp": 1048,
      "speed": 5.4
    },
    "sourcePath": "characters-data/tsukuri/profile.json"
  },
  {
    "icon": "💬",
    "title": "物の声",
    "desc": "地面や道具から接近を聞き、通常攻撃を避けやすくする。",
    "id": "tsukuyomi",
    "name": "ツクヨミ",
    "realName": "七辻月詠",
    "aliases": [
      "ツクヨミ",
      "七辻月詠"
    ],
    "grade": "1",
    "height": 168,
    "club": "自由サークル",
    "position": "",
    "sourceAbility": "物を喋らせる",
    "summary": "仲間の笑顔を守るため自分を後回しにし、物の声まで聞き取る自由サークルの優しい弟分。",
    "stats": {
      "atk": 18,
      "hp": 1092,
      "speed": 5.4
    },
    "sourcePath": "characters-data/tsukuyomi/profile.json"
  },
  {
    "icon": "📢",
    "title": "言葉の現実化",
    "desc": "「止まれ」で近い敵を停止させ、「退け」で押し返す。",
    "id": "van",
    "name": "ヴァン",
    "realName": "ツヴァング・バベル",
    "aliases": [
      "ヴァン",
      "ツヴァング・バベル"
    ],
    "grade": "4",
    "height": 186,
    "club": "決闘委員会",
    "position": "",
    "sourceAbility": "言葉を現実にする",
    "summary": "規則と時間を守り、白熱しすぎた決闘を収める決闘委員会の厳格な副会長。",
    "stats": {
      "atk": 31,
      "hp": 1614,
      "speed": 5.8
    },
    "sourcePath": "characters-data/van/profile.json"
  },
  {
    "icon": "🦇",
    "title": "読心",
    "desc": "相手の攻撃意図を読んで接触攻撃を回避しやすくする。",
    "id": "vine",
    "name": "ヴァイン",
    "realName": "ノエル・ヴァインス",
    "aliases": [
      "ヴァイン",
      "ノエル・ヴァインス"
    ],
    "grade": "1",
    "height": 162,
    "club": "オカルト&昆虫サークル",
    "position": "",
    "sourceAbility": "相手の心を読む",
    "summary": "吸血鬼らしい威厳を夢見て、今日も決めポーズを研究する生真面目な中二病少女。",
    "stats": {
      "atk": 17,
      "hp": 1068,
      "speed": 5.4
    },
    "sourcePath": "characters-data/vine/profile.json"
  },
  {
    "icon": "📷",
    "title": "念写",
    "desc": "次の相手の姿を念写して追跡。透明化した相手にも狙いをつける。",
    "id": "wan",
    "name": "ワン",
    "realName": "ワン・ワンダー",
    "aliases": [
      "ワン",
      "ワン・ワンダー"
    ],
    "grade": "2",
    "height": 175,
    "club": "オカルト&昆虫サークル",
    "position": "",
    "sourceAbility": "念写",
    "summary": "変人ではなく普通だと言い張りながら、夜中の先輩たちを見捨てられない苦労人。",
    "stats": {
      "atk": 22,
      "hp": 1270,
      "speed": 5.5
    },
    "sourcePath": "characters-data/wan/profile.json"
  },
  {
    "icon": "🕳",
    "title": "落とし穴",
    "desc": "敵の足元に罠を設置。触れた敵を落として短時間停止させる。",
    "id": "will",
    "name": "ウィル",
    "realName": "ウィル・ブラウン",
    "aliases": [
      "ウィル",
      "ウィル・ブラウン"
    ],
    "grade": "3",
    "height": 173,
    "club": "決闘委員会",
    "position": "",
    "sourceAbility": "落とし穴をつくる",
    "summary": "公平な決闘運営を目指し、消えたGrade 0の生徒を案じ続ける心配性な審判員。",
    "stats": {
      "atk": 26,
      "hp": 1412,
      "speed": 5.7
    },
    "sourcePath": "characters-data/will/profile.json"
  },
  {
    "icon": "🔥",
    "title": "高温・低温操作",
    "desc": "広範囲の高温で継続ダメージ、低温で停止させる技を交互に使う。",
    "id": "x",
    "name": "X",
    "realName": "ゼクサー・リカルド",
    "aliases": [
      "X（エックス）",
      "ゼクサー・リカルド",
      "X",
      "エックス",
      "Ｘ",
      "x（エックス）"
    ],
    "grade": "5",
    "height": 180,
    "club": "勉強サークル",
    "position": "勉強サークル部長／生徒会役員",
    "sourceAbility": "低温と高温を操る",
    "summary": "天才を自負し、校則違反を見逃さないプライドの高い生徒会役員。",
    "stats": {
      "atk": 42.3,
      "hp": 2197,
      "speed": 6.0
    },
    "sourcePath": "characters-data/x/profile.json"
  },
  {
    "icon": "🌿",
    "title": "自然化",
    "desc": "自然の姿となり、短く攻撃をかわす。戻ると周囲へ枝を伸ばす。",
    "id": "yaoi",
    "name": "ヤオイ",
    "realName": "八百田いよ",
    "aliases": [
      "ヤオイ",
      "八百田いよ"
    ],
    "grade": "5",
    "height": 155,
    "club": "腐女子サークル",
    "position": "腐女子サークル部長",
    "sourceAbility": "自然と化す",
    "summary": "締め切りから逃げ続ける、なんだこいつなGrade 5の腐女子サークル部長。",
    "stats": {
      "atk": 36.9,
      "hp": 1859,
      "speed": 6.0
    },
    "sourcePath": "characters-data/yaoi/profile.json"
  },
  {
    "icon": "🟢",
    "title": "ゴム化",
    "desc": "接触衝撃を軽減し、殴った相手を強く弾き返す。",
    "id": "yayoi",
    "name": "ヤヨイ",
    "realName": "菊原弥生",
    "aliases": [
      "ヤヨイ",
      "菊原弥生"
    ],
    "grade": "1",
    "height": 160,
    "club": "勉強サークル",
    "position": "",
    "sourceAbility": "ゴムになる",
    "summary": "世話を焼かずにいられず、勉強サークルの全員を朝から叩き起こす真面目な一年生。",
    "stats": {
      "atk": 17,
      "hp": 1060,
      "speed": 5.4
    },
    "sourcePath": "characters-data/yayoi/profile.json"
  },
  {
    "icon": "🪽",
    "title": "飛行",
    "desc": "空へ上がって接触攻撃と地面の罠を避ける。射撃は当たる。",
    "id": "yuhi",
    "name": "ユーヒ",
    "realName": "夕陽みどり",
    "aliases": [
      "ユーヒ",
      "夕陽みどり"
    ],
    "grade": "3",
    "height": 170,
    "club": "新聞部",
    "position": "新聞部部長（編集長）",
    "sourceAbility": "空を飛ぶ",
    "summary": "噂も弱みも記事に変え、学園中へ飛ばす陽気なスクープ編集長。",
    "stats": {
      "atk": 26,
      "hp": 1400,
      "speed": 5.7
    },
    "sourcePath": "characters-data/yuhi/profile.json"
  },
  {
    "icon": "↗",
    "title": "空中の弾き",
    "desc": "近づいた弾を弾き返す。敵も短い斥力で押し返す。",
    "id": "yuji",
    "name": "ユージ",
    "realName": "盛岡友児",
    "aliases": [
      "ユージ",
      "盛岡友児"
    ],
    "grade": "1",
    "height": 175,
    "club": "コスプレサークル",
    "position": "",
    "sourceAbility": "空中でものを弾く",
    "summary": "プラスを案内する最初の友人。大声だけど弱気な常識人。",
    "stats": {
      "atk": 18,
      "hp": 1120,
      "speed": 5.4
    },
    "sourcePath": "characters-data/yuji/profile.json"
  },
  {
    "icon": "☁",
    "title": "綿生成",
    "desc": "綿の盾で接触衝撃を吸収し、綿の床で敵の移動を遅らせる。",
    "id": "yukimero",
    "name": "ゆきめろ",
    "realName": "鈴木雪江",
    "aliases": [
      "ゆきめろ",
      "鈴木雪江"
    ],
    "grade": "4",
    "height": 146,
    "club": "オタクサークル",
    "position": "",
    "sourceAbility": "手から綿を出す",
    "summary": "アニメキャラのような装いで皆から愛される、ローブを着ないオタサーの姫。",
    "stats": {
      "atk": 28,
      "hp": 1454,
      "speed": 5.8
    },
    "sourcePath": "characters-data/yukimero/profile.json"
  },
  {
    "icon": "🔮",
    "title": "幻覚",
    "desc": "幻を見せて敵の狙いと方向を乱し、その隙に攻撃する。",
    "id": "zenomura",
    "name": "ゼノムラ",
    "realName": "ゼノム・ポーカー",
    "aliases": [
      "ゼノムラ",
      "ゼノム・ポーカー"
    ],
    "grade": "4",
    "height": 171,
    "club": "なんでも屋サークル",
    "position": "なんでも屋サークル代表",
    "sourceAbility": "幻覚を見せる",
    "summary": "報酬次第で依頼を請け負い、学内の表も裏も渡り歩く、なんでも屋サークルの若き代表。",
    "stats": {
      "atk": 30,
      "hp": 1554,
      "speed": 5.8
    },
    "sourcePath": "characters-data/zenomura/profile.json"
  },
  {
    "icon": "⌛",
    "title": "年齢操作",
    "desc": "自身の年齢を変え、若く身軽な構えと成熟した耐久の構えを切り替える。相手には使わない。",
    "id": "zeta",
    "name": "ゼータ",
    "realName": "ゼータ・コメット",
    "aliases": [
      "ゼータ",
      "ゼータ・コメット"
    ],
    "grade": "1",
    "height": 157,
    "club": "アイドルグループ「S.O.Bright」",
    "position": "",
    "sourceAbility": "年齢を操る",
    "summary": "優しいお姉さんアイドルの笑顔の裏に、元マネージャーという秘密と人一倍の目立ちたがりを隠す新人メンバー。",
    "stats": {
      "atk": 17,
      "hp": 1048,
      "speed": 5.4
    },
    "sourcePath": "characters-data/zeta/profile.json"
  }
];
if(typeof module!=="undefined") module.exports=roster; else root.KASU_ROSTER=roster;
})(typeof globalThis!=="undefined"?globalThis:this);
