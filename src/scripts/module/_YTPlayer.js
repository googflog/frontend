import EventEmitter from 'events';

var isLoaded = false;
var isLoading = false;
var callbackListAfterLoad = [];

/**
 * YouTube IFrame Player API のラップ
 * @extends EventEmitter
 */
class YTPlayer extends EventEmitter {
  /**
   * YouTube IFrameを埋め込む
   * @param {DOMElement|string} elm YouTube IFrameに置き換わるDOM要素 or 要素のid
   * @param {string} videoID YouTubeの動画ID
   * @param {number} width 動画の幅
   * @param {number} height 動画の高さ
   * @param {Object} options プレーヤーのカスタマイズに使うパラメータ（https://developers.google.com/youtube/player_parameters?playerVersion=HTML5&hl=ja）
   * @param {function} readyCallBack プレイヤーの準備が整った際に呼ばれる関数
   */
  constructor(elm, videoID, width, height, options, readyCallBack, stateChange) {
    super();

    var width  = width  || '640';
    var height = height || '390';
    var options = options || {};
    this.readyCallBack = readyCallBack || function(){/*console.log('Ready')*/};
    this.stateChange = stateChange || function(){/*console.log('Ready')*/};

    YTPlayer.loadAPI(() => {
      this.player = new YT.Player(elm, {
        width: width,
        height: height,
        videoId: videoID,
        playerVars: options,
        events: {
          'onReady': this._onPlayerReady.bind(this),
          'onStateChange': this._onPlayerStateChange.bind(this)
        }
      });
    });
  }

  /**
   * YouTube APIのscriptファイルを読み込む
   * @param {Function} callback scriptファイル読み込み完了時のcallback
   * @static
   */
  static loadAPI(callback) {
    if (isLoaded === true) {
      if (typeof callback === 'function') { callback(); }
      return;
    }

    if (typeof callback === 'function') { callbackListAfterLoad.push(callback); }
    if (isLoading === true) { return; }
    isLoading = true;

    // load youtube script
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
      isLoaded = true;
      var i = 0, len = callbackListAfterLoad.length;
      for (; i < len; i++) {
        var callback = callbackListAfterLoad.shift();
        callback();
      }
    }
  }

  /**
   * YouTube APIのイベントリスナー
   * @callback
   * @private
   */
  _onPlayerReady() {
    this.readyCallBack();
    this.emit('ready');
  }

  /**
   * YouTube APIのイベントリスナー
   * @param {Object} state
   * @param {number} state.data {-1: 未開始, 0: 終了, 1: 再生中, 2: 一時停止, 3: バッファリング中, 5: 頭出し済み}
   * @callback
   * @private
   */
   _onPlayerStateChange(state) {
     switch (state.data) {
       case 0:
         this.stateChange('end');
         this.emit('end');
         break;
       case 1:
         this.stateChange('play');
         this.emit('play');
         break;
       case 2:
         this.stateChange('pause');
         this.emit('pause');
         break;
     }
   }

  /**
   * 動画を再生
   */
  play() {
    this.player.playVideo();
  }

  /**
   * 動画を停止
   */
  pause() {
    this.player.pauseVideo();
  }

  /**
   * ミュートにする
   */
  mute() {
    this.player.mute();
  }

  /**
   * ミュートを解除する
   */
  unMute() {
    this.player.unMute();
  }

  /**
   * 動画を指定秒数に進める
   * @param {number} seconds 秒数
   */
  seekTo(seconds) {
    this.player.seekTo(seconds);
  }

  /**
   * 指定したIDのYouTube動画に切り替える
   * @param {string} id ouTubeの動画ID
   */
  loadVideoById(id) {
    this.player.loadVideoById(id);
  }

  /**
   * YouTube IFrame Playerを破棄する
   */
  destroy() {
    this.removeAllListeners();
    this.player.destroy();
  }
}

export default YTPlayer;