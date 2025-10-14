import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Globe, 
  Users,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award,
  Rocket,
  Target
} from 'lucide-react';
import { PRICING_TIERS, COMPETITIVE_ADVANTAGES, formatPrice } from '@shared/pricing';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (tier: typeof PRICING_TIERS[0]) => {
    if (tier.price === 0) return 'Free';
    return billingCycle === 'monthly' 
      ? formatPrice(tier.price)
      : formatPrice(Math.floor(tier.yearlyPrice / 12));
  };

  const getSavings = (tier: typeof PRICING_TIERS[0]) => {
    if (tier.price === 0) return null;
    const monthlyYearly = tier.price * 12;
    const savings = monthlyYearly - tier.yearlyPrice;
    return billingCycle === 'yearly' ? formatPrice(savings) : null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="nav-clean">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            Job-Lander
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="nav-link">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding text-center">
        <div className="container-max">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              50% Less Than Resume.io
            </Badge>
          </div>
          
          <h1 className="heading-5xl mb-4">
            Professional Resume Building
            <span className="block text-accent">That Actually Works</span>
          </h1>
          
          <p className="body-lg max-w-3xl mx-auto mb-8">
            Get all the premium features you need at prices that beat Resume.io, CV-Lite, and other competitors. 
            Plus exclusive features like blockchain verification and AI-powered portfolio generation.
          </p>

          {/* Competitive Comparison */}
          <div className="inline-flex items-center gap-6 bg-muted/30 rounded-lg p-6 mb-12">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Resume.io</div>
              <div className="text-xl font-bold line-through text-red-500">$5.95/mo</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Job-Lander</div>
              <div className="text-xl font-bold text-green-500">$4.95/mo</div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Save $12/year
            </Badge>
          </div>

          {/* Billing Toggle */}
          <Tabs value={billingCycle} onValueChange={(value: any) => setBillingCycle(value)} className="w-full max-w-md mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="relative">
                Yearly
                <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-3xl mb-4">Why Job-Lander Crushes The Competition</h2>
            <p className="body-lg text-muted-foreground">
              Features you won't find anywhere else
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITIVE_ADVANTAGES.map((advantage) => (
              <Card key={advantage.id} className="card-clean text-center relative">
                <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
                  Exclusive
                </Badge>
                <CardHeader>
                  <div className="text-4xl mb-4">{advantage.name.split(' ')[0]}</div>
                  <CardTitle className="heading-xl">{advantage.name.substring(2)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="body-base">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-3xl mb-4">Choose Your Plan</h2>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade when you need more power. All plans include our exclusive features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier) => (
              <Card 
                key={tier.id} 
                className={`card-clean relative ${tier.popular ? 'ring-2 ring-accent shadow-xl scale-105' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                )}

                {tier.adSupported && (
                  <Badge variant="outline" className="absolute -top-3 left-4 bg-background">
                    Ad-Supported
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mb-4">
                    {tier.id === 'free' && <Sparkles className="w-8 h-8 text-accent mx-auto" />}
                    {tier.id === 'basic' && <Zap className="w-8 h-8 text-accent mx-auto" />}
                    {tier.id === 'pro' && <Crown className="w-8 h-8 text-accent mx-auto" />}
                    {tier.id === 'enterprise' && <Rocket className="w-8 h-8 text-accent mx-auto" />}
                  </div>

                  <CardTitle className="heading-2xl">{tier.name}</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">{getPrice(tier)}</span>
                    {tier.price > 0 && (
                      <span className="text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'month' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  {getSavings(tier) && (
                    <div className="text-sm text-green-600">
                      Save {getSavings(tier)} per year
                    </div>
                  )}

                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-center bg-muted/30 rounded p-3">
                    <div>
                      <div className="font-semibold text-accent">
                        {typeof tier.maxResumes === 'number' ? tier.maxResumes : '∞'}
                      </div>
                      <div className="text-xs text-muted-foreground">Resumes</div>
                    </div>
                    <div>
                      <div className="font-semibold text-accent">
                        {typeof tier.aiGenerations === 'number' ? tier.aiGenerations : '∞'}
                      </div>
                      <div className="text-xs text-muted-foreground">AI Uses</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {tier.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${feature.highlight ? 'text-accent' : 'text-green-500'}`} />
                        <div>
                          <span className={feature.highlight ? 'font-medium text-accent' : ''}>{feature.name}</span>
                          {feature.highlight && <Badge variant="secondary" className="ml-2 text-xs">New</Badge>}
                        </div>
                      </div>
                    ))}
                    {tier.features.length > 6 && (
                      <div className="text-xs text-muted-foreground">
                        +{tier.features.length - 6} more features
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    {tier.id === 'free' ? (
                      <Button className="btn-secondary w-full" size="lg" asChild>
                        <Link href="/create-resume">
                          {tier.cta}
                        </Link>
                      </Button>
                    ) : tier.id === 'enterprise' ? (
                      <Button className="btn-primary w-full" size="lg">
                        {tier.cta}
                      </Button>
                    ) : (
                      <Button className={`w-full ${tier.popular ? 'btn-primary' : 'btn-secondary'}`} size="lg">
                        {tier.cta}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-3xl mb-4">Detailed Feature Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Features</th>
                  {PRICING_TIERS.map(tier => (
                    <th key={tier.id} className="text-center p-4 font-semibold">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Resume Creation</td>
                  <td className="text-center p-4">2 resumes</td>
                  <td className="text-center p-4">10 resumes</td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">AI Enhancements</td>
                  <td className="text-center p-4">5/month</td>
                  <td className="text-center p-4">50/month</td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Blockchain Verification</td>
                  <td className="text-center p-4">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center p-4">3/month</td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Portfolio Generation</td>
                  <td className="text-center p-4">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center p-4">1 website</td>
                  <td className="text-center p-4">5 websites</td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Team Management</td>
                  <td className="text-center p-4">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center p-4">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center p-4">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="text-center p-4">
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                    Full Suite
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Revenue Comparison */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-3xl mb-4">See How Much You Save</h2>
            <p className="body-lg text-muted-foreground">
              Compare our pricing with major competitors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-clean">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Resume.io</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold mb-2">$5.95/month</div>
                <div className="text-sm text-muted-foreground mb-4">Basic features only</div>
                <ul className="text-sm space-y-1">
                  <li>• Basic templates</li>
                  <li>• No blockchain</li>
                  <li>• No portfolio generation</li>
                  <li>• Limited AI features</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-clean ring-2 ring-accent">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Job-Lander Pro</CardTitle>
                <Badge className="bg-accent text-accent-foreground">Best Value</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold mb-2">$4.95/month</div>
                <div className="text-sm text-green-600 mb-4">Save $12/year vs Resume.io</div>
                <ul className="text-sm space-y-1">
                  <li>• All premium templates</li>
                  <li>• Blockchain verification</li>
                  <li>• Portfolio generation</li>
                  <li>• Advanced AI features</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-clean">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>CV-Lite</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold mb-2">$9.99/month</div>
                <div className="text-sm text-muted-foreground mb-4">Premium plan</div>
                <ul className="text-sm space-y-1">
                  <li>• Good templates</li>
                  <li>• No blockchain</li>
                  <li>• No portfolio generation</li>
                  <li>• Basic AI features</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent text-accent-foreground">
        <div className="container-max text-center">
          <h2 className="heading-3xl mb-4">Ready to Land Your Dream Job?</h2>
          <p className="body-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who chose Job-Lander for better resumes, 
            better prices, and exclusive features you won't find anywhere else.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-background text-accent hover:bg-background/90" asChild>
              <Link href="/create-resume">
                Start Free Today
                <Sparkles className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent-foreground/20 hover:bg-accent-foreground/10">
              View Templates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}