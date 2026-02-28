const sampleListings = [

{
title:"Luxury Beach Villa",
description:"Beautiful luxury villa with private beach access.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505691938895-1758d7feb511"},
price:3200,
location:"Bali",
country:"Indonesia",
category:"Trending",
geometry:{type:"Point",coordinates:[115.1889,-8.4095]}
},

{
title:"Cozy Mountain Cabin",
description:"Quiet cabin surrounded by mountains and forest.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1501785888041-af3ef285b470"},
price:1100,
location:"Manali",
country:"India",
category:"Mountains",
geometry:{type:"Point",coordinates:[77.1887,32.2432]}
},

{
title:"Lake Side Cottage",
description:"Peaceful cottage beside a crystal clear lake.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"},
price:900,
location:"Lake Tahoe",
country:"USA",
category:"Trending",
geometry:{type:"Point",coordinates:[-120.0324,39.0968]}
},

{
title:"Modern City Apartment",
description:"Stylish apartment in the heart of the city.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1493809842364-78817add7ffb"},
price:1500,
location:"Dubai",
country:"UAE",
category:"Iconic Cities",
geometry:{type:"Point",coordinates:[55.2708,25.2048]}
},

{
title:"Luxury Penthouse",
description:"Penthouse with amazing skyline views.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"},
price:4000,
location:"New York",
country:"USA",
category:"Rooms",
geometry:{type:"Point",coordinates:[-74.006,40.7128]}
},

{
title:"Beach Hut",
description:"Simple and cozy hut right on the beach.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"},
price:700,
location:"Goa",
country:"India",
category:"Trending",
geometry:{type:"Point",coordinates:[73.8567,15.2993]}
},

{
title:"Desert Dome Stay",
description:"Unique dome stay in the desert.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"},
price:1800,
location:"Dubai Desert",
country:"UAE",
category:"Domes",
geometry:{type:"Point",coordinates:[55.2708,24.4539]}
},

{
title:"Luxury Castle Stay",
description:"Historic castle with royal interiors.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60"},
price:5000,
location:"Edinburgh",
country:"Scotland",
category:"Castles",
geometry:{type:"Point",coordinates:[-3.1883,55.9533]}
},

{
title:"Farmhouse Retreat",
description:"Stay in nature with animals and farms.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1469474968028-56623f02e42e"},
price:800,
location:"Punjab",
country:"India",
category:"Farms",
geometry:{type:"Point",coordinates:[75.3412,31.1471]}
},

{
title:"Camping Under Stars",
description:"Camping experience with beautiful night sky.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"},
price:600,
location:"Rishikesh",
country:"India",
category:"Camping",
geometry:{type:"Point",coordinates:[78.2676,30.0869]}
},

{
title:"Igloo Stay",
description:"Stay in an ice igloo in arctic environment.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1519681393784-d120267933ba"},
price:2200,
location:"Lapland",
country:"Finland",
category:"Arctic",
geometry:{type:"Point",coordinates:[25.7482,66.5039]}
},

{
title:"Luxury Boat House",
description:"Beautiful boat stay with sea view.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21"},
price:1900,
location:"Kerala",
country:"India",
category:"Boats",
geometry:{type:"Point",coordinates:[76.2711,9.9312]}
},

{
title:"Infinity Pool Villa",
description:"Private villa with infinity pool.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60"},
price:3500,
location:"Phuket",
country:"Thailand",
category:"Amazing Pools",
geometry:{type:"Point",coordinates:[98.3381,7.8804]}
},

{
title:"City Skyline Apartment",
description:"Apartment with skyline city view.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1494526585095-c41746248156"},
price:1700,
location:"Singapore",
country:"Singapore",
category:"Iconic Cities",
geometry:{type:"Point",coordinates:[103.8198,1.3521]}
},

{
title:"Swiss Mountain Chalet",
description:"Luxury chalet in Swiss Alps.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"},
price:2800,
location:"Zermatt",
country:"Switzerland",
category:"Mountains",
geometry:{type:"Point",coordinates:[7.7491,46.0207]}
},

{
title:"Japanese Minimal House",
description:"Minimal modern house in Japan.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1505691938895-1758d7feb511"},
price:2100,
location:"Tokyo",
country:"Japan",
category:"Rooms",
geometry:{type:"Point",coordinates:[139.6917,35.6895]}
},

{
title:"Treehouse Stay",
description:"Stay high in the trees surrounded by forest.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1501785888041-af3ef285b470"},
price:1200,
location:"Kerala",
country:"India",
category:"Trending",
geometry:{type:"Point",coordinates:[76.2711,10.8505]}
},

{
title:"Santorini Cliff Villa",
description:"White villa overlooking the sea.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21"},
price:3400,
location:"Santorini",
country:"Greece",
category:"Trending",
geometry:{type:"Point",coordinates:[25.4615,36.3932]}
},

{
title:"Luxury Ski Resort Cabin",
description:"Warm cozy cabin near ski resort.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1469474968028-56623f02e42e"},
price:2000,
location:"Colorado",
country:"USA",
category:"Mountains",
geometry:{type:"Point",coordinates:[-105.7821,39.5501]}
},

{
title:"Maldives Water Villa",
description:"Overwater villa with ocean view.",
image:{filename:"listingimage",url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"},
price:4500,
location:"Maldives",
country:"Maldives",
category:"Trending",
geometry:{type:"Point",coordinates:[73.2207,3.2028]}
},

];

module.exports = { data: sampleListings };