import '../styles/CollectionRow.css';

function CollectionRow({ title, items }) {
  return (
    <section className='collection-row'>
      <h2 className='collection-row__title'>{title}</h2>
      <div className='collection-row__media-scroll'>
        {items.map((item, index) => (
          <div className='collection-row__media-card' key={index}>
            <img
              src={item.image}
              alt={item.title}
              className='collection-row__media-image'
            />
            <p className='collection-row__media-title'>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CollectionRow;
