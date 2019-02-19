//ライブラリ埋め込み
import $ from "jquery";
import {
  TweenMax,
  Power2,
  TimelineLite
} from "gsap/TweenMax";

import Vue from 'vue';
// sub.jsファイルを読み込む
import {
  hello
} from "./_sub";

//その他埋め込み
import YTPlayer from "./module/_YTPlayer";
import ShareSNS from "./module/_ShareSNS";

// sub.jsに定義されたJavaScriptを実行する
hello();

// Youtube 埋め込み
let ytp;
YTPlayer.loadAPI(function() {
  ytp = new YTPlayer("youtube", "3QJDC-kRwZU", 600, 0, {
    autoplay: 0,
    rel: 0,
    showinfo: 0
  });
})




var app = new Vue({
  el: '#app',
  data: {
    message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello Vue!'
  }
})


new Vue({
  el: '#app2',
  data: {
    counter: 0,
    list: ['Apple', 'Banana', 'Strawberry']
  },
  computed: {
    length: function() {
      return this.list.length
    }
  },
  methods: {
    addItem: function() {
      this.list.push('Orange' + (++this.counter).toString())
    }
  }
})






$(function() {

  // Youtube再生
  $(".playbtn").on("click", function(e) {
    e.preventDefault();
    ytp.play();
  })

  // SNSボタン
  var shareSNS = new ShareSNS();
  var shareSNS = new ShareSNS({
    twitter: '.js-tw'
  });

})