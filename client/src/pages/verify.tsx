import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Upload, CheckCircle2, ExternalLink, Copy, Loader2, AlertCircle } from "lucide-react";

export default function Verify() {
  const [verificationFile, setVerificationFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { toast } = useToast();

  const verifyMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiRequest("POST", "/api/verify-resume", formData);
    },
    onSuccess: (data) => {
      setVerificationResult(data);
      toast({
        title: "Verification Complete",
        description: data.verified ? "Resume verified successfully!" : "Resume not found on blockchain.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Failed to verify resume. Please try again.",
      });
    },
  });

  const createVerificationMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiRequest("POST", "/api/verify-on-chain", formData);
    },
    onSuccess: (data) => {
      setVerificationResult(data);
      toast({
        title: "Blockchain Verification Created",
        description: "Your resume has been verified on the blockchain!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Failed to create blockchain verification.",
      });
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationFile(file);
      setVerificationResult(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Verify Resume</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verify resume authenticity using blockchain technology
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Upload Resume for Verification</h2>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover-elevate transition-all">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="verify-upload"
                  data-testid="input-verify-upload"
                />
                <label htmlFor="verify-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    {verificationFile ? verificationFile.name : "Click to upload your resume"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF only (max 10MB)
                  </p>
                </label>
              </div>

              {verificationFile && (
                <div className="flex gap-4">
                  <Button
                    onClick={() => verifyMutation.mutate(verificationFile)}
                    disabled={verifyMutation.isPending}
                    className="flex-1"
                    data-testid="button-verify-existing"
                  >
                    {verifyMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Verify Existing
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => createVerificationMutation.mutate(verificationFile)}
                    disabled={createVerificationMutation.isPending}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-create-verification"
                  >
                    {createVerificationMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Create New Verification
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <Card className={`p-8 ${verificationResult.verified ? 'bg-chart-3/10 border-chart-3/20' : 'bg-chart-5/10 border-chart-5/20'}`}>
              <div className="flex items-start gap-4 mb-6">
                {verificationResult.verified ? (
                  <CheckCircle2 className="h-8 w-8 text-chart-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-chart-5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {verificationResult.verified ? "Verification Successful" : "Not Verified"}
                  </h3>
                  <p className="text-muted-foreground">
                    {verificationResult.verified
                      ? "This resume has been verified on the blockchain"
                      : "This resume has not been verified on the blockchain"}
                  </p>
                </div>
              </div>

              {verificationResult.verified && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Transaction Hash</Label>
                    <div className="flex gap-2">
                      <Input
                        value={verificationResult.hash || verificationResult.transactionHash}
                        readOnly
                        className="font-mono text-sm"
                        data-testid="input-transaction-hash"
                      />
                      <Button
                        onClick={() => copyToClipboard(verificationResult.hash || verificationResult.transactionHash)}
                        variant="outline"
                        size="icon"
                        data-testid="button-copy-hash"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {verificationResult.timestamp && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Verified At</Label>
                      <Input
                        value={new Date(verificationResult.timestamp).toLocaleString()}
                        readOnly
                        data-testid="input-timestamp"
                      />
                    </div>
                  )}

                  {verificationResult.network && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Network</Label>
                      <Badge variant="outline" data-testid="badge-network">
                        {verificationResult.network}
                      </Badge>
                    </div>
                  )}

                  {verificationResult.explorerUrl && (
                    <Button
                      onClick={() => window.open(verificationResult.explorerUrl, '_blank')}
                      variant="outline"
                      className="w-full"
                      data-testid="button-view-explorer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Block Explorer
                    </Button>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* Info Section */}
          <Card className="p-8 bg-muted/50">
            <h3 className="text-xl font-bold mb-4">How Blockchain Verification Works</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">1. Hash Generation:</strong> Your resume is converted into a unique cryptographic hash
              </p>
              <p>
                <strong className="text-foreground">2. Blockchain Storage:</strong> The hash is stored on Polygon Mumbai testnet
              </p>
              <p>
                <strong className="text-foreground">3. Verification:</strong> Anyone can verify the resume's authenticity by checking the hash on the blockchain
              </p>
              <p>
                <strong className="text-foreground">4. Tamper-Proof:</strong> Any modification to the resume will result in a different hash, making fraud easily detectable
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
