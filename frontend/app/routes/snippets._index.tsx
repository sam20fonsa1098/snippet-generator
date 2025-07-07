import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData, Form, Link, useNavigation } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import type { Snippet } from '../types';

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${process.env.VITE_API_URL}/snippets`);
  const snippets: Snippet[] = await res.json();
  return new Response(
    JSON.stringify(snippets),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const text = formData.get('text');

  if (typeof text !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  await fetch(`${process.env.VITE_API_URL}/snippets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  return redirect('/snippets');
};

export default function SnippetsPage() {
  const snippets = useLoaderData<Snippet[]>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state === 'idle') {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Snippets</h1>

      <Form method="post" className="mb-6 space-y-2" ref={formRef}>
        <textarea
          name="text"
          required
          placeholder="Enter snippet text"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "⏳ Creating snippet..." : 'Create Snippet'}
        </button>
      </Form>

      <ul className="space-y-4">
        {snippets.map((snippet) => (
          <li key={snippet.id} className="border p-4 rounded shadow">
            <Link
              to={`/snippets/${snippet.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {snippet.id}
            </Link>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{snippet.text}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
