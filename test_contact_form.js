/**
 * Test script for Contact Form validation
 * This script tests the Zod validation schema and API endpoint
 */

const { contactFormSchema, validateContactForm } = require('./src/lib/validations/contact.js');

console.log('🧪 Testing Contact Form Validation...\n');

// Test cases for validation
const testCases = [
  {
    name: 'Valid contact form data',
    data: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      message: 'Hello, I would like to discuss your services.'
    },
    shouldPass: true
  },
  {
    name: 'Invalid email format',
    data: {
      name: 'Jane Smith',
      email: 'invalid-email',
      message: 'This should fail validation.'
    },
    shouldPass: false
  },
  {
    name: 'Name too short',
    data: {
      name: 'J',
      email: 'jane@company.com',
      message: 'This should fail validation.'
    },
    shouldPass: false
  },
  {
    name: 'Message too short',
    data: {
      name: 'Bob Johnson',
      email: 'bob@company.com',
      message: 'Hi'
    },
    shouldPass: false
  },
  {
    name: 'Empty required fields',
    data: {
      name: '',
      email: '',
      message: ''
    },
    shouldPass: false
  },
  {
    name: 'Name with invalid characters',
    data: {
      name: 'John123@#$',
      email: 'john@company.com',
      message: 'This should fail validation.'
    },
    shouldPass: false
  },
  {
    name: 'Message with invalid characters',
    data: {
      name: 'John Doe',
      email: 'john@company.com',
      message: 'Hello<script>alert("xss")</script>'
    },
    shouldPass: false
  }
];

// Run validation tests
let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  
  try {
    const result = validateContactForm(testCase.data);
    
    if (testCase.shouldPass && result.success) {
      console.log('✅ PASS - Validation succeeded as expected');
      passedTests++;
    } else if (!testCase.shouldPass && !result.success) {
      console.log('✅ PASS - Validation failed as expected');
      console.log('   Errors:', Object.keys(result.errors).join(', '));
      passedTests++;
    } else {
      console.log('❌ FAIL - Unexpected validation result');
      console.log('   Expected to pass:', testCase.shouldPass);
      console.log('   Actually passed:', result.success);
      if (result.errors) {
        console.log('   Errors:', result.errors);
      }
    }
  } catch (error) {
    console.log('❌ FAIL - Validation threw an error:', error.message);
  }
  
  console.log(''); // Empty line for readability
});

// Test API endpoint (if running in Node.js environment)
async function testAPIEndpoint() {
  console.log('🌐 Testing API Endpoint...\n');
  
  try {
    // Test valid data
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message for the contact form.'
    };
    
    console.log('Testing with valid data...');
    const response = await fetch('http://localhost:3000/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validData)
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ API endpoint working correctly');
      console.log('   Response:', result.message);
    } else {
      console.log('❌ API endpoint returned error');
      console.log('   Status:', response.status);
      console.log('   Response:', result);
    }
  } catch (error) {
    console.log('⚠️  Could not test API endpoint (server may not be running)');
    console.log('   Error:', error.message);
  }
}

// Summary
console.log('📊 Test Summary:');
console.log(`   Passed: ${passedTests}/${totalTests}`);
console.log(`   Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('\n🎉 All validation tests passed!');
} else {
  console.log('\n⚠️  Some tests failed. Please check the validation logic.');
}

// Test API if possible
if (typeof fetch !== 'undefined') {
  testAPIEndpoint();
} else {
  console.log('\n💡 To test the API endpoint, run: npm run dev');
  console.log('   Then run this script again to test the full integration.');
}

