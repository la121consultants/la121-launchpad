import AdminLayout from '@/components/AdminLayout';

const AuditLog = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground">Track all administrative actions and changes</p>
        </div>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Audit log viewer coming soon
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLog;
