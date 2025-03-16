import './404.css';
import notFoundImage from '../notfound.webp'; 

const NotFound = () => {
  return (
    <div class="not-found">
      <h1>404</h1>
      <img src={notFoundImage} alt="Not Found" class="not-found-image" />
      <a href="/" class="home-link">الصفحة الرئيسية</a>
    </div>
  );
};

export default NotFound;