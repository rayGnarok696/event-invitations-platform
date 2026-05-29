# Quick Start

## Installation (Choose your OS)

### Windows
1. Open Command Prompt in the project folder
2. Run:
   ```bash
   .\setup.bat
   ```

### Mac / Linux
1. Open Terminal in the project folder
2. Make the script executable:
   ```bash
   chmod +x setup.sh
   ```
3. Run:
   ```bash
   ./setup.sh
   ```

### Manual Setup
If the scripts don't work:

```bash
# Install dependencies
npm install

# Setup database
npx prisma db push

# Start development
npm run dev
```

## After Installation

✅ Open [http://localhost:3000](http://localhost:3000)

✅ Click "Create Event" to get started

✅ Choose templates for your sections

✅ Preview your invitation

## Commands

```bash
npm run dev          # 🚀 Start development server (port 3000)
npm run build        # 📦 Build for production
npm start            # ⚡ Start production server
npm run lint         # 🔍 Check code quality
npx prisma studio   # 💾 View/edit database
npx prisma db push  # 🔄 Sync database schema
```

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Database issues?**
```bash
rm dev.db
npx prisma db push
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more help.

## Features

- ✨ Create beautiful event invitations
- 🎨 6+ pre-designed templates
- 📝 Customizable sections
- 👀 Live preview
- 📊 Event management dashboard
- 💾 SQLite database
- 📱 Responsive design

## Next Steps

1. [Read the full README](./README.md)
2. [Check the API Documentation](./API_DOCUMENTATION.md)
3. [View the Roadmap](./ROADMAP.md)
4. [Report issues or suggest features](https://github.com/rayGnarok696/event-invitations-platform/issues)

Enjoy creating beautiful invitations! 🎉
