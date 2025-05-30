import { useEffect, useState } from 'react';
import {
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import './AdminCollectionList.css';

function AdminCollectionList() {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    const snapshot = await getDocs(collection(db, 'collections'));
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCollections(fetched);
  };

  const handleRowOrderChange = async (newOrder, id) => {
    const docRef = doc(db, 'collections', id);
    const parsed = parseInt(newOrder);
    if (isNaN(parsed) || parsed < 1) return;
    await updateDoc(docRef, { rowOrder: parsed });
    fetchCollections();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this collection?'
    );
    if (!confirm) return;
    await deleteDoc(doc(db, 'collections', id));
    fetchCollections();
  };

  //     // --FOR EDIT FUNCTIONALLITY LATER IF I HAVE TIME--
  //   const handleEdit = (collection) => {
  //     alert("Edit clicked for: " + collection.title);
  //   };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className='admin-collection-list'>
      <h2 className='admin-collection-list__heading'>Existing Collections</h2>
      <table className='admin-collection-list__table'>
        <thead>
          <tr>
            <th className='admin-collection-list__table-header'>Row Order</th>
            <th className='admin-collection-list__table-header'>Title</th>
            <th className='admin-collection-list__table-header'>
              Number of Titles
            </th>
            <th className='admin-collection-list__table-header'>
              Poster Orientation
            </th>
            <th className='admin-collection-list__table-header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col) => (
            <tr key={col.id} className='admin-collection-list__table-row'>
              <td className='admin-collection-list__table-cell'>
                <input
                  type='number'
                  min='1'
                  value={col.rowOrder || ''}
                  onChange={(e) => handleRowOrderChange(e.target.value, col.id)}
                  className='admin-collection-list__row-order-input'
                />
              </td>
              <td className='admin-collection-list__table-cell'>{col.title}</td>
              <td className='admin-collection-list__table-cell'>
                {col.items.length}
              </td>
              <td className='admin-collection-list__table-cell'>
                {col.posterOrientation || 'Not set'}
              </td>
              <td className='admin-collection-list__table-cell'>
                <button
                  onClick={() => handleEdit(col)}
                  className='admin-collection-list__button admin-collection-list__button--edit'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(col.id)}
                  className='admin-collection-list__button admin-collection-list__button--delete'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCollectionList;
