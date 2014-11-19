/*global require*/
'use strict';

var app = app || {};

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        router: 'routes/comicsRouter'
    }
});

/// Bootstrap Init
require(['bootstrap'], function(bootstrap) {
	$('.dropdown-toggle').dropdown();
});

/// App Init
require([
    'backbone',
    'router'
], function (Backbone, Router) {
	app.router = new Router();
    Backbone.history.start();
});
