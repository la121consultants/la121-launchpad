import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Star, Package, FileText, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pendingReviews: 0,
    activeServices: 0,
    draftPosts: 0,
    totalEbooks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [reviews, services, posts, ebooks] = await Promise.all([
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('services').select('*', { count: 'exact', head: true }).eq('active', true),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('ebooks').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        pendingReviews: reviews.count || 0,
        activeServices: services.count || 0,
        draftPosts: posts.count || 0,
        totalEbooks: ebooks.count || 0,
      });
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: Star,
      description: 'Reviews awaiting approval',
      link: '/admin/reviews',
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      icon: Package,
      description: 'Live service offerings',
      link: '/admin/services',
    },
    {
      title: 'Draft Posts',
      value: stats.draftPosts,
      icon: FileText,
      description: 'Unpublished blog posts',
      link: '/admin/blog',
    },
    {
      title: 'E-Books',
      value: stats.totalEbooks,
      icon: BookOpen,
      description: 'Total e-book library',
      link: '/admin/ebooks',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the LA121 Consultants admin portal
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = card.link}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
