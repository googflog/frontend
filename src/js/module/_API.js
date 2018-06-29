/**
 * @module API
 */
import config from '../_config';

var method = 'POST';
if (config.env === 'dev') {
  method = 'GET'
}

/**
 * ajax
 * @param {Object} options
 * @param {string} options.url リクエスト先のURL
 * @param {Object} options.data サーバに送信するデータ`{key: value, ...}`
 * @returns {jQuery.jqXHR.promise}
 * @private
 */
function ajax(options) {
  var defer = $.Deferred();
  var options = _.defaults((options || {}), {
    type: method,
    dataType: 'json',
    timeout: 10000
  });

  $.ajax(options).then(function(data) {
    defer.resolve(data);
  }, function(xhr, textStatus, errorThrown) {
    defer.reject(xhr, textStatus, errorThrown);
  });

  return defer.promise();
}

/********************************************************
 * 各APIは「jQuery.deferred.promise」を返す
 * 取得成功、取得失敗の処理は「promise.then」で行う
 *******************************************************/

/**
 * データを取得
 * @param {Object} options
 * @returns {jQuery.jqXHR.promise}
 */
export function getSample(options) {
  return ajax(_.defaults(options, {url: config.apiPath + 'getSample/'}));
}

/**
 * データを登録
 * @param {Object} options
 * @returns {jQuery.jqXHR.promise}
 */
export function putSample(options) {
  return ajax(_.defaults(options, {url: config.apiPath + 'createSample/'}));
}

/**w
 * データを変更
 * @param {Object} options
 * @returns {jQuery.jqXHR.promise}
 */
export function updateSample(options) {
  return ajax(_.defaults(options, {url: config.apiPath + 'updateSample/'}));
}

/**
 * データを削除
 * @param {Object} options
 * @returns {jQuery.jqXHR.promise}
 */
export function deleteSample(options) {
  return ajax(_.defaults(options, {url: config.apiPath + 'deleteSample/'}));
}