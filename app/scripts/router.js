EmberTodo.Router.map(function () {
  this.resource('todos', { path: '/' }, function() {
    // child routes
    this.route('active');
    this.route('completed');
  });
});

EmberTodo.TodosRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('todo');
  }
});

EmberTodo.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});

EmberTodo.TodosActiveRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },

  renderTemplate: function(controller) {
    this.render('todos/index', { controller: controller });
  }
});

EmberTodo.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },

  renderTemplate: function(controller) {
    this.render('todos/index', { controller: controller });
  }
});