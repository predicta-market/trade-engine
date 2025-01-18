import express, { Express} from 'express';
import {config} from './config';
import router from './route';

class Server{
    private static app: Express;
    private static port:number;
    
    // Initialize the server
    public static initialize(): void {
        this.port = config.server.port;
        if(!this.app){
            this.app = express();
            this.configureMiddlewares();
            this.start();
        }
        else{
            console.warn('Server is already initialized.');
        }
    }

    private static configureMiddlewares(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/api',router);
    }

    // Start the server
    private static start(): void {
        this.app.listen(this.port, () => {
        console.info(`Server started at port ${this.port}.`);
        });
    }
}


export default Server;