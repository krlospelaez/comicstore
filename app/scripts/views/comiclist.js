/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/comiclist.hbs'
], function ($, _, Backbone, Handlebars, sourceTpl) {
    'use strict';

    var ComicListView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        template: Handlebars.compile(sourceTpl),
        
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
        	me.listenTo(me.model, 'sync', me.renderData);
        	
        	me.title = options.title;
        	
        	me.fetchModel();
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	this.$el.html(this.template({comics: this.model.toJSON(), title: this.title}));
        },
        
        availableMenu: function(event) {
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

    return ComicListView;
});
