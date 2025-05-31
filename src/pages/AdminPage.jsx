import AdminForm from '../components/AdminForm/AdminForm';
import AdminCollectionList from '../components/AdminCollectionList/AdimCollectionList';
import { useState } from 'react';

function AdminPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <div className='admin-page'>
      <h1 className='admin-page__title'>Admin Dashboard</h1>
      <AdminForm
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        onSave={handleRefresh}
      />
      <AdminCollectionList
        setSelectedCollection={setSelectedCollection}
        refreshTrigger={refreshList}
      />
    </div>
  );
}

export default AdminPage;
