import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv'
const GEMINI_API_KEY = 'AIzaSyCpUZNc7vXFuPreUTdrtW-9-yCrF1Saig0' // Add this in your .env file

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
        return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert the file into base64 for API submission
    const imageBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent',
            {
                contents: [
                    {
                        parts: [
                            {
                                inline_data: {
                                    mime_type: file.type,
                                    data: base64Image,
                                },
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${GEMINI_API_KEY}`,
                },
            }
        );

        const predictionResult = response.data?.candidates?.[0]?.content;
        return NextResponse.json({ result: predictionResult || 'No condition detected.' });
    } catch (error) {
        console.error('AI Model Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze the image. Try again later.' },
            { status: 500 }
        );
    }
}
