import $ from "jquery";
/**
 * snsシェアを行う（各シェア用のwindowを開く）
 */

let isLineScriptLoaded = false;

class ShareSNS {
  /**
   * 対象となるボタンのセレクタを設定
   * デフォルト: `.js-shareSNS-tw`, `.js-shareSNS-fb`, `.js-shareSNS-go`, `.js-shareSNS-ha`
   * ボタンのdata属性に`data-url`, `data-text`, `data-hash`の設定が必要
   * LINEは任意のボタンを作成できない[設置方法](https://media.line.me/ja/how_to_install)
   * @param {Object} options 今後他のSNS, オプション設けるかも
   * @param {jQuery|String} options.$twitter jQuery object or selector
   * @param {jQuery|String} options.$facebook jQuery object or selector
   * @param {jQuery|String} options.$google jQuery object or selector
   */
  constructor(options) {
    this.options = options || {};
    this.options.twitter  = this.options.twitter  || '.js-shareSNS-twitter';
    this.options.facebook = this.options.facebook || '.js-shareSNS-facebook';
    this.options.google   = this.options.google   || '.js-shareSNS-google';
    this.options.hatena   = this.options.hatena   || '.js-shareSNS-hatena';
    this.options.line     = this.options.line     || '.js-shareSNS-line';
    this.setEvent();
  }

  /**
   * eventを設定
   */
  setEvent() {
    this.$twitter = $(this.options.twitter);
    $(this.$twitter).on('click.shareSNS', function(e) {
      e.preventDefault();
      let $target = $(this);
      let url = $target.attr('data-url');
      let text = $target.attr('data-text');
      let hash = $target.attr('data-hash');
      ShareSNS.twitter(url, text, hash);
    });

    this.$facebook = $(this.options.facebook);
    $(this.$facebook).on('click.shareSNS', function(e) {
      e.preventDefault();
      let $target = $(this);
      let url = $target.attr('data-url');
      ShareSNS.facebook(url);
    });

    this.$google = $(this.options.google);
    $(this.$google).on('click.shareSNS', function(e) {
      e.preventDefault();
      let $target = $(this);
      let url = $target.attr('data-url');
      ShareSNS.google(url);
    });

    this.$hatena = $(this.options.hatena);
    $(this.$hatena).on('click.shareSNS', function(e) {
      e.preventDefault();
      let $target = $(this);
      let url = $target.attr('data-url');
      ShareSNS.hatena(url);
    });

    this.$line = $(this.options.line);
    $(this.$line).each(function(e) {
      let $target = $(this);
      let url = $target.attr('data-url');
      ShareSNS.line($target, url);
    });
  }

  /**
   * eventを解除
   */
  removeEvent() {
    $(this.$twitter).off('click.shareSNS');
    $(this.$facebook).off('click.shareSNS');
    $(this.$google).off('click.shareSNS');
    $(this.$hatena).off('click.shareSNS');
    $(this.$line).html('');
  }

  /**
   * Twitterでシェアする
   * @param {string} url シェアURL
   * @param {string} text シェアテキスト
   * @param {string} hash  シェアのハッシュ
   */
  static twitter(url, text, hash) {
    let shareText = encodeURIComponent(text);
    let shareHash = encodeURIComponent(hash);
    let shareUrl = 'http://twitter.com/share?url=' + url + '&text=' + shareText + '&hashtags=' + shareHash;
    this.openWindow(shareUrl, 500, 355);
  }

  /**
   * Facebookでシェアする
   * @param {string} url シェアURL
   */
  static facebook(url) {
    let shareUrl = 'http://www.facebook.com/sharer.php?u=' + url;
    this.openWindow(shareUrl, 560, 715);
  }

  /**
   * Googleでシェアする
   * @param {string} url シェアURL
   */
  static google(url) {
    let shareUrl = 'https://plus.google.com/share?url=' + url;
    this.openWindow(shareUrl, 600, 600);
  }

  /**
   * Hatenaでシェアする
   * @param {string} url シェアURL
   */
  static hatena(url) {
    let shareUrl = 'http://b.hatena.ne.jp/entry/' + url;
    window.open(shareUrl, '_blank');
  }

  /**
   * LINEでシェアする
   * @param {jQuery} $target ボタンに設定するDOM
   * @param {string} url シェアURL
   */
  static line($target, url) {
    $target.html('<div class="line-it-button" data-lang="ja" data-type="share-a" data-url="' + url + '" style="display: none;"></div>');
    if (isLineScriptLoaded === true) {
      LineIt.loadButton();
    } else {
      $.getScript('https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js', function() {
        LineIt.loadButton();
        isLineScriptLoaded = true;
      });
    }
  }

  /**
   * windowを開く
   * @param {string} url windowのURL
   * @param {number} width windowの幅
   * @param {number} height windowの高さ
   */
  static openWindow(url, width, height) {
    let w = width || 600;
    let h = height || 400;
    let l = (window.screen.width / 2) - (w / 2);
    let t =  (window.screen.height / 2) - (h / 2);
    window.open(url, 'sharewindow', 'scrollbars=yes, width=' + w + ', height=' + h + ', left=' + l + ', top=' + t);
  }
}

export default ShareSNS;
