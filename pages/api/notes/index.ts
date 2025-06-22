import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string
  age?: number
  errorMessage?: string
  payload?: object
  headers?: string | string[]
  params?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log('Request => ', req)
    const response = await fetch(`${process.env.API_URL}`).then((res) => res.json())
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({errorMessage: 'Error'})
  }
}