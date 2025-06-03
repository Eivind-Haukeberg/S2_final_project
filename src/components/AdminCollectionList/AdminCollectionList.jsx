// ----- COMPONENT PURPOSE ----->
// This component fetches and displays a list of collections from Firestore, allowing admins to edit or delete collections and update their row order.

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
  // ----- STATE MANAGEMENT ----->
  // This hook initializes local state to store the fetched list of collections from Firestore.
  const [collections, setCollections] = useState([]);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  // ----- FETCH COLLECTIONS FROM FIRESTORE ----->
  // This asynchronous function retrieves documents from the 'collections' Firestore collection,
  // maps over them to extract the data along with the document ID, and stores them in local state.
  const fetchCollections = async () => {
    const snapshot = await getDocs(collection(db, 'collections'));
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCollections(fetched);
  };

  // ----- HANDLE ROW ORDER CHANGE ----->
  // This function updates the 'rowOrder' field for a specific document in Firestore.
  // It ensures the new order is a valid positive integer before updating, then refreshes the list.
  const handleRowOrderChange = async (newOrder, id) => {
    const docRef = doc(db, 'collections', id);
    const parsed = parseInt(newOrder);
    if (isNaN(parsed) || parsed < 1) return;
    await updateDoc(docRef, { rowOrder: parsed });
    fetchCollections();
  };

  // ----- HANDLE DELETE ----->
  // This function prompts the user for confirmation before deleting a specific collection document
  // from Firestore. After deletion, it refreshes the list of collections.
  const handleDelete = (id) => {
    setCollectionToDelete(id);
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, 'collections', collectionToDelete));
    setCollectionToDelete(null);
    fetchCollections();
  };

  const cancelDelete = () => {
    setCollectionToDelete(null);
  };

  // ----- INITIAL DATA FETCHING ----->
  // This hook ensures collections are fetched once when the component mounts.
  useEffect(() => {
    fetchCollections();
  }, []);

  // ----- COMPONENT RENDERING ----->
  // Renders a table of existing collections with editable row orders, collection data,
  // and buttons for editing and deleting each collection.
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
                <div className={styles['admin-collection-list__actions']}>
                  <Button variant='primary' onClick={() => onEdit(col)}>
                    Edit
                  </Button>
                  <Button variant='delete' onClick={() => handleDelete(col.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {collectionToDelete && (
        <div className={styles['admin-collection-list__modal']}>
          <div className={styles['admin-collection-list__modal-content']}>
            <p>Are you sure you want to delete this collection?</p>
            <div className={styles['admin-collection-list__modal-actions']}>
              <Button variant='delete' onClick={confirmDelete}>
                Yes, delete
              </Button>
              <Button variant='primary' onClick={cancelDelete}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCollectionList;
