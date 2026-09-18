const countryNames = new Intl.DisplayNames(['ja'], {type:'region', fallback:'none'});
export function requestCountry(req:Request):string {
 const code=(req as Request & {cf?:{country?:unknown}}).cf?.country;
 if(typeof code!=='string'||!/^[A-Z]{2}$/.test(code)||['XX','T1','ZZ'].includes(code))return 'どこか';
 try{return countryNames.of(code)||'どこか';}catch{return 'どこか';}
}
