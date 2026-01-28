$(function() {										// when the DOM is fully loaded
	$('#searchForm').submit(function(e) {			// event handler
		let searchText = $('#searchText').val();	// store input text to variable
		getGames(searchText);
		e.preventDefault();							// cancel any default action
	});
});

function getGames(searchText) {
	$.ajax({										// Perform an asynchronous HTTP (Ajax) request
		type: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		jsonp: 'json_callback',
		url: 'https://www.giantbomb.com/api/search/?api_key=2d24dc8ae0b03ae4c69ff649fd8bbcd004addb3e&query=' + searchText + '&resources=game&format=jsonp'
	})
	.done(function(data){							// done will resolve as soon as we have the response
		let games = data.results;
		let output = '';

		if (games.length == 0) {					// if the search doesn't match any results
			output += '<h3 style="color: white;">No games found!</h3>';
			$('#result').html(output);
		} else {
			$.map(games, function(game) {			// .map() translates all items in an array or object to new array of items.
				output += `
				<div class="column">
					<figure style=" width:200px; height: 200px;" onclick="gameSelected('${game.id}')" href="#">
						<img src="${game.image.small_url}" style="border-radius: 5px; width:200px; height: 200px;">
						<a onclick="gameSelected('${game.id}')" href="#" class="btn btn-primary" style="color: white;">${game.name}</a>
					<figure>
		        	
		        </div>
				`;
				$('#result').html(output);
			});
		}			
	})
	.fail(function() {								// if there is an error sending the request
		let errMsg = '<h3>An error occured</h3>';	// new variable because output is undefined
		$('#result').html(errMsg);
	});
};

function gameSelected(id) {
	sessionStorage.setItem('gameID', id);
	window.location.assign('game.html');
	return false;
}

function getGame() {
	let gameId = sessionStorage.getItem('gameID');

	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		jsonp: 'json_callback',
		url: 'https://www.giantbomb.com/api/game/' + gameId + '/?api_key=2d24dc8ae0b03ae4c69ff649fd8bbcd004addb3e&format=jsonp'
	})
	.done(function(data){
		let game = data.results;
		let output = `
			<div class="row">
	    		<div class="col-md-4">
	    			<img class="rounded" src="${game.image.medium_url}" style="width:100%; border-radius: 5px;">
	    		</div>
	    		<div class="col-md-8">
	    			<h2 style="color: white;">${game.name}</h2>
	    			<p id="deck" class="font-italic" style="color: white;"></p>
	    			<ul class="list-group" style="margin-left: -10px;">
	    				<li id="platforms" class="list-group-item"><strong>Platforms: </strong></li>
	    				<li id="genres" class="list-group-item"><strong>Genres: </strong></li>
	    				<li id="themes" class="list-group-item"><strong>Themes: </strong></li>
	    				<li id="devs" class="list-group-item"><strong>Developers: </strong></li>
	    				<li id="pubs" class="list-group-item"><strong>Publishers: </strong></li>
	    				<li id="release" class="list-group-item"></li>
	    			</ul>
	    			<a href="${game.site_detail_url}" target="_blank" class="btn btn-primary">View on Giantbomb</a>
		            <a href="search.html" class="btn btn-link">Go Back To Search</a>
	    		</div>
	    	<form>
	    	</div>
		`;
		$('#game').html(output);

		if (game.deck == null) {
			$('p#deck').append('No description available');
		} else {
			$('p#deck').append(game.deck);
		}
		if (game.platforms == null) {
			$('li#platforms').append('N/A');
		} else {
			for (i = 0; i < game.platforms.length; i++) {
				$('li#platforms').append(game.platforms[i].name + '; ');
			}
		}
		if (game.genres == null) {
			$('li#genres').append('N/A');
		} else {
			for (i = 0; i < game.genres.length; i++) {
				$('li#genres').append(game.genres[i].name + '; ');
			}
		}
		if (game.themes == null) {
			$('li#themes').append('N/A');
		} else {
			for (i = 0; i < game.themes.length; i++) {
				$('li#themes').append(game.themes[i].name + '; ');
			}
		}
		if (game.developers == null) {
			$('li#devs').append('N/A');
		} else {
			for (i = 0; i < game.developers.length; i++) {
				$('li#devs').append(game.developers[i].name + '; ');
			}
		}
		if (game.publishers == null) {
			$('li#pubs').append('N/A');
		} else {
			for (i = 0; i < game.publishers.length; i++) {
				$('li#pubs').append(game.publishers[i].name + '; ');
			}
		}
		if (game.expected_release_year !== null) {
			$('li#release').append('<strong>Expected release year: </strong>' + game.expected_release_year);
		} else if (game.original_release_date !== null) {
			$('li#release').append('<strong>Original release date: </strong>' + game.original_release_date);
		} else {
			$('li#release').append('<strong>Release date: </strong>N/A');
		}
	})
	.fail(function() {
		let errMsg = '<h3 style="color: white;">An error occured</h3>';
		$('#game').append(errMsg);
	});
}