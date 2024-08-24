import { NextResponse } from 'next/server';
import { dynamoDb } from '@/lib/aws-config';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { transcriptId, userId, commentText } = await req.json();

    if (!transcriptId || !userId || !commentText) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const commentId = uuidv4();
    const createdAt = new Date().toISOString();

    const params = {
      TableName: 'Comments',
      Item: {
        commentId,
        transcriptId,
        userId,
        commentText,
        createdAt,
      },
    };

    await dynamoDb.put(params).promise();

    return NextResponse.json({ message: 'Comment added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new NextResponse('Failed to add comment', { status: 500 });
  }
}
