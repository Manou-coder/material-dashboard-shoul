import { z } from 'zod'

const errorMessageRequired = 'This field is required'

export const schema = z.object({
  locationName: z.string().min(1, { message: errorMessageRequired }),
  longitude: z.string().min(1, { message: errorMessageRequired }),
  latitude: z.string().min(1, { message: errorMessageRequired }),
  elevation: z.string(),
  timeZoneId: z.string({
    required_error: errorMessageRequired,
  }),
  date: z.string().min(1, { message: errorMessageRequired }),
  complexZmanim: z.boolean(),
})

export type Inputs = z.infer<typeof schema>
