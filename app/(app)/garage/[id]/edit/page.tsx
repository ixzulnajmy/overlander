'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from '@tanstack/react-query'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { BikeSchema, type BikeInput } from '@/lib/zodSchemas'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/axios'

type Bike = BikeInput & { id: string }

export default function EditBike() {
  const router = useRouter()
  const params = useParams()
  const bikeId = params.id as string
  const [error, setError] = useState<string>('')

  const { data: bikes, isLoading } = useQuery({
    queryKey: ['bikes'],
    queryFn: async () => (await api.get('/bikes')).data.bikes as Bike[]
  })

  const bike = bikes?.find(b => b.id === bikeId)

  const { register, handleSubmit, formState: { errors } } = useForm<BikeInput>({
    resolver: zodResolver(BikeSchema),
    values: bike ? {
      make: bike.make || '',
      model: bike.model || '',
      year: bike.year,
      plate_no: bike.plate_no || '',
      nickname: bike.nickname || '',
      odo_start_km: bike.odo_start_km,
      status: bike.status,
      photo_url: bike.photo_url || ''
    } : undefined
  })

  const updateMutation = useMutation({
    mutationFn: async (values: BikeInput) => {
      const res = await api.put('/bikes', { id: bikeId, ...values })
      return res.data
    },
    onSuccess: () => {
      router.push('/garage')
    },
    onError: (err: any) => {
      console.error('Error updating bike:', err)
      setError(err.response?.data?.error || err.message || 'Failed to update bike. Please try again.')
    }
  })

  async function onSubmit(values: BikeInput) {
    setError('')
    updateMutation.mutate(values)
  }

  if (isLoading) {
    return <div className="text-zinc-400">Loading...</div>
  }

  if (!bike) {
    return <div className="text-red-400">Bike not found</div>
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold">Edit Bike</h2>
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
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
          <Button disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
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
