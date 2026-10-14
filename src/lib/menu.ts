// Transcribed exactly from the restaurant's printed menus (Chances R Menu 5/2026 and Breakfast Menu 6/7/2026,
// the PDFs on chancesryork.com). Names, descriptions and prices as printed. `star` marks the items the printed
// menu flags with an asterisk for the consumer advisory.

import type { ArtName } from "@/components/MenuArt";

export type Price = { label?: string; price: string };
export type MenuItem = {
  name: string;
  desc?: string;
  price?: string; // single price, or "Market Price"
  prices?: Price[]; // sub-lines (cuts, stacks, add-ons) or wine columns
  star?: boolean;
};
export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  boxed?: boolean; // printed inside a tinted panel
  art?: ArtName; // the printed menu's drawing beside this heading
  columns?: string[]; // column headers for wine-style tables
  items: MenuItem[];
  list?: string[]; // plain lists (deli case, brunch spread)
  footer?: string;
};
export type MenuTab = { id: string; label: string; intro?: string; sections: MenuSection[] };

const MP = "Market Price";

export const dinner: MenuTab = {
  id: "dinner",
  label: "Lunch & Dinner",
  intro:
    "All dinners are served with your choice of Soup Du Jour or Freshly Tossed Greens, Warmed Sour Dough Rolls and your choice of Potato (Really Real Mashed, Hash Browns, French Fries, Baked, Rice Pilaf or Steamed Vegetables).",
  sections: [
    {
      id: "beef-country",
      art: "steak",
      title: "Beef Country",
      boxed: true,
      note: "We Char-Broil our Steaks to give them that Great Outdoor Flavor. All Steaks are Choice Cuts of Nebraska Beef, specially aged for Just The Right Flavor. Steaks are topped with Onion Fritters or Garlic Butter, if you like.",
      items: [
        { star: true, name: "Chances “R” Sirloin (12 oz.)", desc: "The Perfect Steak. A thick cut of Top Sirloin Char-Broiled to your liking", price: MP },
        { star: true, name: "New York Strip (13 oz.)", desc: "The Butcher’s Choice Char-Broiled to Perfection", price: MP },
        { star: true, name: "Filet Mignon (8 oz.)", desc: "Wrapped in Bacon. Thick and Flavorful", price: MP },
        { star: true, name: "T-Bone Steak (20 oz.)", desc: "Big and Thick. For the Hungry", price: MP },
        { star: true, name: "Top Sirloin (6 oz.)", desc: "A perfect Steak for the Petite Appetite", price: MP },
        {
          star: true,
          name: "Prime Rib",
          desc: "Slow Cooked for Tenderness. Highly Seasoned for extra Flavor. Served with our Special Sauteed Mushrooms, if you like.",
          prices: [
            { label: "Regular Cut", price: MP },
            { label: "Husker Cut", price: MP },
          ],
        },
      ],
    },
    {
      id: "out-of-the-blue",
      art: "seafood",
      title: "Out of the Blue",
      items: [
        { name: "Jumbo Shrimp", desc: "Golden Fried Shrimp. We prepare our own. Served with a Tangy Cocktail Sauce", price: "27.45" },
        { name: "Halibut Steak", desc: "Broiled or Breaded. Served with Tartar Sauce", price: "30.95" },
        { star: true, name: "Grilled Filet of Salmon", desc: "Served with dill sauce", price: "24.95" },
        { name: "Mountain Trout", desc: "Fresh from the clear Mountain Streams. Deep fried to a Golden Brown", price: "20.95" },
        { name: "Lobster Tail", desc: "2-6 oz. South African Coldwater Tail Light, Fluffy and Tender. Served with Drawn Butter", price: "55.95" },
        { name: "Shrimp Scampi", desc: "Jumbo Shrimp Baked in Fresh Garlic Butter, Shallots and Topped with a Seasoned Breading", price: "27.45" },
        { star: true, name: "Steak & Shrimp", desc: "Char-Broiled Top Sirloin and Jumbo Fried Shrimp. The Best of Both", price: MP },
        { star: true, name: "Steak & Lobster", desc: "Char-Broiled Top Sirloin and One 6 oz. Lobster Tail", price: MP },
      ],
    },
    {
      id: "r-specialties",
      art: "ribs",
      title: "“R” Specialties",
      boxed: true,
      items: [
        {
          name: "“R” Famous Country Pan Fried Chicken",
          desc: "Our Family Recipe. 3 Pieces of Tender, Juicy Chicken. Served with Homemade Mashed Potatoes and Chicken Gravy or your Choice of Potato",
          price: "16.85",
          prices: [{ label: "All White Dinner - 2 Pieces", price: "18.85" }],
        },
        { name: "Barbecued Pork Ribs", desc: "Country Style, Rich, Thick and Tender Pork Ribs", price: "18.75" },
        { name: "Country Chicken Fried Steak", desc: "Absolutely the Very Best Anywhere. Homemade Cream Gravy served on the side at your request", price: "19.70" },
        {
          star: true,
          name: "Pork Chops",
          desc: "Two - 8 oz. Pork Chops. Choice of Char-Broiled or Breaded on the Grill. Served with Apple Sauce and Homemade Mashed Potatoes with Cream Gravy or your choice of Potato",
          price: "19.50",
        },
        { name: "Roast Beef Dinner", desc: "Tender and Juicy. Roasted Fresh Daily. Served with Savory Brown Gravy", price: "17.20" },
        { star: true, name: "Hamburger Steak", desc: "10 oz. of Freshly Ground Chuck. Char-Broiled to your liking", price: "17.20" },
      ],
    },
    {
      id: "pastas",
      art: "pasta",
      title: "Pleasing Pastas",
      note: "All pasta is served with Fresh Tossed Greens and Homemade Garlic Bread.",
      items: [
        { name: "Spaghetti", desc: "Our Chef has a Special Recipe with a Rich Tomato Sauce, Mushrooms, Meats and Just The Right Seasonings", price: "15.20" },
        {
          name: "Fettucine Alfredo",
          desc: "A Thick Italian Noodle Coated with a Smooth, Rich Sauce made from Parmesan & Romano Cheese, Cream, Butter and Delicate Seasonings",
          price: "16.50",
          prices: [{ label: "With Grilled Chicken", price: "19.50" }],
        },
      ],
    },
    {
      id: "daily-features",
      title: "Daily Features",
      boxed: true,
      note: "Served Monday thru Friday 11:00 a.m. to 3:00 p.m. Chef’s Luncheon Specials.",
      items: [
        { name: "Roast Beef", desc: "(roasted fresh daily) with Rich Brown Gravy", price: "12.45" },
        { name: "Roast Pork", desc: "(roasted fresh daily) with Applesauce", price: "12.45" },
        { star: true, name: "Hamburger Steak", desc: "(10 oz. freshly ground beef)", price: "12.95" },
        { name: "Country Pan Fried Chicken", desc: "(3 Pieces) with Cream Gravy", price: "13.95" },
        { star: true, name: "Businessman’s Luncheon Steak", desc: "(6 oz. Sirloin) (served with Salad, French Fries, Spaghetti & Garlic Bread)", price: "19.95" },
        { name: "Experience our Hob Nob Soup/Salad Bar", desc: "(served Monday thru Friday 11:00 a.m. to 2:00 p.m.)", price: "11.75" },
      ],
      footer: "Luncheon specials include: Soup or Salad, Mashed Potatoes, Seasoned Vegetables, Hot Rolls & Butter.",
    },
    {
      id: "beginning-pleasures",
      art: "shrimp-cocktail",
      title: "Beginning Pleasures",
      boxed: true,
      items: [
        { name: "Chilled Shrimp Cocktail", desc: "Colossal Shrimp served with Tangy Cocktail Sauce", price: "15.45" },
        { name: "Escargot", desc: "Baked with Garlic-Herb Butter and topped with Imported Cheese", price: "12.50" },
        { name: "Shrimp Melt", price: "12.50" },
        { name: "Buffalo Chicken Wings", price: "10.75" },
        { name: "Super Nacho Platter", desc: "The Best. A favorite for sharing with friends", price: "14.45" },
        { name: "Fried Zucchini", desc: "Garden Fresh, Breaded & Fried", price: "10.25" },
        { name: "Breaded Mushrooms", desc: "Fresh, hand-breaded", price: "10.25" },
        { name: "Vegetable Combo", desc: "A Combination of fried Mushrooms and Zucchini", price: "10.25" },
        { name: "Poppers", desc: "Jalapeno Peppers filled with Cream Cheese & rolled in bread crumbs", price: "10.45" },
        { name: "Onion Rings", desc: "Homemade. You’ll be Pleasantly Surprised", price: "10.25" },
        { name: "Cheddar Cheese Curds", price: "10.25" },
      ],
    },
    {
      id: "soups-salads",
      art: "salad",
      title: "Super Soups & Salads",
      boxed: true,
      note: "“R” Homemade Salad Dressings are French, Blue Cheese, Thousand Island and Ranch.",
      items: [
        {
          name: "Caesar Salad",
          desc: "Hearts of Romaine tossed with “R” Classic Dressing, topped with Fresh Croutons and Parmesan Cheese",
          price: "12.70",
          prices: [{ label: "Terrific With Grilled Chicken Breast", price: "15.70" }],
        },
        { name: "Spinach Salad", desc: "Fresh Leafy Spinach with Sliced Mushrooms, Egg, Bacon, Croutons, Onions, and Pimentos Served with Hot Bacon Dressing and a Fresh Muffin", price: "12.70" },
        { name: "Chef’s Salad", desc: "A Feast of Greens and Other Wonderful Things. The Chef takes Special Pride in This One", price: "12.70" },
        { name: "Chicken Teriyaki Salad", desc: "An Array of Mixed Tossed Greens with Warm Strips of Marinated Chicken Breast with a Honey Mustard Dressing and a Fresh Muffin", price: "13.50" },
        { name: "Dinner Salad", desc: "A Healthy Bit of Greens to start with. Choice of Dressing", price: "5.50" },
        { name: "Soup Du Jour (Soup Of The Day)", desc: "All Soups are Homemade with the Freshest Ingredients", price: "5.50" },
        { name: "French Onion Soup", desc: "Baked with a Large Crouton and topped with Melted Swiss Cheese and Green Onion", price: "7.25" },
        { name: "Vegetable", desc: "We use Large Chunks of Fresh Vegetables and Beef. Tastes Just Like Mom’s", price: "5.50" },
        { name: "Bean Soup", desc: "Chunks of Ham and Beans. An Old Favorite", price: "5.50" },
      ],
    },
    {
      id: "basket-cases",
      art: "chicken",
      title: "Basket Cases",
      note: "Basket Dinners are served with French Fries and Warm Sour Dough Rolls.",
      items: [
        { name: "Chicken In The Basket", desc: "Same Great Pan Fried Chicken. Our Family Recipe", price: "13.75" },
        { name: "Shrimp In The Basket", desc: "Breaded Shrimp prepared our own Delectable Way", price: "23.00" },
      ],
    },
    {
      id: "burgers",
      art: "burger",
      title: "Burgers",
      note: "All Burgers are served with French Fries and Dill Pickle Chips.",
      items: [
        { star: true, name: "Big “R” Burger", desc: "10 oz. of Freshly Ground Char-Broiled Beef topped with Tomato, Lettuce and Onion", price: "12.70" },
        {
          star: true,
          name: "Great American Burger",
          desc: "10 oz. of Freshly Ground Char-Broiled Beef. Served open-faced on Grilled Sour Dough Bread Covered with Sauteed Onions, Mushrooms, and Hot Cheddar Cheese Sauce",
          price: "13.50",
        },
        { star: true, name: "Hamburger Deluxe", desc: "5 oz. of Freshly Ground Beef served with your choice of garnish", price: "10.50" },
        {
          star: true,
          name: "Cheeseburger Deluxe",
          desc: "5 oz. of Freshly Ground Beef with Melted Cheese served with your choice of garnish",
          price: "11.00",
          prices: [
            { label: "With Bacon", price: "12.00" },
            { label: "Sauteed Mushroom", price: "12.00" },
          ],
        },
        { star: true, name: "Patty Melt", desc: "A Juicy Beef Patty topped with Melted American and Swiss Cheese, Grilled Onion and Tomato on a Grilled Marble Rye Bread", price: "11.70" },
      ],
    },
    {
      id: "sandwiches",
      title: "Sandwiches",
      note: "Sandwiches are served with French Fries & a Dill Pickle Spear except Hot Beef.",
      items: [
        {
          star: true,
          name: "Prime Rib Sandwich “Nebraska Choice”",
          desc: "Roasted Daily. Served open-faced on Grilled Sour Dough Bread. Served with a Creamy Horseradish Sauce",
          price: "18.75",
        },
        {
          name: "Beef Sour Dough Melt",
          desc: "Thinly sliced fresh roasted beef, stacked high on Grilled Sour Dough Bread. Topped with Melted Swiss Cheese and Sauteed Onion. Served with a Creamy Horseradish Sauce",
          price: "12.50",
        },
        { name: "Reuben Sandwich Supreme", desc: "Big and delicious. Sliced Corned Beef, Swiss Cheese, Sauerkraut and Special Dressing on Grilled Marble Rye", price: "12.50" },
        { name: "French Dip Sandwich", desc: "Abundance of fresh roasted beef, thinly sliced, piled on a French Roll with Au Jus", price: "13.05" },
        { name: "Chicken Teriyaki Sandwich", desc: "Marinated in a Special Sauce topped with Melted Swiss Cheese served on a Grilled Bun. Ah - so very good", price: "12.20" },
        {
          name: "Pork Tenderloin",
          desc: "Fresh Nebraska Pork Breaded and Grilled just right",
          price: "11.50",
          prices: [{ label: "With American cheese and sauteed onions", price: "12.50" }],
        },
        { name: "Chances “R” Club", desc: "A Triple-decker of Crisp Bacon, sliced Breast of Turkey, Swiss Cheese, fresh Tomatoes, Lettuce and Mayonnaise on Toasted Bread", price: "13.00" },
        { name: "Hot Beef", desc: "Served with Homemade Mashed Potatoes and Gravy", price: "10.45" },
        { name: "Bacon, Lettuce & Tomato", desc: "An old favorite. Served on Toasted Bread", price: "10.70" },
      ],
    },
    {
      id: "croissants",
      title: "Croissant Delights",
      note: "Light ’n Flaky Butter Croissant Sandwiches are served with a Pasta Salad and Fresh Fruit.",
      items: [
        { name: "Turkey", desc: "Piled high with thin slices of Turkey, Crisp Bacon, Swiss Cheese, Tomato and Lettuce", price: "13.20" },
        { name: "Chicken Salad", desc: "Chunky Chicken Salad with Sliced Almonds for just the right touch. Tomatoes and Lettuce complete this sandwich", price: "13.20" },
        { name: "Crab Salad", desc: "A real delicacy served with Lettuce and Tomato. A Favorite combination", price: "13.20" },
        { name: "Ham & Cheese", desc: "Thin sliced Ham topped with melted Swiss Cheese", price: "13.20" },
      ],
    },
    {
      id: "on-the-side",
      art: "sides",
      title: "On the Side",
      items: [
        { name: "Loaded Baked Potato", price: "5.85" },
        { name: "Hash Browns", desc: "We use Fresh Potatoes", price: "4.25", prices: [{ label: "Topped with American Cheese", price: "4.95" }] },
        { name: "French Fries", price: "4.25" },
        { name: "Spaghetti", desc: "Side Order with our Homemade Meat Sauce", price: "6.95" },
        { name: "Garlic Bread (2 Pieces)", price: "3.95" },
        { name: "Sauteed Mushrooms", desc: "Made our own Special Way", price: "4.95" },
        { name: "Steamed Vegetables", price: "4.45" },
        { name: "Fresh Fruit", price: "6.25" },
      ],
    },
    {
      id: "final-flings",
      art: "pastries",
      title: "Final Flings",
      boxed: true,
      note: "Fresh from our Bake Shoppe. Wonderful Assortment of Gourmet Pastries & Cakes.",
      items: [
        { name: "Mud Pie", price: "7.25" },
        { name: "Cheesecake", price: "6.95" },
        { name: "Carrot Cake", price: "6.95" },
        { name: "Bakers Choice – Torte Cake", price: "6.95" },
        { name: "Homemade Pies", price: "4.75" },
        {
          name: "Ice Cream or Sherbert",
          prices: [
            { label: "2-Dip", price: "3.50" },
            { label: "1-Dip", price: "2.50" },
          ],
        },
      ],
    },
    {
      id: "wet-your-whistle",
      art: "mug",
      title: "Wet Your Whistle",
      items: [
        { name: "Root Beer Float", price: "5.95" },
        { name: "Soda", desc: "Pepsi, Diet Pepsi, Sierra Mist, Root Beer, Mountain Dew", price: "2.95" },
        { name: "Milk/Chocolate Milk", price: "2.95" },
        { name: "Hot Tea", price: "2.95" },
        { name: "Iced Tea (Brewed Fresh)", price: "2.95" },
        { name: "Lemonade", price: "2.95" },
      ],
    },
  ],
};

export const lounge: MenuTab = {
  id: "lounge",
  label: "Hob-Nob Lounge",
  intro: "Dining without wine is like living without love.",
  sections: [
    {
      id: "hobnob-favorites",
      title: "Hobnob Favorites",
      boxed: true,
      columns: ["Glass", "Bottle"],
      items: [
        { name: "Cabernet", prices: [{ price: "6.95" }, { price: "29.00" }] },
        { name: "Chardonnay", prices: [{ price: "6.95" }, { price: "29.00" }] },
        { name: "Merlot", prices: [{ price: "6.95" }, { price: "29.00" }] },
        { name: "Shiraz", prices: [{ price: "6.95" }, { price: "29.00" }] },
        { name: "Pinot Noir", prices: [{ price: "7.50" }, { price: "30.00" }] },
      ],
    },
    {
      id: "house-wines",
      title: "House Wines",
      columns: ["Glass", "½ Carafe", "Carafe"],
      items: [
        { name: "White Zinfandel", prices: [{ price: "6.25" }, { price: "11.75" }, { price: "25.00" }] },
        { name: "Riunite Lambrusco", prices: [{ price: "6.25" }, { price: "11.75" }, { price: "" }] },
        { name: "Moscato", prices: [{ price: "6.75" }, { price: "" }, { price: "" }] },
      ],
    },
    {
      id: "white-wines",
      title: "White Wines",
      columns: ["Bottle", "Glass"],
      items: [
        { name: "Santa Margherita Pinot Grigio", desc: "Smooth and aromatic. Perfect with chicken or fish.", prices: [{ price: "39.00" }, { price: "9.00" }] },
        { name: "Chateau St. Michelle Johannisberg Riesling", desc: "Slightly sweet, soft elegant varietal.", prices: [{ price: "30.00" }, { price: "7.00" }] },
        { name: "William Hill Chardonnay", desc: "Refreshing and crisp with a hint of French Oak.", prices: [{ price: "35.00" }, { price: "9.00" }] },
        { name: "Kendall Jackson Chardonnay", prices: [{ price: "30.00" }, { price: "7.00" }] },
      ],
    },
    {
      id: "red-wines",
      title: "Red Wines",
      columns: ["Bottle", "Glass"],
      items: [
        { name: "Frontera Merlot Cabernet Blend", desc: "Want the best of both worlds? This is a winner.", prices: [{ price: "29.00" }, { price: "7.00" }] },
        { name: "King Estate Pinot Noir", desc: "Light in color and fragrant with raspberry, vanilla and floral character.", prices: [{ price: "38.00" }, { price: "9.00" }] },
        { name: "Gnarly Head Old Vine Zin", desc: "Berry, Spice and Oak flavors with a light vanilla and chocolate finish.", prices: [{ price: "28.00" }, { price: "7.00" }] },
        { name: "Hand Crafted Petite Sirah", desc: "Blackberry and plum compliment with subtle peppery wine.", prices: [{ price: "33.00" }, { price: "8.00" }] },
        { name: "Blackstone Merlot", desc: "Supple fruit flavors with a soft oak finish.", prices: [{ price: "31.00" }, { price: "7.75" }] },
        { name: "Rodney Strong 2000 Cabernet", desc: "Full bodied with a long silky finish.", prices: [{ price: "35.00" }, { price: "8.25" }] },
      ],
    },
    {
      id: "special-occasions",
      title: "For Special Occasions",
      boxed: true,
      items: [
        { name: "Spumante, Cooks", price: "22.00" },
        { name: "Brut Champagne, Korbel", desc: "Bottle", price: "33.00" },
        { name: "Asti Spumante, Zonin", desc: "Bottle", price: "28.00" },
        { name: "Asti Spumante, Martini & Rossi", price: "34.00" },
        { name: "Non-Alcohol Spumante, Meiers", desc: "Bottle", price: "18.00" },
        { name: "Perrier Water", price: "5.25" },
        { name: "Arnold Palmer", price: "4.75" },
      ],
    },
    {
      id: "some-like-it-cold",
      title: "Some Like It Cold…",
      items: [
        { name: "Strawberry Shortcake", desc: "Dessert in a Glass. Creme de Almond, Amaretto and Strawberries", price: "8.25" },
        { name: "Margarita", desc: "Our own Special Recipe will take you South of the border", price: "7.25", prices: [{ label: "With Strawberries", price: "8.00" }] },
        { name: "Pina Colada", desc: "This Cocktail will take you to a Tropical Paradise! Jamaican Rum with Coconut, Creme and Pineapple Juice", price: "7.50" },
        { name: "Mimosa", desc: "Champagne and Orange Juice, a light tasty sophisticated drink", price: "7.50" },
        { name: "Strawberry Daiquiri", desc: "Strawberry Liquor, Rum and Strawberries make this a ‘Berry’ Good Drink!", price: "8.00" },
        { name: "Grasshopper", desc: "Green Creme de Menthe, White Creme de Cacao and Ice Cream blended until it’s smooth", price: "8.50" },
        { name: "Bailey’s Irish Cream", desc: "Served On The Rocks or Straight Up", price: "10.75" },
      ],
    },
    {
      id: "some-like-it-hot",
      title: "…And Some Like It Hot!",
      items: [
        { name: "Irish Coffee", desc: "This tasty drink will give you the ‘Luck of the Irish’ And that’s NO BLARNEY!", price: "9.25" },
        { name: "Snuggler", desc: "Hot chocolate and peppermint schnapps, topped with marshmallows", price: "8.25" },
        { name: "Kahlua and Coffee", desc: "Two favorite FLAVORS combined to make ONE Great Tasting Drink", price: "9.00" },
      ],
    },
  ],
};

export const breakfast: MenuTab = {
  id: "breakfast",
  label: "Breakfast",
  intro: "Breakfast Wednesday through Sunday mornings: we open at 7am Wednesday to Friday and 8am on weekends.",
  sections: [
    {
      id: "pastry-shop",
      art: "pastries",
      title: "From the Pastry Shop",
      items: [
        { name: "Bagel (with Cream Cheese)", price: "2.95" },
        { name: "Homebaked Sweet Roll", price: "4.00" },
        { name: "Homebaked Pecan Roll", price: "4.25" },
        { name: "Wolferman’s English Muffin", price: "2.75" },
        { name: "Buttered toast (with Jelly)", price: "2.00" },
      ],
    },
    {
      id: "pancakes-waffles",
      title: "Pancakes & Waffles",
      boxed: true,
      items: [
        { name: "Waffle", desc: "Belgian Style with Country Cream Butter & Syrup", price: "9.95" },
        { name: "Waffle With Chicken Strips", desc: "Belgian Style with Country Cream Butter & Syrup with 2 Chicken Strips", price: "12.45" },
        { name: "Golden French Toast", desc: "With Country Cream Butter & Syrup", price: "9.95" },
        {
          name: "Buttermilk Pancakes",
          desc: "With Country Cream Butter & Syrup",
          prices: [
            { label: "Stack - 3 Light Cakes", price: "6.95" },
            { label: "Short Stack - 2 Light Cakes", price: "5.95" },
            { label: "1 Cake", price: "3.95" },
          ],
        },
        { star: true, name: "Pancakes & Eggs", desc: "Short Stack with 2 Eggs Any Style", price: "7.45" },
        { star: true, name: "Add 2 Strips of Bacon", desc: "to any of the above", price: "2.50" },
        { star: true, name: "Add 1 Sausage Patty", desc: "to any of the above", price: "2.00" },
      ],
    },
    {
      id: "combinations",
      title: "Breakfast Combinations",
      items: [
        {
          star: true,
          name: "Skillet Breakfast",
          desc: "Country Potatoes, Onions with either Sausage, Bacon or Cubed Ham, with Melted Cheddar Cheese, Topped with 2 Eggs of Your Choice, Served with Toast",
          price: "9.95",
        },
        { star: true, name: "Two Eggs (Any Style)", desc: "Served with Country Potatoes, Toast & Thick Grilled Ham, Fresh Fried Bacon or Country Patty Sausage", price: "8.95" },
        { star: true, name: "One Egg (Any Style)", desc: "Served with Country Potatoes, Toast & Fresh Fried Bacon, Thick Grilled Ham or Country Patty Sausage", price: "8.20" },
        { star: true, name: "Two Eggs (Any Style)", desc: "Served with Country Potatoes & Toast", price: "6.50" },
        { star: true, name: "Eggs Benedict", desc: "2 Poached Eggs, Ham on English Muffin, Topped with Hollandaise Sauce, Served with Country Potatoes", price: "11.25" },
      ],
    },
    {
      id: "omelettes",
      title: "Omelettes",
      boxed: true,
      note: "All Omelettes are Served with Country Potatoes & Toast.",
      items: [
        { star: true, name: "Western Omelette", desc: "Fresh Ham, Green Peppers, Onions & Cheddar Cheese", price: "8.95" },
        { star: true, name: "Ham & Cheese Omelette", desc: "Fresh Ham & Cheddar Cheese", price: "8.95" },
        { star: true, name: "Cheese Omelette", desc: "Lots of Grated Cheddar Cheese", price: "8.45" },
        { star: true, name: "“R” Special Omelette", desc: "Seasoned Sausage, Bacon, Onions Sauteed Together & Topped with Cheese", price: "9.25" },
      ],
    },
    {
      id: "side-orders",
      title: "Side Orders",
      items: [
        { star: true, name: "Thick Grilled Ham", price: "3.50" },
        { star: true, name: "Fresh Fried Bacon", desc: "(3 strips)", price: "3.50" },
        { star: true, name: "Country Patty Sausage", desc: "(2 patties)", price: "3.50" },
        { name: "Hash Brown Potatoes", price: "3.50" },
        { name: "Country Potatoes", price: "3.50" },
      ],
    },
    {
      id: "beverages",
      art: "mug",
      title: "Beverages",
      items: [
        { name: "Freshly Brewed Coffee", price: "2.75" },
        { name: "Hot Tea", price: "2.45" },
        { name: "Milk", price: "2.45" },
        { name: "Hot Chocolate", price: "3.25" },
        { name: "Juice", desc: "Orange, Cranberry, or Tomato", prices: [{ label: "Small (10 oz.)", price: "3.00" }] },
      ],
    },
  ],
};

// Back page of the printed menu: to-go, catering, brunch, buffet, rooms.
export const takeHome = {
  deli: ["Cole Slaw", "Baked Beans", "Potato Salad", "Tortellini Salad", "Nut Torte Cake", "Carrot Cake", "Homemade Pies", "Pasta Salads", "Homemade Cookies & Sweet Rolls"],
  chicken: {
    note: "Take Home some of our Special Pan Fried Chicken. Made from our own Family recipe.",
    prices: [
      { label: "Whole Chicken", price: "19.00" },
      { label: "One-Half Chicken", price: "11.50" },
    ],
  },
  menuNote: "Most Menu items are available for takeout. Ask your waitress for details.",
  catering: [
    "Complete Menu Planning",
    "Can Serve From 25-5,000",
    "Endless Selection of Delicious Dishes",
    "Guaranteed Hot, Well-Prepared Food",
    "Courteous, Experienced Help",
    "Catering To Any Location",
  ],
};

export const brunch = {
  title: "Try Our Famous Sunday Brunch In The Tommy-Suz Garden",
  when: "10:00 a.m. to 2:00 p.m. Select Sundays",
  groups: [
    { title: "Main Entrees", items: ["Sirloin Tips", "Baron Round Of Roast Beef", "Country Pan-Fried Chicken", "Baked Ham", "Orange Roughy Almondine", "Country Style BBQ Ribs", "Spaghetti With Meat Sauce"] },
    { title: "Breakfast Items", items: ["Omelettes - Made To Order", "Belgian Waffles", "Homemade Sausage Gravy & Biscuits", "Fried Potatoes With Sauteed Onions", "Fruit Juices"] },
    {
      title: "Superb Salads & Sides",
      items: ["Fresh Relish Tray With Dip", "Homemade Pasta Salads & Fresh Fruit", "Poached Salmon", "Cheese Board", "Homemade Mashed Potatoes", "Seasonal Vegetables", "Creamed New Potatoes & Peas"],
    },
  ],
  plus: "Plus Elegant Assorted Pastries & Desserts",
  buffet: { title: "Enjoy Our Saturday Night Prime Rib Buffet", lines: ["Select Saturday Evenings", "Starting at 5:00 p.m.", "In Our Tommy-Suz Garden"] },
};

export const menuNotes = {
  healthyHeart: "Yes! We have a Healthy Heart Menu. Please ask your waitress.",
  advisory: "Consumer Advisory: The consumption of raw or under cooked foods of animal origin may pose a hazard to your health.",
  gratuity: "For your convenience, a 15% gratuity is added for parties of eight or more which can be changed at your discretion.",
  closing: "We graciously thank all of our old friends and hope that all others become new friends.",
  signed: "Bryan & Renee Jantz",
};
