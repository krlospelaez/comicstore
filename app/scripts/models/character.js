/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CharacterModel = Backbone.Model.extend({
        //url: '',

        initialize: function() {
        },

        defaults: {
        	id: '',
        	name: '',
        	url: '',
        	genre: '',
        	order: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return CharacterModel;
});
