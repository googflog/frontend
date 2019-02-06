//アセットルート、テンプレートルートですトスr−と

DIST_SITE_URL = "http://example.com/dev";
STAGE_SITE_URL = "http://example.com/stage";

// META
SITE_NAME = "サイトタイトル";
SITE_URL = "http://example.com/production";
SITE_DESCRIPTION = "ディスプリプション";
SITE_KEYWORDS = "キーワード,キーワード,キーワード";
SITE_OGP_URL = "http://example.com/production";
SITE_OGP_TITLE = "サイトタイトル";
SITE_OGP_DESCRIPTION = "ディスプリプション";
SITE_OGP_IMAGE = "ogp.jpg";
SITE_OGP_SITE_NAME = "サイトタイトル";
SITE_OGP_TYPE = "article";
SITE_OGP_LOCALE = "ja_JP";
SITE_OGP_APP_ID = "";
GA_ID = "UA-111111111111-1";

LANG = "ja";


// 書き出しファイル内パス FilePath
IMAGES_PATH = "/assets/images/";
IMAGES_PATH_STAG = IMAGES_PATH;
IMAGES_PATH_PROD = IMAGES_PATH;

JS_PATH = "/assets/scripts/";
JS_PATH_STAG = JS_PATH;
JS_PATH_PROD = JS_PATH;

CSS_PATH = "/assets/styles/";
CSS_PATH_STAG = CSS_PATH;
CSS_PATH_PROD = CSS_PATH;


// Pug Options HTML圧縮
PUG_PRETTY = true

// WebPack JS
WEBPACK_ENTRY = {
  "assets/scripts/app": "./src/scripts/main.js",
  "contact/contact": "./src/scripts/pages/contact.js"
}

// 監視 Source
SRC = './src/';
SRC_IMAGES = './src/images/';
SRC_JS = './src/scripts/';
SRC_SCSS = './src/styles/';
SRC_PUG = './src/templates/';

// 書出し Dist
DIST_IMAGES = './assets/images/';
DIST_CSS = './assets/styles/';
DIST_HTML = './';

// JS,CSS キャッシュ防止
VERSION = "?v="+ Date.now();