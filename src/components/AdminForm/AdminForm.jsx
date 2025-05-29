import { useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../../components/AdminForm/AdminForm.css';
import { searchMedia } from '../../services/tmdbService';

function AdminCollectionForm() {
  const [collectionTitle, setCollectionTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('movie');

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
      await addDoc(collection(db, 'collections'), {
        title: collectionTitle,
        items: mediaItems,
      });
      setMessageSuccess('Collection saved successfully!');
      setCollectionTitle('');
      setMediaItems([{ title: '', image: '' }]);
      setMessageError(null);
    } catch (error) {
      setMessageError('Failed to save collection: ' + error.message);
    }
  };

  return (
    <form className='admin-collection-form' onSubmit={handleSubmitCollection}>
      <h2 className='admin-collection-form__heading'>Create New Collection</h2>

      <input
        type='text'
        placeholder='Collection title'
        className='admin-collection-form__input'
        value={collectionTitle}
        onChange={(e) => setCollectionTitle(e.target.value)}
      />

      <h3 className='admin-form__section-heading'>
        Search for movies and series through TMDB
      </h3>

      <div className='admin-form__tmdb-search'>
        <select
          className='admin-form__select'
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
          className='admin-form__input'
        />
        <button
          type='button'
          onClick={handleSearchTMDB}
          className='admin-form__search-button'>
          Search
        </button>
      </div>

      <ul className='admin-form__search-results'>
        {searchResults.map((media) => (
          <li key={media.id} className='admin-form__search-result'>
            {media.title || media.name}
            <button
              type='button'
              onClick={() => {
                setMediaItems([
                  ...mediaItems,
                  {
                    id: media.id,
                    title: media.title || media.name,
                    image: `https://image.tmdb.org/t/p/w500${media.poster_path}`,
                    type: searchType,
                  },
                ]);
              }}
              className='admin-form__add-from-search-button'>
              Add
            </button>
          </li>
        ))}
      </ul>

      <button type='submit' className='admin-collection-form__submit-button'>
        Save Collection
      </button>

      {messageError && (
        <p className='admin-collection-form__message-error'>{messageError}</p>
      )}
      {messageSuccess && (
        <p className='admin-collection-form__message-success'>
          {messageSuccess}
        </p>
      )}
    </form>
  );
}

export default AdminCollectionForm;
