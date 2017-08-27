function isAbsolut(path) {
    return path.charAt(0) === '/';
};

function normalizeArray(parts, allowAboveRoot) {
    var res = [];
    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];

        // ignore empty parts
        if (!p || p === '.')
            continue;

        if (p === '..') {
            if (res.length && res[res.length - 1] !== '..') {
                res.pop();
            } else if (allowAboveRoot) {
                res.push('..');
            }
        } else {
            res.push(p);
        }
    }

    return res;
}

export const normalize = function (path) {
    var isAbsolute = isAbsolut(path),
        trailingSlash = path && path[path.length - 1] === '/';

    // Normalize the path
    path = normalizeArray(path.split('/'), !isAbsolute).join('/');

    if (!path && !isAbsolute) {
        path = '.';
    }
    if (path && trailingSlash) {
        path += '/';
    }

    return (isAbsolute ? '/' : '') + path;
};

export const join = function (...args) {
    var path = '';
    for (var i = 0; i < args.length; i++) {
        var segment = args[i];

        if (typeof segment != 'string') {
            throw new TypeError('Arguments to path.join must be strings');
        }
        if (segment) {
            if (!path) {
                path += segment;
            } else {
                path += '/' + segment;
            }
        }
    }
    return normalize(path);
};