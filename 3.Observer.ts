//# 使用map存储不同type的function, 需要调用时遍历这个type,运行所有数组内存在的函数
// #  允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。
namespace ObjectWatcher {
	// 对象型观察者

	class Subject {
		events: Map<string, Function[]>
		name: string
		constructor(name: string) {
			// 格式为： { click: [fn1, fn2], scroll: [fn1, fn2] }
			this.events = new Map<string, Function[]>()
			this.name = name
		}

		// Map 添加观察者
		addListener(type: string, fn: Function) {
			if (!this.events.has(type)) {
				return this.events.set(type, [fn])
			}
			const oldType = this.events.get(type) || []
			this.events.set(type, [...oldType, fn])
		}

		removeListener(type: string) {
			delete this.events[type]
		}

		dispatch(type: string) {
			this.events[type].forEach((callback: Function) => callback())
		}
	}

	const sub = new Subject('div')

	sub.addListener('build', function () {
		console.log('build 事件触发')
	})
	sub.addListener('click', function () {
		console.log('click 事件触发')
	})

	sub.dispatch('build')
}

namespace ArrayWatcher {
	// 数组型观察者
	let subjectId = 0
	let observerId = 0

	class Subject {
		observers: Observer[]
		id: number
		name: string
		constructor(name: string) {
			this.observers = []
			this.id = subjectId++
			this.name = name
		}

		// 添加观察者
		addListener(observer) {
			this.observers.push(observer)
		}

		// 删除观察者
		removeListener(observer) {
			this.observers = this.observers.filter((item) => item.id !== observer.id)
		}

		// 通知
		dispatch() {
			this.observers.forEach((item) => {
				item.watch(this.name)
			})
		}
	}

	class Observer {
		id: number
		constructor() {
			this.id = observerId++
		}
		watch(subjectName) {
			console.log(`观察者${this.id}发现了被观察者 ${subjectName} 产生了变化。`)
		}
	}

	const sub = new Subject('div元素')
	const observer1 = new Observer()
	const observer2 = new Observer()

	sub.addListener(observer1)
	sub.addListener(observer2)

	sub.dispatch()
}
