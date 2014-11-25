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

        initialize: function () {
            var me = this;
            
            me.listenTo(me.model, 'sync', me.renderData);
            me.model.fetch();
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	this.$el.html(this.template({characters: this.model.toJSON()}));
        	//this.$el.html('hola');
        }
    });

    return CharactersView;
});
