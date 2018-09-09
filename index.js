var setLocal = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

var list = setLocal.get('todos') || [];


var App = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editingTodo: '',
        beforeTodo: '',
        visibility: 'all'
    },
    watch: {
        list: {
            handler: function () {
                setLocal.save('todos', this.list);
            },
            deep: true
        }
    },
    computed: {
        getChecked: function () {
            return list.filter(function (todo) {
                return !todo.checked;
            }).length;
        },
        filterList: function () {
            var filter = {
                all: function (list) {
                    return list;
                },
                unfinish: function (list) {
                    return list.filter(function (item) {
                        return !item.checked;
                    });
                },
                finish: function (list) {
                    return list.filter(function (item) {
                        return item.checked;
                    });
                }
            }
            return filter[this.visibility] ? filter[this.visibility](this.list) :
                this.list;
        }
    },
    methods: {
        addTodo: function () {
            var value = this.todo;
            if (value) {
                this.list.push({
                    title: value,
                    checked: false
                });
            }
            this.todo = '';
        },
        deleteTodo: function (todo) {
            var index = this.list.indexOf(todo);
            this.list.splice(index, 1);
        },
        editTodo: function (todo) {
            this.editingTodo = todo;
            this.beforeTodo = todo.title;
        },
        editedTodo: function () {
            this.editingTodo = '';
        },
        cancelTodo: function (todo) {
            todo.title = this.beforeTodo;
            this.beforeTodo = '';
            this.editingTodo = '';
        }
    },
    directives: {
        focus: {
            update(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }
});

function hashchange() {
    var hash = location.hash.substring(1);
    App.visibility = hash;
}
hashchange();
window.addEventListener('hashchange', hashchange);
