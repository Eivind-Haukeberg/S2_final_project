// ----- COMPONENT PURPOSE ----->
// This component displays a horizontal scrollable row of media items within a collection.
// It allows users to view each item and add it to their personal list with feedback.

import styles from './CollectionRow.module.css';
import { useState } from 'react';
import { addToUserList } from '../../utilities/addToMyList';
import Button from '../Button/Button';

function CollectionRow({ title, items }) {
  // ----- STATE MANAGEMENT ----->
  // Manages feedback messages for items that were successfully added or failed to be added.
  const [feedback, setFeedback] = useState({});

  // ----- HANDLE ADD TO USER LIST ----->
  // Attempts to add the selected item to the user's list. If successful, displays a temporary success message.
  // If it fails, shows an error message for the corresponding item.
  const handleAdd = async (item) => {
    try {
      await addToUserList(item);
      setFeedback((prev) => ({ ...prev, [item.title]: 'Added to My List' }));

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

  // ----- COMPONENT RENDERING ----->
  // Renders the title of the collection and a horizontal scroll area of media cards.
  // Each card contains an image, title, a link to TMDB, an add button, and conditional feedback.
  return (
    <section className={styles['collection-row']}>
      <h2 className={styles['collection-row__title']}>{title}</h2>
      <div className={styles['collection-row__media-scroll']}>
        {items.map((item, index) => (
          <div className={styles['collection-row__media-card']} key={index}>
            <div className={styles['collection-row__image-wrapper']}>
              <a
                href={`https://www.themoviedb.org/${item.type}/${item.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className={styles['collection-row__link']}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles['collection-row__media-image']}
                />
                <div className={styles['collection-row__media-title']}>
                  {item.title}
                </div>
              </a>

              <Button
                type='button'
                variant='mylist'
                onClick={() => handleAdd(item)}
                className='button--mylist'>
                +
              </Button>
            </div>

            {feedback[item.title] && (
              <p className={styles['collection-row__feedback-message']}>
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
