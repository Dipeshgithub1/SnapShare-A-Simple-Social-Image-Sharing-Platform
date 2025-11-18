# Deployment Guide - Authentication Fixes

## Issues Fixed

1. **Registration API Bug**: Fixed status code from 400 to 201 for successful registration
2. **Database Connection**: Fixed promise handling in `connectToDatabase` function
3. **Environment Variables**: Added proper NEXTAUTH_SECRET configuration

## Required Environment Variables

Set these environment variables in your deployment platform:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/snapshare

# NextAuth Configuration (CRITICAL)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-strong-secret-key-here

# ImageKit Configuration (if using)
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=your-imagekit-url-endpoint
```

## Deployment Checklist

### 1. Environment Variables
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Set `NEXTAUTH_SECRET` to a strong random string
- [ ] Set `MONGODB_URI` to your production database
- [ ] Verify all variables are set correctly

### 2. Database
- [ ] Ensure MongoDB is accessible from your deployment platform
- [ ] Check network/firewall settings
- [ ] Verify connection string format

### 3. Build and Deploy
- [ ] Run `npm run build` locally to test
- [ ] Deploy with all environment variables
- [ ] Check deployment logs for errors

### 4. Testing
- [ ] Test registration endpoint: `POST /api/auth/register`
- [ ] Test login functionality
- [ ] Verify session management

## Common Deployment Issues

### Vercel
- Set environment variables in Vercel dashboard
- Ensure `NEXTAUTH_URL` matches your Vercel domain

### Netlify
- Set environment variables in Netlify dashboard
- Configure redirects for SPA routing

### Railway/Render
- Set environment variables in platform settings
- Ensure proper build configuration

## Debugging

If authentication still doesn't work:

1. Check browser console for errors
2. Check server logs for database connection issues
3. Verify environment variables are loaded
4. Test API endpoints directly with Postman/curl

## Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

