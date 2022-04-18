//# 创建一个公用context Class,然后可以通过注入不同的strategy来调用不同策略的内部方法， 1对多， 并且可以随时切换策略
//# 定义一系列算法， 并将每种算法分别放入独立的类中， 在调用时， 可以传入不同的算法类， 实现不同的算法
namespace StrategyMode {
	interface Strategy {
		print(data: string[]): void
	}

	class Context {
		tar: Strategy

		constructor(tar: Strategy) {
			this.tar = tar
		}

		setStrategy = (tar: Strategy) => (this.tar = tar)

		run(): void {
			this.tar.print(['a', 'b', 'c', 'd', 'e'])
		}
	}

	class StrategyA implements Strategy {
		print = (data) => console.log(data.sort().join(','))
	}

	class StrategyB implements Strategy {
		print = (data) => console.log(data.reverse().join(','))
	}

	const context = new Context(new StrategyA())
	context.run()

	context.setStrategy(new StrategyB())
	context.run()
}

// ============================  simple example ============================
namespace StrategyMode2 {
	const map = {
		A: function (base) {
			return base * 5
		},
		B: function (base) {
			return base * 4
		},
		C: function (base) {
			return base * 3
		},
	}

	function getBonus(base, level) {
		return map[level](base)
	}

	const p2: Record<string, any> = {
		name: 'Temp',
		base: 100,
		level: 'A',
	}
	p2.bonus = getBonus(p2.base, p2.level)

	console.log(p2)
}
