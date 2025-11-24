document.addEventListener('DOMContentLoaded', () => {
    const allWordListsData = [
        { 
            id: 'list1', 
            name: '初代 (赤/緑 No.1-151)', 
            words: [
                "フシギダネ","フシギソウ","フシギバナ","ヒトカゲ","リザード","リザードン","ゼニガメ","カメール","カメックス","キャタピー","トランセル","バタフリー","ビードル","コクーン","スピアー","ポッポ","ピジョン","ピジョット","コラッタ","ラッタ","オニスズメ","オニドリル","アーボ","アーボック","ピカチュウ","ライチュウ","サンド","サンドパン","ニドリーナ","ニドクイン","ニドリーノ","ニドキング","ピッピ","ピクシー","ロコン","キュウコン","プリン","プクリン","ズバット","ゴルバット","ナゾノクサ","クサイハナ","ラフレシア","パラス","パラセクト","コンパン","モルフォン","ディグダ","ダグトリオ","ニャース","ペルシアン","コダック","ゴルダック","マンキー","オコリザル","ガーディ","ウインディ","ニョロモ","ニョロゾ","ニョロボン","ケーシィ","ユンゲラー","フーディン","ワンリキー","ゴーリキー","カイリキー","マダツボミ","ウツドン","ウツボット","メノクラゲ","ドククラゲ","イシツブテ","ゴローン","ゴローニャ","ポニータ","ギャロップ","ヤドン","ヤドラン","コイル","レアコイル","カモネギ","ドードー","ドードリオ","パウワウ","ジュゴン","ベトベター","ベトベトン","シェルダー","パルシェン","ゴース","ゴースト","ゲンガー","イワーク","スリープ","スリーパー","クラブ","キングラー","ビリリダマ","マルマイン","タマタマ","ナッシー","カラカラ","ガラガラ","サワムラー","エビワラー","ベロリンガ","ドガース","マタドガス","サイホーン","サイドン","ラッキー","モンジャラ","ガルーラ","タッツー","シードラ","トサキント","アズマオウ","ヒトデマン","スターミー","バリヤード","ストライク","ルージュラ","エレブー","ブーバー","カイロス","ケンタロス","コイキング","ギャラドス","ラプラス","メタモン","イーブイ","シャワーズ","サンダース","ブースター","ポリゴン","オムナイト","オムスター","カブト","カブトプス","プテラ","カビゴン","フリーザー","サンダー","ファイヤー","ミニリュウ","ハクリュー","カイリュー","ミュウツー","ミュウ"
            ] 
        },
        { 
            id: 'list2', 
            name: '2代目 (金/銀 No.152-251)', 
            words: ["チコリータ","ベイリーフ","メガニウム","ヒノアラシ","マグマラシ","バクフーン","ワニノコ","アリゲイツ","オーダイル","オタチ","オオタチ","ホーホー","ヨルノズク","レディバ","レディアン","イトマル","アリアドス","クロバット","チョンチー","ランターン","ピチュー","ピィ","ププリン","トゲピー","トゲチック","ネイティ","ネイティオ","メリープ","モココ","デンリュウ","キレイハナ","マリル","マリルリ","ウソッキー","ニョロトノ","ハネッコ","ポポッコ","ワタッコ","エイパム","ヒマナッツ","キマワリ","ヤンヤンマ","ウパー","ヌオー","エーフィ","ブラッキー","ヤミカラス","ヤドキング","ムウマ","アンノーン","ソーナンス","キリンリキ","クヌギダマ","フォレトス","ノコッチ","グライガー","ハガネール","ブルー","グランブル","ハリーセン","ハッサム","ツボツボ","ヘラクロス","ニューラ","ヒメグマ","リングマ","マグマッグ","マグカルゴ","ウリムー","イノムー","サニーゴ","テッポウオ","オクタン","デリバード","マンタイン","エアームド","デルビル","ヘルガー","キングドラ","ゴマゾウ","ドンファン","ポリゴン2","オドシシ","ドーブル","バルキー","カポエラー","ムチュール","エレキッド","ブビィ","ミルタンク","ハピナス","ライコウ","エンテイ","スイクン","ヨーギラス","サナギラス","バンギラス","ルギア","ホウオウ","セレビィ"]
        },
        { 
            id: 'list3', 
            name: '3代目 (R/S/E No.252-386)', 
            words: ["キモリ","ジュプトル","ジュカイン","アチャモ","ワカシャモ","バシャーモ","ミズゴロウ","ヌマクロー","ラグラージ","ポチエナ","グラエナ","ジグザグマ","マッスグマ","ケムッソ","カラサリス","アゲハント","マユルド","ドクケイル","ハスボー","ハスブレロ","ルンパッパ","タネボー","コノハナ","ダーテング","スバメ","オオスバメ","キャモメ","ペリッパー","ラルトス","キルリア","サーナイト","アメタマ","アメモース","キノココ","キノガッサ","ナマケロ","ヤルキモノ","ケッキング","ツチニン","テッカニン","ヌケニン","ゴニョニョ","ドゴーム","バクオング","マクノシタ","ハリテヤマ","ルリリ","ノズパス","エネコ","エネコロロ","ヤミラミ","クチート","ココドラ","コドラ","ボスゴドラ","アサナン","チャーレム","ラクライ","ライボルト","プラスル","マイナン","バルビート","イルミーゼ","ロゼリア","ゴクリン","マルノーム","キバニア","サメハダー","ホエルコ","ホエルオー","ドンメル","バクーダ","コータス","バネブー","ブーピッグ","パッチール","ナックラー","ビブラーバ","フライゴン","サボネア","ノクタス","チルット","チルタリス","ザングース","ハブネーク","ルナトーン","ソルロック","ドジョッチ","ナマズン","ヘイガニ","シザリガー","ヤジロン","ネンドール","リリーラ","ユレイドル","アノプス","アーマルド","ヒンバス","ミロカロス","ポワルン","カクレオン","カゲボウズ","ジュペッタ","ヨマワル","サマヨール","トロピウス","チリーン","アブソル","ソーナノ","ユキワラシ","オニゴーリ","タマザラシ","トドグラー","トドゼルガ","パールル","ハンテール","サクラビス","ジーランス","ラブカス","タツベイ","コモルー","ボーマンダ","ダンバル","メタング","メタグロス","レジロック","レジアイス","レジスチル","ラティアス","ラティオス","カイオーガ","グラードン","レックウザ","ジラーチ","デオキシス"]
        },
        { 
            id: 'list4', 
            name: '4代目 (D/P/Pt No.387-493)', 
            words: ["ナエトル","ハヤシガメ","ドダイトス","ヒコザル","モウカザル","ゴウカザル","ポッチャマ","ポッタイシ","エンペルト","ムックル","ムクバード","ムクホーク","ビッパ","ビーダル","コロボーシ","コロトック","コリンク","ルクシオ","レントラー","スボミー","ロズレイド","ズガイドス","ラムパルド","タテトプス","トリデプス","ミノムッチ","ミノマダム","ガーメイル","ミツハニー","ビークイン","パチリス","ブイゼル","フローゼル","チェリンボ","チェリム","カラナクシ","トリトドン","エテボース","フワンテ","フワライド","ミミロル","ミミロップ","ムウマージ","ドンカラス","ニャルマー","ブニャット","リーシャン","スカンプー","スカタンク","ドーミラー","ドータクン","ウソハチ","マネネ","ピンプク","ペラップ","ミカルゲ","フカマル","ガバイト","ガブリアス","ゴンベ","リオル","ルカリオ","ヒポポタス","カバルドン","スコルピ","ドラピオン","グレッグル","ドクロッグ","マスキッパ","ケイコウオ","ネオラント","タマンタ","ユキカブリ","ユキノオー","マニューラ","ジバコイル","ベロベルト","ドサイドン","モジャンボ","エレキブル","ブーバーン","トゲキッス","メガヤンマ","リーフィア","グレイシア","グライオン","マンムー","ポリゴンZ","エルレイド","ダイノーズ","ヨノワール","ユキメノコ","ロトム","ユクシー","エムリット","アグノム","ディアルガ","パルキア","ヒードラン","レジギガス","ギラティナ","クレセリア","フィオネ","マナフィ","ダークライ","シェイミ","アルセウス","ビクティニ"]
        },
        { 
            id: 'list5', 
            name: '5代目以降 (No.494- )', 
            words: ["ツタージャ","ジャノビー","ジャローダ","ポカブ","チャオブー","エンブオー","ミジュマル","フタチマル","ダイケンキ","ミネズミ","ミルホッグ","ヨーテリー","ハーデリア","ムーランド","チョロネコ","レパルダス","ヤナップ","ヤナッキー","バオップ","バオッキー","ヒヤップ","ヒヤッキー","ムンナ","ムシャーナ","マメパト","ハトーボー","ケンホロウ","シママ","ゼブライカ","ダンゴロ","ガントル","ギガイアス","コロモリ","ココロモリ","モグリュー","ドリュウズ","タブンネ","ドッコラー","ドテッコツ","ローブシン","オタマロ","ガマガル","ガマゲロゲ","ナゲキ","ダゲキ","クルミル","クルマユ","ハハコモリ","フシデ","ホイーガ","ペンドラー","モンメン","エルフーン","チュリネ","ドレディア","バスラオ","メグロコ","ワルビル","ワルビアル","ダルマッカ","ヒヒダルマ","マラカッチ","イシズマイ","イワパレス","ズルッグ","ズルズキン","シンボラー","デスマス","デスカーン","プロトーガ","アバゴーラ","アーケン","アーケオス","ヤブクロン","ダストダス","ゾロア","ゾロアーク","チラーミィ","チラチーノ","ゴチム","ゴチミル","ゴチルゼル","ユニラン","ダブラン","ランクルス","コアルヒー","スワンナ","バニプッチ","バニリッチ","バイバニラ","シキジカ","メブキジカ","エモンガ","カブルモ","シュバルゴ","タマゲタケ","モロバレル","プルリル","ブルンゲル","ママンボウ","バチュル","デンチュラ","テッシード","ナットレイ","ギアル","ギギアル","ギギギアル","シビシラス","シビビール","シビルドン","リグレー","オーベム","ヒトモシ","ランプラー","シャンデラ","キバゴ","オノンド","オノノクス","クマシュン","ツンベアー","フリージオ","チョボマキ","アギルダー","マッギョ","コジョフー","コジョンド","クリムガン","ゴビット","ゴルーグ","コマタナ","キリキザン","バッフロン","ワシボン","ウォーグル","バルチャイ","バルジーナ","クイタラン","アイアント","モノズ","ジヘッド","サザンドラ","メラルバ","ウルガモス","コバルオン","テラキオン","ビリジオン","トルネロス","ボルトロス","レシラム","ゼクロム","ランドロス","キュレム","ケルディオ","メロエッタ","ゲノセクト","ハリマロン","ハリボーグ","ブリガロン","フォッコ","テールナー","マフォクシー","ケロマツ","ゲコガシラ","ゲッコウガ","ホルビー","ホルード","ヤヤコマ","ヒノヤコマ","ファイアロー","コフキムシ","コフーライ","ビビヨン","シシコ","カエンジシ","フラベベ","フラエッテ","フラージェス","メェークル","ゴーゴート","ヤンチャム","ゴロンダ","トリミアン","ニャスパー","ニャオニクス","ヒトツキ","ニダンギル","ギルガルド","シュシュプ","フレフワン","ペロッパフ","ペロリーム","マーイーカ","カラマネロ","カメテテ","ガメノデス","クズモー","ドラミドロ","ウデッポウ","ブロスター","エリキテル","エレザード","チゴラス","ガチゴラス","アマルス","アマルルガ","ニンフィア","ルチャブル","デデンネ","メレシー","ヌメラ","ヌメイル","ヌメルゴン","クレッフィ","ボクレー","オーロット","バケッチャ","パンプジン","カチコール","クレベース","オンバット","オンバーン","ゼルネアス","イベルタル","ジガルデ","ディアンシー","フーパ","ボルケニオン","モクロー","フクスロー","ジュナイパー","ニャビー","ニャヒート","ガオガエン","アシマリ","オシャマリ","アシレーヌ","ツツケラ","ケララッパ","ドデカバシ","ヤングース","デカグース","アゴジムシ","デンヂムシ","クワガノン","マケンカニ","ケケンカニ","オドリドリ","アブリー","アブリボン","イワンコ","ルガルガン","ヨワシ","ヒドイデ","ドヒドイデ","ドロバンコ","バンバドロ","シズクモ","オニシズクモ","カリキリ","ラランテス","ネマシュ","マシェード","ヤトウモリ","エンニュート","ヌイコグマ","キテルグマ","アマカジ","アママイコ","アマージョ","キュワワー","ヤレユータン","ナゲツケサル","コソクムシ","グソクムシャ","スナバァ","シロデスナ","ナマコブシ","シルヴァディ","メテノ","ネッコアラ","バクガメス","トゲデマル","ミミッキュ","ハギギシリ","ジジーロン","ダダリン","ジャラコ","ジャランゴ","ジャラランガ","カプ・コケコ","カプ・テテフ","カプ・ブルル","カプ・レヒレ","コスモッグ","コスモウム","ソルガレオ","ルナアーラ","ウツロイド","マッシブーン","フェローチェ","デンジュモク","テッカグヤ","カミツルギ","アクジキング","ネクロズマ","マギアナ","マーシャドー","ベベノム","アーゴヨン","ツンデツンデ","ズガドーン","ゼラオラ","メルタン","メルメタル","サルノリ","バチンキー","ゴリランダー","ヒバニー","ラビフット","エースバーン","メッソン","ジメレオン","インテレオン","ホシガリス","ヨクバリス","ココガラ","アオガラス","アーマーガア","サッチムシ","レドームシ","イオルブ","クスネ","フォクスライ","ヒメンカ","ワタシラガ","ウールー","バイウールー","カムカメ","カジリガメ","ワンパチ","パルスワン","タンドン","トロッゴン","セキタンザン","カジッチュ","アップリュー","タルップル","スナヘビ","サダイジャ","ウッウ","サシカマス","カマスジョー","エレズン","ストリンダー","ヤクデ","マルヤクデ","タタッコ","オトスパス","ヤバチャ","ポットデス","ミブリム","テブリム","ブリムオン","ベロバー","ギモー","オーロンゲ","タチフサグマ","ニャイキング","サニゴーン","ネギガナイト","バリコオル","デスバーン","マホミル","マホイップ","タイレーツ","バチンウニ","ユキハミ","モスノウ","イシヘンジン","コオリッポ","イエッサン","モルペコ","ゾウドウ","ダイオウドウ","パッチラゴン","パッチルドン","ウオノラゴン","ウオチルドン","ジュラルドン","ドラメシヤ","ドロンチ","ドラパルト","ザシアン","ザマゼンタ","ムゲンダイナ","ダクマ","ウーラオス","ザルード","レジエレキ","レジドラゴ","ブリザポス","レイスポス","バドレックス","アヤシシ","バサギリ","ガチグマ","イダイトウ","オオニューラ","ハリーマン","ラブトロス","ニャオハ","ニャローテ","マスカーニャ","ホゲータ","アチゲータ","ラウドボーン","クワッス","ウェルカモ","ウェーニバル","グルトン","パフュートン","タマンチュラ","ワナイダー","マメバッタ","エクスレッグ","パモ","パモット","パーモット","ワッカネズミ","イッカネズミ","パピモッチ","バウッツェル","ミニーブ","オリーニョ","オリーヴァ","イキリンコ","コジオ","ジオヅム","キョジオーン","カルボウ","グレンアルマ","ソウブレイズ","ズピカ","ハラバリー","カイデン","タイカイデン","オラチフ","マフィティフ","シルシュルー","タギングル","アノクサ","アノホラグサ","ノノクラゲ","リククラゲ","ガケガニ","カプサイジ","スコヴィラン","シガロコ","ベラカス","ヒラヒナ","クエスパトラ","カヌチャン","ナカヌチャン","デカヌチャン","ウミディグダ","ウミトリオ","オトシドリ","ナミイルカ","イルカマン","ブロロン","ブロロローム","モトトカゲ","ミミズズ","キラーメ","キラフロル","ボチ","ハカドッグ","カラミンゴ","アルクジラ","ハルクジラ","ミガルーサ","ヘイラッシャ","シャリタツ","コノヨザル","ドオー","リキキリン","ノココッチ","ドドゲザン","イダイナキバ","サケブシッポ","アラブルタケ","ハバタクカミ","チヲハウハネ","スナノケガワ","テツノワダチ","テツノツツミ","テツノカイナ","テツノコウベ","テツノドクガ","テツノイバラ","セビエ","セゴール","セグレイブ","コレクレー","サーフゴー","チオンジェン","パオジアン","ディンルー","イーユイ","トドロクツキ","テツノブジン","コライドン","ミライドン","ウネルミナモ","テツノイサハ","カミッチュ","チャデス","ヤバソチャ","イイネイヌ","マシマシラ","キチキギス","オーガポン","ブリジュラス","カミツオロチ","ウガツホムラ","タケルライコ","テツノイワオ","テツノカシラ","テラパゴス","モモワロウ"]
        }
    ];

    const mixCountSelect = document.getElementById('mix-count');
    const startButton = document.getElementById('start-button');
    const seedInput = document.getElementById('seed-input');
    const generateSeedButton = document.getElementById('generate-seed-button');
    const wordListCheckboxesContainer = document.getElementById('word-list-checkboxes');
    const shareLinkArea = document.getElementById('share-link-area');
    const problemArea = document.getElementById('problem-area');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const giveUpButton = document.getElementById('give-up-button');
    const correctAnswersArea = document.getElementById('correct-answers-area');
    const clearMessageArea = document.getElementById('clear-message-area');
    const timeElapsedDisplay = document.getElementById('time-elapsed');

    let selectedWords = [];
    let problemCharacters = [];
    let foundWords = [];
    let timerInterval = null;
    let secondsElapsed = 0;
    let giveUpUsed = false;
    let targetTime = 0;
    let currentPrng = Math.random;

    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash;
    }

    function createPRNG(seedStr) {
        let seed = simpleHash(seedStr.toString());
        return function() {
            seed ^= seed << 13;
            seed ^= seed >> 17;
            seed ^= seed << 5;
            return (seed >>> 0) / 4294967296;
        };
    }

    function generateRandomSeedString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }

    function hiraganaToKatakana(str) {
        return str.replace(/[\u3041-\u3096]/g, match =>
            String.fromCharCode(match.charCodeAt(0) + 0x60)
        );
    }

    function shuffleArray(array, prngFunc) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(prngFunc() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function updateProblemDisplay() {
        problemArea.innerHTML = problemCharacters.map(pc => {
            let color = '#333';
            let fontWeight = 'normal';
            if (pc.isGivenUp) {
                color = '#FF69B4';
                fontWeight = 'bold';
            } else if (pc.found) {
                color = '#32CD32';
                fontWeight = 'bold';
            }
            return `<span style="color: ${color}; font-weight: ${fontWeight};">${pc.char}</span>`;
        }).join('');
    }

    function startTimer() {
        stopTimer();
        secondsElapsed = 0;
        timeElapsedDisplay.textContent = secondsElapsed;
        timerInterval = setInterval(() => {
            secondsElapsed++;
            timeElapsedDisplay.textContent = secondsElapsed;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }
    
    // 単語リストのチェックボックスを生成
    function populateWordListCheckboxes() {
        allWordListsData.forEach(listData => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = listData.id;
            checkbox.value = listData.id;
            checkbox.name = 'wordlist';
            // デフォルトで初代リストをチェック状態にする
            if (listData.id === 'list1') {
                checkbox.checked = true;
            }
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(listData.name));
            wordListCheckboxesContainer.appendChild(label);
        });
    }

    function initializeGameControls() {
        mixCountSelect.innerHTML = '';
        // 「混ぜる数」の最大値は固定で10。実際の単語数はstartGameでチェック
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            mixCountSelect.appendChild(option);
        }
        // URLパラメータからcountが設定されていなければデフォルト3
        if (!new URLSearchParams(window.location.search).has('count')) {
             mixCountSelect.value = "3";
        }


        problemArea.textContent = "使用リストと「混ぜる数」を選んでスタートしてください。";
        startButton.disabled = false;
        answerInput.disabled = true;
        submitButton.disabled = true;
        giveUpButton.disabled = true;
        timeElapsedDisplay.textContent = "0";
        clearMessageArea.textContent = "";
        clearMessageArea.className = '';
        shareLinkArea.textContent = "";
    }

    function getSelectedWordLists() {
        const selectedLists = [];
        wordListCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            const listData = allWordListsData.find(list => list.id === checkbox.value);
            if (listData) {
                selectedLists.push(...listData.words);
            }
        });
        return selectedLists.map(word => hiraganaToKatakana(word.trim())).filter(word => word.length > 0);
    }
    
    function updateShareLink(seed, count, listIds) {
        const params = new URLSearchParams();
        if (seed) params.append('seed', seed);
        if (count) params.append('count', count);
        if (listIds && listIds.length > 0) params.append('lists', listIds.join(','));
        
        const shareableLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        shareLinkArea.innerHTML = `この問題の共有リンク: <a href="${shareableLink}" target="_blank" rel="noopener noreferrer">${shareableLink}</a>`;
    }


    function startGame() {
        const activeWordList = getSelectedWordLists();

        if (activeWordList.length === 0) {
            problemArea.textContent = '出題範囲を1つ以上選択してください。';
            startButton.disabled = false; // スタートボタンは再度押せるように
            answerInput.disabled = true;
            submitButton.disabled = true;
            giveUpButton.disabled = true;
            return;
        }

        let currentSeed = seedInput.value.trim();
        if (!currentSeed) {
            currentSeed = generateRandomSeedString();
            seedInput.value = currentSeed;
        }
        currentPrng = createPRNG(currentSeed);

        const count = parseInt(mixCountSelect.value);
        targetTime = count * 10;
        
        const selectedListIds = Array.from(wordListCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        updateShareLink(currentSeed, count, selectedListIds);
        
        selectedWords = [];
        foundWords = [];
        problemCharacters = [];
        giveUpUsed = false;
        
        correctAnswersArea.innerHTML = '';
        clearMessageArea.textContent = '';
        clearMessageArea.className = '';
        answerInput.value = '';

        const shuffledActiveWordList = shuffleArray(activeWordList, currentPrng);
        selectedWords = shuffledActiveWordList.slice(0, Math.min(count, activeWordList.length));

        if (selectedWords.length === 0) {
            problemArea.textContent = '選択されたリストから単語を選べませんでした（単語数が少ないか、混ぜる数が0です）。';
            answerInput.disabled = true;
            submitButton.disabled = true;
            giveUpButton.disabled = true;
            return;
        }
        // 実際に選ばれた単語数で「混ぜる数」の表示を更新しても良いが、今回はそのまま
        // mixCountSelect.value = selectedWords.length; // ←これをやると、URLパラメータと齟齬が出る可能性

        let combinedCharsArray = selectedWords.join('').split('');
        combinedCharsArray = shuffleArray(combinedCharsArray, currentPrng);
        
        problemCharacters = combinedCharsArray.map(char => ({ char: char, found: false, isGivenUp: false }));

        updateProblemDisplay();
        startTimer();
        answerInput.disabled = false;
        submitButton.disabled = false;
        giveUpButton.disabled = (selectedWords.length === 0);
        answerInput.focus();
    }

    function checkAnswer() {
        const rawAnswer = answerInput.value.trim();
        if (!rawAnswer || answerInput.disabled) return;
        const answer = hiraganaToKatakana(rawAnswer);
        if (selectedWords.includes(answer) && !foundWords.includes(answer)) {
            foundWords.push(answer);
            const newCorrectDiv = document.createElement('div');
            newCorrectDiv.textContent = `正解： ${answer}`;
            correctAnswersArea.appendChild(newCorrectDiv);
            let charsOfAnswerToFind = answer.split('');
            for (let i = 0; i < problemCharacters.length; i++) {
                if (!problemCharacters[i].found) {
                    const charIndexInAnswer = charsOfAnswerToFind.indexOf(problemCharacters[i].char);
                    if (charIndexInAnswer !== -1) {
                        problemCharacters[i].found = true;
                        problemCharacters[i].isGivenUp = false; 
                        charsOfAnswerToFind.splice(charIndexInAnswer, 1);
                        if (charsOfAnswerToFind.length === 0) break; 
                    }
                }
            }
            updateProblemDisplay();
            checkGameClear();
        }
        answerInput.value = '';
        answerInput.focus();
    }

    function handleGiveUp() {
        if (giveUpButton.disabled) return;
        giveUpUsed = true;
        const unFoundWords = selectedWords.filter(word => !foundWords.includes(word));
        if (unFoundWords.length > 0) {
            const wordToReveal = unFoundWords[0]; 
            foundWords.push(wordToReveal);
            const newCorrectDiv = document.createElement('div');
            newCorrectDiv.textContent = `ギブアップ： ${wordToReveal}`;
            newCorrectDiv.classList.add('given-up');
            correctAnswersArea.appendChild(newCorrectDiv);
            let charsOfWordToReveal = wordToReveal.split('');
            for (let i = 0; i < problemCharacters.length; i++) {
                if (!problemCharacters[i].found && !problemCharacters[i].isGivenUp) {
                    const charIndexInReveal = charsOfWordToReveal.indexOf(problemCharacters[i].char);
                    if (charIndexInReveal !== -1) {
                        problemCharacters[i].found = true; 
                        problemCharacters[i].isGivenUp = true; 
                        charsOfWordToReveal.splice(charIndexInReveal, 1);
                        if (charsOfWordToReveal.length === 0) break;
                    }
                }
            }
            updateProblemDisplay();
            checkGameClear();
        }
        if (selectedWords.filter(word => !foundWords.includes(word)).length === 0) {
            giveUpButton.disabled = true;
        }
    }

    function checkGameClear() {
        if (foundWords.length === selectedWords.length && selectedWords.length > 0) { // selectedWords.length > 0 を追加
            stopTimer();
            answerInput.disabled = true;
            submitButton.disabled = true;
            giveUpButton.disabled = true;
            if (giveUpUsed) {
                clearMessageArea.textContent = 'クリア！目指せ全正解！';
                clearMessageArea.className = 'give-up-clear';
            } else if (secondsElapsed <= targetTime) {
                clearMessageArea.textContent = '👑スピードクリア！おめでとうございます！👑';
                clearMessageArea.className = 'speed-clear';
            } else {
                clearMessageArea.textContent = '🎉クリア！おめでとうございます！🎉';
                clearMessageArea.className = '';
            }
        }
    }

    function loadStateFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const seedFromUrl = urlParams.get('seed');
        if (seedFromUrl) {
            seedInput.value = decodeURIComponent(seedFromUrl);
        }
        const countFromUrl = urlParams.get('count');
        if (countFromUrl && mixCountSelect.querySelector(`option[value="${countFromUrl}"]`)) {
            mixCountSelect.value = countFromUrl;
        }
        const listsFromUrl = urlParams.get('lists');
        if (listsFromUrl) {
            const listIdsFromUrl = listsFromUrl.split(',');
            // 一旦全てのチェックを外し、URLで指定されたものだけをチェックする
            wordListCheckboxesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            listIdsFromUrl.forEach(listId => {
                const checkbox = document.getElementById(listId);
                if (checkbox) checkbox.checked = true;
            });
        } else {
            // URLにlistsパラメータがない場合、デフォルト（初代のみ）をチェック
            const defaultCheckbox = document.getElementById('list1');
            if (defaultCheckbox) defaultCheckbox.checked = true;
        }
    }

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkAnswer);
    giveUpButton.addEventListener('click', handleGiveUp);
    generateSeedButton.addEventListener('click', () => {
        seedInput.value = generateRandomSeedString();
    });
    answerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !answerInput.disabled) {
            checkAnswer();
        }
    });
    
    // チェックボックスや混ぜる数が変更されたら共有リンクを更新する(任意、今回はスタート時に更新)
    // [mixCountSelect, ...wordListCheckboxesContainer.querySelectorAll('input[type="checkbox"]')].forEach(el => {
    //     el.addEventListener('change', () => {
    //         const currentSeed = seedInput.value.trim();
    //         const count = parseInt(mixCountSelect.value);
    //         const selectedListIds = Array.from(wordListCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    //         updateShareLink(currentSeed, count, selectedListIds); // リアルタイム更新用
    //     });
    // });


    populateWordListCheckboxes(); // チェックボックスを生成
    initializeGameControls();   // UIコントロールを初期化
    loadStateFromUrl();         // URLから状態を復元
});