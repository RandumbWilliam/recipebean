import { describe, expect, it } from 'vitest'
import { parse } from './ingredient-parser'

describe('ingredient parser', () => {
  describe('quantity', () => {
    it('null', () => {
      const ingredientStr = 'c salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: null,
          unit: 'cup',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('zero', () => {
      const ingredientStr = '0 pt salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 0,
          unit: 'pint',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('single digit', () => {
      const ingredientStr = '1 quart salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1,
          unit: 'quart',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('multi digit', () => {
      const ingredientStr = '2000 gal salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 2000,
          unit: 'gallon',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('leading zeros', () => {
      const ingredientStr = '0001 tbsp salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1,
          unit: 'tablespoon',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('fractions', () => {
      const ingredientStr = '1/2 tsp salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1 / 2,
          unit: 'teaspoon',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('mixed fractions', () => {
      const ingredientStr = '2 1/3 ml salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 2 + (1 / 3),
          unit: 'milliliter',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('mixed fractions with \'&\'', () => {
      const ingredientStr = '2&1/3 liter salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 2 + (1 / 3),
          unit: 'liter',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('mixed fractions with \'And\'', () => {
      const ingredientStr = '2 And 1/3 oz salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 2 + (1 / 3),
          unit: 'ounce',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('unicode fractions', () => {
      const ingredientStr = '¾g salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 3 / 4,
          unit: 'gram',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('unicode mixed fractions', () => {
      const ingredientStr = '1⅔kg salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1 + 2 / 3,
          unit: 'kilogram',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('decimal', () => {
      const ingredientStr = '0.5 in salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 0.5,
          unit: 'inch',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('decimal no leading zeros', () => {
      const ingredientStr = '.75 cm salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 0.75,
          unit: 'centimeter',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })

    it('decimal trailing zeros', () => {
      const ingredientStr = '1.00 pinch salt'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1,
          unit: 'pinch',
        },
        convertedMeasurements: [],
        product: 'salt',
        notes: null,
      })
    })
  })

  describe('conversion measurements', () => {
    it('single conversion', () => {
      const ingredientStr = '1 cup (200g) dark brown sugar'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1,
          unit: 'cup',
        },
        convertedMeasurements: [{
          quantity: 200,
          unit: 'gram',
        }],
        product: 'dark brown sugar',
        notes: null,
      })
    })

    it('multi conversion', () => {
      const ingredientStr = '1 cup (2 sticks; 200g, 6 ounce) dark brown sugar'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 1,
          unit: 'cup',
        },
        convertedMeasurements: [{
          quantity: 2,
          unit: 'stick',
        }, {
          quantity: 200,
          unit: 'gram',
        }, {
          quantity: 6,
          unit: 'ounce',
        }],
        product: 'dark brown sugar',
        notes: null,
      })
    })
  })

  describe('unit', () => {
    it('null', () => {
      const ingredientStr = '4 chicken breasts'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 4,
          unit: null,
        },
        convertedMeasurements: [],
        product: 'chicken breasts',
        notes: null,
      })
    })

    it('null with conversion measurment', () => {
      const ingredientStr = '4 (6 ounce) boneless skinless chicken breasts'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 4,
          unit: null,
        },
        convertedMeasurements: [{
          quantity: 6,
          unit: 'ounce',
        }],
        product: 'boneless skinless chicken breasts',
        notes: null,
      })
    })

    it('fluid ounces', () => {
      const ingredientStr = '12 fluid ounces chicken stock'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 12,
          unit: 'fluid ounce',
        },
        convertedMeasurements: [],
        product: 'chicken stock',
        notes: null,
      })
    })
  })

  describe('product & notes', () => {
    it('no quantity & unit', () => {
      const ingredientStr = 'chicken breasts, large'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: null,
          unit: null,
        },
        convertedMeasurements: [],
        product: 'chicken breasts',
        notes: 'large',
      })
    })

    it('notes with comma', () => {
      const ingredientStr = '2 lb russet potatoes, peeled, sliced 1/2" thick'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 2,
          unit: 'pound',
        },
        convertedMeasurements: [],
        product: 'russet potatoes',
        notes: 'peeled, sliced 1/2" thick',
      })
    })

    it('notes with parenthesis', () => {
      const ingredientStr = '12 ounces boneless skinless chicken breast (or thighs)'
      const ingredient = parse(ingredientStr)
      expect(ingredient).toEqual({
        measurement: {
          quantity: 12,
          unit: 'ounce',
        },
        convertedMeasurements: [],
        product: 'boneless skinless chicken breast',
        notes: '(or thighs)',
      })
    })
  })
})
