import styles from './CollectionRow.module.css';
import { useState } from 'react';
import { addToUserList } from '../../utilities/addToMyList';
import Button from '../Button/Button';

function CollectionRow({ title, items }) {
  const [feedback, setFeedback] = useState({});

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

  return (
    <section className={styles['collection-row']}>
      <h2 className={styles['collection-row__title']}>{title}</h2>
      <div className={styles['collection-row__media-scroll']}>
        {items.map((item, index) => (
          <div className={styles['collection-row__media-card']} key={index}>
            <a
              href={`https://www.themoviedb.org/${item.type}/${item.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className={styles['collection-row__link']}>
              <img
                src={item.image}
                alt={item.title}
                className={styles['collection-row__image']}
              />
            </a>

            <Button
              type='button'
              variant='add-small'
              onClick={() => handleAdd(item)}>
              Add to My List
            </Button>

            {feedback[item.title] && (
              <p className={styles['collection-row__feedback']}>
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
