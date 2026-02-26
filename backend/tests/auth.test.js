const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

// Test database connection
beforeAll(async () => {
  const testDbUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/skillhood-test';
  await mongoose.connect(testDbUri);
});

// Clean up after tests
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

// Clear users before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe('Auth API Tests', () => {
  
  // ========================================
  // REGISTER TESTS
  // ========================================
  
  describe('POST /api/auth/register', () => {
    
    it('should register a new user with valid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
          city: 'Boston'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.email).toBe('test@example.com');
    });
    
    it('should fail with duplicate email', async () => {
      // Create first user
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'User One',
          email: 'duplicate@example.com',
          password: 'Password123',
          city: 'Boston'
        });
      
      // Try to create second user with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'User Two',
          email: 'duplicate@example.com',
          password: 'Password456',
          city: 'Boston'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User already exists');
    });
    
    it('should fail with invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'Password123',
          city: 'Boston'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should fail with weak password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'weak',
          city: 'Boston'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ========================================
  // LOGIN TESTS
  // ========================================
  
  describe('POST /api/auth/login', () => {
    
    beforeEach(async () => {
      // Create test user before each login test
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login Test User',
          email: 'login@example.com',
          password: 'Password123',
          city: 'Boston'
        });
    });
    
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.email).toBe('login@example.com');
    });
    
    it('should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });
    
    it('should fail with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword123'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });
    
    it('should fail with empty email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: '',
          password: 'Password123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should fail with empty password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: ''
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ========================================
  // PROTECTED ROUTE TESTS
  // ========================================
  
  describe('Protected Routes', () => {
    
    let token;
    
    beforeEach(async () => {
      // Register and login to get token
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Protected Test User',
          email: 'protected@example.com',
          password: 'Password123',
          city: 'Boston'
        });
      
      token = res.body.data.token;
    });
    
    it('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
    
    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/users/profile');
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
    
    it('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token');
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
