/*!
 * Name: angular-carousel-3d
 * GIT Page: https://github.com/Wlada/angular-carousel-3d
 * Version: 0.1.0 - 2016-01-17T19:35:10.888Z
 * License: MIT
 */
! function() {
	"use strict";
	angular.module("angular-carousel-3d", ["swipe"])
}(),
function() {
	"use strict";

	function t() {
		function t(t, e, i, s, n) {
			t.carousel3d = s
		}
		var e = {
			require: "^carousel3d",
			restrict: "AE",
			template: '<div class="slide-3d" ng-click="carousel3d.slideClicked($index)" ng-swipe-left="carousel3d.goPrev()" ng-swipe-right="carousel3d.goNext()" ng-transclude></div>',
			replace: !0,
			transclude: !0,
			link: t
		};
		return e
	}
	angular.module("angular-carousel-3d").directive("carousel3dSlide", t), t.$inject = []
}(),
function() {
	"use strict";

	function t(t, e, i, s, n, r, o) {
		function a() {
			o.build(S.model, S.options).then(function(t) {
				I = t, S.slides = I.slides, S.controls = I.controls, S.isLoading = !1, S.isSuccessful = !0;
				var i = I.getOuterHeight(),
					n = I.getOuterWidth();
				e.css({
					height: i + "px"
				}), s(function() {
					m = angular.element(e[0].querySelector(".carousel-3d")), m.css({
						width: n + "px",
						height: i + "px"
					}), x = m.children(), l()
				})
			}, function(t) {
				e.css({
					height: t.getOuterHeight() + "px"
				}), S.isLoading = !1, S.isSuccessful = !1
			}, function(t) {
				S.percentLoaded = t.percent
			})
		}

		function l(t, e) {
			I.setSlides();
			var i = I.getOuterHeight(),
				s = I.getOuterWidth(),
				n = "auto" === I.topSpace ? 0 : i / 2 - i / 2,
				r = I.width / 2 - s / 2,
				o = e ? e / 1e3 : I.animationSpeed / 1e3,
				a = 999;
			if (angular.forEach(I.slides, function(e, r) {
					var a = {
						position: "absolute",
						opacity: 0,
						visibility: "hidden",
						overflow: "hidden",
						top: n + "px",
						"border-width": I.border + "px",
						width: s,
						height: i
					};
					t && angular.extend(a, {
						"-webkit-transition": "all " + o + "s ",
						"-moz-transition": "all " + o + "s ",
						"-o-transition": "all " + o + "s ",
						"-ms-transition": "all " + o + "s ",
						transition: "all " + o + "s "
					}), v(r).css(a)
				}), v(I.currentIndex).addClass("current").css({
					zIndex: a,
					opacity: 1,
					visibility: "visible",
					"-webkit-transform": "none",
					"-moz-transform": "none",
					"-o-transform": "none",
					"-ms-transform": "none",
					transform: "none",
					left: r + "px",
					top: n + "px",
					width: s + "px",
					height: i + "px"
				}), angular.forEach(I.rightSlides, function(t, e) {
					var i = d(e, a, !0);
					a -= e + 1, v(t).css(i).css({
						opacity: 1,
						visibility: "visible",
						zIndex: a
					})
				}), angular.forEach(I.leftSlides, function(t, e) {
					var i = d(e, a);
					a -= e + 1, v(t).css(i).css({
						opacity: 1,
						visibility: "visible",
						zIndex: a
					})
				}), I.total > I.visible) {
				var l = d(I.rightSlides.length - 1, I.rightSlides.length - 1, !0),
					c = d(I.leftSlides.length - 1, I.leftSlides.length - 1);
				v(I.rightOutSlide).css(l), v(I.leftOutSlide).css(c)
			}
			S.isRendered = !0
		}

		function d(t, e, i) {
			var s = parseInt("auto" == I.space ? (t + 1) * (I.width / 1.5) : (t + 1) * I.space),
				n = i ? "translateX(" + s + "px) translateZ(-" + (I.inverseScaling + 100 * (t + 1)) + "px) rotateY(-" + I.perspective + "deg)" : "translateX(-" + s + "px) translateZ(-" + (I.inverseScaling + 100 * (t + 1)) + "px) rotateY(" + I.perspective + "deg)",
				r = "0%",
				o = "auto" === I.topSpace ? "none" : parseInt((t + 1) * I.space),
				a = "none",
				l = "none",
				d = "visible";
			return {
				"-webkit-transform": n,
				"-moz-transform": n,
				"-o-transform": n,
				"-ms-transform": n,
				transform: n,
				left: r,
				top: o,
				width: a,
				height: l,
				zIndex: e,
				overflow: d
			}
		}

		function c(t, e, i) {
			return angular.isFunction(S.onBeforeChange) && S.onBeforeChange({
				index: I.currentIndex
			}), I.setCurrentIndex(0 > t || t > I.total - 1 ? 0 : t), I.isLastSlide() && angular.isFunction(S.onLastSlide) && S.onLastSlide({
				index: I.currentIndex
			}), angular.forEach(x, function(t, e) {
				angular.element(x[e]).removeClass("current")
			}), I.setLock(!0), l(!0, I.animationSpeed), s(function() {
				f()
			}, I.animationSpeed), i
		}

		function u(t) {
			return t = t ? t : !1, !t && I.getLock() ? !1 : (I.isLastSlide() ? c(0, !1, t) : c(I.currentIndex + 1, !1, t), !1)
		}

		function h(t) {
			return t = t ? t : !1, !t && I.getLock() ? !1 : (I.isFirstSlide() ? c(I.total - 1, !1, t) : c(I.currentIndex - 1, !1, t), !1)
		}

		function g(t) {
			var e = t === I.total - 1 && I.isFirstSlide() ? -1 : t - I.currentIndex;
			I.isLastSlide() && 0 === t && (e = 1);
			for (var i = 0 > e ? -e : e, n = 0, r = 0; i > r; r++) {
				var o = 1 === i ? 0 : n;
				s(function() {
					0 > e ? h(i) : u(i)
				}, o), n += I.animationSpeed / i
			}
		}

		function f() {
			I.setLock(!1), S.onSlideChange && S.onSlideChange({
				index: I.currentIndex
			})
		}

		function v(t) {
			return angular.element(t >= 0 ? x[t] : x[I.total + t])
		}

		function p(t) {
			I.currentIndex != t ? g(t) : S.onSelectedClick && S.onSelectedClick({
				index: I.currentIndex
			})
		}
		var S = this;
		S.isLoading = !0, S.isSuccessful = !1, S.isRendered = !1, S.percentLoaded = 0, S.slideClicked = p, S.goPrev = h, S.goNext = u;
		var m = null,
			x = [],
			I = {};
		t.$watch("[vm.model, vm.options]", a, !0)
	}
	angular.module("angular-carousel-3d").controller("Carousel3dController", t), t.$inject = ["$scope", "$element", "$attrs", "$timeout", "$log", "$window", "Carousel3dService"]
}(),
function() {
	"use strict";

	function t(t) {
		function e(t, e) {
			return i
		}

		function i(t, e, i, s, n) {}
		var s = {
			restrict: "AE",
			template: '<div class="carousel-3d-container" ng-switch="vm.isLoading">   <div class="carousel-3d-loader" ng-switch-when="true">       <div class="carousel-3d-loader-circle" style="-webkit-transform:scale(0.75)"><div><div></div><div></div></div></div>       <div class="carousel-3d-loader-percentage">{{ vm.percentLoaded }}</div>   </div>   <div ng-switch-when="false" ng-switch="vm.isSuccessful">       <div class="carousel-3d" ng-switch-when="true" ng-show="vm.isRendered" ng-transclude>       </div>       <p ng-switch-when="false" class="carousel-3d-loader-error">There was a problem during load</p>       <div ng-if="vm.controls" class="carousel-3d-controls">           <div class="carousel-3d-next arrow-left" ng-click="vm.goPrev()"></div>           <div class="carousel-3d-prev arrow-right" ng-click="vm.goNext()"></div>       </div>   </div></div>',
			replace: !0,
			scope: {
				model: "=ngModel",
				options: "=",
				onSelectedClick: "&",
				onSlideChange: "&",
				onLastSlide: "&",
				onBeforeChange: "&"
			},
			controller: "Carousel3dController as vm",
			bindToController: !0,
			transclude: !0,
			compile: e,
			link: i
		};
		return s
	}
	angular.module("angular-carousel-3d").directive("carousel3d", t), t.$inject = ["$timeout"]
}(),
function() {
	"use strict";

	function t(t, e, i) {
		function s(t, i) {
			this.slides = t || [], this.leftSlides = [], this.rightSlides = [], this.leftOutSlide = "", this.rightOutSlide = "", this.loadCount = 0, this.errorCount = 0, this.states = {
				PENDING: 1,
				LOADING: 2,
				RESOLVED: 3,
				REJECTED: 4
			}, this.total = this.slides.length, this.currentIndex = 0, this.lock = !1, this.sourceProp = i.sourceProp, this.visible = i.visible || 5, this.perspective = i.perspective || 35, this.animationSpeed = i.animationSpeed || 500, this.dir = i.dir || "ltr", this.width = i.width || 360, this.height = i.height || 270, this.border = i.border || 0, this.space = i.space || "auto", this.topSpace = i.topSpace || "auto", this.controls = i.controls || !1, this.startSlide = i.startSlide || 0, this.inverseScaling = i.inverseScaling || 300, this.state = this.states.PENDING, this.deferred = e.defer(), this.promise = this.deferred.promise
		}

		function n() {
			return this.state !== this.states.PENDING
		}

		function r() {
			return this.state === this.states.REJECTED
		}

		function o() {
			return this.state === this.states.RESOLVED
		}

		function a() {
			if (this.isInitiated()) return this;
			if (this.state = this.states.LOADING, this.sourceProp)
				for (var t = 0; t < this.total; t++) this.loadImageLocation(this.slides[t]);
			else this.deferred.resolve(this);
			return this
		}

		function l(t) {
			this.errorCount++, this.isRejected() || (this.state = this.states.REJECTED, this.deferred.reject(this))
		}

		function d(t) {
			this.loadCount++, this.isRejected() || (this.deferred.notify({
				percent: Math.ceil(this.loadCount / this.total * 100),
				imageLocation: t
			}), this.loadCount === this.total && (this.state = this.states.RESOLVED, this.deferred.resolve(this)))
		}

		function c(e) {
			var i = this,
				s = new Image;
			s.onload = function(e) {
				t.$apply(function() {
					i.handleImageLoad(e.target.src), s = e = null
				})
			}, s.onerror = function(e) {
				t.$apply(function() {
					i.handleImageError(e.target.src), s = e = null
				})
			}, s.src = e[this.sourceProp]
		}

		function u() {
			return this.total
		}

		function h(t) {
			this.startSlide = 0 > t || t > this.total ? 0 : t
		}

		function g(t) {
			return this.currentIndex = t
		}

		function f() {
			return parseInt(this.width + this.border)
		}

		function v() {
			return parseInt(this.height + this.border, 10)
		}

		function p(t) {
			return this.lock = t
		}

		function S() {
			return this.lock
		}

		function m() {
			return this.slides
		}

		function x() {
			var t = Math.floor(this.visible / 2) + 1,
				e = "ltr";
			this.leftSlides = [], this.rightSlides = [];
			for (var i = 1; t > i; i++) {
				var s = this.dir === e ? (this.currentIndex + i) % this.total : (this.currentIndex - i) % this.total,
					n = this.dir === e ? (this.currentIndex - i) % this.total : (this.currentIndex + i) % this.total;
				this.leftSlides.push(s), this.rightSlides.push(n)
			}
			var r = this.leftOutSlide = this.currentIndex - t,
				o = this.rightOutSlide = this.total - this.currentIndex - t <= 0 ? -parseInt(this.total - this.currentIndex - t) : this.currentIndex + t;
			return this.dir === e && (this.leftOutSlide = r, this.rightOutSlide = o), this.slides
		}

		function I() {
			return this.currentIndex === this.total - 1
		}

		function w() {
			return 0 === this.currentIndex
		}

		function b() {
			return this.sourceProp
		}
		s.build = function(t, e) {
			var n = new s(t, e || {});
			return n.load().promise.then(function() {
				n.visible = n.visible > n.total ? n.total : n.visible, n.currentIndex = n.startSlide > n.total - 1 ? n.total - 1 : e.startSlide;
				try {
					2 !== n.visible && (n.visible = n.visible % 2 ? n.visible : n.visible - 1)
				} catch (t) {
					i.error(t)
				}
				return n
			})
		};
		var C = {
			constructor: s,
			isInitiated: n,
			isRejected: r,
			isResolved: o,
			load: a,
			handleImageError: l,
			handleImageLoad: d,
			loadImageLocation: c,
			getTotalNumber: u,
			setStartSlide: h,
			getSlides: m,
			setSlides: x,
			setCurrentIndex: g,
			getOuterWidth: f,
			getOuterHeight: v,
			setLock: p,
			getLock: S,
			isLastSlide: I,
			isFirstSlide: w,
			getSourceProp: b
		};
		return angular.extend(s.prototype, C), s
	}
	angular.module("angular-carousel-3d").factory("Carousel3dService", t), t.$inject = ["$rootScope", "$q", "$log"]
}();