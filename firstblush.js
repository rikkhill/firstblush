//    firstblush.js
//    v0.1
//



(function() {

    var script, id = "d629aa";

    // Clear all of these markups
    function clearAll() {
        var elements = document.getElementsByClassName(id);
        var replacer = [];
        for (var i in elements) {
            var text = elements[i].textContent;
            replacer.push([document.createTextNode(text), elements[i]]);
        }

        while (i = replacer.shift()) {
        	if(typeof i[1].parentNode !== typeof undefined) {
                i[1].parentNode.replaceChild(i[0], i[1]);
            }
        }
    }

    // Walk the document tree and mark up all matches to the regex `re` 
    function markup(rule, class_name) {
        var re = new RegExp(rule.pattern, rule.flags);
        var color = rule.color;
        var explain = rule.explain;
        var class_name = class_name
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
                element.title = explain;
                element.className = "firstblush_markup " + class_name;
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

    // Process json-p 
    function blush(json) {
        var i, return_data;
        // Only run it if it parses as JSON
        try {
            return_data = JSON.parse(json);
        } catch(e) {
            return_data = {};
        }
        // If it's got metadata, assume it's legit
        if (typeof return_data.meta !== typeof undefined) {
            for (i in return_data.rules) {
                markup(return_data.rules[i], id);
            }
        }
    }

    // Toggle highlighting based on existence of script tag
    script = document.getElementById(id);
    if (script.length > 0) {
        clearAll();
    }
    else {
        script = document.createElement('script');
        script.setAttribute('src', './sanitycheck.js');
        document.body.appendChild(script);
    }
})();
