# ワイの Astro テンプレート

静的ファイルジェネレーターとして使いたい。

## 方針（主に css）

### [FLOCSS](https://github.com/hiloki/flocss) と [カスケードレイヤー](https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Cascade_layers) を採用

Astro のコンポーネントと FLOCSS の構造が上手くマッチするような気がしている。

- カスケードの優先度が css の記述順（ファイルの読み込み順）に依存しないように、`@layer` で強さを明示している
- レイアウトの部品やコンポーネントは自身に関係のある scss をインポートする
  - 全体にかかる `DefaultLayout.astro` では `foundation.scss` をインポートしている
  - `<MainNav>` は `scss/layout/main-nav.scss` をインポートする、みたいな

なお `@layer` は無指定のほうが強いので、面倒だからと省略するとすぐに破綻する。

### Astro の流儀に従わないこともある

- `DefaultLayout.astro` で全ての (s)css をインポートしてしまう作戦もありそう
- `.astro` 内に (s)css は書きません
- スクリプトも `is:inline` 以外はファイルに書いてインポートする（これは普通）

## ディレクトリ構成

たぶんコロコロ変わる。

```
public
└── img
src
├── components
├── content
│   └── posts
├── layouts
├── pages
│   └── posts
├── scripts
└── styles
    └── scss
```

### `public`

そのまま使うファイルを置く。`img` 以下に favicon とか。

なお、Astro 君は `src` 以下のファイルしか監視していない模様で、`public` 内のファイルを更新してもホットリロードしてくれない。

### `src/components`

汎用的に使いそうなパーツ。ボタン、カードなど。

### `src/content`

[コンテンツコレクション](https://docs.astro.build/ja/guides/content-collections/)用。

### `src/layouts`

各ページで共通に使われるパーツ。レイアウトに含まれるヘッダーやフッターなどもここ。`src/components`との違いは使われる頻度。適当だなあ。

FLOCSS の構成に合わせてもいいかもしれない。その場合、`src/components` 内のボタンコンポーネントなどは `src/layouts/object/component` 以下に移動することになりそう。

### `src/pages`

[ページ](https://docs.astro.build/ja/core-concepts/astro-pages/)用。

### `src/scripts`

スクリプト。基本はここにファイルを置いてインポートする。

### `src/styles`

スタイルシート。`scss` はディレクトリに入れた。

## インストール

Node.js v18.14.1 以上

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
  - sass は Astro でコンパイルするため不要になった。css ファイルを書き出さないように`settings.excludeList`を指定している。
- [Astro support for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) ← 必須
- [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## （おまけ）WordPress テーマ対策

- どうせなら WordPress のテーマも一緒に扱いたい
- 静的ファイルを手動でコピーするのは嫌だ

ということで、ビルドが終わったら copy.js を実行して dist から静的ファイルをコピーする。

### copy.js の設定

```js
const fromDir = './dist' // コピー元のフォルダ
const toDir = './wordpress-theme' // コピー先（WordPressのテーマフォルダ）
const files = ['img', '_astro'] // fromDir内のこれらをコピーする
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

WordPress のために静的ファイルを作るのはナンセンスだとか言われるけど、あの**クソ**みたいなエディタを使いたくない。
