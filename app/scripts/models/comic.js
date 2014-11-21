/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ComicModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        	id: '',
        	name: '',
        	url: '',
        	available: '',
        	genre: '',
        	order: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return ComicModel;
});
