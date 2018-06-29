//アセットルート、テンプレートルートですトスr−と

// META
SITE_NAME = "サイトタイトル";
SITE_URL = "http://example.com";
SITE_DESCRIPTION = "ディスプリプション";
SITE_KEYWORDS = "キーワード,キーワード,キーワード";
SITE_OGP_URL = "http://example.com/";
SITE_OGP_TITLE = "サイトタイトル";
SITE_OGP_DESCRIPTION = "ディスプリプション";
SITE_OGP_IMAGE = "http://example.com/ogp.jpg";
SITE_OGP_SITE_NAME = "サイトタイトル";
SITE_OGP_TYPE = "article";
SITE_OGP_LOCALE = "ja_JP";
SITE_OGP_APP_ID = "";
GA_ID = "UA-111111111111-1";

LANG = "ja";

// FilePath
IMAGES_PATH = "../images/";
JS_PATH = "./js/";
CSS_PATH = "./css/"

// Pug Options
PUG_PRETTY = true

// WebPack JS
WEBPACK_ENTRY = {
  "js/app": "./src/js/main.js",
  "contact/contact": "./src/js/pages/contact.js"
}

// Source
SRC_IMAGES = './src/images/';
SRC_JS = './src/js/';
SRC_SCSS = './src/sass/';
SRC_PUG = './src/pug/';

// Dist
DIST_IMAGES = './images/';
DIST_CSS = './css/';
DIST_HTML = './';

// JS,CSS キャッシュ防止
VERSION = "?v="+ Date.now();