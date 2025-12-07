// Script to check all users in MongoDB
const mongoose = require('mongoose');

// MongoDB connection string from your .env
const DATABASE_URL = 'mongodb+srv://maya:u9SewPVXlY9YkuYB@cluster0.ezfn1xa.mongodb.net/twitter?appName=Cluster0';

// User Schema (simplified)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  image: String,
  provider: String,
  emailVerified: Date,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function checkUsers() {
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    await mongoose.connect(DATABASE_URL);
    console.log('✅ Connected to MongoDB!\n');
    
    // Get all users
    const users = await User.find({}).sort({ createdAt: -1 });
    
    console.log(`📊 Total Users Found: ${users.length}\n`);
    console.log('=' .repeat(80));
    
    if (users.length === 0) {
      console.log('❌ No users found in the database yet.');
      console.log('👉 Try signing up at http://localhost:3000\n');
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 USER #${index + 1}`);
        console.log('─'.repeat(80));
        console.log(`📧 Email:       ${user.email}`);
        console.log(`👤 Name:        ${user.name}`);
        console.log(`🔖 Username:    ${user.username}`);
        console.log(`🔐 Provider:    ${user.provider}`);
        console.log(`🖼️  Image:       ${user.image || 'N/A'}`);
        console.log(`🔑 Has Password: ${user.password ? 'Yes (Hashed)' : 'No (OAuth)'}`);
        console.log(`📅 Created:     ${user.createdAt}`);
        console.log(`🆔 User ID:     ${user._id}`);
        
        if (user.password) {
          console.log(`🔒 Password Hash: ${user.password.substring(0, 30)}...`);
        }
        console.log('─'.repeat(80));
      });
      
      console.log('\n✅ Query completed successfully!\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  }
}

// Run the script
checkUsers();
