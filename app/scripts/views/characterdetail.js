/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/characterdetail.hbs',
    'models/characterdetail'
], function ($, _, Backbone, Handlebars, sourceTpl) {

    'use strict';
	
    var CharacterDetailView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: 'row',

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
        	this.$el.html(this.template(me.model.toJSON()));
        }
    });

    return CharacterDetailView;
});
