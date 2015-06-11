/*
 Color animation plugin for jQuery 1.8+
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function i(){var a=d("script:first"),b=a.css("color"),c=false;if(/^rgba/.test(b))c=true;else try{c=b!=a.css("color","rgba(0, 0, 0, 0.5)").css("color");a.css("color",b)}catch(e){}return c}function g(a,b,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(a[0]+c*(b[0]-a[0]),10)+","+parseInt(a[1]+c*(b[1]-a[1]),10)+","+parseInt(a[2]+c*(b[2]-a[2]),10);if(d.support.rgba)e+=","+(a&&b?parseFloat(a[3]+c*(b[3]-a[3])):1);e+=")";return e}function f(a){var b,c;if(b=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a))c=
[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1];else if(b=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a))c=[parseInt(b[1],16)*17,parseInt(b[2],16)*17,parseInt(b[3],16)*17,1];else if(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))c=[parseInt(b[1]),parseInt(b[2]),parseInt(b[3]),1];else if(b=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a))c=[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),parseFloat(b[4])];return c}
d.extend(true,d,{support:{rgba:i()}});var h=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(h,function(a,b){d.Tween.propHooks[b]={get:function(c){return d(c.elem).css(b)},set:function(c){if(!c.b){c.e=f(d(c.elem).css(b));c.d=f(c.end);c.a=0;c.b=true}c.elem.style[b]=g(c.e,c.d,c.a*c.init.interval/c.options.duration);c.a++}}});d.Tween.propHooks.borderColor={set:function(a){if(!a.b)a.d=f(a.end);var b=h.slice(2,6);d.each(b,function(c,
e){if(a.b)a.elem.style[e]=g(a.c[e],a.d,a.a*a.init.interval/a.options.duration);else{a.c=a.c||[];a.c[e]=f(d(a.elem).css(e));a.a=0}});a.b=true;a.a++}}})(jQuery);
