import assert from 'node:assert/strict';
import {transformSync} from 'esbuild';
import {readFileSync,writeFileSync,unlinkSync} from 'node:fs';
import {createElement,Children} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ts from 'typescript';
const output=new URL('./.language-test.tmp.mjs',import.meta.url);
try{
 const source=['lib/messages.ts','lib/rewards.ts','app/language.tsx'].map(p=>readFileSync(p,'utf8').replace(/^import .* from ['"]@\/lib\/messages['"];$/gm,'').replace("import legalMessages from './legal-messages.json';",'const legalMessages='+readFileSync('lib/legal-messages.json','utf8')+';')).join('\n');
 writeFileSync(output,transformSync(source,{loader:'tsx',format:'esm',jsx:'automatic'}).code);
 const {messages,locales,translate,detectLocale,validLocale,localizeTree,countryName,stickerNames,challenges}=await import(output.href);
 for(const [key,values] of Object.entries(messages)){assert.equal(values.length,4,key);assert.ok(values.every(v=>v.trim().length>0),key);for(const locale of locales)assert.ok(translate(key,locale).length>0,key);}
 assert.equal(detectLocale(['fr-CA','en']),'fr');assert.equal(detectLocale(['zh-TW']),'zh-CN');assert.equal(detectLocale(['de','ko-KR']),'ko');assert.equal(detectLocale(['de']),'en');assert.equal(validLocale('invalid'),false);
 for(const locale of locales){
  const pageTitle=createElement(function PageTitle(){return null;},{headingKey:'きょうの日記'});
  assert.equal(localizeTree(pageTitle,locale).props.headingKey,'きょうの日記','semantic heading key must not be translated');
  const draft='今日の日記';
  const view=createElement('section',null,createElement('h1',null,'今日の日記'),createElement('p',{'data-i18n-skip':true},draft),createElement('textarea',{defaultValue:draft,placeholder:'今日の日記'}),createElement('option',{value:'個人情報'},'個人情報'));
  const localized=localizeTree(view,locale);assert.ok(Children.only(localized));
  assert.equal(localized.props.children[1].props.children,draft);
  assert.equal(localized.props.children[2].props.defaultValue,draft);
  assert.equal(localized.props.children[3].props.value,'個人情報');
  assert.equal(localized.props.children[0].props.children,translate('今日の日記',locale));
  assert.ok(renderToStaticMarkup(localized).includes('textarea'));
  for(const name of [...Object.values(stickerNames),...challenges.map(c=>c.name)])assert.ok(messages[name],name);
 }
 assert.equal(countryName('日本','en'),'Japan');assert.equal(countryName('フランス','ko'),'프랑스');
 assert.equal(translate('所持数 {count} 枚','en',{count:3}),'Owned: 3');
 // Visible JSX copy must have all four translations, including legal and mascot views.
 for(const path of ['app/profile-card.tsx','app/profile-panel.tsx','app/friends.tsx','app/drawing.tsx','app/drawing-playback.tsx','app/diary.tsx','app/letter-reader.tsx','app/envelope.tsx','app/sticker.tsx','app/postal-cat.tsx','app/achievements.tsx','app/loading-cat.tsx','app/not-found.tsx','app/privacy/page.tsx','app/terms/page.tsx']){
  const ast=ts.createSourceFile(path,readFileSync(path,'utf8'),99,true);
  function check(n){if(ts.isJsxText(n)&&/[ぁ-んァ-ヶ一-龠]/.test(n.text))assert.ok(messages[n.text.trim()],`${path}: ${n.text}`);ts.forEachChild(n,check);}check(ast);
 }
 console.log('PASS: five-language catalog, visible copy coverage, browser locale fallback, country names, user text and form values preserved');
}finally{try{unlinkSync(output);}catch{}}
