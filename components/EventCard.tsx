'use client';

import React, { useEffect, useState } from 'react';
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

export function EventCard({ event }: { event: Event }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/events/${event.id}/edit`}>
      <div className="section-card hover:cursor-pointer transform hover:scale-105 transition-transform">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-slate-900 flex-1">
            {event.title}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {event.sections?.length || 0} sections
          </span>
        </div>

        {event.description && (
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-1">
          {event.date && (
            <p className="text-sm text-slate-600">
              📅 {formatDate(event.date)}
            </p>
          )}
          {event.location && (
            <p className="text-sm text-slate-600">
              📍 {event.location}
            </p>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-3">
          Updated {formatDate(event.createdAt)}
        </p>
      </div>
    </Link>
  );
}
