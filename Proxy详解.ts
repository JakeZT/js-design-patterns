namespace TestProxy {
	let handler = {
		//get 拦截对象属性的读取，比如proxy.foo和proxy['foo']
		get: function (target, propKey, receiver) {
			// 目标对象、属性名和 proxy 实例本身
			if (propKey === 'prototype') {
				return Object.prototype
			}
			return 'Hello, ' + propKey
		},
		//set拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
		set: function (target, propKey, value, receiver): boolean {
			return true
		},
		// has 拦截propKey in proxy的操作，返回一个布尔值。
		has: function (target, propKey) {
			return true
		},
		// apply 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
		apply: function (target, thisBinding, args) {
			return args[0]
		},

		//construct 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
		construct: function (target, args) {
			return { value: args[1] }
		},

		//deleteProperty 拦截delete proxy[propKey]的操作，返回一个布尔值
		deleteProperty: function (target, propKey) {
			return true
		},

		//拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、
		//for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
		ownKeys: function (target): Array<any> {
			return []
		},
		//：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
		getOwnPropertyDescriptor: function (target, propKey) {
			return {}
		},
		//：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
		defineProperty: function (target, propKey, propDesc): boolean {
			return true
		},
		//：拦截Object.preventExtensions(proxy)，返回一个布尔值。
		preventExtensions: function (target): boolean {
			return true
		},
		//：拦截Object.getPrototypeOf(proxy)，返回一个对象。
		getPrototypeOf: function (target) {
			return {}
		},
		//：拦截Object.isExtensible(proxy)，返回一个布尔值。
		isExtensible: function (target): boolean {
			return true
		},
		//：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
		setPrototypeOf: function (target, proto): boolean {
			return true
		},
	}

	let fproxy = new Proxy(function (x, y) {
		return x + y
	}, handler)

	console.log(fproxy(1, 2)) // 1
	console.log(new fproxy(1, 2)) // {value: 2}
	console.log(fproxy.prototype === Object.prototype) // true
	console.log(fproxy.foo === 'Hello, foo') //true
}
