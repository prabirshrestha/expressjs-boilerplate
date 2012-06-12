var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},

	initialize: function (options) {
		options || (options = {});

		new App.Routers.TodoRouter();

		if (!Backbone.history.started) {
			Backbone.history.start();
			Backbone.history.started = true;
		}
	}
};