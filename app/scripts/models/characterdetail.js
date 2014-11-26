/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CharacterDetailModel = Backbone.Model.extend({
        url: 'data/character/detail/',

        initialize: function(options) {
        	this.url = this.url + options.characterId + '.json';
        },

        defaults: {
        	id: '',
        	name: '',
        	image: '',
        	description: '',
        	realName: '',
        	powers: '',
        	movies: '',
        	games: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return CharacterDetailModel;
});
