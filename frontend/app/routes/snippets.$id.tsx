import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Snippet } from '../types';

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`${process.env.VITE_API_URL}/snippets/${id}`);
  
  if (!res.ok) {
    throw new Response("Snippet not found", { status: 404 });
  }

  const snippet: Snippet = await res.json();

  return new Response(JSON.stringify(snippet), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default function SnippetDetailPage() {
  const snippet = useLoaderData<Snippet>();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Snippet Details</h1>
      <p className="text-sm text-gray-500 mb-2">ID: {snippet.id}</p>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-gray-800">
        {snippet.text}
      </pre>
      <p className="mt-4 text-gray-700"><strong>Summary:</strong> {snippet.summary}</p>
    </div>
  );
}
