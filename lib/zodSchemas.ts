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

export const BikeSchema = z.object({
  make: z.string().min(2, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  plate_no: z.string().optional(),
  nickname: z.string().optional(),
  odo_start_km: z.coerce.number().int().min(0).optional(),
  status: z.enum(['current','past','wishlist']).default('current'),
  photo_url: z.string().optional(),
})
export type BikeInput = z.infer<typeof BikeSchema>
