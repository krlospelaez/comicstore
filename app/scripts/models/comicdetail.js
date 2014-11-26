/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ComicDetailModel = Backbone.Model.extend({
        url: 'data/comic/detail/',

        initialize: function(options) {
        	this.url = this.url + options.comicId + '.json';
        },

        defaults: {
        	id: '',
        	title: '',
        	synopsis: '',
        	character: '',
        	writtenBy: '',
        	artBy: '',
        	coverBy: '',
        	pageCount: '',
        	releaseDate: '',
        	ageRating: '',
        	copyright: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return ComicDetailModel;
});
