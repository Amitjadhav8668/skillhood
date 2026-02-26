const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Skill = require('../models/Skill');

let token;
let userId;

beforeAll(async () => {
  const testDbUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/skillhood-test';
  await mongoose.connect(testDbUri);
  
  // Create test user and get token
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Skill Test User',
      email: 'skills@example.com',
      password: 'Password123',
      city: 'Boston'
    });
  
  token = res.body.data.token;
  userId = res.body.data._id;
});

afterAll(async () => {
  await User.deleteMany({});
  await Skill.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Skill.deleteMany({});
});

describe('Skills API Tests', () => {
  
  describe('POST /api/skills', () => {
    
    it('should create a new skill', async () => {
      const res = await request(app)
        .post('/api/skills')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Web Development',
          description: 'HTML, CSS, JavaScript',
          level: 'Advanced',
          type: 'offer'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Web Development');
    });
    
    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/skills')
        .send({
          name: 'Web Development',
          type: 'offer'
        });
      
      expect(res.statusCode).toBe(401);
    });
    
    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/skills')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'Missing name and type'
        });
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('GET /api/skills/my', () => {
    
    beforeEach(async () => {
      // Create test skills
      await Skill.create([
        { userId, name: 'JavaScript', type: 'offer', level: 'Advanced' },
        { userId, name: 'Python', type: 'want', level: 'Beginner' }
      ]);
    });
    
    it('should get user skills', async () => {
      const res = await request(app)
        .get('/api/skills/my')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.offer).toHaveLength(1);
      expect(res.body.data.want).toHaveLength(1);
    });
    
    it('should return empty arrays when no skills', async () => {
      await Skill.deleteMany({});
      
      const res = await request(app)
        .get('/api/skills/my')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.offer).toHaveLength(0);
      expect(res.body.data.want).toHaveLength(0);
    });
  });
  
  describe('DELETE /api/skills/:id', () => {
    
    let skillId;
    
    beforeEach(async () => {
      const skill = await Skill.create({
        userId,
        name: 'Test Skill',
        type: 'offer',
        level: 'Beginner'
      });
      skillId = skill._id;
    });
    
    it('should delete own skill', async () => {
      const res = await request(app)
        .delete(`/api/skills/${skillId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      const skill = await Skill.findById(skillId);
      expect(skill).toBeNull();
    });
    
    it('should fail to delete non-existent skill', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .delete(`/api/skills/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(404);
    });
  });
});
