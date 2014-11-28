// Tamper with the page appropriately

// Necessary functions

// Access local storage

// Misc. DOM stuff

// Number of characters in the body
// A quick and dirty way of estimating the amount of work needed
var bodySize = function() {
    return (new XMLSerializer()).serializeToString(document.body).length;
}

// Highlighter engine

var blush = function(ruleset) {

    var rules = ruleset;
    var replacer = [];

    var highlight = function(text) {
        var i, re, df, fillers, match, element;
        var spoiled = false;
        df = document.createDocumentFragment();
        // Pre-check each rule
        for (i in rules) {
            re = RegExp(rules[i].expression, rules[i].flags);
            if (text.match(re) !== null) {
                spoiled = true;
                fillers = text.split(re);

                while (match = re.exec(text)) {
                    df.appendChild(document.createTextNode(fillers.shift()));
                    element = document.createElement('span');
                    element.style.backgroundColor = rules[i].color;
                    element.title = rules[i].title;
                    element.style.cursor = 'default';
                    element.style.display = 'inline';
                    // Add the matched fragment
                    element.appendChild(document.createTextNode(match[0]));
                    df.appendChild(element);
                }
                // Add remaining fillers
                while (i = fillers.shift()) {
                    df.appendChild(document.createTextNode(i));
                }
            }
        }
        if (spoiled) {
            return df;
        } else {
            return false; // This won't get appended to the replacer array
        }
    } 

    var recurse = function(myNode) {
        var i, block = myNode.childNodes;
        for (var i in block) {
            if (block[i].nodeType === 3) { // If it's a text node
                var newNode = highlight(block[i].nodeValue);
                if (newNode) {
                    replacer.push( [ block[i], newNode ] );
                }
            } else {
                recurse(block[i]);
            }
        }
    }

    recurse(document.body);

    while (i = replacer.shift()) {
        i[0].parentNode.replaceChild(i[1], i[0]);
    }
} 
