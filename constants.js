module.exports = Object.freeze({
	BASE_URL: 'https://store.steampowered.com/',
	BASE_API_URL: 'https://api.steampowered.com/',
	NEWS_URL_PATH: 'ISteamNews/GetNewsForApp/v0002/?appid=',
	COUNT_URL_PATH: '&count=3000',
	NEWS_JSON: '&format=json',
	REVIEW_PATH: 'appreviews/',
	JSON_PARAM: '?json=1',
	GAME_LIST: "gameId.json",
	REVIEWS_PATH_LOCAL: `${__dirname}/reviews/`,
	FILE_EXT: '.json',
	NEWS_PATH_LOCAL: `${__dirname}/news/`,
	REVIEWS: 'reviews',
	NEWS: 'news'
});
