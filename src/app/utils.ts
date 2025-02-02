import {Campaign} from './types';

export function id(){
  return Math.random().toString(36).substring(2, 8);
}

export function getCities(){
  return [
    {name: 'London'},
    {name: 'New York'},
    {name: 'Sydney'},
    {name: 'Tokyo'},
    {name: 'Paris'},
    {name: 'Berlin'},
  ];
}

export function getKeywords(){
  return [
    'sustainable',
    'eco-friendly',
    'handmade',
    'premium quality',
    'organic',
    'innovative design',
    'limited edition',
    'customizable',
    'artisan crafted',
    'high performance',
    'certified',
    'durable',
    'exclusive production',
    'patented technology',
    'high efficiency',
    'low environmental impact',
    'trendy'
  ];
}

export function mockCampaigns(): Campaign[]{
  return [
    {
      id: 'X5B2D',
      name: 'Sustainable Fashion Campaign',
      keywords: ['sustainable', 'eco-friendly', 'premium quality'],
      bidAmount: 200,
      fund: 7000,
      status: true,
      town: 'London',
      radius: 40
    },
    {
      id: 'A9K3P',
      name: 'Organic Product Launch',
      keywords: ['organic', 'handmade', 'artisan crafted'],
      bidAmount: 180,
      fund: 4000,
      status: false,
      town: 'New York',
      radius: 30
    },
    {
      id: 'T4G8L',
      name: 'Innovative Design Promotion',
      keywords: ['innovative design', 'high performance', 'limited edition'],
      bidAmount: 250,
      fund: 9000,
      status: true,
      town: 'Berlin',
      radius: 60
    },
    {
      id: 'M2Q1X',
      name: 'Exclusive Production Ad',
      keywords: ['exclusive production', 'patented technology', 'durable'],
      bidAmount: 300,
      fund: 15000,
      status: true,
      town: 'Paris',
      radius: 45
    },
    {
      id: 'H7C9S',
      name: 'Customizable Product Sale',
      keywords: ['customizable', 'bulk production', 'high efficiency'],
      bidAmount: 350,
      fund: 12000,
      status: false,
      town: 'Tokyo',
      radius: 50
    }
  ];
}
