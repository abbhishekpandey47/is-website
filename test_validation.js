// Test script to verify our validation logic
const { z } = require('zod');

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .regex(/^[a-zA-Z0-9\s.,!?@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]*$/, 'Message contains invalid characters'),
});

// Test cases
console.log('Testing validation logic...\n');

// Test 1: Valid data
console.log('Test 1: Valid data');
const validData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'This is a valid message with proper length.'
};
try {
  const result = contactFormSchema.parse(validData);
  console.log('✅ Valid data passed:', result);
} catch (error) {
  console.log('❌ Valid data failed:', error.errors);
}

// Test 2: 2000 character message (should pass)
console.log('\nTest 2: 2000 character message');
const longMessage = 'A'.repeat(2000);
const data2000 = {
  name: 'Test User',
  email: 'test@example.com',
  message: longMessage
};
try {
  const result = contactFormSchema.parse(data2000);
  console.log('✅ 2000 character message passed (length:', result.message.length, ')');
} catch (error) {
  console.log('❌ 2000 character message failed:', error.errors);
}

// Test 3: 2001 character message (should fail)
console.log('\nTest 3: 2001 character message');
const tooLongMessage = 'A'.repeat(2001);
const data2001 = {
  name: 'Test User',
  email: 'test@example.com',
  message: tooLongMessage
};
try {
  const result = contactFormSchema.parse(data2001);
  console.log('❌ 2001 character message should have failed but passed');
} catch (error) {
  console.log('✅ 2001 character message correctly failed:', error.errors[0].message);
}

// Test 4: Invalid email
console.log('\nTest 4: Invalid email');
const invalidEmailData = {
  name: 'Test User',
  email: 'not-an-email',
  message: 'This is a valid message.'
};
try {
  const result = contactFormSchema.parse(invalidEmailData);
  console.log('❌ Invalid email should have failed but passed');
} catch (error) {
  console.log('✅ Invalid email correctly failed:', error.errors[0].message);
}

console.log('\nValidation tests completed!');

