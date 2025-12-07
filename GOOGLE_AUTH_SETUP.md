# Google OAuth Setup Guide for Twitter Clone

## ✅ Current Configuration Status

Your `.env` file already has:
- ✅ GOOGLE_CLIENT_ID:<REDACTED_GOOGLE_CLIENT_ID>
- ✅ GOOGLE_CLIENT_SECRET:<REDACTED_GOOGLE_CLIENT_SECRET>
- ✅ AUTH_SECRET: Configured
- ✅ NEXTAUTH_URL: http://localhost:3000

## 🔧 Google Cloud Console Setup (Required)

### Step 1: Verify Authorized Redirect URIs

You need to add these redirect URIs in your Google Cloud Console:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID: `476787265410-78tmiariuks4jg0k8dc0r4s1uff6o865`
3. Click on it to edit
4. In **"Authorized redirect URIs"** section, add:

```
http://localhost:3000/api/auth/callback/google
http://127.0.0.1:3000/api/auth/callback/google
```

### Step 2: Verify Authorized JavaScript Origins

In the same page, under **"Authorized JavaScript origins"**, add:

```
http://localhost:3000
http://127.0.0.1:3000
```

### Step 3: Save Changes

Click **"SAVE"** button at the bottom.

⚠️ **Important**: It may take 5-10 minutes for Google to propagate these changes.

---

## 🧪 Testing Google Sign-In

### Option 1: Via Web Browser

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open: http://localhost:3000

3. Click **"Sign In"** button

4. Click **"Continue with Google"** button

5. You'll be redirected to Google's sign-in page

6. Select your Gmail account

7. Grant permissions when prompted

8. You'll be redirected back to your app and signed in!

### Option 2: Direct Link

Open this URL directly in your browser:
```
http://localhost:3000/api/auth/signin/google
```

---

## 🔍 What Happens When You Sign In with Google

1. **User clicks "Continue with Google"**
   - NextAuth redirects to Google OAuth consent screen

2. **User grants permission**
   - Google sends user data back to: `/api/auth/callback/google`

3. **Your app processes the data** (in `auth.js`):
   - Checks if user exists in MongoDB by email
   - If new user:
     - Creates new user record
     - Generates unique username from email
     - Saves Google profile picture
     - Sets `provider: 'google'`
   - If existing user:
     - Updates session with existing user data

4. **User is signed in**
   - Session is created
   - User is redirected to home page

---

## 📊 After Google Sign-In - Check MongoDB

After signing in with Google, run this command to verify the user was saved:

```bash
node scripts/check-users.js
```

You should see a new user with:
- ✅ `provider: "google"`
- ✅ `email`: Your Gmail address
- ✅ `image`: Google profile picture URL (lh3.googleusercontent.com)
- ✅ `password`: null or undefined (not needed for OAuth)
- ✅ `username`: Generated from your email

---

## 🐛 Troubleshooting

### Issue 1: "Redirect URI Mismatch" Error

**Solution**: 
- Verify the redirect URI in Google Console exactly matches:
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- Wait 5-10 minutes after saving changes
- Try in incognito mode

### Issue 2: "Access Denied" or "Invalid Client"

**Solution**:
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env` are correct
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### Issue 3: Callback Error in Terminal

**Check terminal logs for**:
```
[auth][error] CallbackRouteError
```

**Solution**:
- Check your auth.js configuration
- Verify MongoDB connection is working
- Check that User model has all required fields

### Issue 4: User Not Saved to MongoDB

**Solution**:
- Check terminal for "MongoDB connected" message
- Verify DATABASE_URL is correct
- Check for any Mongoose validation errors in terminal

---

## 🔐 Security Notes

### For Development:
- ✅ Using `http://localhost:3000` is fine for development
- ✅ Test users should use real Gmail accounts

### For Production:
- ⚠️ You'll need to:
  1. Change NEXTAUTH_URL to your production domain (https://yourdomain.com)
  2. Add production redirect URI: `https://yourdomain.com/api/auth/callback/google`
  3. Add production origin: `https://yourdomain.com`
  4. Use environment variables (don't commit secrets to git)
  5. Verify your domain with Google

---

## 📝 Quick Test Checklist

Before testing, verify:

- [ ] Dev server is running (`npm run dev`)
- [ ] MongoDB is connected (check terminal for "MongoDB connected")
- [ ] Google redirect URIs are configured in Google Console
- [ ] No errors in terminal
- [ ] Browser is not blocking third-party cookies

---

## 🚀 Ready to Test!

1. **Start the server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   ```
   http://localhost:3000
   ```

3. **Click "Sign In" → "Continue with Google"**

4. **Select your Gmail account**

5. **Check MongoDB**:
   ```bash
   node scripts/check-users.js
   ```

---

## 📱 Expected Result

After successful Google sign-in, you should see in MongoDB:

```json
{
  "_id": "...",
  "name": "Your Name from Google",
  "email": "youremail@gmail.com",
  "username": "youremail",
  "image": "https://lh3.googleusercontent.com/a/...",
  "provider": "google",
  "createdAt": "2025-12-07T...",
  "updatedAt": "2025-12-07T..."
}
```

**Note**: No password field for Google OAuth users!

---

## 🎯 Next Steps

After successful Google sign-in:
1. User profile appears in navbar
2. User can create tweets
3. User can view their profile
4. Session persists across page refreshes
5. User can sign out and sign back in

---

**Need Help?** Check the terminal logs for detailed error messages!
