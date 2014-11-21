/*global define*/

define([
    'underscore',
    'backbone',
    'models/genre'
], function (_, Backbone, GenreModel) {
    'use strict';

    var GenreCollection = Backbone.Collection.extend({
    	url: '/data/genre.json',
        model: GenreModel
    });

    return GenreCollection;
});
