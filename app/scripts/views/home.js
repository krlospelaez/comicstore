/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/home.hbs',
    'views/comiclist',
    'text!templates/popular.hbs',
    'collections/popular'
], function ($, _, Backbone, Handlebars, sourceTpl,
			 ComicListView, popularTpl, PopularCollection) {

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
        popularTemplate: Handlebars.compile(popularTpl),

        initialize: function (options) {
        	var me = this;
        	
        	me.qualificationModel = new PopularCollection({ url: 'qualification' });
        	me.topSearchModel = new PopularCollection({ url: 'topsearch' });
        	me.recommendedModel = new PopularCollection({ url: 'recommended' });
        	
            
            me.listenTo(me.qualificationModel, 'sync', me.renderQualification);
            me.listenTo(me.topSearchModel, 'sync', me.renderTopSearch);
            me.listenTo(me.recommendedModel, 'sync', me.renderRecommended);
            
            me.render();
            
            me.qualificationModel.fetch();
            me.topSearchModel.fetch();
            me.recommendedModel.fetch();
        },

        render: function () {
        	var me = this;
        	this.$el.html(this.template);
            
            return this;
        },
        
        renderSubView: function(view) {
        	if(view.availableMenu) {
        		$('#available-menu').removeClass('hide');
        	}
        	else {
        		$('#available-menu').addClass('hide');
        	}
        	
        	$('#home-view').html(view.render().el);
        	this.currentSubView = view;
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
        	if(this.currentSubView.availableMenu) {
        		this.currentSubView.availableMenu(event);
        	}
        }
    });

    return HomeView;
});
