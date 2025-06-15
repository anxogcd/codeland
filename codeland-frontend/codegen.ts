import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_ENDPOINT ?? "http://localhost:4001/graphql",
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "modules/gql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
