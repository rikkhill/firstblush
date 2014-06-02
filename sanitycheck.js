blush({
    "meta": {
        "name": "Weak Arguments",
        "blurb": "",
        "version": "0.1",
        "hash": "e169d3",
        "author": "FirstBlush Ruleset Builder"
    },
    "rules": [
        {
            "name": "Obvious",
            "pattern": "(?:(?!not |isn't )(?=(?:\\b\\w+\\b)|(?=[\n.,;:\"\'])|(?=^))(?= {0,2}))obvious(?:ly)?",
            "flags": "gi",
            "explain": "Is it obvious?",
            "comment": "Matches morphemes of 'obvious' not preceeded by a negative. Javascript's lack of negative look-behinds makes this surprisingly difficult.",
            "color": "#BBBBEE"
        },
        {
            "name": "Rather than",
            "pattern": "rather[^.,;:]*?than",
            "flags": "gi",
            "explain": "\"Rather [x] than [y]\" -- is this a false dichotomy?",
            "comment": "Matches 'rather', 'than', and all intervening words if there's no intervening punctuation",
            "color": "#BBBBEE"
        },
        {
            "name": "Surely...",
            "pattern": "surely",
            "flags": "gi",
            "explain": "Is this perhaps at the edge of the author's sureness?",
            "color": "#BBBBEE"
        },
        {
            "name": "always tend to",
            "pattern": "always tend to|tend to always",
            "flags": "gi",
            "explain": "Is this trying to combine the certainty of 'always' with the hedging of 'tend to'?",
            "color": "#BBBBEE"
        },
        {
            "name": "Everybody knows...",
            "pattern": "every(?:one|body) knows",
            "flags": "gi",
            "explain": "Does everybody really know?",
            "color": "#BBBBEE"
        }
    ]
});
