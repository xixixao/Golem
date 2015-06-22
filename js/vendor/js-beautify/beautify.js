!function(){function e(e,t){for(var n=0;n<t.length;n+=1)if(t[n]===e)return!0;return!1}function t(e){return e.replace(/^\s+|\s+$/g,"")}function n(e){return e.replace(/^\s+/g,"")}function i(e,t){"use strict";var n=new r(e,t);return n.beautify()}function r(i,r){"use strict";function o(e,t){var n=0;e&&(n=e.indentation_level,!z.just_added_newline()&&e.line_indent_level>n&&(n=e.line_indent_level));var i={mode:t,parent:e,last_text:e?e.last_text:"",last_word:e?e.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:n,line_indent_level:e?e.line_indent_level:n,start_line_index:z.get_line_number(),ternary_depth:0};return i}function l(e){var t=e.newlines,n=tt.keep_array_indentation&&y(Y.mode);if(n)for(i=0;t>i;i+=1)d(i>0);else if(tt.max_preserve_newlines&&t>tt.max_preserve_newlines&&(t=tt.max_preserve_newlines),tt.preserve_newlines&&e.newlines>1){d();for(var i=1;t>i;i+=1)d(!0)}U=e,et[U.type]()}function u(e){e=e.replace(/\x0d/g,"");for(var t=[],n=e.indexOf("\n");-1!==n;)t.push(e.substring(0,n)),e=e.substring(n+1),n=e.indexOf("\n");return e.length&&t.push(e),t}function h(e){if(e=void 0===e?!1:e,!z.just_added_newline())if(tt.preserve_newlines&&U.wanted_newline||e)d(!1,!0);else if(tt.wrap_line_length){var t=z.current_line.get_character_count()+U.text.length+(z.space_before_token?1:0);t>=tt.wrap_line_length&&d(!1,!0)}}function d(e,t){if(!t&&";"!==Y.last_text&&","!==Y.last_text&&"="!==Y.last_text&&"TK_OPERATOR"!==V)for(;Y.mode===c.Statement&&!Y.if_block&&!Y.do_block;)w();z.add_new_line(e)&&(Y.multiline_frame=!0)}function f(){z.just_added_newline()&&(tt.keep_array_indentation&&y(Y.mode)&&U.wanted_newline?(z.current_line.push(U.whitespace_before),z.space_before_token=!1):z.set_indent(Y.indentation_level)&&(Y.line_indent_level=Y.indentation_level))}function p(e){tt.comma_first&&"TK_COMMA"===V&&z.just_added_newline()&&","===z.previous_line.last()&&(z.previous_line.pop(),f(),z.add_token(","),z.space_before_token=!0),e=e||U.text,f(),z.add_token(e)}function g(){Y.indentation_level+=1}function m(){Y.indentation_level>0&&(!Y.parent||Y.indentation_level>Y.parent.indentation_level)&&(Y.indentation_level-=1)}function v(e){Y?(J.push(Y),Q=Y):Q=o(null,e),Y=o(Q,e)}function y(e){return e===c.ArrayLiteral}function A(t){return e(t,[c.Expression,c.ForInitializer,c.Conditional])}function w(){J.length>0&&(Q=Y,Y=J.pop(),Q.mode===c.Statement&&z.remove_redundant_indentation(Q))}function b(){return Y.parent.mode===c.ObjectLiteral&&Y.mode===c.Statement&&(":"===Y.last_text&&0===Y.ternary_depth||"TK_RESERVED"===V&&e(Y.last_text,["get","set"]))}function C(){return"TK_RESERVED"===V&&e(Y.last_text,["var","let","const"])&&"TK_WORD"===U.type||"TK_RESERVED"===V&&"do"===Y.last_text||"TK_RESERVED"===V&&"return"===Y.last_text&&!U.wanted_newline||"TK_RESERVED"===V&&"else"===Y.last_text&&("TK_RESERVED"!==U.type||"if"!==U.text)||"TK_END_EXPR"===V&&(Q.mode===c.ForInitializer||Q.mode===c.Conditional)||"TK_WORD"===V&&Y.mode===c.BlockStatement&&!Y.in_case&&"--"!==U.text&&"++"!==U.text&&"function"!==G&&"TK_WORD"!==U.type&&"TK_RESERVED"!==U.type||Y.mode===c.ObjectLiteral&&(":"===Y.last_text&&0===Y.ternary_depth||"TK_RESERVED"===V&&e(Y.last_text,["get","set"]))?(v(c.Statement),g(),"TK_RESERVED"===V&&e(Y.last_text,["var","let","const"])&&"TK_WORD"===U.type&&(Y.declaration_statement=!0),b()||h("TK_RESERVED"===U.type&&e(U.text,["do","for","if","while"])),!0):!1}function E(e,n){for(var i=0;i<e.length;i++){var r=t(e[i]);if(r.charAt(0)!==n)return!1}return!0}function x(e,t){for(var n,i=0,r=e.length;r>i;i++)if(n=e[i],n&&0!==n.indexOf(t))return!1;return!0}function F(t){return e(t,["case","return","do","if","throw","else"])}function _(e){var t=K+(e||0);return 0>t||t>=nt.length?null:nt[t]}function S(){C();var t=c.Expression;if("["===U.text){if("TK_WORD"===V||")"===Y.last_text)return"TK_RESERVED"===V&&e(Y.last_text,q.line_starters)&&(z.space_before_token=!0),v(t),p(),g(),void(tt.space_in_paren&&(z.space_before_token=!0));t=c.ArrayLiteral,y(Y.mode)&&("["===Y.last_text||","===Y.last_text&&("]"===G||"}"===G))&&(tt.keep_array_indentation||d())}else"TK_RESERVED"===V&&"for"===Y.last_text?t=c.ForInitializer:"TK_RESERVED"===V&&e(Y.last_text,["if","while"])&&(t=c.Conditional);";"===Y.last_text||"TK_START_BLOCK"===V?d():"TK_END_EXPR"===V||"TK_START_EXPR"===V||"TK_END_BLOCK"===V||"."===Y.last_text?h(U.wanted_newline):"TK_RESERVED"===V&&"("===U.text||"TK_WORD"===V||"TK_OPERATOR"===V?"TK_RESERVED"===V&&("function"===Y.last_word||"typeof"===Y.last_word)||"*"===Y.last_text&&"function"===G?tt.space_after_anon_function&&(z.space_before_token=!0):"TK_RESERVED"!==V||!e(Y.last_text,q.line_starters)&&"catch"!==Y.last_text||tt.space_before_conditional&&(z.space_before_token=!0):z.space_before_token=!0,"("===U.text&&"TK_RESERVED"===V&&"await"===Y.last_word&&(z.space_before_token=!0),"("===U.text&&("TK_EQUALS"===V||"TK_OPERATOR"===V)&&(b()||h()),v(t),p(),tt.space_in_paren&&(z.space_before_token=!0),g()}function k(){for(;Y.mode===c.Statement;)w();Y.multiline_frame&&h("]"===U.text&&y(Y.mode)&&!tt.keep_array_indentation),tt.space_in_paren&&("TK_START_EXPR"!==V||tt.space_in_empty_paren?z.space_before_token=!0:(z.trim(),z.space_before_token=!1)),"]"===U.text&&tt.keep_array_indentation?(p(),w()):(w(),p()),z.remove_redundant_indentation(Q),Y.do_while&&Q.mode===c.Conditional&&(Q.mode=c.Expression,Y.do_block=!1,Y.do_while=!1)}function D(){var t=_(1),n=_(2);v(n&&(":"===n.text&&e(t.type,["TK_STRING","TK_WORD","TK_RESERVED"])||e(t.text,["get","set"])&&e(n.type,["TK_WORD","TK_RESERVED"]))?e(G,["class","interface"])?c.BlockStatement:c.ObjectLiteral:c.BlockStatement);var i=!t.comments_before.length&&"}"===t.text,r=i&&"function"===Y.last_word&&"TK_END_EXPR"===V;"expand"===tt.brace_style||"none"===tt.brace_style&&U.wanted_newline?"TK_OPERATOR"!==V&&(r||"TK_EQUALS"===V||"TK_RESERVED"===V&&F(Y.last_text)&&"else"!==Y.last_text)?z.space_before_token=!0:d(!1,!0):"TK_OPERATOR"!==V&&"TK_START_EXPR"!==V?"TK_START_BLOCK"===V?d():z.space_before_token=!0:y(Q.mode)&&","===Y.last_text&&("}"===G?z.space_before_token=!0:d()),p(),g()}function T(){for(;Y.mode===c.Statement;)w();var e="TK_START_BLOCK"===V;"expand"===tt.brace_style?e||d():e||(y(Y.mode)&&tt.keep_array_indentation?(tt.keep_array_indentation=!1,d(),tt.keep_array_indentation=!0):d()),w(),p()}function $(){if("TK_RESERVED"===U.type&&Y.mode!==c.ObjectLiteral&&e(U.text,["set","get"])&&(U.type="TK_WORD"),"TK_RESERVED"===U.type&&Y.mode===c.ObjectLiteral){var t=_(1);":"==t.text&&(U.type="TK_WORD")}if(C()||!U.wanted_newline||A(Y.mode)||"TK_OPERATOR"===V&&"--"!==Y.last_text&&"++"!==Y.last_text||"TK_EQUALS"===V||!tt.preserve_newlines&&"TK_RESERVED"===V&&e(Y.last_text,["var","let","const","set","get"])||d(),Y.do_block&&!Y.do_while){if("TK_RESERVED"===U.type&&"while"===U.text)return z.space_before_token=!0,p(),z.space_before_token=!0,void(Y.do_while=!0);d(),Y.do_block=!1}if(Y.if_block)if(Y.else_block||"TK_RESERVED"!==U.type||"else"!==U.text){for(;Y.mode===c.Statement;)w();Y.if_block=!1,Y.else_block=!1}else Y.else_block=!0;if("TK_RESERVED"===U.type&&("case"===U.text||"default"===U.text&&Y.in_case_statement))return d(),(Y.case_body||tt.jslint_happy)&&(m(),Y.case_body=!1),p(),Y.in_case=!0,void(Y.in_case_statement=!0);if("TK_RESERVED"===U.type&&"function"===U.text&&((e(Y.last_text,["}",";"])||z.just_added_newline()&&!e(Y.last_text,["[","{",":","=",","]))&&(z.just_added_blankline()||U.comments_before.length||(d(),d(!0))),"TK_RESERVED"===V||"TK_WORD"===V?"TK_RESERVED"===V&&e(Y.last_text,["get","set","new","return","export","async"])?z.space_before_token=!0:"TK_RESERVED"===V&&"default"===Y.last_text&&"export"===G?z.space_before_token=!0:d():"TK_OPERATOR"===V||"="===Y.last_text?z.space_before_token=!0:(Y.multiline_frame||!A(Y.mode)&&!y(Y.mode))&&d()),("TK_COMMA"===V||"TK_START_EXPR"===V||"TK_EQUALS"===V||"TK_OPERATOR"===V)&&(b()||h()),"TK_RESERVED"===U.type&&e(U.text,["function","get","set"]))return p(),void(Y.last_word=U.text);if(Z="NONE","TK_END_BLOCK"===V?"TK_RESERVED"===U.type&&e(U.text,["else","catch","finally"])?"expand"===tt.brace_style||"end-expand"===tt.brace_style||"none"===tt.brace_style&&U.wanted_newline?Z="NEWLINE":(Z="SPACE",z.space_before_token=!0):Z="NEWLINE":"TK_SEMICOLON"===V&&Y.mode===c.BlockStatement?Z="NEWLINE":"TK_SEMICOLON"===V&&A(Y.mode)?Z="SPACE":"TK_STRING"===V?Z="NEWLINE":"TK_RESERVED"===V||"TK_WORD"===V||"*"===Y.last_text&&"function"===G?Z="SPACE":"TK_START_BLOCK"===V?Z="NEWLINE":"TK_END_EXPR"===V&&(z.space_before_token=!0,Z="NEWLINE"),"TK_RESERVED"===U.type&&e(U.text,q.line_starters)&&")"!==Y.last_text&&(Z="else"===Y.last_text||"export"===Y.last_text?"SPACE":"NEWLINE"),"TK_RESERVED"===U.type&&e(U.text,["else","catch","finally"]))if("TK_END_BLOCK"!==V||"expand"===tt.brace_style||"end-expand"===tt.brace_style||"none"===tt.brace_style&&U.wanted_newline)d();else{z.trim(!0);var n=z.current_line;"}"!==n.last()&&d(),z.space_before_token=!0}else"NEWLINE"===Z?"TK_RESERVED"===V&&F(Y.last_text)?z.space_before_token=!0:"TK_END_EXPR"!==V?"TK_START_EXPR"===V&&"TK_RESERVED"===U.type&&e(U.text,["var","let","const"])||":"===Y.last_text||("TK_RESERVED"===U.type&&"if"===U.text&&"else"===Y.last_text?z.space_before_token=!0:d()):"TK_RESERVED"===U.type&&e(U.text,q.line_starters)&&")"!==Y.last_text&&d():Y.multiline_frame&&y(Y.mode)&&","===Y.last_text&&"}"===G?d():"SPACE"===Z&&(z.space_before_token=!0);p(),Y.last_word=U.text,"TK_RESERVED"===U.type&&"do"===U.text&&(Y.do_block=!0),"TK_RESERVED"===U.type&&"if"===U.text&&(Y.if_block=!0)}function B(){for(C()&&(z.space_before_token=!1);Y.mode===c.Statement&&!Y.if_block&&!Y.do_block;)w();p()}function L(){C()?z.space_before_token=!0:"TK_RESERVED"===V||"TK_WORD"===V?z.space_before_token=!0:"TK_COMMA"===V||"TK_START_EXPR"===V||"TK_EQUALS"===V||"TK_OPERATOR"===V?b()||h():d(),p()}function R(){C(),Y.declaration_statement&&(Y.declaration_assignment=!0),z.space_before_token=!0,p(),z.space_before_token=!0}function M(){return Y.declaration_statement?(A(Y.parent.mode)&&(Y.declaration_assignment=!1),p(),void(Y.declaration_assignment?(Y.declaration_assignment=!1,d(!1,!0)):(z.space_before_token=!0,tt.comma_first&&h()))):(p(),void(Y.mode===c.ObjectLiteral||Y.mode===c.Statement&&Y.parent.mode===c.ObjectLiteral?(Y.mode===c.Statement&&w(),d()):(z.space_before_token=!0,tt.comma_first&&h())))}function N(){if(C(),"TK_RESERVED"===V&&F(Y.last_text))return z.space_before_token=!0,void p();if("*"===U.text&&"TK_DOT"===V)return void p();if(":"===U.text&&Y.in_case)return Y.case_body=!0,g(),p(),d(),void(Y.in_case=!1);if("::"===U.text)return void p();"TK_OPERATOR"===V&&h();var t=!0,n=!0;e(U.text,["--","++","!","~"])||e(U.text,["-","+"])&&(e(V,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||e(Y.last_text,q.line_starters)||","===Y.last_text)?(t=!1,n=!1,!U.wanted_newline||"--"!==U.text&&"++"!==U.text||d(!1,!0),";"===Y.last_text&&A(Y.mode)&&(t=!0),"TK_RESERVED"===V?t=!0:"TK_END_EXPR"===V?t=!("]"===Y.last_text&&("--"===U.text||"++"===U.text)):"TK_OPERATOR"===V&&(t=e(U.text,["--","-","++","+"])&&e(Y.last_text,["--","-","++","+"]),e(U.text,["+","-"])&&e(Y.last_text,["--","++"])&&(n=!0)),Y.mode!==c.BlockStatement&&Y.mode!==c.Statement||"{"!==Y.last_text&&";"!==Y.last_text||d()):":"===U.text?0===Y.ternary_depth?t=!1:Y.ternary_depth-=1:"?"===U.text?Y.ternary_depth+=1:"*"===U.text&&"TK_RESERVED"===V&&"function"===Y.last_text&&(t=!1,n=!1),z.space_before_token=z.space_before_token||t,p(),z.space_before_token=n}function O(){var e,t=u(U.text),i=!1,r=!1,o=U.whitespace_before,s=o.length;for(d(!1,!0),t.length>1&&(E(t.slice(1),"*")?i=!0:x(t.slice(1),o)&&(r=!0)),p(t[0]),e=1;e<t.length;e++)d(!1,!0),i?p(" "+n(t[e])):r&&t[e].length>s?p(t[e].substring(s)):z.add_token(t[e]);d(!1,!0)}function I(){z.space_before_token=!0,p(),z.space_before_token=!0}function P(){U.wanted_newline?d(!1,!0):z.trim(!0),z.space_before_token=!0,p(),d(!1,!0)}function W(){C(),"TK_RESERVED"===V&&F(Y.last_text)?z.space_before_token=!0:h(")"===Y.last_text&&tt.break_chained_methods),p()}function H(){p(),"\n"===U.text[U.text.length-1]&&d()}function j(){for(;Y.mode===c.Statement;)w()}var z,K,q,U,V,G,X,Y,Q,J,Z,et,tt,nt=[],it="";for(et={TK_START_EXPR:S,TK_END_EXPR:k,TK_START_BLOCK:D,TK_END_BLOCK:T,TK_WORD:$,TK_RESERVED:$,TK_SEMICOLON:B,TK_STRING:L,TK_EQUALS:R,TK_OPERATOR:N,TK_COMMA:M,TK_BLOCK_COMMENT:O,TK_INLINE_COMMENT:I,TK_COMMENT:P,TK_DOT:W,TK_UNKNOWN:H,TK_EOF:j},r=r?r:{},tt={},void 0!==r.braces_on_own_line&&(tt.brace_style=r.braces_on_own_line?"expand":"collapse"),tt.brace_style=r.brace_style?r.brace_style:tt.brace_style?tt.brace_style:"collapse","expand-strict"===tt.brace_style&&(tt.brace_style="expand"),tt.indent_size=r.indent_size?parseInt(r.indent_size,10):4,tt.indent_char=r.indent_char?r.indent_char:" ",tt.eol=r.eol?r.eol:"\n",tt.preserve_newlines=void 0===r.preserve_newlines?!0:r.preserve_newlines,tt.break_chained_methods=void 0===r.break_chained_methods?!1:r.break_chained_methods,tt.max_preserve_newlines=void 0===r.max_preserve_newlines?0:parseInt(r.max_preserve_newlines,10),tt.space_in_paren=void 0===r.space_in_paren?!1:r.space_in_paren,tt.space_in_empty_paren=void 0===r.space_in_empty_paren?!1:r.space_in_empty_paren,tt.jslint_happy=void 0===r.jslint_happy?!1:r.jslint_happy,tt.space_after_anon_function=void 0===r.space_after_anon_function?!1:r.space_after_anon_function,tt.keep_array_indentation=void 0===r.keep_array_indentation?!1:r.keep_array_indentation,tt.space_before_conditional=void 0===r.space_before_conditional?!0:r.space_before_conditional,tt.unescape_strings=void 0===r.unescape_strings?!1:r.unescape_strings,tt.wrap_line_length=void 0===r.wrap_line_length?0:parseInt(r.wrap_line_length,10),tt.e4x=void 0===r.e4x?!1:r.e4x,tt.end_with_newline=void 0===r.end_with_newline?!1:r.end_with_newline,tt.comma_first=void 0===r.comma_first?!1:r.comma_first,tt.jslint_happy&&(tt.space_after_anon_function=!0),r.indent_with_tabs&&(tt.indent_char="	",tt.indent_size=1),tt.eol=tt.eol.replace(/\\r/,"\r").replace(/\\n/,"\n"),X="";tt.indent_size>0;)X+=tt.indent_char,tt.indent_size-=1;var rt=0;if(i&&i.length){for(;" "===i.charAt(rt)||"	"===i.charAt(rt);)it+=i.charAt(rt),rt+=1;i=i.substring(rt)}V="TK_START_BLOCK",G="",z=new s(X,it),J=[],v(c.BlockStatement),this.beautify=function(){var e,t;for(q=new a(i,tt,X),nt=q.tokenize(),K=0;e=_();){for(var n=0;n<e.comments_before.length;n++)l(e.comments_before[n]);l(e),G=Y.last_text,V=e.type,Y.last_text=e.text,K+=1}return t=z.get_code(),tt.end_with_newline&&(t+="\n"),"\n"!=tt.eol&&(t=t.replace(/[\r]?[\n]/gm,tt.eol)),t}}function o(e){var t=0,n=-1,i=[],r=!0;this.set_indent=function(i){t=e.baseIndentLength+i*e.indent_length,n=i},this.get_character_count=function(){return t},this.is_empty=function(){return r},this.last=function(){return this._empty?null:i[i.length-1]},this.push=function(e){i.push(e),t+=e.length,r=!1},this.pop=function(){var e=null;return r||(e=i.pop(),t-=e.length,r=0===i.length),e},this.remove_indent=function(){n>0&&(n-=1,t-=e.indent_length)},this.trim=function(){for(;" "===this.last();){{i.pop()}t-=1}r=0===i.length},this.toString=function(){var t="";return this._empty||(n>=0&&(t=e.indent_cache[n]),t+=i.join("")),t}}function s(e,t){t=t||"",this.indent_cache=[t],this.baseIndentLength=t.length,this.indent_length=e.length;var n=[];this.baseIndentString=t,this.indent_string=e,this.previous_line=null,this.current_line=null,this.space_before_token=!1,this.get_line_number=function(){return n.length},this.add_new_line=function(e){return 1===this.get_line_number()&&this.just_added_newline()?!1:e||!this.just_added_newline()?(this.previous_line=this.current_line,this.current_line=new o(this),n.push(this.current_line),!0):!1},this.add_new_line(!0),this.get_code=function(){var e=n.join("\n").replace(/[\r\n\t ]+$/,"");return e},this.set_indent=function(e){if(n.length>1){for(;e>=this.indent_cache.length;)this.indent_cache.push(this.indent_cache[this.indent_cache.length-1]+this.indent_string);return this.current_line.set_indent(e),!0}return this.current_line.set_indent(0),!1},this.add_token=function(e){this.add_space_before_token(),this.current_line.push(e)},this.add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&this.current_line.push(" "),this.space_before_token=!1},this.remove_redundant_indentation=function(e){if(!e.multiline_frame&&e.mode!==c.ForInitializer&&e.mode!==c.Conditional)for(var t=e.start_line_index,i=n.length;i>t;)n[t].remove_indent(),t++},this.trim=function(i){for(i=void 0===i?!1:i,this.current_line.trim(e,t);i&&n.length>1&&this.current_line.is_empty();)n.pop(),this.current_line=n[n.length-1],this.current_line.trim();this.previous_line=n.length>1?n[n.length-2]:null},this.just_added_newline=function(){return this.current_line.is_empty()},this.just_added_blankline=function(){if(this.just_added_newline()){if(1===n.length)return!0;var e=n[n.length-2];return e.is_empty()}return!1}}function a(n,i,r){function o(){var o,A=[];if(d=0,f="",m>=v)return["","TK_EOF"];var w;w=g.length?g[g.length-1]:new u("TK_START_BLOCK","{");var b=n.charAt(m);for(m+=1;e(b,a);){if("\n"===b?(d+=1,A=[]):d&&(b===r?A.push(r):"\r"!==b&&A.push(" ")),m>=v)return["","TK_EOF"];b=n.charAt(m),m+=1}if(A.length&&(f=A.join("")),c.test(b)){var C=!0,E=!0,x=c;for("0"===b&&v>m&&/[Xx]/.test(n.charAt(m))?(C=!1,E=!1,b+=n.charAt(m),m+=1,x=/[0123456789abcdefABCDEF]/):(b="",m-=1);v>m&&x.test(n.charAt(m));)b+=n.charAt(m),m+=1,C&&v>m&&"."===n.charAt(m)&&(b+=n.charAt(m),m+=1,C=!1),E&&v>m&&/[Ee]/.test(n.charAt(m))&&(b+=n.charAt(m),m+=1,v>m&&/[+-]/.test(n.charAt(m))&&(b+=n.charAt(m),m+=1),E=!1,C=!1);return[b,"TK_WORD"]}if(l.isIdentifierStart(n.charCodeAt(m-1))){if(v>m)for(;l.isIdentifierChar(n.charCodeAt(m))&&(b+=n.charAt(m),m+=1,m!==v););return"TK_DOT"===w.type||"TK_RESERVED"===w.type&&e(w.text,["set","get"])||!e(b,y)?[b,"TK_WORD"]:"in"===b?[b,"TK_OPERATOR"]:[b,"TK_RESERVED"]}if("("===b||"["===b)return[b,"TK_START_EXPR"];if(")"===b||"]"===b)return[b,"TK_END_EXPR"];if("{"===b)return[b,"TK_START_BLOCK"];if("}"===b)return[b,"TK_END_BLOCK"];if(";"===b)return[b,"TK_SEMICOLON"];if("/"===b){var F="",_=!0;if("*"===n.charAt(m)){if(m+=1,v>m)for(;v>m&&("*"!==n.charAt(m)||!n.charAt(m+1)||"/"!==n.charAt(m+1))&&(b=n.charAt(m),F+=b,("\n"===b||"\r"===b)&&(_=!1),m+=1,!(m>=v)););return m+=2,_&&0===d?["/*"+F+"*/","TK_INLINE_COMMENT"]:["/*"+F+"*/","TK_BLOCK_COMMENT"]}if("/"===n.charAt(m)){for(F=b;"\r"!==n.charAt(m)&&"\n"!==n.charAt(m)&&(F+=n.charAt(m),m+=1,!(m>=v)););return[F,"TK_COMMENT"]}}if("`"===b||"'"===b||'"'===b||("/"===b||i.e4x&&"<"===b&&n.slice(m-1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))&&("TK_RESERVED"===w.type&&e(w.text,["return","case","throw","else","do","typeof","yield"])||"TK_END_EXPR"===w.type&&")"===w.text&&w.parent&&"TK_RESERVED"===w.parent.type&&e(w.parent.text,["if","while","for"])||e(w.type,["TK_COMMENT","TK_START_EXPR","TK_START_BLOCK","TK_END_BLOCK","TK_OPERATOR","TK_EQUALS","TK_EOF","TK_SEMICOLON","TK_COMMA"]))){var S=b,k=!1,D=!1;if(o=b,"/"===S)for(var T=!1;v>m&&(k||T||n.charAt(m)!==S)&&!l.newline.test(n.charAt(m));)o+=n.charAt(m),k?k=!1:(k="\\"===n.charAt(m),"["===n.charAt(m)?T=!0:"]"===n.charAt(m)&&(T=!1)),m+=1;else if(i.e4x&&"<"===S){var $=/<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,B=n.slice(m-1),L=$.exec(B);if(L&&0===L.index){for(var R=L[2],M=0;L;){var N=!!L[1],O=L[2],I=!!L[L.length-1]||"![CDATA["===O.slice(0,8);if(O!==R||I||(N?--M:++M),0>=M)break;L=$.exec(B)}var P=L?L.index+L[0].length:B.length;return B=B.slice(0,P),m+=P-1,[B,"TK_STRING"]}}else for(;v>m&&(k||n.charAt(m)!==S&&("`"===S||!l.newline.test(n.charAt(m))));)o+=n.charAt(m),"\r"===n.charAt(m)&&"\n"===n.charAt(m+1)&&(m+=1,o+="\n"),k?(("x"===n.charAt(m)||"u"===n.charAt(m))&&(D=!0),k=!1):k="\\"===n.charAt(m),m+=1;if(D&&i.unescape_strings&&(o=s(o)),v>m&&n.charAt(m)===S&&(o+=S,m+=1,"/"===S))for(;v>m&&l.isIdentifierStart(n.charCodeAt(m));)o+=n.charAt(m),m+=1;return[o,"TK_STRING"]}if("#"===b){if(0===g.length&&"!"===n.charAt(m)){for(o=b;v>m&&"\n"!==b;)b=n.charAt(m),o+=b,m+=1;return[t(o)+"\n","TK_UNKNOWN"]}var W="#";if(v>m&&c.test(n.charAt(m))){do b=n.charAt(m),W+=b,m+=1;while(v>m&&"#"!==b&&"="!==b);return"#"===b||("["===n.charAt(m)&&"]"===n.charAt(m+1)?(W+="[]",m+=2):"{"===n.charAt(m)&&"}"===n.charAt(m+1)&&(W+="{}",m+=2)),[W,"TK_WORD"]}}if("<"===b&&"<!--"===n.substring(m-1,m+3)){for(m+=3,b="<!--";"\n"!==n.charAt(m)&&v>m;)b+=n.charAt(m),m++;return p=!0,[b,"TK_COMMENT"]}if("-"===b&&p&&"-->"===n.substring(m-1,m+2))return p=!1,m+=2,["-->","TK_COMMENT"];if("."===b)return[b,"TK_DOT"];if(e(b,h)){for(;v>m&&e(b+n.charAt(m),h)&&(b+=n.charAt(m),m+=1,!(m>=v)););return","===b?[b,"TK_COMMA"]:"="===b?[b,"TK_EQUALS"]:[b,"TK_OPERATOR"]}return[b,"TK_UNKNOWN"]}function s(e){for(var t,n=!1,i="",r=0,o="",s=0;n||r<e.length;)if(t=e.charAt(r),r++,n){if(n=!1,"x"===t)o=e.substr(r,2),r+=2;else{if("u"!==t){i+="\\"+t;continue}o=e.substr(r,4),r+=4}if(!o.match(/^[0123456789abcdefABCDEF]+$/))return e;if(s=parseInt(o,16),s>=0&&32>s){i+="x"===t?"\\x"+o:"\\u"+o;continue}if(34===s||39===s||92===s)i+="\\"+String.fromCharCode(s);else{if("x"===t&&s>126&&255>=s)return e;i+=String.fromCharCode(s)}}else"\\"===t?n=!0:i+=t;return i}var a="\n\r	 ".split(""),c=/[0-9]/,h="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: => <%= <% %> <?= <? ?>".split(" ");this.line_starters="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var d,f,p,g,m,v,y=this.line_starters.concat(["do","in","else","get","set","new","catch","finally","typeof","yield","async","await"]);this.tokenize=function(){v=n.length,m=0,p=!1,g=[];for(var e,t,i,r=null,s=[],a=[];!t||"TK_EOF"!==t.type;){for(i=o(),e=new u(i[1],i[0],d,f);"TK_INLINE_COMMENT"===e.type||"TK_COMMENT"===e.type||"TK_BLOCK_COMMENT"===e.type||"TK_UNKNOWN"===e.type;)a.push(e),i=o(),e=new u(i[1],i[0],d,f);a.length&&(e.comments_before=a,a=[]),"TK_START_BLOCK"===e.type||"TK_START_EXPR"===e.type?(e.parent=t,s.push(r),r=e):("TK_END_BLOCK"===e.type||"TK_END_EXPR"===e.type)&&r&&("]"===e.text&&"["===r.text||")"===e.text&&"("===r.text||"}"===e.text&&"{"===r.text)&&(e.parent=r.parent,r=s.pop()),g.push(e),t=e}return g}}var l={};!function(exports){{var e="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",t="̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿",n=new RegExp("["+e+"]"),i=new RegExp("["+e+t+"]");exports.newline=/[\n\r\u2028\u2029]/,exports.isIdentifierStart=function(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&n.test(String.fromCharCode(e))},exports.isIdentifierChar=function(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&i.test(String.fromCharCode(e))}}}(l);var c={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"},u=function(e,t,n,i){this.type=e,this.text=t,this.comments_before=[],this.newlines=n||0,this.wanted_newline=n>0,this.whitespace_before=i||"",this.parent=null};"function"==typeof define&&define.amd?define([],function(){return{js_beautify:i}}):"undefined"!=typeof exports?exports.js_beautify=i:"undefined"!=typeof window?window.js_beautify=i:"undefined"!=typeof global&&(global.js_beautify=i)}();