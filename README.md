# ワイの Astro テンプレート

静的ファイルジェネレーターとして使いたい。

## 方針（主に css）

- FLOCSS と`@layer`を採用
  - カスケードの優先度が css の記述順（ファイルの読み込み順）に依存しないように、`@layer`で強さを明示している
- なんとなく Astro の流儀に従う
  - 全体にかかる DefaultLayout.astro では foundation.css をインポートしている
  - 各コンポーネントは自身に関係する css をインポートする
- JavaScript は適当に
- ビルドが遅くなって嫌なので`<Image>`は使わない

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

## VSCode の依存関係

`.workspace`に拡張や sass の設定などがある。他のエディタのことは知らない。

- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)
- [Astro support for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## よくわからない点

### 設定ファイルに`base`を設定すると画像などの相対パスに文句を言われる

base/index.html で以下のように記述すると怒られる（ビルドは通る）。パスは正しいのに…

- ❌ `<img src="./img/foo.jpg" />`
- ⭕ `<img src="/base/img/foo.jpg" />`

## （おまけ）WordPress テーマ対策

- WordPress のテーマも一緒に扱いたい
- 静的ファイルを手動でコピーするのは嫌だ

ということで、ビルド時に copy.js を実行して静的ファイルをコピーする。

### copy.js

```js
const toDir = './wordpress-theme' // コピー先（WordPressのテーマフォルダ）
const files = ['img', '_astro'] // コピー元のファイル・フォルダ
```

### package.json

```before.json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
```

`build`を書き換え、`copy`を追加

```after.json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build && npm run copy",
    "preview": "astro preview",
    "astro": "astro",
    "copy": "node copy.js"
  },
```

### .gitignore

コンパイルされた静的ファイルを複数管理したくない。でもテーマフォルダ単体として管理してもいいかも

```.gitignore
wordpress-theme/img
wordpress-theme/_astro
```
