// ----- COMPONENT PURPOSE ----->
// This component is used to create and edit media collections. It allows searching for media items using the TMDB API,
// adding them to a collection, and saving the collection to Firestore.

import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { searchMedia } from '../../services/tmdbService';
import Button from '../Button/Button';
import styles from './AdminForm.module.css';

function AdminForm({ selectedCollection, setSelectedCollection, onSave }) {
  // ----- STATE MANAGEMENT ----->
  // Various states for form inputs, search results, messages, and selected media items.
  const [collectionTitle, setCollectionTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('movie');
  const [posterOrientation, setPosterOrientation] = useState('horizontal');

  // ----- INITIALIZE FORM WITH SELECTED COLLECTION ----->
  // When a collection is selected for editing, populate the form with its existing values.
  useEffect(() => {
    if (selectedCollection) {
      setCollectionTitle(selectedCollection.title || '');
      setMediaItems(selectedCollection.items || []);
      setPosterOrientation(
        selectedCollection.posterOrientation || 'horizontal'
      );
    }
  }, [selectedCollection]);

  // ----- SEARCH TMDB API ----->
  // Calls the TMDB API to search for media items based on user input and updates the search results state.
  const handleSearchTMDB = async () => {
    try {
      const data = await searchMedia(searchQuery, searchType);
      setSearchResults(data.results);
    } catch (error) {
      console.error('TMDB search failed:', error);
    }
  };

  // ----- ADD MEDIA ITEM TO COLLECTION ----->
  // Adds the selected media item to the current collection list using appropriate image URL based on orientation.
  const handleAddMedia = (media) => {
    const imageUrl =
      posterOrientation === 'horizontal'
        ? `https://image.tmdb.org/t/p/w500${media.backdrop_path}`
        : `https://image.tmdb.org/t/p/w500${media.poster_path}`;
    const newItem = {
      id: media.id,
      title: media.title || media.name,
      image: imageUrl,
      type: searchType,
    };
    setMediaItems((prev) => [...prev, newItem]);
  };

  // ----- REMOVE MEDIA ITEM FROM COLLECTION ----->
  // Filters out the media item with the given ID from the current collection list.
  const handleRemoveItem = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ----- SUBMIT COLLECTION TO FIRESTORE ----->
  // Validates input, then either updates an existing collection or creates a new one in Firestore.
  const handleSubmitCollection = async (e) => {
    e.preventDefault();
    if (!collectionTitle || mediaItems.length === 0) {
      setMessageError('Please add a title and at least one media item.');
      return;
    }

    const payload = {
      title: collectionTitle,
      items: mediaItems,
      posterOrientation,
    };

    try {
      if (selectedCollection?.id) {
        await setDoc(doc(db, 'collections', selectedCollection.id), payload);
        setMessageSuccess('Collection updated successfully!');
      } else {
        await addDoc(collection(db, 'collections'), payload);
        setMessageSuccess('Collection created successfully!');
      }

      setMessageError(null);
      setSelectedCollection(null);
      setCollectionTitle('');
      setMediaItems([]);
      setSearchQuery('');
      onSave();
    } catch (error) {
      setMessageError('Failed to save collection: ' + error.message);
    }
  };

  // ----- COMPONENT RENDERING ----->
  // Renders the form UI, including input fields, search, preview, and error/success messages.
  return (
    <form className={styles['admin-form']} onSubmit={handleSubmitCollection}>
      <h2 className={styles['admin-form__heading']}>
        {selectedCollection ? 'Edit Collection' : 'Create New Collection'}
      </h2>

      <div className={styles['admin-form__input-row']}>
        <input
          type='text'
          placeholder='Collection title'
          value={collectionTitle}
          onChange={(e) => setCollectionTitle(e.target.value)}
          className={styles['admin-form__input']}
        />

        <select
          value={posterOrientation}
          onChange={(e) => setPosterOrientation(e.target.value)}
          className={styles['admin-form__select']}>
          <option value='horizontal'>Horizontal</option>
          <option value='vertical'>Vertical</option>
        </select>
      </div>

      <div className={styles['admin-form__search-section']}>
        <select
          className={styles['admin-form__select']}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}>
          <option value='movie'>Movie</option>
          <option value='tv'>TV Series</option>
        </select>

        <input
          type='text'
          placeholder='Search for title...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['admin-form__input']}
        />

        <Button type='button' variant='primary' onClick={handleSearchTMDB}>
          Search
        </Button>
      </div>

      <ul className={styles['admin-form__search-results']}>
        {searchResults.map((media) => (
          <li key={media.id} className={styles['admin-form__search-result']}>
            {media.title || media.name}
            <Button
              type='button'
              variant='add-small'
              onClick={() => handleAddMedia(media)}>
              Add
            </Button>
          </li>
        ))}
      </ul>

      {mediaItems.length > 0 && (
        <div className={styles['admin-form__preview']}>
          <h3>Preview:</h3>
          <div className={styles['admin-form__preview-list']}>
            {mediaItems.map((item) => (
              <div key={item.id} className={styles['admin-form__preview-item']}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles['admin-form__preview-image']}
                />
                <Button
                  type='button'
                  variant='remove-small'
                  onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button type='submit' variant='primary'>
        {selectedCollection ? 'Update Collection' : 'Save Collection'}
      </Button>

      {messageError && (
        <p className={styles['admin-form__error']}>{messageError}</p>
      )}
      {messageSuccess && (
        <p className={styles['admin-form__success']}>{messageSuccess}</p>
      )}
    </form>
  );
}

export default AdminForm;
