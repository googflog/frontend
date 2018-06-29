import { TweenMax, Power4 } from 'gsap';

/**
 * @module utils
 */

/**
 * 親要素のボックスサイズに合わせてimgもしくはvideo要素をフィットさせる
 * @param {jQuery} $parent - 親要素
 * @param {jQuery}  $children - ターゲット要素（cssでposition: absoluteの指定が必須）
 */
export function coverMedia($wrap, $target) {
  let wrapWidth = $wrap.width();
  let wrapHeight = $wrap.height();
  let wrapRatio = wrapWidth / wrapHeight; // 縦横の比率
  let targetWidth = $target.attr('width');
  let targetHeight = $target.attr('height');
  let targetRatio = targetWidth / targetHeight; // 縦横の比率
  let width, height, left, top;

// wrapとtargetの比率を見て縦横どちらを基準にフィットさせるか
  if (wrapRatio > targetRatio) {
    // 横を基準にする
    width = wrapWidth; // wrapとtargetのサイズが大きい方のwidthに合わせる
    height = width / targetRatio;
  } else {
    // 縦を基準にする
    height =wrapHeight;
    width = height * targetRatio;
  }

// targetを縦横センタリングさせる
  left = (width > wrapWidth) ? (wrapWidth - width) / 2 : 0;
  top = (height > wrapHeight) ? (wrapHeight - height) / 2 : 0;

  $target.css({
    width: width,
    height: height,
    left: left,
    top: top
  });
}

/**
 * 親要素のボックスサイズに合わせてimgもしくはvideo要素を収める
 * @param {jQuery} $parent - 親要素
 * @param {jQuery}  $children - ターゲット要素（cssでposition: absoluteの指定が必須）
 */
export function containMedia($wrap, $target) {
  let wrapWidth = $wrap.width();
  let wrapHeight = $wrap.height();
  let wrapRatio = wrapWidth / wrapHeight;
  let targetWidth = $target.attr('width');
  let targetHeight = $target.attr('height');
  let targetRatio = targetWidth / targetHeight;
  let width, height, left, top;

  if (wrapRatio > targetRatio) {
    height = wrapHeight;
    width = height * targetRatio;
    top = 0;
    left = (wrapWidth - width) / 2;
  } else {
    width = wrapWidth;
    height = width / targetRatio;
    top = (wrapHeight - height) / 2;
    left = 0;
  }

  $target.css({
    width: width,
    height: height,
    left: left,
    top: top
  });
}

/**
 * 親要素のボックスサイズに合わせてimgもしくはvideo要素を収めるが
 * 親要素の方が大きい場合は対象要素のもとサイズを維持したまま上下左右センターにする
 * @param {jQuery} $parent - 親要素
 * @param {jQuery}  $children - ターゲット要素（cssでposition: absoluteの指定が必須）
 */
export function containMediaMaxSize($wrap, $target) {
  let wrapWidth = $wrap.width();
  let wrapHeight = $wrap.height();
  let wrapRatio = wrapWidth / wrapHeight;
  let targetWidth = $target.attr('width');
  let targetHeight = $target.attr('height');
  let targetRatio = targetWidth / targetHeight;
  let width, height, left, top;

  if (wrapRatio > targetRatio) {
    height = wrapHeight;
    if (height > targetHeight) { height = targetHeight; }
    width = height * targetRatio;
  } else {
    width = wrapWidth;
    if (width > targetWidth) { width = targetWidth; }
    height = width / targetRatio;
  }

  left = (wrapWidth - width) / 2;
  top = (wrapHeight - height) / 2;

  $target.css({
    width: width,
    height: height,
    left: left,
    top: top
  });
}

/**
 * クエリストリング（URLパラメータ）をパースして返す
 * @returns {Object} `{name: value, ...}`にパースする
 */
export function getQueryString() {
  let result = {};

  if (1 < document.location.search.length) {
    let query = document.location.search.substring(1);
    let parameters = query.split('&');

    for (let i = 0, len = parameters.length; i < len; i++) {
      let element = parameters[i].split('=');
      let paramName = decodeURIComponent(element[0]);
      let paramValue = decodeURIComponent(element[1]);
      result[paramName] = decodeURIComponent(paramValue);
    }
  }
  return result;
}

/**
 * alignHeight
 * @param {jQuery} $target
 * @param {number} unit
 */
export function alignHeight($target, unit) {
  unit = unit || $target.length;
  let row = Math.ceil($target.length / unit);
  let l, i, j, maxHeight, targetHeight, $elms, $elm;

  for (i = 0; i < row; i++) {
    $elms = $target.slice((i * unit), (i * unit + unit));
    l = $elms.length;
    j = 0;
    maxHeight = 0;

    for (; j < l; j++) {
      $elm = $elms.eq(j);
      targetHeight = $elm.height();
      maxHeight = maxHeight < targetHeight ? targetHeight : maxHeight;
    }
    $elms.height(maxHeight);
  }
}

/**
 * set unit
 * @param {jQuery} $target
 * @param {number} unit - Number to divide
 * @param {Object} options
 * @param {string} options.selector - Target in the element a selector.
 */
export function setUnit($target, unit, options) {
  $target = $($target);
  let length = $target.length;
  let rightNum = unit - 1;
  let lastNum = length - 1;
  let bottomNum = (Math.ceil(length / unit) - 1) * unit - 1;
  unit = unit || length;
  options = options || {};

  if (options.selector !== undefined) {
    $target = $target.find(options.selector);
  }

  $target.each(function(i) {
    let className = ['is-unit'];

    if (i === 0) { className.push('is-unit-first') }
    if (i === lastNum) { className.push('is-unit-last') }
    if (i < unit) { className.push('is-unit-top') }
    if (i % unit === 0) { className.push('is-unit-left') }
    if (i % unit === rightNum) { className.push('is-unit-right') }
    if (i > bottomNum) { className.push('is-unit-bottom') }

    $(this).addClass(className.join(' '));
  });
}

/**
 * destroy Unit
 * @param {jQuery} $target
 * @param {Object} options
 * @param {string} options.selector - Target in the element a selector.
 */
export function destroyUnit($target, options) {
  $target = $($target);
  options = options || {};

  if (options.selector !== undefined) {
    $target = $target.find(options.selector);
  }

  $target.removeClass('is-unit is-unit-first is-unit-last is-unit-top is-unit-bottom is-unit-left is-unit-right');
}