//    firstblush.js
//    v0.1
//

function clearAll() {
    var elements = document.getElementsByClassName('firstblush_markup');
    var replacer = [];
    for (var i in elements) {
        var text = elements[i].textContent;
        replacer.push([document.createTextNode(text), elements[i]]);
    }
    
    while (i = replacer.shift()) {
    	if(typeof i[1].parentNode !== 'undefined') {
            i[1].parentNode.replaceChild(i[0], i[1]);
        }
    }
}

(function() {
    var i;
    // Walk the document tree and mark up all matches to the regex `re` 
    function markup(re, flags, color, title) {
        var re = new RegExp(re, flags);
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
                element.className = "firstblush_markup";
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

    // If the ruleset doesn't exist already, create it as an empty array
    window.ruleset = typeof window.ruleset !== 'undefined' ? window.ruleset : [];
    
    // Test ruleset
    window.ruleset.push({
    	name    : "FirstBlush",
    	origin	: "FirstBlush Internal Example",
    	pattern : "firstblush",
    	flags   : "gi",
    	color   : "#EEAAAA",
    	title   : "FirstBlush is a splendid utility for highlighting words and phrases in your browser",
    });
    
    for (i in window.ruleset) {
        markup(
            window.ruleset[i].pattern,
            window.ruleset[i].flags,
            window.ruleset[i].color,
            window.ruleset[i].title
        );
    }

})();