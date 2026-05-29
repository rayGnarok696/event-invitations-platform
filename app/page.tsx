'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string | null;
  location: string | null;
  createdAt: string;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Event Invitations</h1>
        <Link
          href="/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          + Create Event
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-slate-500 mb-4">No events created yet.</p>
          <Link
            href="/events/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}/edit`}>
              <div className="section-card hover:cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                {event.date && (
                  <p className="text-sm text-slate-600 mb-1">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
                {event.location && (
                  <p className="text-sm text-slate-600 mb-3">📍 {event.location}</p>
                )}
                <p className="text-xs text-slate-400">
                  Created {new Date(event.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
