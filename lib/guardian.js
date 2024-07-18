/*!
 * Guardian v0.1.0
 * Data guard and validation library
 * Copyright 2024 Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: 18.07.2024 16:34:27
 */
var Guard=function(r){"use strict";class GuardianError extends Error{constructor(r="",e=null,n){super(r),this.message=r,this.name=e,this.value=n}}const parse=(r,e)=>{let n;if(!r)throw new Error("Schema object required for parse data!");if("function"==typeof r){if(n=r.apply(null,[e]),n instanceof GuardianError)throw n}else for(let t in r){const o=e[t],i=r[t];if(i)if("function"==typeof i){if(n=i.apply(null,[e]),n instanceof GuardianError)throw n}else parse(i,o)}return e};return r.parse=parse,r.pipe=(...r)=>e=>r.reduce(((r,e)=>e(r)),e),r.safeParse=(r,e)=>{let n;if(!r)throw new Error("Schema object required for parse data!");if("function"==typeof r){if(n=r.apply(null,[e]),n instanceof GuardianError)return{ok:!1,error:n}}else for(let t in r){const o=e[t],i=r[t];if(i)if("function"==typeof i){if(n=i.apply(null,[e]),n instanceof GuardianError)return{ok:!1,error:n}}else parse(i,o)}return{ok:!0,output:e}},r.string=(r="VAL must be a string")=>function(e){return"string"!=typeof e?new GuardianError(r.replace(/VAL/g,e),"string",e):e},r}({});
//# sourceMappingURL=guardian.js.map
