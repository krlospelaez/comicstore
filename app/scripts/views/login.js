/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/login.hbs',
    'collections/user',
    'models/user',
    'models/session',
    'views/loginMenu',
], function ($, _, Backbone, Handlebars, sourceTpl, UserCollection, UserModel, Session, LoginMenuView) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: Handlebars.compile(sourceTpl),

        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click #btn-login': 'login',
        	'keydown #login-password': function(e) {
        		if(e.keyCode == 13) {
        			this.login();
        		}
        	}
        },
        
        userCollection: null,

        initialize: function () {
        	$('#login-menu').remove();
            //this.listenTo(this.model, 'change', this.render);
            this.userCollection = new UserCollection();
            this.userCollection.fetch();
            //console.dir(userCollection.localStorage.find({userName: 'pollo'}));
            /*var user = new UserModel({
            	userName: 'pollo',
            	password: '123'
            });
            userCollection.add(user);
            user.save();
            userCollection.fetch();
            console.dir(userCollection);*/
            this.render();
        },

        render: function () {
        	this.$el.html(this.template);
            
            return this;
        },
        
        login: function() {
        	var user = $('#login-username').val();
        	var pass = $('#login-password').val();
        	
        	var exists = this.userCollection.findWhere({userName: user, password: pass});
			
        	if(exists) {
        		Session.set('authenticated', true);
				Session.set('user', JSON.stringify(exists.toJSON()));
				
				new LoginMenuView(); //Agrega el menu del usuario
				
				if(Session.get('redirectFrom')){
					var path = Session.get('redirectFrom');
					Session.unset('redirectFrom');
					Backbone.history.navigate(path, { trigger : true });
				}
				else {
					Backbone.history.navigate('', { trigger : true });
				}
        	}
        	else {
        		$('.alert-danger').removeClass('hide');
        	}
        }
    });

    return LoginView;
});
