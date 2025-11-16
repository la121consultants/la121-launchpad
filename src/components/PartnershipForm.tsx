import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Handshake } from 'lucide-react';

const PartnershipForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    linkedinUrl: '',
    howFoundUs: '',
    partnershipInterest: '',
  });

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

      const { error: submissionError } = await supabase.from('form_submissions').insert({
        profile_id: profileId,
        form_type: 'partnership',
        service_selected: 'Partnership Inquiry',
        additional_notes: `Company: ${formData.companyName}\n\n${formData.partnershipInterest}`,
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

          <div className="space-y-2">
            <Label htmlFor="partnershipInterest">Tell us about your partnership interest *</Label>
            <Textarea
              id="partnershipInterest"
              required
              value={formData.partnershipInterest}
              onChange={(e) => setFormData({ ...formData, partnershipInterest: e.target.value })}
              placeholder="Describe your organization, partnership goals, volume of services needed, etc..."
              rows={6}
            />
          </div>

          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground/80">
              <strong>Partnership Benefits:</strong> We offer custom packages and pricing for
              recruiters and corporate partners, including bulk services, dedicated support, and
              flexible payment terms.
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
