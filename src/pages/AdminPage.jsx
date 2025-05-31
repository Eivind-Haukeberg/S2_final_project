import AdminForm from '../components/AdminForm/AdminForm';
import AdminCollectionList from '../components/AdminCollectionList/AdminCollectionList';

import { useState } from 'react';

function AdminPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  return (
    <div className='admin-page'>
      <h1 className='admin-page__title'>Admin Dashboard</h1>
      <AdminForm
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <AdminCollectionList setSelectedCollection={setSelectedCollection} />
    </div>
  );
}

export default AdminPage;
