// test-webhook.js
fetch('http://localhost:3000/api/submit-candidate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    formType: 'Candidate',
    firstName: 'Test',
    surname: 'Candidate',
    idNumber: '9001015000084',
    emailAddress: 'test@example.com',
    phoneNumber: '0821234567',
    province: 'Gauteng',
    highestQualification: 'NQF 7',
    gender: 'Male',
    fieldOfStudy: 'IT',
    specialisedField: 'Software Dev',
    popiaConsent: 'Yes',
    // We send an empty files object to isolate if the issue is text vs files
    files: {} 
  }),
})
  .then((res) => res.json())
  .then((data) => console.log('Response:', data))
  .catch((err) => console.error('Error:', err));