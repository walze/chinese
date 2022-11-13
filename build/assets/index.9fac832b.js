import{_ as E}from"./browser-assert.969704dd.js";import{S as J,i as K,s as O,e as _,a as f,b as B,n as D,d as q,c as R,t as v,f as y,g as a,l as H,h as j,r as U,j as F,k as I,m as W,o as X,p as $,q as ee,u as te,v as ne,w as le}from"./chunk-amoncvxd.f65c9e75.js";import{m as se,B as oe,d as ie,l as ae}from"./rxjs.b197b9c5.js";import{f as re}from"./rxjs_fetch.683c17b4.js";import{n as ue}from"./pinyin-utils.dc23fe67.js";import{F as ce}from"./fuse__js.ac03631a.js";import"./chunk-rsjerjul.76413485.js";import"./chunk-qtrcr55j.af8cc221.js";function N(l,e,s){const t=l.slice();return t[7]=e[s][0],t[8]=e[s][1],t[9]=e[s][2],t}function V(l){let e,s,t=l[7]+"",o,r,n=l[8]+"",m,h,p=l[9]+"",u,b,i,c;function d(){return l[4](l[7],l[8],l[9])}function g(...k){return l[5](l[7],l[8],l[9],...k)}return{c(){e=_("li"),s=_("span"),o=v(t),r=v(" - "),m=v(n),h=v(" - "),u=v(p),b=y(),f(s,"class","block truncate"),f(e,"class","relative py-2 pl-3 pr-9 text-gray-900 hover:bg-slate-200 cursor-pointer"),f(e,"id","option-0"),f(e,"role","option"),f(e,"aria-selected","false"),f(e,"tabindex","-1")},m(k,w){B(k,e,w),a(e,s),a(s,o),a(s,r),a(s,m),a(s,h),a(s,u),a(e,b),i||(c=[H(e,"click",d),H(e,"keypress",g)],i=!0)},p(k,w){l=k,w&2&&t!==(t=l[7]+"")&&j(o,t),w&2&&n!==(n=l[8]+"")&&j(m,n),w&2&&p!==(p=l[9]+"")&&j(u,p)},d(k){k&&q(e),i=!1,U(c)}}}function fe(l){let e,s=l[1],t=[];for(let o=0;o<s.length;o+=1)t[o]=V(N(l,s,o));return{c(){e=_("ul");for(let o=0;o<t.length;o+=1)t[o].c();f(e,"class","absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"),f(e,"id","options"),f(e,"role","listbox")},m(o,r){B(o,e,r);for(let n=0;n<t.length;n+=1)t[n].m(e,null)},p(o,[r]){if(r&3){s=o[1];let n;for(n=0;n<s.length;n+=1){const m=N(o,s,n);t[n]?t[n].p(m,r):(t[n]=V(m),t[n].c(),t[n].m(e,null))}for(;n<t.length;n+=1)t[n].d(1);t.length=s.length}},i:D,o:D,d(o){o&&q(e),R(t,o)}}}function pe(l,e,s){let t,{items:o=[]}=e,{simplified:r=!1}=e,{onSelect:n=u=>{}}=e;const m=r?1:0,h=(u,b,i)=>n({hanzi:u,pinyin:b,def:i}),p=(u,b,i,c)=>{c.key==="Enter"&&n({hanzi:u,pinyin:b,def:i})};return l.$$set=u=>{"items"in u&&s(2,o=u.items),"simplified"in u&&s(3,r=u.simplified),"onSelect"in u&&s(0,n=u.onSelect)},l.$$.update=()=>{l.$$.dirty&4&&s(1,t=o.map(({hanzi:u,pinyin:b,def:i})=>[u.split(" ")[m],ue(b),i]))},[n,t,o,r,h,p]}class me extends J{constructor(e){super(),K(this,e,pe,fe,O,{items:2,simplified:3,onSelect:0})}}function Z(l){let e,s,t,o=l[0].hanzi+"",r,n,m,h,p,u,b=l[0].pinyin+"",i,c,d,g,k,w,x,M,T=l[0].def+"",A,L,P,Y,z;return{c(){e=_("section"),s=_("div"),t=_("p"),r=v(o),n=v(`
        \u6F22\u5B57
        `),m=_("span"),m.textContent="H\xE0n Zi",h=y(),p=_("div"),u=_("span"),i=v(b),c=y(),d=_("br"),g=v(`
        \u62FC\u97F3
        `),k=_("span"),k.textContent="P\u012Bn Yin",w=y(),x=_("div"),M=_("span"),A=v(T),L=y(),P=_("br"),Y=v(`
        \u5B9A\u7FA9
        `),z=_("span"),z.textContent="Definition",f(t,"class","text-8xl mb-2"),f(m,"class","text-neutral-600 absolute ml-3 font-thin"),f(u,"class","text-xl mb-4"),f(k,"class","text-neutral-600 absolute ml-3 font-thin"),f(M,"class","text-xl mb-4"),f(z,"class","text-neutral-600 absolute ml-3 font-thin"),f(e,"class","mx-auto p-6 rounded flex flex-col gap-y-8 text-center mb-10 border border-neutral-700")},m(S,C){B(S,e,C),a(e,s),a(s,t),a(t,r),a(s,n),a(s,m),a(e,h),a(e,p),a(p,u),a(u,i),a(p,c),a(p,d),a(p,g),a(p,k),a(e,w),a(e,x),a(x,M),a(M,A),a(x,L),a(x,P),a(x,Y),a(x,z)},p(S,C){C&1&&o!==(o=S[0].hanzi+"")&&j(r,o),C&1&&b!==(b=S[0].pinyin+"")&&j(i,b),C&1&&T!==(T=S[0].def+"")&&j(A,T)},d(S){S&&q(e)}}}function G(l){let e,s;return e=new me({props:{items:l[1],onSelect:l[6]}}),{c(){ee(e.$$.fragment)},m(t,o){te(e,t,o),s=!0},p(t,o){const r={};o&2&&(r.items=t[1]),o&1&&(r.onSelect=t[6]),e.$set(r)},i(t){s||(F(e.$$.fragment,t),s=!0)},o(t){I(e.$$.fragment,t),s=!1},d(t){ne(e,t)}}}function de(l){let e,s,t,o,r,n,m,h,p,u,b,i=l[0]&&Z(l),c=l[1].length&&G(l);return{c(){e=_("main"),i&&i.c(),s=y(),t=_("label"),t.innerHTML=`Type your \u62FC\u97F3
    <span class="text-neutral-600 absolute ml-3 font-thin">P\u012Bn Yin</span>`,o=y(),r=_("div"),n=_("input"),h=y(),c&&c.c(),f(t,"for","combobox"),f(t,"class","block text-2xl font-bold text-center mb-2"),f(n,"id","combobox"),f(n,"type","text"),n.autofocus=!0,f(n,"class","w-full rounded-md border border-gray-300 bg-neutral-900 py-2 pl-3 pr-12 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm"),f(n,"role","combobox"),f(n,"aria-controls","options"),f(n,"aria-expanded",m=!!l[1].length),f(r,"class","relative mt-1"),f(e,"class","mx-auto max-w-[320px] p-4 pt-6 text-slate-50")},m(d,g){B(d,e,g),i&&i.m(e,null),a(e,s),a(e,t),a(e,o),a(e,r),a(r,n),a(r,h),c&&c.m(r,null),p=!0,n.focus(),u||(b=H(n,"input",l[5]),u=!0)},p(d,[g]){d[0]?i?i.p(d,g):(i=Z(d),i.c(),i.m(e,s)):i&&(i.d(1),i=null),(!p||g&2&&m!==(m=!!d[1].length))&&f(n,"aria-expanded",m),d[1].length?c?(c.p(d,g),g&2&&F(c,1)):(c=G(d),c.c(),F(c,1),c.m(r,null)):c&&(le(),I(c,1,1,()=>{c=null}),W())},i(d){p||(F(c),p=!0)},o(d){I(c),p=!1},d(d){d&&q(e),i&&i.d(),c&&c.d(),u=!1,b()}}}function _e(l,e,s){let t,o;const r=re("/cedict.json").pipe(se(i=>i.json())),n=new ce([],{includeScore:!0,keys:["hanzi","pinyin","def"]});X(async()=>{const i=(await ae(r)).map(([c,d,g])=>({hanzi:c,pinyin:d,def:g}));n.setCollection(i)});let m=null;const h=new oe(""),p=h.pipe(ie(100));$(l,p,i=>s(4,o=i));const u=i=>h.next(i.currentTarget.value),b=i=>{s(0,m=i),h.next("")};return l.$$.update=()=>{l.$$.dirty&16&&s(1,t=o?n.search(o,{limit:10}).map(i=>i.item):[])},[m,t,h,p,o,u,b]}class be extends J{constructor(e){super(),K(this,e,_e,de,O,{})}}const he=E.__esModule?E.default:E,Q=document.getElementById("app");he(Q,'No element with id "app" found');new be({target:Q});
