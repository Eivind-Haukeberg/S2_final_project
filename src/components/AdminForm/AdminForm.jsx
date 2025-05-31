import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { searchMedia } from '../../services/tmdbService';
import styles from './AdminForm.module.css';

function AdminForm({ selectedCollection, setSelectedCollection, onSave }) {
  const [collectionTitle, setCollectionTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('movie');
  const [posterOrientation, setPosterOrientation] = useState('horizontal');

  useEffect(() => {
    if (selectedCollection) {
      setCollectionTitle(selectedCollection.title || '');
      setMediaItems(selectedCollection.items || []);
      setPosterOrientation(
        selectedCollection.posterOrientation || 'horizontal'
      );
    }
  }, [selectedCollection]);

  const handleSearchTMDB = async () => {
    try {
      const data = await searchMedia(searchQuery, searchType);
      setSearchResults(data.results);
    } catch (error) {
      console.error('TMDB search failed:', error);
    }
  };

  const handleSubmitCollection = async (e) => {
    e.preventDefault();

    if (!collectionTitle || mediaItems.length === 0) {
      setMessageError('Please add at least one movie or series');
      return;
    }

    try {
      if (selectedCollection) {
        await setDoc(doc(db, 'collections', selectedCollection.id), {
          id: selectedCollection.id,
          title: collectionTitle,
          items: mediaItems,
          posterOrientation,
          rowOrder: selectedCollection.rowOrder || 1,
        });
        setMessageSuccess('Collection updated successfully!');
      } else {
        await addDoc(collection(db, 'collections'), {
          title: collectionTitle,
          items: mediaItems,
          posterOrientation,
          rowOrder: 1,
        });
        setMessageSuccess('Collection created successfully!');
      }

      setMessageError(null);
      setCollectionTitle('');
      setMediaItems([]);
      setSelectedCollection(null);

      if (onSave) onSave();
    } catch (error) {
      setMessageError('Failed to save collection: ' + error.message);
    }
  };

  return (
    <form
      className={styles['admin-collection-form']}
      onSubmit={handleSubmitCollection}>
      <h2 className={styles['admin-collection-form__heading']}>
        Create New Collection
      </h2>

      <input
        type='text'
        placeholder='Collection title'
        className={styles['admin-collection-form__input']}
        value={collectionTitle}
        onChange={(e) => setCollectionTitle(e.target.value)}
      />

      <div className={styles['admin-form__selectors']}>
        <select
          className={styles['admin-form__select']}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}>
          <option value='movie'>Movie</option>
          <option value='tv'>TV Series</option>
        </select>

        <select
          className={styles['admin-form__select']}
          value={posterOrientation}
          onChange={(e) => setPosterOrientation(e.target.value)}>
          <option value='vertical'>Vertical Poster</option>
          <option value='horizontal'>Horizontal Poster</option>
        </select>
      </div>

      <div className={styles['admin-form__tmdb-search']}>
        <input
          type='text'
          placeholder='Search for title...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['admin-form__input']}
        />
        <button
          type='button'
          onClick={handleSearchTMDB}
          className={styles['admin-form__search-button']}>
          Search
        </button>
      </div>

      <ul className={styles['admin-form__search-results']}>
        {searchResults.map((media) => (
          <li key={media.id} className={styles['admin-form__search-result']}>
            {media.title || media.name}
            <button
              type='button'
              onClick={() => {
                const imagePath =
                  posterOrientation === 'horizontal'
                    ? media.backdrop_path
                    : media.poster_path;
                setMediaItems([
                  ...mediaItems,
                  {
                    id: media.id,
                    title: media.title || media.name,
                    image: `https://image.tmdb.org/t/p/w500${imagePath}`,
                    type: searchType,
                  },
                ]);
              }}
              className={styles['admin-form__add-from-search-button']}>
              Add
            </button>
          </li>
        ))}
      </ul>

      {mediaItems.length > 0 && (
        <div className={styles['admin-form__preview-row']}>
          {mediaItems.map((item, index) => (
            <div key={index} className={styles['admin-form__preview-item']}>
              <img
                src={item.image}
                alt={item.title}
                className={
                  posterOrientation === 'horizontal'
                    ? styles['admin-form__image--horizontal']
                    : styles['admin-form__image--vertical']
                }
              />
              <button
                type='button'
                className={styles['admin-form__remove-button']}
                onClick={() =>
                  setMediaItems(mediaItems.filter((_, i) => i !== index))
                }>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type='submit'
        className={styles['admin-collection-form__submit-button']}>
        Save Collection
      </button>

      {messageError && (
        <p className={styles['admin-collection-form__message-error']}>
          {messageError}
        </p>
      )}
      {messageSuccess && (
        <p className={styles['admin-collection-form__message-success']}>
          {messageSuccess}
        </p>
      )}
    </form>
  );
}

export default AdminForm;
