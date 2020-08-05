'use strict';
const homeHandler = require('./hiroba-home/hiroba-home-handler');//ホームハンドラー
const makerHandler = require('./mojigao-make/mojigao-maker-handler');//ホームハンドラー
const util = require('./handler-util');//ハンドラーアンティル

function route(req, res) {
  switch (req.url) {
    case '/hiroba/home'://hiroba/homeでなんか言われたとき
      homeHandler.handle(req, res);//ホームハンドラーさんよろしくです
      break;
    case '/mojigao-make/mojigao-maker.css'://hiroba/homeでなんか言われたとき
      makerHandler.handle_css(req, res);//ホームハンドラーさんよろしくです
      break;
    case '/mojigao-make/head-back'://hiroba/homeでなんか言われたとき
      makerHandler.handle_image(req, res);//ホームハンドラーさんよろしくです
      break;
    case '/mojigao-make/mojigao-maker.js'://hiroba/homeでなんか言われたとき
      makerHandler.handle_js(req, res);//ホームハンドラーさんよろしくです
      break;
      /***
    case '/posts?delete=1':
      postsHandler.handleDelete(req, res);
      break;
      ***/
    case '/make'://hiroba/homeでなんか言われたとき
     makerHandler.handle(req, res);//ホームハンドラーさんよろしくです
     break;
   case '/logout'://logoutっていわれたら
      util.handleLogout(req, res);//untilのlogout関数を実行
      break;
    //case '/favicon.ico'://アイコン？って聞かれたら
      //util.handleFavicon(req, res);//untilはんアイコンのやつよろです(関数を実行)
      //break;
    default://特に反応なしの場合
      util.handleNotFound(req, res);//ぺーじないっすっていう
      break;
  }
}

module.exports = {
  route
};