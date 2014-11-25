/*global define*/
var ag;
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/loginMenu.hbs',
    'models/session'
], function ($, _, Backbone, Handlebars, sourceTpl, Session) {

    'use strict';
	
    var LoginMenuView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click #menu-logout': 'logout'
        },
        
        el: '#top-menu',
        
        template: Handlebars.compile(sourceTpl),

        initialize: function (options) {
        	this.render();
        },

        render: function () {
        	var me = this;
        	var user = Session.get('user');
        	
        	this.$el.append(this.template(user));
        },
        
        logout: function() {
        	Backbone.history.navigate('!/logout', { trigger : true });
        }
    });

    return LoginMenuView;
});
