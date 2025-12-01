import { AI_MODELS, getModelById, getModelsByCategory } from '@/lib/aiModels';

describe('aiModels', () => {
  describe('AI_MODELS array', () => {
    it('should have models defined', () => {
      expect(AI_MODELS.length).toBeGreaterThan(0);
    });

    it('should have valid model structure', () => {
      AI_MODELS.forEach((model) => {
        expect(model).toHaveProperty('id');
        expect(model).toHaveProperty('name');
        expect(model).toHaveProperty('description');
        expect(model).toHaveProperty('provider');
        expect(model).toHaveProperty('category');
        expect(model).toHaveProperty('icon');
        expect(model).toHaveProperty('color');
      });
    });

    it('should have unique model IDs', () => {
      const ids = AI_MODELS.map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have valid providers', () => {
      AI_MODELS.forEach((model) => {
        expect(['google', 'openai']).toContain(model.provider);
      });
    });

    it('should have valid categories', () => {
      AI_MODELS.forEach((model) => {
        expect(['premium', 'balanced', 'fast']).toContain(model.category);
      });
    });
  });

  describe('getModelById', () => {
    it('should return model by id', () => {
      const model = getModelById('google/gemini-2.5-flash');
      expect(model).toBeDefined();
      expect(model?.id).toBe('google/gemini-2.5-flash');
    });

    it('should return undefined for invalid id', () => {
      const model = getModelById('invalid/model');
      expect(model).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const model = getModelById('');
      expect(model).toBeUndefined();
    });
  });

  describe('getModelsByCategory', () => {
    it('should return premium models', () => {
      const models = getModelsByCategory('premium');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((model) => {
        expect(model.category).toBe('premium');
      });
    });

    it('should return balanced models', () => {
      const models = getModelsByCategory('balanced');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((model) => {
        expect(model.category).toBe('balanced');
      });
    });

    it('should return fast models', () => {
      const models = getModelsByCategory('fast');
      expect(models.length).toBeGreaterThan(0);
      models.forEach((model) => {
        expect(model.category).toBe('fast');
      });
    });

    it('should return empty array for invalid category', () => {
      const models = getModelsByCategory('invalid');
      expect(models).toEqual([]);
    });
  });
});
