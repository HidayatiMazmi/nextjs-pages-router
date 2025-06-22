import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const formSchema = z.object({
    title: z.string().min(1, 'Title wajib diisi!'),
    description: z.string().min(1, 'Description wajib diisi!'),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;
  if (req.method !== 'POST') {
    return res.status(405).json({ errorMessage : 'Method Not Allowed' });
  }

  try {
    const validatedData = formSchema.parse(req.body);
    const response = await fetch(`${process.env.API_URL}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(validatedData)
    }).then((res) => res.json())
    // if (!response.success) {
    //   return res.status(500).json({ errorMessage: 'Failed to fetch data from API' });
    // }
    if(response.success){
      res.status(201).json(response);
    }
    // return res.status(200).json({ message: 'Form submitted successfully', data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
        const errors = Object.keys(error.formErrors.fieldErrors).reduce((acc, key) => {
            acc[key] = error.formErrors.fieldErrors[key]?.[0] || "Unknown error"; // Ambil pesan error pertama untuk setiap field
            return acc;
        }, {} as Record<string, string>);
      return  res.status(400).json({ errors });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}