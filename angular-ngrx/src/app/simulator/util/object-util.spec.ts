import { ObjectUtil } from './object-util';

describe('ObjectUtil', () => {
  it('Should get object property', () => {
    const source = {
      prop1: {
        prop2: 'some prop',
      },
    };
    const result = ObjectUtil.getObjectKeyValue<string>(source, ['prop1', 'prop2']);

    expect(result).toBe('some prop');
  });

  it('Should clone object', () => {
    const source = {
      a: [],
      b: 1,
      c: 1.3,
      d: 'asd',
    };
    const result = ObjectUtil.clone(source);

    expect(result).toEqual(source);
  });

  it('Should set object property', () => {
    const data = {
      a: {
        b: {
          c: 'q'
        }
      }
    }

    let newdata = ObjectUtil.setObjectPropertyValue(ObjectUtil.clone(data), ['a'], 3);

    expect(newdata.a).toEqual(3);

    newdata = ObjectUtil.setObjectPropertyValue(ObjectUtil.clone(data), ['a', 'b'], 3);

    expect(newdata.a.b).toEqual(3);

    newdata = ObjectUtil.setObjectPropertyValue(ObjectUtil.clone(data), ['a', 'b', 'c'], 3);

    expect(newdata.a.b.c).toEqual(3);

    newdata = ObjectUtil.setObjectPropertyValue(ObjectUtil.clone(data), ['a', 'b', 'c', 'd'], 3);

    expect(newdata.a.b.c.d).toEqual(3);
  });
});
