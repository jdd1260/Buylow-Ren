const axios = require('axios');
const _ = require('lodash');

module.exports = ({ secrets }, cb) => {	
	const mailgun = require('mailgun-js')({apiKey: secrets.apiKey, domain: secrets.domain});

	const fromEmail = 'buylow-ren@mailgun.com';
	const email = secrets.email; 
	const stocks = secrets.stocks;
	const percentDropCutoff = Number(secrets.percentDropCutoff);
	const percentOff52WeekHighCutoff = Number(secrets.percentOff52WeekHighCutoff);

	function sendMail(body) {
		if (!body) {
			console.log('Skipping email - no content to send');
			return;
		}
		const date = (new Date()).toDateString();
		var emailData = {
		  from: `BuyLow Ren <${ fromEmail }>`,
		  to: email,
		  subject: 'StockWatch Update for ' + date,
		  html: body
		};
		console.log('Sending email: \n', body);
		return mailgun.messages().send(emailData);
	}

	function getStocks() {
		const url = `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${ stocks }`;
		return axios.get(url).then(response => _.map(response.data, result => result.quote));
	}

	function filterStocks(stockInfo) {
		return _.filter(stockInfo, ({ changePercent, latestPrice, week52High, low }) => 
			changePercent <= percentDropCutoff && 
			(latestPrice / week52High) <= percentOff52WeekHighCutoff &&
			latestPrice <= low
		);
	}

	function makeStockRows(stockInfo) {
		return stockInfo.map(stock => 
			`
				<tr>
					<td> ${ stock.symbol } </td>
					<td> $${ stock.latestPrice } </td>
					<td> ${ (stock.changePercent * 100).toFixed(2) }% </td>
				</tr>
			`
		).join('\n');
	}

	function makeEmail(stockInfo) {
		const filteredStocks = filterStocks(stockInfo);
		if (filteredStocks.length === 0) return;

		const rows = makeStockRows(filteredStocks);
		return `
			<html>
				<head>
					<style>
						td {
							padding: 8px;
						}
					</style>
				</head>
				<body>
					<h3> ${ filteredStocks.length } stocks now match your filters </h3>
					<div>
						<table>
							<tr>
								<th> Ticker </th>
								<th> Price </th>
								<th> Percent Drop Today </th>
							<tr>
							${ rows }
						</table>
					</div>
				</body>
			</html>
		`;
	}

	getStocks().then(makeEmail).then(sendMail).then(() => cb()).catch(cb);

}

