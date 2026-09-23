import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {transformSync} from 'esbuild';
const {hsvToHex,hexToHsv}=await import('data:text/javascript;base64,'+Buffer.from(transformSync(readFileSync('lib/pen-color.ts','utf8'),{loader:'ts',format:'esm'}).code).toString('base64'));
assert.equal(hsvToHex(0,100,100),'#ff0000');assert.equal(hsvToHex(120,100,50),'#008000');assert.equal(hsvToHex(240,100,0),'#000000');assert.equal(hsvToHex(0,0,100),'#ffffff');
for(const color of ['#242132','#ffffff','#e65e66','#f4ad37','#51a884','#568bcc','#9368b7']){const {h,s,v}=hexToHsv(color);assert.equal(hsvToHex(h,s,v),color);assert.equal(hsvToHex(h,s,0),'#000000');}
console.log('PASS: pen hue/brightness limits, grayscale and exact swatch conversion');
