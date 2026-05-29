# Troubleshooting Guide

## Common Issues

### 1. Database Errors

**Problem**: "SQLITE_CANTOPEN" or database file not found

**Solution**:
```bash
rm dev.db
npx prisma db push
```

### 2. Port 3000 Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
npm run dev -- -p 3001  # Use different port
```

### 3. Dependencies Installation Issues

**Problem**: npm install fails

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 4. Prisma Client Issues

**Problem**: "Can't find Prisma Client"

**Solution**:
```bash
npx prisma generate
npm install
```

## Performance Tips

1. **Clear Browser Cache**: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
2. **Restart Dev Server**: Stop and restart `npm run dev`
3. **Check Browser Console**: Open DevTools (F12) for errors
4. **Check Terminal Output**: Look for error messages in the terminal

## Debug Mode

Enable Prisma debug logging:

```bash
# On Windows PowerShell
$env:DEBUG='*' && npm run dev

# On Mac/Linux
DEBUG='*' npm run dev
```

View database with Prisma Studio:
```bash
npx prisma studio
```

## File Structure Issues

Make sure you have these directories:
- `app/` - Next.js pages and layouts
- `components/` - React components  
- `lib/` - Utilities
- `prisma/` - Database schema
- `public/` - Static files

## Still Having Issues?

1. Check that Node.js version >= 18.17.0:
   ```bash
   node --version
   ```

2. Verify all dependencies installed:
   ```bash
   npm list
   ```

3. Open an issue on GitHub with:
   - Error message
   - Operating system
   - Node.js version
   - Steps to reproduce
