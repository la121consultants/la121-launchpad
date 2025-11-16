import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Download, Users, FileText, TrendingUp, Calendar } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';

interface Stats {
  totalUsers: number;
  submissionsThisWeek: number;
  submissionsThisMonth: number;
  serviceBreakdown: Record<string, number>;
}

const Reports = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    submissionsThisWeek: 0,
    submissionsThisMonth: 0,
    serviceBreakdown: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Submissions this week
      const weekAgo = subDays(new Date(), 7).toISOString();
      const { count: submissionsThisWeek } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo);

      // Submissions this month
      const monthAgo = subMonths(new Date(), 1).toISOString();
      const { count: submissionsThisMonth } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthAgo);

      // Service breakdown
      const { data: submissions } = await supabase
        .from('form_submissions')
        .select('service_selected')
        .not('service_selected', 'is', null);

      const serviceBreakdown: Record<string, number> = {};
      submissions?.forEach((sub) => {
        const service = sub.service_selected || 'Unknown';
        serviceBreakdown[service] = (serviceBreakdown[service] || 0) + 1;
      });

      setStats({
        totalUsers: totalUsers || 0,
        submissionsThisWeek: submissionsThisWeek || 0,
        submissionsThisMonth: submissionsThisMonth || 0,
        serviceBreakdown,
      });
    } catch (error: any) {
      toast.error('Failed to load stats', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async (type: 'users' | 'submissions') => {
    try {
      let data: any[] = [];
      let headers: string[] = [];

      if (type === 'users') {
        const { data: profiles } = await supabase.from('profiles').select('*');
        data = profiles || [];
        headers = ['Full Name', 'Email', 'Phone', 'LinkedIn', 'How Found Us', 'Created At'];
      } else {
        const { data: submissions } = await supabase
          .from('form_submissions')
          .select(`
            *,
            profile:profiles(full_name, email, phone, linkedin_url)
          `);
        data = submissions || [];
        headers = [
          'Name',
          'Email',
          'Phone',
          'Form Type',
          'Service',
          'Status',
          'Preferred Date/Time',
          'Notes',
          'Created At',
        ];
      }

      // Create CSV content
      let csvContent = headers.join(',') + '\n';

      data.forEach((row) => {
        if (type === 'users') {
          csvContent += [
            `"${row.full_name}"`,
            `"${row.email}"`,
            `"${row.phone || ''}"`,
            `"${row.linkedin_url || ''}"`,
            `"${row.how_found_us || ''}"`,
            `"${format(new Date(row.created_at), 'PP')}"`,
          ].join(',') + '\n';
        } else {
          csvContent += [
            `"${row.profile?.full_name || ''}"`,
            `"${row.profile?.email || ''}"`,
            `"${row.profile?.phone || ''}"`,
            `"${row.form_type}"`,
            `"${row.service_selected || ''}"`,
            `"${row.status}"`,
            `"${row.preferred_datetime ? format(new Date(row.preferred_datetime), 'PPp') : ''}"`,
            `"${row.additional_notes || ''}"`,
            `"${format(new Date(row.created_at), 'PP')}"`,
          ].join(',') + '\n';
        }
      });

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${type}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('CSV downloaded successfully');
    } catch (error: any) {
      toast.error('Failed to download CSV', {
        description: error.message,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">View key metrics and download reports</p>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Registered on website</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.submissionsThisWeek}</div>
                  <p className="text-xs text-muted-foreground">Form submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.submissionsThisMonth}</div>
                  <p className="text-xs text-muted-foreground">Form submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Service</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Object.entries(stats.serviceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[1] || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Object.entries(stats.serviceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Breakdown</CardTitle>
                <CardDescription>Number of orders by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(stats.serviceBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([service, count]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{service}</span>
                        <span className="text-sm text-muted-foreground">{count} orders</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download reports as CSV files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">All Users</p>
                    <p className="text-sm text-muted-foreground">
                      Export complete list of registered users
                    </p>
                  </div>
                  <Button onClick={() => downloadCSV('users')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">All Form Submissions</p>
                    <p className="text-sm text-muted-foreground">
                      Export complete list of form submissions
                    </p>
                  </div>
                  <Button onClick={() => downloadCSV('submissions')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reports;
