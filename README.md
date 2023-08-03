# ワイの Astro Template

静的ファイルジェネレーターとして使いたい。

## インストール

要 npm

```sh
git clone git@github.com:YokochiO/astro-template.git
```

```sh
npm install
```

## 実行・ビルド

```sh
npm run dev
```

```sh
npm run build
```

## 方針

- js は esbuild でバンドルするため、public フォルダに置く

## よくわからない点

- 設定ファイルに `base` を設定すると画像などの相対パスに文句を言われる。
  - ❌ `<img src="../img/foo.jpg" />`
  - 🙆‍♀ `<img src="/base/img/foo.jpg" />`
