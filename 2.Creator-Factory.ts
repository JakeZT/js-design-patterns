//  定义了一个方法， 且必须使用该方法来创建对象 （而不是直接new操作符）的方式。
// 工厂有公用的一些方法（或只定义抽象方法），但子类可重写该方法=> 自定义执行内容。

//# 在父类中提供一个共用interface => 子类可自定义。
namespace CreatorMode {
	abstract class Creator {
		abstract main(): Product
		others(): string {
			const product = this.main()
			return `执行了 ${product.operation()}`
		}
	}
	interface Product {
		operation(): string
	}

	class CreatorA extends Creator {
		main = (): Product => new P1()
	}

	class CreatorB extends Creator {
		main = (): Product => new P2()
	}

	class P1 implements Product {
		operation = () => '{生产----P1}'
	}

	class P2 implements Product {
		operation = () => '{生产----P2}'
	}

	function clientCode(creator: Creator) {
		const res = creator.others()
		console.log(res) // console不同结果
	}

	// test
	clientCode(new CreatorA())
	clientCode(new CreatorB())
}
