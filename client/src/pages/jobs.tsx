import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, DollarSign, Briefcase, ExternalLink, Loader2, Sparkles } from "lucide-react";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/find-jobs", { query: searchTerm, location }],
    enabled: !!searchTerm,
  });

  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  const displayJobs = jobs?.data || [];

  const getMatchColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return "text-chart-3";
    if (numScore >= 80) return "text-chart-4";
    return "text-chart-2";
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse thousands of job opportunities with AI-powered matching
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Job title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                data-testid="input-job-search"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                data-testid="input-location"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!searchQuery}
              className="md:w-auto"
              data-testid="button-search-jobs"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* Job Listings */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : displayJobs.length > 0 ? (
          <div className="space-y-6">
            {displayJobs.map((job: any, index: number) => (
              <Card
                key={job.id || index}
                className="p-6 hover-elevate transition-all"
                data-testid={`card-job-${index}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1" data-testid={`text-job-title-${index}`}>
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-company-${index}`}>
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span data-testid={`text-location-${index}`}>{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span data-testid={`text-salary-${index}`}>{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span data-testid={`text-posted-${index}`}>{job.postedDate}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-description-${index}`}>
                      {job.description}
                    </p>

                    <div className="flex items-center gap-3">
                      {job.aiMatchScore && (
                        <Badge variant="outline" className={`gap-2 ${getMatchColor(job.aiMatchScore)}`} data-testid={`badge-match-${index}`}>
                          <Sparkles className="h-3 w-3" />
                          {job.aiMatchScore}% Match
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button
                      onClick={() => window.open(job.jobUrl, '_blank')}
                      className="flex-1 md:flex-none"
                      data-testid={`button-apply-${index}`}
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 md:flex-none"
                      data-testid={`button-save-${index}`}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-bold mb-2">
              {searchTerm ? "No jobs found" : "Start your job search"}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Enter a job title or keyword to find opportunities"}
            </p>
          </Card>
        )}

        {/* AI Suggestions */}
        {!searchTerm && (
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">AI-Powered Job Matching</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your resume and skills to find the best job matches. Upload your resume to get personalized recommendations.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
