import $ from "jquery";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
// sub.jsファイルを読み込む
import {hello} from "./_sub";
import YTPlayer from "./module/_YTPlayer";
import ShareSNS from "./module/_ShareSNS";

// sub.jsに定義されたJavaScriptを実行する
hello();

var abc =()=>{
  console.log("ABC2");
}

abc();

let ytp;
YTPlayer.loadAPI(function() {
  ytp = new YTPlayer("youtube", "3QJDC-kRwZU", 600, 0, {autoplay:0,rel:0,showinfo:0});
})

let a="A2";
console.log(a);
let aaa = (ee2) =>{
  console.log(ee2);
}
aaa("C")
$(function(){

  $(".playbtn").on("click", function(e) {
    e.preventDefault();
    ytp.play();
  })

  var shareSNS = new ShareSNS();
  var shareSNS = new ShareSNS({twitter:'.js-tw'});

})
