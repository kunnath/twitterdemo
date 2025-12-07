# Testing Guide - User Registration & MongoDB Verification

## ✅ Fixed Issues
1. **Provider enum error** - Changed from `'email'` to `'credentials'` in registration
2. **Next.js image configuration** - Added allowed image hostnames
3. **NextAuth v5 compatibility** - Updated authentication flow

## 🧪 Testing User Registration with Credentials

### Step 1: Open the Application
The application is now running at: **http://localhost:3000**

### Step 2: Sign Up with Credentials

1. Click on the **"Sign In"** button (or sign-in modal if it opens automatically)
2. Click on **"Don't have an account? Sign up"** at the bottom
3. Fill in the registration form:
   - **Full Name**: Test User
   - **Email**: test@example.com
   - **Password**: test123 (minimum 6 characters)
4. Click **"Create Account"**

### Step 3: Verify Successful Registration

After successful registration, you should:
- Be automatically signed in
- See your profile information in the interface
- Your avatar will be generated from ui-avatars.com

### Step 4: Check MongoDB

Go to your MongoDB Atlas dashboard:
**https://cloud.mongodb.com/v2/69122c58483bab4a552063ef#/explorer/6912eefc57c4356353ef2238/twitter/users/find**

You should see a new user document with:
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "username": "test",
  "password": "$2a$10...",  // Hashed password
  "image": "https://ui-avatars.com/api/?name=Test%20User&background=1d9bf0&color=fff",
  "provider": "credentials",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## 🔐 Testing Google Authentication

### Step 1: Click Google Sign-In
1. Open the application at http://localhost:3000
2. Click **"Sign In"** button
3. Click **"Continue with Google"**
4. You'll be redirected to Google's OAuth consent screen
5. Select your Google account
6. Grant permissions

### Step 2: Verify in MongoDB
After Google sign-in, check MongoDB again. You should see a user with:
```json
{
  "_id": "...",
  "name": "Your Google Name",
  "email": "youremail@gmail.com",
  "username": "youremail",
  "image": "https://lh3.googleusercontent.com/...",  // Google profile image
  "provider": "google",
  "createdAt": "...",
  "updatedAt": "..."
}
```

## 🔍 MongoDB Connection Details

- **Connection String**: mongodb+srv://maya:u9SewPVXlY9YkuYB@cluster0.ezfn1xa.mongodb.net/twitter
- **Database**: twitter
- **Collection**: users

## ✅ What to Look For

### Credentials User
- ✓ `provider`: "credentials"
- ✓ `password`: Hashed with bcrypt (starts with $2a$ or $2b$)
- ✓ `username`: Generated from email (before @ symbol)
- ✓ `image`: UI Avatars URL

### Google OAuth User
- ✓ `provider`: "google"
- ✓ `password`: null or undefined (not needed for OAuth)
- ✓ `username`: Generated from email
- ✓ `image`: Google profile picture URL (lh3.googleusercontent.com)

## 🛠️ Troubleshooting

### Registration Fails
- Check the browser console for errors
- Check the terminal for server errors
- Verify MongoDB connection string is correct

### Can't See Users in MongoDB
1. Make sure you're in the correct project
2. Select the "twitter" database
3. Select the "users" collection
4. Click "Find" to refresh the view

### Google Sign-In Fails
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Make sure AUTH_SECRET is configured
- Check that http://localhost:3000 is added to Google Console authorized redirect URIs

## 📊 Current Environment Variables

```env
DATABASE_URL=mongodb+srv://maya:u9SewPVXlY9YkuYB@cluster0.ezfn1xa.mongodb.net/twitter?appName=Cluster0
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=LhgGVyvc+OXbh51o1FmEFFa49z04D7a9z8cZ00bPyc8=
GOOGLE_CLIENT_ID=<REDACTED_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<REDACTED_GOOGLE_CLIENT_SECRET>
AUTH_SECRET=LhgGVyvc+OXbh51o1FmEFFa49z04D7a9z8cZ00bPyc8=
```

## 🎉 Success Indicators

✅ Server running without errors
✅ MongoDB connected (check terminal output)
✅ User registration API returns 201 status
✅ User automatically signed in after registration
✅ User document appears in MongoDB Atlas
✅ Google OAuth sign-in works
✅ Session persists across page refreshes

---

**Ready to Test!** 🚀

Open http://localhost:3000 and try signing up with a new account!
