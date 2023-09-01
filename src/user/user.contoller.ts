import type { StatusCode } from 'hono/utils/http-status';
import { createRoute } from '@hono/zod-openapi';
import PrismaEdge from "@prisma/client/edge";
const { PrismaClient } = PrismaEdge;
const prisma = new PrismaClient();
import * as userService from './user.service';
import { auth } from '../middlewares/auth';
import { UserUpdateInput } from './UserUpdateInput';
import { UserCreateInput } from './UserCreateInput';
import { UserWhereUniqueInput } from './UserWhereUniqueInput';
import { UserFindManyArgs } from './UserFindManyArgs';
import { GetListUserDto } from './getListUser.dto';
import { processArgs } from '../util/ProcessArgs';
import { checkPermission } from '../util/checkPermission';

// Create user
export const create: any = async (c: any) => {
  try {
    await auth(c);
    const payloadRoles = c.get("payload").roles;
    const permission = checkPermission(payloadRoles, "createAnyUser");

    if (!permission) {
      return c.json(
        {
          code: 403,
          message: `User creation is forbidden for the following roles: ['admin'].`,
        },
        403
      );
    }

    const bodyParse = await c.req.json();
    const body = UserCreateInput.parse(bodyParse);

    // If permission check passes, create the user
    const user = await userService.create({ data: body });
    return c.json(user, 200 as StatusCode);
  } catch (err:any) {
    return c.json({ code: '401', error: err.message }, 400 as StatusCode);
  }
};

export const routeCreateUser = createRoute({
  method: 'post',
  path: '/user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UserCreateInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserCreateInput,
        },
      },
      description: 'Create the user',
    },
  },
});

// Find many users
export const findMany = async (c: any) => {
  try {
    await auth(c);
  const queryParse = c.req.query();
  const args = UserFindManyArgs.parse(processArgs(queryParse));

  const result = await userService.findMany({
    where: args?.where ? args.where.where : undefined,
    orderBy: args?.orderBy ? args.orderBy.orderBy : undefined,
    skip: args.skip ? parseInt(args.skip) : undefined,
    take: args.take ? parseInt(args.take) : undefined,
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      firstName: true,
      lastName: true,
      username: true,
      isValid: true,
      roles: true,
    },
  });

  return c.json({ paginatedResult: result.paginatedResult, totalCount: result.totalCount }, 200 as StatusCode);
}
  catch (err:any) {
    return c.json({ code: '401', error: err.message }, 400 as StatusCode);
  }
};

export const routeFindManyUser = createRoute({
  method: 'get',
  path: '/users',
  request: {
    query: UserFindManyArgs,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetListUserDto,
        },
      },
      description: 'Retrieve the user',
    },
  },
});

export const update: any = async (c: any) => {
  try {
    await auth(c);
    const payloadRoles = c.get("payload").role;
    console.log(payloadRoles,"payloadRolespayloadRoles")
    const permission = checkPermission(payloadRoles, "createAnyUser");

    if (!permission) {
      return c.json(
        {
          code: 403,
          message: `User creation is forbidden for the following roles: ['admin'].`,
        },
        403
      );
    }
    const paramsParse = c.req.param();
    const bodyParse = await c.req.json();
    const params = UserWhereUniqueInput.parse(paramsParse);
    const body = UserUpdateInput.parse(bodyParse);

    const user = await userService.update({
      where: { id: params.id },
      data: body,
    });

    return c.json(user, 200 as StatusCode);
  } catch (err:any) {
    return c.json({ code: '401', error: err.message }, 400 as StatusCode);
  }
};

export const routeUpdateUser = createRoute({
  method: 'patch',
  path: '/users/{id}',
  request: {
    params: UserWhereUniqueInput,
    body: {
      content: {
        'application/json': {
          schema: UserUpdateInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserUpdateInput,
        },
      },
      description: 'Update the user',
    },
  },
});
