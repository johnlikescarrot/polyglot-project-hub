/// <reference types="jest" />
import { AI_MODELS, getModelById, getModelsByCategory } from '@/lib/aiModels';

describe('AI Models Library', () => {
  describe('AI_MODELS constant', () => {
    test('should have models defined', () => {
      expect(AI_MODELS.length).toBeGreaterThan(0);
    });

    test('should have valid model structure for each model', () => {
      AI_MODELS.forEach((model) => {
        expect(model).toHaveProperty('id');
        expect(model).toHaveProperty('name');
        expect(model).toHaveProperty('description');
        expect(model).toHaveProperty('provider');
        expect(model).toHaveProperty('category');
        expect(model).toHaveProperty('icon');
        expect(model).toHaveProperty('color');
        expect(typeof model.id).toBe('string');
        expect(typeof model.name).toBe('string');
      });
    });

    test('should have unique model IDs', () => {
      const ids = AI_MODELS.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('getModelById function', () => {
    test('should retrieve model by valid ID', () => {
      const model = getModelById('google/gemini-2.5-flash');
      expect(model).toBeDefined();
      expect(model?.id).toBe('google/gemini-2.5-flash');
    });

    test('should return undefined for invalid ID', () => {
      const model = getModelById('nonexistent/model');
      expect(model).toBeUndefined();
    });

    test('should return undefined for empty string', () => {
      const model = getModelById('');
      expect(model).toBeUndefined();
    });
  });

  describe('getModelsByCategory function', () => {
    test('should return all premium category models', () => {
      const models = getModelsByCategory('premium');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((m) => expect(m.category).toBe('premium'));
    });

    test('should return all balanced category models', () => {
      const models = getModelsByCategory('balanced');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((m) => expect(m.category).toBe('balanced'));
    });

    test('should return all fast category models', () => {
      const models = getModelsByCategory('fast');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((m) => expect(m.category).toBe('fast'));
    });

    test('should return empty array for non-existent category', () => {
      const models = getModelsByCategory('nonexistent');
      expect(models).toEqual([]);
    });
  });
});
