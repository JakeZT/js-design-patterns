// 创建一个工厂用map存储不同类， 然后调用时传入目标类，调用对应的目标方法
// 同一个工厂=>容纳不同产品=> 根据传入的产品类型调用不同的方法

//# 创建一个工厂用map存储不同类， 然后调用时传入目标类，调用对应的目标方法
namespace AbstractFactory2 {
	enum Type {
		A,
		B,
	}

	enum Occupation {
		TEACHER,
		STUDENT,
	}

	interface Hello {
		sayHello()
	}

	class TA implements Hello {
		sayHello() {
			console.log('Teacher A say hello')
		}
	}

	class TB implements Hello {
		sayHello() {
			console.log('Teacher B say hello')
		}
	}

	class SA implements Hello {
		sayHello() {
			console.log('Student A say hello')
		}
	}

	class SB implements Hello {
		sayHello() {
			console.log('Student B say hello')
		}
	}

	class AFactory {
		static list = new Map<Occupation, Hello>([
			[Occupation.TEACHER, new TA()],
			[Occupation.STUDENT, new SA()],
		])

		static getHello(occupation: Occupation) {
			return AFactory.list.get(occupation)
		}
	}

	class BFactory {
		static list = new Map<Occupation, Hello>([
			[Occupation.TEACHER, new TB()],
			[Occupation.STUDENT, new SB()],
		])

		static getHello(occupation: Occupation) {
			return BFactory.list.get(occupation)
		}
	}

	class HelloFactory {
		static list = new Map<Type, AFactory | BFactory>([
			[Type.A, AFactory],
			[Type.B, BFactory],
		])

		static getType(type: Type): any {
			return HelloFactory.list.get(type)
		}
	}

	// test
	HelloFactory.getType(Type.A).getHello(Occupation.TEACHER).sayHello()
	HelloFactory.getType(Type.A).getHello(Occupation.STUDENT).sayHello()
	HelloFactory.getType(Type.B).getHello(Occupation.TEACHER).sayHello()
	HelloFactory.getType(Type.B).getHello(Occupation.STUDENT).sayHello()
	/*
Teacher A say hello
Student A say hello
Teacher B say hello
Student B say hello
 */
}

// 继承同一父类、实现同一接口的子类对象，由给定的多个类型参数创建具体的对象。
namespace AbstractFactoryType {
	interface AbstractFactory {
		createA(): Abs_A
		createB(): Abs_B
	}
	interface Abs_A {
		hello(): string
	}
	interface Abs_B {
		hello(): string
		hello2(collaborator: Abs_A): string
	}
	class Factory1 implements AbstractFactory {
		public createA(): Abs_A {
			return new Product_A1()
		}
		public createB(): Abs_B {
			return new Product_B1()
		}
	}

	class Factory2 implements AbstractFactory {
		public createA(): Abs_A {
			return new Product_A2()
		}

		public createB(): Abs_B {
			return new Product_B2()
		}
	}

	class Product_A1 implements Abs_A {
		public hello(): string {
			return 'The result of the product A1.'
		}
	}

	class Product_A2 implements Abs_A {
		public hello(): string {
			return 'The result of the product A2.'
		}
	}

	class Product_B1 implements Abs_B {
		public hello(): string {
			return 'The result of the product B1.'
		}
		public hello2(collaborator: Abs_A): string {
			const result = collaborator.hello()
			return `The result of the B1 collaborating with the (${result})`
		}
	}

	class Product_B2 implements Abs_B {
		public hello(): string {
			return 'The result of the product B2.'
		}
		public hello2(collaborator: Abs_A): string {
			const result = collaborator.hello()
			return `The result of the B2 collaborating with the (${result})`
		}
	}

	function clientCode(factory: AbstractFactory) {
		const productA = factory.createA()
		const productB = factory.createB()

		console.log(productB.hello())
		console.log(productB.hello2(productA))
	}

	//test

	console.log('Client: Testing client code with the first factory type...')
	clientCode(new Factory1())

	console.log('')

	console.log('Client: Testing the same client code with the second factory type...')
	clientCode(new Factory2())
	// 仅通过其抽象接口与工厂和产品进行交互。该接口允许同一客户端代码与不同产品进行交互。 你只需创建一个具体工厂类并将其传递给客户端代码即可。

	/* 
The result of the product B1.
The result of the B1 collaborating with the (The result of the product A1.)

Client: Testing the same client code with the second factory type...
The result of the product B2.
The result of the B2 collaborating with the (The result of the product A2.)
 */
}
