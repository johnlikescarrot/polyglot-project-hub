import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavLink, { getNavLinkClassName } from '@/components/NavLink';
import * as e from '@/lib/coverage-extractors';

describe('NavLink - 0% Coverage Fix', () => {
  test('getNavLinkClassName with all true', () => {
    const result = getNavLinkClassName(true, true, 'base', 'active', 'pending');
    expect(result).toContain('active');
    expect(result).toContain('pending');
  });

  test('getNavLinkClassName with isActive only', () => {
    const result = getNavLinkClassName(true, false, 'base', 'active', 'pending');
    expect(result).toContain('active');
  });

  test('getNavLinkClassName with isPending only', () => {
    const result = getNavLinkClassName(false, true, 'base', 'active', 'pending');
    expect(result).toContain('pending');
  });

  test('getNavLinkClassName with all false', () => {
    const result = getNavLinkClassName(false, false, 'base', 'active', 'pending');
    expect(result).toContain('base');
  });

  test('NavLink component renders', () => {
    const { container } = render(
      <BrowserRouter>
        <NavLink to="/" className="test-link" />
      </BrowserRouter>
    );
    expect(container.querySelector('a')).toBeTruthy();
  });

  test('NavLink with activeClassName', () => {
    const { container } = render(
      <BrowserRouter>
        <NavLink to="/" activeClassName="active-link" />
      </BrowserRouter>
    );
    expect(container.querySelector('a')).toBeTruthy();
  });

  test('NavLink with pendingClassName', () => {
    const { container } = render(
      <BrowserRouter>
        <NavLink to="/" pendingClassName="pending-link" />
      </BrowserRouter>
    );
    expect(container.querySelector('a')).toBeTruthy();
  });

  test('NavLink displayName is set', () => {
    expect(NavLink.displayName).toBe('NavLink');
  });
});

describe('Coverage Extractors - Uncovered Lines 99, 182, 186-187, 196, 225-226, 430', () => {
  test('handleReportTypeChange line 99', () => {
    const settings = { reportType: 'old' };
    const result = e.handleReportTypeChange('new', settings);
    expect(result.reportType).toBe('new');
  });

  test('findListenerIndex line 182', () => {
    const listeners = [() => {}, () => {}, () => {}];
    const target = listeners[1];
    expect(e.findListenerIndex(listeners, target)).toBe(1);
  });

  test('findListenerIndex not found line 186-187', () => {
    const listeners = [() => {}, () => {}];
    const target = () => {};
    expect(e.findListenerIndex(listeners, target)).toBe(-1);
  });

  test('removeListenerAtIndex when found line 196', () => {
    const listeners = [1, 2, 3];
    e.removeListenerAtIndex(listeners, 1);
    expect(listeners).toEqual([1, 3]);
  });

  test('removeListenerAtIndex when not found line 225-226', () => {
    const listeners = [1, 2, 3];
    e.removeListenerAtIndex(listeners, -1);
    expect(listeners).toEqual([1, 2, 3]);
  });

  test('shouldRemoveListener true', () => {
    expect(e.shouldRemoveListener(0)).toBe(true);
    expect(e.shouldRemoveListener(5)).toBe(true);
  });

  test('shouldRemoveListener false', () => {
    expect(e.shouldRemoveListener(-1)).toBe(false);
  });

  test('isModeSelected true', () => {
    expect(e.isModeSelected('deep-research', 'deep-research')).toBe(true);
  });

  test('isModeSelected false', () => {
    expect(e.isModeSelected('deep-research', 'research-report')).toBe(false);
  });

  test('shouldShowDescription true', () => {
    expect(e.shouldShowDescription({ label: 'test' })).toBe(true);
  });

  test('shouldShowDescription false for null', () => {
    expect(e.shouldShowDescription(null)).toBe(false);
  });

  test('shouldShowDescription false for undefined', () => {
    expect(e.shouldShowDescription(undefined)).toBe(false);
  });

  test('isReportTypeResearchReport true', () => {
    expect(e.isReportTypeResearchReport('research-report')).toBe(true);
  });

  test('isReportTypeResearchReport false', () => {
    expect(e.isReportTypeResearchReport('other')).toBe(false);
  });

  test('isReportTypeDeepResearch true', () => {
    expect(e.isReportTypeDeepResearch('deep-research')).toBe(true);
  });

  test('isReportTypeDetailedReport true', () => {
    expect(e.isReportTypeDetailedReport('detailed-report')).toBe(true);
  });

  test('isReportTypeOutlineReport true', () => {
    expect(e.isReportTypeOutlineReport('outline-report')).toBe(true);
  });

  test('isToneObjective true', () => {
    expect(e.isToneObjective('objective')).toBe(true);
  });

  test('isToneAnalytical true', () => {
    expect(e.isToneAnalytical('analytical')).toBe(true);
  });
});
