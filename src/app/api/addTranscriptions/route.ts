import { NextResponse } from 'next/server';
import { dynamoDb } from '@/lib/aws-config';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { title, content, userId } = await req.json();

    if (!title || !content || !userId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const transcriptId = uuidv4();
    const createdAt = new Date().toISOString();

    const params = {
      TableName: 'Transcriptions',
      Item: {
        transcriptId,   // Unique ID for the transcription
        title,
        content,
        userId,
        createdAt,
      },
    };

    await dynamoDb.put(params).promise();

    return NextResponse.json({ message: 'Transcription added successfully', transcriptId }, { status: 201 });
  } catch (error) {
    console.error('Error adding transcription:', error);
    return new NextResponse('Failed to add transcription', { status: 500 });
  }
}
