/**
 * @module UserAgent
 */

let ua = navigator.userAgent.toLowerCase();

/**
 * IE判定
 * @returns {boolean}
 */
export function isIe() {
  return ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1
}

/**
 * IE6判定
 * @returns {boolean}
 */
export function isIe6() {
  return ua.indexOf('msie 6.') != -1
}

/**
 * IE7判定
 * @returns {boolean}
 */
export function isIe7() {
  return ua.indexOf('msie 7.') != -1
}

/**
 * IE8判定
 * @returns {boolean}
 */
export function isIe8() {
  return ua.indexOf('msie 8.') != -1
}

/**
 * IE9判定
 * @returns {boolean}
 */
export function isIe9() {
  return ua.indexOf('msie 9.') != -1
}

/**
 * IE10判定
 * @returns {boolean}
 */
export function isIe10() {
  return ua.indexOf('msie 10.') != -1
}

/**
 * IE6,7,8判定
 * @returns {boolean}
 */
export function isOldIe() {
  return this.isIe8() || this.isIe7() || this.isIe6()
}

/**
 * Chrome判定
 * @returns {boolean}
 */
export function isChrome() {
  return ua.indexOf('chrome') != -1
}

/**
 * Safari判定
 * @returns {boolean}
 */
export function isSafari() {
  return ua.indexOf('safari') != -1 && !this.isChrome()
}

/**
 * Firefox判定
 * @returns {boolean}
 */
export function isFirefox() {
  return ua.indexOf('firefox') != -1
}

/**
 * Opera判定
 * @returns {boolean}
 */
export function isOpera() {
  return ua.indexOf('opera') != -1
}

/**
 * iPhone判定
 * @returns {boolean}
 */
export function isIphone() {
  return ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1
}

/**
 * Android SP判定
 * @returns {boolean}
 */
export function isAndroidSp() {
  return ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1
}

/**
 * SP判定
 * @returns {boolean}
 */
export function isSp() {
  return this.isAndroidSp() || this.isIphone()
}

/**
 * iPad判定
 * @returns {boolean}
 */
export function isIpad() {
  return ua.indexOf('ipad') != -1
}

/**
 * Android Tablet判定
 * @returns {boolean}
 */
export function isAndroidTab() {
  return ua.indexOf('android') != -1 && !this.isAndroidSp()
}

/**
 * Tablet判定
 * @returns {boolean}
 */
export function isTablet() {
  return this.isIpad() || this.isAndroidTab()
}

/**
 * SP, tablet判定
 * @returns {boolean}
 */
export function isMobile() {
  return this.isSp() || this.isTablet()
}

/**
 * iOS判定
 * @returns {boolean}
 */
export function isIos() {
  return this.isIphone() || this.isIpad()
}

/**
 * Android判定
 * @returns {boolean}
 */
export function isAndroid() {
  return ua.indexOf('android') != -1
}

/**
 * iOSのバージョンを返す
 * @returns {Array} [major, Minor, build]（取得出来ない場合は`0`とする）
 */
export function getIOSVersion() {
  if (/ip(hone|od|ad)/.test(ua) === true) {
    var v = ua.match(/os (\d+)_(\d+)_?(\d+)?/) || [];
    var versions = [parseInt(v[1] || 0, 10), parseInt(v[2] || 0, 10), parseInt(v[3] || 0, 10)];
    return versions;
  } else {
    return [0, 0, 0];
  }
}

/**
 * Androidのバージョンを返す
 * @returns {Array} [major, Minor, build]（取得出来ない場合は`0`とする）
 */
export function getAndroidVersion() {
  if (/android/.test(ua) === true) {
    var v = ua.match(/android (\d+).(\d+).?(\d+)?/) || [];
    var versions = [parseInt(v[1] || 0, 10), parseInt(v[2] || 0, 10), parseInt(v[3] || 0, 10)];
    return versions;
  } else {
    return [0, 0, 0];
  }
}