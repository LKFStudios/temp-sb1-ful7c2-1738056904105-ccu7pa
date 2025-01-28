import { getAnalytics } from 'firebase/analytics';
import { app } from './core';

export const analytics = getAnalytics(app);