# Admin Authentication Setup Guide
## Secure Your Admin Dashboard with NextAuth.js

---

## 🔐 **What's Been Set Up**

Your admin dashboard is now protected with authentication! Here's what was added:

1. ✅ **NextAuth.js Integration** - Industry-standard authentication
2. ✅ **Login Page** - Beautiful, branded login interface at `/admin/login`
3. ✅ **Protected Routes** - All `/admin/*` routes require authentication
4. ✅ **Session Management** - Secure JWT-based sessions
5. ✅ **Logout Functionality** - Proper session termination

---

## 🚀 **Quick Setup**

### Step 1: Set Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
# Admin Authentication
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET=your-random-secret-key-here
```

**Important:**
- Use a **strong password** for `ADMIN_PASSWORD`
- Generate a **random secret** for `NEXTAUTH_SECRET` (see below)
- **Never commit** `.env.local` to git (it's already in `.gitignore`)

### Step 2: Generate NextAuth Secret

You can generate a random secret using:

**Option 1: Online Tool**
- Visit: https://generate-secret.vercel.app/32
- Copy the generated secret

**Option 2: Command Line**
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 3: For Production (Netlify/Vercel)

Add these same environment variables in your hosting platform:

**Netlify:**
1. Go to **Site Settings → Environment Variables**
2. Add each variable:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `NEXTAUTH_SECRET`

**Vercel:**
1. Go to **Project Settings → Environment Variables**
2. Add each variable for **Production**, **Preview**, and **Development**

---

## 📍 **How to Access Admin**

### Development
1. Start your dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin`
3. You'll be redirected to: `http://localhost:3000/admin/login`
4. Enter your credentials (from `.env.local`)

### Production
1. Navigate to: `https://your-site.netlify.app/admin`
2. You'll be redirected to: `https://your-site.netlify.app/admin/login`
3. Enter your credentials (from environment variables)

---

## 🔒 **Security Features**

### What's Protected
- ✅ `/admin` - Main dashboard
- ✅ `/admin/products` - Product management
- ✅ `/admin/products/new` - Add products
- ✅ `/admin/artkey-config` - ArtKey configuration
- ✅ All other `/admin/*` routes

### What's Public
- ✅ `/admin/login` - Login page (public)
- ✅ All other routes (home, products, etc.)

### Session Management
- **Session Type:** JWT (JSON Web Token)
- **Storage:** Secure HTTP-only cookies
- **Expiration:** Default NextAuth session duration
- **Auto-redirect:** Unauthenticated users → `/admin/login`

---

## 🎨 **Login Page**

The login page features:
- Beautiful branded design matching your site
- Username and password fields
- Error handling for invalid credentials
- Loading states during authentication
- Link back to main website

**URL:** `/admin/login`

---

## 🚪 **Logout**

Users can logout by:
1. Clicking the **"🚪 Logout"** button in the admin header
2. Session is terminated immediately
3. Redirected to login page

---

## 🔧 **Troubleshooting**

### "Invalid username or password"
- ✅ Check that `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly
- ✅ Make sure there are no extra spaces in environment variables
- ✅ Restart your dev server after changing `.env.local`

### "Redirect loop" or "Can't access admin"
- ✅ Make sure `NEXTAUTH_SECRET` is set
- ✅ Check that middleware is working (check browser console)
- ✅ Clear browser cookies and try again

### "Session expired" errors
- ✅ This is normal - just log in again
- ✅ Sessions expire for security

### Environment variables not working
- ✅ Make sure file is named `.env.local` (not `.env`)
- ✅ Restart dev server after changes
- ✅ In production, verify variables are set in hosting platform

---

## 📝 **Default Credentials (Development Only)**

If you don't set environment variables, defaults are:
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ WARNING:** These defaults are **NOT SECURE** for production! Always set proper credentials.

---

## 🔐 **Best Practices**

1. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Don't reuse passwords

2. **Rotate Secrets Regularly**
   - Change `NEXTAUTH_SECRET` periodically
   - Change `ADMIN_PASSWORD` if compromised

3. **Limit Access**
   - Only share credentials with trusted team members
   - Consider adding IP whitelisting for extra security

4. **Monitor Access**
   - Check server logs for login attempts
   - Set up alerts for failed login attempts (future enhancement)

---

## 🚀 **Next Steps (Optional Enhancements)**

Consider adding:
- [ ] Two-factor authentication (2FA)
- [ ] Password reset functionality
- [ ] Multiple admin users (database-backed)
- [ ] Role-based access control (RBAC)
- [ ] Login attempt rate limiting
- [ ] Email notifications for admin logins

---

## 📚 **Files Created/Modified**

### New Files:
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- `app/admin/login/page.tsx` - Login page
- `middleware.ts` - Route protection middleware
- `app/providers.tsx` - Session provider wrapper

### Modified Files:
- `app/layout.tsx` - Added SessionProvider
- `app/admin/page.tsx` - Added logout functionality and session check

---

## ✅ **Setup Complete!**

Your admin dashboard is now secure. Remember to:
1. ✅ Set environment variables
2. ✅ Use strong passwords
3. ✅ Keep secrets safe
4. ✅ Test login before deploying

**Need help?** Check the troubleshooting section above or review the NextAuth.js documentation: https://next-auth.js.org/

