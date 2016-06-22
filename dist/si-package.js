var ParcoordsHelper=function(){function a(){}return a.setup=function(a,b,c){var d=this;this.currentPage=0,a.innerHTML="";var e=d3.parcoords()(a);if("function"==typeof b.color)e.color(b.color);else if("RANGE"===b.color.type){var f=b.color,g={color:f.lower.color?f.lower.color:"#de1c22",alpha:1},h={color:f.upper.color?f.upper.color:"#acdd4b",alpha:1};if((g.color.length-1)%4===0){var i=(g.color.length-1)/4,j=g.color.slice(0,-i),k=g.color.substr(g.color.length-i),l=parseInt(k,16)/255;g.color=j,g.alpha=l}if((h.color.length-1)%4===0){var i=(h.color.length-1)/4,m=h.color.slice(0,-i),k=h.color.substr(h.color.length-i),l=parseInt(k,16)/255;h.color=m,h.alpha=l}var n=[f.lower.value,f.upper.value],o=[g,h],p=d3.scale.linear().domain(n).range(o),q=function(a){var b=a[f.axis],c=p(b),e=d.hexToRgb(c.color),g="rgba("+e.r+","+e.g+","+e.b+","+c.alpha+")";return g};e.color(q)}"undefined"==typeof b.alpha?e.alpha(.4):e.alpha(b.alpha),c.then(function(c){if(e.data(c),b.hideAxis&&e.hideAxis(b.hideAxis),e.render(),b.brushingEnabled&&e.brushMode("1D-axes"),b.showGrid){var f=a.nextElementSibling,g=d.createGrid(e,f,c,b);e.on("brush",function(a){g.brush(a)})}b.reorderable===!0&&e.reorderable(),b.flipAxis&&b.flipAxis.length&&e.flipAxis(b.flipAxis)})},a.createGrid=function(a,b,c,d){function e(){var a=d3.keys(c[0]),e=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];if(e.innerHTML="",l.checkbox){var f=document.createElement("th");f.width="20px",f.innerHTML="<input type='checkbox' checked='checked'></input>";var i=f.getElementsByTagName("input")[0];i.addEventListener("change",function(a){c=i.checked?k.slice():[],n()}),e.appendChild(f)}for(var j=g(a,function(a){var b=document.createElement("th");return b.innerHTML=a+"<i></i>",b.addEventListener("mousedown",function(c){h(a);var d=b.getElementsByTagName("i")[0];""===d.className?d.className="icon-chevron_down":"icon-chevron_down"===d.className?d.className="icon-chevron_up":d.className="",n()}),b}),m=0;m<j.length;++m)e.appendChild(j[m]);for(var m=0;m<d.customGridColumns.length;++m){var o=d.customGridColumns[m],f=document.createElement("th");f.innerHTML=o.name,e.appendChild(f)}}function f(){e(),n()}function g(a,b,c,d){c="undefined"==typeof c?a.length:c;for(var e="undefined"==typeof d?0:d,f=e+c>a.length?a.length:e+c,g=[],h=e;f>h;++h){var i=a[h],j=b(i);g.push(j)}return g}function h(a){for(var c=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],d=c.getElementsByTagName("i"),e=0;e<d.length;++e){var f=d[e];f.previousSibling.textContent!==a&&(f.className="")}}function i(a){c=a,h(),n()}var j=this,k=c.slice();"undefined"==typeof d.customGridColumns&&(d.customGridColumns=[]);var l={checkbox:!1},m=10,n=function(){for(var e,f,h=d3.keys(c[0]),i=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],k=i.getElementsByTagName("i"),o=0;o<k.length;++o){var p=k[o];"icon-chevron_down"===p.className?(e=h[o],f=!0):"icon-chevron_up"===p.className&&(e=h[o],f=!1)}var q=c.slice();"undefined"!=typeof e&&(q.sort(function(a,b){return a[e]-b[e]}),f&&q.reverse());var r=b.getElementsByTagName("tbody")[0];r.innerHTML="",j.currentPage<0&&(j.currentPage+=1),j.currentPage*m>=q.length&&(j.currentPage-=1);for(var s=g(q,function(b){var e=h.map(function(a){return b[a]}),f=document.createElement("tr");if("function"==typeof d.gridRowColor&&(f.style.background=d.gridRowColor(b)),l.checkbox){var i=document.createElement("th");i.width="20px",i.innerHTML="<input type='checkbox' checked='checked'></input>";var j=i.getElementsByTagName("input")[0];j.addEventListener("change",function(a){var d=c.indexOf(b);d>-1&&c.splice(d,1),n()}),f.appendChild(i)}for(var k=g(e,function(a){var b=document.createElement("td");return b.innerHTML=a,b}),m=0;m<k.length;++m)f.appendChild(k[m]);for(var m=0;m<d.customGridColumns.length;++m){var o=document.createElement("td");o.appendChild(d.customGridColumns[m].constructor(b)),f.appendChild(o)}return f.addEventListener("mouseover",function(c){a.highlight([b])}),f.addEventListener("mouseout",a.unhighlight),f},m,j.currentPage*m),o=0;o<s.length;++o)r.appendChild(s[o]);var t=j.currentPage*m,u=t+m;u>q.length&&(u=q.length),b.getElementsByTagName("span")[0].textContent=t+1+" - "+u+" of "+q.length};return f(),b.getElementsByClassName("icon-chevron_left")[0].addEventListener("click",function(a){j.currentPage-=1,n()}),b.getElementsByClassName("icon-chevron_right")[0].addEventListener("click",function(a){j.currentPage+=1,n()}),{brush:i}},a.hexToRgb=function(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null},a.template="\n        <div class='parcoords' style='height:200px;'></div>\n        <div class='parcoords-grid'>\n            <table class='table table-hover'>\n                <thead>\n                    <tr></tr>\n                </thead>\n                <tbody></tbody>\n            </table>\n            <div>\n                <i class=\"icon-chevron_left\"></i>\n                <span>\n                </span>\n                <i class=\"icon-chevron_right\"></i>\n            </div>\n        </div>\n    ",a}(),ParcoordDirective=function(){function a(){this.restrict="EA",this.scope={settings:"="},this.template=ParcoordsHelper.template}return a.prototype.link=function(a,b,c){var d=a.settings,e=b[0].firstElementChild,f=d.getData();ParcoordsHelper.setup(e,d,f),window.onresize=function(a){ParcoordsHelper.setup(e,d,f)}},a.Factory=function(){var b=function(){return new a};return b},a}();angular.module("si.package",[]).directive("siParcoords",ParcoordDirective.Factory());var ParallelCoordsChartComponent=function(){function a(){a.that=this,this.restrict="EA",this.scope={settings:"=",data:"=",selectedIndices:"="},this.template="<div class='parcoords' style='height:100%'></div>"}return a.prototype.link=function(b,c,d){"undefined"==typeof b.settings.alpha&&(b.settings.alpha=.4),"undefined"==typeof b.settings.flipAxis&&(b.settings.flipAxis=[]),"undefined"==typeof b.settings.hideAxis&&(b.settings.hideAxis=[]),"undefined"==typeof b.data&&(b.data=[]);var e=function(d){a.that.renderComponent(c,b)};window.addEventListener("resize",e),a.that.renderComponent(c,b),b.$watch("data",function(){a.that.renderComponent(c,b)},!0),b.$watch("selectedIndices",function(){a.that.renderComponent(c,b)},!0),b.$on("$destroy",function(){window.removeEventListener("resize",e)})},a.prototype.renderComponent=function(b,c){var d=c.data,e=c.settings,f=c.selectedIndices,g=b.children()[0];g.innerHTML="";var h=d3.parcoords()(g);if("undefined"!=typeof e.colorFunction)h.color(e.colorFunction);else if("undefined"!=typeof e.colorRange){var i={color:e.colorRange.lower.color?e.colorRange.lower.color:"#de1c22",alpha:1},j={color:e.colorRange.upper.color?e.colorRange.upper.color:"#acdd4b",alpha:1};if((i.color.length-1)%4===0){var k=(i.color.length-1)/4,l=i.color.slice(0,-k),m=i.color.substr(i.color.length-k),n=parseInt(m,16)/255;i.color=l,i.alpha=n}if((j.color.length-1)%4===0){var k=(j.color.length-1)/4,l=j.color.slice(0,-k),m=j.color.substr(j.color.length-k),n=parseInt(m,16)/255;j.color=l,j.alpha=n}var o=[e.colorRange.lower.value,e.colorRange.upper.value],p=[i,j],q=d3.scale.linear().domain(o).range(p),r=function(b){var c=b[e.colorRange.axis],d=q(c),f=a.hexToRgb(d.color),g="rgba("+f.r+","+f.g+","+f.b+","+d.alpha+")";return g};h.color(r)}h.alpha(e.alpha);var s=[];if(f)for(var t=0;t<f.length;t++){var u=f[t];s.push(d[u])}h.data(s),e.hideAxis.length&&s.length&&h.hideAxis(e.hideAxis),h.render(),e.brushingEnabled&&h.brushMode("1D-axes"),e.reorderable===!0&&h.reorderable(),e.flipAxis.length&&h.flipAxis(e.flipAxis)},a.Factory=function(){var b=function(){return new a};return b},a.hexToRgb=function(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null},a}();angular.module("si.package").directive("parallelCoordsChart",ParallelCoordsChartComponent.Factory());