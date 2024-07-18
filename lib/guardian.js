/*!
 * Guardian v0.1.0
 * Data guard and validation library
 * Copyright 2024 Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: 18.07.2024 18:27:26
 */
var Guard=function(r){"use strict";class GuardianError extends Error{constructor(r="",t=null,e){super(r),this.message=r,this.name=t,this.value=e}}const parse=(r,t)=>{let e;if(!r)throw new Error("Schema object required for parse data!");if("function"==typeof r){if(e=r.apply(null,[t]),e instanceof GuardianError)throw e}else for(let n in r){const i=t[n],o=r[n];if(o)if("function"==typeof o){if(e=o.apply(null,[t]),e instanceof GuardianError)throw e}else parse(o,i)}return t};return r.endsWith=(r,t="VAL must end with END_VAL")=>function(e){const n=t.replace(/VAL/g,e).replace(/END_VAL/g,r);return"string"==typeof e&&e.endsWith(r)?e:new GuardianError(n,"endsWith",e)},r.parse=parse,r.pipe=(...r)=>t=>r.reduce(((r,t)=>t(r)),t),r.safeParse=(r,t)=>{let e;if(!r)throw new Error("Schema object required for parse data!");if("function"==typeof r){if(e=r.apply(null,[t]),e instanceof GuardianError)return{ok:!1,error:e}}else for(let n in r){const i=t[n],o=r[n];if(o)if("function"==typeof o){if(e=o.apply(null,[t]),e instanceof GuardianError)return{ok:!1,error:e}}else parse(o,i)}return{ok:!0,output:t}},r.startsWith=(r,t="VAL must starts with START_VAL")=>function(e){const n=t.replace(/VAL/g,e).replace(/START_VAL/g,r);return"string"==typeof e&&e.startsWith(r)?e:new GuardianError(n,"startsWith",e)},r.string=(r="VAL must be a string")=>function(t){return"string"!=typeof t?new GuardianError(r.replace(/VAL/g,t),"string",t):t},r}({});
