import { parse } from 'query-string'
import { LIMIT } from '@/constants'

export function range(begin: number, end: number): number[] {
   const arr = new Array(end).fill(0)
   let start = begin - 1
   return arr.map(el => {
      start++
      return el + start
   })
}

export function getPaginator(search: string): object {
   const parsedSearch = parse(search)
   const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
   const offset = currentPage * LIMIT - LIMIT

   return { currentPage, offset }
}
