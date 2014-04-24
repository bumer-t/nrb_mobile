$(function() {
    doT.templateSettings = {
        evaluate : /\[\[([\s\S]+?)\]\]/g,
        interpolate : /\[\[=([\s\S]+?)\]\]/g,
        varname     : 'it',
        strip: true,
        use:         /\[\[#([\s\S]+?)\]\]/g,
        iterate:     /\[\[~\s*(?:\]\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\]\])/g,
        append:		true,
        selfcontained: false,
        conditional: /\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g,
        defineParams:/^\s*([\w$]+):([\s\S]+)/,
        define:      /\[\[##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\]\]/g,
        useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\[[^\]]+\])/g
    };
})
