//#  包装一个class, 可以在这个class的实例上扩充新的方法和属性， 或做一些预处理

namespace OldDecorator {
	let User = function (name) {
		this.name = name
		this.say = function () {
			console.log('User: ' + this.name)
		}
	}

	let DecoratedUser = function (user, city) {
		this.user = user
		this.name = user.name // ensures interface stays the same
		this.city = city
		this.say = function () {
			console.log('Decorated User: ' + this.name + ', ' + this.city)
		}
	}

	function run() {
		let user = new User('Kelly')
		user.say()

		let decorated = new DecoratedUser(user, 'New York')
		decorated.say()
	}
}

// ============================================
namespace NewDecorator {
	interface Base {
		operation(): string
	}

	class BaseComponent implements Base {
		operation() {
			return `BaseComponent`
		}
	}

	class Decorator implements Base {
		base: Base
		constructor(base: Base) {
			this.base = base
		}
		operation() {
			return this.base.operation()
		}
	}

	class D_A extends Decorator {
		operation() {
			return `D_A(${super.operation()})`
		}
	}

	class D_B extends Decorator {
		operation() {
			return `D_B(${super.operation()})`
		}
	}

	function clientCode(base: Base) {
		console.log(`RESULT: ${base.operation()}`)
	}

	// test
	const simple = new BaseComponent()
	clientCode(simple) //RESULT: BaseComponent

	const decorator1 = new D_A(simple)
	const decorator2 = new D_B(decorator1)
	clientCode(decorator2) //RESULT: D_B(D_A(BaseComponent))
}
