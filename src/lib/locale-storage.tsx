import { toast } from 'react-toastify'

export const saveInLocalStorage = (name: string, item: object | []) => {
  try {
    const data = localStorage.setItem(name, JSON.stringify(item))
    return { data }
  } catch (error) {
    toast.error('Error saving local storage')
    return error
  }
}

interface GetFromLocalStorageResult<T> {
  data?: object | [] | null
  error?: any
}

export const getFromLocalStorage = <T,>(
  name: string
): GetFromLocalStorageResult<T> => {
  try {
    const jsonData = localStorage.getItem(name)
    if (!jsonData) return { data: null }
    const data = JSON.parse(jsonData)
    return { data }
  } catch (error) {
    toast.error('Error getting from local storage')
    return { error }
  }
}
