/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/news.hbs'
], function ($, _, Backbone, Handlebars, sourceTpl) {
    'use strict';

    var NewsView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        
        template: Handlebars.compile(sourceTpl),

        initialize: function (options) {
            var me = this;
            
            me.listenTo(me.model, 'sync', me.renderData);
            
           	me.model.fetch();
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	var me = this;
        	
        	me.$el.html(this.template(me.model.toJSON()));
        }
    });

    return NewsView;
});
