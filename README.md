# ワイの Astro テンプレート

静的ファイルジェネレーターとして使いたい。

## 方針（主に css）

- FLOCSS と`@layer`を採用
  - カスケードの優先度が css の記述順（ファイルの読み込み順）に依存しないように、`@layer`で強さを明示している
  - Astro のコンポーネントと FLOCSS の構造が上手くマッチするような気がしている
- なんとなく Astro の流儀に従う
  - 全体にかかる DefaultLayout.astro では foundation.scss をインポートしている
  - 各コンポーネントは自身に関係する scss をインポートする
  - なんか逆に面倒くさくないか? という時は DefaultLayout.astro で全ての (s)css をインポートしてしまう作戦もありそう
  - でも`.astro`内に (s)css を書くのはやめよう

## ディレクトリ構成

たぶんコロコロ変わる。

- **public**  
  静的ファイルを置く。この中身は基本的にそのまま dist へコピーされる
  - **js**  
    `<script>`で読み込む js ファイルはここに置く
  - **img**  
    ファビコンとか
- **src**
  - **components**  
    汎用的に使われそうなパーツ  
    見出し・ボタンなど
  - **layouts**  
    複数ページで共通の HTML 部品  
    全体の枠となるレイアウトの他にヘッダー・メインナビなど  
    components との違いはなんとなく
  - **pages**  
    ページ。ファイル名が URL となるようにルーティングしてくれる
  - **scripts**  
    Astro からインポートされる js/ts
  - **scss**  
    そのまま

なお、Astro 君は`src`以下のファイルしか監視していない模様で、public 内のファイルを更新してもホットリロードしてくれない。

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

## よくわからない点

### 設定ファイルに`base`を設定すると画像などの相対パスに文句を言われる

base/index.html で以下のように記述すると怒られる（ビルドは通る）。パスは正しいのに…

- ❌ `<img src="./img/foo.jpg" />`
- ⭕ `<img src="/base/img/foo.jpg" />`

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

そもそも、こんなことしないといけない状況（要件および仕様）がおかしい、という意見もあります（どこで?）。非常に同意ですが他にどうにもならない場合がほとんどなのです。
