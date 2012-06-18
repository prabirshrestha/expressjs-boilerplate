App = {

	Models: {},
	Collections: {},
	Views: {},
	Routers: {},

	Root: '/',

	initialize: function (options) {
		options || (options = {});

		if(options.root) {
			App.Root = options.root;
		}
		
		// initilize common libs so we don't need to keep calling requries everytime
		this._initializeLibs();

		requires('views/app');
		App.view = new App.Views.App({el: $('#app')});
		App.view.render();

		requires('routers/app'); new App.Routers.App();


		if (!Backbone.history.started) {
			Backbone.history.start();
			Backbone.history.started = true;
		}
	},

	_initializeLibs: function () {
		// note: order is important
		var libs = [
			'underscore',
			'backbone',
			'backbone-support/support',
			'backbone-support/composite_view',
			'backbone-support/swapping_router'
		];

		if(!JSON || (JSON && (!JSON.stringify || !JSON.parse))) {
			libs.splice(0, 0, 'json2');
		} else {
			delete JSS.json2;
		}
		
		for (var i = 0; i < libs.length; i++) {
			requires(libs[i]);
		}

		requires('backbone-support-custom');
	}

};