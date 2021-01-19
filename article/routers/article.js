const  express =  require("express");
const router = express.Router();
const {
  apiGetAllArticles , apiCreateArticle , apiGetArticleById , apiUpdateArticle , apiDeleteArticle
} = require("../controllers/article");


router.get("/", apiGetAllArticles);

router.post("/", apiCreateArticle);
router.get("/article/:id", apiGetArticleById);
router.put("/article/:id", apiUpdateArticle);
router.delete("/article/:id", apiDeleteArticle);

module.exports =  router;