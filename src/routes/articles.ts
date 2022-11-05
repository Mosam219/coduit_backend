import { Router } from "express";
import { createArticle } from "../controllers/articles";
import { authByToken } from "../middleware/auth";

const route = Router();

//list Articles
route.get("/", async (req, res) => {});

//feed articles
route.get("/feed", authByToken, async (req, res) => {});

//feed articles
route.get("/:slug", async (req, res) => {});

//create article
route.post("/", authByToken, async (req, res) => {
  try {
    const article = await createArticle(
      req.body.article,
      (req as any).user.email
    );
    return res.status(201).send(article);
  } catch (e) {
    return res.status(422).json({
      errors: { body: ["could not create article", (e as any).message] },
    });
  }
});

//update article
route.patch("/:slug", async (req, res) => {});

//delete article
route.delete("/:slug", async (req, res) => {});

export const articleRoute = route;
