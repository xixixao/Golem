define(function(require,exports,module){{var e,t,n,r=module.uri||"";r.substring(0,r.lastIndexOf("/")+1)}e=require("tinyemitter"),n=function(e,t){var n,r,i;n={};for(r in e)i=e[r],t(r,i)&&(n[r]=i);return n},module.exports=t=function(){function t(){this.unnamed="@unnamed",this.emitter=new e,this.on=this.emitter.on.bind(this.emitter),this.off=this.emitter.off.bind(this.emitter)}return t.prototype.saveSource=function(e,t){var n;n=t.value.split("\n").length,this.fileTable(e,{name:e,numLines:n}),this._fileStorage(e,t),this._lastOpenFileStorage(e)},t.prototype.loadSource=function(e){return this._fileStorage(e)},t.prototype.removeFromClient=function(e){return this._fileStorage(e,null),this.fileTable(e)},t.prototype.fileTable=function(e,t){var r,i;return r=this._fileTableStorage()||{},i=n(r,function(t){return t!==e}),t&&(i[e]=t),this._fileTableStorage(i)},t.prototype._fileTableStorage=function(e){return void 0!==e&&this.emitter.emit("fileTable"),$.totalStorage("fileTableCOOKIEv4",e)},t.prototype.getFileTable=function(){return n(this._fileTableStorage(),function(e){return function(t){return t!==e.unnamed}}(this))},t.prototype._fileStorage=function(e,t){return void 0!==t&&this.emitter.emit("file"),$.totalStorage("GolemFile_"+e,t)},t.prototype.getLastOpenFileName=function(){var e;return e=this._lastOpenFileStorage(),this.loadSource(e)&&e||this.unnamed},t.prototype.setLastOpenFileName=function(e){return this._lastOpenFileStorage(e)},t.prototype._lastOpenFileStorage=function(e){return void 0!==e&&this.emitter.emit("lastOpen"),$.totalStorage("lastOpenFileCOOKIE",e)},t.prototype.saveCommands=function(e){return this._timelineStorage(e.newest(200))},t.prototype.loadCommands=function(e){var t;return e.from(null!=(t=this._timelineStorage())?t:[])},t.prototype._timelineStorage=function(e){return void 0===e&&this.emitter.emit("timeline"),$.totalStorage("timelineCOOKIE",e)},t}()});