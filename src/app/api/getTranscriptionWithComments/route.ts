import { NextResponse } from 'next/server';
import { dynamoDb } from '@/lib/aws-config';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transcriptId = searchParams.get('transcriptId');

  if (!transcriptId) {
    return new NextResponse('Missing transcriptId parameter', { status: 400 });
  }

  try {
    const transcriptionParams = {
      TableName: 'Transcriptions',
      Key: {
        transcriptId: transcriptId,
      },
    };
    const transcriptionResult = await dynamoDb.get(transcriptionParams).promise();
    const transcription = transcriptionResult.Item;

    if (!transcription) {
      return new NextResponse('Transcription not found', { status: 404 });
    }

    const commentsParams = {
      TableName: 'Comments',
      KeyConditionExpression: 'transcriptId = :transcriptId',
      ExpressionAttributeValues: {
        ':transcriptId': transcriptId,
      },
    };
    const commentsResult = await dynamoDb.query(commentsParams).promise();
    const comments = commentsResult.Items || [];

    const result = {
      transcription: {
        transcriptId: transcription.transcriptId,
        title: transcription.title,
        content: transcription.content,
        createdAt: transcription.createdAt,
      },
      comments: comments.map(item => ({
        commentId: item.commentId,
        transcriptId: item.transcriptId,
        userId: item.userId,
        commentText: item.commentText,
        createdAt: item.createdAt,
      })),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error retrieving transcription with comments:', error);
    return new NextResponse('Failed to retrieve transcription with comments', { status: 500 });
  }
}
