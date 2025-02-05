import 'react-multi-carousel/lib/styles.css';
import '../App.css';

import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export const NewItemsCarousel: React.FC = () => {
  const { products: newItems, loading, error } = useFetchProducts({ query: 'new=true' });

  return (
    <div className="carousel-container">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carouselitem"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        partialVisbile={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        showDots
        swipeable
      >
        {newItems.map((product) => (
          <div key={product.productId} className="carousel-card">
            <Link to={`/products/${product.productId}`}>
              <img src={product.img} alt={product.name} className="carousel-card-img" />
            </Link>
            <div className="carousel-card-info">
              <h5 className="carousel-card-title">{product.name}</h5>
              <p className="carousel-card-price">{product.price} DKK</p>
              <p className="carousel-card-brand">{product.brand}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
