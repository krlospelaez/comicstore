/*global define*/

define([
    'underscore',
    'backbone',
    'models/comic'
], function (_, Backbone, ComicModel) {
    'use strict';

    var PopularCollection = Backbone.Collection.extend({
    	//url: '/data/qualification.json',
        model: ComicModel,
        initialize: function(options) {
        	this.url = '/data/' + options.url + '.json';
        }
    });

    return PopularCollection;
});
