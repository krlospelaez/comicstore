/*global define*/

define([
    'underscore',
    'backbone',
    'models/edition'
], function (_, Backbone, EditionModel) {
    'use strict';

    var EditionCollection = Backbone.Collection.extend({
    	url: '/data/editions.json',
        model: EditionModel
    });

    return EditionCollection;
});
