!function(e){var t,n=window.localStorage;t="undefined"==typeof n||"undefined"==typeof window.JSON?!1:!0,e.totalStorage=function(t,n){return e.totalStorage.impl.init(t,n)},e.totalStorage.setItem=function(t,n){return e.totalStorage.impl.setItem(t,n)},e.totalStorage.getItem=function(t){return e.totalStorage.impl.getItem(t)},e.totalStorage.getAll=function(){return e.totalStorage.impl.getAll()},e.totalStorage.deleteItem=function(t){return e.totalStorage.impl.deleteItem(t)},e.totalStorage.impl={init:function(e,t){return"undefined"!=typeof t?this.setItem(e,t):this.getItem(e)},setItem:function(i,r){if(!t)try{return e.cookie(i,r),r}catch(o){console.log("Local Storage not supported by this browser. Install the cookie plugin on your site to take advantage of the same functionality. You can get it at https://github.com/carhartl/jquery-cookie")}var s=JSON.stringify(r);return n.setItem(i,s),this.parseResult(s)},getItem:function(i){if(!t)try{return this.parseResult(e.cookie(i))}catch(r){return null}return this.parseResult(n.getItem(i))},deleteItem:function(i){if(!t)try{return e.cookie(i,null),!0}catch(r){return!1}return n.removeItem(i),!0},getAll:function(){var i=new Array;if(t)for(var r in n)r.length&&i.push({key:r,value:this.parseResult(n.getItem(r))});else try{for(var o=document.cookie.split(";"),r=0;r<o.length;r++){var s=o[r].split("="),a=s[0];i.push({key:a,value:this.parseResult(e.cookie(a))})}}catch(l){return null}return i},parseResult:function(e){var t;try{t=JSON.parse(e),"true"==t&&(t=!0),"false"==t&&(t=!1),parseFloat(t)==t&&"object"!=typeof t&&(t=parseFloat(t))}catch(n){}return t}}}(jQuery);