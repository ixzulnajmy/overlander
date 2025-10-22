# Mobile Authentication Setup

The app now uses different authentication methods based on device type:

- **Desktop**: Magic Link (email OTP)
- **Mobile/PWA**: Email + Password

## Supabase Configuration Required

To enable password authentication, ensure these settings in your Supabase Dashboard:

### 1. Enable Email/Password Provider

Go to: **Authentication → Providers → Email**

Make sure these are enabled:
- ✅ Enable email provider
- ✅ Confirm email (recommended for production)

### 2. Email Templates (Optional but Recommended)

Go to: **Authentication → Email Templates**

Customize these templates:
- **Confirm signup**: Sent when user creates an account
- **Magic Link**: Sent for desktop magic link login
- **Change Email Address**: Sent when user changes email

### 3. Password Requirements

Default Supabase settings:
- Minimum 6 characters (configurable in Dashboard)

You can adjust in: **Authentication → Policies**

## How It Works

### Mobile Detection

The login page detects mobile devices and PWA installations using:
- User agent detection (Android, iOS, etc.)
- PWA standalone mode detection
- `display-mode: standalone` media query

### Mobile Flow (Email + Password)

1. User opens app on mobile/PWA
2. Sees email + password form
3. Can toggle between "Sign In" and "Sign Up"
4. On sign up: Creates account, sends verification email
5. On sign in: Authenticates immediately, redirects to dashboard

### Desktop Flow (Magic Link)

1. User opens app on desktop
2. Sees email-only form
3. Enters email, receives magic link
4. Clicks link in email, redirects to app

## Testing

### Test Mobile View on Desktop

Open browser DevTools:
1. Press F12 or Cmd+Option+I
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select mobile device (iPhone, Pixel, etc.)
4. Reload page

### Test PWA

1. Deploy to Vercel
2. Open on mobile browser
3. Add to Home Screen
4. Open from home screen icon
5. Should see password login form

## Security Notes

- Passwords are hashed by Supabase (bcrypt)
- Email verification recommended for production
- Consider adding rate limiting for login attempts
- Use strong password requirements in production
