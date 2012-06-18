
Support.CompositeView = Support.CompositeView.extend({

	// add custom methods to Support.CompositeView here

	buildTemplate: function (model) {
		var template = JST[this.templateName];
		if(typeof(template) === 'string') {
			template = JST[this.templateName] = _.template(template);
		}
		
		return template(model);
	}

});