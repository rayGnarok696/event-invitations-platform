export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  htmlTemplate: string;
  cssPreset: string;
}

export const PREDEFINED_TEMPLATES: Template[] = [
  {
    id: 'greeting',
    name: 'Greeting Section',
    description: 'Welcome greeting for the invitation',
    category: 'header',
    icon: '🎉',
    htmlTemplate: `
      <div class="greeting">
        <h1>{{title}}</h1>
        <p class="subtitle">{{content}}</p>
      </div>
    `,
    cssPreset: `
      .greeting {
        text-align: center;
        padding: 50px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        margin-bottom: 30px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
      }
      .greeting h1 {
        font-family: 'Georgia', serif;
        font-size: 3em;
        margin: 0 0 15px 0;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .greeting .subtitle {
        font-size: 1.2em;
        margin: 0;
        font-style: italic;
        opacity: 0.95;
      }
    `,
  },
  {
    id: 'date-time',
    name: 'Date & Time',
    description: 'Display event date and time',
    category: 'details',
    icon: '🕐',
    htmlTemplate: `
      <div class="date-time">
        <div class="datetime-container">
          <div class="detail-item">
            <span class="icon">📅</span>
            <div>
              <span class="label">Date</span>
              <span class="value">{{date}}</span>
            </div>
          </div>
          <div class="detail-item">
            <span class="icon">🕐</span>
            <div>
              <span class="label">Time</span>
              <span class="value">{{time}}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    cssPreset: `
      .date-time {
        margin: 30px 0;
      }
      .datetime-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }
      .detail-item {
        display: flex;
        align-items: center;
        gap: 15px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      }
      .detail-item .icon {
        font-size: 2em;
      }
      .detail-item .label {
        display: block;
        font-weight: bold;
        color: #333;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .detail-item .value {
        display: block;
        color: #666;
        font-size: 1.1em;
        margin-top: 5px;
      }
    `,
  },
  {
    id: 'location',
    name: 'Location',
    description: 'Display event location',
    category: 'details',
    icon: '📍',
    htmlTemplate: `
      <div class="location-section">
        <div class="location-content">
          <h3>📍 Location</h3>
          <p class="address">{{address}}</p>
          <p class="details">{{additional_info}}</p>
        </div>
      </div>
    `,
    cssPreset: `
      .location-section {
        margin: 30px 0;
      }
      .location-content {
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        padding: 25px;
        border-radius: 10px;
        border-left: 5px solid #ff9800;
        box-shadow: 0 4px 15px rgba(255, 152, 0, 0.15);
      }
      .location-content h3 {
        margin: 0 0 15px 0;
        color: #d84315;
        font-size: 1.3em;
        font-weight: bold;
      }
      .location-content .address {
        margin: 8px 0;
        color: #555;
        font-weight: 500;
        font-size: 1.05em;
      }
      .location-content .details {
        font-size: 0.95em;
        color: #777;
        margin: 5px 0 0 0;
      }
    `,
  },
  {
    id: 'dress-code',
    name: 'Dress Code',
    description: 'Specify dress code requirements',
    category: 'details',
    icon: '👔',
    htmlTemplate: `
      <div class="dress-code">
        <div class="dress-content">
          <h3>👔 Dress Code</h3>
          <p>{{code}}</p>
        </div>
      </div>
    `,
    cssPreset: `
      .dress-code {
        margin: 30px 0;
      }
      .dress-content {
        background: linear-gradient(135deg, #fff9c4 0%, #fff176 100%);
        padding: 25px;
        border-radius: 10px;
        border-left: 5px solid #fbc02d;
        box-shadow: 0 4px 15px rgba(251, 192, 45, 0.2);
      }
      .dress-content h3 {
        margin: 0 0 12px 0;
        color: #f57f17;
        font-size: 1.3em;
        font-weight: bold;
      }
      .dress-content p {
        margin: 0;
        color: #856404;
        font-size: 1.05em;
      }
    `,
  },
  {
    id: 'rsvp',
    name: 'RSVP',
    description: 'Call to action for RSVPs',
    category: 'footer',
    icon: '✉️',
    htmlTemplate: `
      <div class="rsvp-section">
        <div class="rsvp-content">
          <h3>RSVP</h3>
          <p class="rsvp-text">Please confirm your attendance by {{deadline}}</p>
          <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></p>
            <p><strong>Phone:</strong> {{phone}}</p>
          </div>
        </div>
      </div>
    `,
    cssPreset: `
      .rsvp-section {
        margin-top: 40px;
      }
      .rsvp-content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      }
      .rsvp-content h3 {
        margin: 0 0 20px 0;
        font-size: 1.8em;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .rsvp-text {
        margin: 0 0 20px 0;
        font-size: 1.1em;
      }
      .contact-info {
        margin-top: 20px;
      }
      .contact-info p {
        margin: 10px 0;
        font-size: 1em;
      }
      .contact-info a {
        color: #fff;
        text-decoration: underline;
      }
    `,
  },
  {
    id: 'custom-text',
    name: 'Custom Text',
    description: 'Add custom text section',
    category: 'content',
    icon: '📝',
    htmlTemplate: `
      <div class="custom-text">
        <p>{{content}}</p>
      </div>
    `,
    cssPreset: `
      .custom-text {
        padding: 20px 0;
        line-height: 1.8;
        color: #333;
      }
      .custom-text p {
        margin: 15px 0;
        font-size: 1.05em;
        color: #555;
      }
    `,
  },
  {
    id: 'program',
    name: 'Program / Schedule',
    description: 'Event schedule or program details',
    category: 'content',
    icon: '📋',
    htmlTemplate: `
      <div class="program-section">
        <h3>📋 Program</h3>
        <div class="program-content">
          {{content}}
        </div>
      </div>
    `,
    cssPreset: `
      .program-section {
        margin: 30px 0;
      }
      .program-section h3 {
        color: #333;
        font-size: 1.4em;
        margin-bottom: 15px;
        border-bottom: 3px solid #667eea;
        padding-bottom: 10px;
      }
      .program-content {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        line-height: 1.8;
      }
    `,
  },
];

export function getTemplateById(id: string): Template | undefined {
  return PREDEFINED_TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return PREDEFINED_TEMPLATES.filter((t) => t.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(PREDEFINED_TEMPLATES.map((t) => t.category));
  return Array.from(categories).sort();
}
