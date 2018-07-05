;(function (Vue) {

	Vue.directive('focus', {
		inserted: function (el) {
			el.focus()
		}
	})

	window.app = new Vue({
		el: '#todoapp',

		data: {
			todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
			filterStatu: 'all',
			isEditing: null
		},

		watch: {
			todos: {
				handler (val, oldVal) {
					window.localStorage.setItem('todos', JSON.stringify(val))
				},
				deep: true
			}
		},

		methods: {
			toggleAll(event) {
				var checked = event.target.checked
				this.todos.forEach(item => item.completed = checked)
			},

			addTodo(event) {
				var todo = event.target.value
				var id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1
				if (!todo) {
					return
				}
				this.todos.unshift({
					id,
					title: todo,
					completed: false
				})
				event.target.value = ''
			},

			remove(index) {
				this.todos.splice(index, 1)
			},

			removeDone() {
				this.todos = this.todos.filter(item => !item.completed)
			},

			saveEdit(item, index, event) {
				var editText = event.target.value.trim()
				if (!editText) {
					return this.todos.splice(index, 1)
				}
				item.title = editText
				this.isEditing = null
			}
		},

		computed: {
			istoggleAll: function () {
				return this.todos.every(item => item.completed)
			},

			leftCount: function () {
				return this.todos.filter(item => !item.completed).length
			},

			filterTodos() {
				switch (this.filterStatu) {
					case 'active':
						return this.todos.filter(item => !item.completed)
						break
					case 'completed':
						return this.todos.filter(item => item.completed)
						break
					default:
						return this.todos
				}
			}
		},

		directives: {
			aotoFocus: {
				update(el) {
					el.focus()
				}
			}
		}
	})

	window.onhashchange = function () {
		var hash = window.location.hash.substr(2).trim() || 'all'
		window.app.filterStatu = hash
	}

	window.onhashchange()

})(Vue)
