import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Handshake } from 'lucide-react';

const services = [
  'Pre-Screened Candidate Pipeline',
  'Candidate Preparation (CV, LinkedIn & Interview Prep)',
  'Work Experience & Upskilling Programme',
  'White-Label Support for Agencies',
  'Tailored CVs & Portfolios Based on JD',
  'Priority Candidate Alerts',
  'Job Board Posting',
];

const digitalTools = [
  'CV Revamp AI Tool',
  'ShowIntroBio Tool',
];

const jobBoardOptions = [
  'Single Job Posting',
  'Multiple Job Postings (5-10 jobs)',
  'Multiple Job Postings (10-25 jobs)',
  'Unlimited Postings (Monthly Subscription)',
  'Featured Job Listings',
  'Candidate Database Access',
];

const PartnershipForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    linkedinUrl: '',
    howFoundUs: '',
    partnershipTier: '',
    userCount: '',
    selectedServices: [] as string[],
    selectedTools: [] as string[],
    selectedJobBoardOptions: [] as string[],
    partnershipInterest: '',
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(tool)
        ? prev.selectedTools.filter(t => t !== tool)
        : [...prev.selectedTools, tool]
    }));
  };

  const handleJobBoardToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      selectedJobBoardOptions: prev.selectedJobBoardOptions.includes(option)
        ? prev.selectedJobBoardOptions.filter(o => o !== option)
        : [...prev.selectedJobBoardOptions, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      let profileId = existingProfile?.id;

      if (!profileId) {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            linkedin_url: formData.linkedinUrl,
            how_found_us: formData.howFoundUs,
          })
          .select()
          .single();

        if (profileError) throw profileError;
        profileId = newProfile.id;
      }

      const partnershipDetails = `
Company: ${formData.companyName}
Partnership Tier: ${formData.partnershipTier}
Number of Users: ${formData.userCount || 'N/A'}
Services Interested In: ${formData.selectedServices.join(', ') || 'None selected'}
Digital Tools Interest: ${formData.selectedTools.join(', ') || 'None selected'}
Job Board Options: ${formData.selectedJobBoardOptions.join(', ') || 'None selected'}

Additional Notes:
${formData.partnershipInterest}
      `.trim();

      const { error: submissionError } = await supabase.from('form_submissions').insert({
        profile_id: profileId,
        form_type: 'partnership',
        service_selected: `${formData.partnershipTier} - ${formData.userCount || 'Pay Per Candidate'}`,
        additional_notes: partnershipDetails,
        status: 'new',
      });

      if (submissionError) throw submissionError;

      toast.success('Partnership inquiry submitted!', {
        description: 'We will review your proposal and get back to you soon.',
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        linkedinUrl: '',
        howFoundUs: '',
        partnershipTier: '',
        userCount: '',
        selectedServices: [],
        selectedTools: [],
        selectedJobBoardOptions: [],
        partnershipInterest: '',
      });
    } catch (error: any) {
      toast.error('Submission failed', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Handshake className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Partnership Inquiry</CardTitle>
        </div>
        <CardDescription>
          Interested in partnering with LA121 Consultants? Tell us about your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 20 1234 5678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Your Company Ltd"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn Profile/Company Page</Label>
            <Input
              id="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="linkedin.com/company/yourcompany"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="howFoundUs">How did you find us?</Label>
            <Input
              id="howFoundUs"
              value={formData.howFoundUs}
              onChange={(e) => setFormData({ ...formData, howFoundUs: e.target.value })}
              placeholder="Google, LinkedIn, Referral, etc."
            />
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Partnership Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="partnershipTier">Partnership Tier *</Label>
              <Select
                required
                value={formData.partnershipTier}
                onValueChange={(value) => setFormData({ ...formData, partnershipTier: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Tier 1 - Pay Per Candidate">
                    Tier 1 - Pay Per Candidate (£79/candidate + 6% commission)
                  </SelectItem>
                  <SelectItem value="Tier 2 - Monthly Access">
                    Tier 2 - Monthly Access (Lower 5% commission)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.partnershipTier === 'Tier 2 - Monthly Access' && (
            <div className="space-y-2">
              <Label htmlFor="userCount">Number of Users *</Label>
              <Select
                required={formData.partnershipTier === 'Tier 2 - Monthly Access'}
                value={formData.userCount}
                onValueChange={(value) => setFormData({ ...formData, userCount: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user count" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="1-5 Users (£149/month)">1-5 Users (£149/month)</SelectItem>
                  <SelectItem value="6-15 Users (£249/month)">6-15 Users (£249/month)</SelectItem>
                  <SelectItem value="16-30 Users (£399/month)">16-30 Users (£399/month)</SelectItem>
                  <SelectItem value="31-50 Users (£599/month)">31-50 Users (£599/month)</SelectItem>
                  <SelectItem value="50+ Users (Custom Pricing)">50+ Users (Custom Pricing)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                ✨ 50% off first month available
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Label>Services Interested In (Select all that apply)</Label>
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service} className="flex items-start space-x-3">
                  <Checkbox
                    id={service}
                    checked={formData.selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <label
                    htmlFor={service}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Digital Tools Add-Ons (Optional)</Label>
            <div className="space-y-2">
              {digitalTools.map((tool) => (
                <div key={tool} className="flex items-start space-x-3">
                  <Checkbox
                    id={tool}
                    checked={formData.selectedTools.includes(tool)}
                    onCheckedChange={() => handleToolToggle(tool)}
                  />
                  <label
                    htmlFor={tool}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {tool}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Give your candidates access to our AI-powered career tools
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Job Board Services</h3>
            
            <div className="space-y-3">
              <Label>Job Board Options (Optional)</Label>
              <div className="space-y-2">
                {jobBoardOptions.map((option) => (
                  <div key={option} className="flex items-start space-x-3">
                    <Checkbox
                      id={`jobboard-${option}`}
                      checked={formData.selectedJobBoardOptions.includes(option)}
                      onCheckedChange={() => handleJobBoardToggle(option)}
                    />
                    <label
                      htmlFor={`jobboard-${option}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Post your job openings and get access to our pre-screened candidate pool
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipInterest">Additional Information</Label>
            <Textarea
              id="partnershipInterest"
              value={formData.partnershipInterest}
              onChange={(e) => setFormData({ ...formData, partnershipInterest: e.target.value })}
              placeholder="Tell us more about your organization, specific needs, expected volume, timeline, etc..."
              rows={6}
            />
          </div>

          <div className="space-y-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground/80">
              <strong>✨ Special Offer:</strong> Get 50% off your first month with Tier 2 partnerships
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Partnership Benefits:</strong> Custom packages, bulk services, dedicated support,
              and flexible payment terms tailored to your agency's needs.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Partnership Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PartnershipForm;
