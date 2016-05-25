var ParcoordsHelper=function(){function a(){}return a.setup=function(a,b,c){var d=this;a.innerHTML="";var e=d3.parcoords()(a);if("function"==typeof b.color)e.color(b.color);else if("RANGE"===b.color.type){var f=b.color,g={color:f.lower.color?f.lower.color:"#de1c22",alpha:1},h={color:f.upper.color?f.upper.color:"#acdd4b",alpha:1};if((g.color.length-1)%4===0){var i=(g.color.length-1)/4,j=g.color.slice(0,-i),k=g.color.substr(g.color.length-i),l=parseInt(k,16)/255;g.color=j,g.alpha=l}if((h.color.length-1)%4===0){var i=(h.color.length-1)/4,m=h.color.slice(0,-i),k=h.color.substr(h.color.length-i),l=parseInt(k,16)/255;h.color=m,h.alpha=l}var n=[f.lower.value,f.upper.value],o=[g,h],p=d3.scale.linear().domain(n).range(o),q=function(a){var b=a[f.axis],c=p(b),e=d.hexToRgb(c.color),g="rgba("+e.r+","+e.g+","+e.b+","+c.alpha+")";return g};e.color(q)}"undefined"==typeof b.alpha?e.alpha(.4):e.alpha(b.alpha),c.then(function(c){if(e.data(c),b.hideAxis&&e.hideAxis(b.hideAxis),e.render(),b.brushingEnabled&&e.brushMode("1D-axes"),b.showGrid){var f=a.nextElementSibling,g=d.createGrid(e,f,c,b);e.on("brush",function(a){g.brush(a)})}b.reorderable===!0&&e.reorderable(),b.flipAxis&&b.flipAxis.length&&e.flipAxis(b.flipAxis)})},a.createGrid=function(a,b,c,d){function e(){for(var f,g,i=d3.keys(c[0]),j=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],k=j.getElementsByTagName("i"),n=0;n<k.length;++n){var o=k[n];"icon-chevron_down"===o.className?(f=i[n],g=!0):"icon-chevron_up"===o.className&&(f=i[n],g=!1)}var p=c.slice();"undefined"!=typeof f&&(p.sort(function(a,b){return a[f]-b[f]}),g&&p.reverse());var q=b.getElementsByTagName("tbody")[0];q.innerHTML="";for(var r=h(p,function(b){var f=i.map(function(a){return b[a]}),g=document.createElement("tr");if("function"==typeof d.gridRowColor&&(g.style.background=d.gridRowColor(b)),l.checkbox){var j=document.createElement("th");j.width="20px",j.innerHTML="<input type='checkbox' checked='checked'></input>";var k=j.getElementsByTagName("input")[0];k.addEventListener("change",function(a){var d=c.indexOf(b);d>-1&&c.splice(d,1),e()}),g.appendChild(j)}for(var m=h(f,function(a){var b=document.createElement("td");return b.innerHTML=a,b}),n=0;n<m.length;++n)g.appendChild(m[n]);for(var n=0;n<d.customGridColumns.length;++n){var o=document.createElement("td");o.appendChild(d.customGridColumns[n].constructor(b)),g.appendChild(o)}return g.addEventListener("mouseover",function(c){a.highlight([b])}),g.addEventListener("mouseout",a.unhighlight),g},m),n=0;n<r.length;++n)q.appendChild(r[n])}function f(){var a=d3.keys(c[0]),f=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];if(f.innerHTML="",l.checkbox){var g=document.createElement("th");g.width="20px",g.innerHTML="<input type='checkbox' checked='checked'></input>";var j=g.getElementsByTagName("input")[0];j.addEventListener("change",function(a){c=j.checked?k.slice():[],e()}),f.appendChild(g)}for(var m=h(a,function(a){var b=document.createElement("th");return b.innerHTML=a+"<i></i>",b.addEventListener("mousedown",function(c){i(a);var d=b.getElementsByTagName("i")[0];""===d.className?d.className="icon-chevron_down":"icon-chevron_down"===d.className?d.className="icon-chevron_up":d.className="",e()}),b}),n=0;n<m.length;++n)f.appendChild(m[n]);for(var n=0;n<d.customGridColumns.length;++n){var o=d.customGridColumns[n],g=document.createElement("th");g.innerHTML=o.name,f.appendChild(g)}}function g(){f(),e()}function h(a,b,c){c="undefined"==typeof c?a.length:c;for(var d=[],e=0;e<Math.min(c,a.length);++e){var f=a[e],g=b(f);d.push(g)}return d}function i(a){for(var c=b.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],d=c.getElementsByTagName("i"),e=0;e<d.length;++e){var f=d[e];f.previousSibling.textContent!==a&&(f.className="")}}function j(a){c=a,i(),e()}var k=c.slice();"undefined"==typeof d.customGridColumns&&(d.customGridColumns=[]);var l={checkbox:!1},m=5;return g(),{brush:j}},a.hexToRgb=function(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null},a.template="\n        <div class='parcoords' style='height:200px;'></div>\n        <div class='parcoords-grid'>\n            <table class='table table-hover'>\n                <thead>\n                    <tr></tr>\n                </thead>\n                <tbody></tbody>\n            </table>\n        </div>\n    ",a}(),ParcoordDirective=function(){function a(){this.restrict="EA",this.scope={settings:"="},this.template=ParcoordsHelper.template}return a.prototype.link=function(a,b,c){var d=a.settings,e=b[0].firstElementChild,f=d.getData();ParcoordsHelper.setup(e,d,f),window.onresize=function(a){ParcoordsHelper.setup(e,d,f)}},a.Factory=function(){var b=function(){return new a};return b},a}();angular.module("si.package",[]).directive("siParcoords",ParcoordDirective.Factory());