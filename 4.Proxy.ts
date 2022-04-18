// =============================
//# 用代理方法对原有object进行控制， 卡位， 进行一些额外处理
namespace ProxyMode {
	interface Subject {
		request(): void
	}

	class RealSubject implements Subject {
		request(): void {
			console.log('调用了fetch请求')
		}
	}

	class Proxy implements Subject {
		realSubject: RealSubject

		constructor(realSubject: RealSubject) {
			this.realSubject = realSubject
		}

		request(): void {
			if (this.checkAccess()) {
				console.log('权限通过! OK')
				this.realSubject.request()
				this.logAccess()
			}
		}

		checkAccess(): boolean {
			console.log('检查权限中...')
			return true
		}

		logAccess(): void {
			console.log('打印了日志')
		}
	}

	function clientCode(subject: Subject) {
		subject.request()
	}

	// test
	const realSubject = new RealSubject()
	clientCode(realSubject)

	console.log('')

	const proxy = new Proxy(realSubject)
	clientCode(proxy)
}
/* 
1.直接调用：
调用了fetch请求

2.使用Proxy：
检查权限中...
权限通过! OK
调用了fetch请求
打印了日志
*/

// =============================simple =============================
//函数柯里化
const pipe = (function () {
	return function (baseNum: number) {
		const funcStack: Function[] = []
		const myProxy = new Proxy(
			{},
			{
				get: (target, propKey, receiver) => {
					if (propKey === 'get') {
						return funcStack.reduce((val, fn: Function) => fn(val), baseNum)
					}
					funcStack.push(window[propKey])
					return myProxy
				},
			}
		)
		return myProxy
	}
})()

let double = (n: number) => n * 2
let pow = (n: number) => n * n
let reverseInt = (n: any) => n.toString().split('').reverse().join('') | 0

const res = pipe(3).double.pow.reverseInt.get // 63
console.info(res)
