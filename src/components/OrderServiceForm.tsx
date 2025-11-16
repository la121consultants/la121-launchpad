import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

const services = [
  'CV Review',
  'CV Revamp',
  'Interview Preparation',
  'Career Portfolio',
  'LinkedIn Profile Optimization',
  'Career Coaching',
  'Basic Plus Package',
  'Career Accelerator Package',
  'Elite Career Package',
  'Executive Package',
];

const OrderServiceForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    howFoundUs: '',
    serviceSelected: '',
    additionalNotes: '',
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
        form_type: 'service_order',
        service_selected: formData.serviceSelected,
        additional_notes: formData.additionalNotes,
        status: 'new',
      });

      if (submissionError) throw submissionError;

      toast.success('Service order submitted!', {
        description: 'We will contact you shortly to confirm your order and arrange payment.',
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        howFoundUs: '',
        serviceSelected: '',
        additionalNotes: '',
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
          <ShoppingCart className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Order a Service</CardTitle>
        </div>
        <CardDescription>
          Select the service you need and we'll get in touch to finalize the details
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
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceSelected">Service to Order *</Label>
            <Select
              required
              value={formData.serviceSelected}
              onValueChange={(value) => setFormData({ ...formData, serviceSelected: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder="Any specific requirements or questions..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Order Service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderServiceForm;
