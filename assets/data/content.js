/* ============================================================
   Morning Breakfast Delight — site content
   ------------------------------------------------------------
   This is the only file you need to edit for routine updates:
   weekly specials, menu items, prices, reviews and order links.

   VERIFICATION FLAG
   Items carrying `todo: true` were reconstructed from public
   listings (Toast / ezCater / Yelp aggregators) and their price
   or wording still needs a check against the live menu.
   Remove the flag once confirmed. See README.md.
   ============================================================ */

window.MBD = (function () {
  "use strict";

  /* ---- Business ------------------------------------------- */
  const business = {
    name: "Morning Breakfast Delight",
    formerName: "Early Morning Delight",
    tagline: "Breakfast with a Mexican heart",
    address: "1924 W Irving Park Rd, Chicago, IL 60613",
    neighborhood: "North Center, Chicago",
    phone: "(872) 206-2610",
    phoneHref: "tel:+18722062610",
    mapsQuery: "1924+W+Irving+Park+Rd,+Chicago,+IL+60613",
    rating: 4.9,
    reviewCount: 200,
    hours: [
      { day: "Monday",    open: "8:00 AM", close: "4:00 PM", idx: 1 },
      { day: "Tuesday",   open: "8:00 AM", close: "4:00 PM", idx: 2 },
      { day: "Wednesday", open: "8:00 AM", close: "4:00 PM", idx: 3 },
      { day: "Thursday",  open: "8:00 AM", close: "4:00 PM", idx: 4 },
      { day: "Friday",    open: "8:00 AM", close: "4:00 PM", idx: 5 },
      { day: "Saturday",  open: "7:00 AM", close: "4:00 PM", idx: 6 },
      { day: "Sunday",    open: "7:00 AM", close: "4:00 PM", idx: 0 }
    ]
  };

  /* ---- Ordering platforms ---------------------------------
     Rendered as small logo tiles. `url` is where the tile links.
     Toast and Grubhub point at the restaurant's real store pages;
     the other three point at that platform's search until the
     store links exist — paste them in and nothing else changes.
     `brand` is the tile color, `wordmark` the text drawn on it.
     To use a platform's official artwork instead, add
     `logo: "assets/img/order-<name>.svg"` and it takes over.
  ---------------------------------------------------------- */
  const ordering = [
    {
      key: "toast", name: "Toast", wordmark: "Toast", brand: "#ff4c00", fg: "#ffffff",
      note: "Order direct",
      url: "https://earlymorningdelight.toast.site/order/early-morning-delight-1924-w-irving-park-rd"
    },
    {
      key: "doordash", name: "DoorDash", wordmark: "DoorDash", brand: "#ff3008", fg: "#ffffff",
      note: "Delivery",
      url: "https://www.doordash.com/search/store/Morning%20Breakfast%20Delight%20Chicago",
      searchOnly: true
    },
    {
      key: "ubereats", name: "Uber Eats", wordmark: "Uber Eats", brand: "#06c167", fg: "#0b1b12",
      note: "Delivery",
      url: "https://www.ubereats.com/search?q=Morning%20Breakfast%20Delight",
      searchOnly: true
    },
    {
      key: "postmates", name: "Postmates", wordmark: "Postmates", brand: "#ffee00", fg: "#161616",
      note: "Delivery",
      url: "https://postmates.com/search?q=Morning%20Breakfast%20Delight",
      searchOnly: true
    },
    {
      key: "grubhub", name: "Grubhub", wordmark: "Grubhub", brand: "#f63440", fg: "#ffffff",
      note: "Delivery",
      url: "https://www.grubhub.com/restaurant/early-morning-delight-1924-w-irving-park-rd-chicago/5645664"
    }
  ];

  /* ---- Social --------------------------------------------- */
  const social = [
    { key: "facebook",  name: "Facebook",  url: "https://www.facebook.com/mbdchicago/" },
    { key: "instagram", name: "Instagram", url: "https://www.instagram.com/mbdchicago/" },
    { key: "tiktok",    name: "TikTok",    url: "" }
  ];

  /* ---- Special of the week --------------------------------
     Swap these three every week. First one is the wide tile.
     Images live in assets/img/ — keep them ~1600px wide.
  ---------------------------------------------------------- */
  const specials = [
    {
      badge: "This week's headliner",
      name: "Berries & Nutella Crepes",
      desc: "Two golden crepes rolled with mascarpone, layered with strawberries, blueberries and blackberries, ribboned with Nutella and raspberry coulis, finished with fresh whipped cream and powdered sugar.",
      price: "$16.95",
      img: "assets/img/special-1.svg",
      photoPending: true,
      alt: "Crepes with berries, Nutella and whipped cream on a white plate",
      todo: true
    },
    {
      badge: "Fan favorite",
      name: "Waffle Breakfast Stack",
      desc: "Cheddar-buttermilk waffles stacked with scrambled eggs, bacon and hash browns, served with our house-roasted breakfast potatoes.",
      price: "$15.75",
      img: "assets/img/special-2.svg",
      photoPending: true,
      alt: "Waffle breakfast sandwich stacked with eggs and bacon, with roasted potatoes",
      todo: true
    },
    {
      badge: "Chef's pick",
      name: "Avocado Waffle Benedict",
      desc: "A savory waffle base with avocado, roasted tomato and crisp bacon, topped with two eggs any style and a balsamic drizzle.",
      price: "$16.50",
      img: "assets/img/special-3.svg",
      photoPending: true,
      alt: "Savory waffle topped with avocado, bacon and two fried eggs with balsamic drizzle",
      todo: true
    }
  ];

  /* ---- Chef ----------------------------------------------- */
  const chef = {
    name: "Efrain de Paz",
    role: "Chef & Owner",
    photo: "assets/img/placeholder-chef.svg",
    photoPending: true,
    quote: "Breakfast should never be boring. Every plate that leaves my kitchen has something on it that makes you look twice.",
    bio: [
      "Efrain de Paz grew up cooking the way most cooks worth knowing did — beside family, at the stove, long before it was a job. He brought that instinct to Chicago kitchens and spent years working the line before deciding that the meal he cared about most was the one nobody was taking seriously enough.",
      "So he built one around it. Morning Breakfast Delight puts a Mexican heart into breakfast and brunch: chipotle hollandaise on the Benedicts, chilaquiles worth waking up for, skillets loaded the way they should be, and a sweet side that runs from crème brûlée French toast to crepes stacked with berries.",
      "You will usually find him on the line himself, plating, tasting, and sending things back until they are right."
    ],
    facts: [
      { value: "15+", label: "Years cooking" },
      { value: "4.9★", label: "Google rating" },
      { value: "100%", label: "Made in house" }
    ],
    todo: true
  };

  /* ---- Reviews (quotes sourced from public Google/Yelp listings) ---- */
  const reviews = [
    { text: "This might be the best breakfast I've had in Chicago. Super unique menu filled with items that you won't find anywhere else.", source: "Google Review", meta: "Verified diner" },
    { text: "One of the most memorable dining experiences my party and I had. The staff are incredibly nice, the atmosphere is chill and the food is fantastic!", source: "Google Review", meta: "Verified diner" },
    { text: "Fresh, consistent and delicious, in a clean and cozy room. The service is kind, friendly and genuinely knowledgeable about the menu.", source: "Google Review", meta: "Verified diner" },
    { text: "The steak chilaquiles are the star — that salsa verde is unreal. Get the French toast flight for the table while you're at it.", source: "Google Review", meta: "Verified diner" },
    { text: "Highly recommend this place, especially if you've been missing Marmalade. The huevos rancheros and the Burrito Delight are both excellent.", source: "Google Review", meta: "Verified diner" }
  ];

  /* ---- Menu ------------------------------------------------
     Sections render in this order on menu.html.
     tags: "veg" | "spicy" | "favorite" | any free text
  ---------------------------------------------------------- */
  const menu = [
    {
      id: "benedicts",
      title: "Benedicts",
      blurb: "Poached eggs, house hollandaise, and a little more attitude than you expect.",
      items: [
        { name: "Chef's Benedict", price: "$14.65", desc: "Pork belly, grilled jalapeño, caramelized onion and grilled panela cheese under chipotle hollandaise and two poached eggs.", tags: ["favorite", "spicy"] },
        { name: "Efrain Benedict", price: "$14.65", desc: "Corned beef and panela cheese with two poached eggs and sun-dried tomato hollandaise on an English muffin.", tags: ["favorite"], todo: true },
        { name: "Classic Benedict", price: "$13.45", desc: "Ham, two poached eggs and chipotle hollandaise on a toasted English muffin.", todo: true },
        { name: "Portobello Benedict", price: "$14.25", desc: "Breaded portobello, sautéed spinach, caramelized onion and roasted tomato with two poached eggs and chipotle hollandaise.", tags: ["veg"], todo: true }
      ]
    },
    {
      id: "skillets",
      title: "Skillets",
      blurb: "Cast-iron, loaded to the edge, eggs any style on top.",
      items: [
        { name: "Papi Skillet", price: "$15.70", desc: "Tinga, bell peppers, onion and potatoes with Chihuahua cheese and queso fresco, topped with sour cream, guacamole, pico de gallo, salsa verde and two eggs any style.", tags: ["favorite", "spicy"] },
        { name: "Steak Fajita Skillet", price: "$16.75", desc: "Steak and fajita mix with potatoes, Chihuahua cheese and queso fresco, finished with salsa verde, sour cream, pico de gallo, avocado and two eggs any style." },
        { name: "Malaka Skillet", price: "$14.95", desc: "Scrambled eggs with mixed mushrooms, roasted tomato, spinach, potatoes, caramelized onion, mozzarella and cream cheese.", tags: ["veg"], todo: true }
      ]
    },
    {
      id: "mexican",
      title: "From the Mexican Kitchen",
      blurb: "The plates that made the neighborhood pay attention.",
      items: [
        { name: "Poblano Chilaquiles", price: "$16.45", desc: "Crisp tortillas simmered in poblano salsa with queso fresco, crema, red onion and two eggs any style. Add steak or chicken.", tags: ["favorite"], todo: true },
        { name: "Steak Chilaquiles", price: "$18.45", desc: "Our chilaquiles with marinated skirt steak and salsa verde — the one the reviews keep talking about.", tags: ["favorite"], todo: true },
        { name: "Huevos Rancheros", price: "$15.75", desc: "Two eggs over crisp tortillas with ranchero sauce, refried beans, queso fresco and avocado.", todo: true },
        { name: "Birria Plate", price: "$18.95", desc: "Slow-braised birria with consommé for dipping, onion, cilantro and warm tortillas.", tags: ["favorite"], todo: true },
        { name: "Burrito Delight", price: "$15.45", desc: "Eggs, potatoes, cheese and your choice of protein wrapped tight, griddled, and served with salsa and crema.", todo: true },
        { name: "Breakfast Burrito", price: "$14.45", desc: "Scrambled eggs, bacon, potatoes and Chihuahua cheese with pico de gallo.", todo: true }
      ]
    },
    {
      id: "eggs",
      title: "Eggs & Omelettes",
      blurb: "Three eggs, folded around whatever you're in the mood for.",
      items: [
        { name: "Chicken Fajita Omelette", price: "$15.25", desc: "Grilled chicken, peppers, onion and Chihuahua cheese with avocado and pico de gallo.", todo: true },
        { name: "Build-Your-Own Omelette", price: "$12.95", desc: "Three eggs and up to three fillings. Served with breakfast potatoes and toast.", todo: true },
        { name: "Steak & Eggs", price: "$19.45", desc: "Grilled skirt steak with two eggs any style, breakfast potatoes and toast.", todo: true },
        { name: "Two Eggs Any Style", price: "$11.45", desc: "Two eggs, breakfast potatoes, toast, and your choice of bacon, sausage or ham.", todo: true }
      ]
    },
    {
      id: "sweet",
      title: "The Sweet Side",
      blurb: "French toast, crepes, pancakes and waffles — the reason people bring a friend.",
      items: [
        { name: "Crispy Crème Brûlée French Toast", price: "$16.25", desc: "French toast under a torched caramelized sugar crust with bananas and crème brûlée cream sauce.", tags: ["favorite"], todo: true },
        { name: "Crispy Piña Colada French Toast", price: "$15.95", desc: "Coconut-crusted French toast with pineapple, toasted coconut and coconut cream.", todo: true },
        { name: "French Toast Flight", price: "$17.50", desc: "A tasting of the kitchen's French toasts. Made for sharing — or not.", tags: ["favorite"], todo: true },
        { name: "Berries & Nutella Crepes", price: "$16.95", desc: "Two crepes filled with strawberries, strawberry mascarpone and bananas, finished with Nutella and chocolate syrup.", tags: ["favorite"], todo: true },
        { name: "Buttermilk Pancakes", price: "$12.45", desc: "A short stack of three, with butter and warm syrup. Add berries, banana or chocolate chips.", todo: true },
        { name: "Belgian Waffle", price: "$12.95", desc: "Crisp outside, soft inside, with powdered sugar and syrup.", todo: true }
      ]
    },
    {
      id: "handhelds",
      title: "Sandwiches & Handhelds",
      blurb: "Lunch shows up around eleven and stays until four.",
      items: [
        { name: "MBD Burger", price: "$16.45", desc: "Double smash patty with cheddar, lettuce, tomato, onion and house sauce on a brioche bun, with fries.", tags: ["favorite"], todo: true },
        { name: "Breakfast Sandwich", price: "$12.95", desc: "Egg, cheese and your choice of bacon, sausage or ham on a brioche bun or croissant.", todo: true },
        { name: "Chicken Torta", price: "$15.25", desc: "Grilled chicken, refried beans, avocado, jalapeño and crema on telera bread.", todo: true },
        { name: "Breakfast Tacos", price: "$13.45", desc: "Three tacos with scrambled eggs, potatoes, cheese and your choice of protein.", todo: true }
      ]
    },
    {
      id: "sides",
      title: "Sides",
      blurb: "Because one more thing never hurt anyone.",
      items: [
        { name: "Breakfast Potatoes", price: "$5.25", desc: "House-seasoned and roasted crisp.", tags: ["veg"], todo: true },
        { name: "Applewood Bacon", price: "$5.75", desc: "Four thick-cut strips.", todo: true },
        { name: "Chorizo", price: "$5.95", desc: "House chorizo, cooked to order.", tags: ["spicy"], todo: true },
        { name: "Avocado", price: "$3.95", desc: "Sliced fresh.", tags: ["veg"], todo: true },
        { name: "Chicken Tortilla Soup", price: "$8.45", desc: "Cup of our tortilla soup with avocado, crema and tortilla strips.", todo: true },
        { name: "Toast or English Muffin", price: "$3.25", desc: "Buttered, your choice of bread.", tags: ["veg"], todo: true }
      ]
    },
    {
      id: "drinks",
      title: "Coffee & Drinks",
      blurb: "The reason it's called Morning Breakfast Delight.",
      items: [
        { name: "Espresso", price: "$3.75", desc: "Double shot, pulled to order.", todo: true },
        { name: "Latte / Cappuccino", price: "$5.25", desc: "Hot or iced, with your choice of milk.", todo: true },
        { name: "Café de Olla", price: "$4.75", desc: "Traditional Mexican coffee with cinnamon and piloncillo.", todo: true },
        { name: "House Iced Tea", price: "$3.95", desc: "Brewed fresh daily, served over ice with lemon.", tags: ["veg"], todo: true },
        { name: "Fresh Orange Juice", price: "$5.45", desc: "Squeezed to order.", tags: ["veg"], todo: true },
        { name: "Horchata", price: "$4.50", desc: "Rice, cinnamon and vanilla, over ice.", tags: ["veg"], todo: true }
      ]
    }
  ];

  /* ---- Catering (ezCater) ---------------------------------- */
  const catering = {
    orderUrl: "https://www.ezcater.com/catering/early-morning-delight-3",
    facts: [
      { value: "15", label: "People served by each tray" },
      { value: "24 hrs", label: "Typical lead time on large orders" },
      { value: "Delivery", label: "Setup and delivery across Chicagoland" }
    ],
    sections: [
      {
        id: "cater-skillets",
        title: "Breakfast Skillets",
        blurb: "Full trays, each serving about 15 people.",
        items: [
          { name: "Malaka Skillet Tray", price: "$145.00", desc: "Scrambled eggs with mixed mushrooms, roasted tomato, spinach, potatoes, caramelized onion, mozzarella and cream cheese.", tags: ["Serves 15", "veg"] },
          { name: "Steak Fajita Skillet Tray", price: "$145.00", desc: "Steak and fajita mix with potatoes, Chihuahua cheese, queso fresco, salsa verde, sour cream and pico de gallo.", tags: ["Serves 15"] },
          { name: "Mushroom Skillet Tray", price: "$145.00", desc: "Mixed mushrooms, spinach, roasted tomato and potatoes with scrambled eggs and melted cheese.", tags: ["Serves 15", "veg"] }
        ]
      },
      {
        id: "cater-sandwiches",
        title: "Breakfast Sandwiches & Hashes",
        blurb: "Easy to hand out, easy to eat standing up.",
        items: [
          { name: "Breakfast Sandwich Platter", price: "$135.00", desc: "Assorted egg and cheese sandwiches on brioche and croissants with bacon, sausage and ham.", tags: ["Serves 15"], todo: true },
          { name: "Corned Beef Hash Tray", price: "$145.00", desc: "House corned beef hash with potatoes, peppers and onion.", tags: ["Serves 15"], todo: true }
        ]
      },
      {
        id: "cater-sweets",
        title: "Breakfast Sweets",
        blurb: "The part of the spread that disappears first.",
        items: [
          { name: "French Toast Tray", price: "$125.00", desc: "Thick-cut French toast with butter, syrup and fresh berries on the side.", tags: ["Serves 15"], todo: true },
          { name: "Pancake Tray", price: "$115.00", desc: "Buttermilk pancakes with butter and warm syrup.", tags: ["Serves 15", "veg"], todo: true },
          { name: "Fresh Fruit Platter", price: "$85.00", desc: "Seasonal fruit, cut fresh that morning.", tags: ["Serves 15", "veg"], todo: true }
        ]
      },
      {
        id: "cater-sides",
        title: "Breakfast Sides",
        blurb: "Round out the table.",
        items: [
          { name: "Breakfast Potatoes Tray", price: "$65.00", desc: "House-seasoned roasted potatoes.", tags: ["Serves 15", "veg"], todo: true },
          { name: "Bacon & Sausage Tray", price: "$85.00", desc: "Applewood bacon and house sausage links.", tags: ["Serves 15"], todo: true },
          { name: "Scrambled Eggs Tray", price: "$75.00", desc: "Fluffy scrambled eggs, kept hot.", tags: ["Serves 15", "veg"], todo: true }
        ]
      },
      {
        id: "cater-tacos",
        title: "Tacos & Wraps",
        blurb: "Build-your-own goes over well with a crowd.",
        items: [
          { name: "Breakfast Taco Bar", price: "$135.00", desc: "Scrambled eggs, potatoes, cheese, chorizo and chicken with warm tortillas, salsas and crema.", tags: ["Serves 15"], todo: true },
          { name: "Wrap Platter", price: "$125.00", desc: "Assorted breakfast and lunch wraps, cut and arranged.", tags: ["Serves 15"], todo: true }
        ]
      },
      {
        id: "cater-italian",
        title: "Italian Entrees",
        blurb: "For lunch meetings that run long.",
        items: [
          { name: "Baked Pasta Tray", price: "$135.00", desc: "Baked pasta in house marinara with mozzarella and fresh basil.", tags: ["Serves 15", "veg"], todo: true },
          { name: "Chicken Parmesan Tray", price: "$155.00", desc: "Breaded chicken cutlets with marinara and melted mozzarella.", tags: ["Serves 15"], todo: true }
        ]
      },
      {
        id: "cater-beverages",
        title: "Beverages",
        blurb: "Coffee travels. So does the iced tea.",
        items: [
          { name: "Coffee Traveler", price: "$28.00", desc: "96 oz of house coffee with cups, cream and sugar.", tags: ["Serves 12"], todo: true },
          { name: "Fresh Orange Juice Carafe", price: "$32.00", desc: "Squeezed that morning.", tags: ["Serves 10", "veg"], todo: true },
          { name: "Iced Tea Gallon", price: "$24.00", desc: "House-brewed, with lemon and cups.", tags: ["Serves 12", "veg"], todo: true }
        ]
      }
    ]
  };

  return { business, ordering, social, specials, chef, reviews, menu, catering };
})();
