const Article = require("../models/Article");

module.exports = {
  async getAllArticles() {
    try {
      const allArticles = await Article.find();
      return allArticles;
    } catch (error) {
      console.log(`Could not fetch articles ${error}`)
    }
  },

  async createArticle(data) {
    try {
      const newArticle = {
        title: data.title,
        body: data.body,
        article_image: data.article_image
      }
      const response = await new Article(newArticle).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getArticlebyId(articleId) {
    try {
      const singleArticleResponse = await Article.findById({ _id: articleId });
      return singleArticleResponse;
    } catch (error) {
      console.log(`Article not found. ${error}`)
    }
  },
  async updateArticle(articleId, {title, body, articleImage}) {
    try {
      
      const updateResponse = await Article.updateOne(
        {_id: articleId},
        { title, body, articleImage },
        { $set: { date: new Date() } });

        return updateResponse;
    } catch (error) {
      console.log(`Could not update Article ${error}`);

    }
  },
  async deleteArticle(articleId) {
    try {
      const deletedResponse = await Article.findOneAndDelete(articleId);
      return deletedResponse;
    } catch (error) {
      console.log(`Could  ot delete article ${error}`);
    }
  }
}