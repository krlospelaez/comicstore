/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/editions.hbs'
], function ($, _, Backbone, Handlebars, sourceTpl) {
    'use strict';

    var EditionsView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        template: Handlebars.compile(sourceTpl),

        initialize: function (options) {
            var me = this;
            
            me.search = options.search;
            me.listenTo(me.model, 'sync', me.renderData);
            
            if(me.search) {
	            me.model.fetch({
	            	success: function(items) {
	            		me.model.models = me.model.filter(function(item) {
	            			var name = item.get('name');
	            			return (name.toLowerCase().indexOf(me.search.name.toLowerCase()) != -1);
	            		});
	            	}
	            });
            }
            else {
            	me.model.fetch();
            }
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	var me = this;
        	me.$el.html(this.template({editions: me.model.toJSON()}));
        	
        	if(me.search) {
        		$('#txt-search').val(me.search.name);
				$('#sel-category').val('edition');
				$('#available-menu').addClass('hide');
        	}
        }
    });

    return EditionsView;
});
