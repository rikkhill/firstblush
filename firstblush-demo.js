//	firstblush-demo.js
//	v0.1
//	Copyright Rikk Hill, 2014
//
//	Called by a wrapper bookmarklet


function markup(re, color, title) {
    var re = new RegExp(re);
    var color = color;
var title = title;
     var i, replacer, fillers, element;
 
     var walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
     replacer = [];
     while(walk.nextNode()) {
         df = document.createDocumentFragment();
         fillers = walk.currentNode.nodeValue.split(re);
         while (m = re.exec(walk.currentNode.nodeValue)) {
             if (m.index !== 0) {
                 df.appendChild(document.createTextNode(fillers.shift()));
             }
             element = document.createElement('span');
             element.style.backgroundColor = color;
             element.style.cursor = 'default';
             element.title = title;
             element.appendChild(document.createTextNode(m[0]));
             df.appendChild(element);
         }
         while (i = fillers.shift()) {
             df.appendChild(document.createTextNode(i));
         }
         replacer.push([df, walk.currentNode]);
     }
 
     while(i = replacer.shift()) {
         i[1].parentNode.replaceChild(i[0], i[1]);
     }
}