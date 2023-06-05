import { z } from 'zod'

export const schema = z.object({
  city: z.string().min(1, { message: 'This field is required' }),
  longitude: z.string().min(1, { message: 'This field is required' }),
  latitude: z.string().min(1, { message: 'This field is required' }),
  altitude: z.string(),
  timeZoneId: z.string().min(1, { message: 'This field is required' }),
})

export type Inputs = z.infer<typeof schema>
