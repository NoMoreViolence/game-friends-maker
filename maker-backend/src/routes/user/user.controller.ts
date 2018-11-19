import { Request, Response } from 'express';
import { DatabaseError } from 'sequelize';
import Sequelize, { User } from 'db';
import lib, { EncryptoPassword } from 'src/lib';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as random from 'randomstring';

const { Op } = Sequelize;
const { salt, regex, validation, encrypto, jwt, mailer } = lib;
