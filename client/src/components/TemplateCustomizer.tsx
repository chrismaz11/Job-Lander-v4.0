import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Type, Layout, Move } from 'lucide-react';

interface TemplateCustomizerProps {
  onCustomizationChange: (customization: TemplateCustomization) => void;
}

export interface TemplateCustomization {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    sections: string[];
    spacing: 'compact' | 'normal' | 'spacious';
  };
}

const defaultCustomization: TemplateCustomization = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    text: '#1e293b',
    background: '#ffffff'
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  layout: {
    sections: ['personal', 'experience', 'education', 'skills'],
    spacing: 'normal'
  }
};

const fontOptions = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro'
];

const colorPresets = [
  { name: 'Professional Blue', primary: '#2563eb', secondary: '#64748b' },
  { name: 'Modern Purple', primary: '#7c3aed', secondary: '#a855f7' },
  { name: 'Classic Black', primary: '#1f2937', secondary: '#6b7280' },
  { name: 'Creative Green', primary: '#059669', secondary: '#10b981' },
  { name: 'Elegant Navy', primary: '#1e40af', secondary: '#3b82f6' }
];

export function TemplateCustomizer({ onCustomizationChange }: TemplateCustomizerProps) {
  const [customization, setCustomization] = useState<TemplateCustomization>(defaultCustomization);

  const updateCustomization = (updates: Partial<TemplateCustomization>) => {
    const newCustomization = { ...customization, ...updates };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const updateColors = (colors: Partial<TemplateCustomization['colors']>) => {
    updateCustomization({ colors: { ...customization.colors, ...colors } });
  };

  const updateFonts = (fonts: Partial<TemplateCustomization['fonts']>) => {
    updateCustomization({ fonts: { ...customization.fonts, ...fonts } });
  };

  const updateLayout = (layout: Partial<TemplateCustomization['layout']>) => {
    updateCustomization({ layout: { ...customization.layout, ...layout } });
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newSections = [...customization.layout.sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      updateLayout({ sections: newSections });
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < customization.layout.sections.length - 1) {
      const newSections = [...customization.layout.sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      updateLayout({ sections: newSections });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="fonts">Fonts</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-3">
              <Label>Color Presets</Label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => updateColors({ primary: preset.primary, secondary: preset.secondary })}
                    className="justify-start"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <span className="text-sm">{preset.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Custom Colors</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Primary</Label>
                  <Input
                    type="color"
                    value={customization.colors.primary}
                    onChange={(e) => updateColors({ primary: e.target.value })}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Secondary</Label>
                  <Input
                    type="color"
                    value={customization.colors.secondary}
                    onChange={(e) => updateColors({ secondary: e.target.value })}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Text</Label>
                  <Input
                    type="color"
                    value={customization.colors.text}
                    onChange={(e) => updateColors({ text: e.target.value })}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Background</Label>
                  <Input
                    type="color"
                    value={customization.colors.background}
                    onChange={(e) => updateColors({ background: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fonts" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label>Heading Font</Label>
                <Select 
                  value={customization.fonts.heading} 
                  onValueChange={(value) => updateFonts({ heading: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Font</Label>
                <Select 
                  value={customization.fonts.body} 
                  onValueChange={(value) => updateFonts({ body: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-3">
              <Label>Section Order</Label>
              <div className="space-y-2">
                {customization.layout.sections.map((section, index) => (
                  <div key={section} className="flex items-center justify-between p-2 border rounded">
                    <span className="capitalize">{section}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveSectionUp(index)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveSectionDown(index)}
                        disabled={index === customization.layout.sections.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Spacing</Label>
              <Select 
                value={customization.layout.spacing} 
                onValueChange={(value: any) => updateLayout({ spacing: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
