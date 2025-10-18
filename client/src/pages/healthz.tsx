import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { checkHealth } from '@/lib/api';

interface HealthStatus {
  status: string;
  environment: string;
  database?: string;
  timestamp: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const result = await checkHealth();
        setHealth(result as HealthStatus);
      } catch (err: any) {
        setError(err.message || 'Health check failed');
      } finally {
        setLoading(false);
      }
    };

    checkSystemHealth();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              System Health
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Job-Lander API Status
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {loading ? (
                  <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
                ) : error ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  getStatusIcon(health?.status || 'unknown')
                )}
                API Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <p className="text-gray-600 dark:text-gray-300">
                  Checking system health...
                </p>
              )}

              {error && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <Badge variant="destructive">Error</Badge>
                  </div>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {health && !error && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Status:</span>
                    {getStatusBadge(health.status)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Environment:</span>
                    <Badge variant="outline">{health.environment}</Badge>
                  </div>
                  
                  {health.database && (
                    <div className="flex items-center justify-between">
                      <span>Database:</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {health.database}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span>Last Check:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(health.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This endpoint monitors the health of Job-Lander's backend services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
