import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs'
import {map} from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';


export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto : any) {}


    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
         console.log('im runing before handler' , context)
    
    return next.handle().pipe(
        map((data: any) => {
   
        return plainToInstance(this.dto, data  , {
            excludeExtraneousValues: true,
        })
        })
    )
        }

}
