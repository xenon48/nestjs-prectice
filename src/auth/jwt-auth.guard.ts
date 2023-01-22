import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization; // получаем http-контекст пришедшего запроса " Bearer "token" "
            const bearer = authHeader.split(' ')[0]; // получаем статус авторизации ("Bearer")
            const token = authHeader.split(' ')[1]; // получаем токен

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!'})
            }

            const user = this.jwtService.verify(token); // раскодируем инфу о пользователе из токена
            req.user = user;

            return true;

        } catch (error) {
            console.log(error);
            
            throw new UnauthorizedException({ message: 'Пользователь не авторизован!'})
        }
    }

}