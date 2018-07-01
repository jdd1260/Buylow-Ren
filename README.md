# BuyLow Ren

![](https://media.giphy.com/media/3o84stMkKVCQHzyQqA/giphy.gif)

Be free of the pain of watching stock prices change. Get stock updates straight to your email - but only ones that help you know when to buy low. 

## Features

  - Easily Customizable
  -- Choose stocks you want to follow
  -- Set a minimum percentage drop that you want to be notified about
  -- Set a percentage of the 52 Week High that you don't want to be over
  - Get an email each time a stock price meets your filters AND reaches a new low for the day
  - Deploy and schedule (every 5 minutes 9 am - 5 pm, M-F) with one command, for free
  - Test it out locally without deploying
 
## How it Works

- Uses the [IEX API](https://iextrading.com/developer/docs/) for stock price data
- Uses [Webtask](https://webtask.io/) to deploy and schedule Buylow Ren
- Uses [Mailgun](https://www.mailgun.com/) to send you an email

## Prerequisites

- Installed [nvm](https://github.com/creationix/nvm) or node.js v8.10+
- Get a free [Webtask](https://webtask.io/) account.
- Get a free [Mailgun](https://www.mailgun.com/) account. You don't need to verify a domain. Just get a domain and add yourself as an email receiver.

## Run It

![](https://media.giphy.com/media/l1ugmVhS1JOoCw5LG/giphy.gif)

### Installation

```sh
$ git clone git@github.com:jdd1260/buylow-ren.git
$ cd buylow-ren
$ nvm install && npm install
$ cp .env-example .env
```

Then, open `.env` and replace the values that you would like to use - including your Mailgun API key and domain, stocks you want to follow, cutoffs for daily change and 52 week high, and your email address.

### Run locally

```sh
$ npm start
```

### Deploy

```sh
$ npm run deploy
```

As part of the deploy process you will need to login using your webtask account. By default it will run every 5 minues, from 9 am - 5 pm (New York) Monday-Friday.

## Further Customization

- You can change your run schedule by editing the CRON string in the deploy script in `package.json`
- You could add, remove, or modify filters in `webtask.js` in the `filterStocks` method.
- You could change the structure of the email you received in `webtask.js` in the `makeEmail` method.

