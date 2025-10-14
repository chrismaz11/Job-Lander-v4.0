import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { 
  FileText, 
  Briefcase, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Upload,
  Sparkles,
  Globe,
  Star
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Resume Builder
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Build Your Dream Career with
            <span className="block text-primary"> AI-Enhanced Resumes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Create professional resumes, generate compelling cover letters, and verify your credentials on the blockchain. 
            Our AI analyzes your experience and matches you with the perfect opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link href="/create-resume">
                <Upload className="w-5 h-5 mr-2" />
                Create Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
              <Link href="/templates">
                <FileText className="w-5 h-5 mr-2" />
                View Templates
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals at</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <span className="text-2xl font-bold">Google</span>
              <span className="text-2xl font-bold">Microsoft</span>
              <span className="text-2xl font-bold">Apple</span>
              <span className="text-2xl font-bold">Meta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines AI technology, professional templates, 
              and blockchain verification to give you the competitive edge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">AI Resume Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload your existing resume and let our AI extract, enhance, and optimize your content 
                  for maximum impact with hiring managers.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Professional Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from dozens of professionally designed templates powered by Canva. 
                  Each template is ATS-optimized and industry-specific.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Blockchain Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verify your credentials on the Polygon blockchain. Give employers confidence 
                  in your resume's authenticity with cryptographic proof.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Smart Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI analyzes your resume and matches you with relevant job opportunities, 
                  providing compatibility scores and application insights.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Cover Letter Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate personalized cover letters in three distinct tones: Professional, 
                  Concise, and Bold. Each tailored to the specific job and company.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Portfolio Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create a stunning online portfolio from your resume data. Deploy-ready 
                  code for Vercel, Netlify, or any hosting platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get from resume upload to job application in just three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload & Parse</h3>
              <p className="text-muted-foreground">
                Upload your existing resume or create one from scratch. Our AI parses and enhances your content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Customize & Verify</h3>
              <p className="text-muted-foreground">
                Choose a professional template, customize your design, and optionally verify on blockchain.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply & Track</h3>
              <p className="text-muted-foreground">
                Generate cover letters, find matching jobs, and track your applications with AI insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25,000+</div>
              <p className="text-muted-foreground">Resumes Created</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Companies Hiring</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have successfully landed their dream jobs 
              using our AI-powered platform. Start building your future today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/create-resume">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container-max py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="heading-xl mb-4">Job-Lander</h3>
              <p className="body-sm opacity-80">
                AI-powered resume builder with blockchain verification for the modern job seeker.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/create-resume" className="hover:opacity-100">Resume Builder</Link></li>
                <li><Link href="/templates" className="hover:opacity-100">Templates</Link></li>
                <li><Link href="/cover-letter" className="hover:opacity-100">Cover Letters</Link></li>
                <li><Link href="/jobs" className="hover:opacity-100">Job Search</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">About</a></li>
                <li><a href="#" className="hover:opacity-100">Careers</a></li>
                <li><a href="#" className="hover:opacity-100">Contact</a></li>
                <li><a href="#" className="hover:opacity-100">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Help Center</a></li>
                <li><a href="#" className="hover:opacity-100">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-100">Terms of Service</a></li>
                <li><a href="#" className="hover:opacity-100">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 Job-Lander. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}