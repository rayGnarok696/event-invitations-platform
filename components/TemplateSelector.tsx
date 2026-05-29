'use client';

import React from 'react';
import { PREDEFINED_TEMPLATES } from '@/lib/templates';

interface TemplateSelectorProps {
  category: string;
  onSelect: (templateId: string) => void;
  disabled?: boolean;
}

export function TemplateSelector({
  category,
  onSelect,
  disabled = false,
}: TemplateSelectorProps) {
  const templates = PREDEFINED_TEMPLATES.filter(
    (t) => t.category === category
  );

  return (
    <div className="template-selector">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          disabled={disabled}
          className="template-card text-left transition-colors"
          title={template.description}
        >
          <div className="text-2xl mb-2">{template.icon}</div>
          <div className="font-semibold text-sm">{template.name}</div>
          <div className="text-xs text-slate-600 mt-1">
            {template.description}
          </div>
        </button>
      ))}
    </div>
  );
}
