import { AppDataSource } from "../dbconnection";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeFields } from "../utils/security";
import { slugify } from "../utils/stringutils";

interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export async function createArticle(
  data: ArticleData,
  email: string
): Promise<Article> {
  if (!data.title) throw new Error("Article title missing");
  if (!data.description) throw new Error("Article description missing");
  if (!data.body) throw new Error("Article body missing");
  if (!data.tagList?.length) throw new Error("Article taglist missing");
  try {
    //find out the author object
    const articleRepo = await AppDataSource.getRepository(Article);
    const userRepo = await AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email: email },
    });
    if (!user) throw new Error("user does not exists");
    let article = articleRepo.save(
      new Article(
        slugify(data.title),
        data.title,
        data.description,
        data.body,
        sanitizeFields(user)
      )
    );
    return article;
  } catch (e) {
    throw e;
  }
}

export async function deleteArticle(slug: string): Promise<boolean> {
  return true;
}

// export async function updateArticle(
//   slug: string,
//   data: Partial<Article>
// ): Promise<Article> {
//   return new Article();
// }

// export async function getAllArtilces(): Promise<Article[]> {
//   return [new Article()];
// }

// export async function getFeedArticles(email: string): Promise<Article[]> {
//   return [new Article()];
// }

// export async function getArticleBySlug(slug: string): Promise<Article> {
//   return new Article();
// }
