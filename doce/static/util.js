(function() {
  var MEMORY_KEYS_KEY, MEMORY_MAX_ITEMS, slice = [].slice,
    extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  MEMORY_MAX_ITEMS = 10;
  MEMORY_KEYS_KEY = "inputmemory_keys";
  window.I = {
    libs: {
      react: $.Deferred(function(_this) {
        return function(d) {
          if (typeof React !== "undefined" && React !== null) {
            return d.resolve(React)
          }
        }
      }(this)),
      selectize: $.Deferred(function(_this) {
        return function(d) {
          var ref;
          if (typeof $ !== "undefined" && $ !== null ? (ref = $.fn) != null ? ref.selectize : void 0 : void 0) {
            return d.resolve($.fn.selectize)
          }
        }
      }(this)),
      redactor: $.Deferred(function(_this) {
        return function(d) {
          var ref;
          if (typeof $ !== "undefined" && $ !== null ? (ref = $.fn) != null ? ref.redactor : void 0 : void 0) {
            return d.resolve($.fn.redactor)
          }
        }
      }(this))
    },
    setup_page: function() {
      I.setup_register_referrers($(document.body));
      return _.defer(function(_this) {
        return function() {
          return I.setup_affiliate_code()
        }
      }(this))
    },
    root_url: function() {
      var host;
      host = null;
      return function(path) {
        if (!host) {
          host = $("body").data("host") || "";
          if (host !== "") {
            host = window.location.protocol + "//" + host;
            if (window.location.port && window.location.port !== "80") {
              host += ":" + window.location.port
            }
          }
        }
        return host + "/" + path
      }
    }(),
    page_name: function() {
      return $(document.body).data("page_name") || "unknown"
    },
    get_csrf: function() {
      return this._csrf_token || (this._csrf_token = $("meta[name='csrf_token']").attr("value"))
    },
    with_csrf: function(thing) {
      var token;
      if (thing == null) {
        thing = {}
      }
      token = {
        csrf_token: I.get_csrf()
      };
      if ($.type(thing) === "string") {
        return thing + "&" + $.param(token)
      } else {
        return $.extend(thing, token)
      }
    },
    add_params: function(_this) {
      return function(url, p) {
        var rest;
        rest = $.param(p);
        if (url.match(/\?/)) {
          return url + "&" + rest
        } else {
          return url + "?" + rest
        }
      }
    }(this),
    flash: function(flash, type) {
      if (type == null) {
        type = "notice"
      }
      this.flasher || (this.flasher = new I.Flasher);
      if (flash.match(/^error:/)) {
        flash = flash.replace(/^error:/, "Error: ");
        type = "error"
      }
      return this.flasher.show(type, flash)
    },
    slugify: function(str, opts) {
      str = str.replace(/\s+/g, "-");
      str = (opts != null ? opts.for_tags : void 0) ? str.replace(/[^\w_.-]/g, "").replace(/^[_.-]+/, "").replace(/[_.-]+$/, "") : str.replace(/[^\w_-]/g, "");
      return str.toLowerCase()
    },
    truncate: function(s, len) {
      if (s.length > len + 3) {
        return _.string.truncate(s, len)
      } else {
        return s
      }
    },
    event: function(category, action, label, value, interactive) {
      var opts;
      if (interactive == null) {
        interactive = true
      }
      opts = {
        hitType: "event",
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value
      };
      if (!interactive) {
        opts.nonInteraction = 1
      }
      return I.event_with_opts(opts)
    },
    event_with_opts: function(opts) {
      try {
        if (typeof ga !== "undefined" && ga !== null) {
          return ga("send", opts)
        } else {
          console.log("event:", opts);
          return typeof opts.hitCallback === "function" ? opts.hitCallback() : void 0
        }
      } catch (error) {}
    },
    event2: function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : []
    },
    plural: function(noun, count) {
      if (count === 1) {
        return count + " " + noun
      } else {
        return count + " " + noun + "s"
      }
    },
    default_redactor_opts: {
      plugins: ["source", "table", "alignment", "video", "addimage"],
      toolbarFixed: false,
      buttons: ["format", "bold", "italic", "deleted", "lists", "link"],
      minHeight: 250,
      linkSize: 80
    },
    get_template: function(name) {
      return _.template($("#" + name + "_tpl").html())
    },
    lazy_template: function(obj, name) {
      return function() {
        var args, fn;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        fn = I.get_template(name);
        obj.prototype.template = fn;
        return fn.apply(null, args)
      }
    },
    setup_sticky_bar: function(trigger) {
      var body, visible, win;
      win = $(window);
      body = $(document.body);
      trigger = $(trigger);
      visible = false;
      return win.on("scroll", function(_this) {
        return function(e) {
          if (win.scrollTop() > trigger.offset().top + trigger.outerHeight()) {
            if (!visible) {
              body.addClass("show_sticky_bar");
              return visible = true
            }
          } else {
            if (visible) {
              body.removeClass("show_sticky_bar");
              return visible = false
            }
          }
        }
      }(this))
    },
    setup_selectize: function(el) {
      return el.find(".selectize_input").each(function(i, input) {
        var $input, REGEX_EMAIL, descriptions, optgroups, options, params, placeholder, render;
        $input = $(input);
        if ($input.hasClass("selectized")) {
          return
        }
        params = {
          plugins: [],
          persist: false
        };
        if ($input.is("select")) {
          descriptions = {};
          $input.find("option").each(function(i, option) {
            var $option;
            $option = $(option);
            return descriptions[$option.val()] = $option.data("extra")
          });
          render = function(data, escape) {
            var content, desc;
            content = escape(data.text);
            if (desc = descriptions[data.value]) {
              content = content + " <span class='sub'>— " + desc + "</span>"
            }
            return "<div>" + content + "</div>"
          };
          params.render = {
            item: render,
            option: render
          }
        }
        if (placeholder = $input.data("placeholder")) {
          params.placeholder = placeholder
        }
        if ($input.hasClass("dropdown")) {
          params.maxItems = 1
        }
        if ($input.hasClass("email_selector")) {
          REGEX_EMAIL = "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" + "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";
          params.valueField = "email";
          params.labelField = "name";
          params.searchField = ["name", "email"];
          params.render = {
            item: function(item, escape) {
              return "<div>" + (item.name ? '<span class="name">' + escape(item.name) + "</span>" : "") + (item.email ? '<span class="email">' + escape(item.email) + "</span>" : "") + "</div>"
            },
            option: function(item, escape) {
              var caption, label;
              label = item.name || item.email;
              caption = item.name ? item.email : null;
              return "<div>" + '<span class="label">' + escape(label) + "</span>" + (caption ? '<span class="caption">' + escape(caption) + "</span>" : "") + "</div>"
            }
          };
          params.createFilter = function(input) {
            var match, regex;
            regex = new RegExp("^" + REGEX_EMAIL + "$", "i");
            match = input.match(regex);
            if (match) {
              return !this.options.hasOwnProperty(match[0])
            }
            regex = new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i");
            match = input.match(regex);
            if (match) {
              return !this.options.hasOwnProperty(match[2])
            }
            return false
          };
          params.create = function(input) {
            var match;
            if (new RegExp("^" + REGEX_EMAIL + "$", "i").test(input)) {
              return {
                email: input
              }
            }
            match = input.match(new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i"));
            if (match) {
              return {
                email: match[2],
                name: $.trim(match[1])
              }
            }
            alert("Invalid email address.");
            return false
          }
        }
        if (options = $input.data("options")) {
          if ($input.hasClass("email_selector")) {
            params.options = options
          } else if ($input.hasClass("options_object")) {
            params.options = options;
            params.searchField = ["text", "keywords"]
          } else {
            params.options = options.map(function(opt) {
              return {
                value: opt[0],
                text: opt[1]
              }
            })
          }
          params.plugins.push("remove_button");
          params.delimiter = ",";
          params.persist = false
        }
        if (optgroups = $input.data("optgroups")) {
          params.optgroups = optgroups
        }
        return $input.selectize(params)
      })
    },
    format_dates: function(outer, method) {
      var el, j, len1, ref, results;
      if (method == null) {
        method = "calendar"
      }
      moment.lang("en", {
        calendar: {
          lastDay: "[Yesterday at] LT",
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          lastWeek: "[last] dddd [at] LT",
          nextWeek: "dddd [at] LT",
          sameElse: "MMMM Do YYYY [at] LT"
        }
      });
      ref = outer.find(".date_format");
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        el = ref[j];
        results.push(function(el) {
          var full_date, method_args, real_method, ref1;
          real_method = el.data("format_method") || method;
          method_args = el.data("format_args") || [];
          if (!_.isArray(method_args)) {
            method_args = [method_args]
          }
          full_date = el.html();
          return el.html((ref1 = moment.utc(full_date).local())[real_method].apply(ref1, method_args)).attr("title", full_date + " UTC")
        }($(el)))
      }
      return results
    },
    specific_humanize: function(duration, num_parts) {
      var fn, j, key, len1, out, pair, pairs, single, val;
      if (num_parts == null) {
        num_parts = null
      }
      pairs = [
        ["y", "years", "a year"],
        ["m", "months", "a month"],
        ["d", "days", "a day"],
        ["h", "hours", "an hour"],
        ["m", "minutes", "a minute"],
        ["s", "seconds", "a second"]
      ];
      out = [];
      for (j = 0, len1 = pairs.length; j < len1; j++) {
        pair = pairs[j];
        if (num_parts && out.length === num_parts) {
          break
        }
        key = pair[0], fn = pair[1], single = pair[2];
        val = duration[fn]();
        if (val > 0) {
          if (val > 1) {
            if (fn === "seconds") {
              out.push("a few seconds")
            } else {
              out.push(val + " " + fn)
            }
          } else {
            out.push(single)
          }
        }
      }
      if (out.length > 1) {
        out[out.length - 1] = "and " + out[out.length - 1]
      }
      return out.join(", ")
    },
    format_filesize: function(outer, selector) {
      var file_size, j, len1, ref, results;
      if (selector == null) {
        selector = ".file_size_value"
      }
      ref = outer.find(selector);
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        file_size = ref[j];
        file_size = $(file_size);
        results.push(file_size.html(_.str.formatBytes(parseInt(file_size.html()))))
      }
      return results
    },
    adjust_font_size_to_fit: function(_this) {
      return function(el, min_size) {
        var _el, font_size, results;
        if (min_size == null) {
          min_size = 16
        }
        if (!el.length) {
          return
        }
        font_size = el.css("font-size");
        font_size = parseInt(font_size.match(/\d+/), 10);
        _el = el[0];
        results = [];
        while (_el.offsetWidth < _el.scrollWidth) {
          font_size -= 2;
          if (font_size < min_size) {
            break
          }
          results.push(el.css("font-size", font_size + "px"))
        }
        return results
      }
    }(this),
    date_format: "yy-mm-dd",
    time_format: "HH:mm:ss",
    to_local_time: function(t) {
      return moment.utc(t, "YYYY-MM-DD HH:mm:ss").local().toDate()
    },
    format_date_time: function(d) {
      var date, time;
      time = $.datepicker.formatTime(this.time_format, {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
      });
      date = $.datepicker.formatDate(this.date_format, new Date(d));
      return date + " " + time
    },
    format_date: function(d) {
      return $.datepicker.formatDate(this.date_format, new Date(d))
    },
    datetimepicker: function(pickers, opts) {
      var j, len1, p, picker, val;
      for (j = 0, len1 = pickers.length; j < len1; j++) {
        p = pickers[j];
        picker = $(p);
        if (val = picker.attr("value")) {
          picker.val(this.format_date_time(this.to_local_time(val)))
        }
      }
      return pickers.datetimepicker($.extend({
        timeFormat: this.time_format,
        dateFormat: this.date_format,
        beforeShow: function(_this) {
          return function() {
            _.defer(function() {
              return $("#ui-datepicker-div").css("z-index", 100)
            });
            return void 0
          }
        }(this)
      }, opts))
    },
    datepicker: function(pickers, opts) {
      return pickers.datepicker($.extend({
        dateFormat: this.date_format,
        beforeShow: function(_this) {
          return function() {
            _.defer(function() {
              return $("#ui-datepicker-div").css("z-index", 100)
            });
            return void 0
          }
        }(this)
      }, opts))
    },
    slug_input: function(_this) {
      return function(input, bound_input) {
        var valid_slug_chars;
        valid_slug_chars = /[a-z_0-9_-]/g;
        input.on("keypress", function(e) {
          var char;
          if (e.keyCode >= 32) {
            char = String.fromCharCode(e.keyCode);
            if (!char.match(valid_slug_chars)) {
              return false
            }
          }
        });
        if (bound_input && bound_input.length) {
          input.on("change", function(e) {
            var slug;
            slug = I.slugify(bound_input.val());
            if (input.val().match(/^\s*$/) && slug !== "") {
              return input.val(slug)
            }
          });
          return bound_input.on("change", function(e) {
            if (input.val().match(/^\s*$/)) {
              return input.val(I.slugify($(e.currentTarget).val()))
            }
          })
        }
      }
    }(this),
    deferred_links: function(el, selector, promise_fn) {
      promise_fn || (promise_fn = I.delegate_tracking);
      el.on("mouseup", selector, function(e) {
        var target;
        if (e.which !== 2) {
          return
        }
        target = $(e.currentTarget);
        return promise_fn(target, e)
      });
      return el.on("click", selector, function(e) {
        var finished, is_blank, ref, target;
        if (e.which !== 1) {
          return
        }
        target = $(e.currentTarget);
        is_blank = e.metaKey || e.ctrlKey || e.shiftKey || target.attr("target") === "_blank";
        finished = null;
        if (!is_blank) {
          finished = function(_this) {
            return function() {
              if (!finished) {
                return
              }
              finished = null;
              return window.location = target.attr("href")
            }
          }(this);
          setTimeout(function(_this) {
            return function() {
              return typeof finished === "function" ? finished() : void 0
            }
          }(this), 200)
        }
        if ((ref = promise_fn(target, e)) != null) {
          ref.done(finished)
        }
        if (!is_blank) {
          return false
        }
      })
    },
    delegate_tracking: function(_this) {
      return function(el) {
        var promises;
        promises = [];
        el.trigger("i:delegate_tracking", [function(p) {
          return promises.push(p)
        }]);
        return $.when.apply($, promises)
      }
    }(this),
    ga_tracker: function(_this) {
      return function(category, action, label, value) {
        var send_event;
        return send_event = function(target) {
          var opts, ref, ref1, ref2, ref3;
          opts = {
            hitType: "event",
            eventCategory: (ref = target.data("category")) != null ? ref : category,
            eventAction: (ref1 = target.data("action")) != null ? ref1 : action,
            eventLabel: (ref2 = target.data("label")) != null ? ref2 : label,
            eventValue: (ref3 = target.data("value")) != null ? ref3 : value
          };
          return $.Deferred(function(_this) {
            return function(d) {
              opts.hitCallback = function() {
                return d.resolve()
              };
              return I.event_with_opts(opts)
            }
          }(this))
        }
      }
    }(this),
    tracked_links: function() {
      var action, category, el, label, rest, tracker, value;
      el = arguments[0], rest = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      category = rest[0], action = rest[1], label = rest[2], value = rest[3];
      tracker = I.ga_tracker(category, action, label, value);
      I.deferred_links(el, "a[data-label]", tracker);
      return el.on("i:track_link", function(e, l) {
        var _label;
        if (l) {
          _label = l[0]
        }
        return I.ga_tracker(category, action, _label != null ? _label : label, value)($(e.target))
      })
    },
    set_cookie: function(name, value, opts) {
      if (opts == null) {
        opts = {}
      }
      if (I.in_dev) {
        console.log("set cookie:", [name, value], opts)
      }
      return Cookies.set(name, value, $.extend({
        path: "/",
        domain: "." + $(document.body).data("host")
      }, opts))
    },
    set_register_referrer: function(_this) {
      return function(action) {
        var page;
        page = I.page_name();
        if (page != null) {
          I.set_cookie("ref:register:page_params", page)
        }
        if (action != null) {
          return I.set_cookie("ref:register:action", action)
        }
      }
    }(this),
    setup_register_referrers: function(_this) {
      return function(el) {
        if (I.current_user) {
          return
        }
        return el.on("mouseup", "[data-register_action]", function(e) {
          var action;
          action = $(e.currentTarget).data("register_action");
          return I.set_register_referrer(action)
        })
      }
    }(this),
    setup_affiliate_code: function(_this) {
      return function(code, replace) {
        var location, ref;
        if (replace == null) {
          replace = false
        }
        if (code == null) {
          code = (ref = window.location.search.match(/\bac=([\w\d]+)/)) != null ? ref[1] : void 0
        }
        if (!code) {
          return
        }
        if (!replace && code === Cookies.get("acode")) {
          return
        }
        I.set_cookie("acode", code, {
          expires: 1
        });
        if (document.referrer) {
          I.set_cookie("acode:ref", document.referrer.substring(0, 180), {
            expires: 1
          })
        }
        location = window.location.href.replace(/\?.*$/, "").substring(0, 180);
        return I.set_cookie("acode:land", location, {
          expires: 1
        })
      }
    }(this),
    setup_grid_referrers: function(_this) {
      return function(el, value_fn) {
        var set_cookie_for;
        set_cookie_for = function(el) {
          var game_id, sale, sale_id, sale_type;
          if (!el.closest(".game_author").length) {
            if (game_id = el.closest("[data-game_id]").data("game_id")) {
              I.ReferrerTracker.push("game", game_id, value_fn(el))
            }
          }
          if (!el.closest(".sale_author").length) {
            sale = el.closest("[data-sale_id]");
            if (sale_id = sale.data("sale_id")) {
              sale_type = sale.data("sale_type");
              return I.ReferrerTracker.push(sale_type, sale_id, value_fn(el))
            }
          }
        };
        el.on("mouseup", ".game_cell a, .sale_row a, .leader_game a", function(e) {
          if (e.which > 3) {
            return
          }
          return set_cookie_for($(e.currentTarget))
        });
        return el.on("i:track_link", function(e) {
          return set_cookie_for($(e.target))
        })
      }
    }(this),
    bind_checkbox_to_input: function(_this) {
      return function(checkbox, input, callback) {
        var update_state;
        update_state = function() {
          var checked;
          checked = checkbox.prop("checked");
          input.prop("disabled", checked);
          return typeof callback === "function" ? callback(checked) : void 0
        };
        checkbox.on("change", update_state);
        return update_state()
      }
    }(this),
    is_mobile: function(_this) {
      return function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      }
    }(this),
    is_ios: function(_this) {
      return function() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      }
    }(this),
    strip_css: function(_this) {
      return function(str) {
        return str.replace(/<\s*\/\s*style\s*>/i, "")
      }
    }(this),
    request_fullscreen: function(_this) {
      return function(el, orientation) {
        var entered, ref, ref1;
        entered = el.requestFullscreen ? (el.requestFullscreen(), true) : el.msRequestFullscreen ? (el.msRequestFullscreen(), true) : el.mozRequestFullScreen ? (el.mozRequestFullScreen(), true) : el.webkitRequestFullscreen ? (el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT), true) : false;
        if (entered && orientation) {
          if ((ref = window.screen) != null) {
            if ((ref1 = ref.orientation) != null) {
              if (typeof ref1.lock === "function") {
                //console.log("request_fullscreen attempting to lock screen")
                ref1.lock(orientation)
              }
            }
          }
        }
        return entered
      }
    }(this),
    is_fullscreen: function(_this) {
      return function() {
        return !(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
      }
    }(this),
    exit_fullscreen: function(_this) {
      return function() {
        if (document.exitFullscreen) {
          return document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          return document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          return document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          return document.webkitExitFullscreen()
        }
      }
    }(this),
    toggle_fullscreen: function(_this) {
      return function(el, orientation) {
        if (I.is_fullscreen()) {
          I.exit_fullscreen();
          return false
        } else {
          if (!I.request_fullscreen(el, orientation)) {
            return "failed"
          }
          return true
        }
      }
    }(this),
    setup_dirty_warning: function(_this) {
      return function(form, cb) {
        cb || (cb = function() {
          return form.data("dirty")
        });
        form.data("dirty", false);
        $(window).on("beforeunload", function() {
          var msg;
          msg = cb();
          if (!msg) {
            return
          }
          switch (typeof msg) {
            case "string":
              return msg;
            default:
              return "You've made modifications to this page."
          }
        });
        form.on("i:after_submit", function() {
          return form.data("dirty", false)
        });
        return _.defer(function() {
          form.on("change", "input, select, textarea", function(e) {
            return form.data("dirty", true)
          });
          return form.on("keydown, mousedown", ".redactor-editor", function() {
            return form.data("dirty", true)
          })
        })
      }
    }(this),
  };
  I.InfiniteScroll = function() {
    InfiniteScroll.prototype.loading_element = ".grid_loader";

    function InfiniteScroll(el) {
      this.el = $(el);
      this.setup_loading()
    }
    InfiniteScroll.prototype.get_next_page = function() {
      return alert("override me")
    };
    InfiniteScroll.prototype.setup_loading = function() {
      var check_scroll_pos, win;
      this.loading_row = this.el.find(this.loading_element);
      if (!this.loading_row.length) {
        return
      }
      win = $(window);
      check_scroll_pos = function(_this) {
        return function() {
          if (_this.el.is(".loading")) {
            return
          }
          if (win.scrollTop() + win.height() >= _this.loading_row.offset().top) {
            return _this.get_next_page()
          }
        }
      }(this);
      win.on("scroll.browse_loader", check_scroll_pos);
      return check_scroll_pos()
    };
    InfiniteScroll.prototype.remove_loader = function() {
      $(window).off("scroll.browse_loader");
      return this.loading_row.remove()
    };
    return InfiniteScroll
  }();
  I.InfiniteGameGrid = function(superClass) {
    extend(InfiniteGameGrid, superClass);

    function InfiniteGameGrid() {
      return InfiniteGameGrid.__super__.constructor.apply(this, arguments)
    }
    InfiniteGameGrid.prototype.method = "post";
    InfiniteGameGrid.prototype.current_page = 1;
    InfiniteGameGrid.prototype.get_next_page = function() {
      this.current_page += 1;
      this.el.addClass("loading");
      return $[this.method]("", {
        page: this.current_page,
        format: "json"
      }, function(_this) {
        return function(res) {
          _this.el.removeClass("loading");
          if (res.num_items > 0) {
            return _this.grid.add_image_loading($(res.content).appendTo(_this.grid.el).hide().fadeIn())
          } else {
            return _this.remove_loader()
          }
        }
      }(this))
    };
    return InfiniteGameGrid
  }(I.InfiniteScroll);
  _.templateSettings = {
    escape: /\{\{(?![&])(.+?)\}\}/g,
    interpolate: /\{\{&(.+?)\}\}/g,
    evaluate: /<%([\s\S]+?)%>/g
  };
  _.str.formatBytes = function() {
    var thresholds;
    thresholds = [
      ["gb", Math.pow(1024, 3)],
      ["mb", Math.pow(1024, 2)],
      ["kb", 1024]
    ];
    return function(bytes) {
      var j, label, len1, min, ref;
      for (j = 0, len1 = thresholds.length; j < len1; j++) {
        ref = thresholds[j], label = ref[0], min = ref[1];
        if (bytes >= min) {
          return "" + _.str.numberFormat(bytes / min) + label
        }
      }
      return _.str.numberFormat(bytes) + " bytes"
    }
  }();
  $.easing.smoothstep = function(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }
}).call(this);
(function() {
  var show_images;
  $.fn.dispatch = function(event_type, table) {
    this.on(event_type, function(_this) {
      return function(e) {
        var elm, fn, key, res;
        for (key in table) {
          fn = table[key];
          elm = $(e.target).closest("." + key);
          if (!elm.length) {
            continue
          }
          if (elm.is(".disabled")) {
            return false
          }
          res = fn(elm, e);
          if (res === "continue") {
            return
          }
          return false
        }
        return null
      }
    }(this));
    return this
  };
  $.fn.exists = function() {
    if (this.length > 0) {
      return this
    } else {
      return false
    }
  };
  $.fn.has_tooltips = function(opts) {
    var hide, refresh, show, show_tooltip, tooltip_drop, tooltip_template;
    if (opts == null) {
      opts = {}
    }
    if (I.is_mobile()) {
      return
    }
    tooltip_drop = function() {
      var drop;
      drop = $('<div class="tooltip_drop"></div>');
      $(document.body).append(drop);
      tooltip_drop = function() {
        return drop
      };
      return drop
    };
    tooltip_template = _.template('<div class="tooltip">{{ label }}</div>');
    show_tooltip = function(tooltip_target, instant) {
      var el, height, offset, width;
      if (instant == null) {
        instant = false
      }
      el = tooltip_target.data("tooltip_el");
      if (!el) {
        el = $(tooltip_template({
          label: tooltip_target.attr("aria-label") || tooltip_target.data("tooltip")
        }));
        tooltip_target.data("tooltip_el", el)
      }
      el.removeClass("visible");
      tooltip_drop().empty().append(el);
      offset = tooltip_target.offset();
      height = el.outerHeight();
      width = el.outerWidth();
      el.css({
        position: "absolute",
        top: opts.below ? offset.top + tooltip_target.outerHeight() + 10 : offset.top - height - 10,
        left: Math.floor(offset.left + (tooltip_target.outerWidth() - width) / 2)
      });
      el.toggleClass("below", !!opts.below);
      if (instant) {
        return el.addClass("visible")
      } else {
        return setTimeout(function(_this) {
          return function() {
            return el.addClass("visible")
          }
        }(this), 10)
      }
    };
    refresh = function(_this) {
      return function(e) {
        var el, tooltip_target;
        tooltip_target = $(e.currentTarget);
        el = tooltip_target.data("tooltip_el");
        tooltip_target.removeData("tooltip_el");
        if (!el) {
          return
        }
        if (el.is(":visible")) {
          return show_tooltip(tooltip_target, true)
        }
      }
    }(this);
    show = function(_this) {
      return function(e) {
        var tooltip_target;
        tooltip_target = $(e.currentTarget);
        if (tooltip_target.closest(".redactor-box").length) {
          return
        }
        return show_tooltip(tooltip_target)
      }
    }(this);
    hide = function(_this) {
      return function(e) {
        var el, tooltip_target;
        tooltip_target = $(e.currentTarget);
        if (el = tooltip_target.data("tooltip_el")) {
          return el.remove()
        }
      }
    }(this);
    if (this.is("[data-tooltip]")) {
      this.on("i:refresh_tooltip", refresh);
      this.on("mouseenter focus", show);
      this.on("mouseleave blur i:hide_tooltip", hide)
    } else {
      this.on("i:refresh_tooltip", "[data-tooltip], [aria-label]", refresh);
      this.on("i:clear_tooltips", function() {
        return tooltip_drop().empty()
      });
      this.on("mouseenter focus", "[data-tooltip], [aria-label]", show);
      this.on("mouseleave blur i:hide_tooltip", "[data-tooltip], [aria-label]", hide)
    }
    return this
  };
  $.fn.inline_edit = function(opts) {
    var finished, input, save;
    if (opts == null) {
      opts = {}
    }
    if (this.is(".inline_editing")) {
      this.data("finished_editing")();
      return
    }
    this.addClass("inline_editing");
    input = $('<input type="text" class="inline_edit_input" />').attr("placeholder", this.data("placeholder")).val((typeof opts.get_val === "function" ? opts.get_val(this) : void 0) || this.text()).insertAfter(this.hide()).select();
    finished = function(_this) {
      return function() {
        input.remove();
        _this.show();
        $(document).off("click.inline_editing");
        return _this.removeClass("inline_editing")
      }
    }(this);
    this.data("finished_editing", finished);
    save = function(_this) {
      return function() {
        input.prop("disabled", true);
        if (opts.set_val) {
          return opts.set_val(_this, input.val(), finished)
        } else {
          _this.text(input.val());
          return finished()
        }
      }
    }(this);
    $(document).on("click.edit_title", function(_this) {
      return function(e) {
        if (!$(e.target).closest(".inline_edit_input").length) {
          return save()
        }
      }
    }(this));
    return input.on("keydown", function(_this) {
      return function(e) {
        switch (e.keyCode) {
          case 9:
            return _.defer(function() {
              return save()
            });
          case 13:
            return save();
          case 27:
            return finished()
        }
      }
    }(this))
  };
  I.support_passive_scroll = function() {
    var opts, supports;
    supports = false;
    try {
      opts = Object.defineProperty({}, "passive", {
        get: function(_this) {
          return function() {
            return supports = true
          }
        }(this)
      });
      window.addEventListener("test", null, opts)
    } catch (error) {}
    return supports
  };
  I.support_intersection_observer = function() {
    return "IntersectionObserver" in window
  };
  show_images = function(item, make_promise) {
    var cell, cells, fn1, images, img, j, len, ref;
    item.removeClass("lazy_images");
    cells = item.find("[data-background_image]").addBack("[data-background_image]");
    images = function() {
      var j, len, results;
      results = [];
      for (j = 0, len = cells.length; j < len; j++) {
        cell = cells[j];
        results.push(function(cell) {
          var image_url;
          cell = $(cell);
          image_url = cell.data("background_image");
          cell.css({
            backgroundImage: "url(" + image_url + ")"
          });
          if (make_promise) {
            return $.Deferred(function(_this) {
              return function(d) {
                return $("<img />").attr("src", image_url).on("load", function() {
                  return d.resolve()
                })
              }
            }(this))
          }
        }(cell))
      }
      return results
    }();
    ref = item.find("img[data-lazy_src]").addBack("img[data-lazy_src]");
    fn1 = function(img) {
      var image_url, srcset;
      img = $(img);
      image_url = img.data("lazy_src");
      img.attr("src", image_url);
      if (srcset = img.data("lazy_srcset")) {
        img.attr("srcset", srcset)
      }
      if (make_promise) {
        return $.Deferred(function(_this) {
          return function(d) {
            return img.on("load", function() {
              return d.resolve()
            })
          }
        }(this))
      }
    };
    for (j = 0, len = ref.length; j < len; j++) {
      img = ref[j];
      fn1(img)
    }
    if (make_promise) {
      if (images.length === 1) {
        return images[0]
      } else {
        return $.when.apply($, images)
      }
    }
  };
  $.fn.lazy_images = function(opts) {
    var _show_images, check_images, el, handle_intersect, horizontal, io, j, lazy, len, ref, refresh, selector, target, throttled, unbind, win;
    if (refresh = this.data("lazy_images")) {
      return refresh()
    }
    lazy = (opts != null ? opts.elements : void 0) ? function() {
      var j, len, ref, results;
      ref = opts.elements;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        el = ref[j];
        results.push($(el))
      }
      return results
    }() : (selector = (opts != null ? opts.selector : void 0) || ".lazy_images", function() {
      var j, len, ref, results;
      ref = this.find(selector);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        el = ref[j];
        results.push($(el))
      }
      return results
    }.call(this));
    _show_images = (ref = opts != null ? opts.show_images : void 0) != null ? ref : show_images;
    if (I.support_intersection_observer()) {
      handle_intersect = function(entities) {
        var d, entity, j, len, on_show, results;
        results = [];
        for (j = 0, len = entities.length; j < len; j++) {
          entity = entities[j];
          if (entity.isIntersecting) {
            el = entity.target;
            io.unobserve(el);
            el = $(el);
            on_show = opts != null ? opts.show_item : void 0;
            d = _show_images(el, !!on_show);
            results.push(typeof on_show === "function" ? on_show(el, d) : void 0)
          } else {
            results.push(void 0)
          }
        }
        return results
      };
      io = new IntersectionObserver(handle_intersect, {});
      for (j = 0, len = lazy.length; j < len; j++) {
        el = lazy[j];
        io.observe(el[0])
      }
      return function() {
        return io.disconnect()
      }
    }
    win = $(window);
    target = opts != null ? opts.target : void 0;
    horizontal = opts != null ? opts.horizontal : void 0;
    unbind = null;
    check_images = function(_this) {
      return function() {
        var cuttoff, d, found, i, item, k, len1, on_show, position;
        cuttoff = function() {
          if (target) {
            if (horizontal) {
              return target.outerWidth() + target.position().left
            } else {
              throw new Error("not yet")
            }
          } else {
            return win.scrollTop() + win.height()
          }
        }();
        found = 0;
        for (i = k = 0, len1 = lazy.length; k < len1; i = ++k) {
          item = lazy[i];
          if (!item) {
            continue
          }
          if (!document.body.contains(item[0])) {
            lazy[i] = null;
            found += 1;
            continue
          }
          position = function() {
            if (target) {
              if (horizontal) {
                return item.position().left
              } else {
                throw new Error("not yet")
              }
            } else {
              return item.offset().top
            }
          }();
          if (!item[0].offsetParent) {
            continue
          }
          if (position < cuttoff) {
            on_show = opts != null ? opts.show_item : void 0;
            d = _show_images(item, !!on_show);
            if (typeof on_show === "function") {
              on_show(item, d)
            }
            found += 1;
            lazy[i] = null
          }
        }
        if (found > 0) {
          return lazy = function() {
            var l, len2, results;
            results = [];
            for (l = 0, len2 = lazy.length; l < len2; l++) {
              el = lazy[l];
              if (el) {
                results.push(el)
              }
            }
            return results
          }()
        }
      }
    }(this);
    throttled = _.throttle(check_images, 100);
    if (target) {
      target.on("scroll", throttled);
      win.on("resize", throttled);
      unbind = function() {
        target.off("scroll", throttled);
        return win.off("resize", "throttled")
      }
    } else {
      if (I.support_passive_scroll()) {
        window.addEventListener("scroll", throttled, {
          passive: true
        });
        win.on("resize i:reshape", throttled);
        unbind = function() {
          window.removeEventListener("scroll", throttled, {
            passive: true
          });
          return win.off("resize", throttled)
        }
      } else {
        win.on("scroll resize i:reshape", throttled);
        unbind = function() {
          return win.off("scroll resize i:reshape", throttled)
        }
      }
    }
    this.data("lazy_images", function(_this) {
      return function() {
        lazy = (opts != null ? opts.elements : void 0) ? function() {
          var k, len1, ref1, results;
          ref1 = opts.elements;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            el = ref1[k];
            results.push($(el))
          }
          return results
        }() : (selector = (opts != null ? opts.selector : void 0) || ".lazy_images", function() {
          var k, len1, ref1, results;
          ref1 = this.find(selector);
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            el = ref1[k];
            results.push($(el))
          }
          return results
        }.call(_this));
        return check_images()
      }
    }(this));
    check_images();
    return unbind
  };
  $.fn.max_height = function(margin) {
    var padding, set_height, win;
    if (margin == null) {
      margin = 0
    }
    win = $(window);
    padding = this.outerHeight(true) - this.height();
    set_height = function(_this) {
      return function() {
        return _this.css("min-height", win.height() - padding - margin + "px")
      }
    }(this);
    win.on("resize", set_height);
    return set_height()
  };
  $.fn.remote_link = function(fn) {
    return this.on("click", "[data-remote]", function(_this) {
      return function(e) {
        var confirm_msg, el, href, method, params;
        e.preventDefault();
        el = $(e.currentTarget);
        if (el.is(".loading")) {
          return
        }
        method = el.data("method") || "POST";
        params = I.with_csrf($.extend({}, el.data("params")));
        href = el.data("href") || el.attr("href");
        if (confirm_msg = el.data("confirm")) {
          if (!confirm(confirm_msg)) {
            return
          }
        }
        el.addClass("loading").prop("disabled", true);
        $.ajax({
          type: method,
          url: href,
          data: params,
          xhrFields: {
            withCredentials: true
          }
        }).done(function(res) {
          el.removeClass("loading").prop("disabled", false);
          return typeof fn === "function" ? fn(res, el) : void 0
        });
        return null
      }
    }(this))
  };
  $.fn.remote_submit = function(fn, validate_fn, more_data) {
    var click_input;
    click_input = null;
    this.on("click", "button[name], input[type='submit'][name]", function(_this) {
      return function(e) {
        var btn;
        btn = $(e.currentTarget);
        if (click_input != null) {
          click_input.remove()
        }
        return click_input = $("<input type='hidden' />").attr("name", btn.attr("name")).val(btn.attr("value")).prependTo(_this)
      }
    }(this));
    return this.on("submit", function(_this) {
      return function(e, callback) {
        var form;
        e.preventDefault();
        form = $(e.currentTarget);
        if (validate_fn) {
          if (!(typeof validate_fn === "function" ? validate_fn(form) : void 0)) {
            return
          }
        }
        I.remote_submit(form, more_data).done(function(res) {
          form.data("dirty", false);
          if (callback != null) {
            return callback(res, form)
          } else {
            return fn(res, form)
          }
        });
        return null
      }
    }(this))
  };
  $.fn.remote_table = function() {
    var current_page, fill_page, max_page, xhr_cache;
    max_page = this.data("max_page");
    current_page = function(_this) {
      return function() {
        return _this.data("page") || 1
      }
    }(this);
    xhr_cache = {};
    fill_page = function(_this) {
      return function(page_num) {
        var table, xhr;
        if (_this.is(".loading")) {
          return
        }
        if (!(1 <= page_num && page_num <= max_page)) {
          return
        }
        table = _this.find("table");
        _this.addClass("loading").data("page", page_num).toggleClass("first_page", page_num === 1).toggleClass("last_page", page_num === max_page).find(".current_page").text(page_num);
        xhr = xhr_cache[page_num] || (xhr_cache[page_num] = $.get(_this.data("remote_url") + "?" + $.param({
          page: page_num
        })));
        return xhr.done(function(res) {
          _this.removeClass("loading");
          return table.html(res.content)
        })
      }
    }(this);
    return this.dispatch("click", {
      next_page_btn: function(_this) {
        return function() {
          return fill_page(current_page() + 1)
        }
      }(this),
      prev_page_btn: function(_this) {
        return function() {
          return fill_page(current_page() - 1)
        }
      }(this)
    })
  };
  $.fn.set_form_errors = function(errors, scroll_to, msg) {
    var base, e, errors_el, errors_list, has_errors, j, len, lightbox;
    if (scroll_to == null) {
      scroll_to = true
    }
    if (msg == null) {
      msg = "Errors"
    }
    this.find(".form_errors").remove();
    has_errors = !!(errors != null ? errors.length : void 0);
    this.toggleClass("has_errors", has_errors);
    if (has_errors) {
      errors_el = $(_.template('<div class="form_errors">\n  <div>{{ msg }}:</div>\n  <ul></ul>\n</div>')({
        msg: msg
      }));
      errors_list = errors_el.find("ul");
      for (j = 0, len = errors.length; j < len; j++) {
        e = errors[j];
        errors_list.append($("<li></li>").text(e))
      }
      this.prepend(errors_el);
      if (scroll_to) {
        lightbox = this.closest(".lightbox");
        if (lightbox.length || this.offset().top > $(window).height() / 2) {
          if (typeof(base = this[0]).scrollIntoView === "function") {
            base.scrollIntoView()
          }
        } else {
          $("html, body").animate({
            scrollTop: 0
          }, "fast")
        }
      }
    }
    return this
  };
  $.fn.swap_with = function(other) {
    var new_offset, offset, other_new_offset, other_offset, other_placeholder, other_tag_name, placeholder, tag_name;
    other = $(other);
    if (!(this.length && other.length)) {
      return
    }
    offset = this.offset();
    other_offset = other.offset();
    tag_name = this.prop("tagName");
    other_tag_name = other.prop("tagName");
    placeholder = $("<" + tag_name + "></" + tag_name + ">").insertAfter(this);
    other_placeholder = $("<" + other_tag_name + "></" + other_tag_name + ">").insertAfter(other);
    placeholder.after(other);
    other_placeholder.after(this);
    new_offset = this.offset();
    other_new_offset = other.offset();
    other_placeholder.replaceWith(this.detach().css({
      position: "relative",
      top: offset.top - new_offset.top + "px",
      left: offset.left - new_offset.left + "px"
    }));
    placeholder.replaceWith(other.detach().css({
      position: "relative",
      top: other_offset.top - other_new_offset.top + "px",
      left: other_offset.left - other_new_offset.left + "px"
    }));
    return _.defer(function(_this) {
      return function() {
        _this.css({
          top: "",
          left: ""
        });
        return other.css({
          top: "",
          left: ""
        })
      }
    }(this))
  }
}).call(this);
(function() {
  var slice = [].slice,
    bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments)
      }
    },
    extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.Lightbox = function() {
    Lightbox.lightbox_container = function() {
      return this._container || (this._container = $("#lightbox_container").exists() || $('<div id="lightbox_container"></div>').appendTo("body"))
    };
    Lightbox.shroud_container = function() {
      return this._shroud || (this._shroud = $("#lightbox_shroud").exists() || $('<div id="lightbox_shroud"></div>').appendTo("body"))
    };
    Lightbox.show_shroud = function() {
      var shroud;
      if (this.shroud_visible) {
        return
      }
      if (!this._shroud) {
        shroud = this.shroud_container();
        this.lightbox_container().on("click", function(_this) {
          return function(e) {
            if (!$(e.target).closest(".lightbox").length) {
              if ($(e.target).attr("href") === "javascript:void(0)") {
                return
              }
              return _this.close()
            }
          }
        }(this));
        shroud.on("click", function(_this) {
          return function() {
            return _this.close()
          }
        }(this));
        $(document.body).on("keydown", function(_this) {
          return function(e) {
            if (e.keyCode === 27) {
              e.preventDefault();
              e.stopPropagation();
              return _this.close()
            } else {
              return _this.on_keydown(e)
            }
          }
        }(this));
        $(window).on("resize", function(_this) {
          return function(e) {
            return _this.on_resize(e)
          }
        }(this))
      }
      this.shroud_visible = true;
      this.shroud_container().addClass("invisible").show();
      return _.defer(function(_this) {
        return function() {
          return _this.shroud_container().removeClass("invisible")
        }
      }(this))
    };
    Lightbox.hide_shroud = function() {
      this.shroud_visible = false;
      return this.shroud_container().hide()
    };
    Lightbox.open_loading = function() {
      return this.open_tpl("loading_lightbox", I.Lightbox)
    };
    Lightbox.open_remote_react = function(url, init) {
      this.open_loading();
      return $.when(I.add_react(), $.ajax({
        dataType: "json",
        url: url,
        data: {
          props: true
        },
        xhrFields: {
          withCredentials: true
        },
        error: function(_this) {
          return function(xhr, message, error) {
            var res;
            res = function() {
              try {
                return JSON.parse(xhr.responseText)
              } catch (error1) {}
            }();
            if (res != null ? res.errors : void 0) {
              alert(res.errors.join(","))
            } else {
              alert("Something went wrong. Please try again later and contact support if it persists.")
            }
            return _this.close()
          }
        }(this)
      })).done(function(_this) {
        return function(res, arg) {
          var lb, props;
          props = arg[0];
          if (props.errors) {
            alert(props.errors.join(","));
            _this.close();
            return
          }
          lb = init(props);
          if (lb) {
            return I.Lightbox.open(lb)
          } else {
            return _this.close()
          }
        }
      }(this))
    };
    Lightbox.open_remote = function() {
      var T, args, url;
      url = arguments[0], T = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (T == null) {
        T = I.Lightbox
      }
      this.open_loading();
      return $.ajax({
        dataType: "json",
        url: url,
        data: {
          lightbox: true
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(_this) {
          return function(res) {
            if (res.errors) {
              alert(res.errors.join(","));
              _this.close();
              return
            }
            return _this.open.apply(_this, [res.content, T].concat(slice.call(args)))
          }
        }(this),
        error: function(_this) {
          return function(xhr, message, error) {
            alert("Something went wrong. Please try again later and contact support if it persists.");
            return _this.close()
          }
        }(this)
      })
    };
    Lightbox.open_tpl = function() {
      var args, el, tpl;
      tpl = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      el = $("#" + tpl + "_tpl");
      if (!el.length) {
        throw "missing template for lightbox: " + tpl
      }
      return this.open.apply(this, [el.html()].concat(slice.call(args)))
    };
    Lightbox.open_tpl_with_params = function() {
      var args, el, html, params, tpl;
      tpl = arguments[0], params = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      el = $("#" + tpl + "_tpl");
      if (!el.length) {
        throw "missing template for lightbox: " + tpl
      }
      html = _.template(el.html())(params);
      return this.open.apply(this, [html].concat(slice.call(args)))
    };
    Lightbox.open = function() {
      var T, args, content, lightbox, lightbox_el, new_obj;
      content = arguments[0], T = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (T == null) {
        T = I.Lightbox
      }
      if (this.current_lightbox) {
        this.current_lightbox.close();
        this.current_lightbox = null
      }
      new_obj = false;
      if (content.$$typeof) {
        new_obj = true;
        lightbox = new I.ReactLightbox(content, this)
      } else {
        if ("string" === typeof content) {
          content = $.trim(content)
        }
        lightbox_el = $(content);
        if (!(lightbox = lightbox_el.data("object"))) {
          new_obj = true;
          lightbox = function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor,
              result = func.apply(child, args);
            return Object(result) === result ? result : child
          }(T, [lightbox_el, this].concat(slice.call(args)), function() {});
          lightbox_el.data("object", lightbox)
        }
      }
      $(document.body).addClass("lightbox_open");
      this.show_shroud();
      lightbox.show(new_obj);
      this.current_lightbox = lightbox;
      return lightbox
    };
    Lightbox.close = function() {
      var ref;
      if (this.current_lightbox && !this.current_lightbox.is_closable()) {
        return
      }
      if (this.current_lightbox && this.current_lightbox.el.is(".has_changes")) {
        if (!confirm("You've have unsaved changes in this dialog. Are you sure you want to close it?")) {
          return
        }
      }
      this.hide_shroud();
      if ((ref = this.current_lightbox) != null) {
        ref.close()
      }
      this.current_lightbox = null;
      return $(document.body).removeClass("lightbox_open")
    };
    Lightbox.on_keydown = function(e) {
      var ref, ref1;
      return (ref = this.current_lightbox) != null ? (ref1 = ref.el) != null ? ref1.trigger("i:lightbox_keydown", e) : void 0 : void 0
    };
    Lightbox.on_resize = function(e) {
      var ref, ref1;
      return (ref = this.current_lightbox) != null ? (ref1 = ref.el) != null ? ref1.trigger("i:lightbox_resize", e) : void 0 : void 0
    };
    Lightbox.prototype.lightbox_hidden = function(lb) {};

    function Lightbox() {
      var el, parent1, rest;
      el = arguments[0], parent1 = arguments[1], rest = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      this.parent = parent1;
      this.el = $(el);
      this.el.on("click", ".close_button, .close_btn", function(_this) {
        return function(e) {
          I.Lightbox.close();
          return false
        }
      }(this));
      this.init.apply(this, rest)
    }
    Lightbox.prototype.init = function() {};
    Lightbox.prototype.first_show = function() {};
    Lightbox.prototype.with_selectize = function(fn) {
      var html;
      if (!$.fn.selectize) {
        html = this.el.data().selectize;
        if (!html) {
          throw "missing selectize include in lightbox"
        }
        $("head").append(html)
      }
      return I.with_selectize(fn)
    };
    Lightbox.prototype.with_redactor = function(fn) {
      var html;
      if (!$.fn.redactor) {
        html = this.el.data().redactor;
        if (!html) {
          throw "missing redactor include in lightbox"
        }
        $("head").append(html)
      }
      return I.with_redactor(fn)
    };
    Lightbox.prototype.show = function(first_time) {
      var el, i, len, ref;
      this.el.add(this.parent.shroud_container()).add(this.parent.lightbox_container()).toggleClass("mobile_lb", $(window).width() <= 600);
      this.el.appendTo(this.parent.lightbox_container()).addClass("animated").show().trigger("i:lightbox_open");
      this.position();
      if (first_time) {
        ref = this.el.find("[data-js_init]");
        for (i = 0, len = ref.length; i < len; i++) {
          el = ref[i];
          eval($(el).data("js_init"))
        }
        return this.first_show()
      }
    };
    Lightbox.prototype.replace_content = function(c) {
      var content;
      content = this.el.find(".content");
      content.empty();
      content.append(c);
      return this.position()
    };
    Lightbox.prototype.replace_title = function(title) {
      this.el.find(".lightbox_title").html(title);
      return this.position()
    };
    Lightbox.prototype.add_css_class = function(c) {
      return this.el.addClass(c)
    };
    Lightbox.prototype.remove_css_class = function(c) {
      return this.el.removeClass(c)
    };
    Lightbox.prototype.close = function() {
      this.el.add(Lightbox.shroud_container()).add(Lightbox.lightbox_container()).removeClass("mobile_lb");
      return this.el.removeClass("animated").hide().trigger("i:lightbox_close").remove()
    };
    Lightbox.prototype.position = function() {
      var top;
      if (this.el.is(".mobile_lb")) {
        return this.el.css({
          "margin-left": ""
        })
      } else {
        top = "fixed" === this.parent.lightbox_container().css("position") ? "" : $(window).scrollTop() + 80 + "px";
        return this.el.css({
          position: "absolute",
          top: top,
          "margin-left": -this.el.outerWidth() / 2 + "px"
        })
      }
    };
    Lightbox.prototype.closable = true;
    Lightbox.prototype.is_closable = function() {
      return this.closable
    };
    return Lightbox
  }();
  I.CenterLighbox = function(superClass) {
    extend(CenterLighbox, superClass);

    function CenterLighbox() {
      this.position = bind(this.position, this);
      return CenterLighbox.__super__.constructor.apply(this, arguments)
    }
    CenterLighbox.prototype.position = function() {
      return this.el.css({
        position: "fixed",
        left: "50%",
        top: "50%",
        "margin-left": -this.el.outerWidth() / 2 + "px",
        "margin-top": -this.el.outerHeight() / 2 + "px"
      })
    };
    return CenterLighbox
  }(I.Lightbox);
  I.ReactLightbox = function(superClass) {
    extend(ReactLightbox, superClass);

    function ReactLightbox() {
      var base, component, el, parent, rest, wrapper;
      component = arguments[0], parent = arguments[1], rest = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      wrapper = $('<div class="react_lightbox"></div>').appendTo(parent.lightbox_container());
      this.react_component = ReactDOM.render(component, wrapper[0]);
      el = ReactDOM.findDOMNode(this.react_component);
      ReactLightbox.__super__.constructor.apply(this, [el, parent].concat(slice.call(rest)));
      this.react_component.setState({
        lightbox: this
      });
      if (typeof(base = this.react_component).lightbox_initialized === "function") {
        base.lightbox_initialized()
      }
    }
    ReactLightbox.prototype.show = function(first_time) {
      this.el.addClass("animated");
      return this.position()
    };
    ReactLightbox.prototype.close = function() {
      var parent;
      this.el.trigger("i:lightbox_close");
      parent = this.el.parent();
      ReactDOM.unmountComponentAtNode(parent[0]);
      return parent.remove()
    };
    return ReactLightbox
  }(I.Lightbox)
}).call(this);
(function() {
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.CollectionLightbox = function(superClass) {
    extend(CollectionLightbox, superClass);

    function CollectionLightbox() {
      return CollectionLightbox.__super__.constructor.apply(this, arguments)
    }
    CollectionLightbox.prototype.init = function() {
      var form;
      I.has_follow_button(this.el);
      I.event2("view add to collection lightbox");
      this.el.find("input[type='radio']:first").prop("checked", true);
      this.el.on("click change", ".collection_option", function(_this) {
        return function(e) {
          var row;
          row = $(e.currentTarget);
          return row.find("input[type='radio']").prop("checked", true)
        }
      }(this));
      form = this.el.find("form").remote_submit(function(_this) {
        return function(res) {
          if (res.errors) {
            if (I.add_recaptcha_if_necessary(form, res.errors)) {
              return
            }
            form.set_form_errors(res.errors);
            return
          }
          _this.el.addClass("is_complete");
          return _this.el.find(".after_submit .collection_name").text(res.title).attr("href", res.url)
        }
      }(this));
      this.with_redactor(function(_this) {
        return function() {
          return I.redactor(_this.el.find("textarea"), {
            minHeight: 40,
            source: false,
            buttons: ["bold", "italic", "deleted", "lists", "link"]
          })
        }
      }(this));
      return this.with_selectize(function(_this) {
        return function() {
          return _this.el.find("select.collection_input").selectize()
        }
      }(this))
    };
    return CollectionLightbox
  }(I.Lightbox)
}).call(this);
(function() {
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.AfterDownloadLightbox = function(superClass) {
    extend(AfterDownloadLightbox, superClass);

    function AfterDownloadLightbox() {
      return AfterDownloadLightbox.__super__.constructor.apply(this, arguments)
    }
    AfterDownloadLightbox.prototype.init = function(game, opts) {
      var grid;
      this.game = game;
      if (opts == null) {
        opts = {}
      }
      I.event(opts.page_name || "view_game", "after_download_lb", "" + this.game.id);
      grid = this.el.find(".game_grid_widget");
      new I.GameGrid(grid, {
        expected_size: 240,
        selector: ".after_download_lightbox_widget .game_cell .game_thumb",
        width_selector: ".after_download_lightbox_widget .game_cell"
      });
      I.setup_grid_referrers(this.el, function(_this) {
        return function() {
          return "after_download:" + _this.game.id
        }
      }(this));
      I.tracked_links(this.el, "after_download_lb");
      return I.has_follow_button(this.el)
    };
    return AfterDownloadLightbox
  }(I.Lightbox)
}).call(this);
(function() {
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.RateGameLightbox = function(superClass) {
    extend(RateGameLightbox, superClass);

    function RateGameLightbox() {
      return RateGameLightbox.__super__.constructor.apply(this, arguments)
    }
    RateGameLightbox.prototype.init = function() {
      return this.with_redactor()
    };
    return RateGameLightbox
  }(I.Lightbox)
}).call(this);
(function() {
  var bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments)
      }
    },
    extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.BaseBuyForm = function() {
    BaseBuyForm.prototype.event_category = "buy_form";
    BaseBuyForm.prototype.pay_in_popup = false;
    BaseBuyForm.prototype.min_price = 100;

    function BaseBuyForm(el, opts1) {
      var medium, source;
      this.opts = opts1 != null ? opts1 : {};
      this.billing_address_valid = bind(this.billing_address_valid, this);
      this.show_billing_address_form = bind(this.show_billing_address_form, this);
      this.show_vat_form = bind(this.show_vat_form, this);
      this.submit_handler = bind(this.submit_handler, this);
      this.checkout_btn_handler = bind(this.checkout_btn_handler, this);
      this.set_fingerprint = bind(this.set_fingerprint, this);
      this.el = $(el);
      this.el.find("input[name=csrf_token][value='']").val($("meta[name=csrf_token]").attr("value"));
      this.form = this.el.find("form");
      this.opts = $.extend({}, this.form.data("opts"), this.opts);
      this.set_fingerprint();
      this.input = this.form.find("input.money_input");
      if (this.input.length) {
        I.money_input(this.input)
      }
      this.form.on("submit", function(_this) {
        return function() {
          return _this.submit_handler.apply(_this, arguments)
        }
      }(this));
      this.el.dispatch("click", {
        add_btn: function(_this) {
          return function(btn) {
            var amount;
            amount = +btn.attr("data-amount");
            _this.track_add_btn(amount);
            _this.input.val(I.format_money(_this.get_value() + amount, _this.get_currency()));
            return _this.update_items()
          }
        }(this),
        billing_back_btn: function(_this) {
          return function() {
            _this.form.find(".checkout_btn").prop("disabled", false);
            return _this.form.removeClass("show_billing_address_form")
          }
        }(this),
        vat_back_btn: function(_this) {
          return function() {
            _this.form.removeClass("show_vat_confirm");
            return _this.show_billing_address_form()
          }
        }(this),
        direct_download_btn: function(_this) {
          return function() {
            return _this.direct_download()
          }
        }(this),
        save_billing_btn: function(_this) {
          return function(e) {
            if (!_this.billing_address_valid()) {
              return
            }
            if (_this.opts.collect_vat) {
              return _this.show_vat_form()
            } else {
              return _this.form.submit()
            }
          }
        }(this),
        confirm_vat_btn: function(_this) {
          return function(e) {
            return _this.form.submit()
          }
        }(this)
      });
      this.el.on("click", ".checkout_btn", function(_this) {
        return function(e) {
          return _this.checkout_btn_handler(e)
        }
      }(this));
      I.format_dates(this.el);
      if (source = this.opts.pick_source) {
        medium = this.opts.pick_medium || "default";
        this.el.find("[data-source='" + source + "'][data-medium='" + medium + "']").click()
      }
    }
    BaseBuyForm.prototype.set_fingerprint = function() {
      if (!window.Fingerprint2) {
        return false
      }
      this.set_fingerprint = function() {};
      return (new Fingerprint2).get(function(_this) {
        return function(res) {
          if (res) {
            return _this.form.find(".bp_input").val(res)
          }
        }
      }(this))
    };
    BaseBuyForm.prototype.checkout_btn_handler = function(e) {
      var source;
      source = this.set_source(e);
      if (this.opts.collect_billing_address) {
        if (this.is_valid()) {
          this.show_billing_address_form()
        }
        return false
      }
    };
    BaseBuyForm.prototype.submit_handler = function() {
      if (!this.is_valid()) {
        return false
      }
      if (this.form.attr("target") === "_blank") {
        return this.form.removeClass("show_vat_confirm show_billing_address_form").addClass("show_purchase_complete")
      }
    };
    BaseBuyForm.prototype.show_vat_form = function() {
      var country, inputs, price;
      if (!this.form.is(".show_billing_address_form")) {
        throw "billing form not visible"
      }
      inputs = this.form.addClass("loading").find(".billing_address_view").find("input[type='text'], select, button");
      inputs.prop("disabled", true);
      price = this.form.find("[name='price']").val();
      country = this.form.find("[name='address[country]']").val();
      return $.ajax({
        type: "GET",
        url: this.opts.tax_preview_url,
        data: {
          price: price,
          country: country
        },
        async: false
      }).then(function(_this) {
        return function(res) {
          var error, f, field, i, len, ref, vat_preview;
          inputs.prop("disabled", false);
          _this.form.removeClass("loading has_vat_error");
          if (res.errors) {
            error = res.errors[0];
            switch (error) {
              case "country mismatch":
                I.event(_this.event_category, "vat", "country_mismatch");
                _this.form.removeClass("show_billing_address_form").addClass("show_vat_confirm has_vat_error");
                break;
              default:
                I.event(_this.event_category, "error", JSON.stringify(res.errors));
                _this.form.find(".generic_error_description").text(res.errors[0]);
                _this.form.removeClass("show_billing_address_form").addClass("show_vat_confirm has_generic_error")
            }
            return
          }
          if (!res.rate || res.tax === 0) {
            _this.form.submit();
            return
          }
          _this.form.removeClass("show_billing_address_form").addClass("show_vat_confirm");
          if (!_this._seen_vat) {
            I.event(_this.event_category, "vat", "show_tax_preview");
            _this._seen_vat = true
          }
          vat_preview = _this.form.find(".vat_view");
          ref = vat_preview.find("[data-field]");
          for (i = 0, len = ref.length; i < len; i++) {
            field = ref[i];
            f = $(field);
            f.text(res[f.data("field")] || "")
          }
          return vat_preview.toggleClass("no_tip", !res.tip || res.tip === 0)
        }
      }(this))
    };
    BaseBuyForm.prototype.show_billing_address_form = function() {
      if (!this._seen_billing) {
        I.event(this.event_category, "vat", "show_billing");
        this._seen_billing = true
      }
      this.form.find(".checkout_btn").prop("disabled", true);
      return this.form.addClass("show_billing_address_form")
    };
    BaseBuyForm.prototype.set_source = function(e) {
      var btn, medium, source;
      btn = $(e.currentTarget).closest(".checkout_btn");
      if (!btn.length) {
        btn = (this._checkout_btns || (this._checkout_btns = this.form.find(".checkout_btn"))).first()
      }
      source = btn.data("source");
      (this._source_input || (this._source_input = this.form.find(".source_input"))).val(source);
      medium = btn.data("medium");
      (this._medium_input || (this._medium_input = this.form.find(".medium_input"))).val(medium || "");
      return source
    };
    BaseBuyForm.prototype.set_loading = function(is_loading) {
      this.form.toggleClass("loading", is_loading);
      this.el.toggleClass("loading", is_loading);
      this.input.prop("disabled", is_loading);
      (this.add_buttons || (this.add_buttons = this.form.find(".add_btn"))).toggleClass("disabled", is_loading);
      return this.el.triggerHandler("i:loading", is_loading)
    };
    BaseBuyForm.prototype.has_money_input = function() {
      return !!this.input.length
    };
    BaseBuyForm.prototype.get_value = function() {
      return I.parse_money(this.input.val())
    };
    BaseBuyForm.prototype.get_currency = function() {
      return this.input.data("currency")
    };
    BaseBuyForm.prototype._clean_error_message = function(msg) {
      if (msg === "paypal failed") {
        msg = "Failed to create PayPal transaction, please try again later."
      }
      return msg
    };
    BaseBuyForm.prototype.set_error = function(msg) {
      msg = this._clean_error_message(msg);
      this.error_text || (this.error_text = this.el.find(".error_text"));
      if (msg) {
        this.form.addClass("has_error");
        return this.error_text.text(msg)
      } else {
        return this.form.removeClass("has_error")
      }
    };
    BaseBuyForm.prototype.remote_submit = function(e) {
      var data, popup, ref;
      if (!this.is_valid()) {
        return false
      }
      data = this.form.serializeArray();
      data.push({
        name: "json",
        value: "true"
      });
      this.set_loading(true);
      this.track_remote_submit();
      if (this.pay_in_popup) {
        popup = window.open();
        if ((ref = popup.document) != null) {
          ref.write("Loading...")
        }
        _.defer(function(_this) {
          return function() {
            var ref1;
            return (ref1 = popup.document) != null ? ref1.title = "Loading..." : void 0
          }
        }(this))
      }
      this.el.trigger("i:buy_start", [data]);
      $.ajax({
        url: this.form.attr("action"),
        type: "POST",
        data: data,
        xhrFields: {
          withCredentials: true
        },
        success: function(_this) {
          return function(res) {
            if (res.url) {
              if (popup) {
                popup.location = res.url;
                _this.set_loading(false)
              } else {
                window.top.location = res.url
              }
              return _this.el.trigger("i:buy_complete", [res])
            } else {
              if (popup) {
                popup.close()
              }
              _this.form.removeClass("show_billing_address_form show_vat_confirm");
              _this.set_error(res.errors.join(","));
              return _this.set_loading(false)
            }
          }
        }(this)
      });
      return false
    };
    BaseBuyForm.prototype.is_valid = function() {
      var value;
      if (this.has_money_input()) {
        value = this.get_value();
        if (value < this.min_price) {
          this.set_error("Due to processing fees the minimum amount is 100 cents.");
          return false
        }
      }
      this.set_error();
      return true
    };
    BaseBuyForm.prototype.billing_address_valid = function() {
      return this.el.find(".billing_address_form_widget").data("object").check_valid()
    };
    BaseBuyForm.prototype.track_add_btn = function(amount) {};
    BaseBuyForm.prototype.track_remote_submit = function() {};
    BaseBuyForm.prototype.update_items = function() {};
    return BaseBuyForm
  }();
  I.BuyForm = function(superClass) {
    extend(BuyForm, superClass);
    BuyForm.prototype.download_url = function() {
      if (I.subdomain) {
        return "/" + this.game.slug + "/download_url"
      } else {
        return "/game/download_url/" + this.game.id
      }
    };
    BuyForm.prototype.track_add_btn = function(amount) {
      return I.event(this.event_category, "add_" + amount, "" + this.game.id)
    };
    BuyForm.prototype.track_remote_submit = function() {
      return I.event(this.event_category, "purchase", "" + this.game.id, this.get_value())
    };

    function BuyForm(el, game1, opts) {
      var ref;
      this.game = game1;
      this.setup_filelist = bind(this.setup_filelist, this);
      this.download_url = bind(this.download_url, this);
      BuyForm.__super__.constructor.call(this, el, opts);
      this.setup_filelist();
      this.pay_in_popup = (ref = opts != null ? opts.pay_in_popup : void 0) != null ? ref : this.game.type_name !== "default";
      if (!this.pay_in_popup) {
        this.pay_in_popup = "_blank" === $("base[target]").attr("target")
      }
    }
    BuyForm.prototype.update_items = function() {
      var file, files, i, len, min, ref, results, val;
      if (!((ref = this.file_list) != null ? ref.length : void 0)) {
        return
      }
      val = val || this.get_value();
      files = this.file_list.find(".file_row");
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        file = $(file);
        min = file.data("min_price");
        results.push(file.toggleClass("inactive", !!(min && val < min)))
      }
      return results
    };
    BuyForm.prototype.setup_filelist = function() {
      this.file_list = this.el.find(".file_list");
      if (!this.file_list.length) {
        return
      }
      this.el.on("keyup blur", ".money_input", function(_this) {
        return function() {
          return _this.update_items()
        }
      }(this));
      this.file_list.on("click", ".inactive", function(_this) {
        return function(e) {
          var min, row;
          I.event(_this.event_category, "pick_file", "" + _this.game.id);
          row = $(e.currentTarget);
          min = row.data("min_price");
          if (min) {
            _this.el.trigger("i:show_checkout");
            _this.input.val(I.format_money(min, _this.get_currency()));
            return _this.update_items()
          }
        }
      }(this));
      this.el.find(".file_size_value").html(function() {
        return _.str.formatBytes(parseInt($(this).html(), 10))
      });
      return this.update_items()
    };
    BuyForm.prototype.direct_download = function() {
      var popup;
      I.event(this.event_category, "skip_buy", "" + this.game.id);
      this.set_loading(true);
      if (this.pay_in_popup) {
        popup = window.open();
        popup.document.write("Loading...");
        _.defer(function(_this) {
          return function() {
            return popup.document.title = "Loading..."
          }
        }(this))
      }
      return $.ajax({
        url: this.download_url(),
        type: "POST",
        xhrFields: {
          withCredentials: true
        },
        data: I.with_csrf({
          reward_id: this.opts.reward_id
        }),
        success: function(_this) {
          return function(res) {
            if (res.url) {
              if (popup) {
                popup.location = res.url;
                return _this.set_loading(false)
              } else {
                return window.top.location = res.url
              }
            } else {
              _this.set_error("There was an error generating the download URL, please try again.");
              return _this.set_loading(false)
            }
          }
        }(this)
      })
    };
    BuyForm.prototype.is_valid = function() {
      var formatted, value;
      if (this.has_money_input()) {
        value = this.get_value();
        if (!this.opts.is_donate) {
          if (value === 0 && this.game.actual_price === 0) {
            this.set_error();
            this.direct_download();
            return false
          }
          if (value < this.game.actual_price) {
            formatted = I.format_money(this.game.actual_price, this.get_currency());
            this.set_error("You must pay at least " + formatted + ".");
            return false
          }
        }
      }
      if (!BuyForm.__super__.is_valid.apply(this, arguments)) {
        return
      }
      return true
    };
    return BuyForm
  }(I.BaseBuyForm);
  I.BundleBuyForm = function(superClass) {
    extend(BundleBuyForm, superClass);
    BundleBuyForm.prototype.event_category = "bundle_buy_form";

    function BundleBuyForm(el, bundle, opts) {
      this.bundle = bundle;
      this.setup_gamelist = bind(this.setup_gamelist, this);
      this.download_url = bind(this.download_url, this);
      BundleBuyForm.__super__.constructor.call(this, el, opts);
      this.setup_gamelist()
    }
    BundleBuyForm.prototype.download_url = function() {
      return "/bundle/" + this.bundle.id + "/download_url"
    };
    BundleBuyForm.prototype.direct_download = function() {
      I.event(this.event_category, "skip_buy", "" + this.bundle.id);
      this.set_loading(true);
      return $.ajax({
        url: this.download_url(),
        type: "POST",
        xhrFields: {
          withCredentials: true
        },
        data: I.with_csrf(),
        success: function(_this) {
          return function(res) {
            if (res.url) {
              return window.top.location = res.url
            } else {
              _this.set_error("There was an error generating the download URL, please try again.");
              return _this.set_loading(false)
            }
          }
        }(this)
      })
    };
    BundleBuyForm.prototype.setup_gamelist = function() {
      this.game_list = this.el.find(".game_list");
      if (!this.game_list.length) {
        return
      }
      this.el.on("keyup blur", ".money_input", function(_this) {
        return function() {
          return _this.update_items()
        }
      }(this));
      this.game_list.on("click", ".inactive", function(_this) {
        return function(e) {
          var min, row;
          I.event(_this.event_category, "pick_game", "" + _this.bundle.id);
          row = $(e.currentTarget);
          min = row.data("min_price");
          if (min) {
            _this.el.trigger("i:show_checkout");
            _this.input.val(I.format_money(min, _this.get_currency()));
            return _this.update_items()
          }
        }
      }(this));
      return this.update_items()
    };
    BundleBuyForm.prototype.update_items = function() {
      var available, count, game, games, header_drop, i, len, min, ref, val;
      if (!((ref = this.game_list) != null ? ref.length : void 0)) {
        return
      }
      val = this.get_value();
      games = this.game_list.find(".game_row");
      count = 0;
      for (i = 0, len = games.length; i < len; i++) {
        game = games[i];
        game = $(game);
        min = game.data("min_price");
        available = !(min && val < min);
        game.toggleClass("inactive", !available);
        if (available) {
          count += 1
        }
      }
      header_drop = this.el.find(".game_list_header_drop")[0];
      if (header_drop) {
        return ReactDOM.render(R.BundleBuyForm.AvailableItems({
          tiers: this.bundle.tiers,
          group_noun: this.bundle.group_noun,
          price: val,
          currency: this.get_currency()
        }), header_drop)
      }
    };
    BundleBuyForm.prototype.is_valid = function() {
      var formatted, value;
      value = this.get_value();
      if (value < this.bundle.actual_price) {
        formatted = I.format_money(this.bundle.actual_price, this.get_currency());
        this.set_error("You must pay at least " + formatted + ".");
        return false
      }
      if (!BundleBuyForm.__super__.is_valid.apply(this, arguments)) {
        return
      }
      return true
    };
    return BundleBuyForm
  }(I.BaseBuyForm);
  I.BuyPopup = function(superClass) {
    extend(BuyPopup, superClass);

    function BuyPopup() {
      BuyPopup.__super__.constructor.apply(this, arguments);
      this.check_height();
      this.pay_in_popup = false
    }
    BuyPopup.prototype.check_height = function() {
      var missing_y, padding, win;
      padding = 32;
      win = $(window);
      missing_y = $(document.body).height() + padding - $(window).height();
      if (missing_y > 0) {
        return window.resizeTo(window.outerWidth, window.outerHeight + missing_y)
      }
    };
    return BuyPopup
  }(I.BuyForm);
  I.BillingAddressForm = function() {
    function BillingAddressForm(el) {
      this.check_valid = bind(this.check_valid, this);
      var country, input;
      this.el = $(el);
      this.el.data("object", this);
      country = this.el.find("[data-country_value]");
      if (country.length) {
        input = country.find("select");
        input.find("[value='" + country.data("country_value") + "']").prop("selected", true)
      }
    }
    BillingAddressForm.prototype.check_valid = function() {
      var i, input, len, pat, pattern, ref, val, valid;
      ref = this.el.find("input[required]");
      for (i = 0, len = ref.length; i < len; i++) {
        input = ref[i];
        input = $(input);
        val = input.val();
        input.toggleClass("has_error", !!val.match(/^\s*$/));
        if (pattern = input.attr("pattern")) {
          pat = new RegExp("^" + pattern + "$");
          input.toggleClass("has_error", !val.match(pat))
        }
      }
      valid = this.el.find(".has_error").length === 0;
      this.el.toggleClass("has_errors", !valid);
      return valid
    };
    return BillingAddressForm
  }()
}).call(this);
(function() {
  I.GameCarousel = function() {
    GameCarousel.prototype.edge_threshold = 5;
    GameCarousel.prototype.margin = 20;
    GameCarousel.prototype.inner_padding = 10;
    GameCarousel.prototype.paddle_margin_bottom = 30;
    GameCarousel.prototype.cell_class = ".game_cell";

    function GameCarousel(el, opts) {
      this.el = $(el);
      $.extend(this, opts);
      this.scroll_outer = this.el.find(".scrolling_outer");
      this.scroll_inner = this.el.find(".scrolling_inner");
      this.paddles = this.el.find(".paddle_next, .paddle_prev");
      if (I.is_mobile()) {
        this.el.find(".scrollbar_outer").remove();
        this.paddles.remove()
      } else {
        this.setup_scrollbar()
      }
      new I.GameCells(this.el);
      this.el.dispatch("click", {
        paddle_next: function(_this) {
          return function(btn) {
            _this.scroll_to(_this.cell_offset(_this.current_cell() + 3));
            return btn.trigger("i:track_link")
          }
        }(this),
        paddle_prev: function(_this) {
          return function(btn) {
            _this.scroll_to(_this.cell_offset(_this.current_cell() - 3));
            return btn.trigger("i:track_link")
          }
        }(this)
      });
      this.update_height();
      $(window).on("resize", _.debounce(function(_this) {
        return function() {
          return _this.update_scrollbar()
        }
      }(this), 100));
      this.el.on("i:carousel:update_scrollbar", function(_this) {
        return function() {
          return _this.update_scrollbar()
        }
      }(this));
      _.defer(function(_this) {
        return function() {
          _this.el.addClass("ready");
          return _this.update_height()
        }
      }(this))
    }
    GameCarousel.prototype.tallest_child = function() {
      var c, h, i, j, len, ref, tallest, tallest_height;
      tallest = null;
      tallest_height = null;
      ref = this.scroll_inner.children();
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        c = ref[i];
        c = $(c);
        if (tallest) {
          h = c.outerHeight(true);
          if (h > tallest_height) {
            tallest = c;
            tallest_height = h
          }
        } else {
          tallest = c;
          tallest_height = c.outerHeight(true)
        }
      }
      return tallest
    };
    GameCarousel.prototype.update_height = function() {
      var inner_height, tallest_child;
      tallest_child = this.tallest_child();
      inner_height = tallest_child.outerHeight(true);
      inner_height += this.inner_padding * 2;
      this.scroll_outer.css({
        height: inner_height + "px"
      });
      this.paddles.css({
        height: inner_height - this.paddle_margin_bottom + "px"
      });
      return this.update_scrollbar()
    };
    GameCarousel.prototype.setup_scrollbar = function() {
      this.have_scrollbar = true;
      this.scrollbar_outer = this.el.find(".scrollbar_outer");
      this.scrollbar_inner = this.el.find(".scrollbar_inner");
      this.scroll_inner.on("scroll", function(_this) {
        return function() {
          return _this.update_scrollbar()
        }
      }(this));
      this.scrollbar_inner.draggable({
        move: function(_this) {
          return function(dx, dy) {
            if (!_this.unit_scroll) {
              return
            }
            return _this.scroll_inner[0].scrollLeft += dx * _this.unit_scroll
          }
        }(this)
      });
      return this.update_scrollbar()
    };
    GameCarousel.prototype.current_cell = function() {
      var cell, cells, half, i, j, len;
      cells = this.el.find(this.cell_class);
      half = Math.floor(cells.width() / 2);
      for (i = j = 0, len = cells.length; j < len; i = ++j) {
        cell = cells[i];
        if ($(cell).position().left + half >= 0) {
          return i
        }
      }
      return 0
    };
    GameCarousel.prototype.cell_offset = function(n) {
      var el, max, offset;
      n = Math.max(0, n);
      el = this.el.find(this.cell_class + ":eq(" + n + ")");
      max = this.max_scroll();
      offset = el.length ? el.position().left + this.scroll_pos() - this.margin : max;
      return Math.min(offset, max)
    };
    GameCarousel.prototype.scroll_to = function(pos) {
      var current_pos, delta;
      if (this.scroll_inner.is(":animated")) {
        return
      }
      current_pos = this.scroll_pos();
      delta = Math.abs(current_pos - pos);
      return this.scroll_inner.animate({
        scrollLeft: pos
      }, delta / 2)
    };
    GameCarousel.prototype.scroll_pos = function() {
      return this.scroll_inner[0].scrollLeft
    };
    GameCarousel.prototype.max_scroll = function() {
      return this.scroll_inner[0].scrollWidth - this.scroll_outer.innerWidth()
    };
    GameCarousel.prototype.update_scrollbar = function() {
      var has_scrollbar, inner_width, outer_width, scroll_pos;
      if (!this.have_scrollbar) {
        return
      }
      outer_width = this.scroll_outer.innerWidth();
      inner_width = this.scroll_inner[0].scrollWidth;
      has_scrollbar = inner_width - outer_width > this.edge_threshold;
      this.el.toggleClass("no_scrollbar", !has_scrollbar);
      if (has_scrollbar) {
        scroll_pos = this.scroll_pos();
        this.scrollbar_inner.css({
          width: 100 * outer_width / inner_width + "%",
          left: 100 * scroll_pos / inner_width + "%"
        });
        this.unit_scroll = inner_width / this.scroll_outer.width();
        this.el.toggleClass("on_left", scroll_pos <= this.edge_threshold);
        return this.el.toggleClass("on_right", scroll_pos >= this.max_scroll() - this.edge_threshold)
      } else {
        return this.el.removeClass("on_left on_right")
      }
    };
    return GameCarousel
  }()
}).call(this);
(function() {
  var _hex_piece, hex_color, hsl_to_rgb, luma, mix_color, parse_color, parse_color_safe, readable_text_color, rgb_helper, rgb_to_hsl, rgb_to_yuv, scale_luma, sub_color, sub_color2, yuv_to_rgb, slice = [].slice;
  rgb_helper = function(comp, temp1, temp2) {
    if (comp < 0) {
      comp += 1
    } else if (comp > 1) {
      comp -= 1
    }
    if (6 * comp < 1) {
      return temp1 + (temp2 - temp1) * 6 * comp
    } else if (2 * comp < 1) {
      return temp2
    } else if (3 * comp < 2) {
      return temp1 + (temp2 - temp1) * (2 / 3 - comp) * 6
    } else {
      return temp1
    }
  };
  hsl_to_rgb = function(h, s, l) {
    var b, g, r, temp1, temp2;
    h = h / 360;
    s = s / 100;
    l = l / 100;
    if (s === 0) {
      r = l;
      g = l;
      b = l
    } else {
      temp2 = l < .5 ? l * (1 + s) : l + s - l * s;
      temp1 = 2 * l - temp2;
      r = rgb_helper(h + 1 / 3, temp1, temp2);
      g = rgb_helper(h, temp1, temp2);
      b = rgb_helper(h - 1 / 3, temp1, temp2)
    }
    return [r * 255, g * 255, b * 255]
  };
  rgb_to_hsl = function(r, g, b) {
    var h, l, max, min, s;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    s = 0;
    h = 0;
    l = (min + max) / 2;
    if (min !== max) {
      s = l < .5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
      h = function() {
        switch (max) {
          case r:
            return (g - b) / (max - min);
          case g:
            return 2 + (b - r) / (max - min);
          case b:
            return 4 + (r - g) / (max - min)
        }
      }()
    }
    if (h < 0) {
      h += 6
    }
    return [h * 60, s * 100, l * 100]
  };
  parse_color = function() {
    var _, b, g, hex, hexhex, m, r, rest, six, str, three;
    str = arguments[0], rest = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    hex = "[a-fA-f0-9]";
    hexhex = hex + hex;
    three = "^#(" + hex + ")(" + hex + ")(" + hex + ")$";
    six = "^#(" + hexhex + ")(" + hexhex + ")(" + hexhex + ")$";
    m = str.match(new RegExp(three));
    if (m) {
      _ = m[0], r = m[1], g = m[2], b = m[3];
      r += r;
      g += g;
      b += b
    } else {
      m = str.match(new RegExp(six));
      if (!m) {
        return null
      }
      _ = m[0], r = m[1], g = m[2], b = m[3]
    }
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
  };
  parse_color_safe = function() {
    var color;
    color = parse_color.apply(null, arguments);
    return color || [0, 0, 0]
  };
  _hex_piece = function(i) {
    var hex;
    hex = Math.floor(i).toString(16);
    if (hex.length === 1) {
      return "0" + hex
    } else {
      return hex
    }
  };
  hex_color = function(r, g, b) {
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return "#" + _hex_piece(r) + _hex_piece(g) + _hex_piece(b)
  };
  sub_color = function(color, delta, sat_mul) {
    var h, l, new_l, ref, s;
    if (delta == null) {
      delta = 15
    }
    if (sat_mul == null) {
      sat_mul = .8
    }
    ref = rgb_to_hsl.apply(null, parse_color_safe(color)), h = ref[0], s = ref[1], l = ref[2];
    new_l = l > 50 ? l - delta : l + delta;
    new_l = Math.max(0, Math.min(100, new_l));
    return hex_color.apply(null, hsl_to_rgb(h, s * sat_mul, new_l))
  };
  luma = function(r, g, b) {
    return (.299 * r + .587 * g + .114 * b) / 255
  };
  rgb_to_yuv = function(r, g, b) {
    var u, v, y;
    y = .299 * r + .587 * g + .114 * b;
    u = (b - y) * .565;
    v = (r - y) * .713;
    return [y, u, v]
  };
  yuv_to_rgb = function(y, u, v) {
    var b, g, r;
    r = y + 1.403 * v;
    g = y - .344 * u - .714 * v;
    b = y + 1.77 * u;
    return [r, g, b]
  };
  scale_luma = function(r, g, b, p) {
    var ref, u, v, y;
    if (p == null) {
      p = .1
    }
    ref = rgb_to_yuv(r, g, b), y = ref[0], u = ref[1], v = ref[2];
    if (p < 0) {
      y += p * y
    } else {
      y += p * (255 - y)
    }
    return yuv_to_rgb(y, u, v)
  };
  readable_text_color = function(r, g, b) {
    var h, l, ref, ref1, s;
    if (typeof r === "string") {
      ref = parse_color_safe(r), r = ref[0], g = ref[1], b = ref[2]
    }
    ref1 = rgb_to_hsl(r, g, b), h = ref1[0], s = ref1[1], l = ref1[2];
    return l >= 75 && "#000000" || "#ffffff"
  };
  sub_color2 = function(color, delta, threshold) {
    var b, g, l, r, ref;
    if (delta == null) {
      delta = .15
    }
    if (threshold == null) {
      threshold = .5
    }
    ref = parse_color_safe(color), r = ref[0], g = ref[1], b = ref[2];
    l = luma(r, g, b);
    if (l < threshold) {
      return hex_color.apply(null, scale_luma(r, g, b, delta))
    } else {
      return hex_color.apply(null, scale_luma(r, g, b, -delta))
    }
  };
  mix_color = function(a, b, amount) {
    var amount_i, b1, b2, g1, g2, r1, r2, ref, ref1;
    if (amount === 1) {
      return a
    }
    if (amount === 0) {
      return b
    }
    ref = parse_color_safe(a), r1 = ref[0], g1 = ref[1], b1 = ref[2];
    ref1 = parse_color_safe(b), r2 = ref1[0], g2 = ref1[1], b2 = ref1[2];
    amount_i = 1 - amount;
    return hex_color(r1 * amount + r2 * amount_i, g1 * amount + g2 * amount_i, b1 * amount + b2 * amount_i)
  };
  I.Color = {
    hsl_to_rgb: hsl_to_rgb,
    rgb_to_hsl: rgb_to_hsl,
    parse_color: parse_color,
    parse_color_safe: parse_color_safe,
    hex_color: hex_color,
    sub_color: sub_color,
    luma: luma,
    rgb_to_yuv: rgb_to_yuv,
    yuv_to_rgb: yuv_to_rgb,
    scale_luma: scale_luma,
    readable_text_color: readable_text_color,
    sub_color2: sub_color2,
    mix_color: mix_color
  }
}).call(this);
(function() {
  I.ContentWarning = function() {
    function ContentWarning(el, opts) {
      this.opts = opts;
      this.el = $(el);
      this.setup_forms()
    }
    ContentWarning.prototype.setup_forms = function() {
      var form;
      form = this.el.find("form");
      return form.remote_submit(function(_this) {
        return function(res) {
          if (res.errors) {
            form.set_form_errors(res.errors);
            return
          }
          _this.el.addClass("hidden");
          setTimeout(function() {
            return _this.el.remove()
          }, 300);
          return form.set_form_errors([])
        }
      }(this))
    };
    return ContentWarning
  }()
}).call(this);
(function() {
  var slice = [].slice;
  I.ConversionTracker = function() {
    function ConversionTracker() {}
    ConversionTracker.types = {
      impression: 1,
      click: 2,
      purchase: 3,
      download: 4,
      join: 5
    };
    ConversionTracker.buffer = [];
    ConversionTracker.find_click = function(suffix) {
      var ca, ev, i, item, len, pattern;
      pattern = new RegExp(":" + suffix + "$");
      ca = this.get_cookie();
      for (i = 0, len = ca.length; i < len; i++) {
        item = ca[i];
        ev = _.isArray(item) ? item[0] : item;
        if (ev.match(pattern)) {
          return item
        }
      }
    };
    ConversionTracker.strip_click = function(suffix) {
      var ca, ev, item, new_ca, pattern, removed;
      pattern = new RegExp(":" + suffix + "$");
      ca = this.get_cookie();
      removed = 0;
      new_ca = function() {
        var i, len, results;
        results = [];
        for (i = 0, len = ca.length; i < len; i++) {
          item = ca[i];
          ev = _.isArray(item) ? item[0] : item;
          if (ev.match(pattern)) {
            removed += 1;
            continue
          }
          results.push(item)
        }
        return results
      }();
      if (new_ca.length === ca.length) {
        return 0
      }
      this.write_cookie(new_ca);
      return removed
    };
    ConversionTracker.after_click_action = function(type, suffix) {
      var click, msg, original_msg, split_tests;
      click = this.find_click(suffix);
      if (!click) {
        return
      }
      split_tests = null;
      original_msg = _.isArray(click) ? (split_tests = click[1], click[0]) : click;
      msg = original_msg.replace(/^\d+/, this.types[type]);
      this.strip_click(suffix);
      this.push(msg, split_tests);
      return true
    };
    ConversionTracker.download = function(suffix) {
      return this.after_click_action("download", suffix)
    };
    ConversionTracker.purchase = function(suffix) {
      return this.after_click_action("purchase", suffix)
    };
    ConversionTracker.join = function(suffix) {
      return this.after_click_action("join", suffix)
    };
    ConversionTracker.click = function(suffix) {
      var c, ca, msg, msg_with_split, other_msg, splits;
      msg = this.types.click + ":" + suffix;
      msg_with_split = (splits = this.get_active_splits()) ? [msg, splits] : msg;
      this.push(msg);
      try {
        ca = function() {
          var i, len, ref, results;
          ref = this.get_cookie();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            c = ref[i];
            other_msg = _.isArray(c) ? c[0] : c;
            if (other_msg === msg) {
              continue
            }
            results.push(c)
          }
          return results
        }.call(this);
        ca.push(msg_with_split);
        while (ca.length > 100) {
          ca.shift()
        }
        this.write_cookie(ca);
        return true
      } catch (error) {}
    };
    ConversionTracker.flush_later = function() {
      this.flush_later = _.throttle(this.flush_now, 2e3, {
        leading: false
      });
      $(window).on("beforeunload", function(_this) {
        return function() {
          _this.flush_now();
          return void 0
        }
      }(this));
      return this.flush_later()
    };
    ConversionTracker.encode_buffer = function(buffer) {
      var _, ca, i, id, last_obj_type, last_source, last_type, len, obj_id, obj_type, out, p, ref, source, type;
      if (buffer == null) {
        buffer = slice.call(this.buffer)
      }
      buffer.sort();
      out = [];
      last_type = null;
      last_source = null;
      last_obj_type = null;
      for (i = 0, len = buffer.length; i < len; i++) {
        ca = buffer[i];
        ref = ca.match(/^(\d+):(\d+):(\d+):(\d+)$/), _ = ref[0], type = ref[1], source = ref[2], obj_type = ref[3], obj_id = ref[4];
        if (!type) {
          continue
        }
        if (type !== last_type) {
          out.push("t" + type);
          last_type = type
        }
        if (source !== last_source) {
          out.push("s" + source);
          last_source = source
        }
        if (obj_type !== last_obj_type) {
          out.push("o" + obj_type);
          last_obj_type = obj_type
        }
        id = (+obj_id).toString(36);
        p = String.fromCharCode("A".charCodeAt(0) + id.length);
        out.push("" + p + id)
      }
      return out.join("")
    };
    ConversionTracker.get_active_splits = function() {
      return I.active_splits
    };
    ConversionTracker.flush_url = function(split_tests) {
      var params, splits, x;
      x = this.encode_buffer();
      params = [{
        name: "x",
        value: x
      }];
      if (splits = split_tests || this.get_active_splits()) {
        params.push({
          name: "s",
          value: splits.join(",")
        })
      }
      return I.root_url("ca.html") + "?" + $.param(params)
    };
    ConversionTracker.flush_now_beacon = function(split_tests) {
      var url;
      if (navigator.sendBeacon == null) {
        return this.flush_now(split_tests)
      }
      if (this.buffer.length) {
        if (I.in_dev) {
          console.debug.apply(console, ["ca(beacon)"].concat(slice.call(_.compact([this.buffer, split_tests]))))
        }
        url = this.flush_url(split_tests);
        if (navigator.sendBeacon(url)) {
          this.buffer = []
        } else {
          return this.flush_now()
        }
      }
      return $.when()
    };
    ConversionTracker.flush_now = function(split_tests) {
      var url;
      if (!this.buffer.length) {
        return $.when()
      }
      if (I.in_dev) {
        console.debug.apply(console, ["ca"].concat(slice.call(_.compact([this.buffer, split_tests]))))
      }
      url = this.flush_url(split_tests);
      this.buffer = [];
      return $.Deferred(function(_this) {
        return function(d) {
          var done, img;
          img = new Image;
          img.src = url;
          done = function() {
            return d.resolve()
          };
          img.onerror = done;
          return img.onload = done
        }
      }(this))
    };
    ConversionTracker.push = function(msg, split_tests) {
      var v;
      this.buffer = function() {
        var i, len, ref, results;
        ref = this.buffer;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          v = ref[i];
          if (v !== msg) {
            results.push(v)
          }
        }
        return results
      }.call(this);
      this.buffer.push(msg);
      if (this.buffer.length > 50 || split_tests) {
        return this.flush_now(split_tests)
      } else {
        return this.flush_later()
      }
    };
    return ConversionTracker
  }()
}).call(this);
(function() {
  var bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments)
      }
    },
    extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.Countdown = function() {
    Countdown.prototype.max_blocks = 4;

    function Countdown(el, date, opts) {
      this.date = date;
      this.opts = opts != null ? opts : {};
      if (this.opts.max_blocks) {
        this.max_blocks = this.opts.max_blocks
      }
      this.el = $(el);
      this.update_countdown();
      window.setInterval(function(_this) {
        return function() {
          return _this.update_countdown()
        }
      }(this), 1e3)
    }
    Countdown.prototype.update_countdown = function() {
      var dur, hidable, i, j, label, label_text, len, len1, p, p_el, parts, ref, remaining, results, should_hide, time, tuples, val;
      parts = ["years", "months", "days", "hours", "minutes", "seconds"];
      dur = moment.duration(this.date.diff(moment()));
      hidable = true;
      tuples = function() {
        var i, len, results;
        results = [];
        for (i = 0, len = parts.length; i < len; i++) {
          p = parts[i];
          val = dur[p]();
          if (val === 0 && hidable) {
            continue
          }
          if (val > 0) {
            hidable = false
          }
          results.push([p, val])
        }
        return results
      }();
      tuples = tuples.slice(0, this.max_blocks);
      remaining = {};
      for (i = 0, len = tuples.length; i < len; i++) {
        ref = tuples[i], p = ref[0], time = ref[1];
        remaining[p] = time
      }
      results = [];
      for (j = 0, len1 = parts.length; j < len1; j++) {
        p = parts[j];
        p_el = this.el.find("[data-name='" + p + "']");
        val = remaining[p] || 0;
        should_hide = remaining[p] == null;
        if (!should_hide) {
          label = p_el.find(".block_label");
          label_text = label.text();
          label.text(label_text.replace(/s$/, "") + (val === 1 ? "" : "s"))
        }
        results.push(p_el.toggleClass("hidden", should_hide).find(".block_value").text(val))
      }
      return results
    };
    return Countdown
  }();
  I.TimestampCountdown = function(superClass) {
    extend(TimestampCountdown, superClass);

    function TimestampCountdown() {
      this.update_countdown = bind(this.update_countdown, this);
      return TimestampCountdown.__super__.constructor.apply(this, arguments)
    }
    TimestampCountdown.prototype.update_countdown = function() {
      var dur;
      dur = moment.duration(this.date.diff(moment()));
      return this.el.text(dur.humanize())
    };
    return TimestampCountdown
  }(I.Countdown)
}).call(this);
(function() {
  $.fn.draggable = function(opts) {
    var body, drag_move, drag_start, drag_stop, html, mouse_x, mouse_y, touch_enabled;
    if (opts == null) {
      opts = {}
    }
    touch_enabled = "ontouchstart" in document;
    body = $(document.body);
    html = $("html");
    mouse_x = 0;
    mouse_y = 0;
    drag_stop = function(_this) {
      return function(e) {
        body.removeClass("dragging");
        _this.removeClass("dragging");
        html.off("mousemove touchmove", drag_move);
        return typeof opts.stop === "function" ? opts.stop() : void 0
      }
    }(this);
    drag_move = function(_this) {
      return function(e, _x, _y) {
        var dx, dy;
        dx = _x - mouse_x;
        dy = _y - mouse_y;
        mouse_x += dx;
        mouse_y += dy;
        return typeof opts.move === "function" ? opts.move(dx, dy) : void 0
      }
    }(this);
    drag_start = function(_this) {
      return function(e, _x, _y) {
        if (body.is(".dragging")) {
          return
        }
        if (typeof opts.skip_drag === "function" ? opts.skip_drag(e) : void 0) {
          return
        }
        body.addClass("dragging");
        _this.addClass("dragging");
        mouse_x = _x;
        mouse_y = _y;
        if (typeof opts.start === "function") {
          opts.start()
        }
        return true
      }
    }(this);
    if (touch_enabled) {
      return this.on("touchstart", function(_this) {
        return function(e) {
          var ref, x, y;
          ref = e.originalEvent.targetTouches[0], x = ref.pageX, y = ref.pageY;
          if (drag_start(e, x, y)) {
            html.one("touchend", drag_stop);
            drag_move = function(move) {
              return function(e) {
                var ref1;
                ref1 = e.originalEvent.targetTouches[0], x = ref1.pageX, y = ref1.pageY;
                return move(e, x, y)
              }
            }(drag_move);
            html.on("touchmove", drag_move)
          }
          return void 0
        }
      }(this))
    } else {
      return this.on("mousedown", function(_this) {
        return function(e) {
          if (drag_start(e, e.pageX, e.pageY)) {
            html.one("mouseup", drag_stop);
            drag_move = function(move) {
              return function(e) {
                return move(e, e.pageX, e.pageY)
              }
            }(drag_move);
            return html.on("mousemove", drag_move)
          }
        }
      }(this))
    }
  }
}).call(this);
(function() {
  var extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.FeedbackLightbox = function(superClass) {
    extend(FeedbackLightbox, superClass);

    function FeedbackLightbox() {
      return FeedbackLightbox.__super__.constructor.apply(this, arguments)
    }
    FeedbackLightbox.prototype.init = function() {
      return this.el.find("form").remote_submit(function(_this) {
        return function(res) {
          if (res.errors) {
            alert(res.errors.join(", "));
            return
          }
          return _this.el.addClass("is_complete")
        }
      }(this))
    };
    return FeedbackLightbox
  }(I.Lightbox);
  I.FeedbackWidget = function() {
    function FeedbackWidget(el) {
      this.el = $(el);
      this.el.on("click", function(_this) {
        return function(e) {
          var url;
          url = $(e.target).data("url") + "?" + $.param({
            url: window.location.href
          });
          return I.Lightbox.open_remote(url, I.FeedbackLightbox)
        }
      }(this))
    }
    return FeedbackWidget
  }()
}).call(this);
(function() {
  I.FilterPickers = function() {
    FilterPickers.prototype.label_padding = 10;

    function FilterPickers(el, opts) {
      var all_pickers, hide_all_pickers;
      this.opts = opts != null ? opts : {};
      this.el = $(el);
      all_pickers = this.el.find(".filter_picker_widget");
      if (this.opts.label_padding) {
        this.label_padding = this.opts.label_padding
      }
      hide_all_pickers = function(_this) {
        return function() {
          return all_pickers.removeClass("open popup_visible").find(".filter_options").css({
            marginTop: ""
          })
        }
      }(this);
      $(window).on("click", function(_this) {
        return function(e) {
          if ($(e.target).closest(".filter_picker_widget").length) {} else {
            return hide_all_pickers()
          }
        }
      }(this));
      this.el.on("i:close_filter_pickers", hide_all_pickers);
      this.el.on("click", ".filter_picker_widget .filter_value", function(_this) {
        return function(e) {
          var height, picker, right_space;
          e.preventDefault();
          picker = $(e.currentTarget).closest(".filter_picker_widget");
          picker.trigger("i:track_link");
          all_pickers.not(picker).removeClass("open popup_visible");
          picker.toggleClass("open");
          height = picker.find(".filter_value").height();
          picker.find(".filter_options").css({
            marginTop: height + _this.label_padding * 2,
            minWidth: picker.width() + 30 + "px"
          });
          right_space = $(window).width() - picker.position().left + picker.width();
          picker.toggleClass("popup_left", right_space < 200);
          return _.defer(function() {
            return picker.toggleClass("popup_visible", picker.is(".open"))
          })
        }
      }(this))
    }
    return FilterPickers
  }()
}).call(this);
(function() {
  var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments)
    }
  };
  I.GameGridSizer = function() {
    GameGridSizer.prototype.selector = ".game_grid_widget .game_cell .game_thumb";
    GameGridSizer.prototype.width_selector = ".game_grid_widget .game_cell";
    GameGridSizer.prototype.expected_size = 315;
    GameGridSizer.prototype.aspect_ratio = 315 / 250;
    GameGridSizer.prototype.cell_margin = 20;
    GameGridSizer.prototype.no_right_margin = false;
    GameGridSizer.prototype.min_columns = 1;
    GameGridSizer.prototype.double = false;
    GameGridSizer.sizers = {
      el_width: function() {
        var fraction_el, out, r, ref;
        fraction_el = (ref = this.el[0]) != null ? ref.getBoundingClientRect().width : void 0;
        r = fraction_el - Math.floor(fraction_el);
        out = Math.floor(this.el.width());
        if (r > 0) {
          out -= 1
        }
        return out
      },
      el_rect: function() {
        var ref;
        return Math.floor(((ref = this.el[0]) != null ? ref.getBoundingClientRect().width : void 0) || 0)
      }
    };
    GameGridSizer.initialize = _.once(function() {
      var body, disable_details, enable_details;
      body = $(document.body);
      disable_details = _.debounce(function() {
        return body.addClass("disable_hover")
      }, 200, true);
      enable_details = _.debounce(function() {
        return body.removeClass("disable_hover")
      }, 200);
      return $(window).on("scroll resize", function() {
        disable_details();
        enable_details()
      })
    });

    function GameGridSizer(opts) {
      if (opts == null) {
        opts = {}
      }
      this.available_width = bind(this.available_width, this);
      this.on_size = bind(this.on_size, this);
      $.extend(this, opts);
      this.size_callbacks = [];
      this.constructor.initialize();
      $(window).on("resize", _.debounce(function(_this) {
        return function() {
          return _this.resize_cells()
        }
      }(this), 200));
      this.resize_cells();
      if (!I.in_test) {
        _.defer(function(_this) {
          return function() {
            return _this.resize_cells()
          }
        }(this))
      }
    }
    GameGridSizer.prototype.on_size = function(fn) {
      return this.size_callbacks.push(fn)
    };
    GameGridSizer.prototype.available_width = function() {
      return $(window).width()
    };
    GameGridSizer.prototype.resize_cells = function(expected_width) {
      var callback, css, i, len, new_height, new_width, num_cells, page_width, real_num_cells, real_width, ref, results;
      if (expected_width == null) {
        expected_width = this.expected_size
      }
      real_width = expected_width + this.cell_margin;
      page_width = this.available_width();
      if (this.no_right_margin) {
        page_width += this.cell_margin
      }
      num_cells = page_width / real_width;
      real_num_cells = Math.ceil(num_cells);
      if (real_num_cells < this.min_columns) {
        real_num_cells = this.min_columns
      }
      new_width = page_width / real_num_cells - this.cell_margin;
      new_height = new_width / this.aspect_ratio;
      new_width = Math.floor(new_width);
      new_height = Math.floor(new_height);
      this.cells_per_row = real_num_cells;
      if (this._style) {
        this._style.remove()
      }
      css = this.selector + " {\n  width: " + new_width + "px;\n  height: " + new_height + "px;\n}";
      if (this.no_right_margin && this.width_selector) {
        css += this.width_selector + ":nth-child(" + real_num_cells + "n) {\n  margin-right: 0;\n}"
      }
      if (this.width_selector) {
        css += this.width_selector + " {\n  width: " + new_width + "px;\n}"
      }
      this._style = $("<style type='text/css'>" + css + "</style>").appendTo($("head"));
      ref = this.size_callbacks;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        results.push(callback(this, new_width, new_height))
      }
      return results
    };
    return GameGridSizer
  }();
  I.GameCells = function() {
    function GameCells(el) {
      this.setup_game_tools = bind(this.setup_game_tools, this);
      this.el = $(el);
      this.setup_game_tools();
      this.setup_gifs()
    }
    GameCells.prototype.setup_game_tools = function() {
      return this.el.dispatch("click", {
        add_to_collection_btn: function(_this) {
          return function(btn) {
            I.event("grid", I.page_name(), "add_to_collection");
            if (!I.current_user) {
              return "continue"
            }
            return I.Lightbox.open_remote(btn.attr("href"), I.CollectionLightbox)
          }
        }(this)
      })
    };
    GameCells.prototype.setup_gifs = function() {
      return this.el.on("mouseenter", ".game_cell", function(_this) {
        return function(e) {
          var el, gif_overlay;
          el = $(e.currentTarget);
          if (el.data("grid_hovered")) {
            return
          }
          el.data("grid_hovered", true);
          gif_overlay = el.find(".gif_overlay");
          if (!gif_overlay.length) {
            return
          }
          return gif_overlay.css("background-image", "url(" + gif_overlay.data("gif") + ")")
        }
      }(this))
    };
    return GameCells
  }();
  I.GameGrid = function() {
    function GameGrid(el, opts) {
      var copy_fields, field, i, is_css_grid, len, size_opts;
      if (opts == null) {
        opts = {}
      }
      this.refresh_images = bind(this.refresh_images, this);
      this.add_image_loading = bind(this.add_image_loading, this);
      this.setup_conversion_tracking = bind(this.setup_conversion_tracking, this);
      this.el = $(el);
      $.extend(this, opts);
      this.setup_lazy_images();
      if (this.show_popups !== false) {
        new I.GamePopups(this.el)
      }
      new I.GameCells(this.el);
      is_css_grid = this.el.is(".layout_grid");
      if (!this.sizer && this.sizer !== false && !is_css_grid) {
        copy_fields = ["selector", "width_selector", "expected_size", "min_columns", "cell_margin", "available_width"];
        size_opts = {
          el: this.el,
          available_width: I.GameGridSizer.sizers.el_width
        };
        for (i = 0, len = copy_fields.length; i < len; i++) {
          field = copy_fields[i];
          if (field in opts) {
            size_opts[field] = opts[field]
          }
        }
        this.sizer = new I.GameGridSizer(size_opts);
        this.sizer.on_size(function(_this) {
          return function() {
            _this.el.trigger("i:grid_resize");
            return _this.el.lazy_images()
          }
        }(this))
      }
    }
    GameGrid.prototype.setup_lazy_images = function() {
      return _.defer(function(_this) {
        return function() {
          return _this.add_image_loading()
        }
      }(this))
    };
    GameGrid.prototype.setup_conversion_tracking = function(source) {
      this.el.on("i:impression", function(_this) {
        return function(e) {
          var conversion_el, game_id;
          conversion_el = $(e.target).closest("[data-game_id]");
          game_id = conversion_el.data("game_id");
          if (!game_id) {
            return
          }
          return I.ConversionTracker.push("1:" + source + ":1:" + game_id)
        }
      }(this));
      return this.el.on("i:delegate_tracking", function(_this) {
        return function(e, push) {
          var game_id;
          game_id = $(e.target).closest("[data-game_id]").data("game_id");
          if (!game_id) {
            return
          }
          I.ConversionTracker.click(source + ":1:" + game_id);
          return push(I.ConversionTracker.flush_now())
        }
      }(this))
    };
    GameGrid.prototype.add_image_loading = function() {
      return this.el.lazy_images({
        show_item: function(_this) {
          return function(item) {
            item.trigger("i:impression");
            return item.find(".image_loading").addBack(".image_loading").removeClass("image_loading")
          }
        }(this)
      })
    };
    GameGrid.prototype.refresh_images = function() {
      var base;
      return typeof(base = this.el.data("lazy_images")) === "function" ? base() : void 0
    };
    return GameGrid
  }()
}).call(this);
(function() {
  var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments)
    }
  };
  I.Header = function() {
    Header.prototype.track_category = "header";

    function Header(el) {
      this.setup_browse_menu = bind(this.setup_browse_menu, this);
      this.el = $(el);
      I.tracked_links(this.el, this.track_category, "click");
      this.el.on("click", ".menu_tick", function(_this) {
        return function(e) {
          var body, menu, target;
          if ($(e.target).closest(".drop_menu").length) {
            return
          }
          target = $(e.currentTarget);
          menu = target.closest(".drop_menu_wrap").toggleClass("open");
          body = $(document.body);
          if (menu.is(".open")) {
            target.trigger("i:track_link");
            return body.on("click.drop_menu", function(e) {
              if ($(e.target).closest(menu).length) {
                return
              }
              menu.removeClass("open");
              return body.off("click.drop_menu")
            })
          } else {
            return body.off("click.drop_menu")
          }
        }
      }(this));
      this.setup_browse_menu()
    }
    Header.prototype.setup_browse_menu = function() {
      var browse_button;
      browse_button = this.el.find(".browse_btn");
      this.browse_menu = new I.HoverManager({
        timeout: 750,
        enter_timeout: 100,
        show: function(_this) {
          return function() {
            _this.el.addClass("hover_menu_open");
            browse_button.addClass("open");
            return setTimeout(function() {
              return _this.el.addClass("hover_menu_visible")
            }, 0)
          }
        }(this),
        hide: function(_this) {
          return function() {
            browse_button.removeClass("open");
            return _this.el.removeClass("hover_menu_visible")
          }
        }(this),
        after_fade: function(_this) {
          return function() {
            return _this.el.removeClass("hover_menu_open")
          }
        }(this)
      });
      $(document.body).on("click", function(_this) {
        return function(e) {
          var c;
          c = $(e.target).closest(".browse_btn, .header_dropdown");
          if (c.length) {
            return
          }
          _this.browse_menu.hide()
        }
      }(this));
      return this.el.on("mouseenter mouseleave", ".browse_btn, .header_dropdown", function(_this) {
        return function(e) {
          if (e.type === "mouseenter") {
            return _this.browse_menu.enter()
          } else {
            return _this.browse_menu.leave()
          }
        }
      }(this))
    };
    return Header
  }()
}).call(this);
(function() {
  var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments)
    }
  };
  I.HoverManager = function() {
    HoverManager.prototype.default_opts = {
      timeout: 1e3,
      enter_timeout: 150,
      fade_timeout: 400,
      show: function() {},
      hide: function() {},
      after_fade: function() {}
    };

    function HoverManager(opts) {
      this._clear_enter_timeout = bind(this._clear_enter_timeout, this);
      this._clear_fade_timeout = bind(this._clear_fade_timeout, this);
      this._clear_leave_timeout = bind(this._clear_leave_timeout, this);
      this.opts = $.extend({}, this.default_opts, opts);
      this.open = false
    }
    HoverManager.prototype.enter = function() {
      if (this.enter_timeout) {
        return
      }
      this._clear_leave_timeout();
      this._clear_fade_timeout();
      return this.enter_timeout = window.setTimeout(function(_this) {
        return function() {
          var base;
          delete _this.enter_timeout;
          if (!_this.open) {
            if (typeof(base = _this.opts).show === "function") {
              base.show()
            }
          }
          return _this.open = true
        }
      }(this), this.opts.enter_timeout)
    };
    HoverManager.prototype.leave = function() {
      if (this.leave_timeout) {
        return
      }
      this._clear_enter_timeout();
      return this.leave_timeout = window.setTimeout(function(_this) {
        return function() {
          delete _this.leave_timeout;
          return _this.hide()
        }
      }(this), this.opts.timeout)
    };
    HoverManager.prototype.hide = function() {
      var base;
      this._clear_enter_timeout();
      this._clear_leave_timeout();
      if (this.open) {
        if (typeof(base = this.opts).hide === "function") {
          base.hide()
        }
      }
      this.open = false;
      this.hiding = true;
      return this.fade_timeout = window.setTimeout(function(_this) {
        return function() {
          var base1;
          if (typeof(base1 = _this.opts).after_fade === "function") {
            base1.after_fade()
          }
          return _this.hiding = false
        }
      }(this), this.opts.fade_timeout)
    };
    HoverManager.prototype.show = function() {
      var base;
      return typeof(base = this.opts).show === "function" ? base.show() : void 0
    };
    HoverManager.prototype._clear_leave_timeout = function() {
      if (this.leave_timeout) {
        window.clearTimeout(this.leave_timeout);
        return delete this.leave_timeout
      }
    };
    HoverManager.prototype._clear_fade_timeout = function() {
      if (this.fade_timeout) {
        window.clearTimeout(this.fade_timeout);
        return delete this.fade_timeout
      }
    };
    HoverManager.prototype._clear_enter_timeout = function() {
      if (this.enter_timeout) {
        window.clearTimeout(this.enter_timeout);
        return delete this.enter_timeout
      }
    };
    return HoverManager
  }()
}).call(this);
(function() {
  var render_lightbox;
  render_lightbox = function(props) {
    var abbr, code, details, div, h2, p, pre, summary, table, tbody, td, thead, total_queries, total_time, tr;
    table = ReactDOMFactories.table, thead = ReactDOMFactories.thead, tbody = ReactDOMFactories.tbody, tr = ReactDOMFactories.tr, td = ReactDOMFactories.td, abbr = ReactDOMFactories.abbr, details = ReactDOMFactories.details, summary = ReactDOMFactories.summary, div = ReactDOMFactories.div, h2 = ReactDOMFactories.h2, code = ReactDOMFactories.code, pre = ReactDOMFactories.pre, p = ReactDOMFactories.p;
    total_queries = props.query_log.length;
    total_time = props.query_log.reduce(function(v, row) {
      return v + row[1]
    }, 0);
    return R.Lightbox({
      className: "compact perf_query_log_widget",
      style: {
        width: "100%",
        maxWidth: "800px"
      }
    }, h2({}, "Query log"), p({
      style: {
        margin: "0 10px"
      }
    }, "Queries: ", code({}, total_queries), ", Time: ", code({}, (total_time * 1e3).toFixed(2) + "ms")), div({
      style: {
        padding: "10px"
      }
    }, table({
      className: "nice_table",
      style: {
        width: "100%"
      }
    }, thead({}, tr({}, td({}, "Query"), td({}, "Timing"))), tbody({}, props.query_log.map(function(_this) {
      return function(arg, idx) {
        var query, time_ms, time_sec;
        query = arg[0], time_sec = arg[1];
        time_ms = time_sec * 1e3;
        return tr({
          key: idx
        }, td({}, details({}, summary({}, code({
          style: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
            maxWidth: "600px"
          }
        }, query)), pre({
          style: {
            whiteSpace: "pre-wrap"
          }
        }, query))), td({}, code({
          style: {
            fontWeight: time_ms > 10 ? "bold" : void 0,
            color: time_ms > 100 ? "white" : time_ms > 50 ? "red" : void 0,
            backgroundColor: time_ms > 100 ? "red" : void 0
          }
        }, time_ms.toFixed(2) + "ms")))
      }
    }(this))))))
  };
  I.PerfPanel = function() {
    function PerfPanel(data) {
      var tpl;
      data.layout_time || (data.layout_time = 0);
      data.view_time || (data.view_time = 0);
      data.db_time || (data.db_time = 0);
      data.db_count || (data.db_count = 0);
      tpl = _.template('<div class="perf_panel">\n  <div class="stat_row">\n    <strong>Queries:</strong> {{ db_count }}\n  </div>\n\n  <div class="stat_row">\n    <strong>Query time:</strong> {{ Math.floor(db_time * 1000) }}ms\n  </div>\n\n  <div class="stat_row">\n    <strong>View time:</strong> {{ Math.floor((view_time + layout_time) * 1000) }}ms\n  </div>\n\n  <div class="stat_row">\n    <strong>Rest:</strong> {{ Math.floor((total_time - (view_time + layout_time + db_time)) * 1000) }}ms\n  </div>\n\n</div>');
      this.data = data;
      this.el = $(tpl(data)).appendTo(document.body);
      this.el.on("click", function(_this) {
        return function() {
          return _this.render_queries()
        }
      }(this))
    }
    PerfPanel.prototype.render_queries = function() {
      var query, tbl, time_sec;
      if (!this.data.query_log) {
        return
      }
      tbl = function() {
        var i, len, ref, ref1, results;
        ref = this.data.query_log;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], query = ref1[0], time_sec = ref1[1];
          results.push({
            query: query,
            time: time_sec * 1e3
          })
        }
        return results
      }.call(this);
      console.table(tbl);
      return I.add_react().done(function(_this) {
        return function() {
          if (typeof R !== "undefined" && R !== null ? R.Lightbox : void 0) {
            return I.Lightbox.open(render_lightbox({
              query_log: _this.data.query_log
            }))
          }
        }
      }(this))
    };
    return PerfPanel
  }()
}).call(this);
(function() {
  var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments)
    }
  };
  I.GamePopups = function() {
    GamePopups.prototype.trigger_selector = ".game_thumb";
    GamePopups.prototype.popup_selector = ".popup_details";
    GamePopups.prototype.hover_delay = 250;
    GamePopups.prototype.close_timeout = 200;
    GamePopups.prototype.x_offset = 0;

    function GamePopups(el, opts) {
      var body;
      if (opts == null) {
        opts = {}
      }
      this.deferred_for_el = bind(this.deferred_for_el, this);
      if (I.is_mobile()) {
        return
      }
      this.el = $(el);
      $.extend(this, opts);
      body = $(document.body);
      this.el.on("mouseenter mouseleave", this.trigger_selector, function(_this) {
        return function(e) {
          el = $(e.currentTarget);
          if (el.closest(".jam_cell").length) {
            return
          }
          if (el.closest(".disable_hover").length) {
            return
          }
          if (e.type === "mouseenter") {
            return _this.enter(el)
          } else {
            return _this.leave(el)
          }
        }
      }(this));
      body.on("i:hide_popups", function(_this) {
        return function(e, hm) {
          return _this.close_popup()
        }
      }(this));
      body.on("i:hide_other_popups", function(_this) {
        return function(e, hm) {
          if (hm === _this) {
            return
          }
          return _this.close_popup()
        }
      }(this))
    }
    GamePopups.prototype.deferred_for_el = function(el) {
      var defer, game_id, popup_url;
      defer = el.data("i:popup_defer");
      if (!defer) {
        game_id = el.closest("[data-game_id]").data("game_id");
        defer = $.Deferred();
        el.data("i:popup_defer", defer);
        if (!game_id) {
          return
        }
        popup_url = I.subdomain ? "/-/game/popup/" + game_id : "/game/popup/" + game_id;
        $.get(popup_url, function(_this) {
          return function(popup_html) {
            var popup;
            if (_.isObject(popup_html) && popup_html.errors) {
              return
            }
            popup = $(popup_html);
            popup.data("object_id", game_id);
            I.tracked_links(popup, "popups", I.page_name(), "click");
            popup.find("a").on("click", function() {
              var trigger;
              if (trigger = popup.data("trigger_el")) {
                return trigger.trigger("i:track_link")
              }
            });
            return defer.resolve(popup)
          }
        }(this))
      }
      return defer
    };
    GamePopups.prototype.enter = function(el) {
      var fast, slow;
      el.data("i:inside", true);
      slow = _.debounce(function(_this) {
        return function() {
          if (!el.data("i:inside")) {
            return
          }
          return _this.deferred_for_el(el).then(function(popup_el) {
            return _this.show_popup(el, popup_el)
          })
        }
      }(this), this.hover_delay);
      fast = _.debounce(function(_this) {
        return function() {
          var start;
          if (!el.data("i:inside")) {
            return
          }
          start = new Date;
          return _this.deferred_for_el(el)
        }
      }(this), this.hover_delay / 2);
      return el.on("mousemove.hover_manager", function() {
        slow();
        return fast()
      })
    };
    GamePopups.prototype.leave = function(el) {
      el.data("i:inside", false);
      return el.off("mousemove.hover_manager")
    };
    GamePopups.prototype.show_popup = function(el, popup_el) {
      var base, fn, i, j, len, ref, s, screenshots;
      if (!(typeof(base = document.body).contains === "function" ? base.contains(el[0]) : void 0)) {
        return
      }
      if (this.current_popup === popup_el) {
        return
      }
      this.el.trigger("i:hide_other_popups", [this]);
      if ((ref = this.current_popup) != null) {
        ref.stop().remove()
      }
      this.current_popup = popup_el.css({
        left: "0px",
        top: "0px"
      }).removeClass("visible");
      screenshots = popup_el.find(".popup_screenshot").removeClass("visible");
      $(document.body).append(popup_el);
      this.position_popup(el, popup_el);
      _.defer(function(_this) {
        return function() {
          return popup_el.addClass("visible")
        }
      }(this));
      popup_el.data("trigger_el", el);
      fn = function(_this) {
        return function(s) {
          return setTimeout(function() {
            return s.addClass("visible")
          }, i * 100)
        }
      }(this);
      for (i = j = 0, len = screenshots.length; j < len; i = ++j) {
        s = screenshots[i];
        fn($(s))
      }
      popup_el.hide().css({
        opacity: ""
      }).fadeIn("fast");
      return this.watch_for_popup_close()
    };
    GamePopups.prototype.watch_for_popup_close = function() {
      var close_timeout, target_selector;
      target_selector = this.trigger_selector + ", " + this.popup_selector;
      close_timeout = null;
      $(document.body).on("click.hover_manager", function(_this) {
        return function(e) {
          var target;
          target = $(e.target);
          if (target.closest(target_selector).length) {
            return
          }
          return _this.close_popup()
        }
      }(this));
      return $(window).on("mousemove.hover_manager", _.throttle(function(_this) {
        return function(e) {
          var inside;
          inside = $(e.target).closest(target_selector);
          if (inside.length) {
            if (close_timeout) {
              window.clearTimeout(close_timeout);
              close_timeout = null
            }
            return
          }
          if (!close_timeout) {
            return close_timeout = window.setTimeout(function() {
              return _this.close_popup()
            }, _this.close_timeout)
          }
        }
      }(this), 50))
    };
    GamePopups.prototype.position_popup = function(el, popup) {
      var height, left, offset, target_height, target_width, top, width;
      offset = el.offset();
      width = popup.outerWidth(true);
      height = popup.outerHeight(true);
      popup.removeClass("on_right");
      target_height = el.outerHeight();
      target_width = el.outerWidth();
      top = offset.top + (target_height - height) / 2;
      left = offset.left - width;
      if (left < 0) {
        left = offset.left + target_width;
        left += this.x_offset;
        popup.addClass("on_right")
      } else {
        left -= this.x_offset
      }
      return popup.css({
        top: Math.floor(top) + "px",
        left: Math.floor(left) + "px"
      })
    };
    GamePopups.prototype.close_popup = function() {
      var ref;
      $(window).off("mousemove.hover_manager");
      $(document.body).off("click.hover_manager");
      if ((ref = this.current_popup) != null) {
        ref.stop(true).remove()
      }
      return this.current_popup = null
    };
    return GamePopups
  }();
  I.GamePopup = function() {
    function GamePopup(el) {
      this.el = $(el);
      this.el.dispatch("click", {
        watch_trailer_btn: function(btn) {
          I.event("grid", I.page_name(), "watch_trailer");
          return I.Lightbox.open_remote(btn.data("lightbox_url"))
        }
      })
    }
    return GamePopup
  }();
  I.WatchTrailerLightbox = function() {
    function WatchTrailerLightbox(el) {
      this.el = $(el);
      this.el.dispatch("click", {
        add_to_collection_btn: function(_this) {
          return function(btn) {
            I.event("grid", "trailer", "add_to_collection");
            if (!I.current_user) {
              return "continue"
            }
            return I.Lightbox.open_remote(btn.attr("href"), I.CollectionLightbox)
          }
        }(this)
      })
    }
    return WatchTrailerLightbox
  }()
}).call(this);
(function() {
  var UNKNOWN_IMAGE_FORMAT_ERROR, image_type_from_array_buffer, bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments)
      }
    },
    slice = [].slice,
    extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
        this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
    },
    hasProp = {}.hasOwnProperty;
  I.prepare_upload = function(prefix, params, fn, fail_fn) {
    return $.ajax({
      url: prefix + "/upload/prepare",
      type: "post",
      data: I.with_csrf(params),
      success: function(_this) {
        return function(res) {
          if (res.errors) {
            return typeof fail_fn === "function" ? fail_fn(res.errors.join(",")) : void 0
          }
          return typeof fn === "function" ? fn(res) : void 0
        }
      }(this),
      error: function(_this) {
        return function(res) {
          return typeof fail_fn === "function" ? fail_fn("Server error") : void 0
        }
      }(this)
    })
  };
  image_type_from_array_buffer = function(array_buffer) {
    var dv, hex, nume1, nume2, types;
    dv = new DataView(array_buffer, 0, 5);
    nume1 = dv.getUint8(0, true);
    nume2 = dv.getUint8(1, true);
    hex = nume1.toString(16) + nume2.toString(16);
    types = {
      8950: "image/png",
      4749: "image/gif",
      "424d": "image/bmp",
      ffd8: "image/jpeg"
    };
    return types[hex]
  };
  UNKNOWN_IMAGE_FORMAT_ERROR = "You selected an image type we don't recognize. It's possible it has the wrong file extension for the format it is saved as. Please use an image editing program to convert it to a PNG, JPEG, or GIF.";
  I.test_image_format = function(file) {
    return $.Deferred(function(_this) {
      return function(d) {
        var reader;
        if (window.FileReader) {
          reader = new FileReader;
          reader.readAsArrayBuffer(file);
          reader.onerror = function() {
            return d.reject("Failed to read image from disk")
          };
          return reader.onload = function() {
            var type;
            type = image_type_from_array_buffer(reader.result);
            if (type === "image/bmp") {
              return d.reject("You selected a BMP file that has a wrong extension. Please use an image editing program to convert it to a PNG, JPEG, or GIF.")
            } else if (type) {
              return d.resolve()
            } else {
              return d.reject(UNKNOWN_IMAGE_FORMAT_ERROR)
            }
          }
        } else {
          return d.resolve()
        }
      }
    }(this))
  };
  I.image_dimensions = function(file) {
    return $.Deferred(function(d) {
      var image, src;
      src = typeof URL !== "undefined" && URL !== null ? typeof URL.createObjectURL === "function" ? URL.createObjectURL(file) : void 0 : void 0;
      if (src) {
        image = new Image;
        image.src = src;
        image.onload = function() {
          return d.resolve([image.width, image.height])
        };
        return image.onerror = function() {
          return d.reject(UNKNOWN_IMAGE_FORMAT_ERROR)
        }
      } else {
        return d.reject(UNKNOWN_IMAGE_FORMAT_ERROR)
      }
    })
  };
  I.video_dimensions = function(file) {
    return $.Deferred(function(d) {
      var src, v;
      v = document.createElement("video");
      src = typeof URL !== "undefined" && URL !== null ? typeof URL.createObjectURL === "function" ? URL.createObjectURL(file) : void 0 : void 0;
      if (src) {
        v.src = src;
        v.onloadedmetadata = function() {
          return d.resolve([v.videoWidth, v.videoHeight])
        };
        return v.onerror = function() {
          return d.reject("Invalid video file")
        }
      } else {
        return d.reject("Invalid video file")
      }
    })
  };
  I.test_image_dimensions = function(file, max_width, max_height) {
    if (max_width == null) {
      max_width = 3840
    }
    if (max_height == null) {
      max_height = 2160
    }
    return I.image_dimensions(file).then(function(_this) {
      return function(size) {
        var height, width;
        width = size[0], height = size[1];
        return $.Deferred(function(d) {
          if (width > max_width || height > max_height) {
            return d.reject("Image is greater than the maximum dimensions of " + max_width + "x" + max_height + " (you selected a " + width + "x" + height + " image)")
          } else {
            return d.resolve()
          }
        })
      }
    }(this))
  };
}).call(this);
