export const moods = ['☀️','🌤️','☁️','🌧️','🌙'];
export const regions = ['日本','韓国','台湾','アメリカ','カナダ','イギリス','フランス','ドイツ','オーストラリア','その他'];
export const items = ['🌷','🍋','🐈','🦋','🌻','🍒','paper-blue','paper-pink','🍮','🍩','🥐','🍙','☕','🫖','🍓','🍄','🐌','🐧','🦦','🐳','🌈','🪐','🌼','🎈'];
export function dayKey(now = new Date()) { return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo'}).format(now); }
export function checkDiary(value: unknown): string | null {
 if(typeof value !== 'string' || value.trim().length<10 || value.length>1000) return '日記は10〜1,000文字で書いてください。';
 const normalized=value.normalize('NFKC');
 if(/https?:\/\/|www\.|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\d\s()-]{8,}\d)|(?:LINE|ライン|インスタ|instagram|discord)\s*(?:ID|交換|:|：)|(?:住所|本名|電話番号)\s*(?:は|:|：)|(?:都|道|府|県).{0,15}(?:市|区|町).{0,20}\d/iu.test(normalized)) return '連絡先・住所・本名につながる情報を取り除いてください。';
 if(/死ね|殺すぞ|自殺しろ|kill yourself|i will kill you/iu.test(normalized)) return '相手を傷つける表現を見直してください。';
 return null;
}
