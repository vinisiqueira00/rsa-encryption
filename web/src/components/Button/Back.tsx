'use client'

import { ArrowLeft } from "@phosphor-icons/react"
import { useRouter } from 'next/navigation'

interface ButtonProps {}

export default function BackButton(props: ButtonProps) {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='flex items-center justify-center gap-2 p-4 rounded-2xl bg-raisin-black text-cool-gray hover:shadow-hover'>
      <ArrowLeft weight='bold' size="1.5rem" />
    </button>
  )
}
