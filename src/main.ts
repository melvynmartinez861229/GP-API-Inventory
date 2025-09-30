import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // CORS configuration - Allow requests from the main application
  app.enableCors({
    origin: [
      'http://localhost:3000', // Development frontend
      'https://goalplay.app',   // Production frontend (adjust as needed)
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('GoalPlay Inventory API')
    .setDescription('The GoalPlay Inventory microservice API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3001;
  
  try {
    await app.listen(port);
    // Probar conexión a la base de datos con DataSource
    await AppDataSource.initialize();
    console.log('\t✅ Conexión a la base de datos exitosa');
    console.log(`🚀 Inventory API is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
  } catch (err) {
    console.error('\t❌ Error al iniciar la app o conectar a la base de datos:', err);
  }
}

bootstrap();