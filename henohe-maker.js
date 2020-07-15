const JikkouButton=document.getElementById('jikkou');
const resultDivided = document.getElementById('result-area');
const TextInput=document.getElementById("input-text");
const HozonButton=document.getElementById("hozon");
const canvas = document.getElementById('board');
/***
const mojipos=[
  [50,0],
  [80,0],
  [75,30],
  [55,80]
];
***/
const mojipos=[
  [-25,-115],
  [35,-115],
  [40,-65],
  [-10,65]
];

const mojisize=[
  [250,187.5],
  [250,187.5],
  [100,175],
  [300,60],
];
/***
const mojisize=[
  [100,75],
  [100,75],
  [60,65],
  [150,30],
];
***/

HozonButton.onclick = () =>{
  let link = document.createElement('a');
  //let text=TextInput.value;
  let canvas = document.querySelector("#board");
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
JikkouButton.onclick = () =>{
  let imgCount=0;

  let text=TextInput.value;
  //入力内容
  let teximages=new Array();
  //画像のURLを入れるやつ

  teximages.push(pushKaoBack());
  console.log(teximages);
  teximages[0].onload = function() {
    //顔の後ろのやつだけ重く、顔の後ろのやつが前に来るため、全部のロードが終わってから描画させてる
    imgCount++;
    // すべての画像読み込みが完了した時
    if(imgCount >= teximages.length) {
      DrowResults(teximages);//描画
    }
    //顔の後ろのやつを追加
  }
  for(let i=0;i<text.length;i++)
  //入力された文字を画像に。
  {
    teximages.push(MakeMojiImage(text[i]));
    //teximagesに、imageを追加
    teximages[i+1].onload = function() {
      //顔の後ろのやつだけ重く、顔の後ろのやつが前に来るため、全部のロードが終わってから描画させてる
      imgCount++;
      // すべての画像読み込みが完了した時
      if(imgCount >= teximages.length) {
        DrowResults(teximages);//描画
      }
    }    
  }
}
function pushKaoBack(context)
{
  var image = new Image();
  image.src = "顔back.png";
  return image;
}
function DrowText(text)
{
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText(text, 30, 150);
}
function URLCanvas()
{
  let canvas = document.querySelector("#board");
  return canvas.toDataURL();
}

//文字を画像にするよ関数
function MakeMojiImage(moji)
{
  let context = canvas.getContext('2d');//キャンパスを所得してる(？)
  DrowText(moji);//文字をテキストとしてキャンバスに描画
  var image = new Image();
  image.src = URLCanvas();//キャンバスをURLにしてimageに代入
  context.clearRect(0, 0, canvas.width, canvas.height);//キャンバスをクリア
  
  return image;
}

function DrowResults(images)
{
  // 各画像を順番に描画
  let context = canvas.getContext('2d');//キャンパスを所得してる(？)
  context.drawImage(images[0], 0, 0, 200, 150, 0, 0, 200,150);//顔の後ろだけ位置は固定なため
  for (var i = 0; i < images.length-1; i++)
  {
    context.drawImage( images[i+1], 0, 0, 200, 150, mojipos[i][0], mojipos[i][1], mojisize[i][0], mojisize[i][1] );//配列に入ってる位置にいい感じに。
  }
}