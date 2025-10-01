import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 Starting database seeding...');

    const authService = app.get(AuthService);

    // Seed default admin user
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123',
    };

    console.log('Creating admin user...');
    await authService.register(adminData);
    console.log('✅ Admin user created:', adminData.email);

    // Seed test users
    const testUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password@123',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Password@123',
      },
    ];

    for (const user of testUsers) {
      console.log(`Creating user: ${user.email}...`);
      await authService.register(user);
      console.log(`✅ User created: ${user.email}`);
    }

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();

