import ComicGenerator from '../components/ComicGenerator';

export default function Home() {
  const apiKey = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM';

  return (
    <div>
      <ComicGenerator apiKey={apiKey} />
    </div>
  );
};

