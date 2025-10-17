import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Zap, CheckCircle2, Lock } from "lucide-react";
import { TierGate } from "@/components/TierGate";

export default function Verify() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Blockchain Verification</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Secure, tamper-proof resume verification on the blockchain
        </p>
      </div>

      <TierGate
        feature="blockchain-verification"
        requiredTier="pro"
        fallback={
          <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-800">Coming Soon</CardTitle>
              <CardDescription className="text-orange-700">
                Blockchain verification is currently in development
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Tamper-Proof</h3>
                  <p className="text-sm text-muted-foreground">
                    Cryptographic hashes ensure resume authenticity
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify credentials in seconds, not days
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Employer Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Build credibility with verified resumes
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-500" />
                  Professional Feature
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Blockchain verification will be available for Professional and Enterprise users when launched.
                </p>
                <Badge variant="secondary" className="mb-4">
                  Professional Plan - $9.95/month
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Unlimited resume verifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Shareable verification links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Employer verification portal</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to be notified when blockchain verification launches?
                </p>
                <Button variant="outline" disabled>
                  <Clock className="w-4 h-4 mr-2" />
                  Notify Me When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        }
      >
        {/* This content won't show since we're using fallback */}
        <div>Blockchain verification content</div>
      </TierGate>
    </div>
  );
}
