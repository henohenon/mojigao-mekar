'use strict';
const http = require('http');

function handle(req,res){
  switch (req.method) {
    case 'GET'://GETメソッドが来たよ？って時(ほぼ最初だけ説、あると思います)
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      const fs = require('fs');//fs使いまーす
      const rs = fs.createReadStream('./hiroba-home.html');//hiroba-home.htmlを読みやすい感じにして変数に格納？
      rs.pipe(res);//rsのメッセージ的なやつに読みやすくしたやつ格納して返す
      break;//終わり
    default:
      break;
  }
}

function chunkToDecoded(req){ 
  let body = [];//bodyを召喚
  req.on('data', (chunk) => {//で、チャンクちゃんをとる？
    body.push(chunk);//bodyにチャンクを追加
  }).on('end', () => {
    body = Buffer.concat(body).toString();//合体＆stringに(多分)
    return decodeURIComponent(body);//aaa=bbb&ccc=dddを{ aaa: 'bbb', ccc: 'ddd' }にするかんじで配列？に直してる(はず)
  });
}

module.exports = {
  handle
};