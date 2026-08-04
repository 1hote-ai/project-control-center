const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '..', 'reports');
const rootDir = path.join(__dirname, '..');

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return 'Not found';
  }
}

function parseLighthouse(jsonPath) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = data.categories;
    return `
- Performance: ${Math.round(categories.performance.score * 100)}
- Accessibility: ${Math.round(categories.accessibility.score * 100)}
- Best Practices: ${Math.round(categories['best-practices'].score * 100)}
- SEO: ${Math.round(categories.seo.score * 100)}
`;
  } catch (e) {
    return 'Lighthouse report not available or still generating.';
  }
}

const buildOutput = safeRead(path.join(reportsDir, 'build.txt'));
let bundleSizeStr = 'Bundle size information not found.';
const bundleMatch = buildOutput.match(/Route \(app\)([\s\S]*?)○/);
if (bundleMatch) {
  bundleSizeStr = bundleMatch[1].trim();
}

const tree = safeRead(path.join(rootDir, 'structure-l5.txt'));
const lintOut = safeRead(path.join(reportsDir, 'lint.txt'));
const testOut = safeRead(path.join(reportsDir, 'test.txt'));

const lhMobile = parseLighthouse(path.join(reportsDir, 'lighthouse-mobile.json'));
const lhDesktop = parseLighthouse(path.join(reportsDir, 'lighthouse-desktop.json'));

const auditMd = `# AUDIT PACKAGE

## 1. Ссылка на деплой
GitHub Repository: [https://github.com/1hote-ai/project-control-center](https://github.com/1hote-ai/project-control-center)
*(Локальный запуск: \`npm run start\` на порту 3000)*

## 2. Полное дерево проекта
\`\`\`text
${tree}
\`\`\`

## 3. Вывод команд
### \`npm run build\`
\`\`\`text
${buildOutput.split('\\n').slice(-20).join('\\n')}
\`\`\`

### \`npm run lint\`
\`\`\`text
${lintOut || 'No lint errors found.'}
\`\`\`

### \`npm run test\`
\`\`\`text
${testOut}
\`\`\`

## 4. Размер бандла
\`\`\`text
${bundleSizeStr}
\`\`\`

## 5. Lighthouse Scores
### Desktop
${lhDesktop}
### Mobile
${lhMobile}

## 6. Список известных багов
- **Сохранение данных**: Так как API является mock-заглушкой, данные сохраняются только в памяти и сбрасываются при перезагрузке страницы (F5).
- **GitHub Auth**: Возможны таймауты при авторизации GitHub CLI (\`gh\`) в некоторых терминальных окружениях macOS (связано с keyring). Рекомендуется использовать ssh/token.

## 7. Скриншоты всех страниц
- ![Dashboard](screenshots/1_dashboard.png)
- ![Kanban](screenshots/2_kanban.png)
- ![Analytics](screenshots/3_analytics.png)
- ![Settings](screenshots/4_settings.png)
- ![Mobile Dashboard](screenshots/5_mobile_dashboard.png)
`;

fs.writeFileSync(path.join(rootDir, 'AUDIT_PACKAGE.md'), auditMd);
console.log('AUDIT_PACKAGE.md generated.');
