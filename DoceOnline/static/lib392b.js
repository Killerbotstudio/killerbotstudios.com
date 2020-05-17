/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */ ! function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
    d = a.document,
    e = c.slice,
    f = c.concat,
    g = c.push,
    h = c.indexOf,
    i = {},
    j = i.toString,
    k = i.hasOwnProperty,
    l = {},
    m = "2.2.4",
    n = function(a, b) {
      return new n.fn.init(a, b)
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function(a, b) {
      return b.toUpperCase()
    };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function() {
      return e.call(this)
    },
    get: function(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
    },
    pushStack: function(a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function(a) {
      return n.each(this, a)
    },
    map: function(a) {
      return this.pushStack(n.map(this, function(b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function() {
      return this.pushStack(e.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor()
    },
    push: g,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function() {
    var a, b, c, d, e, f, g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (a = arguments[h]))
        for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
    return g
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(a) {
      throw new Error(a)
    },
    noop: function() {},
    isFunction: function(a) {
      return "function" === n.type(a)
    },
    isArray: Array.isArray,
    isWindow: function(a) {
      return null != a && a === a.window
    },
    isNumeric: function(a) {
      var b = a && a.toString();
      return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
    },
    isPlainObject: function(a) {
      var b;
      if ("object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
      if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype || {}, "isPrototypeOf")) return !1;
      for (b in a);
      return void 0 === b || k.call(a, b)
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    type: function(a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
    },
    globalEval: function(a) {
      var b, c = eval;
      a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = d.createElement("script"), b.text = a, d.head.appendChild(b).parentNode.removeChild(b)) : c(a))
    },
    camelCase: function(a) {
      return a.replace(p, "ms-").replace(q, r)
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function(a, b) {
      var c, d = 0;
      if (s(a)) {
        for (c = a.length; c > d; d++)
          if (b.call(a[d], d, a[d]) === !1) break
      } else
        for (d in a)
          if (b.call(a[d], d, a[d]) === !1) break;
      return a
    },
    trim: function(a) {
      return null == a ? "" : (a + "").replace(o, "")
    },
    makeArray: function(a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c
    },
    inArray: function(a, b, c) {
      return null == b ? -1 : h.call(b, a, c)
    },
    merge: function(a, b) {
      for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
      return a.length = e, a
    },
    grep: function(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
      return e
    },
    map: function(a, b, c) {
      var d, e, g = 0,
        h = [];
      if (s(a))
        for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e);
      else
        for (g in a) e = b(a[g], g, c), null != e && h.push(e);
      return f.apply([], h)
    },
    guid: 1,
    proxy: function(a, b) {
      var c, d, f;
      return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (d = e.call(arguments, 2), f = function() {
        return a.apply(b || this, d.concat(e.call(arguments)))
      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
    },
    now: Date.now,
    support: l
  }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
    i["[object " + b + "]"] = b.toLowerCase()
  });

  function s(a) {
    var b = !!a && "length" in a && a.length,
      c = n.type(a);
    return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var t = function(a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
      v = a.document,
      w = 0,
      x = 0,
      y = ga(),
      z = ga(),
      A = ga(),
      B = function(a, b) {
        return a === b && (l = !0), 0
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
          if (a[c] === b) return c;
        return -1
      },
      K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
      O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
      P = new RegExp(L + "+", "g"),
      Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      R = new RegExp("^" + L + "*," + L + "*"),
      S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      U = new RegExp(O),
      V = new RegExp("^" + M + "$"),
      W = {
        ID: new RegExp("^#(" + M + ")"),
        CLASS: new RegExp("^\\.(" + M + ")"),
        TAG: new RegExp("^(" + M + "|[*])"),
        ATTR: new RegExp("^" + N),
        PSEUDO: new RegExp("^" + O),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + K + ")$", "i"),
        needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
      },
      X = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      Z = /^[^{]+\{\s*\[native \w/,
      $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      _ = /[+~]/,
      aa = /'|\\/g,
      ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      ca = function(a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      },
      da = function() {
        m()
      };
    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
    } catch (ea) {
      H = {
        apply: E.length ? function(a, b) {
          G.apply(a, I.call(b))
        } : function(a, b) {
          var c = a.length,
            d = 0;
          while (a[c++] = b[d++]);
          a.length = c - 1
        }
      }
    }

    function fa(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w = b && b.ownerDocument,
        x = b ? b.nodeType : 9;
      if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
      if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== x && (o = $.exec(a)))
          if (f = o[1]) {
            if (9 === x) {
              if (!(j = b.getElementById(f))) return d;
              if (j.id === f) return d.push(j), d
            } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
          } else {
            if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
            if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d
          } if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== x) w = b, s = a;
          else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&"): b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
            while (h--) r[h] = l + " " + qa(r[h]);
            s = r.join(","), w = _.test(a) && oa(b.parentNode) || b
          }
          if (s) try {
            return H.apply(d, w.querySelectorAll(s)), d
          } catch (y) {} finally {
            k === u && b.removeAttribute("id")
          }
        }
      }
      return i(a.replace(Q, "$1"), b, d, e)
    }

    function ga() {
      var a = [];

      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
      }
      return b
    }

    function ha(a) {
      return a[u] = !0, a
    }

    function ia(a) {
      var b = n.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function ja(a, b) {
      var c = a.split("|"),
        e = c.length;
      while (e--) d.attrHandle[c[e]] = b
    }

    function ka(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function la(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function ma(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function na(a) {
      return ha(function(b) {
        return b = +b, ha(function(c, d) {
          var e, f = a([], c.length, b),
            g = f.length;
          while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function oa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a
    }
    c = fa.support = {}, f = fa.isXML = function(a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, m = fa.setDocument = function(a) {
      var b, e, g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function(a) {
        return a.className = "i", !a.getAttribute("className")
      }), c.getElementsByTagName = ia(function(a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
      }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function(a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
      }), c.getById ? (d.find.ID = function(a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c ? [c] : []
        }
      }, d.filter.ID = function(a) {
        var b = a.replace(ba, ca);
        return function(a) {
          return a.getAttribute("id") === b
        }
      }) : (delete d.find.ID, d.filter.ID = function(a) {
        var b = a.replace(ba, ca);
        return function(a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
      } : function(a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++]) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
        return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
      }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function(a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
      }), ia(function(a) {
        var b = n.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
      })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function(a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O)
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function(a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a) return !0;
        return !1
      }, B = b ? function(a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
      } : function(a, b) {
        if (a === b) return l = !0, 0;
        var c, d = 0,
          e = a.parentNode,
          f = b.parentNode,
          g = [a],
          h = [b];
        if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f) return ka(a, b);
        c = a;
        while (c = c.parentNode) g.unshift(c);
        c = b;
        while (c = c.parentNode) h.unshift(c);
        while (g[d] === h[d]) d++;
        return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
      }, n) : n
    }, fa.matches = function(a, b) {
      return fa(a, null, null, b)
    }, fa.matchesSelector = function(a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      } catch (e) {}
      return fa(b, n, null, [a]).length > 0
    }, fa.contains = function(a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b)
    }, fa.attr = function(a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
        f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
    }, fa.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, fa.uniqueSort = function(a) {
      var b, d = [],
        e = 0,
        f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) b === a[f] && (e = d.push(f));
        while (e--) a.splice(d[e], 1)
      }
      return k = null, a
    }, e = fa.getText = function(a) {
      var b, c = "",
        d = 0,
        f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
        } else if (3 === f || 4 === f) return a.nodeValue
      } else
        while (b = a[d++]) c += e(b);
      return c
    }, d = fa.selectors = {
      cacheLength: 50,
      createPseudo: ha,
      match: W,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(a) {
          return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a
        },
        PSEUDO: function(a) {
          var b, c = !a[6] && a[2];
          return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function(a) {
          var b = a.replace(ba, ca).toLowerCase();
          return "*" === a ? function() {
            return !0
          } : function(a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function(a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
          })
        },
        ATTR: function(a, b, c) {
          return function(d) {
            var e = fa.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
          }
        },
        CHILD: function(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function(a) {
            return !!a.parentNode
          } : function(b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h,
              t = !1;
            if (q) {
              if (f) {
                while (p) {
                  m = b;
                  while (m = m[p])
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];
                    break
                  }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1)
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              return t -= e, t === d || t % d === 0 && t / d >= 0
            }
          }
        },
        PSEUDO: function(a, b) {
          var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function(a, c) {
            var d, f = e(a, b),
              g = f.length;
            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
          }) : function(a) {
            return e(a, 0, c)
          }) : e
        }
      },
      pseudos: {
        not: ha(function(a) {
          var b = [],
            c = [],
            d = h(a.replace(Q, "$1"));
          return d[u] ? ha(function(a, b, c, e) {
            var f, g = d(a, null, e, []),
              h = a.length;
            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function(a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
          }
        }),
        has: ha(function(a) {
          return function(b) {
            return fa(a, b).length > 0
          }
        }),
        contains: ha(function(a) {
          return a = a.replace(ba, ca),
            function(b) {
              return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
            }
        }),
        lang: ha(function(a) {
          return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(),
            function(b) {
              var c;
              do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function(a) {
          return a === o
        },
        focus: function(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function(a) {
          return a.disabled === !1
        },
        disabled: function(a) {
          return a.disabled === !0
        },
        checked: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function(a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6) return !1;
          return !0
        },
        parent: function(a) {
          return !d.pseudos.empty(a)
        },
        header: function(a) {
          return Y.test(a.nodeName)
        },
        input: function(a) {
          return X.test(a.nodeName)
        },
        button: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        },
        first: na(function() {
          return [0]
        }),
        last: na(function(a, b) {
          return [b - 1]
        }),
        eq: na(function(a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: na(function(a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: na(function(a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: na(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: na(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) d.pseudos[b] = la(b);
    for (b in {
        submit: !0,
        reset: !0
      }) d.pseudos[b] = ma(b);

    function pa() {}
    pa.prototype = d.filters = d.pseudos, d.setFilters = new pa, g = fa.tokenize = function(a, b) {
      var c, e, f, g, h, i, j, k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(Q, " ")
        }), h = h.slice(c.length));
        for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
          value: c,
          type: g,
          matches: e
        }), h = h.slice(c.length));
        if (!c) break
      }
      return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
    };

    function qa(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function ra(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first ? function(b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function(b, c, g) {
        var h, i, j, k = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        } else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
              if (i[d] = k, k[2] = a(b, c, g)) return !0
            }
      }
    }

    function sa(a) {
      return a.length > 1 ? function(b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
      return c
    }

    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      return g
    }

    function va(a, b, c, d, e, f) {
      return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function(f, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = f || ta(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : ua(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = ua(r, n), d(j, [], h, i), k = j.length;
          while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)(l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i)
            }
            k = r.length;
            while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
          }
        } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
      })
    }

    function wa(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function(a) {
          return a === b
        }, h, !0), l = ra(function(a) {
          return J(b, a) > -1
        }, h, !0), m = [function(a, c, d) {
          var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
          return b = null, e
        }]; f > i; i++)
        if (c = d.relative[a[i].type]) m = [ra(sa(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type]) break;
            return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
          }
          m.push(c)
        } return sa(m)
    }

    function xa(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function(f, g, h, i, k) {
          var l, o, q, r = 0,
            s = "0",
            t = f && [],
            u = [],
            v = j,
            x = f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;
          for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
            if (e && l) {
              o = 0, g || l.ownerDocument === n || (m(l), h = !p);
              while (q = a[o++])
                if (q(l, g || n, h)) {
                  i.push(l);
                  break
                } k && (w = y)
            }
            c && ((l = !q && l) && r--, f && t.push(l))
          }
          if (r += s, c && s !== r) {
            o = 0;
            while (q = b[o++]) q(t, u, g, h);
            if (f) {
              if (r > 0)
                while (s--) t[s] || u[s] || (u[s] = F.call(i));
              u = ua(u)
            }
            H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
          }
          return k && (w = y, j = v), t
        };
      return c ? ha(f) : f
    }
    return h = fa.compile = function(a, b) {
      var c, d = [],
        e = [],
        f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, xa(e, d)), f.selector = a
      }
      return f
    }, i = fa.select = function(a, b, e, f) {
      var i, j, k, l, m, n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length)
        }
        i = W.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type]) break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
            break
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function(a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"))
    }), ia(function(a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || ja("type|href|height|width", function(a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), c.attributes && ia(function(a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || ja("value", function(a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), ia(function(a) {
      return null == a.getAttribute("disabled")
    }) || ja(K, function(a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
    }), fa
  }(a);
  n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
  var u = function(a, b, c) {
      var d = [],
        e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c)) break;
          d.push(a)
        } return d
    },
    v = function(a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    },
    w = n.expr.match.needsContext,
    x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    y = /^.[^:#\[\.,]*$/;

  function z(a, b, c) {
    if (n.isFunction(b)) return n.grep(a, function(a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return n.grep(a, function(a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (y.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a)
    }
    return n.grep(a, function(a) {
      return h.call(b, a) > -1 !== c
    })
  }
  n.filter = function(a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
      return 1 === a.nodeType
    }))
  }, n.fn.extend({
    find: function(a) {
      var b, c = this.length,
        d = [],
        e = this;
      if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
        for (b = 0; c > b; b++)
          if (n.contains(e[b], this)) return !0
      }));
      for (b = 0; c > b; b++) n.find(a, e[b], d);
      return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
    },
    filter: function(a) {
      return this.pushStack(z(this, a || [], !1))
    },
    not: function(a) {
      return this.pushStack(z(this, a || [], !0))
    },
    is: function(a) {
      return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
    }
  });
  var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = n.fn.init = function(a, b, c) {
      var e, f;
      if (!a) return this;
      if (c = c || A, "string" == typeof a) {
        if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
        if (e[1]) {
          if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b))
            for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
          return this
        }
        return f = d.getElementById(e[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = d, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
    };
  C.prototype = n.fn, A = n(d);
  var D = /^(?:parents|prev(?:Until|All))/,
    E = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  n.fn.extend({
    has: function(a) {
      var b = n(a, this),
        c = b.length;
      return this.filter(function() {
        for (var a = 0; c > a; a++)
          if (n.contains(this, b[a])) return !0
      })
    },
    closest: function(a, b) {
      for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break
          } return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
    },
    index: function(a) {
      return a ? "string" == typeof a ? h.call(n(a), this[0]) : h.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  });

  function F(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType);
    return a
  }
  n.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function(a) {
      return u(a, "parentNode")
    },
    parentsUntil: function(a, b, c) {
      return u(a, "parentNode", c)
    },
    next: function(a) {
      return F(a, "nextSibling")
    },
    prev: function(a) {
      return F(a, "previousSibling")
    },
    nextAll: function(a) {
      return u(a, "nextSibling")
    },
    prevAll: function(a) {
      return u(a, "previousSibling")
    },
    nextUntil: function(a, b, c) {
      return u(a, "nextSibling", c)
    },
    prevUntil: function(a, b, c) {
      return u(a, "previousSibling", c)
    },
    siblings: function(a) {
      return v((a.parentNode || {}).firstChild, a)
    },
    children: function(a) {
      return v(a.firstChild)
    },
    contents: function(a) {
      return a.contentDocument || n.merge([], a.childNodes)
    }
  }, function(a, b) {
    n.fn[a] = function(c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || n.uniqueSort(e), D.test(a) && e.reverse()), this.pushStack(e)
    }
  });
  var G = /\S+/g;

  function H(a) {
    var b = {};
    return n.each(a.match(G) || [], function(a, c) {
      b[c] = !0
    }), b
  }
  n.Callbacks = function(a) {
    a = "string" == typeof a ? H(a) : n.extend({}, a);
    var b, c, d, e, f = [],
      g = [],
      h = -1,
      i = function() {
        for (e = a.once, d = b = !0; g.length; h = -1) {
          c = g.shift();
          while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
        }
        a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
      },
      j = {
        add: function() {
          return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
            n.each(b, function(b, c) {
              n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
            })
          }(arguments), c && !b && i()), this
        },
        remove: function() {
          return n.each(arguments, function(a, b) {
            var c;
            while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--
          }), this
        },
        has: function(a) {
          return a ? n.inArray(a, f) > -1 : f.length > 0
        },
        empty: function() {
          return f && (f = []), this
        },
        disable: function() {
          return e = g = [], f = c = "", this
        },
        disabled: function() {
          return !f
        },
        lock: function() {
          return e = g = [], c || (f = c = ""), this
        },
        locked: function() {
          return !!e
        },
        fireWith: function(a, c) {
          return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
        },
        fire: function() {
          return j.fireWith(this, arguments), this
        },
        fired: function() {
          return !!d
        }
      };
    return j
  }, n.extend({
    Deferred: function(a) {
      var b = [
          ["resolve", "done", n.Callbacks("once memory"), "resolved"],
          ["reject", "fail", n.Callbacks("once memory"), "rejected"],
          ["notify", "progress", n.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function() {
            return c
          },
          always: function() {
            return e.done(arguments).fail(arguments), this
          },
          then: function() {
            var a = arguments;
            return n.Deferred(function(c) {
              n.each(b, function(b, f) {
                var g = n.isFunction(a[b]) && a[b];
                e[f[1]](function() {
                  var a = g && g.apply(this, arguments);
                  a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function(a) {
            return null != a ? n.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, n.each(b, function(a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function(a) {
      var b = 0,
        c = e.call(arguments),
        d = c.length,
        f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
        g = 1 === f ? a : n.Deferred(),
        h = function(a, b, c) {
          return function(d) {
            b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
          }
        },
        i, j, k;
      if (d > 1)
        for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
      return f || g.resolveWith(k, c), g.promise()
    }
  });
  var I;
  n.fn.ready = function(a) {
    return n.ready.promise().done(a), this
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? n.readyWait++ : n.ready(!0)
    },
    ready: function(a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))))
    }
  });

  function J() {
    d.removeEventListener("DOMContentLoaded", J), a.removeEventListener("load", J), n.ready()
  }
  n.ready.promise = function(b) {
    return I || (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(n.ready) : (d.addEventListener("DOMContentLoaded", J), a.addEventListener("load", J))), I.promise(b)
  }, n.ready.promise();
  var K = function(a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === n.type(c)) {
        e = !0;
        for (h in c) K(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
          return j.call(n(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    },
    L = function(a) {
      return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

  function M() {
    this.expando = n.expando + M.uid++
  }
  M.uid = 1, M.prototype = {
    register: function(a, b) {
      var c = b || {};
      return a.nodeType ? a[this.expando] = c : Object.defineProperty(a, this.expando, {
        value: c,
        writable: !0,
        configurable: !0
      }), a[this.expando]
    },
    cache: function(a) {
      if (!L(a)) return {};
      var b = a[this.expando];
      return b || (b = {}, L(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
        value: b,
        configurable: !0
      }))), b
    },
    set: function(a, b, c) {
      var d, e = this.cache(a);
      if ("string" == typeof b) e[b] = c;
      else
        for (d in b) e[d] = b[d];
      return e
    },
    get: function(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][b]
    },
    access: function(a, b, c) {
      var d;
      return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
    },
    remove: function(a, b) {
      var c, d, e, f = a[this.expando];
      if (void 0 !== f) {
        if (void 0 === b) this.register(a);
        else {
          n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in f ? d = [b, e] : (d = e, d = d in f ? [d] : d.match(G) || [])), c = d.length;
          while (c--) delete f[d[c]]
        }(void 0 === b || n.isEmptyObject(f)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
      }
    },
    hasData: function(a) {
      var b = a[this.expando];
      return void 0 !== b && !n.isEmptyObject(b)
    }
  };
  var N = new M,
    O = new M,
    P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Q = /[A-Z]/g;

  function R(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType)
      if (d = "data-" + b.replace(Q, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : P.test(c) ? n.parseJSON(c) : c;
        } catch (e) {}
        O.set(a, b, c)
      } else c = void 0;
    return c
  }
  n.extend({
    hasData: function(a) {
      return O.hasData(a) || N.hasData(a)
    },
    data: function(a, b, c) {
      return O.access(a, b, c)
    },
    removeData: function(a, b) {
      O.remove(a, b)
    },
    _data: function(a, b, c) {
      return N.access(a, b, c)
    },
    _removeData: function(a, b) {
      N.remove(a, b)
    }
  }), n.fn.extend({
    data: function(a, b) {
      var c, d, e, f = this[0],
        g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = O.get(f), 1 === f.nodeType && !N.get(f, "hasDataAttrs"))) {
          c = g.length;
          while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), R(f, d, e[d])));
          N.set(f, "hasDataAttrs", !0)
        }
        return e
      }
      return "object" == typeof a ? this.each(function() {
        O.set(this, a)
      }) : K(this, function(b) {
        var c, d;
        if (f && void 0 === b) {
          if (c = O.get(f, a) || O.get(f, a.replace(Q, "-$&").toLowerCase()), void 0 !== c) return c;
          if (d = n.camelCase(a), c = O.get(f, d), void 0 !== c) return c;
          if (c = R(f, d, void 0), void 0 !== c) return c
        } else d = n.camelCase(a), this.each(function() {
          var c = O.get(this, d);
          O.set(this, d, b), a.indexOf("-") > -1 && void 0 !== c && O.set(this, a, b)
        })
      }, null, b, arguments.length > 1, null, !0)
    },
    removeData: function(a) {
      return this.each(function() {
        O.remove(this, a)
      })
    }
  }), n.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = N.get(a, b), c && (!d || n.isArray(c) ? d = N.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = n.queue(a, b),
        d = c.length,
        e = c.shift(),
        f = n._queueHooks(a, b),
        g = function() {
          n.dequeue(a, b)
        };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return N.get(a, c) || N.access(a, c, {
        empty: n.Callbacks("once memory").add(function() {
          N.remove(a, [b + "queue", c])
        })
      })
    }
  }), n.fn.extend({
    queue: function(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
      })
    },
    dequeue: function(a) {
      return this.each(function() {
        n.dequeue(this, a)
      })
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", [])
    },
    promise: function(a, b) {
      var c, d = 1,
        e = n.Deferred(),
        f = this,
        g = this.length,
        h = function() {
          --d || e.resolveWith(f, [f])
        };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--) c = N.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b)
    }
  });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
    U = ["Top", "Right", "Bottom", "Left"],
    V = function(a, b) {
      return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
    };

  function W(a, b, c, d) {
    var e, f = 1,
      g = 20,
      h = d ? function() {
        return d.cur()
      } : function() {
        return n.css(a, b, "")
      },
      i = h(),
      j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
      k = (n.cssNumber[b] || "px" !== j && +i) && T.exec(n.css(a, b));
    if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;
      do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
    }
    return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
  }
  var X = /^(?:checkbox|radio)$/i,
    Y = /<([\w:-]+)/,
    Z = /^$|\/(?:java|ecma)script/i,
    $ = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  $.optgroup = $.option, $.tbody = $.tfoot = $.colgroup = $.caption = $.thead, $.th = $.td;

  function _(a, b) {
    var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
  }

  function aa(a, b) {
    for (var c = 0, d = a.length; d > c; c++) N.set(a[c], "globalEval", !b || N.get(b[c], "globalEval"))
  }
  var ba = /<|&#?\w+;/;

  function ca(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], o = 0, p = a.length; p > o; o++)
      if (f = a[o], f || 0 === f)
        if ("object" === n.type(f)) n.merge(m, f.nodeType ? [f] : f);
        else if (ba.test(f)) {
      g = g || l.appendChild(b.createElement("div")), h = (Y.exec(f) || ["", ""])[1].toLowerCase(), i = $[h] || $._default, g.innerHTML = i[1] + n.htmlPrefilter(f) + i[2], k = i[0];
      while (k--) g = g.lastChild;
      n.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
    } else m.push(b.createTextNode(f));
    l.textContent = "", o = 0;
    while (f = m[o++])
      if (d && n.inArray(f, d) > -1) e && e.push(f);
      else if (j = n.contains(f.ownerDocument, f), g = _(l.appendChild(f), "script"), j && aa(g), c) {
      k = 0;
      while (f = g[k++]) Z.test(f.type || "") && c.push(f)
    }
    return l
  }! function() {
    var a = d.createDocumentFragment(),
      b = a.appendChild(d.createElement("div")),
      c = d.createElement("input");
    c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
  }();
  var da = /^key/,
    ea = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    fa = /^([^.]*)(?:\.(.+)|)/;

  function ga() {
    return !0
  }

  function ha() {
    return !1
  }

  function ia() {
    try {
      return d.activeElement
    } catch (a) {}
  }

  function ja(a, b, c, d, e, f) {
    var g, h;
    if ("object" == typeof b) {
      "string" != typeof c && (d = d || c, c = void 0);
      for (h in b) ja(a, h, c, d, b[h], f);
      return a
    }
    if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = ha;
    else if (!e) return a;
    return 1 === f && (g = e, e = function(a) {
      return n().off(a), g.apply(this, arguments)
    }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function() {
      n.event.add(this, b, e, d, c)
    })
  }
  n.event = {
    global: {},
    add: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = N.get(a);
      if (r) {
        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
          return "undefined" != typeof n && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
        }), b = (b || "").match(G) || [""], j = b.length;
        while (j--) h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && n.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
      }
    },
    remove: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = N.hasData(a) && N.get(a);
      if (r && (i = r.events)) {
        b = (b || "").match(G) || [""], j = b.length;
        while (j--)
          if (h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
            while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
          } else
            for (o in i) n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(i) && N.remove(a, "handle events")
      }
    },
    dispatch: function(a) {
      a = n.event.fix(a);
      var b, c, d, f, g, h = [],
        i = e.call(arguments),
        j = (N.get(this, "events") || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, c = 0;
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function(a, b) {
      var c, d, e, f, g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
        for (; i !== this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            })
          } return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, b) {
        var c, e, f, g = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || d, e = c.documentElement, f = c.body, a.pageX = b.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
      }
    },
    fix: function(a) {
      if (a[n.expando]) return a;
      var b, c, e, f = a.type,
        g = a,
        h = this.fixHooks[f];
      h || (this.fixHooks[f] = h = ea.test(f) ? this.mouseHooks : da.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
      while (b--) c = e[b], a[c] = g[c];
      return a.target || (a.target = d), 3 === a.target.nodeType && (a.target = a.target.parentNode), h.filter ? h.filter(a, g) : a
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== ia() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === ia() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
        },
        _default: function(a) {
          return n.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }
      }
    }
  }, n.removeEvent = function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c)
  }, n.Event = function(a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ga : ha) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
  }, n.Event.prototype = {
    constructor: n.Event,
    isDefaultPrevented: ha,
    isPropagationStopped: ha,
    isImmediatePropagationStopped: ha,
    isSimulated: !1,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = ga, a && !this.isSimulated && a.preventDefault()
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = ga, a && !this.isSimulated && a.stopPropagation()
    },
    stopImmediatePropagation: function() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = ga, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), n.fn.extend({
    on: function(a, b, c, d) {
      return ja(this, a, b, c, d)
    },
    one: function(a, b, c, d) {
      return ja(this, a, b, c, d, 1)
    },
    off: function(a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this
      }
      return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = ha), this.each(function() {
        n.event.remove(this, a, c, b)
      })
    }
  });
  var ka = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    la = /<script|<style|<link/i,
    ma = /checked\s*(?:[^=]|=\s*.checked.)/i,
    na = /^true\/(.*)/,
    oa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function pa(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function qa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
  }

  function ra(a) {
    var b = na.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function sa(a, b) {
    var c, d, e, f, g, h, i, j;
    if (1 === b.nodeType) {
      if (N.hasData(a) && (f = N.access(a), g = N.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};
        for (e in j)
          for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
      }
      O.hasData(a) && (h = O.access(a), i = n.extend({}, h), O.set(b, i))
    }
  }

  function ta(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && X.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
  }

  function ua(a, b, c, d) {
    b = f.apply([], b);
    var e, g, h, i, j, k, m = 0,
      o = a.length,
      p = o - 1,
      q = b[0],
      r = n.isFunction(q);
    if (r || o > 1 && "string" == typeof q && !l.checkClone && ma.test(q)) return a.each(function(e) {
      var f = a.eq(e);
      r && (b[0] = q.call(this, e, f.html())), ua(f, b, c, d)
    });
    if (o && (e = ca(b, a[0].ownerDocument, !1, a, d), g = e.firstChild, 1 === e.childNodes.length && (e = g), g || d)) {
      for (h = n.map(_(e, "script"), qa), i = h.length; o > m; m++) j = e, m !== p && (j = n.clone(j, !0, !0), i && n.merge(h, _(j, "script"))), c.call(a[m], j, m);
      if (i)
        for (k = h[h.length - 1].ownerDocument, n.map(h, ra), m = 0; i > m; m++) j = h[m], Z.test(j.type || "") && !N.access(j, "globalEval") && n.contains(k, j) && (j.src ? n._evalUrl && n._evalUrl(j.src) : n.globalEval(j.textContent.replace(oa, "")))
    }
    return a
  }

  function va(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(_(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && aa(_(d, "script")), d.parentNode.removeChild(d));
    return a
  }
  n.extend({
    htmlPrefilter: function(a) {
      return a.replace(ka, "<$1></$2>")
    },
    clone: function(a, b, c) {
      var d, e, f, g, h = a.cloneNode(!0),
        i = n.contains(a.ownerDocument, a);
      if (!(l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (g = _(h), f = _(a), d = 0, e = f.length; e > d; d++) ta(f[d], g[d]);
      if (b)
        if (c)
          for (f = f || _(a), g = g || _(h), d = 0, e = f.length; e > d; d++) sa(f[d], g[d]);
        else sa(a, h);
      return g = _(h, "script"), g.length > 0 && aa(g, !i && _(a, "script")), h
    },
    cleanData: function(a) {
      for (var b, c, d, e = n.event.special, f = 0; void 0 !== (c = a[f]); f++)
        if (L(c)) {
          if (b = c[N.expando]) {
            if (b.events)
              for (d in b.events) e[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
            c[N.expando] = void 0
          }
          c[O.expando] && (c[O.expando] = void 0)
        }
    }
  }), n.fn.extend({
    domManip: ua,
    detach: function(a) {
      return va(this, a, !0)
    },
    remove: function(a) {
      return va(this, a)
    },
    text: function(a) {
      return K(this, function(a) {
        return void 0 === a ? n.text(this) : this.empty().each(function() {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
        })
      }, null, a, arguments.length)
    },
    append: function() {
      return ua(this, arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function() {
      return ua(this, arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function() {
      return ua(this, arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function() {
      return ua(this, arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    empty: function() {
      for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(_(a, !1)), a.textContent = "");
      return this
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return n.clone(this, a, b)
      })
    },
    html: function(a) {
      return K(this, function(a) {
        var b = this[0] || {},
          c = 0,
          d = this.length;
        if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
        if ("string" == typeof a && !la.test(a) && !$[(Y.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = n.htmlPrefilter(a);
          try {
            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(_(b, !1)), b.innerHTML = a);
            b = 0
          } catch (e) {}
        }
        b && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function() {
      var a = [];
      return ua(this, arguments, function(b) {
        var c = this.parentNode;
        n.inArray(this, a) < 0 && (n.cleanData(_(this)), c && c.replaceChild(b, this))
      }, a)
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    n.fn[a] = function(a) {
      for (var c, d = [], e = n(a), f = e.length - 1, h = 0; f >= h; h++) c = h === f ? this : this.clone(!0), n(e[h])[b](c), g.apply(d, c.get());
      return this.pushStack(d)
    }
  });
  var wa, xa = {
    HTML: "block",
    BODY: "block"
  };

  function ya(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
      d = n.css(c[0], "display");
    return c.detach(), d
  }

  function za(a) {
    var b = d,
      c = xa[a];
    return c || (c = ya(a, b), "none" !== c && c || (wa = (wa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = wa[0].contentDocument, b.write(), b.close(), c = ya(a, b), wa.detach()), xa[a] = c), c
  }
  var Aa = /^margin/,
    Ba = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
    Ca = function(b) {
      var c = b.ownerDocument.defaultView;
      return c && c.opener || (c = a), c.getComputedStyle(b)
    },
    Da = function(a, b, c, d) {
      var e, f, g = {};
      for (f in b) g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e
    },
    Ea = d.documentElement;
  ! function() {
    var b, c, e, f, g = d.createElement("div"),
      h = d.createElement("div");
    if (h.style) {
      h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h);

      function i() {
        h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Ea.appendChild(g);
        var d = a.getComputedStyle(h);
        b = "1%" !== d.top, f = "2px" === d.marginLeft, c = "4px" === d.width, h.style.marginRight = "50%", e = "4px" === d.marginRight, Ea.removeChild(g)
      }
      n.extend(l, {
        pixelPosition: function() {
          return i(), b
        },
        boxSizingReliable: function() {
          return null == c && i(), c
        },
        pixelMarginRight: function() {
          return null == c && i(), e
        },
        reliableMarginLeft: function() {
          return null == c && i(), f
        },
        reliableMarginRight: function() {
          var b, c = h.appendChild(d.createElement("div"));
          return c.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", h.style.width = "1px", Ea.appendChild(g), b = !parseFloat(a.getComputedStyle(c).marginRight), Ea.removeChild(g), h.removeChild(c), b
        }
      })
    }
  }();

  function Fa(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ca(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Ba.test(g) && Aa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 !== g ? g + "" : g
  }

  function Ga(a, b) {
    return {
      get: function() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }
  var Ha = /^(none|table(?!-c[ea]).+)/,
    Ia = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Ja = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    Ka = ["Webkit", "O", "Moz", "ms"],
    La = d.createElement("div").style;

  function Ma(a) {
    if (a in La) return a;
    var b = a[0].toUpperCase() + a.slice(1),
      c = Ka.length;
    while (c--)
      if (a = Ka[c] + b, a in La) return a
  }

  function Na(a, b, c) {
    var d = T.exec(b);
    return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
  }

  function Oa(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
    return g
  }

  function Pa(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ca(a),
      g = "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Fa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ba.test(e)) return e;
      d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + Oa(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }

  function Qa(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = N.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = N.access(d, "olddisplay", za(d.nodeName)))) : (e = V(d), "none" === c && e || N.set(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function(a, b) {
          if (b) {
            var c = Fa(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = n.camelCase(b),
          i = a.style;
        return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = T.exec(c)) && e[1] && (c = W(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
      }
    },
    css: function(a, b, c, d) {
      var e, f, g, h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Fa(a, b, d)), "normal" === e && b in Ja && (e = Ja[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
    }
  }), n.each(["height", "width"], function(a, b) {
    n.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? Ha.test(n.css(a, "display")) && 0 === a.offsetWidth ? Da(a, Ia, function() {
          return Pa(a, b, d)
        }) : Pa(a, b, d) : void 0
      },
      set: function(a, c, d) {
        var e, f = d && Ca(a),
          g = d && Oa(a, b, d, "border-box" === n.css(a, "boxSizing", !1, f), f);
        return g && (e = T.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = n.css(a, b)), Na(a, c, g)
      }
    }
  }), n.cssHooks.marginLeft = Ga(l.reliableMarginLeft, function(a, b) {
    return b ? (parseFloat(Fa(a, "marginLeft")) || a.getBoundingClientRect().left - Da(a, {
      marginLeft: 0
    }, function() {
      return a.getBoundingClientRect().left
    })) + "px" : void 0
  }), n.cssHooks.marginRight = Ga(l.reliableMarginRight, function(a, b) {
    return b ? Da(a, {
      display: "inline-block"
    }, Fa, [a, "marginRight"]) : void 0
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    n.cssHooks[a + b] = {
      expand: function(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Aa.test(a) || (n.cssHooks[a + b].set = Na)
  }), n.fn.extend({
    css: function(a, b) {
      return K(this, function(a, b, c) {
        var d, e, f = {},
          g = 0;
        if (n.isArray(b)) {
          for (d = Ca(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
          return f
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
      }, a, b, arguments.length > 1)
    },
    show: function() {
      return Qa(this, !0)
    },
    hide: function() {
      return Qa(this)
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        V(this) ? n(this).show() : n(this).hide()
      })
    }
  });

  function Ra(a, b, c, d, e) {
    return new Ra.prototype.init(a, b, c, d, e)
  }
  n.Tween = Ra, Ra.prototype = {
    constructor: Ra,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
    },
    cur: function() {
      var a = Ra.propHooks[this.prop];
      return a && a.get ? a.get(this) : Ra.propHooks._default.get(this)
    },
    run: function(a) {
      var b, c = Ra.propHooks[this.prop];
      return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ra.propHooks._default.set(this), this
    }
  }, Ra.prototype.init.prototype = Ra.prototype, Ra.propHooks = {
    _default: {
      get: function(a) {
        var b;
        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
      },
      set: function(a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
      }
    }
  }, Ra.propHooks.scrollTop = Ra.propHooks.scrollLeft = {
    set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, n.easing = {
    linear: function(a) {
      return a
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2
    },
    _default: "swing"
  }, n.fx = Ra.prototype.init, n.fx.step = {};
  var Sa, Ta, Ua = /^(?:toggle|show|hide)$/,
    Va = /queueHooks$/;

  function Wa() {
    return a.setTimeout(function() {
      Sa = void 0
    }), Sa = n.now()
  }

  function Xa(a, b) {
    var c, d = 0,
      e = {
        height: a
      };
    for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = U[d], e["margin" + c] = e["padding" + c] = a;
    return b && (e.opacity = e.width = a), e
  }

  function Ya(a, b, c) {
    for (var d, e = (_a.tweeners[b] || []).concat(_a.tweeners["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function Za(a, b, c) {
    var d, e, f, g, h, i, j, k, l = this,
      m = {},
      o = a.style,
      p = a.nodeType && V(a),
      q = N.get(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
      h.unqueued || i()
    }), h.unqueued++, l.always(function() {
      l.always(function() {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? N.get(a, "olddisplay") || za(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
    }));
    for (d in b)
      if (e = b[d], Ua.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;
          p = !0
        }
        m[d] = q && q[d] || n.style(a, d)
      } else j = void 0;
    if (n.isEmptyObject(m)) "inline" === ("none" === j ? za(a.nodeName) : j) && (o.display = j);
    else {
      q ? "hidden" in q && (p = q.hidden) : q = N.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
        n(a).hide()
      }), l.done(function() {
        var b;
        N.remove(a, "fxshow");
        for (b in m) n.style(a, b, m[b])
      });
      for (d in m) g = Ya(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }

  function $a(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
  }

  function _a(a, b, c) {
    var d, e, f = 0,
      g = _a.prefilters.length,
      h = n.Deferred().always(function() {
        delete i.elem
      }),
      i = function() {
        if (e) return !1;
        for (var b = Sa || Wa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, {
          specialEasing: {},
          easing: n.easing._default
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: Sa || Wa(),
        duration: c.duration,
        tweens: [],
        createTween: function(b, c) {
          var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function(b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for ($a(k, j.opts.specialEasing); g > f; f++)
      if (d = _a.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
    return n.map(k, Ya, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  n.Animation = n.extend(_a, {
      tweeners: {
        "*": [function(a, b) {
          var c = this.createTween(a, b);
          return W(c.elem, a, T.exec(b), c), c
        }]
      },
      tweener: function(a, b) {
        n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);
        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], _a.tweeners[c] = _a.tweeners[c] || [], _a.tweeners[c].unshift(b)
      },
      prefilters: [Za],
      prefilter: function(a, b) {
        b ? _a.prefilters.unshift(a) : _a.prefilters.push(a)
      }
    }), n.speed = function(a, b, c) {
      var d = a && "object" == typeof a ? n.extend({}, a) : {
        complete: c || !c && b || n.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !n.isFunction(b) && b
      };
      return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
        n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
      }, d
    }, n.fn.extend({
      fadeTo: function(a, b, c, d) {
        return this.filter(V).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function(a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function() {
            var b = _a(this, n.extend({}, a), f);
            (e || N.get(this, "finish")) && b.stop(!0)
          };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function(a, b, c) {
        var d = function(a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
          var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = N.get(this);
          if (e) g[e] && g[e].stop && d(g[e]);
          else
            for (e in g) g[e] && g[e].stop && Va.test(e) && d(g[e]);
          for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          !b && c || n.dequeue(this, a)
        })
      },
      finish: function(a) {
        return a !== !1 && (a = a || "fx"), this.each(function() {
          var b, c = N.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;
          for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), n.each(["toggle", "show", "hide"], function(a, b) {
      var c = n.fn[b];
      n.fn[b] = function(a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Xa(b, !0), a, d, e)
      }
    }), n.each({
      slideDown: Xa("show"),
      slideUp: Xa("hide"),
      slideToggle: Xa("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(a, b) {
      n.fn[a] = function(a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), n.timers = [], n.fx.tick = function() {
      var a, b = 0,
        c = n.timers;
      for (Sa = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
      c.length || n.fx.stop(), Sa = void 0
    }, n.fx.timer = function(a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function() {
      Ta || (Ta = a.setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function() {
      a.clearInterval(Ta), Ta = null
    }, n.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, n.fn.delay = function(b, c) {
      return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
        var e = a.setTimeout(c, b);
        d.stop = function() {
          a.clearTimeout(e)
        }
      })
    },
    function() {
      var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));
      a.type = "checkbox", l.checkOn = "" !== a.value, l.optSelected = c.selected, b.disabled = !0, l.optDisabled = !c.disabled, a = d.createElement("input"), a.value = "t", a.type = "radio", l.radioValue = "t" === a.value
    }();
  var ab, bb = n.expr.attrHandle;
  n.fn.extend({
    attr: function(a, b) {
      return K(this, n.attr, a, b, arguments.length > 1)
    },
    removeAttr: function(a) {
      return this.each(function() {
        n.removeAttr(this, a)
      })
    }
  }), n.extend({
    attr: function(a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ab : void 0)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d))
    },
    attrHooks: {
      type: {
        set: function(a, b) {
          if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    },
    removeAttr: function(a, b) {
      var c, d, e = 0,
        f = b && b.match(G);
      if (f && 1 === a.nodeType)
        while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
    }
  }), ab = {
    set: function(a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
    }
  }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = bb[b] || n.find.attr;
    bb[b] = function(a, b, d) {
      var e, f;
      return d || (f = bb[b], bb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, bb[b] = f), e
    }
  });
  var cb = /^(?:input|select|textarea|button)$/i,
    db = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function(a, b) {
      return K(this, n.prop, a, b, arguments.length > 1)
    },
    removeProp: function(a) {
      return this.each(function() {
        delete this[n.propFix[a] || a]
      })
    }
  }), n.extend({
    prop: function(a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]),
        void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
    },
    propHooks: {
      tabIndex: {
        get: function(a) {
          var b = n.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : cb.test(a.nodeName) || db.test(a.nodeName) && a.href ? 0 : -1
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), l.optSelected || (n.propHooks.selected = {
    get: function(a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null
    },
    set: function(a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
    }
  }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    n.propFix[this.toLowerCase()] = this
  });
  var eb = /[\t\r\n\f]/g;

  function fb(a) {
    return a.getAttribute && a.getAttribute("class") || ""
  }
  n.fn.extend({
    addClass: function(a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function(b) {
        n(this).addClass(a.call(this, b, fb(this)))
      });
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
            g = 0;
            while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            h = n.trim(d), e !== h && c.setAttribute("class", h)
          }
      }
      return this
    },
    removeClass: function(a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function(b) {
        n(this).removeClass(a.call(this, b, fb(this)))
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
            g = 0;
            while (f = b[g++])
              while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
            h = n.trim(d), e !== h && c.setAttribute("class", h)
          }
      }
      return this
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function(c) {
        n(this).toggleClass(a.call(this, c, fb(this), b), b)
      }) : this.each(function() {
        var b, d, e, f;
        if ("string" === c) {
          d = 0, e = n(this), f = a.match(G) || [];
          while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
        } else void 0 !== a && "boolean" !== c || (b = fb(this), b && N.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : N.get(this, "__className__") || ""))
      })
    },
    hasClass: function(a) {
      var b, c, d = 0;
      b = " " + a + " ";
      while (c = this[d++])
        if (1 === c.nodeType && (" " + fb(c) + " ").replace(eb, " ").indexOf(b) > -1) return !0;
      return !1
    }
  });
  var gb = /\r/g,
    hb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function(a) {
      var b, c, d, e = this[0]; {
        if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
            return null == a ? "" : a + ""
          })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        });
        if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(gb, "") : null == c ? "" : c)
      }
    }
  }), n.extend({
    valHooks: {
      option: {
        get: function(a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a)).replace(hb, " ")
        }
      },
      select: {
        get: function(a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f) return b;
              g.push(b)
            } return g
        },
        set: function(a, b) {
          var c, d, e = a.options,
            f = n.makeArray(b),
            g = e.length;
          while (g--) d = e[g], (d.selected = n.inArray(n.valHooks.option.get(d), f) > -1) && (c = !0);
          return c || (a.selectedIndex = -1), f
        }
      }
    }
  }), n.each(["radio", "checkbox"], function() {
    n.valHooks[this] = {
      set: function(a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
      }
    }, l.checkOn || (n.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var ib = /^(?:focusinfocus|focusoutblur)$/;
  n.extend(n.event, {
    trigger: function(b, c, e, f) {
      var g, h, i, j, l, m, o, p = [e || d],
        q = k.call(b, "type") ? b.type : b,
        r = k.call(b, "namespace") ? b.namespace.split(".") : [];
      if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !ib.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), l = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, f || !o.trigger || o.trigger.apply(e, c) !== !1)) {
        if (!f && !o.noBubble && !n.isWindow(e)) {
          for (j = o.delegateType || q, ib.test(j + q) || (h = h.parentNode); h; h = h.parentNode) p.push(h), i = h;
          i === (e.ownerDocument || d) && p.push(i.defaultView || i.parentWindow || a)
        }
        g = 0;
        while ((h = p[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : o.bindType || q, m = (N.get(h, "events") || {})[b.type] && N.get(h, "handle"), m && m.apply(h, c), m = l && h[l], m && m.apply && L(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        return b.type = q, f || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !L(e) || l && n.isFunction(e[q]) && !n.isWindow(e) && (i = e[l], i && (e[l] = null), n.event.triggered = q, e[q](), n.event.triggered = void 0, i && (e[l] = i)), b.result
      }
    },
    simulate: function(a, b, c) {
      var d = n.extend(new n.Event, c, {
        type: a,
        isSimulated: !0
      });
      n.event.trigger(d, null, b)
    }
  }), n.fn.extend({
    trigger: function(a, b) {
      return this.each(function() {
        n.event.trigger(a, b, this)
      })
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0
    }
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    n.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), n.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    }
  }), l.focusin = "onfocusin" in a, l.focusin || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = function(a) {
      n.event.simulate(b, a.target, n.event.fix(a))
    };
    n.event.special[b] = {
      setup: function() {
        var d = this.ownerDocument || this,
          e = N.access(d, b);
        e || d.addEventListener(a, c, !0), N.access(d, b, (e || 0) + 1)
      },
      teardown: function() {
        var d = this.ownerDocument || this,
          e = N.access(d, b) - 1;
        e ? N.access(d, b, e) : (d.removeEventListener(a, c, !0), N.remove(d, b))
      }
    }
  });
  var jb = a.location,
    kb = n.now(),
    lb = /\?/;
  n.parseJSON = function(a) {
    return JSON.parse(a + "")
  }, n.parseXML = function(b) {
    var c;
    if (!b || "string" != typeof b) return null;
    try {
      c = (new a.DOMParser).parseFromString(b, "text/xml")
    } catch (d) {
      c = void 0
    }
    return c && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
  };
  var mb = /#.*$/,
    nb = /([?&])_=[^&]*/,
    ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    qb = /^(?:GET|HEAD)$/,
    rb = /^\/\//,
    sb = {},
    tb = {},
    ub = "*/".concat("*"),
    vb = d.createElement("a");
  vb.href = jb.href;

  function wb(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c))
        while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function xb(a, b, c, d) {
    var e = {},
      f = a === tb;

    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
      }), i
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*")
  }

  function yb(a, b) {
    var c, d, e = n.ajaxSettings.flatOptions || {};
    for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    return d && n.extend(!0, a, d), a
  }

  function zb(a, b, c) {
    var d, e, f, g, h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    if (d)
      for (e in h)
        if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break
        } if (i[0] in c) f = i[0];
    else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break
        }
        g || (g = e)
      }
      f = f || g
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }

  function Ab(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          } if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          }
        }
    }
    return {
      state: "success",
      data: b
    }
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: jb.href,
      type: "GET",
      isLocal: pb.test(jb.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": ub,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? yb(yb(a, n.ajaxSettings), b) : yb(n.ajaxSettings, a)
    },
    ajaxPrefilter: wb(sb),
    ajaxTransport: wb(tb),
    ajax: function(b, c) {
      "object" == typeof b && (c = b, b = void 0), c = c || {};
      var e, f, g, h, i, j, k, l, m = n.ajaxSetup({}, c),
        o = m.context || m,
        p = m.context && (o.nodeType || o.jquery) ? n(o) : n.event,
        q = n.Deferred(),
        r = n.Callbacks("once memory"),
        s = m.statusCode || {},
        t = {},
        u = {},
        v = 0,
        w = "canceled",
        x = {
          readyState: 0,
          getResponseHeader: function(a) {
            var b;
            if (2 === v) {
              if (!h) {
                h = {};
                while (b = ob.exec(g)) h[b[1].toLowerCase()] = b[2]
              }
              b = h[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function() {
            return 2 === v ? g : null
          },
          setRequestHeader: function(a, b) {
            var c = a.toLowerCase();
            return v || (a = u[c] = u[c] || a, t[a] = b), this
          },
          overrideMimeType: function(a) {
            return v || (m.mimeType = a), this
          },
          statusCode: function(a) {
            var b;
            if (a)
              if (2 > v)
                for (b in a) s[b] = [s[b], a[b]];
              else x.always(a[x.status]);
            return this
          },
          abort: function(a) {
            var b = a || w;
            return e && e.abort(b), z(0, b), this
          }
        };
      if (q.promise(x).complete = r.add, x.success = x.done, x.error = x.fail, m.url = ((b || m.url || jb.href) + "").replace(mb, "").replace(rb, jb.protocol + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = n.trim(m.dataType || "*").toLowerCase().match(G) || [""], null == m.crossDomain) {
        j = d.createElement("a");
        try {
          j.href = m.url, j.href = j.href, m.crossDomain = vb.protocol + "//" + vb.host != j.protocol + "//" + j.host
        } catch (y) {
          m.crossDomain = !0
        }
      }
      if (m.data && m.processData && "string" != typeof m.data && (m.data = n.param(m.data, m.traditional)), xb(sb, m, c, x), 2 === v) return x;
      k = n.event && m.global, k && 0 === n.active++ && n.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !qb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (lb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = nb.test(f) ? f.replace(nb, "$1_=" + kb++) : f + (lb.test(f) ? "&" : "?") + "_=" + kb++)), m.ifModified && (n.lastModified[f] && x.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && x.setRequestHeader("If-None-Match", n.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : m.accepts["*"]);
      for (l in m.headers) x.setRequestHeader(l, m.headers[l]);
      if (m.beforeSend && (m.beforeSend.call(o, x, m) === !1 || 2 === v)) return x.abort();
      w = "abort";
      for (l in {
          success: 1,
          error: 1,
          complete: 1
        }) x[l](m[l]);
      if (e = xb(tb, m, c, x)) {
        if (x.readyState = 1, k && p.trigger("ajaxSend", [x, m]), 2 === v) return x;
        m.async && m.timeout > 0 && (i = a.setTimeout(function() {
          x.abort("timeout")
        }, m.timeout));
        try {
          v = 1, e.send(t, z)
        } catch (y) {
          if (!(2 > v)) throw y;
          z(-1, y)
        }
      } else z(-1, "No Transport");

      function z(b, c, d, h) {
        var j, l, t, u, w, y = c;
        2 !== v && (v = 2, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && 300 > b || 304 === b, d && (u = zb(m, x, d)), u = Ab(m, u, x, j), j ? (m.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (n.lastModified[f] = w), w = x.getResponseHeader("etag"), w && (n.etag[f] = w)), 204 === b || "HEAD" === m.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = u.state, l = u.data, t = u.error, j = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), x.status = b, x.statusText = (c || y) + "", j ? q.resolveWith(o, [l, y, x]) : q.rejectWith(o, [x, y, t]), x.statusCode(s), s = void 0, k && p.trigger(j ? "ajaxSuccess" : "ajaxError", [x, m, j ? l : t]), r.fireWith(o, [x, y]), k && (p.trigger("ajaxComplete", [x, m]), --n.active || n.event.trigger("ajaxStop")))
      }
      return x
    },
    getJSON: function(a, b, c) {
      return n.get(a, b, c, "json")
    },
    getScript: function(a, b) {
      return n.get(a, void 0, b, "script")
    }
  }), n.each(["get", "post"], function(a, b) {
    n[b] = function(a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      }, n.isPlainObject(a) && a))
    }
  }), n._evalUrl = function(a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, n.fn.extend({
    wrapAll: function(a) {
      var b;
      return n.isFunction(a) ? this.each(function(b) {
        n(this).wrapAll(a.call(this, b))
      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
        var a = this;
        while (a.firstElementChild) a = a.firstElementChild;
        return a
      }).append(this)), this)
    },
    wrapInner: function(a) {
      return n.isFunction(a) ? this.each(function(b) {
        n(this).wrapInner(a.call(this, b))
      }) : this.each(function() {
        var b = n(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function(a) {
      var b = n.isFunction(a);
      return this.each(function(c) {
        n(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
      }).end()
    }
  }), n.expr.filters.hidden = function(a) {
    return !n.expr.filters.visible(a)
  }, n.expr.filters.visible = function(a) {
    return a.offsetWidth > 0 || a.offsetHeight > 0 || a.getClientRects().length > 0
  };
  var Bb = /%20/g,
    Cb = /\[\]$/,
    Db = /\r?\n/g,
    Eb = /^(?:submit|button|image|reset|file)$/i,
    Fb = /^(?:input|select|textarea|keygen)/i;

  function Gb(a, b, c, d) {
    var e;
    if (n.isArray(b)) n.each(b, function(b, e) {
      c || Cb.test(a) ? d(a, e) : Gb(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== n.type(b)) d(a, b);
    else
      for (e in b) Gb(a + "[" + e + "]", b[e], c, d)
  }
  n.param = function(a, b) {
    var c, d = [],
      e = function(a, b) {
        b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
      e(this.name, this.value)
    });
    else
      for (c in a) Gb(c, a[c], b, e);
    return d.join("&").replace(Bb, "+")
  }, n.fn.extend({
    serialize: function() {
      return n.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this
      }).filter(function() {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && Fb.test(this.nodeName) && !Eb.test(a) && (this.checked || !X.test(a))
      }).map(function(a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(Db, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(Db, "\r\n")
        }
      }).get()
    }
  }), n.ajaxSettings.xhr = function() {
    try {
      return new a.XMLHttpRequest
    } catch (b) {}
  };
  var Hb = {
      0: 200,
      1223: 204
    },
    Ib = n.ajaxSettings.xhr();
  l.cors = !!Ib && "withCredentials" in Ib, l.ajax = Ib = !!Ib, n.ajaxTransport(function(b) {
    var c, d;
    return l.cors || Ib && !b.crossDomain ? {
      send: function(e, f) {
        var g, h = b.xhr();
        if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
          for (g in b.xhrFields) h[g] = b.xhrFields[g];
        b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
        for (g in e) h.setRequestHeader(g, e[g]);
        c = function(a) {
          return function() {
            c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Hb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
              binary: h.response
            } : {
              text: h.responseText
            }, h.getAllResponseHeaders()))
          }
        }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
          4 === h.readyState && a.setTimeout(function() {
            c && d()
          })
        }, c = c("abort");
        try {
          h.send(b.hasContent && b.data || null)
        } catch (i) {
          if (c) throw i
        }
      },
      abort: function() {
        c && c()
      }
    } : void 0
  }), n.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function(a) {
        return n.globalEval(a), a
      }
    }
  }), n.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
  }), n.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c;
      return {
        send: function(e, f) {
          b = n("<script>").prop({
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", c = function(a) {
            b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
          }), d.head.appendChild(b[0])
        },
        abort: function() {
          c && c()
        }
      }
    }
  });
  var Jb = [],
    Kb = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = Jb.pop() || n.expando + "_" + kb++;
      return this[a] = !0, a
    }
  }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (Kb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Kb.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Kb, "$1" + e) : b.jsonp !== !1 && (b.url += (lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
      return g || n.error(e + " was not called"), g[0]
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
      g = arguments
    }, d.always(function() {
      void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Jb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
    }), "script") : void 0
  }), n.parseHTML = function(a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || d;
    var e = x.exec(a),
      f = !c && [];
    return e ? [b.createElement(e[1])] : (e = ca([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes))
  };
  var Lb = n.fn.load;
  n.fn.load = function(a, b, c) {
    if ("string" != typeof a && Lb) return Lb.apply(this, arguments);
    var d, e, f, g = this,
      h = a.indexOf(" ");
    return h > -1 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e || "GET",
      dataType: "html",
      data: b
    }).done(function(a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
    }).always(c && function(a, b) {
      g.each(function() {
        c.apply(this, f || [a.responseText, b, a])
      })
    }), this
  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    n.fn[b] = function(a) {
      return this.on(b, a)
    }
  }), n.expr.filters.animated = function(a) {
    return n.grep(n.timers, function(b) {
      return a === b.elem
    }).length
  };

  function Mb(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
  }
  n.offset = {
    setOffset: function(a, b, c) {
      var d, e, f, g, h, i, j, k = n.css(a, "position"),
        l = n(a),
        m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
    }
  }, n.fn.extend({
    offset: function(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function(b) {
        n.offset.setOffset(this, a, b)
      });
      var b, c, d = this[0],
        e = {
          top: 0,
          left: 0
        },
        f = d && d.ownerDocument;
      if (f) return b = f.documentElement, n.contains(b, d) ? (e = d.getBoundingClientRect(), c = Mb(f), {
        top: e.top + c.pageYOffset - b.clientTop,
        left: e.left + c.pageXOffset - b.clientLeft
      }) : e
    },
    position: function() {
      if (this[0]) {
        var a, b, c = this[0],
          d = {
            top: 0,
            left: 0
          };
        return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - d.top - n.css(c, "marginTop", !0),
          left: b.left - d.left - n.css(c, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var a = this.offsetParent;
        while (a && "static" === n.css(a, "position")) a = a.offsetParent;
        return a || Ea
      })
    }
  }), n.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(a, b) {
    var c = "pageYOffset" === b;
    n.fn[a] = function(d) {
      return K(this, function(a, d, e) {
        var f = Mb(a);
        return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
      }, a, d, arguments.length)
    }
  }), n.each(["top", "left"], function(a, b) {
    n.cssHooks[b] = Ga(l.pixelPosition, function(a, c) {
      return c ? (c = Fa(a, b), Ba.test(c) ? n(a).position()[b] + "px" : c) : void 0
    })
  }), n.each({
    Height: "height",
    Width: "width"
  }, function(a, b) {
    n.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function(c, d) {
      n.fn[d] = function(d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
          g = c || (d === !0 || e === !0 ? "margin" : "border");
        return K(this, function(b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
        }, b, f ? d : void 0, f, null)
      }
    })
  }), n.fn.extend({
    bind: function(a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function(a, b) {
      return this.off(a, null, b)
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    },
    size: function() {
      return this.length
    }
  }), n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return n
  });
  var Nb = a.jQuery,
    Ob = a.$;
  return n.noConflict = function(b) {
    return a.$ === n && (a.$ = Ob), b && a.jQuery === n && (a.jQuery = Nb), n
  }, b || (a.jQuery = a.$ = n), n
});
/*! js-cookie v2.1.4 | MIT */
! function(e) {
  var n = !1;
  if ("function" == typeof define && define.amd && (define(e), n = !0), "object" == typeof exports && (module.exports = e(), n = !0), !n) {
    var t = window.Cookies,
      o = window.Cookies = e();
    o.noConflict = function() {
      return window.Cookies = t, o
    }
  }
}(function() {
  function e() {
    for (var e = 0, n = {}; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t) n[o] = t[o]
    }
    return n
  }

  function n(t) {
    function o(n, r, i) {
      var c;
      if ("undefined" != typeof document) {
        if (arguments.length > 1) {
          if (i = e({
              path: "/"
            }, o.defaults, i), "number" == typeof i.expires) {
            var a = new Date;
            a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires), i.expires = a
          }
          i.expires = i.expires ? i.expires.toUTCString() : "";
          try {
            c = JSON.stringify(r), /^[\{\[]/.test(c) && (r = c)
          } catch (s) {}
          r = t.write ? t.write(r, n) : encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), n = encodeURIComponent(String(n)), n = n.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), n = n.replace(/[\(\)]/g, escape);
          var f = "";
          for (var u in i) i[u] && (f += "; " + u, i[u] !== !0 && (f += "=" + i[u]));
          return document.cookie = n + "=" + r + f
        }
        n || (c = {});
        for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, l = 0; l < p.length; l++) {
          var g = p[l].split("="),
            m = g.slice(1).join("=");
          '"' === m.charAt(0) && (m = m.slice(1, -1));
          try {
            var C = g[0].replace(d, decodeURIComponent);
            if (m = t.read ? t.read(m, C) : t(m, C) || m.replace(d, decodeURIComponent), this.json) try {
              m = JSON.parse(m)
            } catch (s) {}
            if (n === C) {
              c = m;
              break
            }
            n || (c[C] = m)
          } catch (s) {}
        }
        return c
      }
    }
    return o.set = o, o.get = function(e) {
      return o.call(o, e)
    }, o.getJSON = function() {
      return o.apply({
        json: !0
      }, [].slice.call(arguments))
    }, o.defaults = {}, o.remove = function(n, t) {
      o(n, "", e(t, {
        expires: -1
      }))
    }, o.withConverter = n, o
  }
  return n(function() {})
}); //     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
  function n(n) {
    function t(t, r, e, u, i, o) {
      for (; i >= 0 && o > i; i += n) {
        var a = u ? u[i] : i;
        e = r(e, t[a], a, t)
      }
      return e
    }
    return function(r, e, u, i) {
      e = d(e, i, 4);
      var o = !w(r) && m.keys(r),
        a = (o || r).length,
        c = n > 0 ? 0 : a - 1;
      return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
    }
  }

  function t(n) {
    return function(t, r, e) {
      r = b(r, e);
      for (var u = null != t && t.length, i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
        if (r(t[i], i, t)) return i;
      return -1
    }
  }

  function r(n, t) {
    var r = S.length,
      e = n.constructor,
      u = m.isFunction(e) && e.prototype || o,
      i = "constructor";
    for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = S[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
  }
  var e = this,
    u = e._,
    i = Array.prototype,
    o = Object.prototype,
    a = Function.prototype,
    c = i.push,
    l = i.slice,
    f = o.toString,
    s = o.hasOwnProperty,
    p = Array.isArray,
    h = Object.keys,
    v = a.bind,
    g = Object.create,
    y = function() {},
    m = function(n) {
      return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
    };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : e._ = m, m.VERSION = "1.8.2";
  var d = function(n, t, r) {
      if (t === void 0) return n;
      switch (null == r ? 3 : r) {
        case 1:
          return function(r) {
            return n.call(t, r)
          };
        case 2:
          return function(r, e) {
            return n.call(t, r, e)
          };
        case 3:
          return function(r, e, u) {
            return n.call(t, r, e, u)
          };
        case 4:
          return function(r, e, u, i) {
            return n.call(t, r, e, u, i)
          }
      }
      return function() {
        return n.apply(t, arguments)
      }
    },
    b = function(n, t, r) {
      return null == n ? m.identity : m.isFunction(n) ? d(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    };
  m.iteratee = function(n, t) {
    return b(n, t, 1 / 0)
  };
  var x = function(n, t) {
      return function(r) {
        var e = arguments.length;
        if (2 > e || null == r) return r;
        for (var u = 1; e > u; u++)
          for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
            var l = o[c];
            t && r[l] !== void 0 || (r[l] = i[l])
          }
        return r
      }
    },
    _ = function(n) {
      if (!m.isObject(n)) return {};
      if (g) return g(n);
      y.prototype = n;
      var t = new y;
      return y.prototype = null, t
    },
    j = Math.pow(2, 53) - 1,
    w = function(n) {
      var t = n && n.length;
      return "number" == typeof t && t >= 0 && j >= t
    };
  m.each = m.forEach = function(n, t, r) {
    t = d(t, r);
    var e, u;
    if (w(n))
      for (e = 0, u = n.length; u > e; e++) t(n[e], e, n);
    else {
      var i = m.keys(n);
      for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
    }
    return n
  }, m.map = m.collect = function(n, t, r) {
    t = b(t, r);
    for (var e = !w(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
      var a = e ? e[o] : o;
      i[o] = t(n[a], a, n)
    }
    return i
  }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function(n, t, r) {
    var e;
    return e = w(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
  }, m.filter = m.select = function(n, t, r) {
    var e = [];
    return t = b(t, r), m.each(n, function(n, r, u) {
      t(n, r, u) && e.push(n)
    }), e
  }, m.reject = function(n, t, r) {
    return m.filter(n, m.negate(b(t)), r)
  }, m.every = m.all = function(n, t, r) {
    t = b(t, r);
    for (var e = !w(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
      var o = e ? e[i] : i;
      if (!t(n[o], o, n)) return !1
    }
    return !0
  }, m.some = m.any = function(n, t, r) {
    t = b(t, r);
    for (var e = !w(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
      var o = e ? e[i] : i;
      if (t(n[o], o, n)) return !0
    }
    return !1
  }, m.contains = m.includes = m.include = function(n, t, r) {
    return w(n) || (n = m.values(n)), m.indexOf(n, t, "number" == typeof r && r) >= 0
  }, m.invoke = function(n, t) {
    var r = l.call(arguments, 2),
      e = m.isFunction(t);
    return m.map(n, function(n) {
      var u = e ? t : n[t];
      return null == u ? u : u.apply(n, r)
    })
  }, m.pluck = function(n, t) {
    return m.map(n, m.property(t))
  }, m.where = function(n, t) {
    return m.filter(n, m.matcher(t))
  }, m.findWhere = function(n, t) {
    return m.find(n, m.matcher(t))
  }, m.max = function(n, t, r) {
    var e, u, i = -1 / 0,
      o = -1 / 0;
    if (null == t && null != n) {
      n = w(n) ? n : m.values(n);
      for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
    } else t = b(t, r), m.each(n, function(n, r, e) {
      u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
    });
    return i
  }, m.min = function(n, t, r) {
    var e, u, i = 1 / 0,
      o = 1 / 0;
    if (null == t && null != n) {
      n = w(n) ? n : m.values(n);
      for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
    } else t = b(t, r), m.each(n, function(n, r, e) {
      u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
    });
    return i
  }, m.shuffle = function(n) {
    for (var t, r = w(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
    return u
  }, m.sample = function(n, t, r) {
    return null == t || r ? (w(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
  }, m.sortBy = function(n, t, r) {
    return t = b(t, r), m.pluck(m.map(n, function(n, r, e) {
      return {
        value: n,
        index: r,
        criteria: t(n, r, e)
      }
    }).sort(function(n, t) {
      var r = n.criteria,
        e = t.criteria;
      if (r !== e) {
        if (r > e || r === void 0) return 1;
        if (e > r || e === void 0) return -1
      }
      return n.index - t.index
    }), "value")
  };
  var A = function(n) {
    return function(t, r, e) {
      var u = {};
      return r = b(r, e), m.each(t, function(e, i) {
        var o = r(e, i, t);
        n(u, e, o)
      }), u
    }
  };
  m.groupBy = A(function(n, t, r) {
    m.has(n, r) ? n[r].push(t) : n[r] = [t]
  }), m.indexBy = A(function(n, t, r) {
    n[r] = t
  }), m.countBy = A(function(n, t, r) {
    m.has(n, r) ? n[r]++ : n[r] = 1
  }), m.toArray = function(n) {
    return n ? m.isArray(n) ? l.call(n) : w(n) ? m.map(n, m.identity) : m.values(n) : []
  }, m.size = function(n) {
    return null == n ? 0 : w(n) ? n.length : m.keys(n).length
  }, m.partition = function(n, t, r) {
    t = b(t, r);
    var e = [],
      u = [];
    return m.each(n, function(n, r, i) {
      (t(n, r, i) ? e : u).push(n)
    }), [e, u]
  }, m.first = m.head = m.take = function(n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
  }, m.initial = function(n, t, r) {
    return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
  }, m.last = function(n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
  }, m.rest = m.tail = m.drop = function(n, t, r) {
    return l.call(n, null == t || r ? 1 : t)
  }, m.compact = function(n) {
    return m.filter(n, m.identity)
  };
  var k = function(n, t, r, e) {
    for (var u = [], i = 0, o = e || 0, a = n && n.length; a > o; o++) {
      var c = n[o];
      if (w(c) && (m.isArray(c) || m.isArguments(c))) {
        t || (c = k(c, t, r));
        var l = 0,
          f = c.length;
        for (u.length += f; f > l;) u[i++] = c[l++]
      } else r || (u[i++] = c)
    }
    return u
  };
  m.flatten = function(n, t) {
    return k(n, t, !1)
  }, m.without = function(n) {
    return m.difference(n, l.call(arguments, 1))
  }, m.uniq = m.unique = function(n, t, r, e) {
    if (null == n) return [];
    m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = b(r, e));
    for (var u = [], i = [], o = 0, a = n.length; a > o; o++) {
      var c = n[o],
        l = r ? r(c, o, n) : c;
      t ? (o && i === l || u.push(c), i = l) : r ? m.contains(i, l) || (i.push(l), u.push(c)) : m.contains(u, c) || u.push(c)
    }
    return u
  }, m.union = function() {
    return m.uniq(k(arguments, !0, !0))
  }, m.intersection = function(n) {
    if (null == n) return [];
    for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
      var i = n[e];
      if (!m.contains(t, i)) {
        for (var o = 1; r > o && m.contains(arguments[o], i); o++);
        o === r && t.push(i)
      }
    }
    return t
  }, m.difference = function(n) {
    var t = k(arguments, !0, !0, 1);
    return m.filter(n, function(n) {
      return !m.contains(t, n)
    })
  }, m.zip = function() {
    return m.unzip(arguments)
  }, m.unzip = function(n) {
    for (var t = n && m.max(n, "length").length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
    return r
  }, m.object = function(n, t) {
    for (var r = {}, e = 0, u = n && n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
    return r
  }, m.indexOf = function(n, t, r) {
    var e = 0,
      u = n && n.length;
    if ("number" == typeof r) e = 0 > r ? Math.max(0, u + r) : r;
    else if (r && u) return e = m.sortedIndex(n, t), n[e] === t ? e : -1;
    if (t !== t) return m.findIndex(l.call(n, e), m.isNaN);
    for (; u > e; e++)
      if (n[e] === t) return e;
    return -1
  }, m.lastIndexOf = function(n, t, r) {
    var e = n ? n.length : 0;
    if ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)), t !== t) return m.findLastIndex(l.call(n, 0, e), m.isNaN);
    for (; --e >= 0;)
      if (n[e] === t) return e;
    return -1
  }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function(n, t, r, e) {
    r = b(r, e, 1);
    for (var u = r(t), i = 0, o = n.length; o > i;) {
      var a = Math.floor((i + o) / 2);
      r(n[a]) < u ? i = a + 1 : o = a
    }
    return i
  }, m.range = function(n, t, r) {
    arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
    for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
    return u
  };
  var O = function(n, t, r, e, u) {
    if (!(e instanceof t)) return n.apply(r, u);
    var i = _(n.prototype),
      o = n.apply(i, u);
    return m.isObject(o) ? o : i
  };
  m.bind = function(n, t) {
    if (v && n.bind === v) return v.apply(n, l.call(arguments, 1));
    if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
    var r = l.call(arguments, 2),
      e = function() {
        return O(n, e, t, this, r.concat(l.call(arguments)))
      };
    return e
  }, m.partial = function(n) {
    var t = l.call(arguments, 1),
      r = function() {
        for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
        for (; e < arguments.length;) i.push(arguments[e++]);
        return O(n, r, this, this, i)
      };
    return r
  }, m.bindAll = function(n) {
    var t, r, e = arguments.length;
    if (1 >= e) throw new Error("bindAll must be passed function names");
    for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
    return n
  }, m.memoize = function(n, t) {
    var r = function(e) {
      var u = r.cache,
        i = "" + (t ? t.apply(this, arguments) : e);
      return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
    };
    return r.cache = {}, r
  }, m.delay = function(n, t) {
    var r = l.call(arguments, 2);
    return setTimeout(function() {
      return n.apply(null, r)
    }, t)
  }, m.defer = m.partial(m.delay, m, 1), m.throttle = function(n, t, r) {
    var e, u, i, o = null,
      a = 0;
    r || (r = {});
    var c = function() {
      a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
    };
    return function() {
      var l = m.now();
      a || r.leading !== !1 || (a = l);
      var f = t - (l - a);
      return e = this, u = arguments, 0 >= f || f > t ? (o && (clearTimeout(o), o = null), a = l, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, f)), i
    }
  }, m.debounce = function(n, t, r) {
    var e, u, i, o, a, c = function() {
      var l = m.now() - o;
      t > l && l >= 0 ? e = setTimeout(c, t - l) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
    };
    return function() {
      i = this, u = arguments, o = m.now();
      var l = r && !e;
      return e || (e = setTimeout(c, t)), l && (a = n.apply(i, u), i = u = null), a
    }
  }, m.wrap = function(n, t) {
    return m.partial(t, n)
  }, m.negate = function(n) {
    return function() {
      return !n.apply(this, arguments)
    }
  }, m.compose = function() {
    var n = arguments,
      t = n.length - 1;
    return function() {
      for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
      return e
    }
  }, m.after = function(n, t) {
    return function() {
      return --n < 1 ? t.apply(this, arguments) : void 0
    }
  }, m.before = function(n, t) {
    var r;
    return function() {
      return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
    }
  }, m.once = m.partial(m.before, 2);
  var F = !{
      toString: null
    }.propertyIsEnumerable("toString"),
    S = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  m.keys = function(n) {
    if (!m.isObject(n)) return [];
    if (h) return h(n);
    var t = [];
    for (var e in n) m.has(n, e) && t.push(e);
    return F && r(n, t), t
  }, m.allKeys = function(n) {
    if (!m.isObject(n)) return [];
    var t = [];
    for (var e in n) t.push(e);
    return F && r(n, t), t
  }, m.values = function(n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
    return e
  }, m.mapObject = function(n, t, r) {
    t = b(t, r);
    for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
    return o
  }, m.pairs = function(n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
    return e
  }, m.invert = function(n) {
    for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
    return t
  }, m.functions = m.methods = function(n) {
    var t = [];
    for (var r in n) m.isFunction(n[r]) && t.push(r);
    return t.sort()
  }, m.extend = x(m.allKeys), m.extendOwn = m.assign = x(m.keys), m.findKey = function(n, t, r) {
    t = b(t, r);
    for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
      if (e = u[i], t(n[e], e, n)) return e
  }, m.pick = function(n, t, r) {
    var e, u, i = {},
      o = n;
    if (null == o) return i;
    m.isFunction(t) ? (u = m.allKeys(o), e = d(t, r)) : (u = k(arguments, !1, !1, 1), e = function(n, t, r) {
      return t in r
    }, o = Object(o));
    for (var a = 0, c = u.length; c > a; a++) {
      var l = u[a],
        f = o[l];
      e(f, l, o) && (i[l] = f)
    }
    return i
  }, m.omit = function(n, t, r) {
    if (m.isFunction(t)) t = m.negate(t);
    else {
      var e = m.map(k(arguments, !1, !1, 1), String);
      t = function(n, t) {
        return !m.contains(e, t)
      }
    }
    return m.pick(n, t, r)
  }, m.defaults = x(m.allKeys, !0), m.clone = function(n) {
    return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
  }, m.tap = function(n, t) {
    return t(n), n
  }, m.isMatch = function(n, t) {
    var r = m.keys(t),
      e = r.length;
    if (null == n) return !e;
    for (var u = Object(n), i = 0; e > i; i++) {
      var o = r[i];
      if (t[o] !== u[o] || !(o in u)) return !1
    }
    return !0
  };
  var E = function(n, t, r, e) {
    if (n === t) return 0 !== n || 1 / n === 1 / t;
    if (null == n || null == t) return n === t;
    n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
    var u = f.call(n);
    if (u !== f.call(t)) return !1;
    switch (u) {
      case "[object RegExp]":
      case "[object String]":
        return "" + n == "" + t;
      case "[object Number]":
        return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
      case "[object Date]":
      case "[object Boolean]":
        return +n === +t
    }
    var i = "[object Array]" === u;
    if (!i) {
      if ("object" != typeof n || "object" != typeof t) return !1;
      var o = n.constructor,
        a = t.constructor;
      if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
    }
    r = r || [], e = e || [];
    for (var c = r.length; c--;)
      if (r[c] === n) return e[c] === t;
    if (r.push(n), e.push(t), i) {
      if (c = n.length, c !== t.length) return !1;
      for (; c--;)
        if (!E(n[c], t[c], r, e)) return !1
    } else {
      var l, s = m.keys(n);
      if (c = s.length, m.keys(t).length !== c) return !1;
      for (; c--;)
        if (l = s[c], !m.has(t, l) || !E(n[l], t[l], r, e)) return !1
    }
    return r.pop(), e.pop(), !0
  };
  m.isEqual = function(n, t) {
    return E(n, t)
  }, m.isEmpty = function(n) {
    return null == n ? !0 : w(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
  }, m.isElement = function(n) {
    return !(!n || 1 !== n.nodeType)
  }, m.isArray = p || function(n) {
    return "[object Array]" === f.call(n)
  }, m.isObject = function(n) {
    var t = typeof n;
    return "function" === t || "object" === t && !!n
  }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
    m["is" + n] = function(t) {
      return f.call(t) === "[object " + n + "]"
    }
  }), m.isArguments(arguments) || (m.isArguments = function(n) {
    return m.has(n, "callee")
  }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
    return "function" == typeof n || !1
  }), m.isFinite = function(n) {
    return isFinite(n) && !isNaN(parseFloat(n))
  }, m.isNaN = function(n) {
    return m.isNumber(n) && n !== +n
  }, m.isBoolean = function(n) {
    return n === !0 || n === !1 || "[object Boolean]" === f.call(n)
  }, m.isNull = function(n) {
    return null === n
  }, m.isUndefined = function(n) {
    return n === void 0
  }, m.has = function(n, t) {
    return null != n && s.call(n, t)
  }, m.noConflict = function() {
    return e._ = u, this
  }, m.identity = function(n) {
    return n
  }, m.constant = function(n) {
    return function() {
      return n
    }
  }, m.noop = function() {}, m.property = function(n) {
    return function(t) {
      return null == t ? void 0 : t[n]
    }
  }, m.propertyOf = function(n) {
    return null == n ? function() {} : function(t) {
      return n[t]
    }
  }, m.matcher = m.matches = function(n) {
    return n = m.extendOwn({}, n),
      function(t) {
        return m.isMatch(t, n)
      }
  }, m.times = function(n, t, r) {
    var e = Array(Math.max(0, n));
    t = d(t, r, 1);
    for (var u = 0; n > u; u++) e[u] = t(u);
    return e
  }, m.random = function(n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
  }, m.now = Date.now || function() {
    return (new Date).getTime()
  };
  var M = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    },
    N = m.invert(M),
    I = function(n) {
      var t = function(t) {
          return n[t]
        },
        r = "(?:" + m.keys(n).join("|") + ")",
        e = RegExp(r),
        u = RegExp(r, "g");
      return function(n) {
        return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
      }
    };
  m.escape = I(M), m.unescape = I(N), m.result = function(n, t, r) {
    var e = null == n ? void 0 : n[t];
    return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
  };
  var B = 0;
  m.uniqueId = function(n) {
    var t = ++B + "";
    return n ? n + t : t
  }, m.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var T = /(.)^/,
    R = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\u2028": "u2028",
      "\u2029": "u2029"
    },
    q = /\\|'|\r|\n|\u2028|\u2029/g,
    K = function(n) {
      return "\\" + R[n]
    };
  m.template = function(n, t, r) {
    !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
    var e = RegExp([(t.escape || T).source, (t.interpolate || T).source, (t.evaluate || T).source].join("|") + "|$", "g"),
      u = 0,
      i = "__p+='";
    n.replace(e, function(t, r, e, o, a) {
      return i += n.slice(u, a).replace(q, K), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
    }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
    try {
      var o = new Function(t.variable || "obj", "_", i)
    } catch (a) {
      throw a.source = i, a
    }
    var c = function(n) {
        return o.call(this, n, m)
      },
      l = t.variable || "obj";
    return c.source = "function(" + l + "){\n" + i + "}", c
  }, m.chain = function(n) {
    var t = m(n);
    return t._chain = !0, t
  };
  var z = function(n, t) {
    return n._chain ? m(t).chain() : t
  };
  m.mixin = function(n) {
    m.each(m.functions(n), function(t) {
      var r = m[t] = n[t];
      m.prototype[t] = function() {
        var n = [this._wrapped];
        return c.apply(n, arguments), z(this, r.apply(m, n))
      }
    })
  }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
    var t = i[n];
    m.prototype[n] = function() {
      var r = this._wrapped;
      return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], z(this, r)
    }
  }), m.each(["concat", "join", "slice"], function(n) {
    var t = i[n];
    m.prototype[n] = function() {
      return z(this, t.apply(this._wrapped, arguments))
    }
  }), m.prototype.value = function() {
    return this._wrapped
  }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function() {
    return "" + this._wrapped
  }, "function" == typeof define && define.amd && define("underscore", [], function() {
    return m
  })
}).call(this);

! function(e, t) {
  "use strict";
  var n = t.prototype.trim,
    r = t.prototype.trimRight,
    i = t.prototype.trimLeft,
    s = function(e) {
      return e * 1 || 0
    },
    o = function(e, t) {
      if (t < 1) return "";
      var n = "";
      while (t > 0) t & 1 && (n += e), t >>= 1, e += e;
      return n
    },
    u = [].slice,
    a = function(e) {
      return e == null ? "\\s" : e.source ? e.source : "[" + p.escapeRegExp(e) + "]"
    },
    f = {
      lt: "<",
      gt: ">",
      quot: '"',
      amp: "&",
      apos: "'"
    },
    l = {};
  for (var c in f) l[f[c]] = c;
  l["'"] = "#39";
  var h = function() {
      function e(e) {
        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
      }
      var n = o,
        r = function() {
          return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
        };
      return r.format = function(r, i) {
        var s = 1,
          o = r.length,
          u = "",
          a, f = [],
          l, c, p, d, v, m;
        for (l = 0; l < o; l++) {
          u = e(r[l]);
          if (u === "string") f.push(r[l]);
          else if (u === "array") {
            p = r[l];
            if (p[2]) {
              a = i[s];
              for (c = 0; c < p[2].length; c++) {
                if (!a.hasOwnProperty(p[2][c])) throw new Error(h('[_.sprintf] property "%s" does not exist', p[2][c]));
                a = a[p[2][c]]
              }
            } else p[1] ? a = i[p[1]] : a = i[s++];
            if (/[^s]/.test(p[8]) && e(a) != "number") throw new Error(h("[_.sprintf] expecting number but found %s", e(a)));
            switch (p[8]) {
              case "b":
                a = a.toString(2);
                break;
              case "c":
                a = t.fromCharCode(a);
                break;
              case "d":
                a = parseInt(a, 10);
                break;
              case "e":
                a = p[7] ? a.toExponential(p[7]) : a.toExponential();
                break;
              case "f":
                a = p[7] ? parseFloat(a).toFixed(p[7]) : parseFloat(a);
                break;
              case "o":
                a = a.toString(8);
                break;
              case "s":
                a = (a = t(a)) && p[7] ? a.substring(0, p[7]) : a;
                break;
              case "u":
                a = Math.abs(a);
                break;
              case "x":
                a = a.toString(16);
                break;
              case "X":
                a = a.toString(16).toUpperCase()
            }
            a = /[def]/.test(p[8]) && p[3] && a >= 0 ? "+" + a : a, v = p[4] ? p[4] == "0" ? "0" : p[4].charAt(1) : " ", m = p[6] - t(a).length, d = p[6] ? n(v, m) : "", f.push(p[5] ? a + d : d + a)
          }
        }
        return f.join("")
      }, r.cache = {}, r.parse = function(e) {
        var t = e,
          n = [],
          r = [],
          i = 0;
        while (t) {
          if ((n = /^[^\x25]+/.exec(t)) !== null) r.push(n[0]);
          else if ((n = /^\x25{2}/.exec(t)) !== null) r.push("%");
          else {
            if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null) throw new Error("[_.sprintf] huh?");
            if (n[2]) {
              i |= 1;
              var s = [],
                o = n[2],
                u = [];
              if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null) throw new Error("[_.sprintf] huh?");
              s.push(u[1]);
              while ((o = o.substring(u[0].length)) !== "")
                if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null) s.push(u[1]);
                else {
                  if ((u = /^\[(\d+)\]/.exec(o)) === null) throw new Error("[_.sprintf] huh?");
                  s.push(u[1])
                } n[2] = s
            } else i |= 2;
            if (i === 3) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
            r.push(n)
          }
          t = t.substring(n[0].length)
        }
        return r
      }, r
    }(),
    p = {
      VERSION: "2.3.0",
      isBlank: function(e) {
        return e == null && (e = ""), /^\s*$/.test(e)
      },
      stripTags: function(e) {
        return e == null ? "" : t(e).replace(/<\/?[^>]+>/g, "")
      },
      capitalize: function(e) {
        return e = e == null ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
      },
      chop: function(e, n) {
        return e == null ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
      },
      clean: function(e) {
        return p.strip(e).replace(/\s+/g, " ")
      },
      count: function(e, n) {
        if (e == null || n == null) return 0;
        e = t(e), n = t(n);
        var r = 0,
          i = 0,
          s = n.length;
        for (;;) {
          i = e.indexOf(n, i);
          if (i === -1) break;
          r++, i += s
        }
        return r
      },
      chars: function(e) {
        return e == null ? [] : t(e).split("")
      },
      swapCase: function(e) {
        return e == null ? "" : t(e).replace(/\S/g, function(e) {
          return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
        })
      },
      escapeHTML: function(e) {
        return e == null ? "" : t(e).replace(/[&<>"']/g, function(e) {
          return "&" + l[e] + ";"
        })
      },
      unescapeHTML: function(e) {
        return e == null ? "" : t(e).replace(/\&([^;]+);/g, function(e, n) {
          var r;
          return n in f ? f[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
        })
      },
      escapeRegExp: function(e) {
        return e == null ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
      },
      splice: function(e, t, n, r) {
        var i = p.chars(e);
        return i.splice(~~t, ~~n, r), i.join("")
      },
      insert: function(e, t, n) {
        return p.splice(e, t, 0, n)
      },
      include: function(e, n) {
        return n === "" ? !0 : e == null ? !1 : t(e).indexOf(n) !== -1
      },
      join: function() {
        var e = u.call(arguments),
          t = e.shift();
        return t == null && (t = ""), e.join(t)
      },
      lines: function(e) {
        return e == null ? [] : t(e).split("\n")
      },
      reverse: function(e) {
        return p.chars(e).reverse().join("")
      },
      startsWith: function(e, n) {
        return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
      },
      endsWith: function(e, n) {
        return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
      },
      succ: function(e) {
        return e == null ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
      },
      titleize: function(e) {
        return e == null ? "" : t(e).replace(/(?:^|\s)\S/g, function(e) {
          return e.toUpperCase()
        })
      },
      camelize: function(e) {
        return p.trim(e).replace(/[-_\s]+(.)?/g, function(e, t) {
          return t.toUpperCase()
        })
      },
      underscored: function(e) {
        return p.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
      },
      dasherize: function(e) {
        return p.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
      },
      classify: function(e) {
        return p.titleize(t(e).replace(/_/g, " ")).replace(/\s/g, "")
      },
      humanize: function(e) {
        return p.capitalize(p.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
      },
      trim: function(e, r) {
        return e == null ? "" : !r && n ? n.call(e) : (r = a(r), t(e).replace(new RegExp("^" + r + "+|" + r + "+$", "g"), ""))
      },
      ltrim: function(e, n) {
        return e == null ? "" : !n && i ? i.call(e) : (n = a(n), t(e).replace(new RegExp("^" + n + "+"), ""))
      },
      rtrim: function(e, n) {
        return e == null ? "" : !n && r ? r.call(e) : (n = a(n), t(e).replace(new RegExp(n + "+$"), ""))
      },
      truncate: function(e, n, r) {
        return e == null ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
      },
      prune: function(e, n, r) {
        if (e == null) return "";
        e = t(e), n = ~~n, r = r != null ? t(r) : "...";
        if (e.length <= n) return e;
        var i = function(e) {
            return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
          },
          s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
        return s.slice(s.length - 2).match(/\w\w/) ? s = s.replace(/\s*\S+$/, "") : s = p.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
      },
      words: function(e, t) {
        return p.isBlank(e) ? [] : p.trim(e, t).split(t || /\s+/)
      },
      pad: function(e, n, r, i) {
        e = e == null ? "" : t(e), n = ~~n;
        var s = 0;
        r ? r.length > 1 && (r = r.charAt(0)) : r = " ";
        switch (i) {
          case "right":
            return s = n - e.length, e + o(r, s);
          case "both":
            return s = n - e.length, o(r, Math.ceil(s / 2)) + e + o(r, Math.floor(s / 2));
          default:
            return s = n - e.length, o(r, s) + e
        }
      },
      lpad: function(e, t, n) {
        return p.pad(e, t, n)
      },
      rpad: function(e, t, n) {
        return p.pad(e, t, n, "right")
      },
      lrpad: function(e, t, n) {
        return p.pad(e, t, n, "both")
      },
      sprintf: h,
      vsprintf: function(e, t) {
        return t.unshift(e), h.apply(null, t)
      },
      toNumber: function(e, n) {
        if (e == null || e == "") return 0;
        e = t(e);
        var r = s(s(e).toFixed(~~n));
        return r === 0 && !e.match(/^0+$/) ? Number.NaN : r
      },
      numberFormat: function(e, t, n, r) {
        if (isNaN(e) || e == null) return "";
        e = e.toFixed(~~t), r = typeof r == "string" ? r : ",";
        var i = e.split("."),
          s = i[0],
          o = i[1] ? (n || ".") + i[1] : "";
        return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
      },
      strRight: function(e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.indexOf(n) : -1;
        return ~r ? e.slice(r + n.length, e.length) : e
      },
      strRightBack: function(e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.lastIndexOf(n) : -1;
        return ~r ? e.slice(r + n.length, e.length) : e
      },
      strLeft: function(e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.indexOf(n) : -1;
        return ~r ? e.slice(0, r) : e
      },
      strLeftBack: function(e, t) {
        if (e == null) return "";
        e += "", t = t != null ? "" + t : t;
        var n = e.lastIndexOf(t);
        return ~n ? e.slice(0, n) : e
      },
      toSentence: function(e, t, n, r) {
        t = t || ", ", n = n || " and ";
        var i = e.slice(),
          s = i.pop();
        return e.length > 2 && r && (n = p.rtrim(t) + n), i.length ? i.join(t) + n + s : s
      },
      toSentenceSerial: function() {
        var e = u.call(arguments);
        return e[3] = !0, p.toSentence.apply(p, e)
      },
      slugify: function(e) {
        if (e == null) return "";
        var n = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
          r = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
          i = new RegExp(a(n), "g");
        return e = t(e).toLowerCase().replace(i, function(e) {
          var t = n.indexOf(e);
          return r.charAt(t) || "-"
        }), p.dasherize(e.replace(/[^\w\s-]/g, ""))
      },
      surround: function(e, t) {
        return [t, e, t].join("")
      },
      quote: function(e) {
        return p.surround(e, '"')
      },
      exports: function() {
        var e = {};
        for (var t in this) {
          if (!this.hasOwnProperty(t) || t.match(/^(?:include|contains|reverse)$/)) continue;
          e[t] = this[t]
        }
        return e
      },
      repeat: function(e, n, r) {
        if (e == null) return "";
        n = ~~n;
        if (r == null) return o(t(e), n);
        for (var i = []; n > 0; i[--n] = e);
        return i.join(r)
      },
      levenshtein: function(e, n) {
        if (e == null && n == null) return 0;
        if (e == null) return t(n).length;
        if (n == null) return t(e).length;
        e = t(e), n = t(n);
        var r = [],
          i, s;
        for (var o = 0; o <= n.length; o++)
          for (var u = 0; u <= e.length; u++) o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? s = i : s = Math.min(r[u], r[u - 1], i) + 1 : s = o + u, i = r[u], r[u] = s;
        return r.pop()
      }
    };
  p.strip = p.trim, p.lstrip = p.ltrim, p.rstrip = p.rtrim, p.center = p.lrpad, p.rjust = p.lpad, p.ljust = p.rpad, p.contains = p.include, p.q = p.quote, typeof exports != "undefined" && (typeof module != "undefined" && module.exports && (module.exports = p), exports._s = p), typeof define == "function" && define.amd && define("underscore.string", [], function() {
    return p
  }), e._ = e._ || {}, e._.string = e._.str = p
}(this, String); // moment.js
// version : 2.1.0
// author : Tim Wood
// license : MIT
// momentjs.com
! function(t) {
  function e(t, e) {
    return function(n) {
      return u(t.call(this, n), e)
    }
  }

  function n(t, e) {
    return function(n) {
      return this.lang().ordinal(t.call(this, n), e)
    }
  }

  function s() {}

  function i(t) {
    a(this, t)
  }

  function r(t) {
    var e = t.years || t.year || t.y || 0,
      n = t.months || t.month || t.M || 0,
      s = t.weeks || t.week || t.w || 0,
      i = t.days || t.day || t.d || 0,
      r = t.hours || t.hour || t.h || 0,
      a = t.minutes || t.minute || t.m || 0,
      o = t.seconds || t.second || t.s || 0,
      u = t.milliseconds || t.millisecond || t.ms || 0;
    this._input = t, this._milliseconds = u + 1e3 * o + 6e4 * a + 36e5 * r, this._days = i + 7 * s, this._months = n + 12 * e, this._data = {}, this._bubble()
  }

  function a(t, e) {
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    return t
  }

  function o(t) {
    return 0 > t ? Math.ceil(t) : Math.floor(t)
  }

  function u(t, e) {
    for (var n = t + ""; n.length < e;) n = "0" + n;
    return n
  }

  function h(t, e, n, s) {
    var i, r, a = e._milliseconds,
      o = e._days,
      u = e._months;
    a && t._d.setTime(+t._d + a * n), (o || u) && (i = t.minute(), r = t.hour()), o && t.date(t.date() + o * n), u && t.month(t.month() + u * n), a && !s && H.updateOffset(t), (o || u) && (t.minute(i), t.hour(r))
  }

  function d(t) {
    return "[object Array]" === Object.prototype.toString.call(t)
  }

  function c(t, e) {
    var n, s = Math.min(t.length, e.length),
      i = Math.abs(t.length - e.length),
      r = 0;
    for (n = 0; s > n; n++) ~~t[n] !== ~~e[n] && r++;
    return r + i
  }

  function f(t) {
    return t ? ie[t] || t.toLowerCase().replace(/(.)s$/, "$1") : t
  }

  function l(t, e) {
    return e.abbr = t, x[t] || (x[t] = new s), x[t].set(e), x[t]
  }

  function _(t) {
    if (!t) return H.fn._lang;
    if (!x[t] && A) try {
      require("./lang/" + t)
    } catch (e) {
      return H.fn._lang
    }
    return x[t]
  }

  function m(t) {
    return t.match(/\[.*\]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
  }

  function y(t) {
    var e, n, s = t.match(E);
    for (e = 0, n = s.length; n > e; e++) s[e] = ue[s[e]] ? ue[s[e]] : m(s[e]);
    return function(i) {
      var r = "";
      for (e = 0; n > e; e++) r += s[e] instanceof Function ? s[e].call(i, t) : s[e];
      return r
    }
  }

  function M(t, e) {
    function n(e) {
      return t.lang().longDateFormat(e) || e
    }
    for (var s = 5; s-- && N.test(e);) e = e.replace(N, n);
    return re[e] || (re[e] = y(e)), re[e](t)
  }

  function g(t, e) {
    switch (t) {
      case "DDDD":
        return V;
      case "YYYY":
        return X;
      case "YYYYY":
        return $;
      case "S":
      case "SS":
      case "SSS":
      case "DDD":
        return I;
      case "MMM":
      case "MMMM":
      case "dd":
      case "ddd":
      case "dddd":
        return R;
      case "a":
      case "A":
        return _(e._l)._meridiemParse;
      case "X":
        return B;
      case "Z":
      case "ZZ":
        return j;
      case "T":
        return q;
      case "MM":
      case "DD":
      case "YY":
      case "HH":
      case "hh":
      case "mm":
      case "ss":
      case "M":
      case "D":
      case "d":
      case "H":
      case "h":
      case "m":
      case "s":
        return J;
      default:
        return new RegExp(t.replace("\\", ""))
    }
  }

  function p(t) {
    var e = (j.exec(t) || [])[0],
      n = (e + "").match(ee) || ["-", 0, 0],
      s = +(60 * n[1]) + ~~n[2];
    return "+" === n[0] ? -s : s
  }

  function D(t, e, n) {
    var s, i = n._a;
    switch (t) {
      case "M":
      case "MM":
        i[1] = null == e ? 0 : ~~e - 1;
        break;
      case "MMM":
      case "MMMM":
        s = _(n._l).monthsParse(e), null != s ? i[1] = s : n._isValid = !1;
        break;
      case "D":
      case "DD":
      case "DDD":
      case "DDDD":
        null != e && (i[2] = ~~e);
        break;
      case "YY":
        i[0] = ~~e + (~~e > 68 ? 1900 : 2e3);
        break;
      case "YYYY":
      case "YYYYY":
        i[0] = ~~e;
        break;
      case "a":
      case "A":
        n._isPm = _(n._l).isPM(e);
        break;
      case "H":
      case "HH":
      case "h":
      case "hh":
        i[3] = ~~e;
        break;
      case "m":
      case "mm":
        i[4] = ~~e;
        break;
      case "s":
      case "ss":
        i[5] = ~~e;
        break;
      case "S":
      case "SS":
      case "SSS":
        i[6] = ~~(1e3 * ("0." + e));
        break;
      case "X":
        n._d = new Date(1e3 * parseFloat(e));
        break;
      case "Z":
      case "ZZ":
        n._useUTC = !0, n._tzm = p(e)
    }
    null == e && (n._isValid = !1)
  }

  function Y(t) {
    var e, n, s = [];
    if (!t._d) {
      for (e = 0; 7 > e; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
      s[3] += ~~((t._tzm || 0) / 60), s[4] += ~~((t._tzm || 0) % 60), n = new Date(0), t._useUTC ? (n.setUTCFullYear(s[0], s[1], s[2]), n.setUTCHours(s[3], s[4], s[5], s[6])) : (n.setFullYear(s[0], s[1], s[2]), n.setHours(s[3], s[4], s[5], s[6])), t._d = n
    }
  }

  function w(t) {
    var e, n, s = t._f.match(E),
      i = t._i;
    for (t._a = [], e = 0; e < s.length; e++) n = (g(s[e], t).exec(i) || [])[0], n && (i = i.slice(i.indexOf(n) + n.length)), ue[s[e]] && D(s[e], n, t);
    i && (t._il = i), t._isPm && t._a[3] < 12 && (t._a[3] += 12), t._isPm === !1 && 12 === t._a[3] && (t._a[3] = 0), Y(t)
  }

  function k(t) {
    var e, n, s, r, o, u = 99;
    for (r = 0; r < t._f.length; r++) e = a({}, t), e._f = t._f[r], w(e), n = new i(e), o = c(e._a, n.toArray()), n._il && (o += n._il.length), u > o && (u = o, s = n);
    a(t, s)
  }

  function v(t) {
    var e, n = t._i,
      s = K.exec(n);
    if (s) {
      for (t._f = "YYYY-MM-DD" + (s[2] || " "), e = 0; 4 > e; e++)
        if (te[e][1].exec(n)) {
          t._f += te[e][0];
          break
        } j.exec(n) && (t._f += " Z"), w(t)
    } else t._d = new Date(n)
  }

  function T(e) {
    var n = e._i,
      s = G.exec(n);
    n === t ? e._d = new Date : s ? e._d = new Date(+s[1]) : "string" == typeof n ? v(e) : d(n) ? (e._a = n.slice(0), Y(e)) : e._d = n instanceof Date ? new Date(+n) : new Date(n)
  }

  function b(t, e, n, s, i) {
    return i.relativeTime(e || 1, !!n, t, s)
  }

  function S(t, e, n) {
    var s = W(Math.abs(t) / 1e3),
      i = W(s / 60),
      r = W(i / 60),
      a = W(r / 24),
      o = W(a / 365),
      u = 45 > s && ["s", s] || 1 === i && ["m"] || 45 > i && ["mm", i] || 1 === r && ["h"] || 22 > r && ["hh", r] || 1 === a && ["d"] || 25 >= a && ["dd", a] || 45 >= a && ["M"] || 345 > a && ["MM", W(a / 30)] || 1 === o && ["y"] || ["yy", o];
    return u[2] = e, u[3] = t > 0, u[4] = n, b.apply({}, u)
  }

  function F(t, e, n) {
    var s, i = n - e,
      r = n - t.day();
    return r > i && (r -= 7), i - 7 > r && (r += 7), s = H(t).add("d", r), {
      week: Math.ceil(s.dayOfYear() / 7),
      year: s.year()
    }
  }

  function O(t) {
    var e = t._i,
      n = t._f;
    return null === e || "" === e ? null : ("string" == typeof e && (t._i = e = _().preparse(e)), H.isMoment(e) ? (t = a({}, e), t._d = new Date(+e._d)) : n ? d(n) ? k(t) : w(t) : T(t), new i(t))
  }

  function z(t, e) {
    H.fn[t] = H.fn[t + "s"] = function(t) {
      var n = this._isUTC ? "UTC" : "";
      return null != t ? (this._d["set" + n + e](t), H.updateOffset(this), this) : this._d["get" + n + e]()
    }
  }

  function C(t) {
    H.duration.fn[t] = function() {
      return this._data[t]
    }
  }

  function L(t, e) {
    H.duration.fn["as" + t] = function() {
      return +this / e
    }
  }
  for (var H, P, U = "2.1.0", W = Math.round, x = {}, A = "undefined" != typeof module && module.exports, G = /^\/?Date\((\-?\d+)/i, Z = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, E = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, N = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, J = /\d\d?/, I = /\d{1,3}/, V = /\d{3}/, X = /\d{1,4}/, $ = /[+\-]?\d{1,6}/, R = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, j = /Z|[\+\-]\d\d:?\d\d/i, q = /T/i, B = /[\+\-]?\d+(\.\d{1,3})?/, K = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, Q = "YYYY-MM-DDTHH:mm:ssZ", te = [
      ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
      ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
      ["HH:mm", /(T| )\d\d:\d\d/],
      ["HH", /(T| )\d\d/]
    ], ee = /([\+\-]|\d\d)/gi, ne = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), se = {
      Milliseconds: 1,
      Seconds: 1e3,
      Minutes: 6e4,
      Hours: 36e5,
      Days: 864e5,
      Months: 2592e6,
      Years: 31536e6
    }, ie = {
      ms: "millisecond",
      s: "second",
      m: "minute",
      h: "hour",
      d: "day",
      w: "week",
      M: "month",
      y: "year"
    }, re = {}, ae = "DDD w W M D d".split(" "), oe = "M D H h m s w W".split(" "), ue = {
      M: function() {
        return this.month() + 1
      },
      MMM: function(t) {
        return this.lang().monthsShort(this, t)
      },
      MMMM: function(t) {
        return this.lang().months(this, t)
      },
      D: function() {
        return this.date()
      },
      DDD: function() {
        return this.dayOfYear()
      },
      d: function() {
        return this.day()
      },
      dd: function(t) {
        return this.lang().weekdaysMin(this, t)
      },
      ddd: function(t) {
        return this.lang().weekdaysShort(this, t)
      },
      dddd: function(t) {
        return this.lang().weekdays(this, t)
      },
      w: function() {
        return this.week()
      },
      W: function() {
        return this.isoWeek()
      },
      YY: function() {
        return u(this.year() % 100, 2)
      },
      YYYY: function() {
        return u(this.year(), 4)
      },
      YYYYY: function() {
        return u(this.year(), 5)
      },
      gg: function() {
        return u(this.weekYear() % 100, 2)
      },
      gggg: function() {
        return this.weekYear()
      },
      ggggg: function() {
        return u(this.weekYear(), 5)
      },
      GG: function() {
        return u(this.isoWeekYear() % 100, 2)
      },
      GGGG: function() {
        return this.isoWeekYear()
      },
      GGGGG: function() {
        return u(this.isoWeekYear(), 5)
      },
      e: function() {
        return this.weekday()
      },
      E: function() {
        return this.isoWeekday()
      },
      a: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
      },
      A: function() {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
      },
      H: function() {
        return this.hours()
      },
      h: function() {
        return this.hours() % 12 || 12
      },
      m: function() {
        return this.minutes()
      },
      s: function() {
        return this.seconds()
      },
      S: function() {
        return ~~(this.milliseconds() / 100)
      },
      SS: function() {
        return u(~~(this.milliseconds() / 10), 2)
      },
      SSS: function() {
        return u(this.milliseconds(), 3)
      },
      Z: function() {
        var t = -this.zone(),
          e = "+";
        return 0 > t && (t = -t, e = "-"), e + u(~~(t / 60), 2) + ":" + u(~~t % 60, 2)
      },
      ZZ: function() {
        var t = -this.zone(),
          e = "+";
        return 0 > t && (t = -t, e = "-"), e + u(~~(10 * t / 6), 4)
      },
      z: function() {
        return this.zoneAbbr()
      },
      zz: function() {
        return this.zoneName()
      },
      X: function() {
        return this.unix()
      }
    }; ae.length;) P = ae.pop(), ue[P + "o"] = n(ue[P], P);
  for (; oe.length;) P = oe.pop(), ue[P + P] = e(ue[P], 2);
  for (ue.DDDD = e(ue.DDD, 3), s.prototype = {
      set: function(t) {
        var e, n;
        for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e
      },
      _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      months: function(t) {
        return this._months[t.month()]
      },
      _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      monthsShort: function(t) {
        return this._monthsShort[t.month()]
      },
      monthsParse: function(t) {
        var e, n, s;
        for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
          if (this._monthsParse[e] || (n = H([2e3, e]), s = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[e] = new RegExp(s.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
      },
      _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      weekdays: function(t) {
        return this._weekdays[t.day()]
      },
      _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      weekdaysShort: function(t) {
        return this._weekdaysShort[t.day()]
      },
      _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      weekdaysMin: function(t) {
        return this._weekdaysMin[t.day()]
      },
      weekdaysParse: function(t) {
        var e, n, s;
        for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
          if (this._weekdaysParse[e] || (n = H([2e3, 1]).day(e), s = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[e] = new RegExp(s.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
      },
      _longDateFormat: {
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D YYYY",
        LLL: "MMMM D YYYY LT",
        LLLL: "dddd, MMMM D YYYY LT"
      },
      longDateFormat: function(t) {
        var e = this._longDateFormat[t];
        return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
          return t.slice(1)
        }), this._longDateFormat[t] = e), e
      },
      isPM: function(t) {
        return "p" === (t + "").toLowerCase()[0]
      },
      _meridiemParse: /[ap]\.?m?\.?/i,
      meridiem: function(t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
      },
      _calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      },
      calendar: function(t, e) {
        var n = this._calendar[t];
        return "function" == typeof n ? n.apply(e) : n
      },
      _relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      },
      relativeTime: function(t, e, n, s) {
        var i = this._relativeTime[n];
        return "function" == typeof i ? i(t, e, n, s) : i.replace(/%d/i, t)
      },
      pastFuture: function(t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
      },
      ordinal: function(t) {
        return this._ordinal.replace("%d", t)
      },
      _ordinal: "%d",
      preparse: function(t) {
        return t
      },
      postformat: function(t) {
        return t
      },
      week: function(t) {
        return F(t, this._week.dow, this._week.doy).week
      },
      _week: {
        dow: 0,
        doy: 6
      }
    }, H = function(t, e, n) {
      return O({
        _i: t,
        _f: e,
        _l: n,
        _isUTC: !1
      })
    }, H.utc = function(t, e, n) {
      return O({
        _useUTC: !0,
        _isUTC: !0,
        _l: n,
        _i: t,
        _f: e
      })
    }, H.unix = function(t) {
      return H(1e3 * t)
    }, H.duration = function(t, e) {
      var n, s, i = H.isDuration(t),
        a = "number" == typeof t,
        o = i ? t._input : a ? {} : t,
        u = Z.exec(t);
      return a ? e ? o[e] = t : o.milliseconds = t : u && (n = "-" === u[1] ? -1 : 1, o = {
        y: 0,
        d: ~~u[2] * n,
        h: ~~u[3] * n,
        m: ~~u[4] * n,
        s: ~~u[5] * n,
        ms: ~~u[6] * n
      }), s = new r(o), i && t.hasOwnProperty("_lang") && (s._lang = t._lang), s
    }, H.version = U, H.defaultFormat = Q, H.updateOffset = function() {}, H.lang = function(t, e) {
      return t ? (e ? l(t, e) : x[t] || _(t), H.duration.fn._lang = H.fn._lang = _(t), void 0) : H.fn._lang._abbr
    }, H.langData = function(t) {
      return t && t._lang && t._lang._abbr && (t = t._lang._abbr), _(t)
    }, H.isMoment = function(t) {
      return t instanceof i
    }, H.isDuration = function(t) {
      return t instanceof r
    }, H.fn = i.prototype = {
      clone: function() {
        return H(this)
      },
      valueOf: function() {
        return +this._d + 6e4 * (this._offset || 0)
      },
      unix: function() {
        return Math.floor(+this / 1e3)
      },
      toString: function() {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
      },
      toDate: function() {
        return this._offset ? new Date(+this) : this._d
      },
      toISOString: function() {
        return M(H(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
      },
      toArray: function() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
      },
      isValid: function() {
        return null == this._isValid && (this._isValid = this._a ? !c(this._a, (this._isUTC ? H.utc(this._a) : H(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
      },
      utc: function() {
        return this.zone(0)
      },
      local: function() {
        return this.zone(0), this._isUTC = !1, this
      },
      format: function(t) {
        var e = M(this, t || H.defaultFormat);
        return this.lang().postformat(e)
      },
      add: function(t, e) {
        var n;
        return n = "string" == typeof t ? H.duration(+e, t) : H.duration(t, e), h(this, n, 1), this
      },
      subtract: function(t, e) {
        var n;
        return n = "string" == typeof t ? H.duration(+e, t) : H.duration(t, e), h(this, n, -1), this
      },
      diff: function(t, e, n) {
        var s, i, r = this._isUTC ? H(t).zone(this._offset || 0) : H(t).local(),
          a = 6e4 * (this.zone() - r.zone());
        return e = f(e), "year" === e || "month" === e ? (s = 432e5 * (this.daysInMonth() + r.daysInMonth()), i = 12 * (this.year() - r.year()) + (this.month() - r.month()), i += (this - H(this).startOf("month") - (r - H(r).startOf("month"))) / s, i -= 6e4 * (this.zone() - H(this).startOf("month").zone() - (r.zone() - H(r).startOf("month").zone())) / s, "year" === e && (i /= 12)) : (s = this - r, i = "second" === e ? s / 1e3 : "minute" === e ? s / 6e4 : "hour" === e ? s / 36e5 : "day" === e ? (s - a) / 864e5 : "week" === e ? (s - a) / 6048e5 : s), n ? i : o(i)
      },
      from: function(t, e) {
        return H.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e)
      },
      fromNow: function(t) {
        return this.from(H(), t)
      },
      calendar: function() {
        var t = this.diff(H().startOf("day"), "days", !0),
          e = -6 > t ? "sameElse" : -1 > t ? "lastWeek" : 0 > t ? "lastDay" : 1 > t ? "sameDay" : 2 > t ? "nextDay" : 7 > t ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(e, this))
      },
      isLeapYear: function() {
        var t = this.year();
        return 0 === t % 4 && 0 !== t % 100 || 0 === t % 400
      },
      isDST: function() {
        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
      },
      day: function(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? "string" == typeof t && (t = this.lang().weekdaysParse(t), "number" != typeof t) ? this : this.add({
          d: t - e
        }) : e
      },
      month: function(t) {
        var e, n = this._isUTC ? "UTC" : "";
        return null != t ? "string" == typeof t && (t = this.lang().monthsParse(t), "number" != typeof t) ? this : (e = this.date(), this.date(1), this._d["set" + n + "Month"](t), this.date(Math.min(e, this.daysInMonth())), H.updateOffset(this), this) : this._d["get" + n + "Month"]()
      },
      startOf: function(t) {
        switch (t = f(t)) {
          case "year":
            this.month(0);
          case "month":
            this.date(1);
          case "week":
          case "day":
            this.hours(0);
          case "hour":
            this.minutes(0);
          case "minute":
            this.seconds(0);
          case "second":
            this.milliseconds(0)
        }
        return "week" === t && this.weekday(0), this
      },
      endOf: function(t) {
        return this.startOf(t).add(t, 1).subtract("ms", 1)
      },
      isAfter: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) > +H(t).startOf(e)
      },
      isBefore: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) < +H(t).startOf(e)
      },
      isSame: function(t, e) {
        return e = "undefined" != typeof e ? e : "millisecond", +this.clone().startOf(e) === +H(t).startOf(e)
      },
      min: function(t) {
        return t = H.apply(null, arguments), this > t ? this : t
      },
      max: function(t) {
        return t = H.apply(null, arguments), t > this ? this : t
      },
      zone: function(t) {
        var e = this._offset || 0;
        return null == t ? this._isUTC ? e : this._d.getTimezoneOffset() : ("string" == typeof t && (t = p(t)), Math.abs(t) < 16 && (t = 60 * t), this._offset = t, this._isUTC = !0, e !== t && h(this, H.duration(e - t, "m"), 1, !0), this)
      },
      zoneAbbr: function() {
        return this._isUTC ? "UTC" : ""
      },
      zoneName: function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
      },
      daysInMonth: function() {
        return H.utc([this.year(), this.month() + 1, 0]).date()
      },
      dayOfYear: function(t) {
        var e = W((H(this).startOf("day") - H(this).startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add("d", t - e)
      },
      weekYear: function(t) {
        var e = F(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == t ? e : this.add("y", t - e)
      },
      isoWeekYear: function(t) {
        var e = F(this, 1, 4).year;
        return null == t ? e : this.add("y", t - e)
      },
      week: function(t) {
        var e = this.lang().week(this);
        return null == t ? e : this.add("d", 7 * (t - e))
      },
      isoWeek: function(t) {
        var e = F(this, 1, 4).week;
        return null == t ? e : this.add("d", 7 * (t - e))
      },
      weekday: function(t) {
        var e = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == t ? e : this.add("d", t - e)
      },
      isoWeekday: function(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
      },
      lang: function(e) {
        return e === t ? this._lang : (this._lang = _(e), this)
      }
    }, P = 0; P < ne.length; P++) z(ne[P].toLowerCase().replace(/s$/, ""), ne[P]);
  z("year", "FullYear"), H.fn.days = H.fn.day, H.fn.months = H.fn.month, H.fn.weeks = H.fn.week, H.fn.isoWeeks = H.fn.isoWeek, H.fn.toJSON = H.fn.toISOString, H.duration.fn = r.prototype = {
    _bubble: function() {
      var t, e, n, s, i = this._milliseconds,
        r = this._days,
        a = this._months,
        u = this._data;
      u.milliseconds = i % 1e3, t = o(i / 1e3), u.seconds = t % 60, e = o(t / 60), u.minutes = e % 60, n = o(e / 60), u.hours = n % 24, r += o(n / 24), u.days = r % 30, a += o(r / 30), u.months = a % 12, s = o(a / 12), u.years = s
    },
    weeks: function() {
      return o(this.days() / 7)
    },
    valueOf: function() {
      return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    },
    humanize: function(t) {
      var e = +this,
        n = S(e, !t, this.lang());
      return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
    },
    add: function(t, e) {
      var n = H.duration(t, e);
      return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, this._bubble(), this
    },
    subtract: function(t, e) {
      var n = H.duration(t, e);
      return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, this._bubble(), this
    },
    get: function(t) {
      return t = f(t), this[t.toLowerCase() + "s"]()
    },
    as: function(t) {
      return t = f(t), this["as" + t.charAt(0).toUpperCase() + t.slice(1) + "s"]()
    },
    lang: H.fn.lang
  };
  for (P in se) se.hasOwnProperty(P) && (L(P, se[P]), C(P.toLowerCase()));
  L("Weeks", 6048e5), H.duration.fn.asMonths = function() {
    return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
  }, H.lang("en", {
    ordinal: function(t) {
      var e = t % 10,
        n = 1 === ~~(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
      return t + n
    }
  }), A && (module.exports = H), "undefined" == typeof ender && (this.moment = H), "function" == typeof define && define.amd && define("moment", [], function() {
    return H
  })
}.call(this);
(function() {
  "use strict";
  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === "string" || argType === "number") {
        classes.push(arg)
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(null, arg))
      } else if (argType === "object") {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key)
          }
        }
      }
    }
    return classes.join(" ")
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = classNames
  } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
    define("classnames", [], function() {
      return classNames
    })
  } else {
    window.classNames = classNames
  }
})();
