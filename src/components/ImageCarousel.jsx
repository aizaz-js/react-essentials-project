import { useState } from 'react';

const IMAGES = [
  'https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?s=612x612&w=0&k=20&c=jlYes8ZfnCmD0lLn-vKvzQoKXrWaEcVypHnB5MuO-g8=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUMUVPn2cXm6LoK0Mqldcllu2Llv7gIRIljvMRX3BooDjZBk6pDD6z3ecSXnTJOp80Tw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTth84Iso836tHtcuWD3zGFbi0vH0JcY8VThZzU-SZfu9I26Dwnl1WSt5vB4Q-zQhBAJpo&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLaN09Pz67miOz_XZHz9RJvEhYyC-C09uZ69-40fPyWjxIEcXAErOvdpGeziGaYMNxSU&usqp=CAU',
  'https://blog-media.byjusfutureschool.com/bfs-blog/2022/08/03035002/Article-Image-945%C3%97498.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnzzQTn7J6uEVVGjwLtR9IZZL_1AJ0KOYYwD5tlacEoMf4Y6Paq5f8SDN9mhduX4evABY&usqp=CAU',
  'https://blog-media.byjusfutureschool.com/bfs-blog/2022/08/03035002/Article-Image-945%C3%97498.jpg',
  'https://i.guim.co.uk/img/media/d059b58efe8ce50d15639f76448becdeec69bc9b/0_184_7200_4320/master/7200.jpg?width=465&dpr=1&s=none&crop=none',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvBcTw4lyRIPEJkYAW3UqxpJK_eVJbXDenYMSFYnhjlYOjh73QP-u1WoqywRkogNdGFc&usqp=CAU',
  'https://images.squarespace-cdn.com/content/v1/63d40fe2cbd65e16cb8098b6/1678437282243-XL1EAF7FXW1KFY61HJ5V/why%2Blearn%2Bto%2Bcode.jpg',
];

export function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  function handleNextClick() {
    setCurrentImage(prev => (prev + 1) % IMAGES.length);
  }

  function handlePrevClick() {
    setCurrentImage(prev => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  }

  return (
    <div className="image-container">
      <button onClick={handleNextClick}>Next</button>
      {IMAGES.map((image, index) => (
        <img key={index} className={`${index === currentImage ? 'visible' : 'hidden'}`} src={image} alt="" />
      ))}

      {/* <img src={IMAGES[currentImage]} alt="" /> */}
      <button onClick={handlePrevClick}>Previous</button>
    </div>
  );
}
