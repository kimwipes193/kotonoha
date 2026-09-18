export const fonts = [{id:'sans',name:'いつもの丸ゴシック'},{id:'serif',name:'お手紙の明朝体'},{id:'mono',name:'タイプライター'}];
export const stickerNames:Record<string,string>={'🌷':'チューリップ','🍋':'小さなレモン','🐈':'おさんぽねこ','🦋':'青いちょうちょ','🌻':'ひまわり','🍒':'さくらんぼ','🍮':'ぷるぷるプリン','🍩':'穴までおいしい','🥐':'寝ぐせクロワッサン','🍙':'おにぎり休憩','☕':'ひと息コーヒー','🫖':'お茶にしましょう','🍓':'いちごのごきげん','🍄':'きのこの秘密基地','🐌':'急がない便','🐧':'ぺんぎん係長','🦦':'らっこの休日','🐳':'くじらのお便り','🌈':'雨あがり','🪐':'土星旅行','🌼':'小さな花','🎈':'ふわふわ風船','paper-blue':'空色の便箋','paper-pink':'桃色の便箋','🐾':'ぽすとの肉球印','💌':'はじめてのお便り','🏅':'交換の達人','🎀':'収集家のリボン'};
export const specialItems=['🐾','💌','🏅','🎀'];
export const challenges=[
 {id:'pet5',name:'名誉なで係',description:'ぽすとを累計5回なでる',stat:'pets',goal:5,icon:'🐈'},
 {id:'pet100',name:'猫の手も、とろける',description:'ぽすとを累計100回なでる',stat:'pets',goal:100,icon:'🐾'},
 {id:'pet1000',name:'肉球の理解者',description:'ぽすとを累計1,000回なでる',stat:'pets',goal:1000,icon:'👑'},
 {id:'sent1',name:'はじめの一筆',description:'日記を1通送る',stat:'sent',goal:1,icon:'✍️',reward:'💌'},
 {id:'sent7',name:'一週間ぶんのあなた',description:'日記を累計7通送る（連続でなくてもOK）',stat:'sent',goal:7,icon:'📮'},
 {id:'sent30',name:'ことばの常連さん',description:'日記を累計30通送る',stat:'sent',goal:30,icon:'📚'},
 {id:'exchange1',name:'はじめましての配達',description:'誰かの日記を1通受け取る',stat:'exchanges',goal:1,icon:'✉️'},
 {id:'exchange10',name:'十人十色の旅人',description:'誰かの日記を累計10通受け取る',stat:'exchanges',goal:10,icon:'🧳'},
 {id:'exchange100',name:'百通りのこころ',description:'誰かの日記を累計100通受け取る',stat:'exchanges',goal:100,icon:'🏅',reward:'🏅'},
 {id:'stickers10',name:'引き出しの収集家',description:'ステッカーを10種類集める（便箋を除く）',stat:'stickers',goal:10,icon:'🎀',reward:'🎀'},
 {id:'stickers20',name:'小さな博物館の館長',description:'ステッカーを20種類集める（便箋を除く）',stat:'stickers',goal:20,icon:'🏛️'},
 {id:'react10',name:'そっと拍手を送る人',description:'10通の日記にリアクションする',stat:'reactions',goal:10,icon:'🤍'},
 {id:'regions3',name:'国境をこえる便り',description:'3つの国・地域から日記を受け取る',stat:'regions',goal:3,icon:'🌏'},
] as const;
export type ProgressStats={pets:number;weeklyPets:number;sent:number;exchanges:number;stickers:number;reactions:number;regions:number};
export type Progress={stats:ProgressStats;titles:{id:string;earned:number}[];week:string;weeklyClaimed:boolean};
export function weekKey(now=new Date()) {const d=new Date(now.getTime()+9*3600000);d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return d.toISOString().slice(0,10);}
