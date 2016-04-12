var createParcoordsGrid=function(a,b,c){function d(a,b){}function e(a,b,c){c="undefined"==typeof c?a.length:c;for(var d=[],e=0;e<Math.min(c,a.length);++e){var f=a[e];d.push(b(f))}return d}var f=50,g={axis:null,up:!1},h=function(){var d=d3.keys(c[0]);b.innerHTML="<table class='table table-hover'><thead><tr></tr></thead><tbody></tbody></table>";for(var g=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],i=e(d,function(a){var b=document.createElement("th");return b.innerHTML=a+"<i></i>",b}),j=0;j<i.length;++j)g.appendChild(i[j]);for(var k=b.getElementsByTagName("tbody")[0],l=e(c,function(b){for(var c=d.map(function(a){return b[a]}),f=document.createElement("tr"),g=e(c,function(a){var b=document.createElement("td");return b.innerHTML=a,b}),h=0;h<g.length;++h)f.appendChild(g[h]);return f.addEventListener("mouseover",function(c){a.highlight([b])}),f.addEventListener("mouseout",a.unhighlight),f},f),j=0;j<l.length;++j)k.appendChild(l[j]);return h};return h(),h.brush=function(a){g.axis=null,d(a)},h},si;!function(a){var b;!function(a){var b=function(){function a(b,c){this.$log=b,this.$compile=c,this.restrict="EA",this.scope={settings:"="},a.that=this}return a.hexToRgb=function(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null},a.prototype.link=function(b,c,d){var e=b.settings,f=angular.element("<div class='parcoords' style='height:200px;'></div>");if(c.append(f),a.that.$compile(f)(b),e.showGrid){var g=angular.element("<div class='parcoords-grid'></div>");c.append(g),a.that.$compile(g)(b)}var h=c[0].firstElementChild,i=e.getData(),j=function(){h.innerHTML="";var b=d3.parcoords()(h);if("RANGE"===e.color.type){var c={color:e.color.lower.color,alpha:1},d={color:e.color.upper.color,alpha:1};if(void 0===c.color&&(c.color="#de1c22"),void 0===d.color&&(d.color="#acdd4b"),(c.color.length-1)%4===0){var f=(c.color.length-1)/4,g=c.color.slice(0,-f),j=c.color.substr(c.color.length-f),k=parseInt(j,16)/255;c.color=g,c.alpha=k}if((d.color.length-1)%4===0){var f=(d.color.length-1)/4,g=d.color.slice(0,-f),j=d.color.substr(d.color.length-f),k=parseInt(j,16)/255;d.color=g,d.alpha=k}var l=[e.color.lower.value,e.color.upper.value],m=[c,d],n=d3.scale.linear().domain(l).range(m),o=function(b){var c=b[e.color.axis],d=n(c),f=a.hexToRgb(d.color),g="rgba("+f.r+","+f.g+","+f.b+","+d.alpha+")";return g};b.color(o)}else"function"==typeof e.color&&b.color(e.color);void 0===e.alpha?b.alpha(.4):b.alpha(e.alpha),i.then(function(a){if(b.data(a),e.hideAxis&&b.hideAxis(e.hideAxis),b.render(),e.brushingEnabled&&b.brushMode("1D-axes"),e.showGrid){var c=h.nextElementSibling,d=createParcoordsGrid(b,c,a);b.on("brush",function(a){d.brush(a)})}e.reorderable===!0&&b.reorderable(),e.flipAxis&&e.flipAxis.length&&b.flipAxis(e.flipAxis)})};j(),window.onresize=function(a){j()}},a.Factory=function(){var b=function(b,c){return new a(b,c)};return b.$inject=["$log","$compile"],b},a}();angular.module("si.package",[]).directive("siParcoords",b.Factory())}(b=a["package"]||(a["package"]={}))}(si||(si={}));