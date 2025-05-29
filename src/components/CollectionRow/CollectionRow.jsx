import './CollectionRow.css';
import { useState } from 'react';
import { addToUserList } from '../../utilities/addToMyList';

function CollectionRow({ title, items }) {
  const [feedback, setFeedback] = useState({});

  const handleAdd = async (item) => {
    try {
      await addToUserList(item);
      setFeedback((prev) => ({ ...prev, [item.title]: '✅ Added' }));

      setTimeout(() => {
        setFeedback((prev) => {
          const copy = { ...prev };
          delete copy[item.title];
          return copy;
        });
      }, 2000);
    } catch (error) {
      setFeedback((prev) => ({ ...prev, [item.title]: error.message }));
    }
  };

  return (
    <section className='collection-row'>
      <h2 className='collection-row__title'>{title}</h2>
      <div className='collection-row__media-scroll'>
        {items.map((item, index) => (
          <div className='collection-row__media-card' key={index}>
            <a
              href={`https://www.themoviedb.org/${item.type}/${item.id}`}
              target='_blank'
              className='collection-row__media-link'>
              <img
                src={item.image}
                alt={item.title}
                className='collection-row__media-image'
              />
              <p className='collection-row__media-title'>{item.title}</p>
            </a>

            <button
              className='collection-row__add-button'
              onClick={() => handleAdd(item)}>
              Legg til i min liste
            </button>

            {feedback[item.title] && (
              <p className='collection-row__feedback-message'>
                {feedback[item.title]}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CollectionRow;
