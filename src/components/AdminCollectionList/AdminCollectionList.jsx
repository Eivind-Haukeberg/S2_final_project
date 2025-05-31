import { useEffect, useState } from 'react';
import {
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Button from '../Button/Button';
import styles from './AdminCollectionList.module.css';

function AdminCollectionList({ onEdit }) {
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

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className={styles['admin-collection-list']}>
      <h2 className={styles['admin-collection-list__heading']}>
        Existing Collections
      </h2>
      <table className={styles['admin-collection-list__table']}>
        <thead>
          <tr>
            <th className={styles['admin-collection-list__table-header']}>
              Row Order
            </th>
            <th className={styles['admin-collection-list__table-header']}>
              Title
            </th>
            <th className={styles['admin-collection-list__table-header']}>
              Number of Titles
            </th>
            <th className={styles['admin-collection-list__table-header']}>
              Poster Orientation
            </th>
            <th className={styles['admin-collection-list__table-header']}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col) => (
            <tr
              key={col.id}
              className={styles['admin-collection-list__table-row']}>
              <td className={styles['admin-collection-list__table-cell']}>
                <input
                  type='number'
                  min='1'
                  value={col.rowOrder || ''}
                  onChange={(e) => handleRowOrderChange(e.target.value, col.id)}
                  className={styles['admin-collection-list__row-order-input']}
                />
              </td>
              <td className={styles['admin-collection-list__table-cell']}>
                {col.title}
              </td>
              <td className={styles['admin-collection-list__table-cell']}>
                {col.items.length}
              </td>
              <td className={styles['admin-collection-list__table-cell']}>
                {col.posterOrientation || 'Not set'}
              </td>
              <td className={styles['admin-collection-list__table-cell']}>
                <Button variant='primary' onClick={() => onEdit(col)}>
                  Edit
                </Button>
                <Button variant='delete' onClick={() => handleDelete(col.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCollectionList;
