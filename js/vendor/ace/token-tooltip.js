define(function(require,exports){"use strict";function e(e){e.tokenTooltip||(i.call(this,e.container),e.tokenTooltip=this,this.editor=e,this.update=this.update.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseOut=this.onMouseOut.bind(this),n.addListener(e.renderer.scroller,"mousemove",this.onMouseMove),n.addListener(e.renderer.content,"mouseout",this.onMouseOut))}var t=(require("ace/lib/dom"),require("ace/lib/oop")),n=require("ace/lib/event"),r=require("ace/range").Range,i=require("ace/tooltip").Tooltip;t.inherits(e,i),function(){this.token={},this.range=new r,this.update=function(){this.$timer=null;var e=this.editor.renderer;this.lastT-(e.timeStamp||0)>1e3&&(e.rect=null,e.timeStamp=this.lastT,this.maxHeight=window.innerHeight,this.maxWidth=window.innerWidth);var t=e.rect||(e.rect=e.scroller.getBoundingClientRect()),n=(this.x+e.scrollLeft-t.left-e.$padding)/e.characterWidth,r=Math.floor((this.y+e.scrollTop-t.top)/e.lineHeight),i=Math.round(n),o={row:r,column:i,side:n-i>0?1:-1},s=this.editor.session,a=s.screenToDocumentPosition(o.row,o.column);if(s.documentToScreenPosition(a).column===i)var c=this.getTokenAt(a);if(!c)return void this.hideAndRemoveMarker();if(!this.lastToken||this.lastToken!==c)return this.hideAndRemoveMarker(),this.lastToken=c,void(this.$timer=setTimeout(this.update,500));var u=this.token!=c;if(this.token=c,this.docPos=a,u||!this.isOpen)if(this.setTooltipContentForToken)this.setTooltipContentForToken(c,this);else{var l=c.type;c.state&&(l+="|"+c.state),c.merge&&(l+="\n  merge"),c.stateTransitions&&(l+="\n  "+c.stateTransitions.join("\n  ")),this.tokenText!=l&&(this.setText(l),this.tokenText=l),this.open()}},this.getTokenAt=function(e){return this.editor.session.getTokenAt(e.row,e.column)},this.open=function(){var e=this.editor.session;this.width=this.getWidth(),this.height=this.getHeight(),this.show(null,this.x,this.y),e.removeMarker(this.marker)},this.hideAndRemoveMarker=function(){var e=this.editor.session;e.removeMarker(this.marker),this.hide()},this.onMouseMove=function(e){this.x=e.clientX,this.y=e.clientY,this.isOpen&&(this.lastT=e.timeStamp,this.setPosition(this.x,this.y)),this.$timer||(this.$timer=setTimeout(this.update,100))},this.onMouseOut=function(e){e&&e.currentTarget.contains(e.relatedTarget)||(this.hide(),this.editor.session.removeMarker(this.marker),this.$timer=clearTimeout(this.$timer))},this.setPosition=function(e,t){e+10+this.width>this.maxWidth&&(e=window.innerWidth-this.width-10),(t>.75*window.innerHeight||t+10+this.height>this.maxHeight)&&(t=t-this.height-20),i.prototype.setPosition.call(this,e+10,t+10)},this.destroy=function(){this.onMouseOut(),n.removeListener(this.editor.renderer.scroller,"mousemove",this.onMouseMove),n.removeListener(this.editor.renderer.content,"mouseout",this.onMouseOut),delete this.editor.tokenTooltip}}.call(e.prototype),exports.TokenTooltip=e});