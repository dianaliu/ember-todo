EmberTodo.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },

    clearCompleted: function () {
      // What is this?
      var completed = this.filterBy('isCompleted', true);
      // Why invoke? How is this different from send?
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  remaining: function () {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function () {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function () {
    // the @each refers to model? not ctrllr?
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allAreDone: function(key, value) {
    if(undefined === value) {
      return !!this.get('length') && this.everyBy('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      // saves the whole db? or individual records? each.
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted')
});