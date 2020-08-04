'use strict';
const http = require('http');
const auth = require('http-auth');
const router = require('./lib/router');

const basic = auth.basic({//ユーザー情報的な
  realm: 'Enter username and password.',
  file: './users.htpasswd'
});



const server = http.createServer((req, res) => {//サーバー建てるよぉーってかっ建ったとき(多分)
	router.route(req, res);
}).on('error', (e) => {//サーバーエラー出てまっせっていう
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {//クライアントエラー出てまっせ
	console.error('[' + new Date() + '] Client Error', e);
});
const port = 8000;
server.listen(port, () => {
	console.info('[' + new Date() + '] Listening on ' + port);
});
