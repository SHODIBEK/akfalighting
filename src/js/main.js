import './vendor';

$(document).ready(() => {
	var Owl = {
		init() {
			Owl.carousel();
		},

		carousel() {
			let owl;

			owl = $(".slick-slide-js");
			$('.slider-nav').on('click', '.nav-item', function (e) {
				owl.trigger('to.owl.carousel', [$(this).index()]);
			});
		},
	};

	$(document).ready(() => {
		Owl.init();
	});
	$('.slider-nav').each(() => {
		$(".nav-item").click(function() {
			$(this).addClass("active");
			$(this)
				.siblings()
				.removeClass("active");
		});
	});
	$(".slick-slide-js").owlCarousel({
		responsive: {
			1024: {
				items: 1,
				dots: true,
				dotsClass: "slider-nav",
				dotClass: "nav-item",
				dotsContainer: "slider-nav"
			},
			960: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav"
			},
			767: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav"
			},
			320: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav"
			}
		},
		autoplay: true,
		loop: true,
		mouseDrag: false,
	});

	$(".news-items-block").owlCarousel({
		responsive: {
			1024: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav",
				margin: 10
			},
			960: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav",
				margin: 10
			},
			767: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav"
			},
			320: {
				items: 1,
				dots: false,
				nav: true,
				navText: ["", ""],
				navClass: ["news-items-nav_prev", "news-items-nav_next"],
				navElement: "button",
				navContainerClass: "news-items-nav"
			}
		},
		autoplay: true,
		loop: true,
		mouseDrag: false
	});
	// /textarea///
	let maxWidth = "100%";
	let maxHeight = 200;
	let minHeight = 99;

	$("textarea")
		.on("input", function() {
			if (this.clientWidth >= maxWidth) {
				this.style.width = maxWidth;
				this.style.whiteSpace = "pre-wrap";
			}
			if (this.clientHeight > maxHeight) {
				return;
			}
			if (this.scrollHeight > this.clientHeight) {
				this.style.height = `${this.scrollHeight}px`;
			}
		})
		.blur(function (event) {
			if ($(this).val() == "") {
				$(this).css("height", minHeight);
			}
		});
	// input///
	$(".form-group input,.form-group textarea")
		.focus(e => {
			let $this = $(e.currentTarget);
			let parent = $this.parent();
			let label = parent.children('label');

			parent.addClass('focused');

			if ($this.val() !== '') {
				label.show();
			}
		})
		.blur(e => {
			let $this = $(e.currentTarget);
			let parent = $this.parent();
			let label = parent.children('label');

			if ($this.val() === '') {
				parent.removeClass('focused');
			}
			if ($this.val() !== '') {
				parent.removeClass('focused');
				label.hide();
			}
		})
		.change(e => {
			let $this = $(e.currentTarget);
			let parent = $this.parent();
			let label = parent.children('label');

			if ($this.val() !== '') {
				label.hide();
				parent.removeClass('focused');
			} else {
				label.show();
			}
		});
	$("[data-fancybox]").fancybox({
		smallBtn: true,
		beforeLoad() {
			setTimeout(() => {
				$('.fancybox-content').append(
					'<div class="header-video dotted"></div>'
				);
			});
		}
	});
	$('[data-fancybox="images"]').fancybox({
		smallBtn: true,
		toolbar: false,
		arrows: false,
		infobar: false,
		beforeLoad() {
			setTimeout(() => {
				this.$content.append(
					'<button class="news-items-nav_prev" data-fancybox-prev>' +
						"</button>"
				),
					this.$content.append(
						'<div class="header-video dotted"></div>'
					),
					this.$content.append(
						'<button class="news-items-nav_next" data-fancybox-next>' +
							"</button>"
					);
			}, 700);
		}
	});
	$(window).scroll(function (event) {
		let $window = $(window);

		if ($window.width() > 960) {
			let topPos = $(this).scrollTop();
			// menuscroll
			let menuscroll = $(".scrollheader");

			if (topPos > 605) {
				$(menuscroll).addClass("fixed");
			} else {
				$(menuscroll).removeClass("fixed");
			}
		}
		if ($(window).width() < 960) {
			let e = $("table");

			if (e.length === 1) {
				$('.swipe-table').length === 0 &&
					$("body").append(
						'<div class="swipe-table"><span class="swipe_table"></span></div>'
					);

				let a = e.offset();
				let t = e.innerHeight();
				let i = a.top + t;
				let s = $(window).scrollTop() + $(window).height();

				let l = a.top + (t - 100) / 2;

				i < s &&
					($(".swipe-table").css({
						top: l
					}),
					$('.swipe-table').fadeIn('slow'),
					setTimeout(() => {
						$('.swipe-table').fadeOut('slow');
					}, 2500));
			}
		}
	});
	let qTxT = $(".quality-nav");
	let sw = $(".quality-text-hiden");
	let bg = $('#lamp-bg');
	let quality = $('.quality');
	let curHeight = quality.innerHeight();
	let autoHeight = quality.css('height', 'auto').innerHeight();

	$("#lamp-bg, .quality-text").on("click", () => {
		if (bg.hasClass('forward')) {
			bg.removeClass("forward");
			bg.addClass('backward');
			if ($(window).width() < 960) {
				setTimeout(() => {
					quality
						.height(curHeight)
						.animate({height: autoHeight}, 100);
				}, 1000);
			}
			var duration = 200;

			$(
				".quality-top-item, .quality-bottom-item, .quality-text-hiden"
			).each(function(index) {
				$(this)
					.delay(duration * index)
					.fadeOut(duration);
			});
			qTxT.fadeOut('fast');
			sw.fadeIn();
		} else {
			var duration = 200;

			bg.removeClass('backward');
			bg.addClass('forward');
			if ($(window).width() < 960) {
				quality.animate({ height: "780" }, 100);
			}
			if ($(window).width() < 768) {
				quality.animate({ height: "760" }, 100);
			}

			$(".quality-top-item, .quality-nav, .quality-bottom-item").each(
				function(index) {
					$(this)
						.delay(duration * index)
						.fadeIn(duration);
				}
			);
			sw.fadeOut(400);
		}
	});

	let duration = 1000;

	$('.design-lighting-bg__text span').each(function (index) {
		$(this)
			.delay(duration * index)
			.fadeIn(duration);
	});

	// tab card
	$(() => {
		$("div.contact-shourom-tab__items")
			.not(":first")
			.hide();
		$(".contact-shourom-tab ul").on("click", "li:not(.active)", function() {
			$(this)
				.addClass("active")
				.siblings()
				.removeClass("active")
				.closest("div.contact-shourom-tab")
				.find("div.contact-shourom-tab__items")
				.fadeOut()
				.removeClass("active")
				.eq($(this).index())
				.fadeIn()
				.addClass("active");
		});
	});
	// end tab card ///

	// textarea///
	$('textarea')
		.getNiceScroll()
		.resize();
	$('textarea').niceScroll({
		cursorcolor: "#f25c22",
		cursorwidth: "6px"
	});
	// textarea//
	let sourceSwap = function() {
		let $this = $(this);
		let newSource = $this.data("src");

		$this.data("src", $this.attr("src"));
		$this.attr("src", newSource);
	};

	$('.img a').click(function () {
		$(this)
			.closest('.visualCaptcha-possibilities')
			.find('a')
			.removeClass('active')
			.eq($(this).index());
		$(this).addClass('active');
	});

	// filter //
	$('.category-filter-nav__title').click(function () {
		$(this)
			.closest('.category-filter-nav')
			.toggleClass('open');
	});

	// zoom image //
	$('.img').ezPlus({
		zoomType: 'inner',
		cursor: 'crosshair',
		respond: [
			{
				range: '0-960',
				enabled: false,
				showLens: false
			},
		]
	});

	// auto height filter //
	$('.category-filter-nav').click(() => {
		let a = $(".category-filter, .category-card-filter").innerHeight();

		$(".category_filter-wrap").height(a);
	});
	// menu///
	$('.gamburger').click((e) => {
		e.preventDefault();
		$(".mobile-menu-open").addClass("open");
	});
	$('.mobile-menu .close').click((e) => {
		e.preventDefault();
		$(".mobile-menu-open").removeClass("open");
	});
	$('.menu .dropdown').click(function () {
		if (!$(this).hasClass('open')) {
			$(this)
				.children('ul')
				.slideDown();
			$(this).addClass('open');
		} else {
			$(this)
				.children('ul')
				.slideUp();
			$(this).removeClass('open');
		}
	});
	$(".lang").click(function() {
		$(this)
			.find("ul.dropdown")
			.toggleClass("open");
	});
});
