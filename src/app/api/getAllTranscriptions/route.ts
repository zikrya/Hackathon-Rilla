import { NextResponse } from 'next/server';
import { dynamoDb } from '@/lib/aws-config';

export async function GET() {
  try {
    const params = {
      TableName: 'Transcriptions',
    };

    const result = await dynamoDb.scan(params).promise();
    const transcriptions = result.Items?.map(item => ({
      transcriptId: item.transcriptId,
      title: item.title,
      content: item.content,
      createdAt: item.createdAt,
    })) || [];

    return NextResponse.json({ transcriptions });
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    return new NextResponse('Failed to fetch transcriptions', { status: 500 });
  }
}
