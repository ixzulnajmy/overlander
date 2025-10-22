'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { BikeSchema, type BikeInput } from '@/lib/zodSchemas'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/axios'

export default function NewBike() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BikeInput>({
    resolver: zodResolver(BikeSchema),
    defaultValues: {
      status: 'current'
    }
  })

  async function onSubmit(values: BikeInput) {
    const res = await api.post('/bikes', values)
    if (res.data?.bike) router.push('/garage')
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold">Add Bike</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input placeholder="Make (e.g., BMW)" {...register('make')} />
            {errors.make && <div className="text-sm text-red-400 mt-1">{errors.make.message}</div>}
          </div>
          <div>
            <Input placeholder="Model (e.g., R1250GS)" {...register('model')} />
            {errors.model && <div className="text-sm text-red-400 mt-1">{errors.model.message}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input type="number" placeholder="Year (e.g., 2023)" {...register('year')} />
            {errors.year && <div className="text-sm text-red-400 mt-1">{errors.year.message}</div>}
          </div>
          <div>
            <Input placeholder="Plate No (optional)" {...register('plate_no')} />
          </div>
        </div>

        <Input placeholder="Nickname (optional)" {...register('nickname')} />

        <Input type="number" placeholder="Odometer (km, optional)" {...register('odo_start_km')} />

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Status</label>
          <select
            {...register('status')}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="current">Current</option>
            <option value="past">Past</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        <Input placeholder="Photo URL (optional)" {...register('photo_url')} />

        <div className="flex gap-2">
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Add Bike'}
          </Button>
          <Button
            type="button"
            className="bg-transparent border border-white/20"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
