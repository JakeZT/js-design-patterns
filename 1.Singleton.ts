// # 保证一个类只有一个实例， 并提供一个访问该实例的全局节点。
class Singleton {
	static instance: Singleton
	constructor() {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton()
		}
		return Singleton.instance
	}
}

//test
function test() {
	const s1 = new Singleton()
	const s2 = new Singleton()

	if (s1 === s2) {
		// true
		console.log('Singleton works, both variables contain the same instance.')
	}
}

test()
