'use strict';
const http = require('http');

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
      const post_content=chunkToParse(req);//リクエストの内容を配列にして読みやすく関数
      req.on('end',()=>{
        const content = post_content["name"];//ふむ、区切るまでもなく値をもってきてる
        console.info('投稿されました:"' + post_content["name"]+'" by："'+post_content["user_name"]+'"');//で、ログと
        Post.create({//データベースに新しいのを作ると
          img_url: post_content["img_url"],//画像のurl
          img_mId: post_content["img_mId"],//画像を作ったユーザーのid
          img_id: 0,
          //img_val: true,//画像が有効か無効か
          postedBy: req.user//ユーザーに返すよー
        }).then(() => {
          handleRedirectPosts(req, res);//ページ更新関数(多分)
        });
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
      const rs = fs.createReadStream('https://raw.githubusercontent.com/henoheTK/mojigao-mekar/master/lib/mojigao-make/mojigao-maker.css');//mojigao-maker.htmlを読みやすい感じにして変数に格納？
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
      const rs = fs.createReadStream('https://raw.githubusercontent.com/henoheTK/mojigao-mekar/master/lib/mojigao-make/mojigao-maker.js');//mojigao-maker.htmlを読みやすい感じにして変数に格納？
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
  handle_js
};
