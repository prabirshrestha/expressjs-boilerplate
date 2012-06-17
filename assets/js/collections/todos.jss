requires('models/todo');

App.Collections.Todos = Backbone.Collection.extend({

	model: App.Models.Todo

});