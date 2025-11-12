import AdminLayout from '@/components/AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground">Manage branding, integrations, and site configuration</p>
        </div>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Settings interface coming soon
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
