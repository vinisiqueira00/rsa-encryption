'use client'

import { Key } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';

import { useKeysContext } from '@/context/Keys';
import { useEffect, useState } from 'react';

interface GenerateKeysData {
  keyName: string
  publicKey: string
  privateKey: string
}

enum TypeKeys {
  PUBLIC='PUBLIC',
  PRIVATE='PRIVATE',
}

interface TextareaFieldProps {
  name: string
  label: string
  typeKeys: TypeKeys
}

export default function KeyField(props: TextareaFieldProps) {
  const { selectedKey } = useKeysContext()
  const { register, formState, setValue } = useFormContext()

  const [ selectedKeyInfo, setSelectedKeyInfo ] = useState<GenerateKeysData>()

  useEffect(() => {
    const rsaKeysLocal: string = localStorage.getItem('rsa_keys') ?? '[]'
    const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal) as GenerateKeysData[]
    const keyInfo = rsaKeysLocalParsed.filter(key => key.keyName === selectedKey)[0]

    setSelectedKeyInfo(keyInfo)
    setValue(props.name, props.typeKeys === TypeKeys.PUBLIC ? keyInfo.publicKey : keyInfo.privateKey)
  }, [selectedKey, props.name, props.typeKeys, setValue])

  return (
    <div className='flex flex-col items-end justify-start gap-2 w-full'>
      <label htmlFor={props.name} className='flex items-start justify-start w-full min-h-[4rem] px-5 gap-4 rounded-2xl bg-charcoal cursor-pointer'>
        <div className='flex items-center justify-center h-16'>
          <Key className='text-cool-gray' weight='bold' size="1.5rem" />
        </div>
        <div className='relative flex flex-col items-start justify-center gap-1 w-full min-h-[4rem] py-3'>
          <input
            id={props.name}
            className='hidden'
            required
            {...register(props.name)}
          />

          <span
            className='absolute top-3 left-0 text-xs leading-none font-medium text-cool-gray select-none origin-top-left transition-label'
          >
            {props.label}
          </span>

          <span className='px-2 py-1 mt-4 rounded-lg bg-cool-gray text-base leading-5 font-semibold text-charcoal'>
            {selectedKey}
          </span>
        </div>
      </label>

      {formState.errors[props.name] && <span className='text-xs leading-none font-medium text-red-pantone'>{formState.errors[props.name]?.message?.toString()}</span>}
    </div>
  )
}
