import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

/**
 * Hook for analytics tracking
 */
export function useAnalytics(pageName: string) {
  useEffect(() => {
    analytics.trackPageView(pageName);
  }, [pageName]);

  const trackAction = (action: string, target: string, properties?: Record<string, any>) => {
    analytics.trackAction(action, target, properties);
  };

  const trackEvent = (name: string, properties?: Record<string, any>) => {
    analytics.trackEvent(name, properties);
  };

  const trackConversion = (type: string, value?: number) => {
    analytics.trackConversion(type, value);
  };

  return { trackAction, trackEvent, trackConversion };
}
