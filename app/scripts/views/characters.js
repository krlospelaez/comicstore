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
            
        },

        render: function () {
        	this.$el.html(this.template({characters: this.model.toJSON()}));
        	
            return this;
        }
    });

    return CharactersView;
});
