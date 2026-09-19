import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {transformSync} from 'esbuild';
const code=transformSync(readFileSync('lib/sticker-layout.ts','utf8'),{loader:'ts',format:'esm'}).code;
const {transformSticker,stickerCenter,validStickerLayout,moveSticker}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const base={x:40,y:60,scale:1,rotation:0};
const changed=transformSticker(base,{x:10,y:0},{x:0,y:15});
assert.equal(changed.scale,1.5);assert.equal(changed.rotation,90);
for(const axis of ['x','y'])assert.ok(Math.abs(stickerCenter(base)[axis]-stickerCenter(changed)[axis])<.00001);
assert.equal(transformSticker(base,{x:10,y:0},{x:1000,y:0}).scale,2);
assert.equal(transformSticker(base,{x:10,y:0},{x:0,y:0}).scale,.5);
assert.deepEqual(transformSticker(base,{x:0,y:0},{x:10,y:10}),base);
for(const x of [0,100])for(const y of [0,100])for(const rotation of [-179,179]){
 const value=transformSticker({...base,x,y,rotation},{x:10,y:2},{x:-80,y:60});assert.ok(validStickerLayout(value));const center=stickerCenter(value),margin=6*value.scale*Math.SQRT2;assert.ok(center.x>=margin-.001&&center.x<=100-margin+.001);assert.ok(center.y>=margin-.001&&center.y<=100-margin+.001);
}
assert.deepEqual(moveSticker(base,-10,110),{...base,x:0,y:100});
console.log('PASS: corner gesture rotation and scaling, fixed center, scale bounds, angle wrapping and paper bounds');
