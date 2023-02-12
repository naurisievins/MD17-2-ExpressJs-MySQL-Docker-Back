import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import pool from "./pool"; // SQL pool
import {
  validateAuthor,
  validateCommentContent,
  validateDate,
  validateImageLink,
  validatePostContent,
  validateTitle,
} from "./validation";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

// Get request for blog posts

app.get("/posts", (req: Request, res: Response) => {
  const sql = "SELECT * FROM posts";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result = result;
    res.send(result);
  });
});

// Get request for post by id

app.get("/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    res.send("Not a valid post id.");
  } else {
    const sql = `SELECT * FROM posts WHERE id = ${id}`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      result = result;
      res.send(result);
    });
  }
});

// Get post comments by post id

app.get("/comments/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    res.send("Not a valid post id.");
  } else {
    const sql = `SELECT * FROM comments WHERE post_id = ${id}`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      result = result;
      res.send(result);
    });
  }
});

// Post new entry

app.post("/posts", (req: Request, res: Response) => {
  const title = validateTitle(req.body.title);
  const imageLink = validateImageLink(req.body.image_link);
  const content = validatePostContent(req.body.content);
  const date = validateDate(req.body.date);
  console.log(title, imageLink, content, date);

  pool.query(
    "INSERT INTO posts (title, image_link, content, date) VALUES (?, ?, ?, ?)",
    [title, imageLink, content, date],
    (error) => {
      if (error) throw error;
      res.sendStatus(200);
    }
  );
});

// Add comment

app.post("/comments", (req: Request, res: Response) => {
  const author = validateAuthor(req.body.author);
  const content = validateCommentContent(req.body.comment);
  const date = validateDate(req.body.date);
  const post_id = Number(req.body.post_id);

  pool.query(
    "INSERT INTO comments (author, content, date, post_id) VALUES (?, ?, ?, ?)",
    [author, content, date, post_id],
    (error) => {
      if (error) throw error;
      res.sendStatus(200);

      pool.query(
        `SELECT COUNT(content) FROM comments WHERE post_id = ${post_id};`,
        (error, result) => {
          if (error) throw error;
          const count: number = result[0]["COUNT(content)"];

          pool.query(
            `UPDATE posts SET comment_count = ${count} WHERE id = ${post_id}`,
            (error) => {
              if (error) throw error;
            }
          );
        }
      );
    }
  );
});

// Edit post

app.post("/posts/:id", (req: Request, res: Response) => {
  const title = validateTitle(req.body.title);
  const imageLink = validateImageLink(req.body.image_link);
  const content = validatePostContent(req.body.content);
  const id = req.params.id;
  if (isNaN(Number(id))) {
    res.send("Not a valid post id.");
  } else {
    pool.query(
      `UPDATE posts SET title = ?, image_link = ?, content = ? WHERE id = ${id}`,
      [title, imageLink, content],
      (error, result) => {
        if (error) throw error;
        result = result;
        res.status(200).send(result);
      }
    );
  }
});

// Listen port 3004

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
