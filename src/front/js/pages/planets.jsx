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
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState(store.favorites.map(item => item.name));

  // Estado para gestionar los íconos individuales
  const [icons, setIcons] = useState(store.users.reduce((acc, item) => {
    acc[item.name] = "fa-solid fa-book-journal-whills";
    return acc;
  }, {}));

  const staticImage = (name) => {
    setIcons(prevIcons => ({
      ...prevIcons,
      [name]: "fa-solid fa-book-journal-whills"
    }));
  };

  const movingImage = (name) => {
    setIcons(prevIcons => ({
      ...prevIcons,
      [name]: "fa-solid fa-book-journal-whills fa-flip"
    }));
  };

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

  const handleUser = (url) => {
    actions.settingUserUrl(url);
  };

  return (
      <div className="container px-4 py-5 text-centered">
        <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView="auto"
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 80, modifier: 2.5, slideShadows: true,
        }}
        autoplay={{ delay: 3000,  disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10,
          },
          768: { slidesPerView: 3, spaceBetween: 20,
          },
          1024: { slidesPerView: 4, spaceBetween: 40,
          },
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
                    <figure className="card-img-top m-0" >
                      <Link to={`/detail-planets/${item.uid}`} onClick={() => handlePlanet(item.url)}><img className="img-fluid" loading="lazy" src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} alt="https://starwars-visualguide.com/assets/img/placeholder.jpg"
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = e.target.alt; 
                      }}/></Link>
                    </figure>

                    <div className="card-body border bg-white p-4">
                      <div className="entry-header mb-3">
                        <h2 className="card-title entry-title h4 mb-0 text-center">
                          <a className="link-dark text-decoration-none">{item.name}
                            </a>
                        </h2>
                      </div>
                      <p className="card-text entry-summary text-justify" >
                        "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star..."
                        <div className="text-end">
                        <button className="btn btn-outline-warning" onMouseOut={() => staticImage(item.name)} onMouseOver={() => movingImage(item.name)} onClick={() => toggleFavorite(item.name)}>
                          <i className={icons[item.name]} /></button>
                        </div>
                      </p>
                    </div>
                </div>
                </article>
              </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
  );
};