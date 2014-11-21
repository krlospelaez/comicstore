/*global define*/

/*define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {*/

define(function(require) {
    'use strict';
	
	var Backbone = require('backbone');
	var JST = require('templates');
	var Handlebars = require('handlebars');
	
    var HomeView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        el: '.general-view',

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
        	var source = require('text!templates/home.hbs');
        	var template = Handlebars.compile(source);
        	this.$el.html(template);
            
            var ComicListView = require('views/comiclist');
            var comicListView = new ComicListView();
            $('#home-view').html(comicListView.render().el);
            return this;
        }
    });

    return HomeView;
});
