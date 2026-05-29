'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EventCard } from '@/components/EventCard';

interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  createdAt: string;
  sections: Array<{ id: string }>;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true;
    if (filter === 'recent') {
      const daysDiff = Math.floor(
        (Date.now() - new Date(event.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDiff <= 7;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-3">Event Invitations</h1>
        <p className="text-xl text-slate-600">Create and manage beautiful invitations</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-2">
          {['all', 'recent'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {f === 'all' ? '📋 All' : '⏱️ Recent'}
            </button>
          ))}
        </div>
        <Link
          href="/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <span>➕</span> Create Event
        </Link>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-slate-500 mt-4">Loading your events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-slate-600 mb-2">
            {filter === 'recent'
              ? 'No recent events found'
              : 'No events created yet'}
          </p>
          <p className="text-slate-500 mb-6">Start creating your first invitation now!</p>
          <Link
            href="/events/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            ✨ Create your first event
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-slate-600 mb-6">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-600">
        <p>💡 Tip: Click on any event to edit or preview your invitation</p>
      </div>
    </div>
  );
}
