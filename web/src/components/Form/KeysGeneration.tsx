'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { KeysGenerationFormData, keysGenerationFormSchema } from './schemas/keysGeneration';

import generateKeys from '@/api/generateKeys';

import { useKeysContext } from '@/context/Keys';

import SendButton from '@/components/Button/Send';
import FeedbackPopup, { ProgressRequest } from '../Feedback/Toast';
import TextField from '../Field/Text';

export default function KeysGenerationForm() {
  const [ progressRequest, setProgressRequest ] = useState<ProgressRequest>()
  const [ feedbackTitle, setFeedbackTitle ] = useState<string>('')
  const [ feedbackDescription, setFeedbackDescription ] = useState<string>('')
  const [ feedbackOpened, setFeedbackOpened ] = useState<boolean>(false)

  const { setPublicKey, setPrivateKey } = useKeysContext()

  const keysGenerationForm = useForm<KeysGenerationFormData>({
    resolver: zodResolver(keysGenerationFormSchema)
  })

  async function keysGeneration(data: KeysGenerationFormData) {
    try {
      if (!data.keyName) return

      setProgressRequest(ProgressRequest.LOADING)
      setFeedbackOpened(false)

      const response = await generateKeys({
        keyName: data.keyName,
      })

      setPublicKey(response.publicKey)
      setPrivateKey(response.privateKey)

      const rsaKeysLocal: string = localStorage.getItem('rsa_keys') ?? '[]'
      const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal)
      rsaKeysLocalParsed.push(response)
      localStorage.setItem('rsa_keys', JSON.stringify(rsaKeysLocalParsed))

      setProgressRequest(ProgressRequest.SUCCESS)
      setFeedbackTitle('Chaves geradas com sucesso!')
      setFeedbackDescription('As chaves geradas foram armazenadas por tempo determinado. Salve-as para que possa utilizá-las futuramente :)')
      setFeedbackOpened(true)
    } catch(error) {
      console.log(error)
      setProgressRequest(ProgressRequest.ERROR)
      setFeedbackTitle('Erro ao gerar as chaves RSA!')
      setFeedbackDescription('Confira se o nome tem menos que 15 caracteres e tente novamente :)')
      setFeedbackOpened(true)
    }
  }

  return (
    <FormProvider {...keysGenerationForm}>
      <div>
        <form className='flex flex-col items-start justify-start w-full gap-4' onSubmit={keysGenerationForm.handleSubmit(keysGeneration)}>
          <TextField
            name='keyName'
            label='Nome da chave'
            limitLength={15}
          />

          <SendButton label='Gerar chaves RSA' loading={progressRequest === ProgressRequest.LOADING} />
        </form>

        {feedbackOpened && (
          <FeedbackPopup
            status={progressRequest}
            title={feedbackTitle}
            description={feedbackDescription}
          />
        )}
      </div>
    </FormProvider>
  )
}
