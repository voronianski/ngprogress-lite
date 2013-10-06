angular.module('ngProgressLite').provider('$ngprogress', function () {
	'use strict';

	// global configs
	this.minimum = '0.08';
	this.speed = 200;
	this.easing = 'ease';
	this.trickleRate = 0.02;
	this.positionToUse = 'margin-left';

	var status;

	this.$get = function ($document) {
		// compile and append progress directive here
		var $body = $document.find('body');
		var $progressBarEl;

		return {
			set: function (num) {
				var started = isStarted();
				var speed = this.speed;
				var ease = this.ease;

				num = clamp(num, this.minimum, 1);
				status = (num === 1 ? null : num);
				$progressBarEl.css(positioning(num, speed, ease));
			},

			start: function () {},

			inc: function (amount) {
				var n = status;

				if (!n) {
					this.start();
				} else if (typeof amount !== 'number') {
					amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
				}

				n = clamp(n + amount, 0, 0.994);
				return this.set(n);
			},

			trickle: function () {
				return this.inc(Math.random() * this.trickleRate);
			},

			done: function () {}
		};
	};

	function isStarted () {
		return typeof status === 'number';
	}

	function clamp (num, min, max) {
		if (n < min) {
			return min;
		}
		if (n > max) {
			return max;
		}
		return n;
	}

	function toBarPercents (num) {
		return (-1 + num) * 100;
	}

	function positioning (num, speed, ease) {
		/* jshint validthis:true */
		var barCSS;

		if (this.positionToUse === 'translate3d') {
			barCSS = { transform: 'translate3d(' + toBarPercents(num) + '%,0,0)' };
		} else if (this.positionToUse === 'translate') {
			barCSS = { transform: 'translate(' + toBarPercents(num) + '%,0)' };
		} else {
			barCSS = { 'margin-left': toBarPercents(num) + '%' };
		}

		barCSS.transition = 'all ' + speed + 'ms ' + ease;
		return barCSS;
	}
});