## 開発

`npm install`

<!-- `gulp dev-pc` -->
<!-- `gulp dev-sp` -->
`npm run dev`


## ステージング

`npm run stage`


## 公開版

`npm run production`

### メモ

####JSファイルの修正方法

下記の例では `./src/scripts/main.js` にあるファイルを`assets/scripts/app.js` にWebpackで書き出しています。
設定している場所は`config.js` の下記の45行目ぐらいです。

```Javascript
// WebPack JS
    WEBPACK_ENTRY = {
    "assets/scripts/app": "./src/scripts/main.js",
}
```

新たにJSファイルを作りたい場合、下記を参考にしてください。
書き出し元ファイル`rekishi_source.js`  を元に`assets/scripts/history/` フォルダに `rekishi.js` ファイルをWebpackで書き出します。

```Javascript
// WebPack JS
WEBPACK_ENTRY = {
  "assets/scripts/app": "./src/scripts/main.js",
  "assets/scripts/history/rekishi": "./src/scripts/pages/rekishi_source.js"
}
```

#### 何に使っているかよくわからないけど、本番サーバ上にあるデータを新しいページにも置きたい場合

`src/copy`にディレクトリの構造を再現して該当ファイルを置くと、そのディレクトの構造を保ったままデータをコピーします。

現状本番上に上がっている、営業日情報を取得してカレンダーにして表示する js ファイルをとりあえず置いています。 `src/copy/assets/scripts/calendar.js`

#### ブレイクポイント
SP縦
`〜 600px`

SP横、タブレット
`601px 〜 1000px`

PC
`1001px 〜` 
