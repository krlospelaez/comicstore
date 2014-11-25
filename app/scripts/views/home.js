/*global define*/
var ag;
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
	
    var HomeView = Backbone.View.extend({
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
        
        fetchModel: function(filters) {
        	var me = this;
        	var filter = {};
        	if(!_.isEmpty(me.filter)) {
        		filter = _.clone(me.filter);
        	}
        	
        	if(!_.isEmpty(filters)) {
        		filter = _.extend(filter, filters)
        	}
        	
        	me.model.fetch({
        		reset: true,
				success: function(items) {
					if(!_.isEmpty(filter)) {
						me.model.models = items.where(filter);
					}
				}
			});
        },

        initialize: function (options) {
        	var me = this;
        	me.filter = options.filter;
        	me.model.comparator = 'order';
        	
        	me.genreModel = new GenreCollection();
        	me.qualificationModel = new PopularCollection({ url: 'qualification' });
        	me.topSearchModel = new PopularCollection({ url: 'topsearch' });
        	me.recommendedModel = new PopularCollection({ url: 'recommended' });
        	
            me.listenTo(me.model, 'sync', me.renderComicList);
            me.listenTo(me.genreModel, 'sync', me.renderGenreMenu);
            me.listenTo(me.qualificationModel, 'sync', me.renderQualification);
            me.listenTo(me.topSearchModel, 'sync', me.renderTopSearch);
            me.listenTo(me.recommendedModel, 'sync', me.renderRecommended);
            
            me.render();
            
            me.genreModel.fetch();
            me.qualificationModel.fetch();
            me.topSearchModel.fetch();
            me.recommendedModel.fetch();
            me.fetchModel();
        },

        render: function () {
        	var me = this;
        	this.$el.html(this.template);
            
            return this;
        },
        
        renderComicList: function() {
        	var comicListView = new ComicListView({model: this.model});
            $('#home-view').html(comicListView.render().el);
        },
        
        renderGenreMenu: function() {
        	$('#genre-menu').append(this.genreTemplate({genre: this.genreModel.toJSON()}));
        },
        
        renderQualification: function() {
        	$('#qualification-menu').html(this.popularTemplate({popular: this.qualificationModel.toJSON()}));
        },
        
        renderTopSearch: function() {
        	$('#top-search-menu').html(this.popularTemplate({popular: this.topSearchModel.toJSON()}));
        },
        
        renderRecommended: function() {
        	$('#recommended-menu').html(this.popularTemplate({popular: this.recommendedModel.toJSON()}));
        },
        
        availableMenu: function(event) {
        	ag = event;
        	var me = this;
        	switch($(event.currentTarget).data().value) {
        		case "all":
        			me.fetchModel();
        			break;
        		case "available":
        			me.fetchModel({available: true});
        			break;
        		case "borrowed":
        			me.fetchModel({available: false});
        			break;
        		default:
        			break;
        	}
        	
        	var ul = $(event.target).closest('ul');
        	ul.find('.active').removeClass('active');
        	$(event.currentTarget).addClass('active');
        }
    });

    return HomeView;
});
