/*global define*/

define([
    'underscore',
    'backbone',
    'models/character'
], function (_, Backbone, CharacterModel) {
    'use strict';

    var CharacterCollection = Backbone.Collection.extend({
    	url: '/data/characters.json',
        model: CharacterModel
    });

    return CharacterCollection;
});
