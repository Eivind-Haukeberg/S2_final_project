// ----- COMPONENT PURPOSE ----->
// This page component serves as the admin dashboard. It allows admins to create, edit, and manage collections
// by using the AdminForm and AdminCollectionList components.

import AdminForm from '../components/AdminForm/AdminForm';
import AdminCollectionList from '../components/AdminCollectionList/AdminCollectionList';
import { useState } from 'react';

function AdminPage() {
  // ----- STATE MANAGEMENT ----->
  // Tracks the currently selected collection for editing and a trigger to refresh the collection list.
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  // ----- HANDLE REFRESH LIST ----->
  // Toggles the refreshList value to signal child components to re-fetch or re-render.
  const handleRefresh = () => {
    setRefreshList((prev) => !prev);
  };

  // ----- COMPONENT RENDERING ----->
  // Renders the page title, AdminForm for adding/editing collections,
  // and AdminCollectionList for viewing/editing/deleting collections.
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
        onEdit={setSelectedCollection}
      />
    </div>
  );
}

export default AdminPage;
