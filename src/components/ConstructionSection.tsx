// import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './ConstructionSection.css';

const ConstructionSection = () => {
  const projects = [
    {
      image: '/images/dom.jpg',
      title: 'Современное жилье',
      description: 'Строительство современных жилых комплексов с использованием передовых технологий'
    },
    {
      image: '/images/ssomedom.jpg',
      title: 'Коммерческая недвижимость',
      description: 'Разработка и реализация проектов коммерческой недвижимости'
    },
    {
      image: '/images/kits.webp',
      title: 'Промышленное строительство',
      description: 'Строительство промышленных объектов и складов'
    },
    {
      image: '/images/anons_mat.png',
      title: 'Ремонт и отделка',
      description: 'Качественный ремонт и отделка помещений любой сложности'
    }
  ];

  return (
    <section className="construction-section">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Наши строительные проекты
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="swiper-container"
        >
          <Swiper
            modules={[EffectFade, Autoplay, Pagination, Parallax]}
            effect="fade"
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            parallax={true}
            className="construction-swiper"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="project-slide">
                  <div 
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="project-overlay">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="project-title"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="project-description"
                      >
                        {project.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default ConstructionSection; 