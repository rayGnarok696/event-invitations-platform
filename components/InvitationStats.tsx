'use client';

import React from 'react';

interface Section {
  id: string;
  title: string;
  templateId: string;
  content?: string;
}

interface InvitationStatsProps {
  eventTitle: string;
  sectionsCount: number;
  createdAt: string;
}

export function InvitationStats({
  eventTitle,
  sectionsCount,
  createdAt,
}: InvitationStatsProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-slate-100 rounded-lg p-4 space-y-3">
      <div>
        <p className="text-sm text-slate-600">Event</p>
        <p className="font-semibold text-slate-900">{eventTitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-600">Sections</p>
          <p className="text-2xl font-bold text-blue-600">{sectionsCount}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">Created</p>
          <p className="text-sm font-medium text-slate-900">
            {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
          </p>
        </div>
      </div>
    </div>
  );
}
