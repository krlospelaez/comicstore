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
    	noRequiresAuth: ['login', 'register'],
        routes: {
        	'': 'comic',
        	'comic': 'comic',
        	'genre/:id': 'genre',
        	'login': 'login',
        	'logout': 'logout',
        	'register': 'register'
        },
        
        comic: function() {
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
        
        characters: function(characterId) {
        	var HomeView = require('views/home');
        	var CharactersView = require('views/characters');
        },
        
        login: function() {
        	var LoginView = require('views/login');
        	
        	this.render(new LoginView());
        },
        
        logout: function() {
        	var Session = require('models/session');
        	
        	Session.clear();
        	Backbone.history.navigate(this.routePrefix + 'login', { trigger : true });
        },
        
        register: function() {
        	var RegisterView = require('views/register');
        	this.render(new RegisterView());
        },
        
        route : function(route, name, callback){
        	var me = this;
        	var meArgs = arguments;
        	
        	if(meArgs[0] !== '') {
        		meArgs[0] = me.routePrefix + meArgs[0];
        		route = me.routePrefix + route;
        	}
        	
			if (!_.isRegExp(route)) route = this._routeToRegExp(route);
			if (_.isFunction(name)) {
				callback = name;
				name = '';
			}
			if (!callback) callback = this[name];

			var router = this;

			Backbone.history.route(route, function(fragment) {
				var args = router._extractParameters(route, fragment);

				var next = function(){
					callback && callback.apply(router, args);
					router.trigger.apply(router, ['route:' + name].concat(args));
					router.trigger('route', name, args);
					Backbone.history.trigger('route', router, name, args);
					//router.after.apply(router, args);        
				}
				router.before.apply(router, [args, next]);
			});
			return this;
      	},
      	
      	before: function(params, next) {
			//Checking if user is authenticated or not
			//then check the path if the path requires authentication
			var Session = require('models/session');
			
			var isAuth = Session.get('authenticated');
			var user = Session.get('user');
			var path = Backbone.history.location.hash;
			var needAuth = !_.contains(this.noRequiresAuth, path.replace('#' + this.routePrefix, ''));
			var cancelAccess = _.contains(this.noRequiresAuth, path.replace('#' + this.routePrefix, ''));
			
			if(needAuth && !isAuth) {
				//If user gets redirect to login because wanted to access
				// to a route that requires login, save the path in session
				// to redirect the user back to path after successful login
				Session.set('redirectFrom', path);
				Backbone.history.navigate(this.routePrefix + 'login', { trigger : true });
			}
			else if(isAuth && cancelAccess) {
				//User is authenticated and tries to go to login, register ...
				// so redirect the user to home page
				Backbone.history.navigate('', { trigger : true });
			}
			else {
				//No problem, handle the route!!
				if(_.isEmpty($('#login-menu'))) {
					var LoginMenuView = require('views/loginMenu');
					new LoginMenuView();	
				}
				
				return next();
			}
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