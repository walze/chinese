function _(t){return Array.isArray?Array.isArray(t):et(t)==="[object Array]"}var ht=1/0;function lt(t){if(typeof t=="string")return t;let e=t+"";return e=="0"&&1/t==-ht?"-0":e}function ut(t){return t==null?"":lt(t)}function v(t){return typeof t=="string"}function q(t){return typeof t=="number"}function ft(t){return t===!0||t===!1||dt(t)&&et(t)=="[object Boolean]"}function tt(t){return typeof t=="object"}function dt(t){return tt(t)&&t!==null}function M(t){return t!=null}function j(t){return!t.trim().length}function et(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}var gt="Incorrect 'index' type",pt=t=>`Invalid value for key ${t}`,Mt=t=>`Pattern length exceeds max of ${t}.`,mt=t=>`Missing ${t} property in key`,xt=t=>`Property 'weight' in key '${t}' must be a positive integer`,Q=Object.prototype.hasOwnProperty,vt=class{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach(s=>{let n=st(s);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight}),this._keys.forEach(s=>{s.weight/=e})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function st(t){let e=null,s=null,n=null,r=1,i=null;if(v(t)||_(t))n=t,e=U(t),s=K(t);else{if(!Q.call(t,"name"))throw new Error(mt("name"));const c=t.name;if(n=c,Q.call(t,"weight")&&(r=t.weight,r<=0))throw new Error(xt(c));e=U(c),s=K(c),i=t.getFn}return{path:e,id:s,weight:r,src:n,getFn:i}}function U(t){return _(t)?t:t.split(".")}function K(t){return _(t)?t.join("."):t}function _t(t,e){let s=[],n=!1;const r=(i,c,o)=>{if(!!M(i))if(!c[o])s.push(i);else{let u=c[o];const a=i[u];if(!M(a))return;if(o===c.length-1&&(v(a)||q(a)||ft(a)))s.push(ut(a));else if(_(a)){n=!0;for(let h=0,f=a.length;h<f;h+=1)r(a[h],c,o+1)}else c.length&&r(a,c,o+1)}};return r(t,v(e)?e.split("."):e,0),n?s:s[0]}var yt={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},Et={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},It={location:0,threshold:.6,distance:100},St={useExtendedSearch:!1,getFn:_t,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},l={...Et,...yt,...It,...St},At=/[^ ]+/g;function wt(t=1,e=3){const s=new Map,n=Math.pow(10,e);return{get(r){const i=r.match(At).length;if(s.has(i))return s.get(i);const c=1/Math.pow(i,.5*t),o=parseFloat(Math.round(c*n)/n);return s.set(i,o),o},clear(){s.clear()}}}var Y=class{constructor({getFn:t=l.getFn,fieldNormWeight:e=l.fieldNormWeight}={}){this.norm=wt(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((e,s)=>{this._keysMap[e.id]=s})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,v(this.docs[0])?this.docs.forEach((t,e)=>{this._addString(t,e)}):this.docs.forEach((t,e)=>{this._addObject(t,e)}),this.norm.clear())}add(t){const e=this.size();v(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,s=this.size();e<s;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!M(t)||j(t))return;let s={v:t,i:e,n:this.norm.get(t)};this.records.push(s)}_addObject(t,e){let s={i:e,$:{}};this.keys.forEach((n,r)=>{let i=n.getFn?n.getFn(t):this.getFn(t,n.path);if(!!M(i)){if(_(i)){let c=[];const o=[{nestedArrIndex:-1,value:i}];for(;o.length;){const{nestedArrIndex:u,value:a}=o.pop();if(!!M(a))if(v(a)&&!j(a)){let h={v:a,i:u,n:this.norm.get(a)};c.push(h)}else _(a)&&a.forEach((h,f)=>{o.push({nestedArrIndex:f,value:h})})}s.$[r]=c}else if(v(i)&&!j(i)){let c={v:i,n:this.norm.get(i)};s.$[r]=c}}}),this.records.push(s)}toJSON(){return{keys:this.keys,records:this.records}}};function rt(t,e,{getFn:s=l.getFn,fieldNormWeight:n=l.fieldNormWeight}={}){const r=new Y({getFn:s,fieldNormWeight:n});return r.setKeys(t.map(st)),r.setSources(e),r.create(),r}function Lt(t,{getFn:e=l.getFn,fieldNormWeight:s=l.fieldNormWeight}={}){const{keys:n,records:r}=t,i=new Y({getFn:e,fieldNormWeight:s});return i.setKeys(n),i.setIndexRecords(r),i}function C(t,{errors:e=0,currentLocation:s=0,expectedLocation:n=0,distance:r=l.distance,ignoreLocation:i=l.ignoreLocation}={}){const c=e/t.length;if(i)return c;const o=Math.abs(n-s);return r?c+o/r:o?1:c}function Rt(t=[],e=l.minMatchCharLength){let s=[],n=-1,r=-1,i=0;for(let c=t.length;i<c;i+=1){let o=t[i];o&&n===-1?n=i:!o&&n!==-1&&(r=i-1,r-n+1>=e&&s.push([n,r]),n=-1)}return t[i-1]&&i-n>=e&&s.push([n,i-1]),s}var L=32;function bt(t,e,s,{location:n=l.location,distance:r=l.distance,threshold:i=l.threshold,findAllMatches:c=l.findAllMatches,minMatchCharLength:o=l.minMatchCharLength,includeMatches:u=l.includeMatches,ignoreLocation:a=l.ignoreLocation}={}){if(e.length>L)throw new Error(Mt(L));const h=e.length,f=t.length,d=Math.max(0,Math.min(n,f));let g=i,p=d;const y=o>1||u,E=y?Array(f):[];let R;for(;(R=t.indexOf(e,p))>-1;){let m=C(e,{currentLocation:R,expectedLocation:d,distance:r,ignoreLocation:a});if(g=Math.min(m,g),p=R+h,y){let I=0;for(;I<h;)E[R+I]=1,I+=1}}p=-1;let w=[],$=1,k=h+f;const at=1<<h-1;for(let m=0;m<h;m+=1){let I=0,S=k;for(;I<S;)C(e,{errors:m,currentLocation:d+S,expectedLocation:d,distance:r,ignoreLocation:a})<=g?I=S:k=S,S=Math.floor((k-I)/2+I);k=S;let G=Math.max(1,d-S+1),P=c?f:Math.min(d+S,f)+h,b=Array(P+2);b[P+1]=(1<<m)-1;for(let x=P;x>=G;x-=1){let N=x-1,V=s[t.charAt(N)];if(y&&(E[N]=+!!V),b[x]=(b[x+1]<<1|1)&V,m&&(b[x]|=(w[x+1]|w[x])<<1|1|w[x+1]),b[x]&at&&($=C(e,{errors:m,currentLocation:N,expectedLocation:d,distance:r,ignoreLocation:a}),$<=g)){if(g=$,p=N,p<=d)break;G=Math.max(1,2*d-p)}}if(C(e,{errors:m+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:a})>g)break;w=b}const T={isMatch:p>=0,score:Math.max(.001,$)};if(y){const m=Rt(E,o);m.length?u&&(T.indices=m):T.isMatch=!1}return T}function Ot(t){let e={};for(let s=0,n=t.length;s<n;s+=1){const r=t.charAt(s);e[r]=(e[r]||0)|1<<n-s-1}return e}var nt=class{constructor(t,{location:e=l.location,threshold:s=l.threshold,distance:n=l.distance,includeMatches:r=l.includeMatches,findAllMatches:i=l.findAllMatches,minMatchCharLength:c=l.minMatchCharLength,isCaseSensitive:o=l.isCaseSensitive,ignoreLocation:u=l.ignoreLocation}={}){if(this.options={location:e,threshold:s,distance:n,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:u},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const a=(f,d)=>{this.chunks.push({pattern:f,alphabet:Ot(f),startIndex:d})},h=this.pattern.length;if(h>L){let f=0;const d=h%L,g=h-d;for(;f<g;)a(this.pattern.substr(f,L),f),f+=L;if(d){const p=h-L;a(this.pattern.substr(p),p)}}else a(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:s}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let g={isMatch:!0,score:0};return s&&(g.indices=[[0,t.length-1]]),g}const{location:n,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,ignoreLocation:u}=this.options;let a=[],h=0,f=!1;this.chunks.forEach(({pattern:g,alphabet:p,startIndex:y})=>{const{isMatch:E,score:R,indices:w}=bt(t,g,p,{location:n+y,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,includeMatches:s,ignoreLocation:u});E&&(f=!0),h+=R,E&&w&&(a=[...a,...w])});let d={isMatch:f,score:f?h/this.chunks.length:1};return f&&s&&(d.indices=a),d}},A=class{constructor(t){this.pattern=t}static isMultiMatch(t){return J(t,this.multiRegex)}static isSingleMatch(t){return J(t,this.singleRegex)}search(){}};function J(t,e){const s=t.match(e);return s?s[1]:null}var $t=class extends A{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},kt=class extends A{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const s=t.indexOf(this.pattern)===-1;return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}},Nt=class extends A{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},Ct=class extends A{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},Ft=class extends A{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},Tt=class extends A{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},it=class extends A{constructor(t,{location:e=l.location,threshold:s=l.threshold,distance:n=l.distance,includeMatches:r=l.includeMatches,findAllMatches:i=l.findAllMatches,minMatchCharLength:c=l.minMatchCharLength,isCaseSensitive:o=l.isCaseSensitive,ignoreLocation:u=l.ignoreLocation}={}){super(t),this._bitapSearch=new nt(t,{location:e,threshold:s,distance:n,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:u})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}},ct=class extends A{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e=0,s;const n=[],r=this.pattern.length;for(;(s=t.indexOf(this.pattern,e))>-1;)e=s+r,n.push([s,e-1]);const i=!!n.length;return{isMatch:i,score:i?0:1,indices:n}}},W=[$t,ct,Nt,Ct,Tt,Ft,kt,it],X=W.length,Pt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,jt="|";function Kt(t,e={}){return t.split(jt).map(s=>{let n=s.trim().split(Pt).filter(i=>i&&!!i.trim()),r=[];for(let i=0,c=n.length;i<c;i+=1){const o=n[i];let u=!1,a=-1;for(;!u&&++a<X;){const h=W[a];let f=h.isMultiMatch(o);f&&(r.push(new h(f,e)),u=!0)}if(!u)for(a=-1;++a<X;){const h=W[a];let f=h.isSingleMatch(o);if(f){r.push(new h(f,e));break}}}return r})}var Wt=new Set([it.type,ct.type]),Dt=class{constructor(t,{isCaseSensitive:e=l.isCaseSensitive,includeMatches:s=l.includeMatches,minMatchCharLength:n=l.minMatchCharLength,ignoreLocation:r=l.ignoreLocation,findAllMatches:i=l.findAllMatches,location:c=l.location,threshold:o=l.threshold,distance:u=l.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:s,minMatchCharLength:n,findAllMatches:i,ignoreLocation:r,location:c,threshold:o,distance:u},this.pattern=e?t:t.toLowerCase(),this.query=Kt(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:s,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let r=0,i=[],c=0;for(let o=0,u=e.length;o<u;o+=1){const a=e[o];i.length=0,r=0;for(let h=0,f=a.length;h<f;h+=1){const d=a[h],{isMatch:g,indices:p,score:y}=d.search(t);if(g){if(r+=1,c+=y,s){const E=d.constructor.type;Wt.has(E)?i=[...i,...p]:i.push(p)}}else{c=0,r=0,i.length=0;break}}if(r){let h={isMatch:!0,score:c/r};return s&&(h.indices=i),h}}return{isMatch:!1,score:1}}},D=[];function zt(...t){D.push(...t)}function z(t,e){for(let s=0,n=D.length;s<n;s+=1){let r=D[s];if(r.condition(t,e))return new r(t,e)}return new nt(t,e)}var F={AND:"$and",OR:"$or"},B={PATH:"$path",PATTERN:"$val"},H=t=>!!(t[F.AND]||t[F.OR]),Bt=t=>!!t[B.PATH],Ht=t=>!_(t)&&tt(t)&&!H(t),Z=t=>({[F.AND]:Object.keys(t).map(e=>({[e]:t[e]}))});function ot(t,e,{auto:s=!0}={}){const n=r=>{let i=Object.keys(r);const c=Bt(r);if(!c&&i.length>1&&!H(r))return n(Z(r));if(Ht(r)){const u=c?r[B.PATH]:i[0],a=c?r[B.PATTERN]:r[u];if(!v(a))throw new Error(pt(u));const h={keyId:K(u),pattern:a};return s&&(h.searcher=z(a,e)),h}let o={children:[],operator:i[0]};return i.forEach(u=>{const a=r[u];_(a)&&a.forEach(h=>{o.children.push(n(h))})}),o};return H(t)||(t=Z(t)),n(t)}function Yt(t,{ignoreFieldNorm:e=l.ignoreFieldNorm}){t.forEach(s=>{let n=1;s.matches.forEach(({key:r,norm:i,score:c})=>{const o=r?r.weight:null;n*=Math.pow(c===0&&o?Number.EPSILON:c,(o||1)*(e?1:i))}),s.score=n})}function Gt(t,e){const s=t.matches;e.matches=[],M(s)&&s.forEach(n=>{if(!M(n.indices)||!n.indices.length)return;const{indices:r,value:i}=n;let c={indices:r,value:i};n.key&&(c.key=n.key.src),n.idx>-1&&(c.refIndex=n.idx),e.matches.push(c)})}function Vt(t,e){e.score=t.score}function Qt(t,e,{includeMatches:s=l.includeMatches,includeScore:n=l.includeScore}={}){const r=[];return s&&r.push(Gt),n&&r.push(Vt),t.map(i=>{const{idx:c}=i,o={item:e[c],refIndex:c};return r.length&&r.forEach(u=>{u(i,o)}),o})}var O=class{constructor(t,e={},s){this.options={...l,...e},this.options.useExtendedSearch,this._keyStore=new vt(this.options.keys),this.setCollection(t,s)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof Y))throw new Error(gt);this._myIndex=e||rt(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){!M(t)||(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const e=[];for(let s=0,n=this._docs.length;s<n;s+=1){const r=this._docs[s];t(r,s)&&(this.removeAt(s),s-=1,n-=1,e.push(r))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:s,includeScore:n,shouldSort:r,sortFn:i,ignoreFieldNorm:c}=this.options;let o=v(t)?v(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return Yt(o,{ignoreFieldNorm:c}),r&&o.sort(i),q(e)&&e>-1&&(o=o.slice(0,e)),Qt(o,this._docs,{includeMatches:s,includeScore:n})}_searchStringList(t){const e=z(t,this.options),{records:s}=this._myIndex,n=[];return s.forEach(({v:r,i,n:c})=>{if(!M(r))return;const{isMatch:o,score:u,indices:a}=e.searchIn(r);o&&n.push({item:r,idx:i,matches:[{score:u,value:r,norm:c,indices:a}]})}),n}_searchLogical(t){const e=ot(t,this.options),s=(c,o,u)=>{if(!c.children){const{keyId:h,searcher:f}=c,d=this._findMatches({key:this._keyStore.get(h),value:this._myIndex.getValueForItemAtKeyId(o,h),searcher:f});return d&&d.length?[{idx:u,item:o,matches:d}]:[]}const a=[];for(let h=0,f=c.children.length;h<f;h+=1){const d=c.children[h],g=s(d,o,u);if(g.length)a.push(...g);else if(c.operator===F.AND)return[]}return a},n=this._myIndex.records,r={},i=[];return n.forEach(({$:c,i:o})=>{if(M(c)){let u=s(e,c,o);u.length&&(r[o]||(r[o]={idx:o,item:c,matches:[]},i.push(r[o])),u.forEach(({matches:a})=>{r[o].matches.push(...a)}))}}),i}_searchObjectList(t){const e=z(t,this.options),{keys:s,records:n}=this._myIndex,r=[];return n.forEach(({$:i,i:c})=>{if(!M(i))return;let o=[];s.forEach((u,a)=>{o.push(...this._findMatches({key:u,value:i[a],searcher:e}))}),o.length&&r.push({idx:c,item:i,matches:o})}),r}_findMatches({key:t,value:e,searcher:s}){if(!M(e))return[];let n=[];if(_(e))e.forEach(({v:r,i,n:c})=>{if(!M(r))return;const{isMatch:o,score:u,indices:a}=s.searchIn(r);o&&n.push({score:u,key:t,value:r,idx:i,norm:c,indices:a})});else{const{v:r,n:i}=e,{isMatch:c,score:o,indices:u}=s.searchIn(r);c&&n.push({score:o,key:t,value:r,norm:i,indices:u})}return n}};O.version="6.6.2";O.createIndex=rt;O.parseIndex=Lt;O.config=l;O.parseQuery=ot;zt(Dt);export{O as F};
