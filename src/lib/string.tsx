export const capitalizeFirstLetter = (str: string | undefined): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertCamelCaseToWords = (camelCaseString: string): string => {
  const words = camelCaseString.replace(/([a-z])([A-Z0-9])/g, '$1 $2')
  const finalWords = words.replace(/(?<=[A-Z])(?=\d)/g, ' ')
  return finalWords.charAt(0).toUpperCase() + finalWords.slice(1)
}
