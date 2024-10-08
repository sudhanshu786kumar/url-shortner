import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request, { params }) {
  const { shortCode } = params;
  console.log('API: Attempting to fetch short code:', shortCode);

  try {
    const docRef = doc(db, 'urls', shortCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { originalUrl } = docSnap.data();
      console.log('API: Short code found, returning:', originalUrl);
      return NextResponse.json({ originalUrl });
    } else {
      console.log('API: Short code not found in database');
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API: Error fetching short URL:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}