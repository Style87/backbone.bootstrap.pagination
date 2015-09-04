var Pagination = Backbone.View.extend({

	$elements:{
		goToInput: null
	},

	events: {
		'click   .first'                 : 'onFirstPage',
		'click   .previous'              : 'onPreviousPage',
		'click   .page'                  : 'onPage',
		'click   .next'                  : 'onNextPage',
		'click   .last'                  : 'onLastPage',
		'click   #pagination-goto-btn'   : 'onGoToPage',
		'keydown #pagination-goto-input' : 'onKeyDownGoToPageInput',
		'keyup   #pagination-goto-input' : 'onKeyUpGoToPageInput',
	},

	initialize: function(options) {
		// Set the defaults for options
		this.options = _.extend({
			el          : null,
			perPage     : 20,
			page        : 1,
			totalCount  : 0,
			pagesToShow : 5,
			goTo        : true,
			template    : _.template($('#pagination-template').html()),
		}, options);

		if (this.options.el == null)
		{
			// Set a dummy el
			this.options.el = $('<div>');
		}

		// Set the template
		this.template = this.options.template;

		// Set this.$el to the options value
		this.$el = this.options.el;

		// Ensure all integer values are parsed as such
		this.options.page        = parseInt(this.options.page);
		this.options.perPage     = parseInt(this.options.perPage);
		this.options.totalCount  = parseInt(this.options.totalCount);
		this.options.pagesToShow = parseInt(this.options.pagesToShow);

		if ($('#pagination-style').length == 0)
		{
			$('body').append($('#pagination-style-template').html());
		}
	},

	render: function() {
		var self = this,
				$el  = this.$el,
				disablePrevious, disableNext;

		var pages = this._getPages();

		if (this.options.page == 1 || pages == 1)
		{
			disablePrevious = true;
		}
		else
		{
			disablePrevious = false;
		}

		if (this.options.page == pages)
		{
			disableNext = true;
		}
		else
		{
			disableNext = false;
		}

		var radius = Math.floor(this.options.pagesToShow/2);

		if (pages <= this.options.pagesToShow)
		{
			lowerPage = 1;
			upperPage = pages;
		}
		else
		{
			if (this.options.page <= radius+(this.options.pagesToShow%2))
			{
				lowerPage = 1
				upperPage = this.options.pagesToShow;
			}
			else if (this.options.page >= pages - radius)
			{
				lowerPage = pages - this.options.pagesToShow;
				upperPage = pages;
			}
			else
			{
				lowerPage = this.options.page - radius;
				upperPage = this.options.page + radius;
			}
		}

		var showingText = 'Showing ' + (((this.options.page - 1) * this.options.perPage) + 1) + ' to ' + (Math.min(this.options.page * this.options.perPage, this.options.totalCount)) + ' of ' + this.options.totalCount + ' entries.';

		// Draw the template
		$el.html(this.template({
			showingText     : showingText,
			disablePrevious : disablePrevious,
			disableNext     : disableNext,
			showingFrom     : (((this.options.page - 1) * this.options.perPage) + 1),
			showingTo       : (Math.min(this.options.page * this.options.perPage, this.options.totalCount)),
			showingTotal    : this.options.totalCount,
			lowerPage       : lowerPage,
			upperPage       : upperPage,
			page            : this.options.page,
			perPage         : this.options.perPage,
			totalCount      : this.options.totalCount,
		}));

		this.$elements.goToInput = this.$el.find('#pagination-goto-input');
	},

	onFirstPage: function(e) {
		if ($(e.currentTarget).hasClass('disabled')) return;
		this.setPage(1);
	},

	onPreviousPage: function(e) {
		if ($(e.currentTarget).hasClass('disabled')) return;
		if (this.options.page > 1)
		{
			this.setPage(this.options.page - 1)
		}
	},

	onPage: function(e) {
		e.preventDefault();

		this.setPage($(e.currentTarget).data('page'));
	},

	onKeyDownGoToPageInput: function(e){
		// Allow: backspace, delete, tab, escape
		if ($.inArray(e.keyCode, [8, 46, 9, 27]) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: Ctrl+C
			(e.keyCode == 67 && e.ctrlKey === true) ||
			// Allow: Ctrl+X
			(e.keyCode == 88 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	},

	onKeyUpGoToPageInput: function(e){
		if(e.which == 13)
		{
			this.onGoToPage();
			e.preventDefault();
			return;
		}
	},

	onGoToPage: function() {
		var page = parseInt(this.$elements.goToInput.val());

		if (page == '' || page < 1 || isNaN(page))
		{
			this.$elements.goToInput.val('');
			return;
		}

		if (page > this._getPages())
		{
			page = this._getPages();
		}

		this.setPage(page);
		this.render();
	},

	onNextPage: function(e) {
		if ($(e.currentTarget).hasClass('disabled')) return;
		if (this.options.page < this._getPages())
		{
			this.setPage(this.options.page + 1)
		}
	},

	onLastPage: function(e) {
		if ($(e.currentTarget).hasClass('disabled')) return;
		this.setPage(this._getPages());
	},

	_getPages: function() {
		return parseInt(Math.ceil(this.options.totalCount / this.options.perPage));
	},

	setTotalCount:function(totalCount) {
		this.options.totalCount = parseInt(totalCount);

		var pages = this._getPages();

		if (pages < this.options.page) {
			this.setPage(pages,true);
		}

		if (this.options.page == 0) {
			this.setPage(1,true);
		}
	},
	getTotalCount:function(){
		return this.options.totalCount;
	},

	setPage:function(page, suppressEvent) {
		this.options.page = parseInt(page);

		if (!suppressEvent) {
			this.$el.trigger('pagination.onPageChange', [page]);
		}
		
		this.render();
	},
	getPage: function(){
		return this.options.page;
	},

	setPerPage: function(perPage){
		this.options.perPage = parseInt(perPage);
	},
	getPerPage:function(){
		return this.options.perPage;
	},

	getOptions:function(){
		return this.options;
	},

	hideShowing: function(){
		$('#pagination-pagination_text').hide();
	},

	showShowing: function(){
		$('#pagination-pagination_text').show();
	},

	hidePagination: function(){
		$('#pagination-pagination_input').hide();
	},

	showPagination: function(){
		$('#pagination-pagination_input').show();
	},
});