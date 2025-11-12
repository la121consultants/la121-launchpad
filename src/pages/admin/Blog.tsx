import AdminLayout from '@/components/AdminLayout';

const Blog = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Blog management interface coming soon
        </div>
      </div>
    </AdminLayout>
  );
};

export default Blog;
