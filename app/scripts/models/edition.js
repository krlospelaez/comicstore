/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var EditionModel = Backbone.Model.extend({
        //url: '',

        initialize: function() {
        },

        defaults: {
        	id: '',
        	name: '',
        	url: '',
        	order: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return EditionModel;
});
