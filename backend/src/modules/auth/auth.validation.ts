export const validateSignup = (data: any) => {
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Name is required and must be a string');
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new Error('Valid email is required');
  }
  if (!data.password || data.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  if (!data.location) {
    throw new Error('Location is required');
  }
};

export const validateLogin = (data: any) => {
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }
};
