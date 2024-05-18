import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// Swiper importations
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

// Feature icono favoritos girando onMouseOver
export const Planets = () => {
  const [status, setStatus] = useState({ icon: "fa-solid fa-book-journal-whills" });
  const staticImage = () => setStatus({ icon: "fa-solid fa-book-journal-whills" });
  const movingImage = () => setStatus({ icon: "fa-solid fa-book-journal-whills fa-flip" });

  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState(store.favorites.map(item => item.name));

  const toggleFavorite = (name) => {
      if (favorites.includes(name)) {
          const updatedFavorites = favorites.filter(item => item !== name);
          setFavorites(updatedFavorites);
          actions.removeFavorite(name);
      } else {
          setFavorites([...favorites, name]);
          actions.addFavorites({ name });
      }
  };
  
  const isFavorite = (name) => favorites.includes(name);

  const handlePlanet = (url) => {
      actions.settingPlanetUrl(url);
  };

  return (
      <div className="container px-4 py-5 text-centered">
      <Swiper modules={[EffectCoverflow,]} effect="coverflow" grabCursor={true} centeredSlides={true} loop={true} slidesPerView="auto"
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 150, modifier: 2.5, slideShadows: true,
        }}
        breakpoints={{ 640: { slidesPerView: 1, spaceBetween: 20, },
          768: { slidesPerView: 3, spaceBetween: 40, },
          1024: { slidesPerView: 4, spaceBetween: 50, },
        }}>
        {/* <!-- Slider Swiper Container --> */}
        <div className="swiper bsb-blog-pro-2">
          {/* <!-- Additional required wrapper --> */}
          <div className="swiper swiper-wrapper mb-5 mb-sm-6">
            {/* <!-- Slide 1 --> */}
            {store.planets.map((item, index) => (
            <SwiperSlide  key={index}>
            <article>
              <div className="card border-0">
                  {/* Imagen a mostrar con un fadein  */}
                  <figure className="card-img-top m-0 overflow-hidden bsb-overlay-hover" >
                    <img className="img-fluid bsb-scale bsb-hover-scale-up" loading="lazy" src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} alt="..." />
                    <figcaption>
                    <Link to={`/detail-planets/${item.uid}`} onClick={() => handlePlanet(item.url)}><h4 className="h6 text-white bsb-hover-fadeInRight mt-2">Read More</h4></Link>
                    </figcaption>
                  </figure>

                  <div className="card-body border bg-white p-4">
                    <div className="entry-header mb-3">
                      <h2 className="card-title entry-title h6 mb-0 text-center">
                        <a className="link-dark text-decoration-none">{item.name}
                          </a>
                      </h2>
                    </div>
                    <p className="card-text entry-summary text-justify" >
                      "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star..."
                      <div className="text-end">
                        <button className="btn btn-outline-warning" onMouseOut={staticImage} onMouseOver={movingImage}onClick={() => toggleFavorite(item.name)}><i className={status.icon} /></button>
                      </div>
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
            ))}
            {/* <!-- If we need pagination --> */}
            <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
              <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
              <span className="swiper-pagination-bullet"></span>
              <span className="swiper-pagination-bullet"></span>
              <span className="swiper-pagination-bullet"></span>
            </div>
          </div>
        </div>
      </Swiper>
      </div>
  );
};