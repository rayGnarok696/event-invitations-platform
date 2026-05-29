'use client';

import React from 'react';

interface ExportMenuProps {
  eventId: string;
  eventTitle: string;
  onExportHtml?: () => void;
  onExportPdf?: () => void;
  onCopyLink?: () => void;
}

export function ExportMenu({
  eventId,
  eventTitle,
  onExportHtml,
  onExportPdf,
  onCopyLink,
}: ExportMenuProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleCopyShareLink = () => {
    const link = `${window.location.origin}/preview/${eventId}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
    setShowMenu(false);
  };

  const handleExportHtml = () => {
    // This would generate an HTML file
    const link = document.createElement('a');
    link.href = `/api/export/html?eventId=${eventId}`;
    link.download = `${eventTitle}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        📤 Export
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-slate-200">
          <button
            onClick={handleCopyShareLink}
            className="w-full text-left px-4 py-2 hover:bg-slate-100 border-b border-slate-100 transition-colors"
          >
            🔗 Copy Share Link
          </button>
          <button
            onClick={handleExportHtml}
            className="w-full text-left px-4 py-2 hover:bg-slate-100 border-b border-slate-100 transition-colors"
          >
            💾 Download HTML
          </button>
          <button
            onClick={() => window.print()}
            className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
