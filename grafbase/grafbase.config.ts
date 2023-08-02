import { g, auth, config } from '@grafbase/sdk';
import { DynamoDBModel } from '@grafbase/sdk/dist/src/connector/dynamodb/model';

const authProvider = auth.JWT({
  issuer: 'grafbase',
  secret: process.env.NEXTAUTH_SECRET ?? ''
});

const user: DynamoDBModel = g
  .model('User', {
    name: g.string().length({ min: 3, max: 10 }),
    email: g.string().length({ max: 20 }).unique(),
    avatarUrl: g.url(),
    description: g.string().length({ max: 100 }).optional(),
    githubUrl: g.url().optional(),
    linkedInUrl: g.url().optional(),
    projects: g
      .relation(() => project)
      .list()
      .optional()
  })
  .auth((rules) => {
    rules.public().read();
  });

const project = g
  .model('Project', {
    title: g.string().length({ min: 5, max: 20 }),
    description: g.string().length({ max: 100 }).optional(),
    image: g.url(),
    siteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => user)
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().update().delete();
  });

export default config({
  schema: g,
  auth: {
    providers: [authProvider],
    rules: (rules) => {
      rules.private();
    }
  }
});
