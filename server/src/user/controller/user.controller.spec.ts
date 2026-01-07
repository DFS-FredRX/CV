import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../app.module';
import request from 'supertest';
import { DataSource } from 'typeorm';

describe('UserController', () => {

  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
  });

  describe('POST /user', () => {

    it('devrait créer un utilisateur et retourner un code 201', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          firstname: 'Alice',
          lastname: 'Wonder',
          username: 'alice_w',
          email: 'alice@test.com',
          password: 'password123'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.username).toEqual('alice_w')
          expect(res.body).not.toHaveProperty('hashed_password')
        })
    })

    it('devrait retourner un email invalide (Validation DTO)', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          firstname: 'Alice',
          lastname: 'Wonder',
          username: 'alice_w2',
          email: 'mauvais-email',
          password: 'password123'
        })
        .expect(400)
    })

  })

  describe('PATCH /user/:id', () => {

    it('devrait mettre à jour le prénom', () => {
      return request(app.getHttpServer())
        .patch('/user/1')
        .send({ firstname: 'Alice-Updated' })
        .expect(200)
    })

  })

  afterAll(async () => {
    await app.close()
  })

});
