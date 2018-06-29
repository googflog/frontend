import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
// sub.jsファイルを読み込む
import {hello} from "./_sub";
import YTPlayer from "./module/_YTPlayer";

// sub.jsに定義されたJavaScriptを実行する
hello();

var abc =()=>{
  console.log("ABC");
}

abc();

let ytp;
YTPlayer.loadAPI(function() {
  ytp = new YTPlayer("youtube", "3QJDC-kRwZU", 600, 0, {autoplay:0,rel:0,showinfo:0});
})
$(".playbtn").on("click", function(e) {
  e.preventDefault();
  ytp.play();
})
let a="A";
console.log(a);
let aaa = (ee) =>{
  console.log(ee);
}
aaa("C")