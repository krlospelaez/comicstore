/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/profile.hbs',
    'collections/loan',
    'collections/comic',
    'collections/comment',
    'models/comment'
], function ($, _, Backbone, Handlebars, sourceTpl, LoanCollection, ComicCollection, CommentCollection, CommentModel) {

    'use strict';
	
    var ProfileView = Backbone.View.extend({
        tagName: 'div',

        id: '',

        className: 'row',

        events: {
        	'click .comic-comment': 'comment'
        },
        
        template: Handlebars.compile(sourceTpl),

        initialize: function (options) {
        	var me = this;
            
            me.loanModel = new LoanCollection();
            me.comicModel = new ComicCollection();
            me.commentModel = new CommentCollection();
            
            me.listenTo(me.loanModel, 'sync', me.fetchComicModel);
            me.listenTo(me.comicModel, 'sync', me.fetchCommentModel);
            me.listenTo(me.commentModel, 'sync', me.renderData);
            //me.model.fetch();
            
            //me.renderData();
            me.loanModel.fetch();
        },

        render: function () {
            return this;
        },
        
        renderData: function() {
        	var me = this;
        	var tmpCommentModel = new CommentCollection();
        	
        	var loans = me.loanModel.filter(function(model) { return model.get('userId') == me.model.get('id') });
        	me.comicModel.models = me.comicModel.filter(function(model) {
        		return _.any(loans, function(loan) {
        			return loan.get('comicId') == model.get('id');
        		});
        	});
        	
        	me.comicModel.each(function(comic) {
        		tmpCommentModel.models = me.commentModel.filter(function(comment) {
					return comment.get('comicId') == comic.get('id');
        		});
        		
        		comic.set('comments', tmpCommentModel.toJSON());
        	});
        	
        	var profile = me.model.toJSON();
        	profile['comics'] = me.comicModel.toJSON();
        	console.log(profile);
        	this.$el.html(this.template(profile));
        },
        
        fetchComicModel: function() {
        	var me = this;
        	
        	me.comicModel.fetch();
        },
        
        fetchCommentModel: function() {
        	var me = this;
        	
        	me.commentModel.fetch();
        },
        
        comment: function(event) {
        	var me = this;
        	var userId = me.model.get('id');
        	var userName = me.model.get('userName');
        	var comicId = $(event.target).data('value');
        	var comment = $('#comment-add-' + comicId).val();
        	
        	var commentObj = {
        		userId: userId,
        		userName: userName,
        		comicId: comicId,
        		comment: comment
        	};
        	
        	var model = new CommentModel(commentObj);
        	
        	me.commentModel.add(model);
        	model.save();
        	//me.commentModel.fetch({reset: true});
        }
    });

    return ProfileView;
});
