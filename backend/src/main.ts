import "reflect-metadata";
import { env } from './config/env.js'
import app from "./core/app.js";
import { connectDB } from "./config/db.js";
import type { Application } from 'express';
import registerUserModule from "./modules/user/user.module.js";
import registerCategoryModule from "./modules/category/category.module.js";



const PORT = env.PORT

const startServer = async () => {
    try {
        


        console.log("Connecting to database...");
        await connectDB();
        console.log("Database connected successfully.");


        const expressApp: Application = app;

        registerUserModule(expressApp);
        registerCategoryModule(expressApp)
        


        expressApp.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });


    } catch (error) {
        

        if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack); 
        } else {
            console.error("An unknown error occurred", error);
        }
        process.exit(1);
    }
}

startServer()


