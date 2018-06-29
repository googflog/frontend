import config from '../_config';
import EventEmitter from 'events';

/**
 * 画面幅のブレイクポイントでイベントを発火する
 * @extends EventEmitter
 */
class MediaQueries extends EventEmitter {
  /**
   * 初期化
   */
  constructor() {
    super();

    /**
     * prevType previous media type（PC, SP）
     * @type {null|string}
     */
    this.prevType = null;

    /**
     * current media type（PC, SP）
     * @type {null|string}
     */
    this.currentType = null;

    this._checkMediaType = this._checkMediaType.bind(this);
    this._checkMediaType();
    $(window).on('resize.MediaQueries', _.debounce(this._checkMediaType, 100));
  }

  enter(callback) {
    if (this.currentType !== null) {
      callback(this.currentType, this.prevType);
    }
    this.on('change', callback);
  }

  exit(callback) {
    this.removeListener('change', callback);
  }

  /**
   * 画面幅に応じたメディアを確認する
   * @callback
   * @private
   */
  _checkMediaType() {
    let windowWidth = window.innerWidth;

    if (windowWidth >= config.mqBreakpointSP) {
      this._setDevice('PC');
    } else {
      this._setDevice('SP');
    }
  }

  /**
   * メディアを設定（設定値が変わった場合のみイベントを発火する）
   * @param {string} type
   * @private
   */
  _setDevice(type) {
    if (type !== this.currentType) {
      this.prevType = this.currentType;
      this.currentType = type;
      this.emit('change', this.currentType, this.prevType);
    }
  }
}

/* サイト内で1インスタンスで取り回すので事前にインスタンスを作成 */
let instance = new MediaQueries();

export default instance;
