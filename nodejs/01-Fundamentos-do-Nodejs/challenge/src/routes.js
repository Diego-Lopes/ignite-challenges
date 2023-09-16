import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = [];

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      console.log(req.query);
      return res.writeHead(200).end(JSON.stringify(database));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      console.log({ title, description });
      const ObjTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        update_at: null,
      };

      database.push(ObjTask);

      console.log(database);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      console.log({ id });

      const findIndex = database.findIndex((index) => index.id === id);

      if (findIndex > -1) {
        database.splice(findIndex, 1);
        return res.writeHead(204).end()
      } else {
        return res.writeHead(404).end()
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      database.filter((filter) => {
        if (filter.id === id) {
          database
            .filter((filter) => {
              return filter.id === id;
            })
            .map((obj) => {
              obj.title = title;
              obj.description =
                description !== "" ? description : obj.description;
              obj.update_at = new Date();
            });

          return res.writeHead(204).end();
        } else {
          return res.writeHead(404).end()
        }
      });
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.filter((filter) => {
        if (filter.id === id) {
          database
            .filter((filter) => {
              return filter.id === id;
            })
            .map((obj) => {
              if(obj.completed_at === null) {
                obj.completed_at = true
                obj.update_at = new Date();
              } else if(obj.completed_at === true) {
                obj.completed_at = null
                obj.update_at = new Date();
              } 
            });

          return res.writeHead(204).end();
        } else {
          return res.writeHead(404).end()
        }
      });
    },
  },
];
