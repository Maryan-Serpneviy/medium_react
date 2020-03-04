export function range(begin: number, end: number): number[] {
   const arr = new Array(end).fill(0)
   let start = begin - 1
   return arr.map(el => {
      start++
      return el + start
   })
}
