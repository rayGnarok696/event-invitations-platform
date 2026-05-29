'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { InvitationPreview } from '@/components/InvitationPreview';
import { SectionEditor } from '@/components/SectionEditor';

interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  theme: string;
}

interface Section {
  id: string;
  title: string;
  templateId: string;
  order: number;
  content?: string;
  eventId: string;
}

export default function EventEditor() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
          setSections(data.sections);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSaveEvent = async () => {
    if (!event) return;

    setIsSaving(true);
    try {
      await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      // Success
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
          <p className="text-slate-500 mb-4">Event not found</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        {!showPreview && (
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) =>
                      setEvent({ ...event, title: e.target.value })
                    }
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={event.description || ''}
                    onChange={(e) =>
                      setEvent({ ...event, description: e.target.value })
                    }
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      event.date
                        ? new Date(event.date)
                            .toISOString()
                            .slice(0, 16)
                        : ''
                    }
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        date: new Date(e.target.value).toISOString(),
                      })
                    }
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={event.location || ''}
                    onChange={(e) =>
                      setEvent({ ...event, location: e.target.value })
                    }
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section Editor */}
            <SectionEditor
              eventId={eventId}
              sections={sections}
              onSectionsChange={setSections}
            />
          </div>
        )}

        {/* Preview */}
        <div className={showPreview ? 'lg:col-span-3' : 'lg:col-span-1'}>
          <div className="sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <InvitationPreview sections={sections} theme={event.theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
