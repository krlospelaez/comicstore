/*global require*/
'use strict';

var app = app || {};

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
        	exports: 'Handlebars'
        },
        alphanum: {
        	deps: ['jquery'],
        	exports: 'jquery'
        },
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        localstorage: "../bower_components/backbone.localStorage/backbone.localStorage",
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text',
        alphanum: '../bower_components/jquery-alphanum/jquery.alphanum',
        router: 'routes/comicsRouter'
    }
});

// Jquery Init
require(['jquery', 'alphanum'], function() {
	
});

/// Bootstrap Init
require(['bootstrap'], function(bootstrap) {
	$('.dropdown-toggle').dropdown();
});

/// Handlebars Helpers
require(['handlebars'], function(Handlebars) {
	Handlebars.registerHelper('ifmodeqzero', function(first, second, options) {
		first++;
		var ret = (first % second == 0);
		
		return ret ? options.fn(this) : options.inverse(this);
	});
	
	Handlebars.registerHelper('disabled', function(item, options) {
		return (item) ? 'disabled': '';
	});
	
	Handlebars.registerHelper('not', function(item, options) {		
		return !item;
	});
	
	Handlebars.registerHelper('inc', function(index, options) {		
		return index + 1;
	});
});

/// App Init
require([
    'backbone',
    'router'
], function (Backbone, Router) {
	app.router = new Router();
	app.view = app.view || { current: null };
	
	Backbone.View.prototype.close = function() {
		this.remove();
		this.unbind();
		if(this.model) {
			this.model.unbind();
		}
		if(this.onClose) {
			this.onClose();
		}
	};
	
    Backbone.history.start();
});
