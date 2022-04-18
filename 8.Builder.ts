// 创建一个director构建class, 内可以挂载一个多方法的builder, 之后既可以使用公用的方法，也可以使用这个Builder自己的方法
// 主要为了： someBuilder.setValueA(1).setValueB(2).create() 链式调用

/* 

建造者模式将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。工厂模式主要是为了创建对象实例或者类簇（抽象工厂），
关心的是最终产出(创建)的是什么，而不关心创建的过程。而建造者模式关心的是创建这个对象的整个过程，甚至于创建对象的每一个细节。
*/
/* 
# 分步骤=> 创建复杂对象。进而可以使用相同的创建代码=> 生成不同类型和形式的对象
 */
namespace Builder {
	class Programmer {
		username: string
		age: number

		constructor(p) {
			this.username = p.username
			this.age = p.age
		}

		toString() {
			console.log(this)
		}
	}

	class Builder {
		username: string
		age: number

		build() {
			if (this.username && this.age) {
				return new Programmer(this)
			} else {
				throw new Error('缺少信息')
			}
		}

		setUsername(username: string) {
			if (username !== 'Iron Man') {
				this.username = username
				return this
			} else {
				throw new Error('Not available')
			}
		}

		setAge(age: number) {
			this.age = age
			return this
		}
	}

	// test
	const p = new Builder().setUsername('Jackie').setAge(20).build().toString()
}

// ====================================
namespace Builder2 {
	abstract class Builder {
		abstract producePart(): void
	}

	class Product {
		parts: string[] = []
		listParts() {
			console.log(`Product parts: ${this.parts.join(', ')}\n`)
		}
	}
	class ConcreteBuilder implements Builder {
		//
		// 如果是extends,Constructors for derived classes must contain a 'super' call
		// @ts-ignore
		product: Product
		constructor() {
			this.reset()
		}
		reset(): void {
			this.product = new Product()
		}
		producePart(): void {
			this.product.parts.push('PartA')
		}
		getProduct(): Product {
			const result = this.product
			this.reset()
			return result
		}
	}

	class Director {
		// @ts-ignore
		builder: Builder
		setBuilder(builder: Builder): void {
			this.builder = builder
		}

		buildCheapOne(): void {
			this.builder.producePart()
		}
	}

	//
	function clientCode(director: Director) {
		const builder = new ConcreteBuilder()
		director.setBuilder(builder)

		director.buildCheapOne()
		// Remember, the Builder pattern can be used without a Director class.
		builder.getProduct().listParts()
	}

	// test
	const director = new Director()
	clientCode(director)

	/* 
Standard basic product:
Product parts: PartA1

Standard full featured product:
Product parts: PartA1, PartB1, PartC1

Custom product:
Product parts: PartA1, PartC1
 */
}
