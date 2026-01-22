import bycrypt from 'bcrypt'
import {PrismaClient} from '@prisma/client';
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
const prisma= new PrismaClient();
export const {handler,signin,signout,auth} = NextAuth() 
