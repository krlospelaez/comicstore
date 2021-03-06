/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/characters.hbs'
], function ($, _, Backbone, Handlebars, sourceTpl) {
    'use strict';

    var CharactersView = Backbone.View.extend({

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
        	me.$el.html(this.template({characters: me.model.toJSON()}));
        	
        	if(me.search) {
        		$('#txt-search').val(me.search.name);
				$('#sel-category').val('character');
				$('#available-menu').addClass('hide');
        	}
        }
    });

    return CharactersView;
});
