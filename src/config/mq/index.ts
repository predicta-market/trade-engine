import { Queue, Worker } from 'bullmq';
import {config} from '../server-config';
class BullMQConfig {
    private readonly redisUrl: string;
    
    constructor() {
        this.redisUrl = config.redis.url;
    }
    
    public createQueue(name: string): Queue {
        return new Queue(name, {
            connection: { url: this.redisUrl },
            defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: false
            },
        });
    }
    public createWorker(
        name: string,
        processor: (job: any) => Promise<any>
    ): Worker {
        return new Worker(name, processor, {
            connection: { url: this.redisUrl }
        });
    }
}

export {BullMQConfig};