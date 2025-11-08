/*
 * Copyright (c) 2010-2012 Per Cederberg. All rights Reserved.
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the BSD license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */


// Module declaration
var Convert = {};

// Module implementation
(function (module) {

    // Splits a string into lines of a maximum length
    function splitLines(str, maxLen) {
        var lines = [];
        while (str.length > maxLen) {
            lines.push(str.substring(0, maxLen));
            str = str.substring(maxLen);
        }
        if (str.length > 0) {
            lines.push(str);
        }
        return lines.join("\n");
    }

    // Translates a string with a character handler function
    function translateString(str, handler, joinChr) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res.push(handler(str.charAt(i), str.charCodeAt(i)));
        }
        return res.join(joinChr || "");
    }

    // Parse a string with a character handler function
    function parseString(str, handler, joinChr) {
        var parser = {
            str: str,
            peek: function (max, re) {
                max = max || 1;
                var res = "";
                var pos = 0;
                while (res.length < max && this.str.length > pos) {
                    var chr = this.str.charAt(pos++);
                    if (re && !re.test(chr)) {
                        break;
                    }
                    res += chr;
                }
                return res;
            },
            read: function (max, re) {
                var res = this.peek(max, re);
                this.str = this.str.substring(res.length);
                return res;
            },
            unread: function (chars) {
                this.str = chars + this.str;
            }
        };
        var res = [];
        while (parser.str.length > 0) {
            res.push(handler(parser.read(), parser));
        }
        return res.join(joinChr || "");
    }

    // Returns a character decoder for certain escape sequences
    function buildCharDecoder(escapes) {
        return function (chr, parser) {
            var esc = chr + parser.peek();
            if (typeof(escapes[esc]) == "string") {
                parser.read();
                return escapes[esc];
            } else if (chr == "\\") {
                chr = parser.read();
                if (/[0-7]/.test(chr) && escapes.oct) {
                    parser.unread(chr);
                    var chrs = parser.read(3, /[0-7]/);
                    var code = parseInt(chrs, 8);
                    return String.fromCharCode(code);
                } else if (chr == "x" && escapes.hex) {
                    var chrs = parser.read(2, /[0-9a-fA-F]/);
                    var code = parseInt(chrs, 16);
                    return String.fromCharCode(code);
                } else if (chr == "u" && escapes.unicode) {
                    var chrs = parser.read(4, /[0-9a-fA-F]/);
                    var code = parseInt(chrs, 16);
                    return String.fromCharCode(code);
                } else {
                    return chr;
                }
            } else {
                return chr;
            }
        };
    }

    // Returns a character encoder for certain escape sequences
    function buildCharEncoder(escapes) {
        var chars = {};
        for (var str in escapes) {
            var chr = escapes[str];
            if (typeof(chr) == "string") {
                chars[chr] = str;
            }
        }
        return function (chr, code) {
            if (typeof(chars[chr]) == "string") {
                return chars[chr];
            } else if (32 <= code && code < 127) {
                return chr;
            } else if (escapes.unicode) {
                return "\\u" + hexString(code, 4);
            } else if (code <= 0xFF) {
                return "\\x" + hexString(code, 2);
            } else {
                var hex = hexString(code, 4);
                return "\\x" + hex.substring(0, 2) +
                       "\\x" + hex.substring(2);
            }
        }
    }

    // Returns an array of bytes corresponding to the character codes
    function stringBytes(str) {
        var bytes = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c >= 0x100) {
                bytes.push((c >> 8) & 0xFF);
            }
            bytes.push(c & 0xFF);
        }
        return bytes;
    }

    // Returns an hexadecimal string from a number
    function hexString(value, length) {
        length = length || 4;
        var hex = value.toString(16).toUpperCase();
        while (hex.length < length) {
            hex = "0" + hex;
        }
        return hex;
    }

    // Checks if a string only contains printable ASCII characters
    function isAscii(str) {
        return /^[\x09\x0A\x0D\x20-\x7E]*$/.test(str);
    }

    // Converts a string to printable ASCII, replacing unknown chars with ?
    function toAscii(str) {
        function toChar(chr, code) {
            return isAscii(chr) ? chr : "?";
        }
        return translateString(str, toChar);
    }

    // Checks if a string only contains printable ISO-8859-1 characters
    function isLatin1(str) {
        return /^([\x09\x0A\x0D\x20-\x7E]|[\xA0-\xFF])*$/.test(str);
    }

    // Converts a string to printable ISO-8859-1, replacing unknown chars with ?
    function toLatin1(str) {
        function toChar(chr, code) {
            return isLatin1(chr) ? chr : "?";
        }
        return translateString(str, toChar);
    }

    // Checks if a string is encoded in UTF-8
    function isUtf8(str) {
        return /^([\x09\x0A\x0D\x20-\x7E]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF])*$/.test(str);
    }

    // Decodes an UTF-8 encoded string, invalid chars are replaced with \uFFFD
    function fromUtf8(str) {
        var res = [];
        var bytes = stringBytes(str);
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c >= 0x00C0 && c <= 0x00DF) {
                var c2 = bytes[++i];
                c = ((c & 0x1F) << 6) | (c2 & 0x3F);
            } else if (c >= 0x00E0 && c <= 0x00EF) {
                var c2 = bytes[++i];
                var c3 = bytes[++i];
                c = ((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
            } else if (c >= 0x0080) {
            	c = 0xFFFD; // Invalid encoding, unprintable character
            }
            res.push(String.fromCharCode(c));
        }
        return res.join("");
    }

    // Encodes a string to UTF-8
    function toUtf8(str) {
        return unescape(encodeURIComponent(str));
    }

    // The set of Base64 characters
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // Checks if a string is encoded in Base64, using heuristics
    function isBase64(str) {
        var invalid = str.replace(/[A-Za-z0-9\+\/\=]/g, "");
        return str.length > 0 &&
               /^\s*$/.test(invalid) &&
               (invalid.length / str.length <= 0.05);
    }

    // Decodes a Base64 encoded string, using raw character codes
    function fromBase64(str) {
        var res = [];
        str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var i = 0;
        while (i < str.length) {
            var enc1 = base64Chars.indexOf(str.charAt(i++));
            var enc2 = base64Chars.indexOf(str.charAt(i++));
            var enc3 = base64Chars.indexOf(str.charAt(i++));
            var enc4 = base64Chars.indexOf(str.charAt(i++));
            var b1 = (enc1 << 2) | (enc2 >> 4);
            var b2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var b3 = ((enc3 & 3) << 6) | enc4;
            res.push(String.fromCharCode(b1));
            if (enc3 != 64) {
                res.push(String.fromCharCode(b2));
            }
            if (enc4 != 64) {
                res.push(String.fromCharCode(b3));
            }
        }
        return res.join("");
    }

    // Encodes a string to Base64, using raw character codes
    function toBase64(str) {
        var res = [];
        var bytes = stringBytes(str);
        var i = 0;
        while (i < bytes.length) {
            var b1 = bytes[i++];
            var b2 = bytes[i++];
            var b3 = bytes[i++];
            var enc1 = b1 >> 2;
            var enc2 = ((b1 & 3) << 4) | (b2 >> 4);
            var enc3 = ((b2 & 15) << 2) | (b3 >> 6);
            var enc4 = b3 & 63;
            if (isNaN(b2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(b3)) {
                enc4 = 64;
            }
            res.push(base64Chars.charAt(enc1));
            res.push(base64Chars.charAt(enc2));
            res.push(base64Chars.charAt(enc3));
            res.push(base64Chars.charAt(enc4));
        }
        return splitLines(res.join(""), 64);
    }

    // Checks if a string is encoded in hexadecimal
    function isHex(str) {
        var invalid = str.replace(/[0-9a-fA-F\s]/g, "");
        return str.length > 0 && invalid.length == 0;
    }

    // Decodes a hexadecimal string, using raw character codes
    function fromHex(str) {
        var res = [];
        str = str.replace(/[^0-9a-fA-F]/g, "");
        for (var i = 0; i < str.length; i += 2) {
        	var b = parseInt(str.substr(i, 2), 16);
            res.push(String.fromCharCode(b));
        }
        return res.join("");
    }

    // Encodes a string to hexadecimal, using raw character codes
    function toHex(str) {
        var res = [];
        var bytes = stringBytes(str);
        for (var i = 0; i < bytes.length; i++) {
            res.push(hexString(bytes[i], 2));
        }
        return splitLines(res.join(" "), 60);
    }

    // Checks if a string is encoded in quoted printable
    function isQuotedPrintable(str) {
        return isAscii(str) &&
               /=/.test(str) &&
               /^([^=]|=[0-9a-fA-F][0-9a-fA-F]|=\?|=\r?\n)+=?$/.test(str);
    }

    // Decodes a quoted printable string, using raw character codes
    function fromQuotedPrintable(str) {
        function parseChar(chr, parser) {
            if (chr == "=") {
                var chrs = parser.read(2, /[0-9a-fA-F]/);
                if (chrs.length > 0) {
                    var code = parseInt(chrs, 16);
                    return String.fromCharCode(code);
                } else {
                    return "";
                }
            } else {
                return chr;
            }
        }
        return parseString(str, parseChar);
    }

    // Encodes a string to quoted printable, using raw character codes
    function toQuotedPrintable(str) {
        function toChar(chr, code) {
            if (code == 10) {
                return "\n";
            } else if (code == 13) {
                return "";
            } else if (code == 61) {
            	return "=3D";
            } else if (32 <= code && code < 127) {
                return chr;
            } else {
                return "=" + hexString(code, 2);
            }
        }
        var res = [];
        var lines = translateString(str, toChar).split(/\r\n|\n|\r/);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            while (line.length > 70) {
                var first = line.substring(0, 64);
                var m = /(=|=.)$/.exec(first);
                if (m) {
                    first = first.substring(0, first.length - m[0].length);
                }
                res.push(first + "=");
                line = line.substring(first.length);
            }
            res.push(line);
        }
        return res.join("\n");
    }

    // Valid C/C++/PHP escape sequences
    var cppEscapes = {
        oct: true,
        hex: true,
        "\\\\": "\\",
        "\\\"": "\"",
        "\\a": "\u0007",
        "\\b": "\u0008",
        "\\f": "\u000C",
        "\\n": "\n",
        "\\r": "\r",
        "\\t": "\t",
        "\\v": "\u000B"
    };

    // Checks if a string may be valid C/C++/PHP
    function isCpp(str) {
        return /^".*"$/.test(str) &&
               !/\\[^abfnrtvx0-7'"?\\]/.test(str);
    }

    // Character decoder for C/C++/PHP
    var cppCharDecoder = buildCharDecoder(cppEscapes);

    // Character encoder for C/C++/PHP
    var cppCharEncoder = buildCharEncoder(cppEscapes);

    // Decodes a C/C++/PHP string literal 
    function fromCpp(str) {
        str = str.replace(/^"(.*)"$/, "$1");
        str = str.replace(/(.*)\\0$/, "$1");
        return parseString(str, cppCharDecoder);
    }

    // Encodes a C/C++/PHP string literal
    function toCpp(str) {
        return "\"" + translateString(str, cppCharEncoder) + "\\0\"";
    }

    // Valid JSON/JavaScript/Java escape sequences
    var jsonEscapes = {
        oct: true,
        unicode: true,
        "\\\\": "\\",
        "\\\"": "\"",
        "\\b": "\u0008",
        "\\f": "\u000C",
        "\\n": "\n",
        "\\r": "\r",
        "\\t": "\t"
    };

    // Checks if a string may be valid JSON/JavaScript/Java
    function isJson(str) {
        return /^".*"$/.test(str) ||
               /^'.*'$/.test(str) ||
               /\\[btnfru0-7]/.test(str);
    }

    // Character decoder for JSON/JavaScript/Java
    var jsonCharDecoder = buildCharDecoder(jsonEscapes);

    // Character encoder for JSON/JavaScript/Java
    var jsonCharEncoder = buildCharEncoder(jsonEscapes);

    // Decodes a JSON/JavaScript/Java string
    function fromJson(str) {
        str = str.replace(/^'(.*)'$|^"(.*)"$/, "$1$2");
        return parseString(str, jsonCharDecoder);
    }

    // Encodes a JSON/JavaScript/Java string literal
    function toJson(str) {
        return "\"" + translateString(str, jsonCharEncoder) + "\"";
    }

    // Valid SQL escape sequences
    var sqlEscapes = {
        oct: true,
        hex: true,
        unicode: true,
        "''": "'",
        "\\'": "'",
        "\\\"": "\"",
        "\\b": "\u0008",
        "\\f": "\u000C",
        "\\n": "\n",
        "\\r": "\r",
        "\\t": "\t"
    };

    // Checks if a string contains an SQL escape sequence
    function isSql(str) {
        return /^E?'(.*)'$/.test(str) ||
               str.indexOf("''") >= 0 ||
               str.indexOf("\\") >= 0;
    }

    // Character decoder for SQL
    var sqlCharDecoder = buildCharDecoder(sqlEscapes);

    // Character encoder for SQL
    var sqlCharEncoder = buildCharEncoder(sqlEscapes);

    // Decodes an SQL string literal
    function fromSql(str) {
        str = str.replace(/^E?'(.*)'$/, "$1");
        return parseString(str, sqlCharDecoder);
    }

    // Encodes an SQL-92 string literal 
    function toSql(str) {
        function toChar(chr, code) {
            return (chr == "'") ? "''" : chr;
        }
        return "'" + translateString(str, toChar) + "'";
    }

    // Encodes a PostgreSQL string literal
    function toPostgreSql(str) {
        return "E'" + translateString(str, sqlCharEncoder) + "'";
    }

    // Checks if a string contains a protocol prefix and a URL escape sequence
    function isUrl(str) {
        return /^[a-z]{1,10}:/.test(str) && /%[0-9A-Fa-f]{2}/.test(str);        
    }

    // Decodes a string with URL escape sequences (for UTF-8 chars)
    function fromUrl(str) {
        return decodeURI(str);
    }

    // Encodes a string to valid URL-encoding by adding escape sequences
    function toUrl(str) {
        str = encodeURI(str);
        str = str.replace(/%5B/g, "[");
        str = str.replace(/%5D/g, "]");
        return str;
    }

    // Checks if a string contains a WWW-Form escape sequence
    function isWwwForm(str) {
        return /%[0-9A-Fa-f]{2}/.test(str);
    }

    // Decodes a string with WWW-Form escape sequences (for UTF-8 chars)
    function fromWwwForm(str) {
        str = str.replace(/\+/g, "%20");
        str = decodeURIComponent(str);
        return str;
    }

    // Encodes a string to valid WWW-Form-encoding by adding escape sequences
    function toWwwForm(str) {
        str = encodeURIComponent(str);
        str = str.replace(/%20/g, "+");
        str = str.split(/%0D%0A|%0A%0D|%0D|%0A/i).join("%0D%0A");
        return str;
    }

    // Internal lookup hash of all HTML entities
    var htmlEntities = {
        amp: "&", quot: "\"", apos: "'", lt: "<", gt: ">",
        nbsp: "\u00A0", iexcl: "\u00A1", cent: "\u00A2",
        pound: "\u00A3", curren: "\u00A4", yen: "\u00A5",
        brvbar: "\u00A6", sect: "\u00A7", uml: "\u00A8",
        copy: "\u00A9", ordf: "\u00AA", laquo: "\u00AB",
        not: "\u00AC", shy: "\u00AD", reg: "\u00AE",
        macr: "\u00AF", deg: "\u00B0", plusmn: "\u00B1",
        sup2: "\u00B2", sup3: "\u00B3", acute: "\u00B4",
        micro: "\u00B5", para: "\u00B6", middot: "\u00B7",
        cedil: "\u00B8", sup1: "\u00B9", ordm: "\u00BA",
        raquo: "\u00BB", frac14: "\u00BC", frac12: "\u00BD",
        frac34: "\u00BE", iquest: "\u00BF", Agrave: "\u00C0",
        Aacute: "\u00C1", Acirc: "\u00C2", Atilde: "\u00C3",
        Auml: "\u00C4", Aring: "\u00C5", AElig: "\u00C6",
        Ccedil: "\u00C7", Egrave: "\u00C8", Eacute: "\u00C9",
        Ecirc: "\u00CA", Euml: "\u00CB", Igrave: "\u00CC",
        Iacute: "\u00CD", Icirc: "\u00CE", Iuml: "\u00CF",
        ETH: "\u00D0", Ntilde: "\u00D1", Ograve: "\u00D2",
        Oacute: "\u00D3", Ocirc: "\u00D4", Otilde: "\u00D5",
        Ouml: "\u00D6", times: "\u00D7", Oslash: "\u00D8",
        Ugrave: "\u00D9", Uacute: "\u00DA", Ucirc: "\u00DB",
        Uuml: "\u00DC", Yacute: "\u00DD", THORN: "\u00DE",
        szlig: "\u00DF", agrave: "\u00E0", aacute: "\u00E1",
        acirc: "\u00E2", atilde: "\u00E3", auml: "\u00E4",
        aring: "\u00E5", aelig: "\u00E6", ccedil: "\u00E7",
        egrave: "\u00E8", eacute: "\u00E9", ecirc: "\u00EA",
        euml: "\u00EB", igrave: "\u00EC", iacute: "\u00ED",
        icirc: "\u00EE", iuml: "\u00EF", eth: "\u00F0",
        ntilde: "\u00F1", ograve: "\u00F2", oacute: "\u00F3",
        ocirc: "\u00F4", otilde: "\u00F5", ouml: "\u00F6",
        divide: "\u00F7", oslash: "\u00F8", ugrave: "\u00F9",
        uacute: "\u00FA", ucirc: "\u00FB", uuml: "\u00FC",
        yacute: "\u00FD", thorn: "\u00FE", yuml: "\u00FF",
        OElig: "\u0152", oelig: "\u0153", Scaron: "\u0160",
        scaron: "\u0161", Yuml: "\u0178", fnof: "\u0192",
        circ: "\u02C6", tilde: "\u02DC", Alpha: "\u0391",
        Beta: "\u0392", Gamma: "\u0393", Delta: "\u0394",
        Epsilon: "\u0395", Zeta: "\u0396", Eta: "\u0397",
        Theta: "\u0398", Iota: "\u0399", Kappa: "\u039A",
        Lambda: "\u039B", Mu: "\u039C", Nu: "\u039D",
        Xi: "\u039E", Omicron: "\u039F", Pi: "\u03A0",
        Rho: "\u03A1", Sigma: "\u03A3", Tau: "\u03A4",
        Upsilon: "\u03A5", Phi: "\u03A6", Chi: "\u03A7",
        Psi: "\u03A8", Omega: "\u03A9", alpha: "\u03B1",
        beta: "\u03B2", gamma: "\u03B3", delta: "\u03B4",
        epsilon: "\u03B5", zeta: "\u03B6", eta: "\u03B7",
        theta: "\u03B8", iota: "\u03B9", kappa: "\u03BA",
        lambda: "\u03BB", mu: "\u03BC", nu: "\u03BD",
        xi: "\u03BE", omicron: "\u03BF", pi: "\u03C0",
        rho: "\u03C1", sigmaf: "\u03C2", sigma: "\u03C3",
        tau: "\u03C4", upsilon: "\u03C5", phi: "\u03C6",
        chi: "\u03C7", psi: "\u03C8", omega: "\u03C9",
        thetasym: "\u03D1", upsih: "\u03D2", piv: "\u03D6",
        ensp: "\u2002", emsp: "\u2003", thinsp: "\u2009",
        zwnj: "\u200C", zwj: "\u200D", lrm: "\u200E",
        rlm: "\u200F", ndash: "\u2013", mdash: "\u2014",
        lsquo: "\u2018", rsquo: "\u2019", sbquo: "\u201A",
        ldquo: "\u201C", rdquo: "\u201D", bdquo: "\u201E",
        dagger: "\u2020", Dagger: "\u2021", bull: "\u2022",
        hellip: "\u2026", permil: "\u2030", prime: "\u2032",
        Prime: "\u2033", lsaquo: "\u2039", rsaquo: "\u203A",
        oline: "\u203E", frasl: "\u2044", euro: "\u20AC",
        image: "\u2111", weierp: "\u2118", real: "\u211C",
        trade: "\u2122", alefsym: "\u2135", larr: "\u2190",
        uarr: "\u2191", rarr: "\u2192", darr: "\u2193",
        harr: "\u2194", crarr: "\u21B5", lArr: "\u21D0",
        uArr: "\u21D1", rArr: "\u21D2", dArr: "\u21D3",
        hArr: "\u21D4", forall: "\u2200", part: "\u2202",
        exist: "\u2203", empty: "\u2205", nabla: "\u2207",
        isin: "\u2208", notin: "\u2209", ni: "\u220B",
        prod: "\u220F", sum: "\u2211", minus: "\u2212",
        lowast: "\u2217", radic: "\u221A", prop: "\u221D",
        infin: "\u221E", ang: "\u2220", and: "\u2227",
        or: "\u2228", cap: "\u2229", cup: "\u222A",
        int: "\u222B", there4: "\u2234", sim: "\u223C",
        cong: "\u2245", asymp: "\u2248", ne: "\u2260",
        equiv: "\u2261", le: "\u2264", ge: "\u2265",
        sub: "\u2282", sup: "\u2283", nsub: "\u2284",
        sube: "\u2286", supe: "\u2287", oplus: "\u2295",
        otimes: "\u2297", perp: "\u22A5", sdot: "\u22C5",
        lceil: "\u2308", rceil: "\u2309", lfloor: "\u230A",
        rfloor: "\u230B", lang: "\u27E8", rang: "\u27E9",
        loz: "\u25CA", spades: "\u2660", clubs: "\u2663",
        hearts: "\u2665", diams: "\u2666"
    };

    // Internal lookup hash of all chars with HTML entities
    var htmlChars = {};

    // Initializer for htmlChars
	for (var ent in htmlEntities) {
		var char = htmlEntities[ent];
		htmlChars[char] = "&" + ent + ";";
	}

    // Checks if a string contains an XML or HTML entity
    function isXml(str) {
        return /&[A-Za-z]{1,8};/.test(str) ||
               /&#[0-9]{1,6};/.test(str) ||
               /&#x[0-9a-fA-F]{1,4};/.test(str);
    }

    // Decodes a string with XML or HTML entities
    function fromXml(str) {
        function parseChar(chr, parser) {
            if (chr == "&") {
                var entity = parser.read(10, /[^;]/);
                chr = parser.read();
                if (chr != ";") {
                    parser.unread(chr);
                    parser.unread(entity);
                    return "&";
                }
                if (/^#x[0-9a-fA-F]+$/.test(entity)) {
                    var code = parseInt(entity.substr(2), 16);
                    return String.fromCharCode(code);
                } else if (/^#[0-9]+$/.test(entity)) {
                    var code = parseInt(entity.substr(1), 10);
                    return String.fromCharCode(code);
                } else if (htmlEntities.hasOwnProperty(entity)) {
                    return htmlEntities[entity];
                } else {
                    parser.unread(";");
                    parser.unread(entity);
                    return "&";
                }
            } else {
                return chr;
            }
        }
        return parseString(str, parseChar);
    }

    // Encodes a string to valid XML by adding character entities
    function toXml(str) {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/\"/g, "&quot;");
        str = str.replace(/\'/g, "&apos;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        return str;
    }

    // Encodes a string to valid ASCII XML by adding numeric character entities
    function toXmlAscii(str) {
        function toChar(chr, code) {
            if (code < 127) {
                return chr;
            } else {
                return "&#" + code + ";";
            }
        }
        return translateString(toXml(str), toChar);
    }

    // Encodes a string to valid XML with only numeric character entities
    function toXmlNumeric(str) {
        function toChar(chr, code) {
            return "&#" + code + ";";
        }
        return translateString(str, toChar);
    }

    // Encodes a string to valid ASCII HTML by adding symbolic and numeric character entities
    function toHtml(str) {
        function toChar(chr, code) {
            if (code < 127) {
                return chr;
            } else if (htmlChars[chr]) {
            	return htmlChars[chr];
            } else {
                return "&#" + code + ";";
            }
        }
        return translateString(toXml(str), toChar);
    }

    // Returns a function that replaces newlines with a string
    function newlineReplacer(repl) {
        return function (str) {
            return str.split(/\r\n|\r|\n/).join(repl);
        }
    }

    // Export module symbols
    module.isAscii = isAscii;
    module.toAscii = toAscii;
    module.isLatin1 = isLatin1;
    module.toLatin1 = toLatin1;
    module.isUtf8 = isUtf8;
    module.fromUtf8 = fromUtf8;
    module.toUtf8 = toUtf8;
    module.isBase64 = isBase64;
    module.fromBase64 = fromBase64;
    module.toBase64 = toBase64;
    module.isHex = isHex;
    module.fromHex = fromHex;
    module.toHex = toHex;
    module.isQuotedPrintable = isQuotedPrintable;
    module.fromQuotedPrintable = fromQuotedPrintable;
    module.toQuotedPrintable = toQuotedPrintable;
    module.isCpp = isCpp;
    module.fromCpp = fromCpp;
    module.toCpp = toCpp;
    module.isJson = isJson;
    module.fromJson = fromJson;
    module.toJson = toJson;
    module.isSql = isSql;
    module.fromSql = fromSql;
    module.toSql = toSql;
    module.toPostgreSql = toPostgreSql;
    module.isUrl = isUrl;
    module.fromUrl= fromUrl;
    module.toUrl = toUrl;
    module.isWwwForm = isWwwForm;
    module.fromWwwForm = fromWwwForm;
    module.toWwwForm = toWwwForm;
    module.isXml = isXml;
    module.fromXml = fromXml;
    module.toXml = toXml;
    module.toXmlAscii = toXmlAscii;
    module.toXmlNumeric = toXmlNumeric;
    module.toHtml = toHtml;
    module.toUnix = newlineReplacer("\n");
    module.toWin = newlineReplacer("\r\n");
    module.toMac = newlineReplacer("\r");

})(Convert);
