import { z } from 'zod'

const errorMessageRequired = 'This field is required'

export const schema = z.object({
  locationName: z.string().min(1, { message: errorMessageRequired }),
  longitude: z.string().min(1, { message: errorMessageRequired }),
  latitude: z.string().min(1, { message: errorMessageRequired }),
  elevation: z.string(),
  timeZoneId: z
    .string({
      required_error: errorMessageRequired,
    })
    .min(1, { message: errorMessageRequired }),
  date: z.string().min(1, { message: errorMessageRequired }),
  complexZmanim: z.boolean(),
})

type ZodInputs = z.infer<typeof schema>

export type Inputs = ZodInputs & { id?: string }

export const schemaTefilotFormAuto = z.object({
  addOrRemove: z.string().min(1, { message: errorMessageRequired }),
  referTo: z
    .string({
      required_error: errorMessageRequired,
    })
    .min(1, { message: errorMessageRequired }),
})

export type TefilotFormInputs = z.infer<typeof schemaTefilotFormAuto>
