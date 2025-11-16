import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Briefcase, MapPin, Clock, DollarSign, Star, Search, Plus, ExternalLink, Building2 } from 'lucide-react';
import { format } from 'date-fns';

interface JobPosting {
  id: string;
  company_name: string;
  company_website: string | null;
  job_title: string;
  job_location: string;
  job_type: string;
  salary_range: string | null;
  job_description: string;
  requirements: string | null;
  benefits: string | null;
  application_email: string;
  application_url: string | null;
  featured: boolean;
  created_at: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyWebsite: '',
    jobTitle: '',
    jobLocation: '',
    jobType: '',
    salaryRange: '',
    jobDescription: '',
    requirements: '',
    benefits: '',
    applicationEmail: '',
    applicationUrl: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, typeFilter, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'approved')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error: any) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.job_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter((job) =>
        job.job_location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((job) => job.job_type === typeFilter);
    }

    setFilteredJobs(filtered);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('job_postings').insert({
        company_name: formData.companyName,
        company_email: formData.companyEmail,
        company_website: formData.companyWebsite,
        job_title: formData.jobTitle,
        job_location: formData.jobLocation,
        job_type: formData.jobType,
        salary_range: formData.salaryRange,
        job_description: formData.jobDescription,
        requirements: formData.requirements,
        benefits: formData.benefits,
        application_email: formData.applicationEmail,
        application_url: formData.applicationUrl,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Job submitted successfully!', {
        description: 'Your job posting will be reviewed and published shortly.',
      });

      setShowSubmitDialog(false);
      setFormData({
        companyName: '',
        companyEmail: '',
        companyWebsite: '',
        jobTitle: '',
        jobLocation: '',
        jobType: '',
        salaryRange: '',
        jobDescription: '',
        requirements: '',
        benefits: '',
        applicationEmail: '',
        applicationUrl: '',
      });
    } catch (error: any) {
      toast.error('Failed to submit job', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const viewJobDetails = (job: JobPosting) => {
    setSelectedJob(job);
    setShowJobDialog(true);

    // Increment view count
    supabase
      .from('job_postings')
      .update({ views_count: (job as any).views_count + 1 })
      .eq('id', job.id)
      .then();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">Career Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Job Board</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover exciting career opportunities from top employers. All candidates on our platform
              are pre-screened and career-ready.
            </p>
            <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Submit a Job Posting</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to post your job. All postings are reviewed before going live.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleJobSubmit} className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email *</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        required
                        value={formData.companyEmail}
                        onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      required
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g. Marketing Manager"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobLocation">Location *</Label>
                      <Input
                        id="jobLocation"
                        required
                        value={formData.jobLocation}
                        onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                        placeholder="e.g. London, UK or Remote"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type *</Label>
                      <Select
                        required
                        value={formData.jobType}
                        onValueChange={(value) => setFormData({ ...formData, jobType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryRange">Salary Range</Label>
                    <Input
                      id="salaryRange"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      placeholder="e.g. £30,000 - £40,000 per year"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description *</Label>
                    <Textarea
                      id="jobDescription"
                      required
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      rows={6}
                      placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={4}
                      placeholder="List required qualifications, skills, and experience..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      rows={3}
                      placeholder="List benefits, perks, and what you offer employees..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationEmail">Application Email *</Label>
                      <Input
                        id="applicationEmail"
                        type="email"
                        required
                        value={formData.applicationEmail}
                        onChange={(e) => setFormData({ ...formData, applicationEmail: e.target.value })}
                        placeholder="careers@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicationUrl">Application URL</Label>
                      <Input
                        id="applicationUrl"
                        type="url"
                        value={formData.applicationUrl}
                        onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                        placeholder="https://company.com/careers/apply"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowSubmitDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Job Posting'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="max-w-6xl mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="manchester">Manchester</SelectItem>
                    <SelectItem value="birmingham">Birmingham</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading jobs...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`hover:shadow-lg transition-shadow cursor-pointer ${
                      job.featured ? 'border-2 border-primary/50 bg-primary/5' : ''
                    }`}
                    onClick={() => viewJobDetails(job)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {job.featured && (
                              <Badge variant="default" className="gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="capitalize">
                              {job.job_type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{job.job_title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 text-base">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {job.company_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.job_location}
                            </span>
                            {job.salary_range && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.salary_range}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(job.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{job.job_description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Job Details Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedJob.featured && (
                        <Badge variant="default" className="gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {selectedJob.job_type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl mb-2">{selectedJob.job_title}</DialogTitle>
                    <DialogDescription className="text-base">
                      <div className="flex flex-col gap-2">
                        <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {selectedJob.company_name}
                          {selectedJob.company_website && (
                            <a
                              href={selectedJob.company_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit Website
                            </a>
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedJob.job_location}
                        </span>
                        {selectedJob.salary_range && (
                          <span className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {selectedJob.salary_range}
                          </span>
                        )}
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Posted {format(new Date(selectedJob.created_at), 'MMMM d, yyyy')}
                        </span>
                      </div>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedJob.job_description}</p>
                </div>

                {selectedJob.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedJob.requirements}</p>
                  </div>
                )}

                {selectedJob.benefits && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedJob.benefits}</p>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Apply for this position</h3>
                  <div className="flex gap-3">
                    <Button asChild className="flex-1">
                      <a href={`mailto:${selectedJob.application_email}`}>
                        Email Application
                      </a>
                    </Button>
                    {selectedJob.application_url && (
                      <Button asChild variant="outline" className="flex-1">
                        <a
                          href={selectedJob.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply Online
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Jobs;
