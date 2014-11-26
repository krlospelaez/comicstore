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
        	'click #btn-register': 'register',
        	'keydown #password': 'hidePopover'
        },
        
        userCollection: null,
        
        hidePopover: function() {
        	$('#password').popover("hide");
        },

        initialize: function () {
        	$('#login-menu').remove();
            this.userCollection = new UserCollection();
            this.userCollection.fetch();
            this.render();
        },

        render: function () {
        	this.$el.html(this.template);
        	
        	$('#username').alphanum();
            
            return this;
        },
        
        register: function() {
        	var name = $('#name').val();
        	var user = $('#username').val();
        	var email = $('#email').val();
        	var pass = $('#password').val();
        	var repeatPass = $('#repeatpassword').val();
        	
        	if(name && user && email && pass && repeatPass) {
        		if(pass.length < 7) {
        			var tpl = "<div class=\"popover\">\
        					   <div class=\"arrow\"></div>\
        					   <div class=\"popover-inner\">\
        					   <div class=\"popover-content\">\
        					   <p></p></div></div></div>";
        	
		        	var _popover = $('#password').popover({
						trigger: "manual",
						placement: "right",
						content: "The password must be at least 7 characters.",
						template: tpl
					});
        			$('#password').data('bs.popover').options.content = "The password must be at least 7 characters.";
					$('#password').popover("show");
					
					$('.alert-success').addClass('hide');
		            $('.alert-fields').removeClass('hide');
		            $('.alert-email').addClass('hide');
					return;
        		}
        		
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
            		fullName: name,
            		email: email,
            		userSince: new Date().toISOString().slice(0, 10)
            	});
            	
            	userCollection.add(user);
	            user.save();
	            
	            $('.alert-success').removeClass('hide');
	            $('.alert-fields').addClass('hide');
	            $('.alert-email').addClass('hide');
	            
	            $('form')[0].reset();
	            
	            setTimeout(function() {
	            	Backbone.history.navigate('#!/login', { trigger : true });
	            }, 2000);
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
