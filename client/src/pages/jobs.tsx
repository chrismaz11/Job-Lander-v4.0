import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Calendar, DollarSign } from 'lucide-react';
import { searchJobs, JobSearchResult } from '@/lib/api';

export default function JobsPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<JobSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await searchJobs(query, location || undefined);
      setJobs(result.jobs);
    } catch (err: any) {
      setError(err.message || 'Failed to search jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Search thousands of job opportunities powered by AI
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Job Search</CardTitle>
              <CardDescription>
                Enter job title, keywords, or company name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Job title or keywords..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Location (optional)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Searching...' : 'Search Jobs'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Job Results */}
          {jobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Found {jobs.length} Jobs
              </h2>
              
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-blue-600">
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{job.job_type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(job.posted_date).toLocaleDateString()}
                        </div>
                        {job.salary_min && job.salary_max && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300">
                        {job.description}
                      </p>
                      
                      <div className="flex justify-end">
                        <Button asChild>
                          <a 
                            href={job.apply_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Apply Now
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && jobs.length === 0 && query && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No jobs found for "{query}". Try different keywords or location.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
