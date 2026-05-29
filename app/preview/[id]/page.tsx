'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  createdAt: string;
  sections: Array<{ id: string }>;
}

export default function PreviewPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Invitation not found</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {event.title}
        </h1>
        <p className="text-slate-600">Shared Invitation</p>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
        {/* Render invitation preview here */}
        <div className="text-center text-slate-500 py-12">
          <p>Invitation preview</p>
          <p className="text-sm mt-2">Sections: {event.sections?.length || 0}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
        >
          🖨️ Print
        </button>
        <button
          onClick={() => {
            const link = window.location.href;
            navigator.clipboard.writeText(link);
            alert('Link copied to clipboard!');
          }}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          🔗 Copy Link
        </button>
      </div>
    </div>
  );
}
