'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { TripSchema, type TripInput } from '@/lib/zodSchemas'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/axios'

export default function NewTrip(){
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TripInput>({
    resolver: zodResolver(TripSchema)
  })

  async function onSubmit(values: TripInput){
    const res = await api.post('/trips', values)
    if (res.data?.trip) router.push('/trips')
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-bold">New Trip</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input placeholder="Title (e.g., Hatyai → Luang Prabang)" {...register('title')} />
        {errors.title && <div className="text-sm text-red-400">{errors.title.message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Start location" {...register('start_loc')} />
          <Input placeholder="End location" {...register('end_loc')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input type="date" placeholder="Start date" {...register('start_at')} />
          <Input type="date" placeholder="End date" {...register('end_at')} />
        </div>

        <Textarea placeholder="Notes (optional)" {...register('notes' as any)} />

        <div className="flex gap-2">
          <Button disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save Trip'}</Button>
          <Button type="button" className="bg-transparent border border-white/20" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
