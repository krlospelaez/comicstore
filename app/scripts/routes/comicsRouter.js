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
    	routePrefix: '!/',
    	loginUrl: 'login',
        routes: {
        	'': 'comic',
        	'comic': 'comic',
        	'genre/:id': 'genre',
        	'login': 'login',
        	'logout': 'logout'
        },
        
        comic: function() {
        	console.log("HOLA");
        	var HomeView = require('views/home');
        	var ComicCollection = require('collections/comic');
        	
        	var allComics = new ComicCollection();
        	
        	this.render(new HomeView({model: allComics}));
        },
        
        genre: function(genreId) {
        	var HomeView = require('views/home');
        	var ComicCollection = require('collections/comic');
        	
        	var allComics = new ComicCollection();
			
        	this.render(new HomeView({
					model: allComics,
					filter: {
						genre: genreId
					}
    			})
    		);
        },
        
        login: function() {
        	var LoginView = require('views/login');
        	
        	this.render(new LoginView());
        },
        
        logout: function() {
        	var me = this;
        	var meArgs = arguments;
        	
        	var SessionCollection = require('collections/session');
        	var session = new SessionCollection();
        	
        	session.fetch().then(function(response) {
        		var user = session.at(0);
        		if(user) {
        			//session.remove(user);
        			user.destroy();
        		}
        		//ComicsRouterRouter.__super__.navigate(me.routePrefix + me.loginUrl, {trigger: true});
        	});
        },
        
        execute: function() {
        	console.log('EXECUTE');
        	console.dir(arguments);
        	ComicsRouterRouter.__super__.execute.apply(this, arguments);
        },
        
        trigger: function() {
        	console.log("TRIGGER");
        	var me = this;
        	var meArgs = arguments;
        	
        	if(meArgs[0] === 'route:' + me.loginUrl) {
        		$('#login-menu').addClass('hide');
        		ComicsRouterRouter.__super__.trigger.apply(me, meArgs);
        		return;
        	}
        	
        	var SessionCollection = require('collections/session');
        	var session = new SessionCollection();
        	
        	session.fetch().then(function(response) {
        		var user = session.at(0);
        		if(!user) {
        			$('#login-menu').addClass('hide');
        			ComicsRouterRouter.__super__.navigate(me.routePrefix + me.loginUrl, {trigger: true});
        			return;
        		}
        		else {
        			$('#login-menu').removeClass('hide');
        			ComicsRouterRouter.__super__.trigger.apply(me, meArgs);
        			$('#login-fullname').text(user.get('fullName'));
        		}
        		
        	});
        },
        
        route: function(route, name, callback) {
        	var me = this;
        	var meArgs = arguments;
        	
        	if(meArgs[0] !== '') {
        		meArgs[0] = me.routePrefix + meArgs[0];
        	}
        	
        	ComicsRouterRouter.__super__.route.apply(me, meArgs);
        },
        
        render: function(view) {
        	if(app.view.current != null) {
        		app.view.current.close();
        	}
        	
        	app.view.current = view;
        	$('.general-view').html(app.view.current.$el);
        }

    });

    return ComicsRouterRouter;
});