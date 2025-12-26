const bcrypt = require('bcryptjs');

async function createDemoUser() {
  const hashedPassword = await bcrypt.hash('demo123', 10);
  console.log('Hashed password for demo123:', hashedPassword);
}

createDemoUser().catch(console.error);