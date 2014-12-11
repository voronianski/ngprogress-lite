# ngprogress-lite

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/voronianski/ngprogress-lite/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Nice looking slim progress bars provider for **Angular.js** applications.

It has similar API as original popular jQuery plugin (see [references](https://github.com/voronianski/ngprogress-lite#references)) to keep things as simple as possible.

The only dependency is [angular.js](http://angularjs.org/) framework.

File size is ``~2kb`` when minified.

## Install

You can download ``ngprogress-lite.js`` manually or install it with bower:

```bash
bower install ngprogress-lite
```

or npm:

```bash
npm install ngprogress-lite
```

You will need only to include ``ngprogress-lite.css`` and ``ngprogress-lite.js`` to your project, and then you can start using ``ngProgressLite`` provider in your controllers, services or directives.

## Usage

For simple usage you can just call ``start()`` and ``done()``, for example:

```javascript
ngProgressLite.start();
$timeout(function () {
	ngProgressLite.done();
}, 2000);
```

For more advanced usage you can **set** the number between ``0`` and ``1`` to set progress bar to specific state:

```javascript
ngProgressLite.set(0.5);
ngProgressLite.set(1.0);
```

You can also **increment** the progress bar by random number (this will never get to ``100%``):

```javascript
ngProgressLite.inc();
```

Also it is possible to get current state number of a progress bar:

```javascript
ngProgressLite.get()
```

## Configuration

Provider is highly customizable, here is the list of some options that you can specify:

- ``minimum`` - change the minimum percentage (defaults to ``0.08``)
- ``speed`` - speed of transition animations (defaults to ``300``)
- ``ease`` - type of transition easings
- and even ``template`` - but it's not recommended though :)

Use ``ngProgressLiteProvider`` settings object in module's config:

```javascript
angular.module('yourModule', ['ngProgressLite'])
	.config(['ngProgressLiteProvider', function (ngProgressLiteProvider) {
		ngProgressLiteProvider.settings.speed = 1500;
	}]);
```

## Customization

If you want to change progress bar's look, you need just edit tiny ``ngprogress-lite.css`` file. Feel free to rewrite it as you wish ;)

If you have some style issues, please be sure that ``ngprogress-lite.css`` is not overwritten by other styles (e.g. ``z-index`` Bootstrap's navbar - [link](https://github.com/voronianski/ngprogress-lite/issues/6))

## References

Inspired by Google, YouTube, Medium, etc.

- [nprogress](https://github.com/rstacruz/nprogress/) - original jQuery dependant solution

---

(c) 2013 MIT License
