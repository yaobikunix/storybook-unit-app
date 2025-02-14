import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    /** 以下は追加事項 */
    'prettier', // 追加
    'plugin:@typescript-eslint/recommended', // TypeScript のベストプラクティスに基づいたルールを適用
    'plugin:react/recommended', // React の推奨ルール
    'plugin:prettier/recommended', // ESLint で Prettier のルールを適用（コードフォーマット）
  ),
  ...compat.plugins('unicorn', '@stylistic', '@stylistic/migrate'),
  /** stylisticのConfig設定 */
  stylistic.configs['disable-legacy'], // 旧ルールを無効化
  stylistic.configs.customize({
    flat: true, // Flat Config用
    indent: 2, // インデントをスペース2に統一
    quotes: 'single', // シングルクォートを強制
    semi: true, // セミコロンを必須に
    jsx: true, // JSX対応
    braceStyle: '1tbs', // 1TBSスタイルのブレース（if () { } else { } の形式）
  }),
  {
    /** ruleの設定 */
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'lf' }], // 改行コードを LF（Linux/macOS 標準）に統一
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // 連続した空行を制限する(改行の調整)
      'react/react-in-jsx-scope': 'off', // Next.jsでは不要
      /** stylistic */
      '@stylistic/quotes': ['error', 'single'], // ESLint 側もシングルクオートに統一
      '@stylistic/object-curly-spacing': ['error', 'always'], // {} の内側にスペースを入れる
      '@stylistic/jsx-quotes': ['error', 'prefer-double'], // JSXの属性値はダブルクォートで囲む
      '@stylistic/jsx-one-expression-per-line': 'off', // JSX内の改行制限を無効化
      '@stylistic/multiline-ternary': 'off', // 三項演算子は1行で書いても分けてもOK
      /** eslint-plugin-unicorn */
      'unicorn/consistent-empty-array-spread': 'error', // 一貫性のある空の配列の展開を強制する
      'unicorn/throw-new-error': 'error', // throw する Error は必ず new する
    },
  },
  {
    /** ignoreの設定 */
    ignores: ['.next/**', 'node_modules/**', '.git/**', 'dist/**'],
  },
];

export default eslintConfig;
