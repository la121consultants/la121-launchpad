import AdminLayout from '@/components/AdminLayout';

const Services = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
          <p className="text-muted-foreground">Manage service offerings and pricing</p>
        </div>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Services management interface coming soon
        </div>
      </div>
    </AdminLayout>
  );
};

export default Services;
