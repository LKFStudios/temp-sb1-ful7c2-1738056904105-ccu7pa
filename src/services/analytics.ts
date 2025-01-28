import mixpanel from 'mixpanel-browser';
import { env } from '../config/env';

// Initialize Mixpanel
mixpanel.init('f8072c01edbb5b29415f8cb9615c1bb6', {
  debug: env.IS_DEV,
  track_pageview: true,
  persistence: 'localStorage'
});

export const analytics = {
  identify: (userId: string, traits?: Record<string, any>) => {
    mixpanel.identify(userId);
    if (traits) {
      mixpanel.people.set(traits);
    }
  },

  track: (event: string, properties?: Record<string, any>) => {
    mixpanel.track(event, properties);
  },

  trackScreen: (screenName: string) => {
    mixpanel.track('Screen View', { screen: screenName });
  },

  trackAnalysis: (result: any) => {
    mixpanel.track('Analysis Complete', {
      totalScore: result.scores.total,
      categories: Object.keys(result.scores).length,
      hasImage: !!result.imageUrl
    });
  },

  trackError: (error: Error, context?: string) => {
    mixpanel.track('Error', {
      message: error.message,
      context,
      timestamp: new Date().toISOString()
    });
  },

  reset: () => {
    mixpanel.reset();
  }
};