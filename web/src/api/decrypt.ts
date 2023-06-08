'use client'

interface DecryptProps {
  file: FileList
  privateKey: string
}

interface DecryptData {
  file: Blob
  contentFile: string
}

export default async function encrypt(props: DecryptProps): Promise<DecryptData> {
  try {
    const formData = new FormData()
    formData.append('file', props.file[0])
    formData.append('privateKey', props.privateKey)

    const response = await fetch('http://localhost:4000/new/decryption', {
      method: 'POST',
      body: formData
    })

    const file = await response.blob()
    const contentFile = await file.text()

    return { file, contentFile } as DecryptData
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
