# Security Policy

## Reporting Security Issues

⚠️ **Do not** create a public GitHub issue for security vulnerabilities.

Instead, please email: [your-email@example.com]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Best Practices

### For Users
1. Keep dependencies updated
2. Use environment variables for sensitive data
3. Don't commit `.env` files
4. Validate user input
5. Use HTTPS in production

### For Developers
1. Never hardcode secrets
2. Sanitize database inputs (Prisma helps)
3. Validate on both client and server
4. Keep dependencies updated
5. Follow OWASP guidelines

## Supported Versions

| Version | Supported          |
|---------|-----------------|
| 0.1.x   | ✅ Supported   |
| < 0.1   | ❌ Not supported |

## Security Updates

We will release security patches as needed. Subscribe to releases to stay updated.

Thank you for helping keep this project secure! 🔒
