import { tap } from '@flagcar/core/utils/util';

describe('Utils', () => {
  describe('tap', () => {
    it('should change a reference a return it', () => {
      const ref = new class { public prop = 0; }
      expect(tap(ref, r => r.prop = 1).prop).toBe(1);
    });
  });
})