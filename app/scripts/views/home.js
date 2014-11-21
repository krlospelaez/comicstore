/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home.hbs',
    'views/comiclist',
    'text!templates/genre.hbs',
    'collections/genre'
], function ($, _, Backbone, Handlebars, sourceTpl, ComicListView, genreTpl, GenreCollection) {

    'use strict';
	
    var HomeView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click .available-menu': 'availableMenu'
        },
        
        el: '.general-view',
        
        template: Handlebars.compile(sourceTpl),
        genreTemplate: Handlebars.compile(genreTpl),

        initialize: function () {
        	var me = this;
        	me.model.comparator = 'order';
            me.listenTo(me.model, 'change', me.render);
            me.model.fetch({
				success: function(items) {
					//me.model.models = items.where({name: 'Pollito pio'});
					me.render();
				}
			});
        },

        render: function () {
        	var me = this;
        	this.$el.html(this.template);
            
            var comicListView = new ComicListView({model: this.model});
            $('#home-view').html(comicListView.render().el);
            
            me.genreModel = new GenreCollection();
            me.genreModel.fetch({
            	success: function() {
            		me.renderMenu();
            	}
            });
            
            return this;
        },
        
        renderMenu: function() {
        	$('#genre-menu').append(this.genreTemplate({genre: this.genreModel.toJSON()}));
        },
        
        availableMenu: function(event) {
        	var me = this;
        	switch($(event.currentTarget).data().value) {
        		case "all":
        			me.model.fetch({
        				reset: true,
        				success: function(items) {
        					me.render();
        				}
        			});
        			break;
        		case "available":
        			me.model.fetch({
        				reset: true,
						success: function(items) {
							me.model.models = items.where({available: true});
							me.render();
						}
					});
        			break;
        		case "borrowed":
        			me.model.fetch({
        				reset: true,
						success: function(items) {
							me.model.models = items.where({available: false});
							me.render();
						}
					});
        			break;
        		default:
        			break;
        	}
        }
    });

    return HomeView;
});
