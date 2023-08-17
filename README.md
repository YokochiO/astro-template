# ワイの astro Template

静的ファイルジェネレーターとして使いたい。

## インストール

要 npm

```sh
git clone git@github.com:YokochiO/astro-template.git
```

```sh
npm i
```

## 実行・ビルド

```sh
npm run dev
```

```sh
npm run build
```

## WordPress テーマ対策

- WordPress のテーマも一緒に扱いたい
- css などの静的ファイルを手動でコピーするのは嫌だ

ということで、ビルド時に copy.js を実行して css や画像などのフォルダをコピーする。

### copy.js

```js
const toDir = './wordpress-theme' // コピー先（WordPressのテーマフォルダ）
const files = ['img', '_astro'] // コピーするファイル
```

### package.json

`build`を書き換え、`copy`を追加

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
- "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
+ "build": "astro build && npm run copy",
+ "copy": "node copy.js"
},
```

### .gitignore

コンパイルされた静的ファイルを複数管理したくない。でもテーマフォルダ単体として管理してもいいかも

```.gitignore
wordpress-theme/img
wordpress-theme/_astro
```

## 方針

- 画像の圧縮（最適化）は自前で行う
- scss から css へのコンパイルは自前で行う

## よくわからない点

### 設定ファイルに`base`を設定すると画像などの相対パスに文句を言われる

- ❌ `<img src="./img/foo.jpg" />`
- ⭕ `<img src="/base/img/foo.jpg" />`
