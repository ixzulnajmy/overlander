import { z } from 'zod'

export const TripSchema = z.object({
  title: z.string().min(3),
  start_at: z.string().optional(),
  end_at: z.string().optional(),
  start_loc: z.string().min(2),
  end_loc: z.string().min(2),
  visibility: z.enum(['private','friends','public']).default('private'),
})
export type TripInput = z.infer<typeof TripSchema>
