import { Injectable } from '@nestjs/common';

@Injectable()
export class VoiceService {
    constructor(){}
    async create(param:string):Promise<string>{
        return param;
    }

}
