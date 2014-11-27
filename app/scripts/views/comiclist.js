/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/comiclist.hbs',
    'collections/loan',
    'models/loan',
    'models/session'
], function ($, _, Backbone, Handlebars, sourceTpl, LoanCollection, LoanModel, Session) {
    'use strict';

    var ComicListView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {
        	'click .borrow': 'loan'
        },
        
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
					me.model.each(function(comic) {
		    			var available = me.loanModel.findWhere({comicId: comic.get('id')});
		    			comic.set('available', (available) ? false : true);
		    		});
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
        	
        	me.loanModel = new LoanCollection();
        	
        	me.listenTo(me.model, 'sync', me.fetchLoans);
        	me.listenTo(me.loanModel, 'sync', me.renderData);
        	
        	me.title = options.title;
        	
        	me.fetchModel();
        	me.loanModel.fetch();
        },
        
        fetchLoans: function() {
        	var me = this;
        	
        	me.loanModel.fetch({reset: true});
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	var me = this;
        	me.model.each(function(comic) {
    			var available = me.loanModel.findWhere({comicId: comic.get('id')});
    			comic.set('available', (available) ? false : true);
    		});
    		
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
        },
        
        loan: function(event) {
        	var me = this;
        	var comicId = $(event.target).data('value');
        	var user = Session.get('user');
        	var model = new LoanModel({
        		comicId: comicId,
        		userId: user.id
        	});
        	
        	me.loanModel.add(model);
        	model.save();
        }
    });

    return ComicListView;
});
