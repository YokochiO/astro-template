import fs from 'fs-extra'

const fromDir = './dist'
const toDir = './wordpress-theme'
const files = ['img', '_astro']

files.forEach(async (file) => {
  try {
    await fs.remove(`${toDir}/${file}`)
    await fs.copy(`${fromDir}/${file}`, `${toDir}/${file}`)
  } catch (error) {
    console.error({
      file,
      fromDir,
      toDir,
      error,
    })
  }
})
