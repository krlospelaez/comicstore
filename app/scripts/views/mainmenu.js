/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home.hbs',
    'views/comiclist',
    'text!templates/genre.hbs',
    'collections/genre',
    'text!templates/popular.hbs',
    'collections/popular'
], function ($, _, Backbone, Handlebars, sourceTpl,
			 ComicListView, genreTpl, GenreCollection,
			 popularTpl, PopularCollection) {

    'use strict';
	
    var MainMenuView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click .available-menu': 'availableMenu'
        },
        
        //el: '.general-view',
        
        template: Handlebars.compile(sourceTpl),
        genreTemplate: Handlebars.compile(genreTpl),
        popularTemplate: Handlebars.compile(popularTpl),

        initialize: function (options) {
        	var me = this;
        	
        	me.genreModel = new GenreCollection();
        	me.qualificationModel = new PopularCollection({ url: 'qualification' });
        	me.topSearchModel = new PopularCollection({ url: 'topsearch' });
        	me.recommendedModel = new PopularCollection({ url: 'recommended' });
        	
            
            me.listenTo(me.genreModel, 'sync', me.renderGenreMenu);
            me.listenTo(me.qualificationModel, 'sync', me.renderQualification);
            me.listenTo(me.topSearchModel, 'sync', me.renderTopSearch);
            me.listenTo(me.recommendedModel, 'sync', me.renderRecommended);
            
            me.render();
            
            me.genreModel.fetch();
            me.qualificationModel.fetch();
            me.topSearchModel.fetch();
            me.recommendedModel.fetch();
        },

        render: function () {
        	var me = this;
        	this.$el.html(this.template);
            
            return this;
        },
        
        renderGenreMenu: function() {
        	$('#main-menu').html(this.genreTemplate({genre: this.genreModel.toJSON()}));
        }
    });

    return MainMenuView;
});
