<script type="text/template" id="pagination-template">
	<div class="row" style="margin-top:18px;">
		<div class="col-xs-12 col-sm-4" >
			<div id="pagination-pagination_text">
				<span>Showing entries <%= showingFrom %> to <%= showingTo %> of <%= showingTotal %></span>
			</div>
		</div>
		<% if (totalCount > perPage) { %>
		<div class="col-xs-12 col-sm-8 text-right pull-right">
			<div id="pagination-pagination_input" class="paging_bootstrap_full">
				<ul class="pagination">
					<li class="first <% if (disablePrevious) { %> disabled <% } %>" style="cursor:pointer;">
						<a class="hidden-xs hidden-sm">First</a>
						<a class="hidden-md hidden-lg hidden-xl"><i class="fa fa-step-backward"></i></a>
					</li>
					<li class="previous <% if (disablePrevious) { %> disabled <% } %>" style="cursor:pointer;">
						<a class="hidden-xs hidden-sm">Previous</a>
						<a class="hidden-md hidden-lg hidden-xl" ><i class="fa fa-chevron-left"></i></a>
					</li>
					<% for (var i=lowerPage;i<=upperPage;i++) { %>
					<li class="<% if (i==page) { %> active <% } %> page" data-page="<%= i %>">
						<a class="hidden-xs"><%= i %></a>
						<a class="hidden-sm hidden-md hidden-lg hidden-xl"><%= i %></a>
					</li>
					<% } %>
					<li class="next <% if (disableNext) { %> disabled <% } %>" style="cursor:pointer;">
						<a class="hidden-xs hidden-sm">Next</a>
						<a class="hidden-md hidden-lg hidden-xl"><i class="fa fa-chevron-right"></i></a>
					</li>
					<li class="last <% if (disableNext) { %> disabled <% } %>" style="cursor:pointer;">
						<a class="hidden-xs hidden-sm">Last</a>
						<a class="hidden-md hidden-lg hidden-xl"><i class="fa fa-step-forward"></i></a>
					</li>
					<li id="pagination-goto">
						<span><input type="text" id="pagination-goto-input" /><button id="pagination-goto-btn" class="btn btn-primary">Go</button></span>
					</li>
				</ul>
			</div>
		</div>
		<% } %>
</script>

<script type="text/template" id="pagination-style-template">
	<style id="pagination-style">
		#pagination-goto span {
			padding: 4px 12px;

			/* Chrome only padding */
			-webkit-padding-after: 4px;  /* Bottom */
	    -webkit-padding-before: 5px; /* Top */
	    -webkit-padding-start: 12px; /* Left */
	    -webkit-padding-end: 12px;   /* Right */

			text-decoration: none;
			color: #3276b1;
			background-color: #fff;
			margin-left: -1px;
		}
		#pagination-goto input {
			padding: 1px 0px 0px 0px;
			margin: 0px;
			width:30px;
			border: 1px solid #ddd;
		}

		#pagination-goto button {
			padding: 0px 4px;
			margin-top: -3px;
			margin-left:5px;
		}
		
		.pagination {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
			margin:0px;
		}
		.pagination .hidden-md {
			padding: 6px 11px;
		}
		
		.pagination .page {
			cursor: pointer;
		}
	</style>
</script>