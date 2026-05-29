'use client';

import React, { useState, useEffect } from 'react';
import { getAllCategories, PREDEFINED_TEMPLATES } from '@/lib/templates';

interface Section {
  id: string;
  title: string;
  templateId: string;
  order: number;
  content?: string;
  eventId: string;
}

interface SectionEditorProps {
  eventId: string;
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

export function SectionEditor({
  eventId,
  sections,
  onSectionsChange,
}: SectionEditorProps) {
  const [categories] = useState(getAllCategories());
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0] || ''
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const addSection = async (templateId: string) => {
    const template = PREDEFINED_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          templateId,
          title: template.name,
          content: '',
        }),
      });

      if (response.ok) {
        const newSection = await response.json();
        onSectionsChange([...sections, newSection]);
      }
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const removeSection = async (sectionId: string) => {
    try {
      await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE',
      });
      onSectionsChange(sections.filter((s) => s.id !== sectionId));
    } catch (error) {
      console.error('Error removing section:', error);
    }
  };

  const updateSection = async (
    sectionId: string,
    updates: Partial<Section>
  ) => {
    try {
      await fetch(`/api/sections/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      onSectionsChange(
        sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
      );
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [moved] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, moved);
    newSections.forEach((s, i) => {
      s.order = i;
    });
    onSectionsChange(newSections);
  };

  const templates = PREDEFINED_TEMPLATES.filter(
    (t) => t.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Add Section Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add Section</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="template-selector">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => addSection(template.id)}
              className="template-card hover:border-blue-500 hover:bg-blue-50"
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
      </div>

      {/* Sections List */}
      {sections.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sections</h3>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center justify-between bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  {editingId === section.id ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        updateSection(section.id, { title: e.target.value })
                      }
                      onBlur={() => setEditingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingId(null);
                      }}
                      autoFocus
                      className="w-full px-2 py-1 border border-blue-500 rounded"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingId(section.id)}
                      className="cursor-pointer font-medium"
                    >
                      {section.title}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-1">
                    {section.templateId}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {index > 0 && (
                    <button
                      onClick={() => reorderSections(index, index - 1)}
                      className="px-2 py-1 text-sm bg-slate-200 hover:bg-slate-300 rounded"
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {index < sections.length - 1 && (
                    <button
                      onClick={() => reorderSections(index, index + 1)}
                      className="px-2 py-1 text-sm bg-slate-200 hover:bg-slate-300 rounded"
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    onClick={() => removeSection(section.id)}
                    className="px-2 py-1 text-sm bg-red-200 hover:bg-red-300 text-red-800 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
