'use client';

import React, { useState, useEffect } from 'react';
import { PREDEFINED_TEMPLATES } from '@/lib/templates';

interface Section {
  id: string;
  title: string;
  templateId: string;
  content?: string;
}

interface InvitationPreviewProps {
  sections: Section[];
  theme?: string;
}

export function InvitationPreview({
  sections,
  theme = 'elegant',
}: InvitationPreviewProps) {
  const renderSection = (section: Section) => {
    const template = PREDEFINED_TEMPLATES.find(
      (t) => t.id === section.templateId
    );
    if (!template) return null;

    const content = section.content || '';
    let html = template.htmlTemplate;

    // Replace placeholders with actual content
    html = html.replace(/{{title}}/g, section.title);
    html = html.replace(/{{content}}/g, content);
    html = html.replace(/{{date}}/g, section.content?.split('|')[0] || '');
    html = html.replace(/{{time}}/g, section.content?.split('|')[1] || '');
    html = html.replace(/{{address}}/g, content);
    html = html.replace(/{{additional_info}}/g, '');
    html = html.replace(/{{code}}/g, content);
    html = html.replace(/{{deadline}}/g, '');
    html = html.replace(/{{email}}/g, '');
    html = html.replace(/{{phone}}/g, '');

    return (
      <div key={section.id} dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

  const styles = sections
    .map((section) => {
      const template = PREDEFINED_TEMPLATES.find(
        (t) => t.id === section.templateId
      );
      return template?.cssPreset || '';
    })
    .join('\n');

  return (
    <div className="invitation-preview bg-white rounded-lg shadow-xl p-8">
      <style>{styles}</style>
      {sections.length === 0 ? (
        <div className="text-center text-slate-400 py-12">
          <p>Add sections to preview the invitation</p>
        </div>
      ) : (
        <div className="space-y-4">{sections.map(renderSection)}</div>
      )}
    </div>
  );
}
