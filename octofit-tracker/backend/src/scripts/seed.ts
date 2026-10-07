import mongoose from 'mongoose';

import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity Vanguards',
        description: 'Runners and cyclists building endurance together.',
      },
      {
        name: 'Strength Syndicate',
        description: 'A community focused on functional strength and mobility.',
      },
    ]);

    const users = await User.insertMany([
      {
        username: 'maya.moves',
        email: 'maya@example.com',
        name: 'Maya Chen',
        age: 29,
        team: teams[0]._id,
      },
      {
        username: 'leo.lifts',
        email: 'leo@example.com',
        name: 'Leo Martinez',
        age: 34,
        team: teams[1]._id,
      },
      {
        username: 'amina.active',
        email: 'amina@example.com',
        name: 'Amina Okafor',
        age: 26,
        team: teams[0]._id,
      },
    ]);

    teams[0].members = [users[0]._id, users[2]._id];
    teams[1].members = [users[1]._id];
    await Promise.all(teams.map((team) => team.save()));

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Outdoor run',
        durationMinutes: 42,
        caloriesBurned: 390,
        date: new Date('2026-10-05T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 460,
        date: new Date('2026-10-05T18:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 68,
        caloriesBurned: 610,
        date: new Date('2026-10-06T06:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[2]._id, totalPoints: 1480, rank: 1 },
      { user: users[0]._id, totalPoints: 1325, rank: 2 },
      { user: users[1]._id, totalPoints: 1190, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: '5K Pace Builder',
        description: 'Intervals designed to improve sustainable running speed.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['10-minute warmup', '6 x 400m intervals', '10-minute cooldown'],
      },
      {
        name: 'Full Body Foundations',
        description: 'A balanced introduction to functional strength training.',
        difficulty: 'beginner',
        durationMinutes: 35,
        exercises: ['Goblet squats', 'Incline push-ups', 'Dumbbell rows', 'Dead bugs'],
      },
      {
        name: 'Power Circuit',
        description: 'High-intensity strength and conditioning circuit.',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['Kettlebell swings', 'Box jumps', 'Push press', 'Burpees'],
      },
    ]);

    console.log('Seed the octofit_db database with test data: complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

void seedDatabase();
