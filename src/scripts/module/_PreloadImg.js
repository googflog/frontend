import $ from 'jquery';

class PreloadImg {

  constructor(target, callback) {
    var callback = callback || function(){/*console.log("ImageLoaded");*/}
    var img = [],
      img_arr = $(target), // ローディング対象の画像を指定
      img_arr_lngth = img_arr.length;

    img_arr.each(function(indx) {
      img[indx] = new Image();
      img[indx].onload = function() {
        img_arr_lngth = img_arr_lngth - 1;
        if (0 >= img_arr_lngth) {
          callback();
        }
      };
      img[indx].src = $(this).attr('src');
    });
  }

}

export default PreloadImg;