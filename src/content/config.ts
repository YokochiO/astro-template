import { z, defineCollection } from 'astro:content'

/*
 * 記事の定義を設定する
 * titleは必須(で文字列)、descは省略可能(だけど入力するなら文字列)としている
 */
const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    desc: z.string().optional(),
  }),
})

export const collections = {
  /*
   * /src/content直下のフォルダ(posts)内のファイルをpostCollectionとして扱ってね、という意味
   */
  posts: postCollection,
}
