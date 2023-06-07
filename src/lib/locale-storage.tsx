import { toast } from 'react-toastify'

export const saveInLocalStorage = (name: string, item: object) => {
  try {
    const data = localStorage.setItem(name, JSON.stringify([item]))
    return { data }
  } catch (error) {
    toast.error('Error saving local storage')
    return error
  }
}

export const getFromLocalStorage = (name: string) => {
  try {
    const jsonData = localStorage.getItem(name)
    if (!jsonData) return
    const data = JSON.parse(jsonData)
    return { data }
  } catch (error) {
    toast.error('Error getting from local storage')
    return error
  }
}
