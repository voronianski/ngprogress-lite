angular.module('ngprogress.provider', []).provider('$ngprogress', function () {
	'use strict';

	// global configs
	var minimum = 0.08;
	var speed = 300;
	var ease = 'ease';
	var trickleRate = 0.02;
	var trickleSpeed = 500;
	var showSpinner = true;
	var template = '<div class="ngProgressLite"><div class="ngProgressLiteBar" role="bar"><div class="peg"></div></div></div>';

	this.$get = ['$document', '$timeout', '$compile', '$rootScope', function ($document, $timeout, $compile, $rootScope) {
		var $body = $document.find('body');
		var $progressBarEl;
		var status;

		var privateMethods = {
			render: function (fromStart) {
				console.warn(this.isRendered());
				console.warn($progressBarEl);
				if (this.isRendered()) {
					return $progressBarEl;
				}

				$body.addClass('ngProgressLite-on');
				$progressBarEl = angular.element(template);
				$body.append($progressBarEl);
				return $progressBarEl;
			},

			remove: function () {
				$body.removeClass('ngProgressLite-on');
				$progressBarEl.remove();
			},

			isStarted: function () {
				return typeof status === 'number';
			},

			isRendered: function () {
				return $progressBarEl && $progressBarEl.children.length > 0;
			},

			trickle: function () {
				return publicMethods.inc(Math.random() * trickleRate);
			},

			clamp: function (num, min, max) {
				if (num < min) { return min; }
				if (num > max) { return max; }
				return num;
			},

			toBarPercents: function (num) {
				return num * 100;
			},

			positioning: function (num, speed, ease) {
				return { 'width': this.toBarPercents(num) + '%', 'transition': 'all '+speed+'ms '+ease };
			}
		};

		var publicMethods = {
			set: function (num) {
				var started = privateMethods.isStarted();
				var $progress = privateMethods.render();

				num = privateMethods.clamp(num, minimum, 1);
				status = (num === 1 ? null : num);

				$timeout(function () {
					$progress.children().css(privateMethods.positioning(num, speed, ease));
				}, 100);

				if (num === 1) {
					$timeout(function () {
						privateMethods.remove();
					}, speed);
				}

				return this;
			},

			start: function () {
				if (!status) {
					this.set(0);
				}

				var worker = function () {
					$timeout(function () {
						if (!status) { return; }
						privateMethods.trickle();
						worker();
					}, trickleSpeed);
				};

				worker();
				return this;
			},

			inc: function (amount) {
				var n = status;

				if (!n) {
					return this.start();
				}

				if (typeof amount !== 'number') {
					amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
				}

				n = privateMethods.clamp(n + amount, 0, 0.994);
				return this.set(n);
			},

			done: function () {
				this.inc(0.3 + 0.5 * Math.random()).set(1);
			}
		};

		return publicMethods;
	}];
});

angular.module('ngprogress', ['ngprogress.provider']);