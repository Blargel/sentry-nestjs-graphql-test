import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => Boolean)
  hello(): boolean {
    throw new Error('test error in graphql');
    return true;
  }
}
