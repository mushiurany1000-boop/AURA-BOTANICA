const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('templates/product.json', 'utf8'));

prod.sections.product_reviews = {
  "type": "product-reviews",
  "blocks": {
    "review_1": {
      "type": "review",
      "settings": {
        "author": "Kristin Watson",
        "avatar_initials": "KW",
        "verified": true,
        "date": "1 month ago",
        "rating": "5.0",
        "title": "Absolutely love this product!",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "show_photos": true
      }
    },
    "review_2": {
      "type": "review",
      "settings": {
        "author": "Jenny Wilson",
        "avatar_initials": "JW",
        "verified": true,
        "date": "2 month ago",
        "rating": "5.0",
        "title": "Perfect for my skincare routine!",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "show_photos": false
      }
    },
    "review_3": {
      "type": "review",
      "settings": {
        "author": "Darlene Robertson",
        "avatar_initials": "DR",
        "verified": true,
        "date": "2 month ago",
        "rating": "5.0",
        "title": "My barrier feels healed and renewed",
        "content": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. High recommend to anyone with dry skin.",
        "show_photos": false
      }
    }
  },
  "block_order": [
    "review_1",
    "review_2",
    "review_3"
  ],
  "settings": {
    "color_scheme": "default",
    "show_summary": true,
    "overall_rating": "4.8",
    "total_reviews_label": "245 Review",
    "bar_5_pct": 90,
    "bar_4_pct": 36,
    "bar_3_pct": 15,
    "bar_2_pct": 5,
    "bar_1_pct": 2,
    "list_heading": "Review List",
    "total_reviews_count": 24,
    "container": "container",
    "padding_top": 48,
    "padding_bottom": 48
  }
};

fs.writeFileSync('templates/product.json', JSON.stringify(prod, null, 2));
console.log('Successfully updated templates/product.json with default review blocks!');

