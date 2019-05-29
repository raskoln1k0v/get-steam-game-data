const request = require('request');
const {
	BASE_API_URL,
	COUNT_URL_PATH,
	BASE_URL,
	FILE_EXT,
	GAME_LIST,
	JSON_PARAM,
	NEWS_JSON,
	NEWS_PATH_LOCAL,
	NEWS_URL_PATH,
	REVIEWS,
	REVIEWS_PATH_LOCAL,
	REVIEW_PATH,
	NEWS
} = require('./constants'); // object destructuring
const fs = require('fs');
let object = [];
let reviewList;
let gameList = [];

let goAhead = true;

function saveReviewToFile(gameId, data) {
	// var jsonData = JSON.parse(reviewData);
	fs.writeFile(REVIEWS_PATH_LOCAL + gameId + FILE_EXT, data, (error) => {
		if (error) {
			console.error('Error writing File ' + gameId + ' Error: ' + error);
		} else {
			console.log('Reviews for game ' + gameId + ' written sucessfully ');
			goAhead = true;
		}
	});
}

function saveNewsToFile(gameId, data) {
	// var jsonData = JSON.parse(reviewData);
	fs.writeFile(NEWS_PATH_LOCAL + gameId + FILE_EXT, data, (error) => {
		if (error) {
			console.error('Error writing File ' + gameId + ' Error: ' + error);
		} else {
			console.log('News for game ' + gameId + ' written sucessfully ');
			goAhead = true;
		}
	});
}

function getReviews(gameId, options) {
	return new Promise((resolve, reject) => {
		request.get(options, (error, response, body) => {
			if (error) {
				console.error('Get Request for Game' + gameId + ' has Error: ' + error);
				reject();
			} else if (response.statusCode == 200) {
				console.log('Succesfully Fetched review for Game: ' + gameId);
				var reviewData = response.body;
				// console.log('Reponse: ' + response.body);
				saveReviewToFile(gameId, reviewData);
				resolve();
			} else {
				console.log('Something went wrong.... ' + response.statusCode);
				reject();
			}
		});
	});
}

function getNews(gameId, options) {
	return new Promise((resolve, reject) => {
		request.get(options, (error, response, body) => {
			if (error) {
				console.error('Get News Request for Game' + gameId + ' has Error: ' + error);
				reject();
			} else if (response.statusCode == 200) {
				console.log('Succesfully Fetched news for Game: ' + gameId);
				var reviewData = response.body;
				//console.log('Reponse: ' + response.body);
				saveNewsToFile(gameId, reviewData);
				resolve();
			} else {
				console.log('Something went wrong.... ' + response.statusCode);
				reject();
			}
		});
	});
}

async function initiateRequest(type) {
	let i = 0;
	while (i < gameList.length) {
		if (true) {
			goAhead = false;
			// console.log('Game Data: ' + gameList[i]);
			let gameId = gameList[i].id;
			let url;
			if (type == REVIEWS) {
				url = `${BASE_URL}${REVIEW_PATH}${gameId}${JSON_PARAM}`;
			} else if (type == NEWS) {
				url = `${BASE_API_URL}${NEWS_URL_PATH}${gameId}${COUNT_URL_PATH}${NEWS_JSON}`;
			}
			const options = {
				uri: url,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			try {
				if (type == REVIEWS) {
					await getReviews(gameId, options);
				} else if (type == NEWS) {
					await getNews(gameId, options);
				}
			} catch (error) {
				console.error('GET Request Failed for game: ' + gameId);
			}
			i += 1;
		}

	}
}

fs.readFile(GAME_LIST, (error, data) => {
	console.log('Starting file read ...');
	if (error) {
		console.error(" Read Error encountered for File: " + gameList);
		throw error;
	} object = JSON.parse(data);
	console.log('Finished File read.');
	console.log("Length of list: " + object.data.length);
	gameList = object.data;
	goAhead = true;
	initiateRequest(REVIEWS);
	initiateRequest(NEWS);
});

