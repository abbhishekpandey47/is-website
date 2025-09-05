// Test script to verify API rate limiting and validation
const fetch = require('node-fetch');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'A'.repeat(2000) // Exactly 2000 characters
};

async function testAPI() {
  console.log('Testing API with 2000 character message...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response:', text.substring(0, 300) + '...');
    
    if (response.status === 200) {
      console.log('✅ API accepted 2000 character message');
    } else if (response.status === 400) {
      console.log('❌ API rejected 2000 character message (unexpected)');
    } else {
      console.log('⚠️  Unexpected status code:', response.status);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Test rate limiting
async function testRateLimit() {
  console.log('\nTesting rate limiting...\n');
  
  for (let i = 1; i <= 7; i++) {
    try {
      const response = await fetch('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          message: `Test message ${i}`
        })
      });
      
      console.log(`Request ${i}: Status ${response.status}`);
      
      if (response.status === 429) {
        console.log('✅ Rate limiting working - got 429 after', i, 'requests');
        const retryAfter = response.headers.get('retry-after');
        if (retryAfter) {
          console.log('Retry-After header:', retryAfter, 'seconds');
        }
        break;
      }
      
    } catch (error) {
      console.error(`Request ${i} error:`, error.message);
    }
  }
}

// Run tests
async function runTests() {
  await testAPI();
  await testRateLimit();
}

runTests().catch(console.error);
