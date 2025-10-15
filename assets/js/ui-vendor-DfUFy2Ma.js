import{r as Ne,g as Ae,a as ht}from"./react-vendor-Ckhrjn13.js";function yt(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const a=Object.getOwnPropertyDescriptor(r,o);a&&Object.defineProperty(e,o,a.get?a:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var te={exports:{}},B={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ye;function mt(){if(ye)return B;ye=1;var e=Ne(),t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(s,l,u){var f,v={},h=null,y=null;u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),l.ref!==void 0&&(y=l.ref);for(f in l)r.call(l,f)&&!a.hasOwnProperty(f)&&(v[f]=l[f]);if(s&&s.defaultProps)for(f in l=s.defaultProps,l)v[f]===void 0&&(v[f]=l[f]);return{$$typeof:t,type:s,key:h,ref:y,props:v,_owner:o.current}}return B.Fragment=n,B.jsx=c,B.jsxs=c,B}var me;function gt(){return me||(me=1,te.exports=mt()),te.exports}var g=gt(),i=Ne();const Et=Ae(i),Te=yt({__proto__:null,default:Et},[i]);function ge(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Le(...e){return t=>{let n=!1;const r=e.map(o=>{const a=ge(o,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():ge(e[o],null)}}}}function L(...e){return i.useCallback(Le(...e),e)}function fe(e){const t=kt(e),n=i.forwardRef((r,o)=>{const{children:a,...c}=r,s=i.Children.toArray(a),l=s.find(bt);if(l){const u=l.props.children,f=s.map(v=>v===l?i.Children.count(u)>1?i.Children.only(null):i.isValidElement(u)?u.props.children:null:v);return g.jsx(t,{...c,ref:o,children:i.isValidElement(u)?i.cloneElement(u,void 0,f):null})}return g.jsx(t,{...c,ref:o,children:a})});return n.displayName=`${e}.Slot`,n}var nr=fe("Slot");function kt(e){const t=i.forwardRef((n,r)=>{const{children:o,...a}=n;if(i.isValidElement(o)){const c=xt(o),s=Ct(a,o.props);return o.type!==i.Fragment&&(s.ref=r?Le(r,c):c),i.cloneElement(o,s)}return i.Children.count(o)>1?i.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var _e=Symbol("radix.slottable");function rr(e){const t=({children:n})=>g.jsx(g.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=_e,t}function bt(e){return i.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===_e}function Ct(e,t){const n={...t};for(const r in t){const o=e[r],a=t[r];/^on[A-Z]/.test(r)?o&&a?n[r]=(...s)=>{const l=a(...s);return o(...s),l}:o&&(n[r]=o):r==="style"?n[r]={...o,...a}:r==="className"&&(n[r]=[o,a].filter(Boolean).join(" "))}return{...e,...n}}function xt(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ie=(...e)=>e.filter((t,n,r)=>!!t&&r.indexOf(t)===n).join(" ");/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var St={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=i.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:o="",children:a,iconNode:c,...s},l)=>i.createElement("svg",{ref:l,...St,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Ie("lucide",o),...s},[...c.map(([u,f])=>i.createElement(u,f)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,t)=>{const n=i.forwardRef(({className:r,...o},a)=>i.createElement(Mt,{ref:a,iconNode:t,className:Ie(`lucide-${wt(e)}`,r),...o}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=p("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=p("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=p("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=p("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=p("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=p("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=p("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=p("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=p("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=p("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pr=p("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=p("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=p("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=p("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=p("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=p("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=p("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=p("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=p("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=p("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=p("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=p("FileCheck",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=p("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=p("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pr=p("Fuel",[["line",{x1:"3",x2:"15",y1:"22",y2:"22",key:"xegly4"}],["line",{x1:"4",x2:"14",y1:"9",y2:"9",key:"xcnuvu"}],["path",{d:"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18",key:"16j0yd"}],["path",{d:"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5",key:"7cu91f"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=p("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=p("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=p("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=p("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tr=p("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=p("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _r=p("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=p("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=p("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=p("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wr=p("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Br=p("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=p("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ur=p("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=p("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=p("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=p("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=p("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=p("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gr=p("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zr=p("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=p("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yr=p("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jr=p("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=p("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=p("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);function Rt(e,t){const n=i.createContext(t),r=a=>{const{children:c,...s}=a,l=i.useMemo(()=>s,Object.values(s));return g.jsx(n.Provider,{value:l,children:c})};r.displayName=e+"Provider";function o(a){const c=i.useContext(n);if(c)return c;if(t!==void 0)return t;throw new Error(`\`${a}\` must be used within \`${e}\``)}return[r,o]}function Pt(e,t=[]){let n=[];function r(a,c){const s=i.createContext(c),l=n.length;n=[...n,c];const u=v=>{const{scope:h,children:y,...w}=v,d=h?.[e]?.[l]||s,m=i.useMemo(()=>w,Object.values(w));return g.jsx(d.Provider,{value:m,children:y})};u.displayName=a+"Provider";function f(v,h){const y=h?.[e]?.[l]||s,w=i.useContext(y);if(w)return w;if(c!==void 0)return c;throw new Error(`\`${v}\` must be used within \`${a}\``)}return[u,f]}const o=()=>{const a=n.map(c=>i.createContext(c));return function(s){const l=s?.[e]||a;return i.useMemo(()=>({[`__scope${e}`]:{...s,[e]:l}}),[s,l])}};return o.scopeName=e,[r,Ot(o,...t)]}function Ot(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const c=r.reduce((s,{useScope:l,scopeName:u})=>{const v=l(a)[`__scope${u}`];return{...s,...v}},{});return i.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return n.scopeName=t.scopeName,n}function H(e){const t=i.useRef(e);return i.useEffect(()=>{t.current=e}),i.useMemo(()=>(...n)=>t.current?.(...n),[])}var U=globalThis?.document?i.useLayoutEffect:()=>{},Fe=ht();const Dt=Ae(Fe);var Nt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],D=Nt.reduce((e,t)=>{const n=fe(`Primitive.${t}`),r=i.forwardRef((o,a)=>{const{asChild:c,...s}=o,l=c?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),g.jsx(l,{...s,ref:a})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function At(e,t){e&&Fe.flushSync(()=>e.dispatchEvent(t))}function A(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e?.(o),n===!1||!o.defaultPrevented)return t?.(o)}}var Tt=Te[" useInsertionEffect ".trim().toString()]||U;function Lt({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,a,c]=_t({defaultProp:t,onChange:n}),s=e!==void 0,l=s?e:o;{const f=i.useRef(e!==void 0);i.useEffect(()=>{const v=f.current;v!==s&&console.warn(`${r} is changing from ${v?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),f.current=s},[s,r])}const u=i.useCallback(f=>{if(s){const v=It(f)?f(e):f;v!==e&&c.current?.(v)}else a(f)},[s,e,a,c]);return[l,u]}function _t({defaultProp:e,onChange:t}){const[n,r]=i.useState(e),o=i.useRef(n),a=i.useRef(t);return Tt(()=>{a.current=t},[t]),i.useEffect(()=>{o.current!==n&&(a.current?.(n),o.current=n)},[n,o]),[n,r,a]}function It(e){return typeof e=="function"}function Ft(e,t=globalThis?.document){const n=H(e);i.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var jt="DismissableLayer",le="dismissableLayer.update",Wt="dismissableLayer.pointerDownOutside",Bt="dismissableLayer.focusOutside",Ee,je=i.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),We=i.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:c,onDismiss:s,...l}=e,u=i.useContext(je),[f,v]=i.useState(null),h=f?.ownerDocument??globalThis?.document,[,y]=i.useState({}),w=L(t,k=>v(k)),d=Array.from(u.layers),[m]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),E=d.indexOf(m),b=f?d.indexOf(f):-1,C=u.layersWithOutsidePointerEventsDisabled.size>0,x=b>=E,S=zt(k=>{const O=k.target,W=[...u.branches].some(ee=>ee.contains(O));!x||W||(o?.(k),c?.(k),k.defaultPrevented||s?.())},h),P=qt(k=>{const O=k.target;[...u.branches].some(ee=>ee.contains(O))||(a?.(k),c?.(k),k.defaultPrevented||s?.())},h);return Ft(k=>{b===u.layers.size-1&&(r?.(k),!k.defaultPrevented&&s&&(k.preventDefault(),s()))},h),i.useEffect(()=>{if(f)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Ee=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(f)),u.layers.add(f),ke(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=Ee)}},[f,h,n,u]),i.useEffect(()=>()=>{f&&(u.layers.delete(f),u.layersWithOutsidePointerEventsDisabled.delete(f),ke())},[f,u]),i.useEffect(()=>{const k=()=>y({});return document.addEventListener(le,k),()=>document.removeEventListener(le,k)},[]),g.jsx(D.div,{...l,ref:w,style:{pointerEvents:C?x?"auto":"none":void 0,...e.style},onFocusCapture:A(e.onFocusCapture,P.onFocusCapture),onBlurCapture:A(e.onBlurCapture,P.onBlurCapture),onPointerDownCapture:A(e.onPointerDownCapture,S.onPointerDownCapture)})});We.displayName=jt;var Ht="DismissableLayerBranch",Ut=i.forwardRef((e,t)=>{const n=i.useContext(je),r=i.useRef(null),o=L(t,r);return i.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),g.jsx(D.div,{...e,ref:o})});Ut.displayName=Ht;function zt(e,t=globalThis?.document){const n=H(e),r=i.useRef(!1),o=i.useRef(()=>{});return i.useEffect(()=>{const a=s=>{if(s.target&&!r.current){let l=function(){Be(Wt,n,u,{discrete:!0})};const u={originalEvent:s};s.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=l,t.addEventListener("click",o.current,{once:!0})):l()}else t.removeEventListener("click",o.current);r.current=!1},c=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(c),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function qt(e,t=globalThis?.document){const n=H(e),r=i.useRef(!1);return i.useEffect(()=>{const o=a=>{a.target&&!r.current&&Be(Bt,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function ke(){const e=new CustomEvent(le);document.dispatchEvent(e)}function Be(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?At(o,a):o.dispatchEvent(a)}var ne=0;function $t(){i.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??be()),document.body.insertAdjacentElement("beforeend",e[1]??be()),ne++,()=>{ne===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),ne--}},[])}function be(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var re="focusScope.autoFocusOnMount",oe="focusScope.autoFocusOnUnmount",Ce={bubbles:!1,cancelable:!0},Vt="FocusScope",He=i.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:a,...c}=e,[s,l]=i.useState(null),u=H(o),f=H(a),v=i.useRef(null),h=L(t,d=>l(d)),y=i.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;i.useEffect(()=>{if(r){let d=function(C){if(y.paused||!s)return;const x=C.target;s.contains(x)?v.current=x:N(v.current,{select:!0})},m=function(C){if(y.paused||!s)return;const x=C.relatedTarget;x!==null&&(s.contains(x)||N(v.current,{select:!0}))},E=function(C){if(document.activeElement===document.body)for(const S of C)S.removedNodes.length>0&&N(s)};document.addEventListener("focusin",d),document.addEventListener("focusout",m);const b=new MutationObserver(E);return s&&b.observe(s,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",d),document.removeEventListener("focusout",m),b.disconnect()}}},[r,s,y.paused]),i.useEffect(()=>{if(s){we.add(y);const d=document.activeElement;if(!s.contains(d)){const E=new CustomEvent(re,Ce);s.addEventListener(re,u),s.dispatchEvent(E),E.defaultPrevented||(Kt(Jt(Ue(s)),{select:!0}),document.activeElement===d&&N(s))}return()=>{s.removeEventListener(re,u),setTimeout(()=>{const E=new CustomEvent(oe,Ce);s.addEventListener(oe,f),s.dispatchEvent(E),E.defaultPrevented||N(d??document.body,{select:!0}),s.removeEventListener(oe,f),we.remove(y)},0)}}},[s,u,f,y]);const w=i.useCallback(d=>{if(!n&&!r||y.paused)return;const m=d.key==="Tab"&&!d.altKey&&!d.ctrlKey&&!d.metaKey,E=document.activeElement;if(m&&E){const b=d.currentTarget,[C,x]=Gt(b);C&&x?!d.shiftKey&&E===x?(d.preventDefault(),n&&N(C,{select:!0})):d.shiftKey&&E===C&&(d.preventDefault(),n&&N(x,{select:!0})):E===b&&d.preventDefault()}},[n,r,y.paused]);return g.jsx(D.div,{tabIndex:-1,...c,ref:h,onKeyDown:w})});He.displayName=Vt;function Kt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(N(r,{select:t}),document.activeElement!==n)return}function Gt(e){const t=Ue(e),n=xe(t,e),r=xe(t.reverse(),e);return[n,r]}function Ue(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function xe(e,t){for(const n of e)if(!Zt(n,{upTo:t}))return n}function Zt(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Xt(e){return e instanceof HTMLInputElement&&"select"in e}function N(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&Xt(e)&&t&&e.select()}}var we=Yt();function Yt(){let e=[];return{add(t){const n=e[0];t!==n&&n?.pause(),e=Se(e,t),e.unshift(t)},remove(t){e=Se(e,t),e[0]?.resume()}}}function Se(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Jt(e){return e.filter(t=>t.tagName!=="A")}var Qt=Te[" useId ".trim().toString()]||(()=>{}),en=0;function ae(e){const[t,n]=i.useState(Qt());return U(()=>{n(r=>r??String(en++))},[e]),t?`radix-${t}`:""}var tn="Portal",ze=i.forwardRef((e,t)=>{const{container:n,...r}=e,[o,a]=i.useState(!1);U(()=>a(!0),[]);const c=n||o&&globalThis?.document?.body;return c?Dt.createPortal(g.jsx(D.div,{...r,ref:t}),c):null});ze.displayName=tn;function nn(e,t){return i.useReducer((n,r)=>t[n][r]??n,e)}var Y=e=>{const{present:t,children:n}=e,r=rn(t),o=typeof n=="function"?n({present:r.isPresent}):i.Children.only(n),a=L(r.ref,on(o));return typeof n=="function"||r.isPresent?i.cloneElement(o,{ref:a}):null};Y.displayName="Presence";function rn(e){const[t,n]=i.useState(),r=i.useRef(null),o=i.useRef(e),a=i.useRef("none"),c=e?"mounted":"unmounted",[s,l]=nn(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return i.useEffect(()=>{const u=z(r.current);a.current=s==="mounted"?u:"none"},[s]),U(()=>{const u=r.current,f=o.current;if(f!==e){const h=a.current,y=z(u);e?l("MOUNT"):y==="none"||u?.display==="none"?l("UNMOUNT"):l(f&&h!==y?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,l]),U(()=>{if(t){let u;const f=t.ownerDocument.defaultView??window,v=y=>{const d=z(r.current).includes(CSS.escape(y.animationName));if(y.target===t&&d&&(l("ANIMATION_END"),!o.current)){const m=t.style.animationFillMode;t.style.animationFillMode="forwards",u=f.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=m)})}},h=y=>{y.target===t&&(a.current=z(r.current))};return t.addEventListener("animationstart",h),t.addEventListener("animationcancel",v),t.addEventListener("animationend",v),()=>{f.clearTimeout(u),t.removeEventListener("animationstart",h),t.removeEventListener("animationcancel",v),t.removeEventListener("animationend",v)}}else l("ANIMATION_END")},[t,l]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:i.useCallback(u=>{r.current=u?getComputedStyle(u):null,n(u)},[])}}function z(e){return e?.animationName||"none"}function on(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var an=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},_=new WeakMap,q=new WeakMap,$={},ie=0,qe=function(e){return e&&(e.host||qe(e.parentNode))},sn=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=qe(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},cn=function(e,t,n,r){var o=sn(t,Array.isArray(e)?e:[e]);$[n]||($[n]=new WeakMap);var a=$[n],c=[],s=new Set,l=new Set(o),u=function(v){!v||s.has(v)||(s.add(v),u(v.parentNode))};o.forEach(u);var f=function(v){!v||l.has(v)||Array.prototype.forEach.call(v.children,function(h){if(s.has(h))f(h);else try{var y=h.getAttribute(r),w=y!==null&&y!=="false",d=(_.get(h)||0)+1,m=(a.get(h)||0)+1;_.set(h,d),a.set(h,m),c.push(h),d===1&&w&&q.set(h,!0),m===1&&h.setAttribute(n,"true"),w||h.setAttribute(r,"true")}catch(E){console.error("aria-hidden: cannot operate on ",h,E)}})};return f(t),s.clear(),ie++,function(){c.forEach(function(v){var h=_.get(v)-1,y=a.get(v)-1;_.set(v,h),a.set(v,y),h||(q.has(v)||v.removeAttribute(r),q.delete(v)),y||v.removeAttribute(n)}),ie--,ie||(_=new WeakMap,_=new WeakMap,q=new WeakMap,$={})}},un=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=an(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live], script"))),cn(r,o,n,"aria-hidden")):function(){return null}},R=function(){return R=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},R.apply(this,arguments)};function $e(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function ln(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var G="right-scroll-bar-position",Z="width-before-scroll-bar",dn="with-scroll-bars-hidden",fn="--removed-body-scroll-bar-size";function se(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function vn(e,t){var n=i.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var pn=typeof window<"u"?i.useLayoutEffect:i.useEffect,Me=new WeakMap;function hn(e,t){var n=vn(null,function(r){return e.forEach(function(o){return se(o,r)})});return pn(function(){var r=Me.get(n);if(r){var o=new Set(r),a=new Set(e),c=n.current;o.forEach(function(s){a.has(s)||se(s,null)}),a.forEach(function(s){o.has(s)||se(s,c)})}Me.set(n,e)},[e]),n}function yn(e){return e}function mn(e,t){t===void 0&&(t=yn);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(a){var c=t(a,r);return n.push(c),function(){n=n.filter(function(s){return s!==c})}},assignSyncMedium:function(a){for(r=!0;n.length;){var c=n;n=[],c.forEach(a)}n={push:function(s){return a(s)},filter:function(){return n}}},assignMedium:function(a){r=!0;var c=[];if(n.length){var s=n;n=[],s.forEach(a),c=n}var l=function(){var f=c;c=[],f.forEach(a)},u=function(){return Promise.resolve().then(l)};u(),n={push:function(f){c.push(f),u()},filter:function(f){return c=c.filter(f),n}}}};return o}function gn(e){e===void 0&&(e={});var t=mn(null);return t.options=R({async:!0,ssr:!1},e),t}var Ve=function(e){var t=e.sideCar,n=$e(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return i.createElement(r,R({},n))};Ve.isSideCarExport=!0;function En(e,t){return e.useMedium(t),Ve}var Ke=gn(),ce=function(){},J=i.forwardRef(function(e,t){var n=i.useRef(null),r=i.useState({onScrollCapture:ce,onWheelCapture:ce,onTouchMoveCapture:ce}),o=r[0],a=r[1],c=e.forwardProps,s=e.children,l=e.className,u=e.removeScrollBar,f=e.enabled,v=e.shards,h=e.sideCar,y=e.noRelative,w=e.noIsolation,d=e.inert,m=e.allowPinchZoom,E=e.as,b=E===void 0?"div":E,C=e.gapMode,x=$e(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=h,P=hn([n,t]),k=R(R({},x),o);return i.createElement(i.Fragment,null,f&&i.createElement(S,{sideCar:Ke,removeScrollBar:u,shards:v,noRelative:y,noIsolation:w,inert:d,setCallbacks:a,allowPinchZoom:!!m,lockRef:n,gapMode:C}),c?i.cloneElement(i.Children.only(s),R(R({},k),{ref:P})):i.createElement(b,R({},k,{className:l,ref:P}),s))});J.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};J.classNames={fullWidth:Z,zeroRight:G};var kn=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function bn(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=kn();return t&&e.setAttribute("nonce",t),e}function Cn(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function xn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var wn=function(){var e=0,t=null;return{add:function(n){e==0&&(t=bn())&&(Cn(t,n),xn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Sn=function(){var e=wn();return function(t,n){i.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Ge=function(){var e=Sn(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},Mn={left:0,top:0,right:0,gap:0},ue=function(e){return parseInt(e||"",10)||0},Rn=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[ue(n),ue(r),ue(o)]},Pn=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Mn;var t=Rn(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},On=Ge(),j="data-scroll-locked",Dn=function(e,t,n,r){var o=e.left,a=e.top,c=e.right,s=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(dn,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(s,"px ").concat(r,`;
  }
  body[`).concat(j,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(s,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(G,` {
    right: `).concat(s,"px ").concat(r,`;
  }
  
  .`).concat(Z,` {
    margin-right: `).concat(s,"px ").concat(r,`;
  }
  
  .`).concat(G," .").concat(G,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(Z," .").concat(Z,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(j,`] {
    `).concat(fn,": ").concat(s,`px;
  }
`)},Re=function(){var e=parseInt(document.body.getAttribute(j)||"0",10);return isFinite(e)?e:0},Nn=function(){i.useEffect(function(){return document.body.setAttribute(j,(Re()+1).toString()),function(){var e=Re()-1;e<=0?document.body.removeAttribute(j):document.body.setAttribute(j,e.toString())}},[])},An=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;Nn();var a=i.useMemo(function(){return Pn(o)},[o]);return i.createElement(On,{styles:Dn(a,!t,o,n?"":"!important")})},de=!1;if(typeof window<"u")try{var V=Object.defineProperty({},"passive",{get:function(){return de=!0,!0}});window.addEventListener("test",V,V),window.removeEventListener("test",V,V)}catch{de=!1}var I=de?{passive:!1}:!1,Tn=function(e){return e.tagName==="TEXTAREA"},Ze=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Tn(e)&&n[t]==="visible")},Ln=function(e){return Ze(e,"overflowY")},_n=function(e){return Ze(e,"overflowX")},Pe=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var o=Xe(e,r);if(o){var a=Ye(e,r),c=a[1],s=a[2];if(c>s)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},In=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Fn=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Xe=function(e,t){return e==="v"?Ln(t):_n(t)},Ye=function(e,t){return e==="v"?In(t):Fn(t)},jn=function(e,t){return e==="h"&&t==="rtl"?-1:1},Wn=function(e,t,n,r,o){var a=jn(e,window.getComputedStyle(t).direction),c=a*r,s=n.target,l=t.contains(s),u=!1,f=c>0,v=0,h=0;do{if(!s)break;var y=Ye(e,s),w=y[0],d=y[1],m=y[2],E=d-m-a*w;(w||E)&&Xe(e,s)&&(v+=E,h+=w);var b=s.parentNode;s=b&&b.nodeType===Node.DOCUMENT_FRAGMENT_NODE?b.host:b}while(!l&&s!==document.body||l&&(t.contains(s)||t===s));return(f&&Math.abs(v)<1||!f&&Math.abs(h)<1)&&(u=!0),u},K=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Oe=function(e){return[e.deltaX,e.deltaY]},De=function(e){return e&&"current"in e?e.current:e},Bn=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Hn=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Un=0,F=[];function zn(e){var t=i.useRef([]),n=i.useRef([0,0]),r=i.useRef(),o=i.useState(Un++)[0],a=i.useState(Ge)[0],c=i.useRef(e);i.useEffect(function(){c.current=e},[e]),i.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var d=ln([e.lockRef.current],(e.shards||[]).map(De),!0).filter(Boolean);return d.forEach(function(m){return m.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),d.forEach(function(m){return m.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var s=i.useCallback(function(d,m){if("touches"in d&&d.touches.length===2||d.type==="wheel"&&d.ctrlKey)return!c.current.allowPinchZoom;var E=K(d),b=n.current,C="deltaX"in d?d.deltaX:b[0]-E[0],x="deltaY"in d?d.deltaY:b[1]-E[1],S,P=d.target,k=Math.abs(C)>Math.abs(x)?"h":"v";if("touches"in d&&k==="h"&&P.type==="range")return!1;var O=Pe(k,P);if(!O)return!0;if(O?S=k:(S=k==="v"?"h":"v",O=Pe(k,P)),!O)return!1;if(!r.current&&"changedTouches"in d&&(C||x)&&(r.current=S),!S)return!0;var W=r.current||S;return Wn(W,m,d,W==="h"?C:x)},[]),l=i.useCallback(function(d){var m=d;if(!(!F.length||F[F.length-1]!==a)){var E="deltaY"in m?Oe(m):K(m),b=t.current.filter(function(S){return S.name===m.type&&(S.target===m.target||m.target===S.shadowParent)&&Bn(S.delta,E)})[0];if(b&&b.should){m.cancelable&&m.preventDefault();return}if(!b){var C=(c.current.shards||[]).map(De).filter(Boolean).filter(function(S){return S.contains(m.target)}),x=C.length>0?s(m,C[0]):!c.current.noIsolation;x&&m.cancelable&&m.preventDefault()}}},[]),u=i.useCallback(function(d,m,E,b){var C={name:d,delta:m,target:E,should:b,shadowParent:qn(E)};t.current.push(C),setTimeout(function(){t.current=t.current.filter(function(x){return x!==C})},1)},[]),f=i.useCallback(function(d){n.current=K(d),r.current=void 0},[]),v=i.useCallback(function(d){u(d.type,Oe(d),d.target,s(d,e.lockRef.current))},[]),h=i.useCallback(function(d){u(d.type,K(d),d.target,s(d,e.lockRef.current))},[]);i.useEffect(function(){return F.push(a),e.setCallbacks({onScrollCapture:v,onWheelCapture:v,onTouchMoveCapture:h}),document.addEventListener("wheel",l,I),document.addEventListener("touchmove",l,I),document.addEventListener("touchstart",f,I),function(){F=F.filter(function(d){return d!==a}),document.removeEventListener("wheel",l,I),document.removeEventListener("touchmove",l,I),document.removeEventListener("touchstart",f,I)}},[]);var y=e.removeScrollBar,w=e.inert;return i.createElement(i.Fragment,null,w?i.createElement(a,{styles:Hn(o)}):null,y?i.createElement(An,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function qn(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const $n=En(Ke,zn);var Je=i.forwardRef(function(e,t){return i.createElement(J,R({},e,{ref:t,sideCar:$n}))});Je.classNames=J.classNames;var Q="Dialog",[Qe,to]=Pt(Q),[Vn,M]=Qe(Q),et=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:a,modal:c=!0}=e,s=i.useRef(null),l=i.useRef(null),[u,f]=Lt({prop:r,defaultProp:o??!1,onChange:a,caller:Q});return g.jsx(Vn,{scope:t,triggerRef:s,contentRef:l,contentId:ae(),titleId:ae(),descriptionId:ae(),open:u,onOpenChange:f,onOpenToggle:i.useCallback(()=>f(v=>!v),[f]),modal:c,children:n})};et.displayName=Q;var tt="DialogTrigger",nt=i.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(tt,n),a=L(t,o.triggerRef);return g.jsx(D.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":he(o.open),...r,ref:a,onClick:A(e.onClick,o.onOpenToggle)})});nt.displayName=tt;var ve="DialogPortal",[Kn,rt]=Qe(ve,{forceMount:void 0}),ot=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,a=M(ve,t);return g.jsx(Kn,{scope:t,forceMount:n,children:i.Children.map(r,c=>g.jsx(Y,{present:n||a.open,children:g.jsx(ze,{asChild:!0,container:o,children:c})}))})};ot.displayName=ve;var X="DialogOverlay",at=i.forwardRef((e,t)=>{const n=rt(X,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=M(X,e.__scopeDialog);return a.modal?g.jsx(Y,{present:r||a.open,children:g.jsx(Zn,{...o,ref:t})}):null});at.displayName=X;var Gn=fe("DialogOverlay.RemoveScroll"),Zn=i.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(X,n);return g.jsx(Je,{as:Gn,allowPinchZoom:!0,shards:[o.contentRef],children:g.jsx(D.div,{"data-state":he(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),T="DialogContent",it=i.forwardRef((e,t)=>{const n=rt(T,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=M(T,e.__scopeDialog);return g.jsx(Y,{present:r||a.open,children:a.modal?g.jsx(Xn,{...o,ref:t}):g.jsx(Yn,{...o,ref:t})})});it.displayName=T;var Xn=i.forwardRef((e,t)=>{const n=M(T,e.__scopeDialog),r=i.useRef(null),o=L(t,n.contentRef,r);return i.useEffect(()=>{const a=r.current;if(a)return un(a)},[]),g.jsx(st,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:A(e.onCloseAutoFocus,a=>{a.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:A(e.onPointerDownOutside,a=>{const c=a.detail.originalEvent,s=c.button===0&&c.ctrlKey===!0;(c.button===2||s)&&a.preventDefault()}),onFocusOutside:A(e.onFocusOutside,a=>a.preventDefault())})}),Yn=i.forwardRef((e,t)=>{const n=M(T,e.__scopeDialog),r=i.useRef(!1),o=i.useRef(!1);return g.jsx(st,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{e.onCloseAutoFocus?.(a),a.defaultPrevented||(r.current||n.triggerRef.current?.focus(),a.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:a=>{e.onInteractOutside?.(a),a.defaultPrevented||(r.current=!0,a.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const c=a.target;n.triggerRef.current?.contains(c)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&o.current&&a.preventDefault()}})}),st=i.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:a,...c}=e,s=M(T,n),l=i.useRef(null),u=L(t,l);return $t(),g.jsxs(g.Fragment,{children:[g.jsx(He,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:a,children:g.jsx(We,{role:"dialog",id:s.contentId,"aria-describedby":s.descriptionId,"aria-labelledby":s.titleId,"data-state":he(s.open),...c,ref:u,onDismiss:()=>s.onOpenChange(!1)})}),g.jsxs(g.Fragment,{children:[g.jsx(Jn,{titleId:s.titleId}),g.jsx(er,{contentRef:l,descriptionId:s.descriptionId})]})]})}),pe="DialogTitle",ct=i.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(pe,n);return g.jsx(D.h2,{id:o.titleId,...r,ref:t})});ct.displayName=pe;var ut="DialogDescription",lt=i.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(ut,n);return g.jsx(D.p,{id:o.descriptionId,...r,ref:t})});lt.displayName=ut;var dt="DialogClose",ft=i.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(dt,n);return g.jsx(D.button,{type:"button",...r,ref:t,onClick:A(e.onClick,()=>o.onOpenChange(!1))})});ft.displayName=dt;function he(e){return e?"open":"closed"}var vt="DialogTitleWarning",[no,pt]=Rt(vt,{contentName:T,titleName:pe,docsSlug:"dialog"}),Jn=({titleId:e})=>{const t=pt(vt),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return i.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Qn="DialogDescriptionWarning",er=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${pt(Qn).contentName}}.`;return i.useEffect(()=>{const o=e.current?.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},ro=et,oo=nt,ao=ot,io=at,so=it,co=ct,uo=lt,lo=ft;export{Qr as $,ar as A,Hr as B,fr as C,We as D,wr as E,He as F,rr as G,jr as H,lr as I,pr as J,yr as K,Tr as L,Fr as M,Wr as N,Vr as O,D as P,hr as Q,Et as R,nr as S,Gr as T,Xr as U,Cr as V,Jr as W,io as X,ao as Y,so as Z,lo as _,Te as a,co as a0,uo as a1,ro as a2,or as a3,kr as a4,qr as a5,eo as a6,vr as a7,Lr as a8,Or as a9,Rr as aa,Nr as ab,ir as ac,br as ad,sr as ae,gr as af,xr as ag,dr as ah,Kr as ai,Pr as aj,Sr as ak,Ar as al,Er as am,Dr as an,Yr as ao,Br as ap,_r as aq,Ir as ar,to as as,no as at,oo as au,cr as av,$r as b,Pt as c,U as d,L as e,fe as f,Fe as g,ae as h,A as i,g as j,Lt as k,Le as l,Y as m,ze as n,$t as o,Je as p,un as q,i as r,At as s,ur as t,H as u,mr as v,zr as w,Zr as x,Ur as y,Mr as z};
