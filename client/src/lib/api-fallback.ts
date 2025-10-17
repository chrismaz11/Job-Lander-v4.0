// Fallback API service for endpoints that don't exist yet
// This provides mock data until the backend is properly connected

export const fallbackApiService = {
  // Health check fallback
  getHealth: async () => {
    return {
      healthy: true,
      status: "healthy" as const,
      configErrors: [],
      metadata: {
        provider: "amplify",
        cacheEnabled: true,
        version: "4.0.0"
      },
      alerts: [],
      timestamp: new Date().toISOString(),
    };
  },

  // LLM health check fallback
  getLLMHealth: async () => {
    return {
      healthy: true,
      status: "healthy" as const,
      configErrors: [],
      metadata: {
        provider: "bedrock",
        cacheEnabled: true,
        version: "4.0.0"
      },
      alerts: [],
      timestamp: new Date().toISOString(),
    };
  },

  // Metrics fallback
  getMetrics: async () => {
    return {
      summary: {
        totalRequests: 1250,
        avgLatency: 850,
        errorRate: 0.02,
        cacheHitRate: 0.75,
        status: "healthy" as const,
        alerts: [],
      },
      aggregated: {},
      byProvider: {
        bedrock: {
          totalRequests: 800,
          avgLatency: 900,
          errorRate: 0.01,
          cacheHitRate: 0.80,
        },
        gemini: {
          totalRequests: 450,
          avgLatency: 750,
          errorRate: 0.03,
          cacheHitRate: 0.65,
        },
      },
      byOperation: {
        parseResume: {
          totalRequests: 500,
          avgLatency: 1200,
          errorRate: 0.01,
          cacheHitRate: 0.60,
        },
        generateCoverLetter: {
          totalRequests: 300,
          avgLatency: 800,
          errorRate: 0.02,
          cacheHitRate: 0.85,
        },
        enhanceResume: {
          totalRequests: 450,
          avgLatency: 950,
          errorRate: 0.03,
          cacheHitRate: 0.70,
        },
      },
      costs: {},
      timestamp: new Date().toISOString(),
    };
  },

  // Cache stats fallback
  getCacheStats: async () => {
    return {
      stats: {
        hits: 3750,
        misses: 1250,
        hitRate: 0.75,
        totalEntries: 150,
        memoryUsage: 64 * 1024 * 1024, // 64MB
        maxMemory: 128 * 1024 * 1024,  // 128MB
      },
      topEntries: [
        {
          key: "resume_parse_hash_abc123",
          hits: 45,
          lastAccess: new Date(Date.now() - 300000).toISOString(),
          ttl: 3600,
        },
        {
          key: "cover_letter_template_xyz789",
          hits: 38,
          lastAccess: new Date(Date.now() - 600000).toISOString(),
          ttl: 7200,
        },
        {
          key: "job_match_score_def456",
          hits: 32,
          lastAccess: new Date(Date.now() - 900000).toISOString(),
          ttl: 1800,
        },
      ],
      totalEntries: 150,
    };
  },
};

// Override query client to use fallback for missing endpoints
export const createFallbackQueryFn = (originalQueryFn: any) => {
  return async ({ queryKey }: { queryKey: any[] }) => {
    const url = queryKey[0] as string;
    
    // Check if this is a missing endpoint and provide fallback
    switch (url) {
      case "/api/health":
        return fallbackApiService.getHealth();
      case "/api/admin/llm/health":
        return fallbackApiService.getLLMHealth();
      case "/api/admin/llm/metrics":
        return fallbackApiService.getMetrics();
      case "/api/admin/llm/cache/stats":
        return fallbackApiService.getCacheStats();
      default:
        // Use original query function for other endpoints
        return originalQueryFn({ queryKey });
    }
  };
};
