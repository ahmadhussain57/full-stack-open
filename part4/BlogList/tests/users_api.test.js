const assert=require('node:assert')
const {test,beforeEach,after, describe}=require('node:test')
const mongoose=require('mongoose')
const User=require('../models/users')
const app=require('../app')
const bcrypt=require('bcrypt')
const superTest=require('supertest')

const api=superTest(app)

describe('tests users api',()=>{
beforeEach(async()=>{
    await User.deleteMany({})
     const newUser=new User(
        {
            username:'ahmad1',
            name:'ahmadhussain',
            passwordHash:await bcrypt.hash('12345',10)
    }
    )

    await newUser.save()

})

    describe('test post api',()=>{
        test('creat success user',async()=>{
            const usersBefore=await api.get('/api/users')
            const newUser={
                username:'ahmad',
                name:'ahmadhussain',
                password:'123456',
            }
            const saveUser=await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type',/application\/json/)

            const usersAfter=await api.get('/api/users')
            assert.strictEqual(usersAfter.body.length,usersBefore.body.length+1)
        })

        test('creat user with less than 3 character in username',async()=>{
            const usersBefore=await api.get('/api/users')
            const newUser={
                username:'ah',
                name:'ahmadhussain',
                password:'123456',
            }
             const saveUser=await api.post('/api/users')
            .send(newUser)
            .expect(400)

            const usersAfter=await api.get('/api/users')
            assert.strictEqual(usersAfter.body.length,usersBefore.body.length)
        })


         test('creat user with less than 3 character in password',async()=>{
            const usersBefore=await api.get('/api/users')
            const newUser={
                username:'ahmad',
                name:'ahmadhussain',
                password:'12',
            }
             const saveUser=await api.post('/api/users')
            .send(newUser)
            .expect(400)

            const usersAfter=await api.get('/api/users')
            assert.strictEqual(usersAfter.body.length,usersBefore.body.length)
        })

         test('creat user with invalid username becasue someone take it',async()=>{
            const usersBefore=(await api.get('/api/users')).body
            const newUser={
                username:'ahmad1',
                name:'ahmadhussain',
                password:'12444',
            }            
             const saveUser=await api.post('/api/users')
            .send(newUser)
            .expect(400)
            
            const usersAfter=(await api.get('/api/users')).body
            assert.strictEqual(usersAfter.length,usersBefore.length)
        })


    })
})
after(async()=>{
    await mongoose.connection.close()
})