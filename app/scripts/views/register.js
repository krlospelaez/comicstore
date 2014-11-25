/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/register.hbs',
    'collections/user',
    'models/user',
    'models/session',
    'views/loginMenu',
], function ($, _, Backbone, Handlebars, sourceTpl, UserCollection, UserModel, Session, LoginMenuView) {
    'use strict';

    var RegisterView = Backbone.View.extend({
        template: Handlebars.compile(sourceTpl),

        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click #btn-register': 'register'
        },
        
        userCollection: null,

        initialize: function () {
        	$('#login-menu').remove();
            this.userCollection = new UserCollection();
            this.userCollection.fetch();
            this.render();
        },

        render: function () {
        	this.$el.html(this.template);
            
            return this;
        },
        
        register: function() {
        	var name = $('#name').val();
        	var user = $('#username').val();
        	var email = $('#email').val();
        	var pass = $('#password').val();
        	var repeatPass = $('#repeatpassword').val();
        	
        	if(name && user && pass && repeatPass) {
        		if(pass !== repeatPass) {
        			$('.alert-email').removeClass('hide');
        			$('.alert-fields').addClass('hide');
	            	$('.alert-success').addClass('hide');
	            	$(window).scrollTop(0);
        			return;
        		}
        		
        		var userCollection = new UserCollection();
	            userCollection.fetch();
	            
            	var user = new UserModel({
            		userName: user,
            		password: pass,
            		fullName: name
            	});
            	
            	userCollection.add(user);
	            user.save();
	            
	            $('.alert-success').removeClass('hide');
	            $('.alert-fields').addClass('hide');
	            $('.alert-email').addClass('hide');
	            
	            $('form')[0].reset();
	            
	            setTimeout(function() {
	            	Backbone.history.navigate('#!/login', { trigger : true });
	            }, 3000);
        	}
        	else {
        		$('.alert-success').addClass('hide');
	            $('.alert-fields').removeClass('hide');
	            $('.alert-email').addClass('hide');
        	}
        	
        	$(window).scrollTop(0);
        }
    });

    return RegisterView;
});
