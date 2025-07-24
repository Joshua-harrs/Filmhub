const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      title: "Deadpool",
      poster: "https://placehold.co/300x450?text=Deadpool",
      link: "https://pixeldrain.com/u/Ty5q3spt"
    },
    {
      title: "Die Hard",
      poster: "https://placehold.co/300x450?text=Die+Hard",
      link: "https://pixeldrain.com/u/5FLvqECf"
    },
    {
      title: "Maze Runner",
      poster: "https://placehold.co/300x450?text=Maze+Runner",
      link: "https://pixeldrain.com/u/H5UU71WX"
    },
    {
      title: "Oppenheimer",
      poster: "https://placehold.co/300x450?text=Oppenheimer",
      link: "https://pixeldrain.com/u/R6q4hXPW"
    },
    {
      title: "Shrek",
      poster: "https://placehold.co/300x450?text=Shrek",
      link: "https://pixeldrain.com/u/XkUJoG7c"
    },
    {
      title: "Sonic 3",
      poster: "https://placehold.co/300x450?text=Sonic+3",
      link: "https://pixeldrain.com/u/d1vieYaY"
    },
    {
      title: "Spider-Man: Across the Spider-Verse",
      poster: "https://placehold.co/300x450?text=Spider-Verse",
      link: "https://pixeldrain.com/u/8NhsBSK8"
    }
  ]);
});

module.exports = router;
