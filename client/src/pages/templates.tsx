import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Crown, CheckCircle, Eye, Download, Sparkles } from "lucide-react";
import { templates, type Template } from "@/data/templates";
import { useAuth } from "@/hooks/useAuth";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { user } = useAuth();

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "modern", name: "Modern", count: templates.filter(t => t.category === "modern").length },
    { id: "classic", name: "Classic", count: templates.filter(t => t.category === "classic").length },
    { id: "creative", name: "Creative", count: templates.filter(t => t.category === "creative").length },
    { id: "professional", name: "Professional", count: templates.filter(t => t.category === "professional").length },
    { id: "minimalist", name: "Minimalist", count: templates.filter(t => t.category === "minimalist").length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const canUseTemplate = (template: Template) => {
    if (!template.isPremium) return true;
    return user && ['basic', 'professional', 'enterprise'].includes(user.tier);
  };

  const handleUseTemplate = (template: Template) => {
    if (!canUseTemplate(template)) {
      // Redirect to pricing or show upgrade modal
      window.location.href = '/pricing';
      return;
    }
    
    // Navigate to create resume with template
    window.location.href = `/create?template=${template.id}`;
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from {templates.length} ATS-optimized templates designed by professionals. 
            Each template is crafted to help you stand out and get noticed by hiring managers.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
              <CardHeader className="p-0">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-t-lg overflow-hidden">
                  {/* Template Preview Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-white/80 rounded shadow-sm mb-2 mx-auto"></div>
                      <p className="text-xs text-muted-foreground">{template.name}</p>
                    </div>
                  </div>
                  
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}

                  {/* ATS Badge */}
                  {template.atsOptimized && (
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      ATS
                    </Badge>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" onClick={() => setSelectedTemplate(template)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Template Preview</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleUseTemplate(template)}
                      disabled={!canUseTemplate(template)}
                    >
                      {canUseTemplate(template) ? (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Use Template
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 mr-1" />
                          Upgrade
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                <CardDescription className="text-sm mb-3">
                  {template.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant={template.category === 'creative' ? 'default' : 'secondary'}>
                    {template.category}
                  </Badge>
                  
                  {template.isPremium && !canUseTemplate(template) && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Need More Templates?
              </h3>
              <p className="text-muted-foreground mb-6">
                Upgrade to Premium to access all {templates.filter(t => t.isPremium).length} premium templates, 
                AI-powered enhancements, and unlimited resume downloads.
              </p>
              <Button size="lg" asChild>
                <a href="/pricing">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
