# ngprogress-lite

Nice looking slim progress bars provider for Angular.js applications.

It's a minimal bundle of more popular jQuery plugin (see [references](https://github.com/voronianski/ngprogress-lite#references)) but only for angular with similar API as in original one to keep things as simple as possible.

## Install

You will need only to include ``ngprogress-lite.css`` to your project, as well as adding ``ngProgressLite`` service in your controller, service or directive.

You can download ``ngprogress-lite.js`` manually or install it with bower:

```bash
bower install ngprogress-lite
```

The only dependency is [angular.js](http://angularjs.org/) framework.

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

## References

Inspired by Google, YouTube, Medium, etc.

- [nprogress](https://github.com/rstacruz/nprogress/) - original jQuery dependant solution

---

(c) 2013 MIT License
