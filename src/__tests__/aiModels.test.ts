/// <reference types="jest" />
import { AI_MODELS, getModelById, getModelsByCategory } from '@/lib/aiModels';

describe('AI Models', () => {
  test('should have models defined', () => {
    expect(AI_MODELS.length).toBeGreaterThan(0);
  });

  test('should have valid model structure', () => {
    AI_MODELS.forEach((model) => {
      expect(model).toHaveProperty('id');
      expect(model).toHaveProperty('name');
      expect(model).toHaveProperty('provider');
      expect(model).toHaveProperty('category');
    });
  });

  test('should get model by id', () => {
    const model = getModelById('google/gemini-2.5-flash');
    expect(model).toBeDefined();
    expect(model?.id).toBe('google/gemini-2.5-flash');
  });

  test('should return undefined for invalid id', () => {
    const model = getModelById('invalid');
    expect(model).toBeUndefined();
  });

  test('should get premium models', () => {
    const models = getModelsByCategory('premium');
    expect(models.length).toBeGreaterThan(0);
    models.forEach((m) => expect(m.category).toBe('premium'));
  });

  test('should get balanced models', () => {
    const models = getModelsByCategory('balanced');
    expect(models.length).toBeGreaterThan(0);
    models.forEach((m) => expect(m.category).toBe('balanced'));
  });

  test('should get fast models', () => {
    const models = getModelsByCategory('fast');
    expect(models.length).toBeGreaterThan(0);
    models.forEach((m) => expect(m.category).toBe('fast'));
  });

  test('should return empty for invalid category', () => {
    const models = getModelsByCategory('invalid');
    expect(models).toEqual([]);
  });
});
