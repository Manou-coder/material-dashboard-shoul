import { v4 as uuidv4 } from 'uuid'

interface Props {
  data: string[] | null | undefined
}

export const ImagesList = ({ data }: Props) => {
  return (
    <div>
      {data?.map((imagePath) => (
        <img
          key={uuidv4()}
          className="max-w-full h-80"
          src={`http://localhost:3000${imagePath}`}
          alt="image"
        />
      ))}
    </div>
  )
}
