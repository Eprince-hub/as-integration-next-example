import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest, NextResponse } from 'next/server';

type GraphQlResponseBody =
  | {
      animal: {
        id: number;
        firstName: string;
      };
    }
  | Error;

const typeDefs = `#graphql
  type Animal {
    id: ID!
    firstName: String!
  }

  type Query {
    animals: [Animal]
  }
`;

const animals = [
  {
    id: 1,
    firstName: 'Hello',
  },
];

const resolvers = {
  Query: {
    animals: () => animals,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return await handler(req);
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  return await handler(req);
}
