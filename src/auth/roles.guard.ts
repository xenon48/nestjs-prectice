import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Injectable } from '@nestjs/common';
import { ROLES_KEY } from "./roles-auth.decorator";
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization; // получаем http-контекст пришедшего запроса " Bearer "token" "
            const bearer = authHeader.split(' ')[0]; // получаем статус авторизации ("Bearer")
            const token = authHeader.split(' ')[1]; // получаем токен

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!'})
            }

            const user = this.jwtService.verify(token); // раскодируем инфу о пользователе из токена
            req.user = user;

            return user.roles.some( role => requiredRoles.includes(role.value))

        } catch (error) {     
            throw new HttpException('Нет прав доступа', HttpStatus.FORBIDDEN)
        }
    }

}