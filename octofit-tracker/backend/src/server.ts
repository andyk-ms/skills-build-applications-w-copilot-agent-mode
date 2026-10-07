import cors from 'cors';
import express from 'express';

import './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

// Handle CODESPACE NAME, set the base URL accordingly
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ date: -1 }).lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ rank: 1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, name: 1 }).lean());
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});

export default app;