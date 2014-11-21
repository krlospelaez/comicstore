/*global define*/

define([
    'underscore',
    'backbone',
    'models/comic'
], function (_, Backbone, ComicModel) {
    'use strict';

    var ComicCollection = Backbone.Collection.extend({
    	url: '/data/comics.json',
        model: ComicModel
    });

    return ComicCollection;
});
