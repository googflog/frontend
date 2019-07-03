//ライブラリ埋め込み
// import $ from "jquery";
import "lodash";
import Swiper from "swiper";
import { TweenMax } from "gsap/TweenMax";

// sub.jsファイルを読み込む
import { hello } from "./_sub";

import { MASTER_DATA, SUB_DATA } from "./_data";

//その他埋め込み
import YTPlayer from "./module/_YTPlayer";
import ShareSNS from "./module/_ShareSNS";

// sub.jsに定義されたJavaScriptを実行する
hello();

// data.js の中身を表示
console.log("MASTER_DATA", MASTER_DATA);

// Youtube 埋め込み
let ytp;
YTPlayer.loadAPI(function() {
  ytp = new YTPlayer("youtube", "iiuoiBEWuaI", 600, 0, {
    autoplay: 0,
    rel: 0,
    showinfo: 0
  });
});

// WebPack書き出しモード
console.log("WebPack書き出しモード", process.env.NODE_ENV);

// Lodashのテンプレート のテンプレート
function testElement(data) {
  /**
   * tmplSrc
   * 画像リストのテンプレート
   * @type {string}
   */
  var tmplSrc = "<div class=<%= Class %>><%= Text %></div>";
  var compiled = _.template(tmplSrc);
  return compiled({
    Class: data.class,
    Text: data.txt
  });
}

$(function() {
  // Youtube再生
  $(".playbtn").on("click", function(e) {
    e.preventDefault();
    ytp.play();
  });

  // SNSボタン
  var shareSNS = new ShareSNS();
  var shareSNS = new ShareSNS({
    twitter: ".js-tw"
  });

  // Lodashのテンプレート のテンプレート
  $("body").append(
    testElement({
      class: "testTemp",
      txt: "🐏 🐑 🐏 🐑 🐏 🐑 🐏 🐑 🐏 🐑 🐏 🐑 🐏 🐑 🐏 🐑"
    })
  );

  // Swiper
  const swiperKv = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 4000
    },
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    scrollbar: {
      el: ".swiper-scrollbar"
    }
  });

  var elm1 = ".img";
  var twmax = TweenMax.set(elm1, {
    opacity: 0,
    scale: 0
  });
  TweenMax.to(elm1, 0.6, {
    opacity: 1,
    scale: 1,
    repeat: 3,
    delay: 0.8,
    ease: Power0.easeNone,
    onComplete: function() {}
  });

  /*

  //
  //
  // jQuery
  //
  //

  $(".testObj").animate({
    width: "70%",
    opacity: 'toggle',
  }, {
    duration: 1000,
    easing: 'swing',
    complete: function() {},
  });



  //
  //
  // TweenMax
  //
  //

  var elm1 = '.testObj';
  var twmax = TweenMax.set(elm1, {
    opacity: 0,
    rotationY: 0
  });
  TweenMax.to(elm1, 0.6, {
    opacity: 1,
    rotationY: 90,
    repeat: 3,
    delay: 0.8,
    ease: Power0.easeNone,
    onComplete: function() {}
  });
  // twmax.kill();


  var timeLine = new TimelineMax();
  timeLine.kill();

  var elm2 = '.testObj';
  timeLine.to(elm2, 0, {
    scale: 0.8,
    rotation: 0
  }).to(elm2, 0.2, {
    rotation: 30,
    repeat: 3,
    yoyo: true,
    ease: Power2.easeInOut,
  }).to(elm2, 0.2, {
    rotation: 0,
    ease: Power2.easeInOut,
    onComplete: function() {}
  });


  */
});
