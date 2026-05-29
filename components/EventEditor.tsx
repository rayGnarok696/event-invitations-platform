'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { InvitationPreview } from '@/components/InvitationPreview';
import { SectionEditor } from '@/components/SectionEditor';
import { ExportMenu } from '@/components/ExportMenu';
import { InvitationStats } from '@/components/InvitationStats';

interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  theme: string;
  createdAt: string;
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
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
          setSections(data.sections || []);
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

    setSaveStatus('saving');
    setIsSaving(true);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        setSaveStatus('saved');
        setTimeout(() => {
          if (saveStatus === 'saved') setSaveStatus('saved');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      setSaveStatus('unsaved');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
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
      {/* Header */}
      <div className="flex justify-between items-start mb-8 gap-4">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-3 inline-flex items-center gap-1">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">{event.title}</h1>
          <p className="text-slate-600 mt-1">ID: {eventId.slice(0, 8)}...</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <ExportMenu eventId={eventId} eventTitle={event.title} />
        </div>
      </div>

      {/* Save Status */}
      {saveStatus !== 'saved' && (
        <div className={`mb-4 p-3 rounded-lg ${
          saveStatus === 'saving'
            ? 'bg-blue-50 text-blue-700'
            : 'bg-yellow-50 text-yellow-700'
        }`}>
          {saveStatus === 'saving' ? '💾 Saving...' : '⚠️ Unsaved changes'}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Column */}
        {!showPreview && (
          <div className="lg:col-span-2 space-y-6">
            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📋 Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => {
                      setEvent({ ...event, title: e.target.value });
                      setSaveStatus('unsaved');
                    }}
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
                    onChange={(e) => {
                      setEvent({ ...event, description: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    📅 Date
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
                    onChange={(e) => {
                      setEvent({
                        ...event,
                        date: new Date(e.target.value).toISOString(),
                      });
                      setSaveStatus('unsaved');
                    }}
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    📍 Location
                  </label>
                  <input
                    type="text"
                    value={event.location || ''}
                    onChange={(e) => {
                      setEvent({ ...event, location: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    🎨 Theme
                  </label>
                  <select
                    value={event.theme}
                    onChange={(e) => {
                      setEvent({ ...event, theme: e.target.value });
                      setSaveStatus('unsaved');
                    }}
                    onBlur={handleSaveEvent}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="elegant">Elegant</option>
                    <option value="modern">Modern</option>
                    <option value="playful">Playful</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section Editor */}
            <SectionEditor
              eventId={eventId}
              sections={sections}
              onSectionsChange={setSections}
            />

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-2">⚠️ Danger Zone</h3>
              <p className="text-red-700 text-sm mb-4">
                Deleting this event is permanent and cannot be undone.
              </p>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Delete Event
              </button>
            </div>
          </div>
        )}

        {/* Preview Column */}
        <div className={showPreview ? 'lg:col-span-3' : 'lg:col-span-1'}>
          <div className="sticky top-8 space-y-4">
            {!showPreview && (
              <InvitationStats
                eventTitle={event.title}
                sectionsCount={sections.length}
                createdAt={event.createdAt}
              />
            )}
            <div>
              <h3 className="text-lg font-semibold mb-4">👀 Preview</h3>
              <InvitationPreview sections={sections} theme={event.theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
