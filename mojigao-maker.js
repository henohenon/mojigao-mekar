const JikkouButton = document.getElementById('jikkou');
const resultDivided = document.getElementById('result-area');
const TextInput = document.getElementById("input-text");
const HozonButton = document.getElementById("hozon");
const canvas = document.getElementById('board');
/***
const mojipos=[
  [50,0],
  [80,0],
  [75,30],
  [55,80]
];
***/
//文字の場所。
//パターンがいくつか(2)の中にそれぞれの文字の場所(3)(の中のx座標とy座標(4))
const mojipos =
[
  [
    [-10, -90],
    [40, -90],
    [-45,20]
  ],
  [
    [-30, -110],
    [35, -110],
    [40, -30],
    [-10,65]
  ],
  [
    [0, -5],
    [60, -5],
    [0, -35],
    [60, -35],
    [-10,55]
  ],
  [
    [0, -10],
    [60, -10],
    [0, -40],
    [60, -40],
    [40, -25],
    [-10,65]
  ]
];

//パターンがいくつか(2)の中にそれぞれの文字のサイズ(3)(の中のxのサイズとyのサイズ(4))
const mojisize=
[
  [
    [200,150],
    [200,150],
    [450,100]
  ],
  [
    [250,187.5],
    [250,187.5],
    [120,130],
    [300,60]
  ],
  [
    [160,55],
    [160,55],
    [150,112.5],
    [150,112.5],
    [300,60]
  ],
  [
    [160,55],
    [160,55],
    [150,112.5],
    [150,112.5],
    [120,130],
    [300,60]
  ]
];

HozonButton.onclick = () => {
  //let text=TextInput.value;
  let canvas = document.querySelector("#board");
  let link = document.createElement('a');
  link.href = canvas.toDataURL();//URLCanvas();

  link.download = 'canvas.png';
  /***
  if(text!==""){
  }else{
    link.download = text+'.png';
  }
  ***/
  link.click();
}
JikkouButton.onclick = () => {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  let imgCount = 0;
  let text = TextInput.value;
  let kaotype=0;//どのタイプの文字顔を使うか
  const mojitypes = [...Array(mojipos.length).keys()]
  while (true){
    kaotype=Math.floor( Math.random() * mojitypes.length );
    console.log(kaotype,mojitypes[kaotype],mojipos);
    if(((mojipos[mojitypes[kaotype]].length)%(text.length))===0){
      kaotype=mojitypes[kaotype];
      break;
    }else{
      mojitypes.splice(kaotype,1);
    }
    if(mojitypes.length<=0){
      console.log("文字数に合う文字顔の型がありません。");
      return;
    }
  }
  //入力内容
  let teximages = new Array();
  //画像のURLを入れるやつ

  teximages.push(pushKaoBack());
  teximages[0].onload = function () {
    //顔の後ろのやつだけ重く、顔の後ろのやつが前に来るため、全部のロードが終わってから描画させてる
    imgCount++;
    // すべての画像読み込みが完了した時
    if (imgCount >= teximages.length) {
      DrowResults(teximages,kaotype);//描画
    }
    //顔の後ろのやつを追加
  }
  console.log( mojipos[kaotype].length, mojipos[kaotype],text.length);
  for (let i = 0; i < mojipos[kaotype].length;i+=text.length)
  //入力された文字を画像に。
  {
    for(let j=0;j<text.length;j++)
    {
      teximages.push(MakeMojiImage(text[j]));
      //teximagesに、imageを追加
      teximages[i+j + 1].onload = function () {
        //顔の後ろのやつだけ重く、顔の後ろのやつが前に来るため、全部のロードが終わってから描画させてる
        imgCount++;
        // すべての画像読み込みが完了した時
        if (imgCount >= teximages.length) {
          DrowResults(teximages,kaotype);//描画
        }
      }
    }
  }
}
function pushKaoBack(context) {
  var image = new Image();
  image.src = "顔back.png";
  return image;
}
function DrowText(text) {
  const ctx = canvas.getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText(text, 30, 150);
}
function URLCanvas() {
  return canvas.toDataURL();
}

//文字を画像にするよ関数
function MakeMojiImage(moji) {
  let context = canvas.getContext('2d');//キャンパスを所得してる(？)
  DrowText(moji);//文字をテキストとしてキャンバスに描画
  var image = new Image();
  image.src = URLCanvas();//キャンバスをURLにしてimageに代入
  context.clearRect(0, 0, canvas.width, canvas.height);//キャンバスをクリア

  return image;
}

function DrowResults(images,kaotype) {
  // 各画像を順番に描画
  let context = canvas.getContext('2d');//キャンパスを所得してる(？)
  context.drawImage(images[0], 0, 0, 200, 150, 0, 0, 200, 150);//顔の後ろだけ位置は固定なため
  for (var i = 0; i < images.length - 1; i++) {
    console.log(mojipos[kaotype][i][0], mojipos[kaotype][i][1], mojisize[kaotype][i][0], mojisize[kaotype][i][1]);
    context.drawImage(images[i + 1], 0, 0, 200, 150, mojipos[kaotype][i][0], mojipos[kaotype][i][1], mojisize[kaotype][i][0], mojisize[kaotype][i][1]);//配列に入ってる位置にいい感じに。
  }
}