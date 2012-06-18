App.Views.App = Support.CompositeView.extend({

	templateName: 'app',
	
	initialize: function () {
	},

	render: function () {
		var html = this.buildTemplate({message: 'Welcome'});
		this.$el.html(html);

		return this;
	}

});