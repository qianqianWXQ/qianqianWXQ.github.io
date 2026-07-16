/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);
		// Portfolio Slider - 作品链接轮播
		(function($) {
			var $slider = $('.portfolio-slider');
			var $track = $slider.find('.slider-track');
			var $slides = $slider.find('.portfolio-slide');
			var $dots = $slider.find('.slider-dot');
			var current = 0;
			var total = $slides.length;

			function goTo(index) {
				if (index < 0) index = total - 1;
				if (index >= total) index = 0;
				current = index;
				$track.css('transform', 'translateX(-' + (current * 100) + '%)');
				$dots.removeClass('active');
				$dots.eq(current).addClass('active');
			}

			$slider.find('.slider-prev').on('click', function() { goTo(current - 1); });
			$slider.find('.slider-next').on('click', function() { goTo(current + 1); });
			$dots.on('click', function() { goTo($(this).index()); });

			// 内嵌轮播：多图切换
			var $carousels = $slider.find('.inner-carousel');
			$carousels.each(function() {
				var $container = $(this);
				var $innerSlides = $container.find('.inner-slide');
				var $innerDots = $container.find('.inner-dot');
				var $desc = $container.closest('.portfolio-slide').find('.slide-desc');
				var idx = 0;

				function goInner(i) {
					if (i < 0) i = $innerSlides.length - 1;
					if (i >= $innerSlides.length) i = 0;
					idx = i;
					$innerSlides.removeClass('active');
					$innerSlides.eq(idx).addClass('active');
					$innerDots.removeClass('active');
					$innerDots.eq(idx).addClass('active');
					$desc.text('当前展示：' + ($innerSlides.eq(idx).data('caption') || ''));
				}

				$innerDots.on('click', function() { goInner($(this).index()); });

				// 触摸 & 鼠标滑动切换
				var sx = 0, sy = 0, dragging = false;
				$container.on('mousedown touchstart', function(e) {
					dragging = true;
					sx = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
					sy = e.type === 'touchstart' ? e.originalEvent.touches[0].clientY : e.clientY;
					e.originalEvent && e.originalEvent.preventDefault && e.originalEvent.preventDefault();
				});
				$(document).on('mouseup touchend', function(e) {
					if (!dragging) return;
					dragging = false;
					var ex = e.type === 'touchend' ? e.originalEvent.changedTouches[0].clientX : e.clientX;
					var ey = e.type === 'touchend' ? e.originalEvent.changedTouches[0].clientY : e.clientY;
					var dx = ex - sx, dy = ey - sy;
					if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
						goInner(dx < 0 ? idx + 1 : idx - 1);
					}
				});
			});
		})(jQuery);
