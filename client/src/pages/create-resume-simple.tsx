import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Sparkles, FileText, Download, Plus, Trash2, User, Briefcase, GraduationCap, Award, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export default function CreateResumeSimple() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parseStatus, setParseStatus] = useState<"idle" | "parsing" | "success" | "error">("idle");
  const [parseError, setParseError] = useState<string>("");
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    linkedin: "",
    website: ""
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setParseError("Please upload a PDF or Word document (.pdf, .docx, .doc)");
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setParseError("File size must be less than 10MB");
      return;
    }

    setUploadedFile(file);
    setParseError("");
    await parseResume(file);
  };

  const parseResume = async (file: File) => {
    setParseStatus("parsing");
    
    try {
      // For now, we'll simulate parsing with a simple text extraction
      // In the next step, we'll connect this to the AI backend
      
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data - in reality this would come from your AI service
      const mockParsedData = {
        personalInfo: {
          firstName: "John",
          lastName: "Doe", 
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          location: "New York, NY",
          linkedin: "linkedin.com/in/johndoe",
          website: "johndoe.com"
        },
        experiences: [
          {
            id: "1",
            company: "Tech Corp",
            position: "Software Engineer",
            startDate: "2022-01",
            endDate: "2024-01",
            current: false,
            description: "Developed web applications using React and Node.js. Led a team of 3 developers and improved system performance by 40%."
          }
        ],
        educations: [
          {
            id: "1",
            institution: "University of Technology",
            degree: "Bachelor of Science",
            field: "Computer Science",
            graduationDate: "2022-05",
            gpa: "3.8"
          }
        ],
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"]
      };
      
      // Fill the form with parsed data
      setPersonalInfo(mockParsedData.personalInfo);
      setExperiences(mockParsedData.experiences);
      setEducations(mockParsedData.educations);
      setSkills(mockParsedData.skills);
      
      setParseStatus("success");
      
      // Auto-advance to personal info tab after successful parse
      setTimeout(() => {
        setCurrentStep("personal");
      }, 1000);
      
    } catch (error) {
      console.error('Resume parsing error:', error);
      setParseError("Failed to parse resume. Please try again or fill out the form manually.");
      setParseStatus("error");
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: ""
    };
    setEducations([...educations, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const generateResume = () => {
    // For now, just show an alert - we'll connect this to the backend later
    alert("Resume generation will be connected to AI backend in the next step!");
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Create Your Resume</h1>
          <p className="text-xl text-muted-foreground">
            Upload your existing resume or build from scratch with AI-powered enhancements
          </p>
        </div>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Upload Resume */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload your existing resume and we'll automatically extract your information using AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={parseStatus === "parsing"}
                  />
                  
                  {parseStatus === "idle" && (
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Drop your resume here</h3>
                      <p className="text-muted-foreground mb-4">
                        Supports PDF, DOC, and DOCX files up to 10MB
                      </p>
                      <Button>Choose File</Button>
                    </label>
                  )}
                  
                  {parseStatus === "parsing" && (
                    <div className="space-y-4">
                      <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                      <h3 className="text-lg font-semibold">Parsing your resume...</h3>
                      <p className="text-muted-foreground">
                        Our AI is extracting your information. This may take a few seconds.
                      </p>
                    </div>
                  )}
                  
                  {parseStatus === "success" && (
                    <div className="space-y-4">
                      <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                      <h3 className="text-lg font-semibold text-green-700">Resume parsed successfully!</h3>
                      <p className="text-muted-foreground">
                        We've extracted your information. Review and edit in the next tabs.
                      </p>
                      <Button onClick={() => setCurrentStep("personal")}>
                        Review Information
                      </Button>
                    </div>
                  )}
                  
                  {parseStatus === "error" && (
                    <div className="space-y-4">
                      <FileText className="w-12 h-12 mx-auto text-red-500" />
                      <h3 className="text-lg font-semibold text-red-700">Parsing failed</h3>
                      <p className="text-muted-foreground">
                        {parseError || "Unable to parse your resume. Please fill out the form manually."}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" onClick={() => setParseStatus("idle")}>
                          Try Again
                        </Button>
                        <Button onClick={() => setCurrentStep("personal")}>
                          Fill Manually
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {uploadedFile && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Uploaded: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't have a resume to upload?
                  </p>
                  <Button variant="outline" onClick={() => setCurrentStep("personal")}>
                    Start from Scratch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter your basic contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                    <Input
                      id="linkedin"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      value={personalInfo.website}
                      onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                      placeholder="johndoe.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your professional experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">Experience {experiences.indexOf(exp) + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="Job Title"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button onClick={addExperience} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {educations.map((edu) => (
                  <Card key={edu.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">Education {educations.indexOf(edu) + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="University Name"
                          />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bachelor's, Master's, etc."
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            placeholder="Computer Science, Business, etc."
                          />
                        </div>
                        <div>
                          <Label>Graduation Date</Label>
                          <Input
                            type="month"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button onClick={addEducation} variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add your technical and soft skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                
                {skills.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      Add skills that are relevant to your target job. Include both technical skills (programming languages, software) and soft skills (leadership, communication).
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Generate Resume Button */}
        <div className="mt-8 text-center">
          <Button onClick={generateResume} size="lg" className="w-full md:w-auto">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Resume with AI
          </Button>
        </div>
      </div>
    </div>
  );
}
