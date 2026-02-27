const sampleListings = [
{
title: "Cozy Beachfront Cottage",
description:
"Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
},
price: 1500,
location: "Malibu",
country: "United States",
geometry: {
type: "Point",
coordinates: [-118.7798, 34.0259],
},
},

{
title: "Modern Loft in Downtown",
description:
"Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
},
price: 1200,
location: "New York City",
country: "United States",
geometry: {
type: "Point",
coordinates: [-74.006, 40.7128],
},
},

{
title: "Mountain Retreat",
description:
"Unplug and unwind in this peaceful mountain cabin surrounded by nature.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
},
price: 1000,
location: "Aspen",
country: "United States",
geometry: {
type: "Point",
coordinates: [-106.8175, 39.1911],
},
},

{
title: "Historic Villa in Tuscany",
description:
"Experience the charm of Tuscany in this beautifully restored villa.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
},
price: 2500,
location: "Florence",
country: "Italy",
geometry: {
type: "Point",
coordinates: [11.2558, 43.7696],
},
},

{
title: "Secluded Treehouse Getaway",
description:
"Live among the treetops in this unique treehouse retreat.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
},
price: 800,
location: "Portland",
country: "United States",
geometry: {
type: "Point",
coordinates: [-122.6765, 45.5231],
},
},

{
title: "Beachfront Paradise",
description:
"Step out of your door onto the sandy beach in this beachfront condo.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
},
price: 2000,
location: "Cancun",
country: "Mexico",
geometry: {
type: "Point",
coordinates: [-86.8515, 21.1619],
},
},

{
title: "Rustic Cabin by the Lake",
description:
"Spend your days fishing and kayaking on the serene lake.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
},
price: 900,
location: "Lake Tahoe",
country: "United States",
geometry: {
type: "Point",
coordinates: [-120.0324, 39.0968],
},
},

{
title: "Luxury Penthouse with City Views",
description:
"Indulge in luxury living with panoramic city views.",
image: {
filename: "listingimage",
url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
},
price: 3500,
location: "Los Angeles",
country: "United States",
geometry: {
type: "Point",
coordinates: [-118.2437, 34.0522],
},
},
];

module.exports = { data: sampleListings };
