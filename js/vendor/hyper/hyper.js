(function(e,t){var n=!("function"!=typeof define||!define.amd),r="object"==typeof exports,i=r?require:function(e){throw new Error("uRequire detected missing dependency: '"+e+"' - in a non-nodejs runtime. All it's binding variables were 'undefined'.")},o=function(e){var requirejs,require,define;return function(e){function t(e,t){return v.call(e,t)}function n(e,t){var n,r,i,o,s,a,c,u,l,d,p=t&&t.split("/"),h=m.map,f=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(t){for(p=p.slice(0,p.length-1),e=p.concat(e.split("/")),u=0;u<e.length;u+=1)if(d=e[u],"."===d)e.splice(u,1),u-=1;else if(".."===d){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((p||f)&&h){for(n=e.split("/"),u=n.length;u>0;u-=1){if(r=n.slice(0,u).join("/"),p)for(l=p.length;l>0;l-=1)if(i=h[p.slice(0,l).join("/")],i&&(i=i[r])){o=i,s=u;break}if(o)break;!a&&f&&f[r]&&(a=f[r],c=u)}!o&&a&&(o=a,s=c),o&&(n.splice(0,s,o),e=n.join("/"))}return e}function r(t,n){return function(){return l.apply(e,y.call(arguments,0).concat([t,n]))}}function i(e){return function(t){return n(t,e)}}function o(e){return function(t){h[e]=t}}function s(n){if(t(f,n)){var r=f[n];delete f[n],g[n]=!0,u.apply(e,r)}if(!t(h,n)&&!t(g,n))throw new Error("No "+n);return h[n]}function a(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function c(e){return function(){return m&&m.config&&m.config[e]||{}}}var u,l,d,p,h={},f={},m={},g={},v=Object.prototype.hasOwnProperty,y=[].slice;d=function(e,t){var r,o=a(e),c=o[0];return e=o[1],c&&(c=n(c,t),r=s(c)),c?e=r&&r.normalize?r.normalize(e,i(t)):n(e,t):(e=n(e,t),o=a(e),c=o[0],e=o[1],c&&(r=s(c))),{f:c?c+"!"+e:e,n:e,pr:c,p:r}},p={require:function(e){return r(e)},exports:function(e){var t=h[e];return"undefined"!=typeof t?t:h[e]={}},module:function(e){return{id:e,uri:"",exports:h[e],config:c(e)}}},u=function(n,i,a,c){var u,l,m,v,y,b,x=[],w=typeof a;if(c=c||n,"undefined"===w||"function"===w){for(i=!i.length&&a.length?["require","exports","module"]:i,y=0;y<i.length;y+=1)if(v=d(i[y],c),l=v.f,"require"===l)x[y]=p.require(n);else if("exports"===l)x[y]=p.exports(n),b=!0;else if("module"===l)u=x[y]=p.module(n);else if(t(h,l)||t(f,l)||t(g,l))x[y]=s(l);else{if(!v.p)throw new Error(n+" missing "+l);v.p.load(v.n,r(c,!0),o(l),{}),x[y]=h[l]}m=a?a.apply(h[n],x):void 0,n&&(u&&u.exports!==e&&u.exports!==h[n]?h[n]=u.exports:m===e&&b||(h[n]=m))}else n&&(h[n]=a)},requirejs=require=l=function(t,n,r,i,o){return"string"==typeof t?p[t]?p[t](n):s(d(t,n).f):(t.splice||(m=t,n.splice?(t=n,n=r,r=null):t=e),n=n||function(){},"function"==typeof r&&(r=i,i=o),i?u(e,t,n,r):setTimeout(function(){u(e,t,n,r)},4),l)},l.config=function(e){return m=e,m.deps&&l(m.deps,m.callback),l},requirejs._defined=h,define=function(e,n,r){n.splice||(r=n,n=[]),t(h,e)||t(f,e)||(f[e]=[e,n,r])},define.amd={jQuery:!0}}(),define("almond",function(){}),define("tags",["require","exports","module"],function(require,exports,module){return module.exports=["a","abbr","address","applet","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","circle","cite","code","col","colgroup","command","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","ellipse","em","embed","fieldset","figcaption","figure","footer","form","g","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","line","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","path","polyline","pre","progress","q","rect","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","text","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],module.exports}),define("React",[],function(){return r?i("React"):"undefined"!=typeof e?e:i("React")}),define("index",["require","exports","module","./tags","React"],function(require,exports,module){var e=function(require,exports,module){var e,t,n,r,i,o,s=[].slice;for(r=require("./tags"),e=require("React"),module.exports=function(t){return t.prototype.displayName=t.name,e.createClass(t.prototype)},module.exports.render=function(t,n){return e.renderComponent(n,t)},t=function(t){return function(){var n,r,i,o;return n=arguments[0],r=2<=arguments.length?s.call(arguments,1):[],"object"!=typeof n||Array.isArray(n)||e.isValidComponent(n)?(o=e.DOM)[t].apply(o,[{}].concat(s.call([n].concat(r)))):(i=e.DOM)[t].apply(i,[n].concat(s.call(r)))}},i=0,o=r.length;o>i;i++)n=r[i],module.exports["_"+n]=t(n);return module.exports}.call(this,require,exports,module);return t.hyper=e,e}),require("index")};return n?define(["React"],o):r?module.exports=o(require("React")):o("undefined"!=typeof React?React:void 0)}).call(this,"object"==typeof exports?global:window,"object"==typeof exports?global:window);