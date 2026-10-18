/**
 * Analytics tracking utility
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private enabled = true;

  trackEvent(name: string, properties?: Record<string, any>): void {
    if (!this.enabled) return;

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(event);
    this.sendEvent(event);
  }

  trackPageView(pageName: string, properties?: Record<string, any>): void {
    this.trackEvent('page_view', { page: pageName, ...properties });
  }

  trackAction(action: string, target: string, properties?: Record<string, any>): void {
    this.trackEvent('user_action', { action, target, ...properties });
  }

  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent('conversion', { type: conversionType, value });
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  private sendEvent(event: AnalyticsEvent): void {
    // Send to analytics service (e.g., Mixpanel, Google Analytics, etc.)
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
      // Implementation here
    }
  }

  disable(): void {
    this.enabled = false;
  }

  enable(): void {
    this.enabled = true;
  }
}

export const analytics = new Analytics();
