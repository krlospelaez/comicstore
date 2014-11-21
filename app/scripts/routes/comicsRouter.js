/*global define*/

/*define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var ComicsRouterRouter = Backbone.Router.extend({
        routes: {
        	'': 'home'
        },
        
        home: function() {
        	console.log("Inicio");
        	
        	var HomeView = require('views/home');
        	
        	var home = new HomeView();
        	home.render();
        }

    });

    return ComicsRouterRouter;
});*/

define(function (require) {
    'use strict';
	
	var Backbone = require('backbone');

    var ComicsRouterRouter = Backbone.Router.extend({
        routes: {
        	'': 'comic',
        	'/genre/:name': 'comic'
        },
        
        comic: function(name) {
        	var HomeView = require('views/home');
        	var ComicCollection = require('collections/comic');
        	
        	var allComics = new ComicCollection();
        	var home = new HomeView({model: allComics});
        	//home.render();
        }

    });

    return ComicsRouterRouter;
});