'use strict';
const http = require('http');
const now = new Date();
function handle(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'file; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream('./lib/mojigao-make/mojigao-maker.html');//mojigao-maker.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    case 'POST'://postでもらった時
      let body = [];//配列
			req.on('data', (chunk) => {//リクエストが？dataならチャンクをもらうでー
				body.push(chunk);//bodyにチャンクを入れる
			}).on('end', () => {//リクエストがendなら？
				console.log(body);
				body = Buffer.concat(body).toString();//bodyの中身一つにして読める感じに
				console.log(body);
				const decoded = decodeURIComponent(body);//なんかわからんけどtostringでの文字化けを直してる？
				const qs = require('querystring');//psを使いまっせー
				console.log(decoded);
				const answer = qs.parse(decoded);//aaa=bbb&ccc=dddを{ aaa: 'bbb', ccc: 'ddd' }にするかんじで配列？に直してる
				console.info('[' + now + '] 投稿： ' +answer["img_name"]+ answer["img_url"]);
				res.write('<!DOCTYPE html><html lang="ja"><body><h1>'+answer["img_name"] + 'を投稿しました。</h1><img src="'+answer["img_url"]+'"></body></html>');
				res.end();
      });
      break;
    default:
      break;
  }
}
function handle_css(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'text/css; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream("./lib/mojigao-make/mojigao-maker.css");//mojigao-maker.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    default:
      break;
  }
}
function handle_image(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'image/png; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream("./lib/mojigao-make/次だ.png");//mojigao-maker.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    default:
      break;
  }
}
function handle_js(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'text/css; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream('./lib/mojigao-make/mojigao-maker.js');//mojigao-maker.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    default:
      break;
  }
}
function handle_js(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'text/js; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream('./lib/mojigao-make/mojigao-maker.js');//mojigao-maker.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    default:
      break;
  }
}



function chunkToParse(req){ //{ aaa: 'bbb', ccc: 'ddd' }って感じでリクエスト読みやすくする関数
  const qs = require('querystring');//psを使いまっせー
  let body = [];//bodyを召喚
  req.on('data', (chunk) => {//で、チャンクちゃんをとる？
    body.push(chunk);//bodyにチャンクを追加
  }).on('end', () => {
    body = Buffer.concat(body).toString();//合体＆stringに(多分)
    const decoded =decodeURIComponent(body);//aaa=bbb&ccc=dddを{ aaa: 'bbb', ccc: 'ddd' }にするかんじで配列？に直してる(はず)
    return qs.parse(decoded);
  });
}
module.exports = {
  handle,
  handle_css,
  handle_js,
  handle_image
};


//action="./hiroba/home"