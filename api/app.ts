import * as bodyParser from "body-parser";
const path = require('path');
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { TaskController } from "./controller/task.controller";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

class App {

    public express: express.Application;
    public logger: APILogger;
    public taskController: TaskController;

  


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.taskController = new TaskController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(path.join(__dirname, './ui/build')));
    }

    private routes(): void {

        this.express.get('/api/tasks', (req, res) => {
            this.taskController.getTasks().then(data => res.json(data));
        });
        
        this.express.post('/api/task', (req, res) => {
            console.log(req.body);
            this.taskController.createTask(req.body.task).then(data => res.json(data));
        });
        
        this.express.put('/api/task', (req, res) => {
            this.taskController.updateTask(req.body.task).then(data => res.json(data));
        });
        
        this.express.delete('/api/task/:id', (req, res) => {
            this.taskController.deleteTask(req.params.id).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, './ui/build/index.html'));
        });

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;