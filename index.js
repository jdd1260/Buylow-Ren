const webtask = require('./webtask');

const secrets = process.env;

function callback(error, response) {
	if (error) {
		console.error('Webtask completed with error:\n', error);
	} else {
		console.log('Webtask completed successfully');
	}
}

webtask({ secrets }, callback);