/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/comiclist.hbs'
    //'templates'
], function ($, _, Backbone, Handlebars, sourceTpl) {
    'use strict';

    var ComicListView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            //this.$el.html(this.template(this.model.toJSON()));
            //var source = require('text!templates/comiclist.hbs');
        	var template = Handlebars.compile(sourceTpl);
        	this.$el.html(template);
        	
            return this;
        }
    });

    return ComicListView;
});
