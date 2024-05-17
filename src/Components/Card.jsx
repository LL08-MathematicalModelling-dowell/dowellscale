import './style.css'

const Card = ({question, link1, link2, link3, image}) => {

  const handleButtonClick = (link) => {
    window.open(link, '_blank'); // Opens the link in a new tab
  };
  return (
    <div className='card'>
      <img className='cardImage' src={image} alt='Doodle' />
      <div className='cardCoponent'>
        <h3 className='cardHead'>{question}</h3>
          <div className='emojis'>
            <div onClick={() =>handleButtonClick(link1)} className='emoji'>😡No</div>
            <div onClick={() =>handleButtonClick(link2)} className='emoji'>😔Maybe</div>
            <div onClick={() =>handleButtonClick(link3)} className='emoji'>😃Yes</div>
          </div>
      </div>
    </div>
  )
}

export default Card
