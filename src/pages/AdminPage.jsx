import AdminCollectionForm from '../components/AdminForm/AdminForm';
import AdminCollectionList from '../components/AdminCollectionList/AdimCollectionList';

function AdminPage() {
  return (
    <div className='admin-page'>
      <h1 className='admin-page__heading'>Admin Panel</h1>
      <AdminCollectionForm />
      <AdminCollectionList />
    </div>
  );
}

export default AdminPage;
