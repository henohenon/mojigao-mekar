'use strict';
const fs = require('fs');

function handleLogout(req, res) {
  res.writeHead(401, {//コンナ感じで返させてもらいますぅー
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end('<!DOCTYPE html><html lang="jp"><body>' +
    '<h1>ログアウトしました</h1>' +
    '<a href="/posts">ログイン</h1>' +
    '</body></html>');//で新しいの作って返してると
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('ページがみつかりません');//上と同じ
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のメソッドです');//上に同じ
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon'
  });
  const favicon = fs.readFileSync('https://raw.githubusercontent.com/henoheTK/mojigao-mekar/master/favicon%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.ico');
  res.end(favicon);//アイコンを返すやつらしい
}

module.exports = {
  handleLogout,
  handleNotFound,
  handleBadRequest,
  handleFavicon
};