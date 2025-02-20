import './404.css';
import notFoundImage from '../notfound.png'; 

const NotFound = () => {
  return (
    <div class="not-found">
      <h1>404</h1>
      <img src={notFoundImage} alt="Not Found" class="not-found-image" />
      <a href="/" class="home-link">Go Back Home</a>
    </div>
  );
};

export default NotFound;