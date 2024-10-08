import ShortUrlRedirect from './ShortUrlRedirect';

export const metadata = {
  title: 'Redirecting... | Your URL Shortener',
};

export default function ShortUrlPage({ params }) {
  return <ShortUrlRedirect shortCode={params.shortCode} />;
}