import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Search, Star, Eye, Download, Loader2 } from "lucide-react";
import { Link } from "wouter";

const TEMPLATE_CATEGORIES = ["All", "Modern", "Classic", "Creative", "Professional", "Minimalist"];

const MOCK_TEMPLATES = [
  { id: "1", name: "Modern Professional", category: "Modern", rating: 4.8, downloads: 1234, preview: "/api/placeholder/400/500" },
  { id: "2", name: "Classic Elegance", category: "Classic", rating: 4.7, downloads: 987, preview: "/api/placeholder/400/500" },
  { id: "3", name: "Creative Bold", category: "Creative", rating: 4.9, downloads: 1567, preview: "/api/placeholder/400/500" },
  { id: "4", name: "Executive Suite", category: "Professional", rating: 4.6, downloads: 876, preview: "/api/placeholder/400/500" },
  { id: "5", name: "Minimalist Clean", category: "Minimalist", rating: 4.8, downloads: 1345, preview: "/api/placeholder/400/500" },
  { id: "6", name: "Tech Innovator", category: "Modern", rating: 4.7, downloads: 1123, preview: "/api/placeholder/400/500" },
  { id: "7", name: "Traditional Formal", category: "Classic", rating: 4.5, downloads: 654, preview: "/api/placeholder/400/500" },
  { id: "8", name: "Designer Portfolio", category: "Creative", rating: 4.9, downloads: 1876, preview: "/api/placeholder/400/500" },
  { id: "9", name: "Corporate Pro", category: "Professional", rating: 4.6, downloads: 934, preview: "/api/placeholder/400/500" },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof MOCK_TEMPLATES[0] | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { data: templates, isLoading } = useQuery({
    queryKey: ["/api/canva/templates"],
    enabled: false,
  });

  const filteredTemplates = MOCK_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (template: typeof MOCK_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume Templates</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from 50+ professional templates powered by Canva
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-templates"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              {TEMPLATE_CATEGORIES.map(category => (
                <TabsTrigger key={category} value={category} data-testid={`tab-${category.toLowerCase()}`}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group overflow-hidden hover-elevate transition-all hover:scale-105"
                data-testid={`card-template-${template.id}`}
              >
                {/* Template Preview */}
                <div className="aspect-[8.5/11] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <FileText className="h-24 w-24 text-muted-foreground/20" />
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      onClick={() => handlePreview(template)}
                      variant="secondary"
                      size="sm"
                      data-testid={`button-preview-${template.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg" data-testid={`text-template-name-${template.id}`}>
                      {template.name}
                    </h3>
                    <Badge variant="outline" data-testid={`badge-category-${template.id}`}>
                      {template.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                      <span data-testid={`text-rating-${template.id}`}>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span data-testid={`text-downloads-${template.id}`}>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href={`/create?template=${template.id}`}>
                    <a>
                      <Button className="w-full" data-testid={`button-use-template-${template.id}`}>
                        Use Template
                      </Button>
                    </a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-bold mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                {selectedTemplate?.category} template with {selectedTemplate?.downloads.toLocaleString()} downloads
              </DialogDescription>
            </DialogHeader>

            <div className="aspect-[8.5/11] bg-muted rounded-lg flex items-center justify-center">
              <FileText className="h-32 w-32 text-muted-foreground/20" />
            </div>

            <div className="flex gap-4">
              <Link href={`/create?template=${selectedTemplate?.id}`}>
                <a className="flex-1">
                  <Button className="w-full" data-testid="button-use-template-preview">
                    Use This Template
                  </Button>
                </a>
              </Link>
              <Button variant="outline" onClick={() => setPreviewOpen(false)} className="flex-1">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
