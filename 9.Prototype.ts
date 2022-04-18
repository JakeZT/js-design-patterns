// 所有的原型类都必须有一个通用的接口,原型对象可以生成自身的完整副本， 因为相同类的对象可以相互访问对方的私有成员变量。

// 创建一个class, 定义各个属性后，可以进行深度克隆， 新旧class的prototype引用完全一致（包括未曾定义的属性）
//# 复制已有对象， 而又无需使代码依赖它们所属的类
namespace PrototypeMode {
	class Prototype {
		// @ts-ignore
		public name: Person
		public age: any
		// @ts-ignore
		public time: object

		public deepClone(): this {
			const clone = Object.create(this)

			clone.time = { ...this.time }
			clone.name = {
				...this.name,
				prototype: { ...this },
			}

			return clone
		}
	}

	class Person {
		public prototype

		constructor(prototype: Prototype) {
			this.prototype = prototype
		}
	}

	function test() {
		const p1 = new Prototype()
		p1.age = 25
		p1.time = new Date()
		p1.name = new Person(p1)

		const p2 = p1.deepClone()
		console.log(p1.age === p2.age) // true
		console.log(p1.time === p2.time) //true
		console.log(p1.name === p2.name) //true
		console.log(p1.name.prototype === p2.name.prototype) //true
	}

	test()

	/* 
Primitive field values have been carried over to a clone. Yay!
Simple time has been cloned. Yay!
Component with back reference has been cloned. Yay!
Component with back reference is linked to the clone. Yay!
 */
}
