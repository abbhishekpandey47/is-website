// Quick verification test for the renamed /api/support endpoint
const fetch = require('node-fetch');

async function verifySupportAPI() {
  console.log('🔍 Verifying /api/support endpoint...\n');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message for the support API.'
  };
  
  try {
    console.log('1. Testing basic functionality...');
    const response = await fetch('http://localhost:3001/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      console.log('   ✅ Basic functionality working');
      const result = await response.json();
      console.log(`   Response: ${result.message}`);
    } else {
      console.log('   ❌ Basic functionality failed');
      const error = await response.text();
      console.log(`   Error: ${error.substring(0, 100)}...`);
    }
    
    console.log('\n2. Testing rate limiting (5 requests per minute)...');
    let rateLimitHit = false;
    
    for (let i = 1; i <= 7; i++) {
      const rateResponse = await fetch('http://localhost:3001/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testData,
          message: `Rate limit test ${i}`
        })
      });
      
      if (rateResponse.status === 429) {
        console.log(`   ✅ Rate limiting working - got 429 on request ${i}`);
        const retryAfter = rateResponse.headers.get('retry-after');
        if (retryAfter) {
          console.log(`   Retry-After: ${retryAfter} seconds`);
        }
        rateLimitHit = true;
        break;
      } else if (rateResponse.status === 200) {
        console.log(`   Request ${i}: OK`);
      } else {
        console.log(`   Request ${i}: Status ${rateResponse.status}`);
      }
    }
    
    if (!rateLimitHit) {
      console.log('   ⚠️  Rate limiting may not be working properly');
    }
    
    console.log('\n3. Testing 2000 character message...');
    const longMessageData = {
      ...testData,
      message: 'A'.repeat(2000)
    };
    
    const longResponse = await fetch('http://localhost:3001/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(longMessageData)
    });
    
    console.log(`   Status: ${longResponse.status}`);
    
    if (longResponse.status === 200) {
      console.log('   ✅ 2000 character message accepted');
    } else if (longResponse.status === 400) {
      console.log('   ❌ 2000 character message rejected (unexpected)');
    } else {
      console.log('   ⚠️  Unexpected status for long message');
    }
    
    console.log('\n🎉 Verification complete!');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.log('\nMake sure the server is running on port 3001:');
    console.log('npm run dev');
  }
}

verifySupportAPI();

