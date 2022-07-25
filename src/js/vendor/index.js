! function(t) {

APP = window.APP || {}, APP.Controls = APP.Controls || {}, APP.Controls.Page = APP.Controls.Page || {}, APP.Controls.Layout = APP.Controls.Layout || {}, APP.Controls.Partial = APP.Controls.Partial || {}, APP.Controls.Form = APP.Controls.Form || {}, APP.Controls.Popup = APP.Controls.Popup || {}, APP.Controls.Case = APP.Controls.Case || {}, APP.Helper = APP.Helper || {}, APP.CaseHelper = APP.CaseHelper || {},
    function(t, i, e) {
        i.Helper.StrReplace = function(t, i, s, n) {
            var o = 0,
                a = 0,
                r = "",
                h = "",
                l = 0,
                d = 0,
                c = [].concat(t),
                u = [].concat(i),
                f = s,
                p = "[object Array]" === Object.prototype.toString.call(u),
                m = "[object Array]" === Object.prototype.toString.call(f);
            f = [].concat(f);
            var g = "undefined" != typeof window ? window : global;
            g.$locutus = g.$locutus || {};
            var v = g.$locutus;
            if (v.php = v.php || {}, "object" == typeof t && "string" == typeof i) {
                for (r = i, i = [], o = 0; o < t.length; o += 1) i[o] = r;
                r = "", u = [].concat(i), p = "[object Array]" === Object.prototype.toString.call(u)
            }
            for ("undefined" != typeof n && (n.value = 0), o = 0, l = f.length; o < l; o++)
                if ("" !== f[o])
                    for (a = 0, d = c.length; a < d; a++) r = f[o] + "", h = p ? u[a] !== e ? u[a] : "" : u[0], f[o] = r.split(c[a]).join(h), "undefined" != typeof n && (n.value += r.split(c[a]).length - 1);
            return m ? f : f[0]
        }, i.Helper.AnimateWave = function(i) {
            var s = i.windowWidth != e ? i.windowWidth : window.innerWidth,
                n = i.windowHeight != e ? i.windowHeight : window.innerHeight,
                o = i.mouseX != e ? i.mouseX : 0,
                a = i.mouseY != e ? i.mouseY : 0,
                r = i.navTop != e ? i.navTop : 0,
                h = i.navWidth != e ? i.navWidth : 0,
                l = i.elements,
                d = i.elementsCount != e ? i.elementsCount : l.length,
                c = i.scrollLeft != e ? i.scrollLeft : 0,
                u = i.waveHeight != e ? i.waveHeight : 40,
                f = n / 4,
                p = a - r,
                m = 0;
            m = s > h ? o - .5 * (s - h) : c + o;
            var g = 0;
            Math.abs(p) < f && (g = p > f / 2 ? f - p : p > 0 ? p / 2 + f / 4 : p < -f / 2 ? -p - f : p / 2 - f / 4), g = g * u * 2 / f;
            var v = .025,
                w = h / d;
            l.each(function(i, e) {
                var s = t(e),
                    n = i * w,
                    o = Math.abs(m - n);
                o > 300 && (o = 300);
                var a = g * (300 - o) / 300,
                    r = a * Math.cos(v * o);
                s.css("transform", "translateY(" + r + "px)")
            })
        }, i.Helper.AnimateWaveVertical = function(i) {
            var s = i.windowWidth != e ? i.windowWidth : window.innerWidth,
                n = i.mouseX != e ? i.mouseX : 0,
                o = i.mouseY != e ? i.mouseY : 0,
                a = i.navWidth != e ? i.navWidth : 0,
                r = i.navHeight != e ? i.navHeight : 0,
                h = i.elements,
                l = i.elementsCount != e ? i.elementsCount : h.length,
                d = i.waveHeight != e ? i.waveHeight : 40,
                c = s / 8,
                u = n - a / 2,
                f = o,
                p = 0;
            Math.abs(u) < c && (p = u > c / 2 ? c - u : u > 0 ? u / 2 + c / 4 : u < -c / 2 ? -u - c : u / 2 - c / 4), p = p * d * 2 / c;
            var m = .025,
                g = r / l;
            h.each(function(i, e) {
                var s = t(e),
                    n = i * g,
                    o = Math.abs(f - n);
                o > 300 && (o = 300);
                var a = p * (300 - o) / 300,
                    r = a * Math.cos(m * o);
                s.css("transform", "translateX(" + r + "px)")
            })
        }
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.PageProgress = can.Control.extend({
            init: function() {
                this.$win = t(window), this.$doc = t(document), this.$progressBar = this.element, this.$doc.bind("DOMSubtreeModified", this.setSizes.bind(this))
            },
            "{window} scroll": function() {
                this.setWidth()
            },
            "{window} resize": function() {
                this.setSizes()
            },
            setSizes: function() {
                this.len = this.$doc.height() - this.$win.height(), this.setWidth()
            },
            setWidth: function() {
                var t = this.$win.scrollTop(),
                    i = t / this.len,
                    e = parseInt(100 * i);
                this.$progressBar.css("width", e + "%")
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Goup = can.Control.extend({
            init: function() {
                this.$win = t(window), this.$body = t("body"), this.$darkButtonBlock = this.$body.find('[data-button-color="dark"]'), this.isDarkButtonPage = this.$body.find('[data-page-color="dark"]').length > 0, this.isDarkButtonPage && this.element.addClass("dark"), this.onResize(), this.checkVisibility(), this.checkColor()
            },
            touchstart: function() {
                t.scrollTo(0, 400)
            },
            click: function() {
                t.scrollTo(0, 400)
            },
            "{window} scroll": function() {
                this.checkVisibility(), this.checkColor()
            },
            "{window} resize": function() {
                this.onResize(), this.checkVisibility(), this.checkColor()
            },
            onResize: function() {
                this.windowHeight = window.innerHeight, this.colorData = [], this.$darkButtonBlock.each(function(i, e) {
                    var s = t(e);
                    this.colorData.push({
                        top: s.offset().top,
                        height: s.outerHeight()
                    })
                }.bind(this))
            },
            checkVisibility: function() {
                this.scrollTop = this.$win.scrollTop();
                var t = this.scrollTop > 500;
                this.$body.toggleClass("go-up-visible", t), t ? this.element.fadeIn(200) : this.element.fadeOut(200)
            },
            checkColor: function() {
                var t = this.isDarkButtonPage;
                this.colorData.forEach(function(i) {
                    var e = this.scrollTop >= i.top - this.windowHeight / 2,
                        s = this.scrollTop <= i.top + i.height - this.windowHeight / 2;
                    e && s && (t = !0)
                }.bind(this)), this.element.toggleClass("dark", t)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ClearText = can.Control.extend({
            init: function() {
                this.wrapImages(), this.element.find("table:not(.stacktable)").stacktable(i.Helper.defaultStacktableSettings)
            },
            wrapImages: function() {
                this.$images = this.element.find("> img, figure img").not(".js-wrapped"), this.$images.each(this.wrapImage.bind(this))
            },
            wrapImage: function(e, s) {
                var n = t(s),
                    o = t("<figure>"),
                    a = t("<figcaption>"),
                    r = n.attr("alt"),
                    h = n.parent("figure").length;
                n.addClass("js-wrapped"), h || o.append(n.clone()), r && (a.html(t("<div>", {
                    html: r
                })), a.addClass("transparent-block").addClass(i.Helper.getRandColor()), h ? n.after(a) : o.append(a)), h || n.replaceWith(o)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.PageBackground = can.Control.extend({
            defaults: {
                events: {
                    changePageBackground: "changePageBackground",
                    resetPageBackground: "resetPageBackground"
                }
            }
        }, {
            init: function() {
                1 != this.inited && (this.inited = !0, this.$video = this.element.find("video"), this.videoControl = new i.Controls.Partial.HtmlVideo(this.$video), this.defaultVideo = void 0 != this.$video.attr("src") ? this.$video.attr("src").trim() : "", void 0 == this.defaultVideo && (this.defaultVideo = ""), this.defaultPicture = this._getUrl(this.element.css("background-image")), this.videoValue = this.defaultVideo, this.pictureValue = this.defaultPicture, this.$video.css("visibility", "visible"))
            },
            "{events.changePageBackground}": function(t, i, e) {
                var s = this._checkParam(e.video, this.defaultVideo),
                    n = this._checkParam(e.picture, this.defaultPicture);
                this._changeBackground(s, n)
            },
            "{events.resetPageBackground}": function() {
                this._changeBackground(this.defaultVideo, this.defaultPicture)
            },
            _changeBackground: function(t, i) {
                var e = 200;
                this.videoValue == t && this.pictureValue == i || (this.videoValue = t, this.pictureValue = i, this.element.stop(!0, !1).fadeOut({
                    duration: e,
                    complete: function() {
                        void 0 != t && void 0 != this.videoControl && this.videoControl.changeVideoSrc(t), this.element.css("background-image", "url(" + i + ")"), this.element.stop(!0, !1).fadeIn(e)
                    }.bind(this)
                }))
            },
            _getUrl: function(t) {
                return void 0 == t ? "" : t.slice(4, -1).replace(/"/g, "")
            },
            _checkParam: function(t, i) {
                return void 0 == t ? i : t.length < 1 ? i : t
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ComponentAjax = can.Control.extend({
            defaults: {
                loader: ".js-ajax-loader",
                events: {
                    successAjax: "successAjax",
                    load: "load"
                }
            }
        }, {
            init: function() {
                this.ajax = !1, this.end = !1, this.$doc = t(document), this.$win = t(window), this.initPage(), this.getSize(), this.element.bind("DOMSubtreeModified", function() {
                    this.getSize()
                }.bind(this))
            },
            "{events.load}": function(t, i, e) {
                this.url = e.uri, this.sendAjax(e.page)
            },
            "{window} load": function() {
                this.getSize()
            },
            "{window} resize": function() {
                this.getSize(), this.checkLoader()
            },
            "{window} scroll": function() {
                this.checkLoader()
            },
            "{loader} click": function(t, i) {
                i.preventDefault(), this.sendAjax()
            },
            initPage: function() {
                void 0 != this.$loader && this.$loader.remove(), this.$loader = this.element.find(this.options.loader).first(), this.url = this.$loader.attr("href")
            },
            getSize: function() {
                this.screenHeight = window.innerHeight, this.docHeight = this.$doc.height(), this.diff = this.docHeight - this.screenHeight
            },
            checkLoader: function() {
                var t = this.$win.scrollTop();
                Math.abs(this.diff - t) < i.LoaderOffset && this.sendAjax()
            },
            sendAjax: function(i) {
                i = i || !1;
                var e = !1;
                0 == i && this.$loader.hasClass("disabled") || void 0 == this.url || this.ajax || (this.ajax = !0, i && (e = !0), t.ajax({
                    type: "post",
                    data: {
                        ajax: !0
                    },
                    url: this.url,
                    success: this.ajaxSuccess.bind(this, e, i)
                }))
            },
            ajaxSuccess: function(i, e, s) {
                var n = t(s),
                    o = n.find(".js-component-ajax");
                o.length > 0 && (s = o.html()), i ? (this.element.html('<div class="component-ajax-content">' + s + "</div>"), this.options.pagerWrap.trigger("enable", {
                    page: e
                }), t.scrollTo(0, 300)) : this.element.append('<div class="component-ajax-content">' + s + "</div>"), this.initPage(), this.element.trigger("successAjax"), this.getSize(), this.ajax = !1
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Icon = can.Control.extend({
            init: function() {
                var t = this.element.data("icon-type");
                if (void 0 != t && void 0 != i.Icons) {
                    var e = i.Icons[t];
                    if (void 0 != e) {
                        var s = this.element.get(0);
                        bodymovin.loadAnimation({
                            wrapper: s,
                            animType: "svg",
                            loop: !0,
                            animationData: e
                        })
                    }
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Pager = can.Control.extend({
            defaults: {
                events: {
                    update: "update",
                    enable: "enable"
                }
            }
        }, {
            init: function() {
                this.$win = t(window), this.$doc = t(document), this.winHeight = this.$win.height(), this.docHeight = this.$doc.height(), this.title = t("title").text(), this.page = this.element.find(".js-first-on-page").eq(0).data("page"), this.$pager = this.element.find(".js-pager"), this.sectionCode = this.$pager.data("section-code"), this.size = this.$pager.data("size"), this.total = this.$pager.data("total"), this.uri = this.element.find(".js-pager-uri").data("uri"), this.$wrap = this.element.find(".js-inner-pager"), this.$outer = this.$wrap.find(".js-side-pager"), this.total <= this.size || (this.calcPeriods(), this.$outer.pagination({
                    dataSource: this._generateArray(this.total),
                    pageSize: this.size,
                    pageRange: 1,
                    showPrevious: !0,
                    showNext: !0,
                    showPageNumbers: !0,
                    beforePreviousOnClick: this.goTo.bind(this),
                    beforeNextOnClick: this.goTo.bind(this),
                    beforePageOnClick: this.goTo.bind(this),
                    callback: function(t, i) {}
                }), this.$outer.pagination("go", this.page), this.$win.on("scroll", this.scroll.bind(this)))
            },
            "{events.update}": function() {
                this.calcPeriods()
            },
            "{events.enable}": function(t, i, e) {
                this.$outer.pagination("enable"), this.$outer.pagination("go", e.page), this.$outer.find(".loading").removeClass("loading")
            },
            scroll: function() {
                var t = this.$win.scrollTop();
                this.getActive(t)
            },
            calcPeriods: function() {
                var i = this;
                this.periods = [], this.$pages = this.element.find(".js-first-on-page"), this.$pages.each(function(e) {
                    var s = t(this),
                        n = s.offset().top - i.winHeight,
                        o = n + i.docHeight - i.winHeight + 160,
                        a = [n, o];
                    0 == e && (a[0] = 0), i.periods.push(a)
                })
            },
            getActive: function(t) {
                if (!(this.total <= this.size || this.$pages.length < 2))
                    for (var i = 0; i < this.periods.length; i++)
                        if (t >= this.periods[i][0] && t < this.periods[i][1]) {
                            this.$active = this.$pages.eq(i);
                            var e = this.$active.data("page");
                            this.page != e && (this.setPage(e), this.page = e);
                            break
                        }
            },
            setPage: function(t) {
                this.$outer.pagination("go", t);
                var e = i.Helper.StrReplace(["#page#", "#section#"], [t, this.sectionCode], this.uri);
                history.pushState({}, this.title, e)
            },
            goTo: function(e, s) {
                e.preventDefault(), this.$outer.pagination("disable");
                var n = t(e.target);
                n.parent("li").addClass("active loading");
                var o = i.Helper.StrReplace(["#page#", "#section#"], [s, this.sectionCode], this.uri);
                history.pushState({}, this.title, o), this.options.loaderWrap.trigger("load", {
                    page: s,
                    uri: o
                })
            },
            _generateArray: function(t) {
                for (var i = [], e = 1; e <= t; e++) i.push(e);
                return i
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.TextPageNav = can.Control.extend({
            disabled: !1,
            offset: 100,
            init: function() {
                this.$body = t("body"), this.$text = this.element.find(".js-text-block"), this.$nav = this.element.find(".js-page-nav"), this.$doc = t(document), this.$text.hasClass("js-process-tilda") ? this.buildTildaAnchors() : this.buildAnchors(), this.getSizes(), this.checkCurrentItem(), this.$nav.hasClass("vertical") ? this.animateWaveLoopVertical() : this.animateWaveLoop(), this.$body.addClass("tagline-badge-upper")
            },
            "{window} mousemove": function(t, i) {
                this.mouseX = i.pageX, this.mouseY = i.pageY
            },
            "{window} scroll": function() {
                this.scrollTop = t(window).scrollTop(), this.checkCurrentItem()
            },
            "{window} resize": function() {
                this.getSizes(), this.checkCurrentItem()
            },
            "{window} load": function() {
                this.getSizes(), this.checkCurrentItem()
            },
            ".js-page-nav a click": function(i, e) {
                e.preventDefault();
                var s;
                s = this.$text.hasClass("js-process-tilda") ? "a[name=" + i.data("href") + "]" : i.attr("href"), t.scrollTo(t(s), 300, {
                    offset: -this.offset
                })
            },
            getSizes: function() {
                this.disabled || (this.scrollTop = Math.round(t(window).scrollTop()), this.windowHeight = Math.round(window.innerHeight), this.windowWidth = Math.round(window.innerWidth), this.navWidth = this.$navContainer.width(), this.navHeight = this.$navContainer.height(), this.isMobile = i.Helper.isViewPortMobile(), this.docHeight = this.$doc.height(), t.each(this.targetData, function(i, e) {
                    t.extend(e, {
                        targetTop: e.$target.offset().top
                    })
                }.bind(this)), this.checkCurrentItem())
            },
            buildAnchors: function() {
                this.targetData = {};
                var i = this.$text.find("[id]").filter("div, p, h1, h2, h3, h4, h5, a, span");
                if (i.length < 2) return void(this.disabled = !0);
                this.$nav.show();
                for (var e = 100, s = Math.round(e / (i.length + 1)), n = '<div class="content-container">', o = 0; o < s; o++) n += '<span class="nav-line js-nav-item"></span>';
                i.each(function(i, e) {
                    var o = t(e),
                        a = o.attr("id"),
                        r = o.text();
                    this.targetData[a] = {
                        id: a,
                        $target: o
                    }, n += '<a class="nav-section js-nav-item" href="#' + a + '"><span>' + r + "</span></a>";
                    for (var h = 0; h < s; h++) n += '<span class="nav-line js-nav-item"></span>'
                }.bind(this)), n += "</div>", this.$nav.append(n), this.$navContainer = this.$nav.find(".content-container"), this.$navElements = this.$nav.find(".js-nav-item")
            },
            buildTildaAnchors: function() {
                this.targetData = {};
                var i = this.$text.find("a[name]");
                if (i.length < 2) return void(this.disabled = !0);
                this.$nav.show();
                for (var e = 80, s = Math.round(e / (i.length + 1)), n = '<div class="content-container">', o = 0; o < s; o++) n += '<span class="nav-line js-nav-item"></span>';
                var a = this.$text.find(".t607");
                i.each(function(i, e) {
                    var o = t(e),
                        r = o.attr("name"),
                        h = a.find("a[href=#" + r + "]").find(".t607__tooltip").text();
                    this.targetData[r] = {
                        id: r,
                        $target: o
                    }, n += '<a class="nav-section js-nav-item" href="#' + r + '" data-href="' + r + '"><span>' + h + "</span></a>";
                    for (var l = 0; l < s; l++) n += '<span class="nav-line js-nav-item"></span>'
                }.bind(this)), n += "</div>", this.$nav.append(n), this.$navContainer = this.$nav.find(".content-container"), this.$navElements = this.$nav.find(".js-nav-item")
            },
            animateWaveLoop: function() {
                this.disabled || (this.$body.hasClass("top-menu-opened") || this.isMobile || i.Helper.AnimateWave({
                    windowWidth: this.windowWidth,
                    windowHeight: this.windowHeight,
                    mouseX: this.mouseX,
                    mouseY: this.mouseY - this.scrollTop,
                    navTop: this.$navContainer.offset().top - this.scrollTop + 40,
                    navWidth: this.navWidth,
                    elements: this.$navElements,
                    elementsCount: this.navElementsCount,
                    scrollLeft: 0,
                    waveHeight: 20
                }), requestAnimFrame(function() {
                    this.animateWaveLoop()
                }.bind(this)))
            },
            animateWaveLoopVertical: function() {
                this.disabled || (this.$body.hasClass("top-menu-opened") || this.isMobile || i.Helper.AnimateWaveVertical({
                    windowWidth: this.windowWidth,
                    windowHeight: this.windowHeight,
                    mouseX: this.mouseX,
                    mouseY: this.mouseY - this.scrollTop,
                    navWidth: this.navWidth,
                    navHeight: this.navHeight,
                    elements: this.$navElements,
                    elementsCount: this.navElementsCount,
                    scrollLeft: 0,
                    waveHeight: 20
                }), requestAnimFrame(function() {
                    this.animateWaveLoopVertical()
                }.bind(this)))
            },
            checkCurrentItem: function() {
                if (!this.disabled) {
                    var i = !1,
                        e = !1;
                    if (t.each(this.targetData, function(t, s) {
                            if (e) {
                                var n = Math.round(this.scrollTop + this.offset - s.targetTop);
                                if (n >= 0) {
                                    var o = Math.round(this.scrollTop + this.offset - e.targetTop);
                                    o > n && (e = s)
                                }
                            } else e = s;
                            (!i || i.top < s.top) && (i = s)
                        }.bind(this)), e || i) {
                        var s = e ? e.id : i.id,
                            n = this.$navElements.filter('[href="#' + s + '"]');
                        n.hasClass("current") || (this.$navElements.removeClass("current"), n.addClass("current"))
                    }
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Tagline = can.Control.extend({
            init: function() {
                this.$html = t("html"), this.domain = i.Helper.StrReplace(["www.", "blog."], ["", ""], window.location.host), this.data = Cookies.getJSON("tagline") || "", "hide" != this.data && (this.$html.addClass("show-tagline"), this.element.css("visibility", "visible"))
            },
            click: function(i, e) {
                t(e.target).hasClass("js-tagline-close") && e.preventDefault()
            },
            ".js-tagline-close click": function(t, i) {
                Cookies.set("tagline", "hide", {
                    expires: 1,
                    domain: this.domain
                }), this.element.remove(), this.$html.removeClass("show-tagline")
            },
            scroll: function() {
                var t = this.$win.scrollTop();
                this.getActive(t)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.CoverVideo = can.Control.extend({
            defaults: {
                fullScreen: !1
            }
        }, {
            init: function() {
                this.$container = this.element.parent(), this.video = this.element.get(0), this.setVideoSize()
            },
            "{window} load": function() {
                this.setVideoSize()
            },
            "{window} resize": function() {
                this.setVideoSize()
            },
            setVideoSize: function() {
                if (void 0 != this.element && 0 != this.element.length) {
                    var t = this.element.attr("src");
                    if (void 0 != t && "" != t) {
                        var i = 0,
                            e = 0;
                        void 0 == this.$container || this.options.fullScreen ? (i = window.innerHeight, e = window.innerWidth) : (i = this.$container.height(), e = this.$container.width());
                        var s = this.video.videoHeight,
                            n = this.video.videoWidth;
                        if (0 != i && 0 != e && 0 != s && 0 != n) {
                            var o = e,
                                a = s * o / n;
                            a < i && (a = i, o = n * a / s), this.element.height(a), this.element.width(o)
                        }
                    }
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.CoverVideoTrigger = can.Control.extend({
            defaults: {
                trigger: ".js-cover-video-trigger",
                required: !0,
                click: !1,
                events: {
                    updateCoverVideoTrigger: "updateCoverVideoTrigger"
                }
            }
        }, {
            init: function() {
                this.$pageBackground = this.element.find(".page-content .js-page-background"), this.$triggers = this.element.find(this.options.trigger), this.options.required && this.setActive(this.$triggers.first())
            },
            "{trigger} mouseenter": function(t) {
                this.options.click || this.setActive(t)
            },
            "{trigger} mouseleave": function(t) {
                this.options.required || this.options.click || (this.$pageBackground.trigger("changePageBackground", [{}]), this.$triggers.removeClass("active"))
            },
            "{trigger} click": function(t) {
                this.options.click && this.setActive(t)
            },
            "{events.updateCoverVideoTrigger}": function() {
                this.$triggers = this.element.find(this.options.trigger)
            },
            setActive: function(t) {
                if (!t.hasClass("active")) {
                    this.$triggers.removeClass("active"), t.addClass("active");
                    var i = t.data("video"),
                        e = t.data("picture");
                    this.$pageBackground.trigger("changePageBackground", [{
                        video: i,
                        picture: e
                    }])
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.HtmlVideo = can.Control.extend({
            defaults: {
                events: {
                    playVideo: "playVideo",
                    pauseVideo: "pauseVideo",
                    pauseOn: "pauseOn",
                    lazyLoad: "lazyLoad",
                    updateVideoSize: "updateVideoSize",
                    setCurrentTime: "setCurrentTime"
                }
            }
        }, {
            init: function() {
                this.$video = this.element, this.video = this.$video.get(0), this.src = this.$video.attr("src"), this.initVideo()
            },
            initVideo: function() {
                if (void 0 != this.src && "" != this.src) {
                    void 0 == this.videoSizeControl ? this.videoSizeControl = new i.Controls.Partial.CoverVideo(this.$video) : this.videoSizeControl.setVideoSize(), this.video.muted = !0;
                    var t = setInterval(function() {
                        this.video.readyState > 0 && (this.duration = this.video.duration, this.video.paused && this.video.play(), clearInterval(t))
                    }.bind(this), 50)
                }
            },
            "{events.playVideo}": function() {
                void 0 != this.src && "" != this.src && setTimeout(function() {
                    this.video.paused && this.video.play()
                }.bind(this), 150)
            },
            "{events.pauseVideo}": function() {
                void 0 != this.src && "" != this.src && setTimeout(function() {
                    this.video.paused || this.video.pause()
                }.bind(this), 150)
            },
            "{events.updateVideoSize}": function() {
                void 0 != this.videoSizeControl && this.videoSizeControl.setVideoSize()
            },
            "{events.pauseOn}": function(t, i, e) {
                void 0 != e && void 0 != this.src && "" != this.src && (this.video.ontimeupdate = function() {
                    this.video.currentTime >= e && (this.video.pause(), this.video.ontimeupdate = !1)
                }.bind(this))
            },
            "{events.lazyLoad}": function() {
                var t = this.$video.data("src");
                void 0 != t && "" != t && t != this.src && (this.src = t, this.$video.attr("src", t), this.initVideo())
            },
            "{events.setCurrentTime}": function(t, i, e) {
                this.goTo(e)
            },
            changeVideoSrc: function(t) {
                void 0 != this.video && (this.$video.hide(), this.$video.attr("src", t), this.src = t, this.initVideo())
            },
            getDuration: function() {
                return this.duration
            },
            getCurrentTime: function() {
                return void 0 == this.video ? 0 : this.video.currentTime
            },
            goTo: function(t) {
                void 0 != this.video && (this.video.currentTime = t)
            },
            mute: function(t) {
                void 0 == t && (t = !0), this.video.muted = t
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.LaunchpadVideo = can.Control.extend({
            defaults: {
                events: {
                    loadLaunchpadVideo: "loadLaunchpadVideo",
                    updateLaunchpadVideo: "updateLaunchpadVideo",
                    pauseLaunchpadVideo: "pauseLaunchpadVideo",
                    playLaunchpadVideo: "playLaunchpadVideo"
                }
            }
        }, {
            init: function() {
                this.$video = this.element, new i.Controls.Partial.HtmlVideo(this.$video)
            },
            "{events.loadLaunchpadVideo}": function() {
                this.$video.trigger("lazyLoad")
            },
            "{events.playLaunchpadVideo}": function() {
                this.$video.trigger("playVideo")
            },
            "{events.pauseLaunchpadVideo}": function() {
                this.$video.trigger("pauseVideo")
            },
            "{events.updateLaunchpadVideo}": function() {
                i.Helper.isViewPortMobile() || this.$video.trigger("updateVideoSize")
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.vhSizes = can.Control.extend({
            defaults: {
                minScreenHeight: 600,
                events: {
                    update: "update"
                }
            }
        }, {
            init: function() {
                this.$heightBlocks = this.element.find(".js-vh-height"), this.$minHeightBlocks = this.element.find(".js-vh-min-height"), this.setSize()
            },
            "{window} load": function() {
                this.setSize()
            },
            "{window} resize": function() {
                this.setSize()
            },
            setSize: function() {
                var t = Math.max(window.innerHeight, this.options.minScreenHeight);
                this.$heightBlocks.css("height", t), this.$minHeightBlocks.css("min-height", t)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.SquareBlock = can.Control.extend({
            init: function() {
                this.setSize(), this.element.addClass("init")
            },
            "{window} load": function() {
                this.setSize()
            },
            "{window} resize": function() {
                this.setSize()
            },
            setSize: function() {
                var t = i.Helper.isViewPortMobile() ? "auto" : this.element.outerWidth();
                this.element.css("height", t)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ScrollFixedBlock = can.Control.extend({
            init: function() {
                this.$win = t(window), this.element.wrap(t('<div class="fixed-block-wrap"></div>')), this.$parent = this.element.parent(), this.delay = this.element.data("delay") || 0, this.ignoreHeight = this.element.data("ignore-height") || !1, this.setSizes(), this.setTop()
            },
            "{window} load": function() {
                this.setSizes(), this.setTop()
            },
            "{window} resize": function() {
                this.setSizes(), this.setTop()
            },
            "{window} scroll": function() {
                this.setTop(), this._setTimeout()
            },
            setSizes: function() {
                this.screenHeight = window.innerHeight, this.height = this.element.height(), this.top = this.screenHeight <= 720 ? 20 : 112, this.width = this.$parent.width()
            },
            setTop: function() {
                var t = this.$win.scrollTop(),
                    e = this.height + this.top > this.screenHeight - 70;
                return i.Helper.isViewPortMobile() || e && !this.ignoreHeight || t < this.delay ? void this.element.css({
                    position: "relative",
                    top: 0,
                    width: "auto"
                }).removeClass("in-fixed") : (this.element.css({
                    position: "fixed",
                    width: this.width
                }), void this.element.stop().animate({
                    top: this.top
                }, 200).addClass("in-fixed"))
            },
            _setTimeout: function() {
                clearTimeout(this.timeout), this.timeout = setTimeout(this.setTop.bind(this), 100)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Header = can.Control.extend({
            defaults: {
                menuButton: ".js-menu-button"
            }
        }, {
            init: function() {
                this.$window = t(window), this.$header = this.element.find(".js-header"), this.$topMenu = this.element.find(".js-top-menu"), this.$topMenu.each(function() {
                    new i.Controls.Partial.TopMenu(t(this))
                });
                var e = this.element.find(".js-tagline-head");
                e.length && new i.Controls.Partial.Tagline(e), new i.Controls.Partial.Search(this.element), this.checkHeaderState()
            },
            "{window} load": function() {
                this.checkHeaderState()
            },
            "{window} scroll": function() {
                this.checkHeaderState()
            },
            "{window} resize": function() {
                this.checkHeaderState()
            },
            "{menuButton} click": function() {
                this.$topMenu.trigger("toggleVisibility")
            },
            "{window} keydown": function(t, i) {
                27 == i.keyCode && this.$topMenu.trigger("hideMenu")
            },
            checkHeaderState: function() {
                var t = this.$window.scrollTop();
                this.$header.toggleClass("fixed", t > 0)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.TopMenu = can.Control.extend({
            defaults: {
                section: ".section",
                sectionCaption: ".section-caption",
                sectionLink: "js-section-link-mobile",
                video: ".js-launchpad-video",
                inputs: i.Inputs,
                events: {
                    toggleVisibility: "toggleVisibility",
                    hideMenu: "hideMenu"
                }
            }
        }, {
            loadLaunchpadVideo: !1,
            init: function() {
                this.$body = t("body"), this.$topMenu = this.element.find(this.options.section), this.$sections = this.element.find(this.options.section), this.$sectionContents = this.$sections.find(".section-content"), this.$bgVideo = this.$body.find(".page-background video"), this.$sectionVideo = this.$sections.find(this.options.video), this.$menuButton = this.$body.find(".js-menu-button"), this.$inputs = this.element.find(this.options.inputs), this.$currentInput = this.$inputs.first(), this.checkSectionsVisibility()
            },
            "{window} load": function() {
                this.checkSectionsVisibility()
            },
            "{window} resize": function() {
                this.checkSectionsVisibility()
            },
            "{inputs} focus": function(t) {
                this.$currentInput = t
            },
            "{events.toggleVisibility}": function() {
                var t = !this.element.hasClass("opened");
                t ? this._showMenu() : this._hideMenu()
            },
            "{events.hideMenu}": function() {
                this._hideMenu()
            },
            _showMenu: function() {
                this.loadLaunchpadVideo || (this.$sectionVideo.each(function() {
                    new i.Controls.Partial.LaunchpadVideo(t(this))
                }).trigger("loadLaunchpadVideo"), this.loadLaunchpadVideo = !0), this.element.addClass("opened"), this.$body.addClass("top-menu-opened"), this.$menuButton.addClass("opened"), this.element.fadeIn({
                    duration: 200,
                    complete: function() {
                        this.$sectionVideo.trigger("updateLaunchpadVideo")
                    }.bind(this)
                }), !i.Helper.isViewPortMobile() && this.$bgVideo && this.$bgVideo.trigger("pauseVideo"), i.Helper.isViewPortMobile() || i.Helper.isMobile || this.$currentInput.focus()
            },
            _hideMenu: function() {
                this.element.removeClass("opened"), this.$body.removeClass("top-menu-opened"), this.$menuButton.removeClass("opened"), this.element.fadeOut({
                    duration: 200,
                    complete: function() {}.bind(this)
                }), !i.Helper.isViewPortMobile() && this.$bgVideo && this.$bgVideo.trigger("playVideo")
            },
            "{section} mouseenter": function(t) {
                t.addClass("hover"), i.Helper.isViewPortMobile() || t.find(this.options.video).trigger("playLaunchpadVideo")
            },
            "{section} mouseleave": function(t) {
                t.removeClass("hover"), i.Helper.isViewPortMobile() || t.find(this.options.video).trigger("pauseLaunchpadVideo")
            },
            "{sectionCaption} click": function(e, s) {
                var n = e.closest(this.options.section);
                if (!t(s.target).hasClass("all-button") || !n.hasClass("hover")) return (i.Helper.isTouch() || i.Helper.isViewPortMobile()) && s.preventDefault(), e.hasClass(this.options.sectionLink) && i.Helper.isTouch() ? (window.location.href = e.attr("href"), !1) : void(i.Helper.isViewPortMobile() && n.find(".section-content").slideToggle(200))
            },
            checkSectionsVisibility: function() {
                i.Helper.isViewPortMobile() ? (this.$bgVideo = !1, this.$sectionContents.hide()) : (this.$bgVideo = this.$body.find(".page-background video"), this.$sectionContents.show())
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.Search = can.Control.extend({
            init: function() {
                this.$body = t("body"), this.$form = this.element.find("form"), this.path = this.$form.attr("action"), this.$container = this.element.find(".js-search-container"), this.$scroll = this.element.find(".js-scroll"), this.$block = this.element.find(".js-header-search"), this.$input = this.$block.find('input[type="text"]'), this.loading = !1, this.append = !1, this.scroll = !1, i.allowSearchFromUrl && this.searchFromUrl()
            },
            'input[type="text"] blur': function() {
                if (this.scroll) {
                    var t = this;
                    setTimeout(function() {
                        t.$scroll.mCustomScrollbar("update")
                    }, 400)
                }
            },
            ".js-search-button click": function() {
                this.$block.hasClass("show") ? this.hide() : this.show()
            },
            "{window} keyup": function(t, i) {
                27 == i.keyCode ? this.hide() : ""
            },
            "{window} click": function(i, e) {
                var s = t(e.target);
                s.hasClass("header-search") || s.parents(".header-search").length || s.hasClass("js-search-button") || this.hide()
            },
            "form submit": function(t, i) {
                i.preventDefault(), this.submit()
            },
            '.js-header-search input[type="text"] keyup': function(t, i) {
                t.val().length < 3 || (clearTimeout(this.timeout), this.timeout = setTimeout(function() {
                    this.submit()
                }.bind(this), 400))
            },
            submit: function() {
                !this.loading && t.trim(this.$input.val()) && (this.$scroll.addClass("loading"), this.append = !1, this.load(1))
            },
            load: function(i) {
                this.loading = !0, t.ajax({
                    type: "post",
                    url: this.path,
                    data: {
                        q: this.$input.val(),
                        page: i
                    },
                    success: this.success.bind(this)
                })
            },
            loadNext: function() {
                if (!this.loading) {
                    this.append = !0;
                    var t = this.$container.find(".js-ajax-loader");
                    t.hasClass("disabled") || (this.load(t.data("next-page")), t.remove())
                }
            },
            success: function(t) {
                var i = can.view("#ejs-template-search-results", t.data);
                this.initScroll(), this.$scroll.removeClass("loading"), this.loading = !1, t.success && (this.append ? this.$container.append(i) : this.$container.html(i))
            },
            show: function() {
                this.$body.addClass("header-search-opened locked"), this.$block.addClass("show"), this.$input.select(), setTimeout(function() {
                    this.$input.focus()
                }.bind(this), 500)
            },
            hide: function() {
                this.$body.removeClass("header-search-opened locked"), this.$block.removeClass("show")
            },
            initScroll: function() {
                var t = this;
                return i.Helper.isTouch() ? void this.$scroll.on("scroll", function(i) {
                    var e = i.currentTarget,
                        s = e.scrollTop,
                        n = e.scrollHeight - e.clientHeight - 200;
                    s > n && t.loadNext()
                }) : void(this.scroll || (this.scroll = !0, this.$scroll.mCustomScrollbar({
                    mouseWheelPixels: 100,
                    scrollInertia: 100,
                    callbacks: {
                        whileScrolling: function() {
                            var i = this.mcs.content.height() + (this.mcs.top - t.$scroll.height());
                            i < 500 && t.loadNext()
                        }
                    }
                })))
            },
            searchFromUrl: function() {
                var t = location.href;
                if (t.indexOf("/search") != -1) {
                    var i = {};
                    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(t, e, s) {
                        i[e] = decodeURI(s)
                    }), i.q && (this.element.find('.js-header-search input[type="text"]').val(i.q), this.load(), this.show())
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.MainSlider = can.Control.extend({
            defaults: {
                mainSlider: ".js-main-slider",
                slide: ".slide",
                sliderNav: ".js-main-slider-nav",
                sliderArrows: ".js-main-slider-arrows",
                sliderDots: ".js-main-slider-dots",
                navItem: ".nav-item",
                video: ".js-yt-video",
                videoProgress: ".js-video-progress",
                videoDotsCount: 100
            }
        }, {
            init: function() {
                1 != this.inited && (this.inited = !0, this.$body = t("body"), this.mouseX = 0, this.mouseY = 0, this.animationMouseX = 0, this.animationMouseY = 0, this.NavItemClick = !1, this.currentSlideIndex = 0, this.$videoProgress = this.element.find(this.options.videoProgress), this.$video = t(".page-content .page-background video"), this.$mainSlider = this.element.find(this.options.mainSlider), this.$slides = this.$mainSlider.find(this.options.slide), this.$sliderNav = this.element.find(this.options.sliderNav), this.getSizes(), this.generateNav(), this.initSlider(), this.generateVideoProgress(), this.initVideo())
            },
            "{window} load": function() {
                this.getSizes()
            },
            "{window} resize": function() {
                this.getSizes(), this.setVideoProgressDotsSize()
            },
            getSizes: function() {
                this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.sliderNavWidth = this.$sliderNav.width(), this.sliderNavTop = this.$sliderNav.offset().top, this.isMobile = i.Helper.isViewPortMobile()
            },
            initVideo: function() {
                if (void 0 != this.$video && !(this.$video.length < 1)) {
                    if (this.video = this.$video.get(0), void 0 == this.video) return void this.$video.hide();
                    this.videoControl = new i.Controls.Partial.HtmlVideo(this.$video), this.isVideoInited = !0, this.video.played || this._lockVideo(), this.video.onplaying = function() {
                        this._unlockVideo()
                    }.bind(this), this.video.onwaiting = function() {
                        this._lockVideo()
                    }.bind(this), this.timestamps = [], this.$slides.each(function(i, e) {
                        var s = t(e);
                        this.timestamps.push({
                            time: s.data("timestamp"),
                            slideIndex: i
                        })
                    }.bind(this)), setInterval(function() {
                        this.updateVideoProgress()
                    }.bind(this), 100), setInterval(function() {
                        this.checkVideoState()
                    }.bind(this), 1e3)
                }
            },
            _lockVideo: function() {
                this.isVideoReady = !1, this.element.addClass("locked-slider"), clearInterval(this.lockVideoInterval), this.lockVideoInterval = setInterval(function() {
                    this.animationMouseX += 20, this.animationMouseX > this.windowWidth && (this.animationMouseX = 0), this.animationMouseY = this.sliderNavTop - this.windowHeight / 6
                }.bind(this), 50)
            },
            _unlockVideo: function() {
                this.isVideoReady = !0, this.element.removeClass("locked-slider"), clearInterval(this.lockVideoInterval), this.animationMouseX = this.mouseX, this.animationMouseY = this.mouseY
            },
            updateVideoProgress: function() {
                if (!this.isMobile && this.isVideoInited && this.isVideoReady) {
                    var t = this.videoControl.getCurrentTime();
                    this.setVideoProgress(t);
                    var i;
                    this.timestamps.forEach(function(e) {
                        if (e.time <= t) {
                            var s = e.slideIndex;
                            (void 0 === i || i < s) && (i = s)
                        }
                    }.bind(this)), void 0 === i && (i = this.timestamps[this.timestamps.length - 1].slideIndex), i === -1 && (i = 0), i !== this.currentSlideIndex && this.$mainSlider.slick("slickGoTo", i)
                }
            },
            generateVideoProgress: function() {
                if (void 0 != this.$videoProgress && !(this.$videoProgress.length < 1)) {
                    for (var i = "", e = 5e3, s = .02, n = 0; n < this.options.videoDotsCount; n++) i += '<span class="dot" style="animation-delay: ' + e * s * n + 'ms"></span>';
                    this.$videoProgress.append(t(i)), this.$videoDots = this.$videoProgress.find(".dot"), this.setVideoProgressDotsSize()
                }
            },
            setVideoProgressDotsSize: function() {
                var t = this.$videoProgress.width(),
                    i = t / (2 * this.options.videoDotsCount);
                void 0 != this.$videoDots && (this.$videoDots.length < 1 || this.$videoDots.css({
                    height: i,
                    width: i,
                    "border-radius": i / 2
                }))
            },
            setVideoProgress: function(t) {
                if (this.isVideoInited && this.isVideoReady && void 0 != this.$videoDots && !(this.$videoDots.length < 1)) {
                    var i = .1,
                        e = t,
                        s = this.videoControl.getDuration(),
                        n = e / s,
                        o = Math.round(this.options.videoDotsCount * n);
                    this.$videoDots.css({
                        opacity: i
                    }), this.$videoDots.eq(o).css({
                        opacity: 1
                    });
                    for (var a = 1, r = .1, h = 0; a > i + r;) h++, a -= r, o + h <= this.options.videoDotsCount && this.$videoDots.eq(o + h).css({
                        opacity: a
                    }), o - h >= 0 && this.$videoDots.eq(o - h).css({
                        opacity: a
                    })
                }
            },
            checkVideoState: function() {
                void 0 != this.video && this.video.played && (this.isVideoReady || this._unlockVideo())
            },
            initSlider: function() {
                this.$mainSlider.on("init", function(t, i) {
                    this.beforeChangeSlide(t, i, -1, 0)
                }.bind(this)), this.$mainSlider.slick({
                    arrows: !1,
                    appendArrows: this.element.find(this.options.sliderArrows),
                    appendDots: this.element.find(this.options.sliderDots),
                    infinite: !1,
                    prevArrow: '<a href="javascript:void(0);" class="slick-prev"></a>',
                    nextArrow: '<a href="javascript:void(0);" class="slick-next"></a>',
                    fade: !0,
                    touchThreshold: 20,
                    swipe: !1,
                    draggable: !1,
                    responsive: [{
                        breakpoint: i.ViewPort.mobile,
                        settings: {
                            arrows: !0,
                            adaptiveHeight: !0,
                            dots: !0,
                            swipe: !0,
                            draggable: !0
                        }
                    }]
                }), this.$mainSlider.on("beforeChange", function(t, i, e, s) {
                    this.beforeChangeSlide(t, i, e, s)
                }.bind(this))
            },
            beforeChangeSlide: function(t, i, e, s) {
                this.currentSlideIndex = s, this.$sliderNavItems.removeClass("active").removeClass("active-section");
                var n = i.$slides.eq(s),
                    o = this.$sliderNavItems.filter('[data-slide-index="' + s + '"]');
                o.addClass("active");
                var a = o.data("section"),
                    r = this.$sliderNavItems.filter('[data-section-item="true"][data-section="' + a + '"]');
                if (r.addClass("active-section"), this.NavItemClick && this.isVideoInited && this.isVideoReady) {
                    var h = n.data("timestamp");
                    this.videoControl.goTo(h)
                }
                this.NavItemClick = !1
            },
            "{navItem} click": function(t) {
                var i = t.data("slide-index");
                this.NavItemClick = !0, this.$mainSlider.slick("slickGoTo", i)
            },
            "{window} mousemove": function(t, i) {
                this.mouseX = i.pageX, this.mouseY = i.pageY, this.isVideoReady && (this.animationMouseX = this.mouseX, this.animationMouseY = this.mouseY)
            },
            generateNav: function() {
                var i = "",
                    e = 0;
                this.$slides.each(function(s, n) {
                    var o = t(n),
                        a = void 0 != o.data("section-item"),
                        r = o.data("section"),
                        h = "nav-item";
                    a && (h += " section", e += 2e3);
                    for (var l = "", d = 0; d < 10; d++) l += '<span class="line"></span>';
                    l += '<div data-slide-index="' + s + '" class="' + h + '" data-section="' + r + '" data-section-item="' + a + '">', a && (l += '<div class="item-title">' + r + "</div>"), l += "</div>", i += l
                }.bind(this)), this.$sliderNav.append(i), this.$sliderNavItems = this.$sliderNav.find(this.options.navItem), this.$waveElements = this.$sliderNav.find(".line, " + this.options.navItem), this.waveElementsCount = this.$waveElements.length, this.animateWaveLoop()
            },
            animateWaveLoop: function() {
                this.$body.hasClass("top-menu-opened") || this.isMobile || i.Helper.AnimateWave({
                    windowWidth: this.windowWidth,
                    windowHeight: this.windowHeight,
                    mouseX: this.animationMouseX,
                    mouseY: this.animationMouseY,
                    navTop: this.sliderNavTop,
                    navWidth: this.sliderNavWidth,
                    elements: this.$waveElements,
                    elementsCount: this.waveElementsCount
                }), requestAnimFrame(function() {
                    this.animateWaveLoop()
                }.bind(this))
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.WhiskeyBreakSlider = can.Control.extend({
            defaults: {
                slider: ".js-slider",
                thumbSlider: ".js-thumbs",
                thumbMobileSlider: ".js-mobile-thumbs",
                thumb: ".thumb",
                activeClass: "slick-current",
                thumbsCount: 11
            }
        }, {
            init: function() {
                this.$slider = this.element.find(this.options.slider), this.$thumbSlider = this.element.find(this.options.thumbSlider), this.$thumbMobileSlider = this.element.find(this.options.thumbMobileSlider), this.$thumbs = this.$thumbSlider.find(this.options.thumb), this.$thumbs.eq(0).addClass(this.options.activeClass), this.$slider.slick({
                    asNavFor: this.options.thumbMobileSlider,
                    adaptiveHeight: !0,
                    fade: !0,
                    infinite: !1,
                    prevArrow: '<a href="javascript:void(0);" class="slick-prev"></a>',
                    nextArrow: '<a href="javascript:void(0);" class="slick-next"></a>'
                }).on("beforeChange", function(t, i, e, s) {
                    this.setActiveThumb(s)
                }.bind(this)), this.$thumbSlider.slick({
                    arrows: !1,
                    fade: !0,
                    infinite: !1
                }), this.$thumbMobileSlider.slick({
                    arrows: !1,
                    asNavFor: this.options.slider,
                    infinite: !1,
                    slidesToShow: 5,
                    focusOnSelect: !0,
                    responsive: [{
                        breakpoint: 560,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 450,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                })
            },
            "{thumb} click": function(t) {
                t.hasClass(this.options.activeClass) || this.$slider.slick("slickGoTo", t.data("slide-index"))
            },
            setActiveThumb: function(t) {
                this.$thumbs.removeClass(this.options.activeClass), this.$thumbs.filter('[data-slide-index="' + t + '"]').addClass(this.options.activeClass);
                var i = Math.floor(t / this.options.thumbsCount);
                this.$thumbSlider.slick("slickGoTo", i)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.WhiskeyMouseDown = can.Control.extend({
            init: function() {
                this.$win = t(window), this.height = this._getTarget(), this.height = this.height ? this.height : 650
            },
            click: function() {
                t.scrollTo(this.height, 400)
            },
            "{window} scroll": function() {
                this.$win.scrollTop() >= this.height && this.element.fadeOut()
            },
            _getTarget: function() {
                var i = this.element.data("target");
                if (!i) return !1;
                var e = t(i).eq(0);
                return !!e.length && e.offset().top - 100
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ProductSliders = can.Control.extend({
            defaults: {
                miniSlideWidth: 64
            }
        }, {
            init: function() {
                this.$win = t(window), this.$info = this.element.find(".js-feedback-info"), this.$title = this.$info.find(".js-feedback-title"), this.$name = this.$info.find(".js-feedback-name"), this.$company = this.$info.find(".js-feedback-company"), this.$text = this.$info.find(".js-feedback-text"), this.$feedbackMainSlider = this.element.find(".js-feedback-main-slider"), this.$feedbackMiniSlider = this.element.find(".js-feedback-mini-slider"), this.$mainSlides = this.$feedbackMainSlider.find(".slide"), this.$feedbackMainSlider.slick({
                    slidesToShow: 1,
                    prevArrow: '<a href="javascript:void(0);" class="slick-prev"></a>',
                    nextArrow: '<a href="javascript:void(0);" class="slick-next"></a>',
                    touchThreshold: 20,
                    asNavFor: ".js-feedback-mini-slider"
                }), this.$feedbackMiniSlider.slick({
                    infinite: !0,
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    arrows: !1,
                    touchThreshold: 20,
                    focusOnSelect: !0,
                    asNavFor: ".js-feedback-main-slider",
                    responsive: [{
                        breakpoint: i.ViewPort.mobile,
                        settings: {
                            variableWidth: !0,
                            slidesToShow: this._getMiniSlideWidth()
                        }
                    }]
                }), this.$feedbackMainSlider.on("beforeChange", this.beforeChange.bind(this)), this.setSlideInfo(0)
            },
            beforeChange: function(t, i, e, s) {
                this.setSlideInfo(s)
            },
            setSlideInfo: function(t) {
                var i = this.$mainSlides.eq(t);
                this.$title.html(i.data("title")), this.$name.html(i.data("name")), this.$company.html(i.data("company")), this.$text.html(i.data("text"))
            },
            _getMiniSlideWidth: function() {
                var t = this.$win.width();
                return Math.floor(t / this.options.miniSlideWidth)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ProductTriggers = can.Control.extend({
            init: function() {
                this.$triggers = this.element.find(".js-triggers a"), this.$targets = this.element.find(".js-trigger-target"), this.targets = this._prepareTargets(), this.$triggers.eq(0).click()
            },
            ".js-triggers a click": function(t) {
                this.$triggers.removeClass("active"), t.addClass("active"), this.setActive(t.index())
            },
            setActive: function(i) {
                this.$targets.removeClass("last").filter(".active").addClass("last"), this.$targets.removeClass("active"), t.each(this.targets, function(t, e) {
                    e.eq(i).hasClass("active") || e.eq(i).addClass("active")
                })
            },
            _prepareTargets: function() {
                var i = [],
                    e = this.element.find(".js-trigger-targets");
                return e.each(function(e) {
                    i[e] = t(this).find(".js-trigger-target")
                }), i
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ProductParallax = can.Control.extend({
            init: function() {
                i.Helper.isMobile || skrollr.init(i.Helper.defaultSkrollrSettings)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.BlogLoader = can.Control.extend({
            defaults: {
                events: {
                    load: "load"
                }
            }
        }, {
            init: function() {
                this.$win = t(window), this.$doc = t(document), this.title = t("title").text(), this.container = this.element.find(".js-container"), this.$pager = this.element.find(".js-pager"), this.path = this.$pager.data("path"), this.loading = !1, this._resize(), this._scroll()
            },
            "{events.load}": function(t, i, e) {
                this.load(e.page)
            },
            "{window} scroll": function() {
                this._scroll()
            },
            "{window} resize": function() {
                this._resize()
            },
            _resize: function() {
                this.winHeight = this.$win.height(), this.docHeight = this.$doc.height(), this.diff = this.docHeight - this.winHeight - i.LoaderOffset
            },
            _scroll: function() {
                this.diff <= this.$win.scrollTop() && this.load()
            },
            load: function(i) {
                i = i || !1;
                var e = !1;
                0 == i && this.$pager.hasClass("disabled") || this.loading || (this.loading = !0, this.page = this.$pager.data("page"), this.sectionId = this.$pager.data("section-id"), this.sectionCode = this.$pager.data("section-code"), i ? e = !0 : i = this.page, t.ajax({
                    type: "post",
                    url: this.path,
                    data: {
                        page: i,
                        sectionId: this.sectionId,
                        sectionCode: this.sectionCode
                    },
                    success: this.success.bind(this, e, i)
                }))
            },
            success: function(i, e, s) {
                this.loading = !1;
                var n = t(s.html);
                n.find(".blog-item").addClass("blog-item-animated"), this.$pager.remove(), i ? (this.container.html(n), this.options.pagerWrap.trigger("enable", {
                    page: e
                }), t.scrollTo(0, 300)) : this.container.append(n), this.$pager = this.element.find(".js-pager"), this._resize(), this.options.pagerWrap.trigger("update")
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.SubscribeForm = can.Control.extend({
            init: function() {
                this.$wrap = this.element, this.$submit = this.element.find(".js-submit-subscribe"), this.$form = this.element.find("form"), this.path = this.$form.attr("action"), this.disabled = !0, this.validator = this.$form.validate({
                    highlight: this._highlight.bind(this),
                    unhighlight: this._unhighlight.bind(this)
                })
            },
            ".js-terms change": function(t, i) {
                1 == t.prop("checked") ? (this.disabled = !1, this.$submit.removeClass("disabled")) : (this.disabled = !0, this.$submit.addClass("disabled"))
            },
            "form submit": function(i, e) {
                e.preventDefault(), this.disabled || !this.$form.valid() || this.$wrap.hasClass("loading") || (this.$wrap.addClass("loading"), t.ajax({
                    type: "post",
                    url: this.path,
                    data: this.$form.serialize(),
                    success: this.success.bind(this)
                }))
            },
            ".js-submit-subscribe click": function() {
                this.disabled || this.$form.submit()
            },
            success: function(t) {
                this.$wrap.removeClass("loading"), t.success ? this.showSuccess() : (this.validator.showErrors(t.errors), this.showError())
            },
            showError: function() {
                this.$wrap.addClass("error")
            },
            hideError: function() {
                this.$wrap.removeClass("error")
            },
            showSuccess: function() {
                this.$wrap.removeClass("error"), this.$wrap.addClass("success");
                var t = this.$form.data("ya-goal");
                t && "undefined" != typeof dataLayer && dataLayer.push({
                    event: t
                })
            },
            _highlight: function(t, i) {
                this.showError()
            },
            _unhighlight: function(t, i) {
                this.hideError()
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.PostAutoloader = can.Control.extend({
            init: function() {
                this.$win = t(window), this.$title = t("title"), this.winHeight = this.$win.height(), this.$container = this.element.find(".js-posts"), this.$progressBar = t(".js-blog-progress"), this.loadPrevPath = this.$container.data("load-prev-path"), this.loadingFlag = !1, this.stopFlag = !1, this.$active = this.$container.find(".js-post").last(), this.$progressBar.css("background", this.$active.data("color")), this.initCurrentBlock();
                var e = this.$current.data("vk-likes-count");
                e && setTimeout(function() {
                    this.element.find(".likely__counter_vkontakte").eq(0).html(e).removeClass("likely__counter_empty")
                }.bind(this), 3e3), this.domain = i.Helper.StrReplace(["www.", "blog."], ["", ""], window.location.host), this.subscribePopupHandler()
            },
            "{window} load": function() {
                this.load()
            },
            initCurrentBlock: function() {
                return this.$items = this.$container.find(".js-post"), this.$current = this.$items.last(), this.$loadData = this.$current.find(".js-previous"), this.$loadData.length ? (this.prevId = this.$loadData.data("id"), this.$container.attr("data-current-id", this.$active.data("id")), this.element.find(".js-clear-text").each(function() {
                    new i.Controls.Partial.ClearText(t(this))
                }), void this.element.find(".tilda-post table:not(.stacktable)").stacktable(i.Helper.defaultStacktableSettings)) : void(this.stopFlag = !0)
            },
            "{window} scroll": function() {
                this.scroll()
            },
            "{window} resize": function() {
                this.calcPeriods()
            },
            scroll: function() {
                var t = this.$win.scrollTop();
                this.getActive(t)
            },
            load: function() {
                this.stopFlag || this.loadingFlag || (this.loadingFlag = !0, t.ajax({
                    type: "post",
                    url: this.loadPrevPath,
                    data: {
                        id: this.prevId
                    },
                    success: this.success.bind(this)
                }))
            },
            success: function(e) {
                this.loadingFlag = !1, this.$container.append(e.html), this.initCurrentBlock(), this.calcPeriods(), this.scroll(), this.subscribePopupHandler(), likely.initiate(), this.element.find(".js-post:not(.inited)").not(".inited").each(function() {
                    new i.Controls.Partial.PostItem(t(this))
                })
            },
            calcPeriods: function() {
                var i = this;
                this.periods = [], this.$items.each(function(e) {
                    var s = t(this),
                        n = s.outerHeight(),
                        o = s.offset().top,
                        a = o + n,
                        r = [o, a];
                    0 == e && (r[0] = 0), i.periods.push(r)
                })
            },
            getActive: function(t) {
                if (!(this.$items.length < 2)) {
                    for (var i = 0, e = 0; e < this.periods.length; e++)
                        if (t >= this.periods[e][0] && t < this.periods[e][1]) {
                            var s = this.periods[e];
                            this.$active = this.$items.eq(e), i = e;
                            break
                        } var n = t - s[0],
                        o = s[1] - s[0],
                        a = n / o,
                        r = parseInt(100 * a),
                        h = s[1] - t,
                        l = (h / 1e3).toFixed(1),
                        d = l <= .1 ? "none" : "block";
                    if (this.$progressBar.css("width", r + "%"), this.$items.removeClass("active-page"), this.$active.addClass("active-page").next().find(".js-next-overlay").css({
                            opacity: l,
                            display: d
                        }), this.$container.attr("data-current-id") != this.$active.data("id")) {
                        this.calcPeriods(), history.replaceState({}, null, this.$active.data("relative-url")), this.$progressBar.css("background", this.$active.data("color")), this.$title.html(this.$active.data("title")), this.$active.find(".js-next-overlay").hide(), this.$items.find(".js-disqus-thread").removeAttr("id"), this.$active.find(".js-disqus-thread").attr("id", "disqus_thread"), this.$active.next().length || this.load();
                        var c = this.$active.data("vk-likes-count");
                        c && this.$active.find(".likely__counter_vkontakte").html(c).removeClass("likely__counter_empty")
                    }
                    this.$container.attr("data-current-id", this.$active.data("id"))
                }
            },
            subscribePopupHandler: function() {
                if (!i.subscribePopupUrl) return !1;
                var e = Cookies.get("VIEW_POST_COUNTER_FOR_SUBSCRIBE_POPUP");
                e = parseInt(e), e = isNaN(e) ? 0 : e + 1;
                var s = Cookies.get("IS_SUBSCRIBER");
                if (e >= 5 && !s) {
                    e = 0;
                    var n = i.Helper.defaultFancyboxSettings;
                    n.href = i.subscribePopupUrl, n.type = "ajax";
                    var o = new Date((new Date).getTime() + 2592e6);
                    Cookies.set("IS_SUBSCRIBER", 1, {
                        expires: o,
                        domain: this.domain
                    }), t.fancybox(n)
                }
                Cookies.set("VIEW_POST_COUNTER_FOR_SUBSCRIBE_POPUP", e, {
                    domain: this.domain
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.PostComments = can.Control.extend({
            init: function() {
                this.$win = t(window), this.$body = t("body"), this.$header = t(".js-header"), this.$comments = this.element.find(".js-comments-block")
            },
            "{window} click": function(i, e) {
                var s = t(e.target);
                s.hasClass("comments-block-overlay") && this.close()
            },
            "{window} keyup": function(t, i) {
                27 == i.keyCode && this.close()
            },
            ".js-open-comments click": function(t) {
                this.open(t)
            },
            ".js-close-comments click": function(t) {
                this.close()
            },
            close: function() {
                this.$comments.removeClass("show"), this.$header.removeClass("hide"), this.$body.removeClass("lock"), this.$body.removeClass("comments-opened")
            },
            open: function(t) {
                this.$comments.addClass("show"), this.$header.addClass("hide"), this.$body.addClass("lock"), this.$body.addClass("comments-opened");
                var e = t.parents(".js-post"),
                    s = (e.data("xml-id"), e.data("url"));
                i.Helper.isIos && this.$comments.css({
                    position: "absolute",
                    top: this.$win.scrollTop()
                }), "undefined" != typeof DISQUS && DISQUS.reset({
                    reload: !0,
                    config: function() {
                        this.page.url = s
                    }
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.PostItem = can.Control.extend({
            init: function() {
                this.element.addClass("inited"), this.initButtonGroups()
            },
            initButtonGroups: function() {
                var t = this.element.find(".js-button-group");
                if (t.length) {
                    t.addClass("show");
                    var i = this.element.find(".t001__descr").eq(0);
                    i.length && (t.insertAfter(i), t.addClass("under-title"))
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ProcessVimeo = can.Control.extend({
            init: function() {
                this.$wrap = this.element.find(".js-video-wrap"), this.$iframe = this.$wrap.find("iframe"), this.iframe = this.$iframe[0], this.player = $f(this.iframe), this.$iframe.reframe(), this.player.addEvent("ready", this.ready.bind(this)), this.player.addEvent("play", this.play.bind(this)), this.player.addEvent("pause", this.stop.bind(this))
            },
            ".js-video-play-btn click": function() {
                this.$wrap.hasClass("play") ? this.stop() : this.play()
            },
            ready: function() {
                this.player.addEvent("playProgress", this.playProgress.bind(this)), this.player.addEvent("finish", this.finish.bind(this))
            },
            play: function() {
                this.$wrap.addClass("play"), this.player.api("play")
            },
            stop: function() {
                this.$wrap.removeClass("play"), this.player.api("pause")
            },
            finish: function() {
                this.$wrap.removeClass("play")
            },
            playProgress: function(t) {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ProcessMenu = can.Control.extend({
            defaults: {
                showClass: "show",
                current: ".js-current",
                menu: ".js-aside-nav",
                form: ".js-form-wrap"
            }
        }, {
            init: function() {
                this.$win = t(window), this.$menu = this.element.find(this.options.menu), this.$form = this.element.find(this.options.form), this.resize()
            },
            "{window} resize": function() {
                this.resize()
            },
            "{window} scroll": function() {
                this.scroll()
            },
            "{current} mouseenter": function() {
                this.showMenu()
            },
            "{menu} mouseleave": function(i, e) {
                this.isToggle() || 0 !== t(e.relatedTarget).closest(".site-nav-inner").length || this.hideMenu()
            },
            "{menu} .current click": function(t, i) {
                i.preventDefault()
            },
            resize: function() {
                this.formTop = this.$form.offset().top, this.scroll()
            },
            scroll: function() {
                this.$menu.toggleClass(this.options.showClass, this.isToggle())
            },
            showMenu: function() {
                this.$menu.addClass(this.options.showClass)
            },
            hideMenu: function() {
                this.$menu.removeClass(this.options.showClass)
            },
            isToggle: function() {
                var t = this.$win.scrollTop();
                return t > this.$form.offset().top - this.$win.height() || 0 === t
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Partial.ContactsMap = can.Control.extend({
            init: function() {
                ymaps.ready(this.initMap.bind(this))
            },
            initMap: function() {
                this.$map = this.element.find(".js-map"), this.$triggers = this.element.find(".js-address-coords"), this.$closeBtn = this.element.find(".js-map-close"), this.$header = this.element.find(".header"), this.data = this._getData(), this.map = new ymaps.Map("map", {
                    center: [this.data.msk[0], this.data.msk[1]],
                    zoom: 17,
                    controls: []
                }), this.addPins(), this.$triggers.on("click", this.show.bind(this)), this.$closeBtn.on("click", this.close.bind(this))
            },
            addPins: function() {
                var t = new ymaps.Placemark([this.data.msk[0], this.data.msk[1]], {}, {
                        iconLayout: "default#image",
                        iconImageHref: "/local/images/map-pin-msk.svg",
                        iconImageSize: [51, 63]
                    }),
                    i = new ymaps.Placemark([this.data.brn[0], this.data.brn[1]], {}, {
                        iconLayout: "default#image",
                        iconImageHref: "/local/images/map-pin-brn.svg",
                        iconImageSize: [51, 63]
                    });
                this.map.geoObjects.add(t), this.map.geoObjects.add(i)
            },
            show: function(i) {
                var e = t(i.currentTarget),
                    s = this.data[e.data("code")];
                this.$header.addClass("black"), this.$map.addClass("show"), this.map.panTo([s[0], s[1]], {
                    flying: !1,
                    delay: 0
                })
            },
            close: function() {
                this.$header.removeClass("black"), this.$map.removeClass("show")
            },
            _getData: function() {
                var i = this.$triggers,
                    e = {};
                return i.each(function() {
                    var i = t(this);
                    e[i.data("code")] = [i.data("lan"), i.data("lat")]
                }), e
            }
        })
    }(jQuery, window.APP),
    function(t, i, e) {
        i.Controls.Form.LoopForm = can.Control.extend({
            defaults: {
                items: i.Inputs
            }
        }, {
            init: function() {
                this.fields = this.element.find(this.options.items).filter(":visible"), this.first = this.fields.first(), this.last = this.fields.last(), this.fields.length >= 1 && (this.last.on("keydown", this.focusFirst.bind(this)), this.first.on("keydown", this.focusLast.bind(this)))
            },
            focusFirst: function(t) {
                9 != t.keyCode || t.shiftKey || (t.preventDefault(), this.first.focus())
            },
            focusLast: function(t) {
                9 == t.keyCode && t.shiftKey && (t.preventDefault(), this.last.focus())
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.Placeholders = can.Control.extend({
            defaults: {
                input: i.Inputs,
                filledClass: "filled",
                focusClass: "focus",
                inputContainer: ".input",
                select: ".js-select"
            }
        }, {
            init: function() {
                this.$inputList = this.element.find(this.options.input), this.$inputList.each(function(i, e) {
                    this.checkPlaceholder(t(e))
                }.bind(this)), this.$inputList.on("changeValue", function(i) {
                    this.checkPlaceholder(t(i.target))
                }.bind(this))
            },
            "{input} focus": function(t) {
                var i = t.closest(this.options.inputContainer);
                i.addClass(this.options.focusClass), this.checkPlaceholder(t)
            },
            "{input} focusout": function(t) {
                var i = t.closest(this.options.inputContainer);
                i.removeClass(this.options.focusClass), this.checkPlaceholder(t)
            },
            "{input} keyup": function(t) {
                this.checkPlaceholder(t)
            },
            "{input} keydown": function(t) {
                this.checkPlaceholder(t)
            },
            "{input} change": function(t) {
                this.checkPlaceholder(t)
            },
            checkPlaceholder: function(t) {
                var i = t.closest(this.options.inputContainer),
                    e = t.val(),
                    s = !1;
                void 0 != e && (s = e.length > 0), i.toggleClass(this.options.filledClass, s)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.CustomFile = can.Control.extend({
            defaults: {
                events: {
                    clear: "clear",
                    clearError: "clearError",
                    fill: "fill"
                }
            }
        }, {
            init: function() {
                this.$form = this.element.closest("form"), this.$container = this.element, this.$input = this.$container.find('input[type="file"]'), this.$label = this.$container.find(".file-label"), this.$fileIdInput = this.$container.find(".file-id-input"), this.fileSize = parseInt(this.$form.data("file-size")), void 0 == this.fileSize && (this.fileSize = 0), this.fileError = this.$form.data("file-error"), void 0 == this.fileError && (this.fileError = ""), this.extension = this.$form.data("file-extension"), void 0 == this.extension && (this.extension = "");
                var t = this;
                this.$input.dropzone({
                    maxFiles: 1,
                    maxFilesize: this.fileSize,
                    acceptedFiles: this.extension,
                    url: "/feedback/upload-file/",
                    dictDefaultMessage: "Прикрепите файл",
                    dictInvalidFileType: "Невозможно загрузить файл такого типа",
                    dictFileTooBig: "Слишком большой файл",
                    sending: function() {
                        t.$container.addClass("loading"), t.$label.html("Загрузка..."), t.hideError()
                    },
                    uploadprogress: function(i) {
                        i.size > 1024 * t.fileSize * 1024 || void 0 == i.name ? (t.showError(), t.clearInput()) : t.$label.html("Загрузка&nbsp;&nbsp;" + Math.round(i.upload.progress) + "%")
                    },
                    success: function(i, e) {
                        t.checkAnswer(i, e)
                    },
                    error: function(i, e) {
                        t.checkAnswer(i, e), this.removeAllFiles(!0)
                    },
                    accept: function(t, i) {
                        i()
                    },
                    init: function() {
                        this.on("addedfile", function() {
                            null != this.files[1] && this.removeFile(this.files[0])
                        })
                    }
                })
            },
            'input[type="file"] click': function(t, i) {
                i.preventDefault()
            },
            "{events.clear}": function() {
                this.clearInput()
            },
            "{events.fill}": function(t, i, e) {
                var s = {
                        name: e.name
                    },
                    n = {
                        id: this.$fileIdInput.val()
                    };
                this.fillInput(s, n, !1)
            },
            "{events.clearError}": function() {
                this.hideError()
            },
            ".remove-file click": function() {
                this.clearInput()
            },
            fillInput: function(t, i, e) {
                e = e || !0, this.$container.addClass("filled"), this.$label.html(t.name), this.$fileIdInput.attr("data-file", t.name), this.$fileIdInput.val(i.id), e && this.$fileIdInput.change()
            },
            clearInput: function() {
                this.$container.removeClass("filled"), this.$label.html("Прикрепить файл"), this.$input.val(""), this.$input[0].dropzone.removeAllFiles(), this.$fileIdInput.val("")
            },
            checkAnswer: function(t, i) {
                return this.$container.removeClass("loading"), void 0 == t || void 0 == i ? void this.clearInput() : i.success ? t.size > 1024 * this.fileSize * 1024 || void 0 == t.name ? (this.showError(), void this.clearInput()) : void this.fillInput(t, i, !0) : (this.showError(), void this.clearInput())
            },
            showError: function() {
                this.$container.addClass("error"), this.$container.append('<label class="error" for="' + this.$input.attr("id") + '">' + this.fileError + "</label>")
            },
            hideError: function() {
                this.$container.removeClass("error"), this.$container.find("label.error").remove()
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        t.extend(t.validator.messages, {
            required: "Заполните меня. Ну По-жаааа-луй-ста 🐱",
            remote: "Пожалуйста, введите правильное значение.",
            email: "Пожалуйста, введите корректный адрес электронной почты.",
            url: "Пожалуйста, введите корректный URL.",
            date: "Пожалуйста, введите корректную дату.",
            dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
            number: "Пожалуйста, введите число.",
            digits: "Пожалуйста, вводите только цифры.",
            creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
            equalTo: "Пожалуйста, введите такое же значение ещё раз.",
            extension: "Пожалуйста, загрузите изображение, документ или архив.",
            maxlength: t.validator.format("Пожалуйста, введите не больше {0} символов."),
            minlength: t.validator.format("Пожалуйста, введите не меньше {0} символов."),
            rangelength: t.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
            range: t.validator.format("Пожалуйста, введите число от {0} до {1}."),
            max: t.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
            min: t.validator.format("Пожалуйста, введите число, большее или равное {0}.")
        }), t.validator.setDefaults({
            ignore: []
        }), i.Controls.Form.Base = can.Control.extend({
            init: function() {
                if (new i.Controls.Form.Placeholders(this.element), new i.Controls.Form.LoopForm(this.element), this.$customFiles = this.element.find(".file-input"), this.$customFiles.each(function() {
                        new i.Controls.Form.CustomFile(t(this))
                    }), this.element.find(".js-word").val(i.Word), !i.Helper.isMobile) {
                    var e = this.element.find("textarea");
                    e.scrollbar(), e.each(function() {
                        t(this).parents(".scroll-textarea").addClass("scrollbar-outer")
                    })
                }
                this.validate()
            },
            validate: function() {
                this.validator = this.element.validate({
                    focusInvalid: !0,
                    onfocusout: !1,
                    onclick: !1,
                    highlight: function(i) {
                        var e = t(i);
                        e.closest(".input").addClass("error")
                    },
                    unhighlight: function(i) {
                        var e = t(i);
                        e.closest(".input").removeClass("error")
                    },
                    submitHandler: function() {
                        this.element.valid() ? this.submitForm() : this.validator.focusInvalid()
                    }.bind(this)
                })
            },
            submitForm: function() {
                this.$customFiles.trigger("clearError"), t.ajax({
                    url: this.element.attr("action"),
                    method: this.element.attr("method") || "post",
                    dataType: "json",
                    data: this.element.serialize(),
                    beforeSend: this.beforeSend.bind(this),
                    success: this.checkAnswer.bind(this),
                    error: this.checkAnswer.bind(this)
                })
            },
            onError: function(t) {},
            onSuccess: function(t) {},
            clearForm: function() {
                this.element.get(0).reset(), this.element.find(i.Inputs).trigger("change"), this.$customFiles.trigger("clear"), this.element.find(".js-request-id").val(""), this.element.find(".input.error").removeClass("error")
            },
            beforeSend: function() {
                this.element.addClass("load")
            },
            checkAnswer: function(i) {
                var e = this.element;
                if (this.element.removeClass("load"), this.clearForm(), void 0 != i) {
                    if (i.success && this.onSuccess(i), void 0 != i.message && i.success) {
                        var s = "ejs-template-success-popup",
                            n = can.view.render(s, {
                                title: i.message.title,
                                text: i.message.text,
                                bg: i.message.bg
                            });
                        t.fancybox.open({
                            content: n,
                            wrapCSS: "dark"
                        })
                    } else this.onError(i);
                    if (i.success) {
                        var o = e.data("ya-goal");
                        o && "undefined" != typeof yaCounter1791280 && yaCounter1791280.reachGoal(o), o && "undefined" != typeof yaCounter7396657 && yaCounter7396657.reachGoal(o), o && "undefined" != typeof dataLayer && dataLayer.push({
                            event: o
                        })
                    }
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.Feedback = i.Controls.Form.Base.extend({
            defaults: {
                events: {
                    update: "update",
                    clear: "clear"
                }
            }
        }, {
            init: function() {
                this._super(), this.domain = i.Helper.StrReplace(["www.", "blog."], ["", ""], window.location.host), this.$form = t('form[data-form-type="feedback"]').not(this.element), this.prefix = this.element.find('input[name="PREFIX"]').val() + "_", this.inputs = this.element.find('input[type="text"], textarea, .js-request-id, .file-id-input'), this.$id = this.element.find(".js-request-id"), this.$customFiles = this.element.find(".file-input"), this.$fileInput = this.$customFiles.find(".file-id-input"), this.disableSend = !1, this.populate()
            },
            'input[type="text"] change': function() {
                this.send(), this.collect()
            },
            "textarea change": function() {
                this.send(), this.collect()
            },
            ".file-id-input change": function() {
                this.data.FILE_NAME = this.$fileInput.attr("data-file"), this.data.FILE_ID = this.$fileInput.val(), this._setCookie(this.data)
            },
            "{events.update}": function() {
                this.populate()
            },
            "{events.clear}": function() {
                this._setCookie({}), this.inputs.each(function() {
                    t(this).val("")
                }), this.$customFiles.find(".file-id-input").removeAttr("data-file"), this.element.find(i.Inputs).trigger("keyup")
            },
            populate: function() {
                this.data = Cookies.getJSON("feedback") || {}, "object" != typeof this.data || t.isEmptyObject(this.data) || this.inputs.each(this._populate.bind(this))
            },
            collect: function() {
                this.disableSend || (this.inputs.each(this._collect.bind(this)), this._setCookie(this.data), this.$form.each(function() {
                    t(this).trigger("update")
                }))
            },
            _populate: function(e, s) {
                var n = i.Helper.StrReplace(this.prefix, "", s.getAttribute("name"));
                s.value = this.data[n], t(s).trigger("changeValue"), "FILE_ID" == n && this.data.FILE_NAME && this.$customFiles.trigger("fill", {
                    name: this.data.FILE_NAME
                })
            },
            _collect: function(t, e) {
                var s = i.Helper.StrReplace(this.prefix, "", e.getAttribute("name"));
                this.data[s] = e.value, "FILE_ID" == s && this.data.FILE_ID && (this.data.FILE_NAME = e.getAttribute("data-file")), "FILE_ID" != s || this.data.FILE_ID || (this.data.FILE_NAME = "")
            },
            clearForm: function() {
                this._super(), this._setCookie({}), this.$customFiles.find(".file-id-input").removeAttr("data-file")
            },
            send: function() {
                this.disableSend || t.ajax({
                    type: "post",
                    url: "/feedback/save/",
                    data: this.element.serialize(),
                    success: this.success.bind(this)
                })
            },
            success: function(t) {
                this.$id.val(t.id), this.collect()
            },
            submitForm: function() {
                this._super(), this.disableSend = !0
            },
            checkAnswer: function(i) {
                var e = this.element;
                if (this._super(i), this.disableSend = !1, this.$form.each(function() {
                        t(this).trigger("clear")
                    }), i.success) {
                    var s = e.data("ya-goal");
                    s && "undefined" != typeof yaCounter1791280 && yaCounter1791280.params({
                        feedbackId: i.id
                    }), s && "undefined" != typeof yaCounter7396657 && yaCounter7396657.params({
                        feedbackId: i.id
                    }), "undefined" != typeof fbq && fbq("track", "InitiateCheckout")
                }
            },
            _setCookie: function(t) {
                Cookies.set("feedback", t, {
                    expires: .023809523809523808,
                    domain: this.domain
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.Planning = i.Controls.Form.Base.extend({
            defaults: {
                countInput: ".js-count"
            }
        }, {
            init: function() {
                this._super(), this.$countInput = this.element.find(this.options.countInput), this.$price = this.element.find(".js-price")
            },
            "{countInput} keyup": function() {
                this.setPrice()
            },
            "{countInput} change": function() {
                this.setPrice()
            },
            setPrice: function() {
                var t = parseInt(this.$countInput.val());
                if (isNaN(t)) return this.$countInput.val(""), void this.$price.text(0);
                t < 1 && (t = 1, this.$countInput.val(1)), t > 10 && (t = 10, this.$countInput.val(10));
                var i = 2e3 + 700 * (t - 1);
                this.$price.text(i)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.Cat = i.Controls.Form.Base.extend({
            init: function() {
                this._super()
            },
            checkAnswer: function(t) {
                this._super(t), t.success && Cookies.set("cat_lid", "1", {
                    expires: 1e4
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.Wanted = i.Controls.Form.Base.extend({
            init: function() {
                this._super()
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Form.SubscribeTriggerForm = i.Controls.Form.Base.extend({
            init: function() {
                this._super()
            },
            onError: function(t) {
                this.validator.showErrors(t.errors)
            },
            onSuccess: function(t) {
                this._super();
                var e = i.Helper.StrReplace(["www.", "blog."], ["", ""], window.location.host),
                    s = new Date((new Date).getTime() + 2592e6);
                Cookies.set("IS_SUBSCRIBER", 1, {
                    expires: s,
                    domain: e
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Popup.Base = can.Control.extend({
            init: function() {
                i.Helper.initForms(this.element, "form[data-form-type]"), setTimeout(function() {
                    this.element.find(i.Inputs).each(function(i, e) {
                        var s = t(e),
                            n = s.val();
                        if (void 0 == n || n.length < 1) return s.focus(), !1
                    })
                }.bind(this), 500)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Init = can.Control.extend({
            init: function() {
                this.initPartials(), this.initFormController(), this.initPageProgress(), new i.Controls.Partial.Header(this.element.find(".js-header-container")), new i.Controls.Partial.Goup(this.element.find(".js-goup"))
            },
            ".js-popup-close click": function() {
                t.fancybox.close()
            },
            ".js-aside-nav .current click": function(t, i) {
                i.preventDefault()
            },
            ".js-ya-goal click": function(t) {
                "undefined" != typeof yaCounter1791280 && yaCounter1791280.reachGoal(t.data("goal")), "undefined" != typeof yaCounter7396657 && yaCounter7396657.reachGoal(t.data("goal"))
            },
            initPartials: function() {
                this.element.find(".js-popup").fancybox(i.Helper.defaultFancyboxSettings), this.element.find(".js-page-background").each(function() {
                    new i.Controls.Partial.PageBackground(t(this))
                }), this.element.find(".js-square-block").each(function() {
                    new i.Controls.Partial.SquareBlock(t(this))
                }), this.element.find(".js-scroll-fixed-block").each(function() {
                    new i.Controls.Partial.ScrollFixedBlock(t(this))
                }), this.element.find("[data-icon-type]").each(function() {
                    new i.Controls.Partial.Icon(t(this))
                })
            },
            initFormController: function() {
                i.Helper.initForms(this.element, "form[data-form-type]:not(.popup form)")
            },
            initPageProgress: function() {
                var t = this.element.find(".page-progress");
                t.length && new i.Controls.Partial.PageProgress(t)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Main = can.Control.extend({
            init: function() {
                new i.Controls.Partial.MainSlider(this.element)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.CaseList = can.Control.extend({
            init: function() {},
            "{window} load": function() {
                new i.Controls.Partial.BlogLoader(this.element, {
                    pagerWrap: this.element
                }), new i.Controls.Partial.Pager(this.element, {
                    loaderWrap: this.element
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.CaseDetail = can.Control.extend({
            init: function() {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.CaseCommon = can.Control.extend({
            init: function() {
                this.initTextContent(), this.initImportCase(), this.element.find(".js-post:not(.inited)").not(".inited").each(function() {
                    new i.Controls.Partial.PostItem(t(this))
                }), this.element.find(".js-no-autoloader").length || new i.Controls.Partial.PostAutoloader(this.element)
            },
            initTextContent: function() {
                this.element.find(".js-clear-text").each(function() {
                    new i.Controls.Partial.ClearText(t(this))
                }), this.element.find(".tilda-post table:not(.stacktable)").stacktable(i.Helper.defaultStacktableSettings)
            },
            initImportCase: function() {
                var t = this.element.find("[data-case-control]");
                if (t.length > 0) {
                    var e = can.capitalize(can.camelize(t.data("case-control")));
                    i.Controls.Case[e] && new i.Controls.Case[e](t)
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Studio = can.Control.extend({
            init: function() {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioClients = can.Control.extend({
            init: function() {
                var t = this.element.find(".js-component-ajax");
                new i.Controls.Partial.ComponentAjax(t, {
                    pagerWrap: this.element
                }), new i.Controls.Partial.Pager(this.element, {
                    loaderWrap: t
                })
            },
            "{window} load": function() {
                window.location.hash && t("html,body").css({
                    scrollTop: t(window.location.hash).offset().top - 200
                })
            },
            ".js-component-ajax successAjax": function() {
                this.element.trigger("update"), this.element.find(".js-square-block:not(.init)").each(function() {
                    new i.Controls.Partial.SquareBlock(t(this))
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioFeedback = can.Control.extend({
            init: function() {
                this.$grid = this.element.find(".js-grid")
            },
            "{window} load": function() {
                this.reload(), setTimeout(this.reload.bind(this), 1e3)
            },
            "{window} DOMSubtreeModified": function() {
                this.reload()
            },
            reload: function() {
                this.$grid.isotope({
                    itemSelector: ".js-grid-item",
                    transitionDuration: 0
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioAwards = can.Control.extend({
            init: function() {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioJob = can.Control.extend({
            init: function() {
                this.element.find(".js-job-slider").slick({
                    slidesToShow: 1,
                    prevArrow: '<a href="javascript:void(0);" class="slick-prev"></a>',
                    nextArrow: '<a href="javascript:void(0);" class="slick-next"></a>',
                    touchThreshold: 20
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioTeam = can.Control.extend({
            defaults: {
                teamSlideWidth: 112
            }
        }, {
            init: function() {
                this.inited = !0, this.$win = t(window), this.$html = t("html"), this.$title = t("title"), this.title = this.$title.text(), this.$info = this.element.find(".js-info"), this.$name = this.$info.find(".js-name"), this.$status = this.$info.find(".js-status"), this.$textWrap = this.$info.find(".js-text-wrap"), this.$fullText = this.$info.find(".js-full-text"), this.$shortText = this.$info.find(".js-short-text"), this.$personSlider = this.element.find(".js-person-slider"), this.$teamSlider = this.element.find(".js-team-slider"), this.$personSlides = this.$personSlider.find(".slide"), this.$faceboxes = this.element.find(".js-facebox");
                var e = this.element.find(".slide.selected"),
                    s = e.index();
                this.$currentVideo = [], this.$personSlider.slick({
                    lazyLoad: "ondemand",
                    slidesToShow: 1,
                    appendArrows: ".js-person-arrows",
                    prevArrow: '<a href="javascript:void(0);" class="slick-prev"></a>',
                    nextArrow: '<a href="javascript:void(0);" class="slick-next"></a>',
                    touchThreshold: 20,
                    fade: !0,
                    asNavFor: ".js-team-slider"
                }), this.$personSlider.find("video").each(function() {
                    new i.Controls.Partial.HtmlVideo(t(this))
                }), this.setSlideInfo(0), this.$personSlider.on("beforeChange", this.beforeChangePerson.bind(this));
                var n = this.$personSlider[0].slick.slideHandler;
                this.$personSlider[0].slick.slideHandler = function(t, i, e) {
                    var s = {
                        this: this.$personSlider[0].slick,
                        index: t,
                        sync: i,
                        dontAnimate: e
                    };
                    this.checkVideo(n, s)
                }.bind(this), this.$teamSlider.slick({
                    lazyLoad: "ondemand",
                    slidesToShow: this._getTeamSlideWidth(),
                    slidesToScroll: 1,
                    arrows: !1,
                    touchThreshold: 20,
                    centerMode: !0,
                    focusOnSelect: !0,
                    asNavFor: ".js-person-slider"
                });
                var o = this.$teamSlider[0].slick.slideHandler;
                this.$teamSlider[0].slick.slideHandler = function(t, i, e) {
                    var s = {
                        this: this.$teamSlider[0].slick,
                        index: t,
                        sync: i,
                        dontAnimate: e
                    };
                    this.checkVideo(o, s)
                }.bind(this), this.$personSlider.slick("slickGoTo", s, !1), this.element.find(".js-scroll").mCustomScrollbar(), this.$textWrap.mCustomScrollbar(), this._setFullTextHeight()
            },
            "{window} resize": function() {
                var t = this._getTeamSlideWidth();
                this.$teamSlider.slick("slickSetOption", "slidesToShow", t), this._setFullTextHeight()
            },
            ".js-show-full-text click": function(t, i) {
                t.addClass("opened"), this.$fullText.slideDown()
            },
            ".js-facebox click": function(t, i) {
                this.$faceboxes.removeClass("active"), t.addClass("active"), this.$personSlider.slick("slickGoTo", t.index()), this.hideFullList()
            },
            ".js-show-fulllist click": function(t, i) {
                var e = this.$personSlider.slick("slickCurrentSlide");
                this.$faceboxes.removeClass("active").eq(e).addClass("active"), this.showFullList()
            },
            ".js-hide-fulllist click": function(t, i) {
                this.hideFullList()
            },
            "{window} keyup": function(t, i) {
                27 == i.keyCode && this.hideFullList()
            },
            showFullList: function() {
                this.$html.addClass("show-team-fulllist")
            },
            hideFullList: function() {
                this.$html.removeClass("show-team-fulllist")
            },
            beforeChangePerson: function(t, i, e, s) {
                this.setSlideInfo(s);
                var n = i.$slides.eq(s),
                    o = n.find("video");
                o.length > 0 && (this.startVideo(n, o), this.$currentVideo = o)
            },
            checkVideo: function(t, e) {
                this.$currentVideo.length < 1 || i.Helper.viewPortMobile || window.innerHeight <= 650 || this.isSlowNetwork ? t.call(e.this, e.index, e.sync, e.dontAnimate) : this.endVideo(t, e)
            },
            startVideo: function(t, i) {
                i.trigger("lazyLoad"), i.trigger("setCurrentTime", 0), i.trigger("play");
                var e = t.data("stop-timestamp");
                i.trigger("pauseOn", [e])
            },
            endVideo: function(t, i) {
                this.$currentVideo.trigger("play");
                var e = this.$currentVideo.get(0);
                e.onended = function() {
                    this.$currentVideo = [], e.onended = !1, t.call(i.this, i.index, i.sync, i.dontAnimate)
                }.bind(this)
            },
            setSlideInfo: function(t) {
                var i = this.$personSlides.eq(t),
                    e = i.data("name"),
                    s = e + " — Сибирикс",
                    n = i.data("status"),
                    o = i.data("full-text"),
                    a = i.data("short-text"),
                    r = i.data("image");
                i.css("background-image", "url(" + r + ")"), this.$info.removeClass("red blue brown purple bear yellow").addClass(i.data("color")), this.$name.html(e), this.$status.html(n), this.$shortText.html(a), this.$fullText.html(o), history.pushState({}, this.title, "?p=" + i.data("id")), this.$title.html(s), this._setFullTextHeight()
            },
            _getTeamSlideWidth: function() {
                var t = this.$win.width();
                return Math.floor(t / this.options.teamSlideWidth)
            },
            _setFullTextHeight: function() {
                var t = this.$textWrap.offset().top,
                    i = this.$teamSlider.height(),
                    e = this.element.find(".site-nav").height(),
                    s = this.$win.height() - t - i - e - 80;
                s = s < 140 ? 140 : s, this.$textWrap.css("max-height", s), this.$textWrap.mCustomScrollbar("update")
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioTimeline = can.Control.extend({
            init: function() {
                this.mouseX = 0, this.mouseY = 0, this.scrollLeft = 0, this.lockTimelinePosition = !1, this.mouseDown = !1, this.$body = t("body"), this.$nav = this.element.find(".js-year-nav"), this.$navElements = this.$nav.find(".nav-item"), this.navElementsCount = this.$navElements.length, this.$timeline = this.element.find(".js-timeline"), this.$years = this.element.find(".js-year"), this.$pageBackground = this.element.find(".page-content .js-page-background"), this.element.find(".year .full-view").mCustomScrollbar({
                    theme: "dark"
                }), this.getSizes(), this.animateWaveLoop()
            },
            "{window} load": function() {
                this.getSizes(), i.Helper.isTouch() && this.goToYear(this.$years.eq(0))
            },
            "{window} resize": function() {
                this.getSizes(), this.setTimelinePosition()
            },
            "{window} mousewheel": function(t, i) {
                var e = i.deltaY > 0 ? -1 : 1,
                    s = i.deltaFactor;
                this.scrollLeft = this.scrollLeft + e * s, this.setTimelinePosition()
            },
            "{window} keydown": function(t, i) {
                37 == i.keyCode || 38 == i.keyCode ? this.goPrevYear() : 39 != i.keyCode && 40 != i.keyCode || this.goNextYear()
            },
            "{window} mousedown": function(t, i) {
                this.mouseDownX = i.pageX, this.mouseDown = !0
            },
            "{window} mousemove": function(t, i) {
                this.mouseX = i.pageX, this.mouseY = i.pageY, this.checkSwipe()
            },
            "{window} mouseup": function() {
                this.mouseDown = !1
            },
            "{window} touchstart": function(t, i) {
                this.mouseDownX = this.getPageX(i), this.mouseDown = !0
            },
            "{window} touchmove": function(t, i) {
                this.mouseX = this.getPageX(i), this.checkSwipe()
            },
            "{window} touchend": function() {
                this.mouseDown = !1
            },
            "{window} click": function(i, e) {
                var s = t(e.target);
                s.hasClass("js-year") || s.closest(".js-year").length > 0 || s.hasClass("js-year-arrow") || s.closest(".js-year-arrow").length > 0 || (this.$years.removeClass("selected"), this.$pageBackground.trigger("resetPageBackground"))
            },
            ".js-year click": function(i, e) {
                e.preventDefault();
                var s = t(e.target);
                s.hasClass("js-year-arrow") || this.goToYear(i)
            },
            ".js-year-arrow.prev click": function(t, i) {
                i.preventDefault(), this.goPrevYear()
            },
            ".js-year-arrow.next click": function(t, i) {
                i.preventDefault(), this.goNextYear()
            },
            getPageX: function(t) {
                var i = t.pageX;
                try {
                    i = void 0 == i ? t.originalEvent.targetTouches[0].pageX : i
                } catch (t) {}
                try {
                    i = void 0 == i ? t.targetTouches[0].pageX : i
                } catch (t) {}
                try {
                    i = void 0 == i ? t.touches[0].pageX : i
                } catch (t) {}
                return i
            },
            checkSwipe: function() {
                this.mouseDown && (void 0 != this.checkSwipeTimer && clearTimeout(this.checkSwipeTimer), this.checkSwipeTimer = setTimeout(function() {
                    var t = this.mouseX - this.mouseDownX,
                        i = Math.abs(t),
                        e = t > 0 ? -1 : 1;
                    this.scrollLeft = this.scrollLeft + e * i, this.setTimelinePosition()
                }.bind(this), 20))
            },
            getSizes: function() {
                this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.navWidth = this.$nav.width(), this.navTop = this.$nav.offset().top, this.isMobile = i.Helper.isViewPortMobile(), this.maxScrollLeft = this.navWidth - this.windowWidth
            },
            animateWaveLoop: function() {
                this.$body.hasClass("top-menu-opened") || this.isMobile || i.Helper.AnimateWave({
                    windowWidth: this.windowWidth,
                    windowHeight: this.windowHeight,
                    mouseX: this.mouseX,
                    mouseY: this.mouseY,
                    navTop: this.navTop,
                    navWidth: this.navWidth,
                    elements: this.$navElements,
                    elementsCount: this.navElementsCount,
                    scrollLeft: this.scrollLeft
                }), requestAnimFrame(function() {
                    this.animateWaveLoop()
                }.bind(this))
            },
            setTimelinePosition: function() {
                return this.isMobile ? void this.$timeline.css("transform", "translateX(0)") : void(this.lockTimelinePosition || (this.lockTimelinePosition = !0, this.scrollLeft < 0 && (this.scrollLeft = 0), this.scrollLeft > this.maxScrollLeft && (this.scrollLeft = this.maxScrollLeft), this.$timeline.css("transform", "translateX(" + -this.scrollLeft + "px)"), setTimeout(function() {
                    this.lockTimelinePosition = !1
                }.bind(this), 500)))
            },
            goNextYear: function() {
                var t = this.$years.filter(".selected").data("index");
                return void 0 == t || t > this.$years.length - 2 ? void this.goToYear(this.$years.filter('[data-index="0"]')) : void this.goToYear(this.$years.filter('[data-index="' + (t + 1) + '"]'))
            },
            goPrevYear: function() {
                var t = this.$years.filter(".selected").data("index");
                return void 0 == t || t < 1 ? void this.goToYear(this.$years.last()) : void this.goToYear(this.$years.filter('[data-index="' + (t - 1) + '"]'))
            },
            goToYear: function(t) {
                var i = t.hasClass("selected");
                if (!i) {
                    this.$years.removeClass("selected"), t.addClass("selected"), this.scrollLeft = this.scrollLeft + t.closest(".nav-item").offset().left - this.windowWidth / 2, this.setTimelinePosition();
                    var e = t.data("video"),
                        s = t.data("picture");
                    this.$pageBackground.trigger("changePageBackground", [{
                        video: e,
                        picture: s
                    }])
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.StudioWanted = can.Control.extend({
            init: function() {
                this.$form = this.element.find('form[data-form-type="wanted"]'), this.initSliders(), i.Helper.isViewPortMobile() || i.Helper.isTouch() || skrollr.init(), new i.Controls.Form.Wanted(this.$form)
            },
            initSliders: function() {},
            ".js-appeal-form click": function() {
                t.scrollTo(this.$form, 300, {
                    offset: -150
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Contacts = can.Control.extend({
            init: function() {
                new i.Controls.Partial.CoverVideoTrigger(this.element), new i.Controls.Partial.ContactsMap(this.element)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Blog = can.Control.extend({
            init: function() {
                this.element.find(".js-subscribe-form").each(function() {
                    new i.Controls.Partial.SubscribeForm(t(this))
                }), this.subscribeIsShownMobile = !1, this.mobileHiddenBlocks = this.element.find(".js-hidden-subscribe-mobile")
            },
            "{window} load": function() {
                new i.Controls.Partial.BlogLoader(this.element, {
                    pagerWrap: this.element
                }), new i.Controls.Partial.Pager(this.element, {
                    loaderWrap: this.element
                })
            },
            ".js-open-subscribe touchstart": function() {
                this.subscribeIsShownMobile || (this.mobileHiddenBlocks.slideDown(), this.subscribeIsShownMobile = !0)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        window.setIframePollHeight = function(i, e) {
            var s = t("#poll_" + i);
            s.height(e)
        }, window.scrollToPoll = function(i) {
            var e = t("#poll_" + i);
            t.scrollTo(e, {
                offset: {
                    top: -100
                },
                duration: 200
            })
        }, i.Controls.Page.Post = can.Control.extend({
            init: function() {
                this.checkReferer(), new i.Controls.Partial.PostAutoloader(this.element), new i.Controls.Partial.PostComments(this.element), this.element.find(".js-post:not(.inited)").each(function() {
                    new i.Controls.Partial.PostItem(t(this))
                }), this.element.find(".js-clear-text").each(function() {
                    new i.Controls.Partial.ClearText(t(this))
                }), this.element.find(".tilda-post table:not(.stacktable)").stacktable(i.Helper.defaultStacktableSettings)
            },
            checkReferer: function() {
                var t = (location.href, {});
                if (location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(i, e, s) {
                        t[e] = decodeURI(s)
                    }), "subscribe" == t.referer) {
                    var e = i.Helper.StrReplace(["www.", "blog."], ["", ""], window.location.host),
                        s = new Date((new Date).getTime() + 2592e6);
                    Cookies.set("IS_SUBSCRIBER", 1, {
                        expires: s,
                        domain: e
                    })
                }
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Products = can.Control.extend({
            init: function() {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Product = can.Control.extend({
            init: function() {
                new i.Controls.Partial.ProductSliders(this.element), new i.Controls.Partial.ProductParallax(this.element.find(".js-parallax")), this.element.find(".js-triggers-slider").map(function() {
                    new i.Controls.Partial.ProductTriggers(t(this))
                }), this.element.find("iframe").reframe()
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.WhiskeyBreak = can.Control.extend({
            init: function() {
                this.element.find(".js-whiskey-break-slider").each(function() {
                    new i.Controls.Partial.WhiskeyBreakSlider(t(this))
                }), new i.Controls.Partial.WhiskeyMouseDown(this.element.find(".js-mouse-down"))
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.NotFound = can.Control.extend({
            init: function() {}
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Showreel = can.Control.extend({
            init: function() {
                this.$iframe = this.element.find(".js-video-wrap iframe"), this.$iframe.reframe()
            },
            "video click": function(t) {
                t.get(0).play()
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Process = can.Control.extend({
            init: function() {
                new i.Controls.Partial.TextPageNav(this.element), new i.Controls.Partial.ProcessVimeo(this.element), new i.Controls.Partial.ProcessMenu(this.element)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Quests = can.Control.extend({
            init: function() {
                return !i.isResult && i.startQuest && Cookies.set("quest", "1", {
                    expires: 1e4
                }), i.isResult && !Cookies.get("quest") ? (window.location.href = i.startQuest, !1) : (this.element.find(".content").css("opacity", 1), i.Helper.initForms(this.element, ".js-cat-form"), void(i.isResult && 1 != Cookies.get("cat_lid") && this.showPopup()))
            },
            showPopup: function() {
                t.fancybox(["#questCatPopup"], {
                    padding: 0,
                    scrolling: "visible",
                    helpers: {
                        overlay: {
                            locked: !0,
                            closeClick: !1
                        }
                    },
                    keys: {
                        close: null
                    }
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.Prices = can.Control.extend({
            init: function() {
                this.$win = t(window), this.$diagram = this.element.find(".js-diagram-lines"), this.$diagramTop = this.$diagram.offset().top - 300, this.$lines = this.$diagram.find("i"), this.diagramShowed = !1, this.element.find(".js-parallax").parallax({}), this.scroll()
            },
            "{window} scroll": function() {
                this.scroll()
            },
            scroll: function() {
                !this.diagramShowed && this.$win.scrollTop() > this.$diagramTop && this.showDiagramLines()
            },
            showDiagramLines: function() {
                this.diagramShowed = !0, this.$lines.each(this._showDiagramLines.bind(this))
            },
            _showDiagramLines: function(i, e) {
                var s = t(e);
                s.delay(300 * i).animate({
                    height: s.data("height")
                }, 600, function() {
                    var t = s.find("span");
                    t.animate({
                        height: t.data("height")
                    }, 400)
                })
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Page.TextLight = can.Control.extend({
            init: function() {
                new i.Controls.Partial.TextPageNav(this.element)
            }
        })
    }(jQuery, window.APP),
    function(t, i) {
        "use strict";
        i.Controls.Application = can.Control.extend({
            init: function() {
                i.Helper.isIE() && t("html").addClass("is-ie"), new i.Controls.Page.Init(this.element), this.initPageController()
            },
            initPageController: function() {
                var t = can.capitalize(can.camelize(this.element.data("page-type")));
                i.Controls.Page[t] && new i.Controls.Page[t](this.element)
            }
        }), t(function() {
            new i.Controls.Application(t("body"))
        })
    }(jQuery, window.APP);
/* End */
