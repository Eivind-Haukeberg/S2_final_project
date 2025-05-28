import { useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../../components/AdminForm/AdminForm.css';

function AdminCollectionForm() {
  const [collectionTitle, setCollectionTitle] = useState();
  const [mediaItems, setMediaItems] = useState([{ title: '', image: '' }]);
  const [messageSuccess, setMessageSuccess] = useState();
  const [messageError, setMessageError] = useState();

  const handleMediaItemChange = (index, value) => {
    const updatedItems = [mediaItems];
    updatedItems[index] = value;
    setMediaItems();
  };

  const handleAddMediaItem = (mediaItems) => {
    setMediaItems([mediaItems, { title: '', image: '' }]);
  };

  const handleSubmitCollection = async (e) => {
    e.preventDefault();

    if (!collectionTitle || mediaItems.some(() => !item.title || !item.image)) {
      setMessageError('All fields must be filled out');
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
      setMessageError();
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

      {mediaItems.map((item, index) => (
        <div key={index} className='admin-collection-form__media-item-group'>
          <input
            type='text'
            placeholder='Movie or series title'
            className='admin-collection-form__input'
            value={item.title}
            onChange={(e) =>
              handleMediaItemChange(index, 'title', e.target.value)
            }
          />
          <input
            type='text'
            placeholder='Image URL'
            className='admin-collection-form__input'
            value={item.image}
            onChange={(e) =>
              handleMediaItemChange(index, 'image', e.target.value)
            }
          />
        </div>
      ))}

      <button
        type='button'
        className='admin-collection-form__add-button'
        onClick={handleAddMediaItem}>
        + Add Media Item
      </button>

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
