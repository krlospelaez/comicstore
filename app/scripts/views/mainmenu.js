/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/mainmenu.hbs',
    'collections/genre',
], function ($, _, Backbone, Handlebars, sourceTpl, GenreCollection) {

    'use strict';
	
    var MainMenuView = Backbone.View.extend({
        tagName: '',

        id: '',

        className: '',

        events: {
        	'click #btn-search': 'search'
        },
        
        el: '#main-menu',
        
        template: Handlebars.compile(sourceTpl),

        initialize: function (options) {
        	var me = this;
        	
        	me.model = new GenreCollection();
        	
            
            me.listenTo(me.model, 'sync', me.render);
            
            me.model.fetch();
        },

        render: function () {
        	var me = this;
        	me.$el.html(me.template({genre: me.model.toJSON()}));
        	
        	$('#txt-search').keydown(function(event) {
        		if(event.keyCode == 13) {
					event.preventDefault();
					me.search();
					return false;
				}
        	});
            
            return me;
        },
        
        search: function() {
        	var category = $('#sel-category').val();
        	var search = $('#txt-search').val();
        	
        	switch(category) {
        		case 'comic':
        			Backbone.history.navigate('#!/comic/search/' + search, { trigger : true });
        			break;
        		case 'character':
        			Backbone.history.navigate('#!/characters/search/' + search, { trigger : true });
        			break;
        		case 'loans':
        			Backbone.history.navigate('#!/loans/search/' + search, { trigger : true });
        			break;
        		case 'edition':
        			Backbone.history.navigate('#!/editions/search/' + search, { trigger : true });
        			break;
        		default:
        			break;
        	}
        }
    });

    return MainMenuView;
});
