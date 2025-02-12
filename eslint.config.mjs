// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
  },
  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    rules: {
      // always never
      // 'style/semi': ['error', 'always'],
    },
  },
)
