/**
 * Данные городов Польши.
 * 
 * Каждый город содержит:
 * - id: уникальный идентификатор
 * - name: название города
 * - coordinates: географические координаты (широта и долгота)
 * 
 * @module cities
 */

import type { City } from '../../types';

export const cities: City[] = [
  {
    id: 1,
    name: 'Варшава',
    coordinates: {
      lat: 52.2297,
      lng: 21.0122
    }
  },
  {
    id: 2,
    name: 'Краков',
    coordinates: {
      lat: 50.0647,
      lng: 19.9450
    }
  },
  {
    id: 3,
    name: 'Вроцлав',
    coordinates: {
      lat: 51.1079,
      lng: 17.0385
    }
  },
  {
    id: 4,
    name: 'Познань',
    coordinates: {
      lat: 52.4064,
      lng: 16.9252
    }
  },
  {
    id: 5,
    name: 'Гданьск',
    coordinates: {
      lat: 54.3520,
      lng: 18.6466
    }
  },
  {
    id: 6,
    name: 'Лодзь',
    coordinates: {
      lat: 51.7592,
      lng: 19.4559
    }
  }
]; 