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
    icon: '👋',
    htmlTemplate: `
      <div class="greeting">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
      </div>
    `,
    cssPreset: `
      .greeting {
        text-align: center;
        padding: 40px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .greeting h1 {
        font-size: 2.5em;
        margin: 0 0 10px 0;
      }
      .greeting p {
        font-size: 1.1em;
        margin: 0;
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
        <div class="detail">
          <span class="label">📅 Date:</span>
          <span class="value">{{date}}</span>
        </div>
        <div class="detail">
          <span class="label">🕐 Time:</span>
          <span class="value">{{time}}</span>
        </div>
      </div>
    `,
    cssPreset: `
      .date-time {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .detail {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 1.1em;
      }
      .label {
        font-weight: bold;
        color: #333;
      }
      .value {
        color: #666;
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
      <div class="location">
        <h3>📍 Location</h3>
        <p>{{address}}</p>
        <p class="details">{{additional_info}}</p>
      </div>
    `,
    cssPreset: `
      .location {
        background: #ecf0f1;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .location h3 {
        margin: 0 0 10px 0;
        color: #333;
      }
      .location p {
        margin: 5px 0;
        color: #555;
      }
      .location .details {
        font-size: 0.9em;
        color: #888;
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
        <h3>👔 Dress Code</h3>
        <p>{{code}}</p>
      </div>
    `,
    cssPreset: `
      .dress-code {
        background: #fff3cd;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid #ffc107;
      }
      .dress-code h3 {
        margin: 0 0 10px 0;
        color: #856404;
      }
      .dress-code p {
        margin: 0;
        color: #856404;
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
      <div class="rsvp">
        <h3>RSVP</h3>
        <p>Please confirm your attendance by {{deadline}}</p>
        <p>Contact: <a href="mailto:{{email}}">{{email}}</a></p>
        <p>Phone: {{phone}}</p>
      </div>
    `,
    cssPreset: `
      .rsvp {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
      }
      .rsvp h3 {
        margin: 0 0 15px 0;
        font-size: 1.5em;
      }
      .rsvp p {
        margin: 8px 0;
      }
      .rsvp a {
        color: white;
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
        padding: 15px 0;
        line-height: 1.6;
        color: #333;
      }
      .custom-text p {
        margin: 10px 0;
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
  return Array.from(categories);
}
