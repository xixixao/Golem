define(function(require,exports,module){var e,t,n,r,i,o,a,s=module.uri||"",u=(s.substring(0,s.lastIndexOf("/")+1),{}.hasOwnProperty),l=function(e,t){function n(){this.constructor=e}for(var r in t)u.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};e=require("tinyemitter"),n=require("./Memory"),requireNode&&(i=requireNode("fs"),a=requireNode("path"),o=requireNode("mkdirp")),r=function(e,t){var n,r,i;n={};for(r in e)i=e[r],t(r,i)&&(n[r]=i);return n},module.exports=t=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return l(t,e),t.prototype._directory=function(){var e;return e=a.join(process.env.PWD,window.GolemOpenFilePath,"src"),o.sync(e),e},t.prototype._countLines=function(e,t){return this._readFile(a.join(e,t)).split("\n").length},t.prototype.fileTable=function(){},t.prototype._fileTableStorage=function(e){var t,n,r,o,s,u,l,c;if(void 0!==e&&this.emitter.emit("fileTable"),!e){for(s={},o=this._directory(),c=i.readdirSync(o),u=0,l=c.length;l>u;u++)n=c[u],t=a.extname(n),"shem"===t.slice(1)&&(r=a.basename(n,t),s[r]={name:r,numLines:this._countLines(o,r)});return s}},t.prototype._fileStorage=function(e,t){var n,r,i,o;if(o=this._directory(),r=a.join(o,e),void 0!==t&&this.emitter.emit("file"),t)return n=t.value,delete t.value,this._writeFile(r,n),$.totalStorage("GolemFile_"+r,t);if(i=$.totalStorage("GolemFile_"+r))try{i.value=this._readFile(r)}catch(s){}return i},t.prototype._writeFile=function(e,t){return i.writeFileSync(""+e+".shem",t)},t.prototype._readFile=function(e){return i.readFileSync(""+e+".shem",{encoding:"utf8"})},t.prototype.writeBuilt=function(e){var t;return t=this._directory(),i.writeFileSync(a.join(t,"..","index.js"),e)},t}(n)});