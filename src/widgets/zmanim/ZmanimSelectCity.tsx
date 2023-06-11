import { useCityStore } from '@/store/cityStore'
import { Option, Select } from '@material-tailwind/react'

export const ZmanimSelectCity = () => {
  const cities = useCityStore((state) => state.cities)
  const updateActualCityForZamnim = useCityStore(
    (state) => state.updateActualCityForZamnim
  )
  const actualCityForZamnim = useCityStore((state) => state.actualCityForZamnim)
  return (
    <Select
      value={actualCityForZamnim ? actualCityForZamnim.locationName : undefined}
      label="Select a city"
    >
      {cities.map((c) => (
        <Option
          key={c.id}
          value={c.locationName}
          onClick={() => updateActualCityForZamnim(c)}
        >
          {c.locationName}
        </Option>
      ))}
    </Select>
  )
}
