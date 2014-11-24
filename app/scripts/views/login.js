/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/login.hbs',
    'collections/user',
    'models/user',
    'collections/session',
], function ($, _, Backbone, Handlebars, sourceTpl, UserCollection, UserModel, SessionCollection) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: Handlebars.compile(sourceTpl),

        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click #btn-login': 'login'
        },
        
        userCollection: null,

        initialize: function () {
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
        	console.dir(exists.toJSON());
        	if(exists) {
        		var session = new SessionCollection();
        		var loggedUser = new UserModel(exists.toJSON());
        		session.add(loggedUser);
        		loggedUser.save();
        		app.router.navigate('', {trigger: true});
        	}
        }
    });

    return LoginView;
});
