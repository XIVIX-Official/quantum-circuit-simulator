
import type { Complex } from '../types';

export const C = {
  add(a: Complex, b: Complex): Complex {
    return { re: a.re + b.re, im: a.im + b.im };
  },

  multiply(a: Complex, b: Complex): Complex {
    return {
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re,
    };
  },

  magnitudeSq(a: Complex): number {
    return a.re * a.re + a.im * a.im;
  },

  toString(a: Complex, precision = 3): string {
    const re = a.re.toFixed(precision);
    const im = a.im.toFixed(precision);
    if (Math.abs(a.im) < 1e-9) {
      return re;
    }
    if (Math.abs(a.re) < 1e-9) {
      return `${im}i`;
    }
    const sign = a.im > 0 ? '+' : '-';
    return `${re} ${sign} ${Math.abs(Number(im))}i`;
  }
};
