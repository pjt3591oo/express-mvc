const { 
  getAllArticles, getArticlebyId, createArticle, updateArticle, deleteArticle 
} = require("../services/article");

module.exports = {
  async apiGetAllArticles(req, res, next) {
    try {
      const articles = await getAllArticles();
      if (!articles) {
        res.status(404).json("There are no article published yet!")
      }
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },
  async apiGetArticleById(req, res, next) {
    try {
      let id = req.params.id || {};
      const article = await getArticlebyId(id);
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },
  async apiCreateArticle(req, res, next) {
    try {
      const createdArticle = await createArticle(req.body);
      res.json(createdArticle);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async apiUpdateArticle(req, res, next) {
    try {
      const articleId = req.params.id;
      const {title, body, articleImage} = req.body
      const comment = {
        title, body, articleImage
      }

      const updatedArticle = await updateArticle(articleId, comment);

      if (!updatedArticle.ok) {
        throw new Error("Unable to update article, error occord");
      }
      res.json(updatedArticle);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error });
    }
  },
  async apiDeleteArticle(req, res, next) {
    try {
      const articleId = req.params.id;
      const deleteResponse = await deleteArticle(articleId)
      res.json(deleteResponse);
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}