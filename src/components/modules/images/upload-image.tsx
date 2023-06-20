import { CustomButton } from '@/lib/custom-components'
import { usePostImage } from '@/utils/hooks/use-post-image'
import axios from 'axios'
import { InputHTMLAttributes, useRef, useState } from 'react'

export const UploadImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { isPostLoading, mutate } = usePostImage()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    console.log('file: ', file)
    if (!file) return
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    mutate(formData)
  }

  // const handleUpload = async (file: File) => {
  //   // Perform upload logic with the selected image
  //   if (file) {
  //     uploadFormData(file)
  //   }
  // }

  // async function uploadFormData(file: File) {
  //   try {
  //     const formData = new FormData()
  //     formData.append('image', file)

  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }

  //     const response = await axios.post(
  //       'http://localhost:3000/api/images/add',
  //       formData,
  //       config
  //     )
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <CustomButton
        isLoading={isPostLoading}
        onClick={() => {
          inputRef?.current?.click()
        }}
      >
        Upload image
      </CustomButton>
    </>
  )
}
