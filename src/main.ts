import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule,  } from "@nestjs/swagger";
import { ValidationPipe } from './pipes/validation.pipe';



async function start() {
    const PORT = process.env.PORT || 4000
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle("Обучение nest'y")
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .addTag('JustRide')
    .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`\nServer started in mode: ${process.env.NODE_ENV}\nOn port: ${process.env.PORT}\n`))
}

start()