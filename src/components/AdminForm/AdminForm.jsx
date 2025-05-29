import { useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../../components/AdminForm/AdminForm.css';
import { searchMovies } from '../../services/tmdbService';

function AdminCollectionForm() {
  const [collectionTitle, setCollectionTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTMDB = async () => {
    try {
      const data = await searchMovies(searchQuery);
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
        Søk etter filmer eller serier fra TMDB
      </h3>

      <div className='admin-form__tmdb-search'>
        <input
          type='text'
          placeholder='Skriv filmnavn...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='admin-form__input'
        />
        <button
          type='button'
          onClick={handleSearchTMDB}
          className='admin-form__search-button'>
          Søk
        </button>
      </div>

      <ul className='admin-form__search-results'>
        {searchResults.map((movie) => (
          <li key={movie.id} className='admin-form__search-result'>
            {movie.title}
            <button
              type='button'
              onClick={() => {
                setMediaItems([
                  ...mediaItems,
                  {
                    title: movie.title,
                    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  },
                ]);
              }}
              className='admin-form__add-from-search-button'>
              Legg til
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
