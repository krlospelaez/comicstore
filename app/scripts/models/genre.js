/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GenreModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        	id: '',
        	name: '',
        	url: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return GenreModel;
});
