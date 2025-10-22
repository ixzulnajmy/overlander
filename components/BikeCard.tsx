'use client'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Trash2, Edit } from 'lucide-react'
import { BikeIcon } from './BikeIcon'

type Bike = {
  id: string
  make?: string
  model?: string
  year?: number
  plate_no?: string
  nickname?: string
  photo_url?: string
  status: 'current' | 'past' | 'wishlist'
  odo_start_km?: number
}

export function BikeCard({ bike }: { bike: Bike }) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/bikes?id=${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bikes'] })
    }
  })

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this bike?')) {
      deleteMutation.mutate(bike.id)
    }
  }

  const displayName = bike.nickname || `${bike.make} ${bike.model}` || 'Unnamed Bike'
  const subtitle = bike.nickname
    ? `${bike.year ? bike.year + ' ' : ''}${bike.make} ${bike.model}`
    : bike.plate_no || `Added ${new Date(bike.id).toLocaleDateString()}`

  return (
    <div className="rounded-2xl border border-white/10 p-4 hover:bg-white/5 transition">
      <div className="flex items-start gap-3">
        <div className="h-24 w-24 flex items-center justify-center bg-white/5 rounded-xl">
          <BikeIcon
            make={bike.make}
            model={bike.model}
            year={bike.year}
            className="w-20 h-20"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{displayName}</h3>
          <div className="mt-1 text-sm text-zinc-400 truncate">
            {subtitle}
          </div>
          {bike.odo_start_km && (
            <div className="mt-1 text-xs text-zinc-500">
              Odometer: {bike.odo_start_km.toLocaleString()} km
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/garage/${bike.id}/edit`}
          className="flex-1 text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm flex items-center justify-center gap-2"
        >
          <Edit size={16} />
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition text-sm text-red-500 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
