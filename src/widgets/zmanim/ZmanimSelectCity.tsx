import { useCityStore } from '@/store/cityStore'
import { Option, Select } from '@material-tailwind/react'

export const ZmanimSelectCity = () => {
  const cities = useCityStore((state) => state.cities)
  return (
    <Select label="Select a city">
      {cities.map((c) => (
        <Option key={c.id} value={c.locationName}>
          {c.locationName}
        </Option>
      ))}
    </Select>
  )
}
