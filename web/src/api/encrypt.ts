'use client'

interface EncryptProps {
  file: FileList
  publicKey: string
}

interface EncryptData {
  file: Blob
  contentFile: string
}

export default async function encrypt(props: EncryptProps): Promise<EncryptData> {
  try {
    const formData = new FormData()
    formData.append('file', props.file[0])
    formData.append('publicKey', props.publicKey)

    const response = await fetch('http://localhost:4000/new/encryption', {
      method: 'POST',
      body: formData
    })

    const file = await response.blob()
    const contentFile = await file.text()

    return { file, contentFile } as EncryptData
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
