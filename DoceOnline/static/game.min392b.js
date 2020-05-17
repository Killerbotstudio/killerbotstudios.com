//Setup Game page layout

(function() {
  I.setup_layout = function() {
    $(window).on("message", function(_this) {
      return function(e) {
        var message, origin;
        origin = new RegExp("\\/\\/" + $(document.body).data("host") + "\\/");
        if (!e.originalEvent.origin.match) {
          return
        }
        message = e.originalEvent.data;
        switch (message.name) {
          case "dimensions":
            return parent.postMessage({
              width: $(document).width(),
              height: $(document).height()
            }, "*")
        }
      }
    }(this));
  };
}).call(this);

//To activate IFRAME

(function() {
  var bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments)
    }
  };
  I.HtmlEmbed = function() {
    HtmlEmbed.current = $.Deferred().done(function() {
      return window.addEventListener("popstate", function(e) {
        var state;
        state = e.state || {};
        return I.HtmlEmbed.current.done(function(embed) {
          return embed.synchronize_state(state)
        })
      })
    });
    HtmlEmbed.prototype.ping_time = 1e3;

    function HtmlEmbed(el, opts) {
      this.opts = opts;
      this.load_frame = bind(this.load_frame, this);
      this.el = $(el);
      if (I.HtmlEmbed.current.state() === "resolved") {
        I.HtmlEmbed.current = $.Deferred().resolve(this)
      } else {
        I.HtmlEmbed.current.resolve(this)
      }
      this.load_archive();
      if (window.history.state) {
        this.synchronize_state(window.history.state)
      }
      if (this.opts.width) {
        I.ViewGame.current.then(function(_this) {
          return function(view) {
            return view.fit_to_width(_this.opts.width)
          }
        }(this))
      }
      this.el.dispatch("click", {
        load_iframe_btn: function(_this) {
          return function(btn) {
            return _this.load_frame().done(function(frame) {
              setTimeout(function() {
                var ref;
                return (ref = frame[0]) != null ? ref.focus() : void 0
              }, 100);
              if (I.is_mobile()) {
                return _this.enter_fullscreen()
              } else if (_this.opts.start_maximized) {
                return _this.enter_maximized()
              }
            })
          }
        }(this),
        fullscreen_btn: function(_this) {
          return function(btn) {
            return _this.enter_fullscreen()
          }
        }(this),
        restore_btn: function(_this) {
          return function(btn) {
            _this.load_frame().done(function(frame) {
              return setTimeout(function() {
                var ref;
                return (ref = frame[0]) != null ? ref.focus() : void 0
              }, 100)
            });
            if (I.is_mobile()) {
              return _this.enter_fullscreen()
            } else {
              return _this.enter_maximized()
            }
          }
        }(this)
      })
    }
    HtmlEmbed.prototype.synchronize_state = function(state) {
      if (state.maximized) {
        this.enter_maximized(false);
        return setTimeout(function(_this) {
          return function() {
            var ref;
            return (ref = _this.el.find(".game_frame iframe")[0]) != null ? ref.focus() : void 0
          }
        }(this), 100)
      } else {
        return this.exit_maximized()
      }
    };
    HtmlEmbed.prototype.load_archive = function() {
      if (!this.opts.load_url) {
        return
      }
      return $.get(this.opts.load_url, function(_this) {
        return function(res) {
          if (res.html) {
            _this.el.replaceWith(res.html);
            return
          }
          if (res.errors) {
            _this.el.replaceWith($('<div class="missing_game"></div>').text(res.errors.join(", ")));
            return
          }
          switch (res.status) {
            case "complete":
              return _this.el.closest(".view_game_page").addClass("ready");
            case "extracting":
              return setTimeout(function() {
                _this.ping_time += 100;
                return _this.load_archive()
              }, _this.ping_time)
          }
        }
      }(this))
    };
    HtmlEmbed.prototype.mobile_orientation = function() {
      var ratio;
      if (this.opts.orientation) {
        return this.opts.orientation
      }
      if (!(this.opts.width && this.opts.height)) {
        return "landscape"
      }
      ratio = this.opts.width / this.opts.height;
      if (ratio >= 1.4) {
        return "landscape"
      } else if (ratio <= 1.7) {
        return "portrait"
      }
    };
    HtmlEmbed.prototype.load_frame = function() {
      return this._loaded_frame || (this._loaded_frame = $.Deferred(function(_this) {
        return function(d) {
          var placeholder;
          placeholder = _this.el.find(".iframe_placeholder");
          placeholder.replaceWith(placeholder.data("iframe"));
          _this.iframe = _this.el.find("#game_drop");
          _this.el.find(".game_frame").addClass("game_loaded").removeClass("game_pending");
          return d.resolve(_this.iframe)
        }
      }(this)))
    };
    HtmlEmbed.prototype.enter_maximized = function(push_history) {
      if (push_history == null) {
        push_history = true
      }
      if (this.maximized) {
        return
      }
      this.maximized = true;
      return this.load_frame().done(function(_this) {
        return function() {
          if (window.history && push_history) {
            window.history.pushState({
              maximized: true
            }, document.title)
          }
          _this.el.find(".game_frame").addClass("maximized");
          return $(document.body).addClass("frame_maximized")
        }
      }(this))
    };
    HtmlEmbed.prototype.exit_maximized = function() {
      if (!this.maximized) {
        return
      }
      this.maximized = false;
      this.el.find(".game_frame").removeClass("maximized");
      return $(document.body).removeClass("frame_maximized")
    };
    HtmlEmbed.prototype.enter_fullscreen = function() {
      var frame, orientation;
      frame = this.el.find(".game_frame iframe");
      if (!frame[0]) {
        return
      }
      orientation = this.mobile_orientation();
      if (I.is_fullscreen()) {
        return
      }
      if (!I.request_fullscreen(frame[0], orientation)) {
        return this.enter_maximized()
      }
    };
    return HtmlEmbed
  }()
}).call(this);

//To enable View Game
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
  I.ViewGame = function() {
    ViewGame.current = $.Deferred();

    function ViewGame(el, game1, opts1) {
      var form;
      this.game = game1;
      this.opts = opts1;
      this.setup_hiding = bind(this.setup_hiding, this);
      I.event2("view game", {
        type: this.game.type_name,
        paid: this.game.actual_price > 0
      });
      I.ViewGame.current.resolve(this);
      I.tracked_links($(".jam_banner"), "view_game", "jam_banner");
      form = $(".devlog_banner").find("form").remote_submit(function(_this) {
        return function(res) {
          return form.end().slideUp("fast")
        }
      }(this), null, [{
        name: "json",
        value: "1"
      }]);
      this.el = $(el);
      I.tracked_links(this.el, "view_game", "main_column");
      if (this.game.hit_url) {
        $.get(this.game.hit_url)
      }
      this.el.on("click mouseup", ".launch_btn[data-rp]", function(_this) {
        return function(e) {
          var btn, rp;
          btn = $(e.currentTarget);
          if (rp = btn.data("rp")) {
            btn.data("rp", null);
            if (!(typeof navigator !== "undefined" && navigator !== null ? typeof navigator.sendBeacon === "function" ? navigator.sendBeacon(rp) : void 0 : void 0)) {
              return $.get(rp)
            }
          }
        }
      }(this));
      this.el.dispatch("click", {
        toggle_info_btn: function(_this) {
          return function(el) {
            el.closest(".more_information_toggle").toggleClass("open");
            return _this.el.find(".info_panel_wrapper").slideToggle()
          }
        }(this),
      });
      this.image_viewer = new I.ImageViewer(el);
      if (this.opts.first_view) {
        I.Lightbox.open_tpl("first_game_lightbox", I.FirstGameLightbox)
      }
    }
    ViewGame.prototype.setup_hiding = function(el) {
      $(document.body).on("i:lightbox_open", function(_this) {
        return function() {
          return $(el).css({
            visibility: "hidden"
          })
        }
      }(this));
      return $(document.body).on("i:lightbox_close", function(_this) {
        return function() {
          return $(el).css({
            visibility: "visible"
          })
        }
      }(this))
    };
    ViewGame.prototype.fit_to_width = function(width) {
      if (!(width > 920)) {
        return
      }
      if (this.opts.responsive || I.is_mobile()) {
        return $("#inner_column").css({
          width: "auto",
          maxWidth: width + "px"
        })
      } else {
        return $("#inner_column").css({
          width: width + "px",
          maxWidth: width + "px"
        })
      }
    };
    return ViewGame
  }();
  I.ViewUnityGame = function(superClass) {
    extend(ViewUnityGame, superClass);

    function ViewUnityGame(el, game, unity1, opts) {
      this.unity = unity1;
      ViewUnityGame.__super__.constructor.call(this, el, game, opts);
      this.embed_game();
      this.setup_hiding("#unity_drop embed")
    }
    ViewUnityGame.prototype.embed_game = function() {
      var drop, track_unity, unity, width;
      if (!this.unity) {
        return
      }
      drop = $("#unity_drop");
      width = drop.width();
      if (width > 920) {
        $("#inner_column").width(width + 40)
      }
      unity = new UnityObject2({
        params: {
          disableContextMenu: true
        }
      });
      track_unity = _.once(function(status) {
        return I.event("view_game", "unity", "" + status)
      });
      unity.observeProgress(function(_this) {
        return function(progress) {
          track_unity(progress.pluginStatus);
          if (progress.pluginStatus === "unsupported") {
            drop.width("").height("");
            $("#inner_column").width("");
            return _this.el.addClass("unity_unsupported")
          } else {
            return $(document.body).removeClass("responsive")
          }
        }
      }(this));
      return unity.initPlugin(drop[0], this.unity.url)
    };
    return ViewUnityGame
  }(I.ViewGame);
  I.ViewHtmlGame = function(superClass) {
    extend(ViewHtmlGame, superClass);

    function ViewHtmlGame() {
      return ViewHtmlGame.__super__.constructor.apply(this, arguments)
    }
    return ViewHtmlGame
  }(I.ViewGame)
}).call(this);
