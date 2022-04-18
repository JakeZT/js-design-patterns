//# 让你能在不暴露集合底层表现形式 （列表、 栈和树等） 的情况下遍历集合中所有的元素。
namespace IteratorMode {
	interface Iterator<T> {
		current(): T
		next(): T
		key(): number
		valid(): boolean
		rewind(): void //翻转
	}

	interface Aggregator {
		getIterator(): Iterator<string>
	}

	class PrintByOrder implements Iterator<string> {
		collection: WordsCollection
		position: number = 0
		reverse: boolean = false

		constructor(collection: WordsCollection, reverse: boolean = false) {
			this.collection = collection
			this.reverse = reverse
			if (reverse) {
				this.position = collection.getCount() - 1
			}
		}

		rewind() {
			// 最后一个或者0开始
			this.position = this.reverse ? this.collection.getCount() - 1 : 0
		}

		current() {
			return this.collection.getItems()[this.position]
		}

		key() {
			return this.position
		}

		next() {
			const item = this.collection.getItems()[this.position]
			this.position += this.reverse ? -1 : 1
			return item
		}

		valid() {
			if (this.reverse) {
				return this.position >= 0
			}
			return this.position < this.collection.getCount()
		}
	}

	class WordsCollection implements Aggregator {
		items: string[] = []

		getItems() {
			return this.items
		}

		getCount() {
			return this.items.length
		}

		addItem(item: string) {
			this.items.push(item)
		}

		getIterator() {
			return new PrintByOrder(this)
		}

		getReverseIterator() {
			return new PrintByOrder(this, true)
		}
	}

	const collection = new WordsCollection()
	collection.addItem('First')
	collection.addItem('Second')
	collection.addItem('Third')

	const iterator = collection.getIterator()

	console.log('Straight traversal:')
	while (iterator.valid()) {
		console.log(iterator.next())
	}

	console.log('')
	console.log('Reverse traversal:')
	const reverseIterator = collection.getReverseIterator()
	while (reverseIterator.valid()) {
		console.log(reverseIterator.next())
	}
}
/* 

Straight traversal:
First
Second
Third

Reverse traversal:
Third
Second
First
*/
