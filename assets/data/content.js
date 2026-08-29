/* ============================================================
   Morning Breakfast Delight — site content
   ------------------------------------------------------------
   This is the only file you need to edit for routine updates:
   weekly specials, menu items, prices, reviews and order links.

   Both menus are transcribed from source documents — the printed
   menu for the food, the ezCater listing for catering — so nothing
   here is a reconstruction any more. What is still placeholder is
   the chef's biography, marked with `todo: true`.
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
     the other three run a search until their store links exist.
     Those searches use "Early Morning Delight" on purpose: the
     delivery platforms have not been renamed yet, so the new name
     finds nothing there. Switch them once the listings are updated.
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
      url: "https://www.doordash.com/search/store/Early%20Morning%20Delight%20Chicago",
      searchOnly: true
    },
    {
      key: "ubereats", name: "Uber Eats", wordmark: "Uber Eats", brand: "#06c167", fg: "#0b1b12",
      note: "Delivery",
      url: "https://www.ubereats.com/search?q=Early%20Morning%20Delight",
      searchOnly: true
    },
    {
      key: "postmates", name: "Postmates", wordmark: "Postmates", brand: "#ffee00", fg: "#161616",
      note: "Delivery",
      url: "https://postmates.com/search?q=Early%20Morning%20Delight",
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
      name: "Mateo's Crepe",
      desc: "Two crepes filled with strawberries, strawberry mascarpone and bananas, topped with Nutella and chocolate syrup.",
      price: "$16.00",
      img: "assets/img/special-berries-crepes.jpg",
      alt: "Crepes drizzled with Nutella and raspberry sauce, topped with whipped cream, blackberries and blueberries, surrounded by fresh berries",
    },
    {
      badge: "Fan favorite",
      name: "Waffle Sandwich",
      desc: "Scrambled eggs, bacon, green onions and mixed cheddar between two waffles. Gluten-free option available.",
      price: "$17.95",
      img: "assets/img/special-waffle-breakfast.jpg",
      alt: "Waffle sandwich stacked with scrambled eggs and bacon, served with roasted breakfast potatoes and an orange slice"
    },
    {
      badge: "Chef's pick",
      name: "Breakfast Chorizo",
      desc: "Avocado and eggs mixed with chorizo, caramelized onion, roasted poblano pepper, tomatoes, chihuahua cheese and queso fresco, topped with chipotle and sour cream on sourdough.",
      price: "$16.95",
      img: "assets/img/special-avocado-waffle.jpg",
      alt: "Avocado toast piled with chorizo and roasted peppers under a crema drizzle, with avocado halves alongside"
    }
  ];

  /* ---- Chef ----------------------------------------------- */
  const chef = {
    name: "Efrain de Paz",
    role: "Chef & Owner",
    photo: "assets/img/chef.jpg",
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
     Transcribed from the restaurant's printed menu (the PDF in the
     project notes). Prices and wording come from that document.

     `tags` renders a chip: "veg", "spicy", "favorite", or any free
     text. veg and spicy are read off the descriptions; favorite is
     reserved for the dishes public reviews single out.
  ---------------------------------------------------------- */
  const menu = [
    {
      id: "sweets",
      title: "Sweets",
      blurb: "French toast, crepes, churros and pancakes — the reason people bring a friend.",
      items: [
        { name: "Churros", price: "$17.00", desc: "Three French toast-style churros filled with raspberry, caramel and Nutella, topped with strawberry mascarpone.", tags: ["veg"] },
        { name: "Pancakes (Plain) or French Toast", price: "$6.00", desc: "Single $6.00 · Short stack of two $8.95 · Full stack of three $9.95.", tags: ["veg"] },
        { name: "Cannoli French Toast", price: "$16.95", desc: "Cannoli trio, espresso sauce, cannoli filling, chocolate syrup, raspberry sauce and pistachio.", tags: ["veg"] },
        { name: "Mateo's Crepe", price: "$16.00", desc: "Two crepes filled with strawberries, strawberry mascarpone and bananas, topped with Nutella and chocolate syrup.", tags: ["veg", "favorite"] },
        { name: "Coconut Tres Leches", price: "$16.00", desc: "Caramel, raspberry sauce, strawberry, banana and whipped cream.", tags: ["veg"] },
        { name: "Farah's Cheesecake French Toast", price: "$17.00", desc: "Lemon coulis and raspberry cheesecake filling, topped with graham crackers and raspberry coulis.", tags: ["veg"] },
        { name: "Crispy Crème Brûlée French Toast", price: "$17.00", desc: "Served over French toast, topped with caramelized sugar, bananas and crème brûlée cream sauce, finished with raspberry coulis.", tags: ["veg", "favorite"] },
        { name: "Pancake with Nutella", price: "$16.00", desc: "With strawberry and bananas.", tags: ["veg"] },
        { name: "Cuban French Toast", price: "$17.00", desc: "Guava sauce, raspberry coulis, whipped cream and granola.", tags: ["veg"] },
        { name: "French Toast Flight", price: "$20.00", desc: "Crème brûlée with banana and raspberry coulis · Guava with granola and whipped cream · Cajeta churro with caramel and whipped cream.", tags: ["veg", "favorite"] },
      ]
    },
    {
      id: "sandwiches",
      title: "Sandwiches",
      blurb: "Lunch shows up around eleven and stays until four.",
      items: [
        { name: "Fried Egg Sandwich", price: "$19.50", desc: "Sourdough, feta, ham, bacon, two over-hard eggs, chipotle mayo, sliced tomatoes, avocado and thyme.", tags: ["spicy"] },
        { name: "BLT Sandwich", price: "$17.95", desc: "Lettuce, tomato, bacon and mayonnaise." },
        { name: "Waffle Sandwich", price: "$17.95", desc: "Scrambled eggs, bacon, green onions and mixed cheddar. Gluten-free option available.", tags: ["favorite"] },
        { name: "Dan's Churrasco Sandwich", price: "$23.50", desc: "Grilled steak, smoked chicken sausage, smoked gouda and homemade chimichurri on ciabatta, with Greek fries." },
        { name: "Caribbean Club Sandwich", price: "$17.50", desc: "Bacon, lettuce, tomato, avocado, smoked gouda, chipotle mayo and jerk chicken seasoning, with fries.", tags: ["spicy"] },
        { name: "Croissant Sandwich", price: "$16.95", desc: "Two eggs any style and cheese with your choice of ham, bacon or veggies." },
        { name: "Reuben Sandwich", price: "$19.95", desc: "Homemade Thousand Island, jalapeño sauerkraut, smoked gouda, mustard, two over-hard eggs and corned beef on rye.", tags: ["spicy"] },
        { name: "Gyro Sandwich", price: "$19.95", desc: "Gyro meat, tzatziki, fresh tomatoes, onion and parsley." },
        { name: "Breakfast Burger", price: "$17.95", desc: "Chipotle mayo, lettuce, tomato, grilled onion, fried egg, cheddar and bacon.", tags: ["spicy"] },
      ]
    },
    {
      id: "omelettes",
      title: "Omelettes",
      blurb: "Served with potatoes and toast. Build your own from $10.95 — proteins $4.00, veggies, cheeses and toppings $1.25 each.",
      items: [
        { name: "Salmon Omelette", price: "$18.95", desc: "Capers, caramelized onion, tomato, spinach, avocado, cream cheese and sun-dried tomato." },
        { name: "Veggie Omelette", price: "$18.95", desc: "Caramelized onion, mushrooms, tomato, butternut squash, spinach and goat cheese, topped with a red wine reduction.", tags: ["veg"] },
        { name: "Azteca", price: "$18.95", desc: "Bacon, pork sausage, turkey sausage, jalapeño, chihuahua cheese, caramelized onion, diced tomatoes and queso fresco, topped with green salsa and pico de gallo.", tags: ["spicy"] },
        { name: "Mayan", price: "$18.95", desc: "Chorizo, bell peppers, onion, cilantro, garlic, tomatoes, chihuahua cheese and queso fresco, topped with green salsa and sour cream, with a side of two plantains.", tags: ["spicy"] },
        { name: "Sparta", price: "$18.95", desc: "Scallions, Greek sausage, tomatoes, black olives, spinach, onion and feta, topped with spicy feta cheese.", tags: ["spicy"] },
        { name: "Artichoke", price: "$18.25", desc: "Artichoke, roasted tomatoes, spinach, caramelized onion and goat cheese, topped with pesto.", tags: ["veg"] },
        { name: "Louisiana Omelette", price: "$19.75", desc: "Bell peppers, ham, bacon, chicken sausage, jalapeño, cheddar and onion with pork gravy and two biscuits on top.", tags: ["spicy"] },
        { name: "Chicken Fajita Omelette", price: "$19.75", desc: "Grilled chicken, bell peppers, onion, tomato, jalapeño, chihuahua cheese, sour cream, salsa verde, pico de gallo and avocado on top.", tags: ["spicy"] },
      ]
    },
    {
      id: "skillets",
      title: "Skillets",
      blurb: "Served with potatoes and toast. Cast-iron, loaded to the edge, eggs any style on top.",
      items: [
        { name: "Papi Skillet", price: "$19.75", desc: "Chicken tinga, bell peppers, onion and potatoes with chihuahua cheese and queso fresco, topped with sour cream, avocado, pico de gallo, green salsa and two eggs any style.", tags: ["spicy", "favorite"] },
        { name: "Mr. Pancho", price: "$19.75", desc: "Chorizo, corn, roasted poblano peppers, tomatoes, queso fresco, potatoes and chihuahua cheese, topped with sweet and sour sauce and two eggs any style.", tags: ["spicy"] },
        { name: "Mushroom", price: "$18.00", desc: "White button, portobello and shiitake mushrooms with roasted tomatoes, spinach, potatoes, cream cheese, caramelized onion and fresh mozzarella, topped with sweet and sour sauce and two eggs any style.", tags: ["veg"] },
        { name: "Steak Fajitas", price: "$19.95", desc: "Steak and fajita bell pepper mix with chihuahua cheese, queso fresco, sour cream, potatoes and two eggs any style, topped with green sauce, pico de gallo and avocado." },
        { name: "Malaka", price: "$19.95", desc: "Greek sausage, tomatoes, spinach, olives, caramelized onion and potatoes, topped with spicy feta spread and two eggs any style.", tags: ["spicy"] },
        { name: "Jesus Skillet", price: "$20.95", desc: "Caramelized onions, tomato, sweet potato, butternut squash, spinach, goat cheese, pork belly, mango habanero sauce, bell peppers and two eggs any style.", tags: ["spicy"] },
        { name: "Mr. Vasic Skillet", price: "$20.95", desc: "Smoked sausage, chicken sausage, bacon, ham, cheddar, bell peppers, sweet plantains, caramelized onions, mango habanero sauce and two eggs any style.", tags: ["spicy"] },
      ]
    },
    {
      id: "mexican",
      title: "Mexican Style",
      blurb: "The plates that made the neighborhood pay attention.",
      items: [
        { name: "Birria Plate Consommé", price: "$19.00", desc: "Two birria quesadillas topped with onion and cilantro, served with rice and a cup of consommé.", tags: ["favorite"] },
        { name: "Vegan Chilaquiles", price: "$18.00", desc: "Fried tortilla strips covered with your choice of green or red sauce, topped with tofu, bell peppers, onion and spinach, with a side of potato.", tags: ["veg"] },
        { name: "Steak Chilaquiles", price: "$22.95", desc: "Chilaquiles red or green with two quesadillas, 4 oz steak, queso fresco, avocado, chihuahua cheese, pico de gallo, sour cream, two eggs any style and a side of potato.", tags: ["favorite"] },
        { name: "Poblano Chilaquiles", price: "$19.00", desc: "Fried tortillas covered with your choice of sauce, topped with poblano pepper filled with chorizo, rice, queso fresco and chihuahua cheese, two eggs any style and a side of potato.", tags: ["spicy"] },
        { name: "Mole Enchiladas", price: "$17.95", desc: "Chicken tinga topped with queso fresco, served with two eggs any style and a side of rice. With steak $20.95." },
        { name: "Huevos Rancheros", price: "$20.00", desc: "Fried eggs on crispy corn tortillas, smothered with refried beans and topped with steak, chipotle tomato sauce, queso fresco and sour cream.", tags: ["spicy", "favorite"] },
        { name: "Burrito Delight", price: "$16.95", desc: "Eggs, chorizo, corn, roasted poblano peppers, tomato and queso fresco with red or green sauce on the side, served with a side of potato.", tags: ["spicy"] },
        { name: "Breakfast Burrito", price: "$16.95", desc: "Scrambled eggs, potato, tomato, avocado, chicken sausage, jalapeño, queso fresco and sour cream, with salsa verde on the side.", tags: ["spicy"] },
        { name: "Tex-Mex Tacos (3)", price: "$16.95", desc: "Scrambled egg, bacon, poblano pepper, caramelized onion, corn, potatoes, sour cream, BBQ sauce and queso fresco." },
      ]
    },
    {
      id: "hash",
      title: "Hash & Eggs",
      blurb: "Served with house potatoes.",
      items: [
        { name: "Hash and Eggs", price: "$19.00", desc: "Corned beef slow cooked for 18 hours with seasoned onion and diced potatoes, two eggs any style, served with a side of toast." },
        { name: "Vegan Hash", price: "$19.00", desc: "Seasonal veggies sautéed in a chipotle tomato sauce, topped with tofu scramble and served with toast.", tags: ["veg", "spicy"] },
        { name: "Chorizo Hash", price: "$19.00", desc: "Mexican sausage, poblano, corn, caramelized onion, bacon, diced potatoes, bell pepper, queso fresco and two eggs any style, topped with sour cream and green sauce.", tags: ["spicy"] },
        { name: "Pork Belly Hash", price: "$19.50", desc: "Pork belly, butternut squash, potatoes, sweet plantains, spinach, bell peppers, onion, jalapeño and smoked gouda with two eggs any style, topped with sweet and sour sauce.", tags: ["spicy"] },
        { name: "Veggie Hash", price: "$18.95", desc: "Bell peppers, mushrooms, butternut squash, spinach, broccoli, cauliflower, onions, sun-dried tomato pesto, house potatoes, mixed cheddar and two eggs any style.", tags: ["veg"] },
      ]
    },
    {
      id: "benedict",
      title: "Benedict",
      blurb: "Poached eggs, house hollandaise, and a little more attitude than you expect.",
      items: [
        { name: "Efrain's Benedict", price: "$19.00", desc: "Corned beef and panela cheese with two poached eggs, topped with sun-dried tomato hollandaise.", tags: ["favorite"] },
        { name: "Classic Benedict", price: "$17.00", desc: "Ham, chipotle hollandaise and two poached eggs.", tags: ["spicy"] },
        { name: "Portobello Benedict", price: "$18.00", desc: "Breaded portobello mushroom, sautéed spinach, caramelized onion and roasted tomatoes with chipotle hollandaise and two poached eggs.", tags: ["veg", "spicy"] },
        { name: "Chef's Benedict", price: "$19.00", desc: "Pork belly, grilled jalapeño, caramelized onion and grilled panela cheese with chipotle hollandaise and two poached eggs.", tags: ["spicy", "favorite"] },
        { name: "Smoked Salmon Benedict", price: "$19.95", desc: "Avocado, chipotle hollandaise and two poached eggs.", tags: ["spicy"] },
        { name: "Mango Habanero Crispy Chicken", price: "$19.50", desc: "Brioche loaf, sautéed spinach and tomatoes, tartar sauce, mango habanero hollandaise and two poached eggs.", tags: ["spicy"] },
        { name: "Benedict Flight", price: "$19.95", desc: "Classic with ham and chipotle hollandaise · Salmon with avocado and chipotle hollandaise · Efrain with corned beef, panela cheese and sun-dried tomato hollandaise.", tags: ["favorite"] },
      ]
    },
    {
      id: "wraps",
      title: "Wraps",
      blurb: "Served with your choice of side salad, steamed veggies, fruit, fries or potatoes.",
      items: [
        { name: "Chicken Wrap", price: "$16.95", desc: "Avocado, lettuce, tomato, onion, mango chutney and green salsa." },
        { name: "Steak Wrap", price: "$18.95", desc: "Beans, lettuce, pico de gallo, caramelized onions, queso fresco, chipotle sauce, chihuahua cheese and avocado.", tags: ["spicy"] },
        { name: "Greek Street Wrap", price: "$17.00", desc: "Gyro meat, tzatziki, fresh tomatoes, onion, parsley, fries and spicy feta.", tags: ["spicy"] },
      ]
    },
    {
      id: "combos",
      title: "Combos & Salads",
      blurb: "The plates you order when you know exactly what you want.",
      items: [
        { name: "Morning Combo", price: "$16.00", desc: "Two eggs any style with ham, sausage or bacon, and potatoes or pancakes." },
        { name: "Chicken Biscuit", price: "$18.95", desc: "Two eggs any style, cornflake breaded chicken, three bacon biscuits and a side of pork gravy." },
        { name: "Chicken Waffle", price: "$19.95", desc: "Cornflake breaded chicken, waffle and a side of pork gravy." },
        { name: "Chef's Chopped Salad", price: "$16.95", desc: "Chicken, ham, bacon, tomatoes, green onion, romaine, feta and lemon vinaigrette." },
        { name: "Mr. Broeker Ribeye", price: "$35.00", desc: "Ribeye topped with chimichurri, with potatoes, sweet plantains and two eggs any style." },
      ]
    },
    {
      id: "avocado-toast",
      title: "Avocado Toast",
      blurb: "All on sourdough, all worth the photo.",
      items: [
        { name: "Breakfast Chorizo", price: "$16.95", desc: "Avocado and eggs mixed with chorizo, caramelized onion, roasted poblano pepper, tomatoes, chihuahua cheese and queso fresco, topped with chipotle and sour cream.", tags: ["spicy", "favorite"] },
        { name: "Florentino", price: "$17.95", desc: "Avocado and smoked salmon with spinach, roasted tomatoes, mushrooms, fresh mozzarella, cream cheese, two eggs any style and balsamic glaze." },
        { name: "Derek's Avocado", price: "$17.95", desc: "Salmon, avocado, capers, hard boiled egg, balsamic glaze, pickled onions, sriracha, mayo and feta.", tags: ["spicy"] },
      ]
    },
    {
      id: "kids",
      title: "Kids Menu",
      blurb: "For the smaller appetite at the table.",
      items: [
        { name: "Kids Combo", price: "$12.00", desc: "One egg any style, bacon, sausage and a choice of pancake or French toast, with potatoes or fries." },
        { name: "Kids Quesadilla", price: "$11.00", desc: "Plain cheese quesadilla, served with potatoes or fries.", tags: ["veg"] },
        { name: "Kids Sandwich", price: "$12.00", desc: "Bacon, cheese and egg any style on an English muffin, with potatoes or fries." },
        { name: "Kids Burger", price: "$13.00", desc: "Cheese, lettuce and tomato." },
        { name: "Chicken Fingers", price: "$11.00", desc: "Served with potatoes or fries." },
        { name: "Pancakes (2 pc)", price: "$10.00", tags: ["veg"] },
        { name: "French Toast (2 pc)", price: "$10.00", tags: ["veg"] },
        { name: "Kids Nutella Crepes", price: "$10.00", tags: ["veg"] },
      ]
    },
    {
      id: "appetizers",
      title: "Appetizers",
      blurb: "Something to start, or to share.",
      items: [
        { name: "Biscuits and Gravy", price: "$12.00", desc: "Bacon biscuits with pork sausage gravy." },
        { name: "Beignets", price: "$7.95", tags: ["veg"] },
        { name: "Chicken Tortilla Soup", price: "$8.95", desc: "Avocado and queso fresco." },
      ]
    },
    {
      id: "sides",
      title: "Sides",
      blurb: "Because one more thing never hurt anyone.",
      items: [
        { name: "Waffle", price: "$8.00", tags: ["veg"] },
        { name: "Sweet Plantains", price: "$6.00", tags: ["veg"] },
        { name: "Bacon", price: "$6.50" },
        { name: "Toast", price: "$2.00", tags: ["veg"] },
        { name: "Pork Sausage", price: "$6.50" },
        { name: "English Muffin (1 pc)", price: "$3.00", tags: ["veg"] },
        { name: "Turkey Sausage", price: "$6.50" },
        { name: "French Toast (1 pc)", price: "$5.00", tags: ["veg"] },
        { name: "House Potatoes", price: "$6.00", tags: ["veg"] },
        { name: "One Egg", price: "$3.00", tags: ["veg"] },
        { name: "Avocado", price: "$5.00", tags: ["veg"] },
        { name: "Substitute Egg Whites", price: "$3.00", tags: ["veg"] },
        { name: "Side of Fruit", price: "$5.00", tags: ["veg"] },
        { name: "Chicken Sausage", price: "$6.50" },
        { name: "Fries", price: "$5.00", tags: ["veg"] },
      ]
    },
    {
      id: "drinks",
      title: "Beverages",
      blurb: "The reason it's called Morning Breakfast Delight.",
      items: [
        { name: "Carrot Juice", price: "$5.75", tags: ["veg"] },
        { name: "Orange Juice", price: "$5.75", tags: ["veg"] },
        { name: "Apple Juice", price: "$4.50", tags: ["veg"] },
        { name: "Pink Lemonade", price: "$4.00", tags: ["veg"] },
        { name: "Milk", price: "$4.00", tags: ["veg"] },
        { name: "Mexican Hot Chocolate", price: "$4.50", tags: ["veg"] },
        { name: "Chocolate Milk", price: "$4.00", tags: ["veg"] },
        { name: "Coffee", price: "$4.25", tags: ["veg"] },
        { name: "Cappuccino", price: "$4.75", desc: "Add a flavor for $1.00.", tags: ["veg"] },
        { name: "Lattes", price: "$5.50", desc: "Add a flavor for $1.00.", tags: ["veg"] },
        { name: "Espresso", price: "$4.75", tags: ["veg"] },
        { name: "Iced Coffee", price: "$5.75", tags: ["veg"] },
        { name: "Iced Tea", price: "$5.75", tags: ["veg"] },
        { name: "Arnold Palmer Tea", price: "$5.50", tags: ["veg"] },
        { name: "Hot Tea", price: "$3.75", tags: ["veg"] },
        { name: "Horchata Latte", price: "$5.75", tags: ["veg"] },
        { name: "Horchata Mazapán Latte", price: "$5.75", tags: ["veg"] },
        { name: "Chai Latte", price: "$5.75", tags: ["veg"] },
        { name: "Soda", price: "$3.50", desc: "Sprite, Pepsi, Diet Pepsi or Seven Up.", tags: ["veg"] },
        { name: "Mexican Sodas", price: "$4.00", desc: "Jarritos.", tags: ["veg"] },
        { name: "Smoothies", price: "$5.65", desc: "Guava, berry or mango.", tags: ["veg"] },
        { name: "Virgin Bloody Mary", price: "$5.65", tags: ["veg"] },
      ]
    },
  ];


  /* ---- Catering (ezCater) ----------------------------------
     Transcribed from the restaurant's ezCater listing: section
     order and descriptions from its structured data, prices and
     serving sizes from the page itself. Dietary chips are the ones
     ezCater shows. Items with no serving size are priced per unit
     there, so none is claimed here.
  ---------------------------------------------------------- */
  const catering = {
    orderUrl: "https://www.ezcater.com/catering/early-morning-delight-3",
    facts: [
      { value: "$100", label: "Order minimum, food and drink" },
      { value: "$25+", label: "Delivery fee, by distance" },
      { value: "10–30", label: "Servings per tray, by dish" }
    ],
    sections: [
      {
        id: "cater-skillets",
        title: "Breakfast Skillets",
        blurb: "Full trays of the skillets people already line up for.",
        items: [
          { name: "Mushroom Skillet", price: "$145.00", desc: "Scrambled eggs with mixed mushrooms, roasted tomatoes, spinach, potatoes, caramelized onion, mozzarella cheese, and cream cheese.", tags: ["Serves 15", "veg"] },
          { name: "Malaka Skillet", price: "$145.00", desc: "Scrambled eggs with Greek sausage, tomatoes, spinach, black olives, caramelized onions, potatoes, and feta cheese.", tags: ["Serves 15"] },
          { name: "Steak Fajita Skillet", price: "$145.00", desc: "Scrambled eggs with steak, mix bell pepper, chihuahua cheese, and queso fresco. Served with sour cream, pico de dallo, and salsa verde.", tags: ["Serves 15"] },
          { name: "Papi Skillet", price: "$145.00", desc: "Scrambled eggs with chicken Tinga, bell peppers, onions, and potatoes. Served with sour cream, pico de gallo, and salsa verde.", tags: ["Serves 15"] },
          { name: "Mr. Pancho Skillet", price: "$145.00", desc: "Scrambled eggs with chorizo, corn, roasted poblano peppers, tomatoes, potatoes, chihuahua cheese, and queso fresco.", tags: ["Serves 15"] },
          { name: "Pork Belly Skillet", price: "$145.00", desc: "Scrambled eggs with bell peppers, onions, jalapeños, chihuahua cheese, and queso fresco.", tags: ["Serves 15"] },
        ]
      },
      {
        id: "cater-sandwiches",
        title: "Breakfast Sandwiches & Hashes",
        blurb: "Easy to hand out, easy to eat standing up.",
        items: [
          { name: "Breakfast Sandwich", price: "$12.00", desc: "Your choice of protein, fried egg, and cheddar cheese on your choice of bread." },
          { name: "Hash & Eggs", price: "$145.00", desc: "With corned beef, onion, and diced potatoes.", tags: ["Serves 15"] },
          { name: "Vegan Hash", price: "$145.00", desc: "With mixed veggies, chipotle tomato sauce, and tofu.", tags: ["Serves 15", "Vegan"] },
          { name: "Chorizo Hash", price: "$145.00", desc: "With Mexican sausage, roasted poblanos, corn, caramelized onions, bell pepper, bacon, potatoes, and queso fresco. Served with scrambled eggs, sour cream, and salsa verde.", tags: ["Serves 15"] },
        ]
      },
      {
        id: "cater-sweets",
        title: "Breakfast Sweets",
        blurb: "The part of the spread that disappears first.",
        items: [
          { name: "Fruit Bar", price: "$60.00", desc: "With assorted seasonal fruit.", tags: ["Serves 15", "veg"] },
          { name: "Beignets", price: "$55.00", desc: "With Mexican caramel sauce, espresso vanilla cream sauce, raspberry sauce, and powdered sugar.", tags: ["Serves 30", "veg"] },
          { name: "Yogurt Fruit Bar", price: "$60.00", desc: "With mixed fruit, granola, and plain yogurt.", tags: ["Serves 15", "veg"] },
          { name: "French Toast", price: "$65.00", desc: "Served with syrup and butter.", tags: ["Serves 10", "veg"] },
        ]
      },
      {
        id: "cater-sides",
        title: "Breakfast Sides",
        blurb: "Priced per person, to round out the table.",
        items: [
          { name: "Bacon", price: "$2.75" },
          { name: "House Potatoes", price: "$55.00", tags: ["Serves 30", "veg"] },
          { name: "Turkey Sausage", price: "$2.75" },
          { name: "Pork Sausage", price: "$2.75" },
          { name: "Chicken Sausage", price: "$2.75" },
        ]
      },
      {
        id: "cater-italian",
        title: "Italian Entrees",
        blurb: "For lunch meetings and evening events.",
        items: [
          { name: "Chicken Marsala", price: "$160.00", desc: "Golden pan-fried chicken cutlets and mushrooms in a rich Marsala wine sauce.", tags: ["Serves 15"] },
          { name: "Spaghetti Marinara W/ Seafood", price: "$130.00", desc: "Seafood marinara mix with prawns, shrimp, calamari, fish, and mussels tossed in tomato sauce.", tags: ["Serves 15"] },
          { name: "Chicken Vesuvio", price: "$160.00", desc: "Crispy chicken pieces, potato wedges, garlic, onion, and white wine.", tags: ["Serves 15"] },
          { name: "Lasagna", price: "$120.00", desc: "With a creamy ricotta cheese mixture, meat sauce, and mozzarella cheese.", tags: ["Serves 15"] },
          { name: "Cheesy Garlic Bread", price: "$60.00", desc: "Cheese and soft bread on the inside with a crunchy crust on the outside.", tags: ["Serves 15", "veg"] },
          { name: "Spaghetti & Meatballs", price: "$120.00", desc: "Homemade Italian-style pasta sauce with beef meatballs.", tags: ["Serves 15"] },
          { name: "Chicken Alfredo Pasta", price: "$160.00", desc: "Drenched in an ultra-rich and creamy sauce, topped with strips of seared chicken.", tags: ["Serves 15"] },
          { name: "Mostaccioli", price: "$160.00", desc: "Tender pasta tossed in Italian meat sauce, topped with a combination of creamy ricotta, Parmesan, and mozzarella cheeses.", tags: ["Serves 15"] },
        ]
      },
      {
        id: "cater-tacos",
        title: "Tacos",
        blurb: "Build-your-own goes over well with a crowd.",
        items: [
          { name: "Build-Your- Own Taco Bar", price: "$25.00", desc: "Everything you need to build your own tacos including, corn & flour tortillas, steak, pastor, tinga, beans, rice, guacamole, queso fresco, chihuahua cheese, verde & roja salsas, onions, cilantro, romaine lettuce, and pico de gallo. Served with chips." },
        ]
      },
      {
        id: "cater-wraps",
        title: "Wraps",
        blurb: "Priced per person, easy to hand round.",
        items: [
          { name: "Tofu Wrap", price: "$11.00", tags: ["veg"] },
          { name: "Chicken Wrap", price: "$11.00", desc: "With grilled chicken, lettuce, tomatoes, onions, mango chutney, guacamole, and salsa verde." },
          { name: "Fish Wrap", price: "$11.00", desc: "With seasoned tilapia." },
        ]
      },
      {
        id: "cater-beverages",
        title: "Beverages",
        blurb: "Coffee travels. So does the orange juice.",
        items: [
          { name: "Coffee", price: "$31.00", desc: "Your choice of coffee type.", tags: ["Serves 10"] },
          { name: "Gallon Orange Juice", price: "$31.00", tags: ["Serves 10"] },
        ]
      },
    ]
  };


  return { business, ordering, social, specials, chef, reviews, menu, catering };
})();
