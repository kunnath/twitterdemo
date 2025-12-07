// Test Google OAuth Sign-In
// This script will open the Google sign-in page

console.log('🚀 Google OAuth Test\n');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📋 Current Configuration:');
console.log('  ✅ GOOGLE_CLIENT_ID: 476787265410-78tmiariuks4jg0k8dc0r4s1uff6o865');
console.log('  ✅ NEXTAUTH_URL: http://localhost:3000');
console.log('  ✅ Callback URL: http://localhost:3000/api/auth/callback/google\n');

console.log('═══════════════════════════════════════════════════════════════\n');

console.log('🔧 IMPORTANT: Before Testing, Verify in Google Cloud Console:\n');
console.log('  1. Go to: https://console.cloud.google.com/apis/credentials');
console.log('  2. Click on your OAuth 2.0 Client ID');
console.log('  3. Add these Authorized redirect URIs:');
console.log('     → http://localhost:3000/api/auth/callback/google');
console.log('     → http://127.0.0.1:3000/api/auth/callback/google\n');
console.log('  4. Add these Authorized JavaScript origins:');
console.log('     → http://localhost:3000');
console.log('     → http://127.0.0.1:3000\n');
console.log('  5. Click SAVE and wait 5-10 minutes\n');

console.log('═══════════════════════════════════════════════════════════════\n');

console.log('🧪 To Test Google Sign-In:\n');
console.log('  Option 1: Open your app and click "Continue with Google"');
console.log('            → http://localhost:3000\n');
console.log('  Option 2: Direct Google sign-in link:');
console.log('            → http://localhost:3000/api/auth/signin/google\n');

console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📊 After signing in, verify the user was saved:\n');
console.log('  Run: node scripts/check-users.js\n');

console.log('═══════════════════════════════════════════════════════════════\n');

console.log('✅ Make sure your dev server is running:');
console.log('  npm run dev\n');

console.log('🎉 Ready to test Google Sign-In!\n');
