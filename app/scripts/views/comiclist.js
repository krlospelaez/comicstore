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

        initialize: function () {
            
        },

        render: function () {
        	this.$el.html(this.template({comics: this.model.toJSON()}));
        	
            return this;
        }
    });

    return ComicListView;
});
