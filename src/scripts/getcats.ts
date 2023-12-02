const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=9')
const cats: { url: string; width: number; height: number }[] = await res.json()

export default cats
