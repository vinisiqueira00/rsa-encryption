'use client'

interface GenerateKeysProps {
  keyName: string
}

interface GenerateKeysData {
  keyName: string
  publicKey: string
  privateKey: string
}

export default async function generateKeys(props: GenerateKeysProps): Promise<GenerateKeysData> {
  try {
    const response = await fetch('http://localhost:4000/new/keys-generation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyName: props.keyName
      })
    })

    const data = await response.json()

    return data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
