//# 适配器模式---- 作为一个封装器用，接收一个被适配者，并且提供一个接口，使得被适配者与某个类的接口一致
//# 让接口不兼容的对象能够相互合作。
namespace AdaptorMode {
	class Target {
		request() {
			return '打印了AAA'
		}
	}

	class Adaptee {
		getText = () => 'CBA'
	}

	// 两种不同class
	class Adapter extends Target {
		adaptee: Adaptee

		constructor(adaptee: Adaptee) {
			super()
			this.adaptee = adaptee
		}

		request() {
			const result = this.adaptee.getText().split('').reverse().join('')
			return `翻转为${result}` //ABC
		}
	}

	function clientCode(target: Target) {
		console.log(target.request())
	}

	// test
	const target = new Target()
	clientCode(target)

	const adaptee = new Adaptee()
	console.log(`${adaptee.getText()}`)

	const adapter = new Adapter(adaptee)
	clientCode(adapter)
}
/* 
打印了AAA
CBA
翻转为 ABC
 */
