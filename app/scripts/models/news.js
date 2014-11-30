/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var NewsModel = Backbone.Model.extend({
        url: '/data/news.json',

        initialize: function() {
        },

        defaults: {
			comics: '',
			mostLoans: '',
			videos: '',
			games: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return NewsModel;
});
