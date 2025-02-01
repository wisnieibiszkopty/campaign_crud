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
