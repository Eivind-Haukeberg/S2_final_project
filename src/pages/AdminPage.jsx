import AdminCollectionForm from '../components/AdminForm/AdminForm';

function AdminPage() {
  return (
    <div className='admin-page'>
      <h1 className='admin-page__heading'>Admin Panel</h1>
      <AdminCollectionForm />
    </div>
  );
}

export default AdminPage;
