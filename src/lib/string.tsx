import { basicZmanimList } from '@/data/basic-zmanim-list'

export const capitalizeFirstLetter = (str: unknown | undefined): string => {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertCamelCaseToWords = (camelCaseString: string): string => {
  const words = camelCaseString.replace(/([a-z])([A-Z0-9])/g, '$1 $2')
  const finalWords = words.replace(/(?<=[A-Z])(?=\d)/g, ' ')
  return finalWords.charAt(0).toUpperCase() + finalWords.slice(1)
}

export const converAllValuesToString = (obj: object) => {
  const objWithStrings = {}
  try {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        objWithStrings[key] =
          typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key]
      }
    }
    return objWithStrings
  } catch (error) {
    console.log('error: ', error)
    return objWithStrings
  }
}

export const isBasicZmanimKey = (key: string) => {
  // console.log('basicZmanimList: ', basicZmanimList)
  return basicZmanimList.includes(key)
}
