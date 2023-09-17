import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { run } from "./streams/import-csv.js";

const database = [];

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      // console.log(req.query);
      return res.writeHead(200).end(JSON.stringify(database));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/streamInCsv"),
    handler: async (req, res) => {
      await run();
      return res.writeHead(200).end(JSON.stringify(database));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      console.log({ title, description });

      if (!title) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Title is required",
          })
        );
      }

      if (!description) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Description is required",
          })
        );
      }

      const ObjTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        update_at: null,
      };

      database.push(ObjTask);

      // console.log(database);

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
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end();
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      console.log({
        id,
        title,
        description,
      });
      if (!title || !description) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Title or description are required",
          })
        );
      }

      const isTask = database.find((obj) => obj.id === id);
      console.log(!!isTask);
      if (!!isTask) {
        database
          .filter((filter) => {
            return filter.id === id;
          })
          .map((obj) => {
            obj.title = title;
            obj.description = description;
            obj.update_at = new Date();
          });

        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end();
      }
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const isTask = database.find((obj) => obj.id === id);

      if (!!isTask) {
        database
          .filter((filter) => {
            return filter.id === id;
          })
          .map((obj) => {
            const isTaskCompleted = !!obj.completed_at;
            const complete_at = isTaskCompleted ? null : new Date();

            if (isTaskCompleted) {
              obj.completed_at = null;
              obj.update_at = new Date();
            } else {
              obj.completed_at = complete_at;
              obj.update_at = new Date();
            }
          });
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end();
      }
    },
  },
];
