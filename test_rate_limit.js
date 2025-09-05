// Test script to verify rate limiting middleware
const fetch = require('node-fetch');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message for rate limiting.'
};

async function testRateLimit() {
  console.log('Testing rate limiting middleware...\n');
  console.log('Sending 7 requests to test 5 requests per minute limit...\n');
  
  for (let i = 1; i <= 7; i++) {
    try {
      console.log(`Request ${i}:`);
      
      const response = await fetch('http://localhost:3001/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      console.log(`  Status: ${response.status}`);
      
      // Log rate limit headers
      const rateLimitLimit = response.headers.get('x-ratelimit-limit');
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      const retryAfter = response.headers.get('retry-after');
      
      if (rateLimitLimit) console.log(`  Rate Limit: ${rateLimitLimit}`);
      if (rateLimitRemaining) console.log(`  Remaining: ${rateLimitRemaining}`);
      if (rateLimitReset) console.log(`  Reset: ${new Date(rateLimitReset).toLocaleTimeString()}`);
      if (retryAfter) console.log(`  Retry After: ${retryAfter} seconds`);
      
      if (response.status === 429) {
        console.log('  ✅ Rate limiting working - got 429 status');
        const responseText = await response.text();
        console.log(`  Response: ${responseText}`);
        break;
      } else if (response.status === 200) {
        console.log('  ✅ Request successful');
      } else {
        console.log(`  ⚠️  Unexpected status: ${response.status}`);
        const responseText = await response.text();
        console.log(`  Response: ${responseText.substring(0, 100)}...`);
      }
      
      console.log('');
      
    } catch (error) {
      console.error(`Request ${i} error:`, error.message);
    }
  }
}

// Test with 2000 character message
async function testLongMessage() {
  console.log('\nTesting with 2000 character message...\n');
  
  const longMessageData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'A'.repeat(2000) // Exactly 2000 characters
  };
  
  try {
    const response = await fetch('http://localhost:3001/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(longMessageData)
    });
    
    console.log(`Status: ${response.status}`);
    
    if (response.status === 200) {
      console.log('✅ 2000 character message accepted');
    } else if (response.status === 400) {
      console.log('❌ 2000 character message rejected (unexpected)');
      const responseText = await response.text();
      console.log(`Response: ${responseText}`);
    } else {
      console.log(`⚠️  Unexpected status: ${response.status}`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run tests
async function runTests() {
  await testRateLimit();
  await testLongMessage();
}

runTests().catch(console.error);
