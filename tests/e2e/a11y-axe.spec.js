// #44 Phase 1 AC-06: axe zero violations on the 27 language URLs, in both projects (desktop-1440, mobile-390).
// @axe-core/playwright is an exact devDependency (D-1=A); rules: WCAG 2.0/2.1 A and AA and WCAG 2.2 AA.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PRERENDERED } from '../../src/routing.js';
import { note } from './helpers.js';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('@axe #44 accessibility', () => {
  for (const r of PRERENDERED) {
    test(`AC-06 axe ${r.url}`, async ({ page }, info) => {
      await page.goto(r.url, { waitUntil: 'load' });
      await expect(page.locator('main h1')).toBeVisible();
      await page.waitForLoadState('networkidle');
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      const violations = results.violations.map((v) => ({
        id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(' ')),
      }));
      note('axe', `${r.url} ${info.project.name}: ${results.passes.length} rules passed, ${violations.length} violated, `
        + `${results.incomplete.length} incomplete (needs review), axe-core ${results.testEngine.version}`);
      await info.attach(`axe-${r.url === '/' ? 'home' : r.url.slice(1).replaceAll('/', '-')}.json`, {
        body: JSON.stringify({ url: r.url, project: info.project.name, engine: results.testEngine, tags: TAGS,
          violations: results.violations, incomplete: results.incomplete.map((v) => ({ id: v.id, nodes: v.nodes.length })) }, null, 2),
        contentType: 'application/json',
      });
      expect(violations, 'axe violations').toEqual([]);
    });
  }
});
