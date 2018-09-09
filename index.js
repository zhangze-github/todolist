var list = [{
    title: "aaaa",
    checked: false
}, {
    title: "bbbbb",
    checked: false
}]
var vm = new Vue({
    el: ".main",
    data: {
        list,
        newTodo: "",
        editingTodo: ""
    },
    computed: {
        count: function () {
            return this.list.filter(function (item) {
                return !item.checked
            }).length
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
    },
    methods: {
        addTodo: function () {
            this.list.push({
                title: this.newTodo,
                checked: false
            })
            this.newTodo = ""
        },
        editedTodo: function () {
            this.editingTodo = ""
        },
        editTodo: function (todo) {
            this.editingTodo = todo;
        },
        deleteTodo: function (index) {
            this.list.splice(index, 1)
        }
    }
})