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
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../bower_components/requirejs-text/text',
        router: 'routes/comicsRouter'
    }
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
});

/// App Init
require([
    'backbone',
    'router'
], function (Backbone, Router) {
	app.router = new Router();
    Backbone.history.start();
});
