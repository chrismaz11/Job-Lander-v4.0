interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupAutoFlush();
    this.trackPageView();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  track(eventName: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: this.sanitizeProperties(properties),
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.events.push(event);

    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  // Common tracking methods
  trackPageView(page?: string): void {
    this.track('page_view', {
      page: page || window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });
  }

  trackResumeAction(action: string, templateId?: string): void {
    this.track('resume_action', {
      action,
      templateId,
      timestamp: Date.now()
    });
  }

  trackJobSearch(query: string, resultsCount: number): void {
    this.track('job_search', {
      query: this.hashString(query), // Hash for privacy
      resultsCount,
      timestamp: Date.now()
    });
  }

  trackError(error: string, context?: string): void {
    this.track('error', {
      error: this.hashString(error),
      context,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });
  }

  trackPerformance(metric: string, value: number): void {
    this.track('performance', {
      metric,
      value,
      timestamp: Date.now()
    });
  }

  private sanitizeProperties(properties?: Record<string, any>): Record<string, any> | undefined {
    if (!properties) return undefined;

    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(properties)) {
      // Remove PII
      if (this.isPII(key)) {
        sanitized[key] = this.hashString(String(value));
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private isPII(key: string): boolean {
    const piiKeys = ['email', 'phone', 'name', 'address', 'ssn', 'password'];
    return piiKeys.some(piiKey => key.toLowerCase().includes(piiKey));
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private setupAutoFlush(): void {
    setInterval(() => {
      if (this.events.length > 0) {
        this.flush();
      }
    }, this.flushInterval);

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: eventsToSend }),
        keepalive: true
      });
    } catch (error) {
      // Re-queue events on failure
      this.events.unshift(...eventsToSend);
      console.warn('Failed to send analytics events:', error);
    }
  }

  // Get analytics summary for user dashboard
  getSessionSummary(): {
    sessionDuration: number;
    pageViews: number;
    resumeActions: number;
    jobSearches: number;
  } {
    const sessionEvents = this.events.filter(e => e.sessionId === this.sessionId);
    const sessionStart = Math.min(...sessionEvents.map(e => e.timestamp));
    
    return {
      sessionDuration: Date.now() - sessionStart,
      pageViews: sessionEvents.filter(e => e.name === 'page_view').length,
      resumeActions: sessionEvents.filter(e => e.name === 'resume_action').length,
      jobSearches: sessionEvents.filter(e => e.name === 'job_search').length
    };
  }
}

export const analytics = new AnalyticsService();
