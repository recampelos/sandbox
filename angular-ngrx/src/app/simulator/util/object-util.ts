export const ObjectUtil = {
  /**
   * Gets property key from object.
   *
   * @param obj configuration obj
   * @param keyParts configuration key parts
   * @return configuration value
   */
  getObjectKeyValue<T>(obj: any, keyParts: string[]): T {
    const value: T = ObjectUtil.getObjectValue<T>(obj, keyParts[0]);

    if (keyParts.length === 1 || !value) {
      return value;
    } else {
      keyParts.splice(0, 1);
      return ObjectUtil.getObjectKeyValue<T>(value, keyParts);
    }
  },

  /**
   * Gets property key from object.
   *
   * @param obj object where to get the propperty value
   * @param property property to retreave from object
   * @param <T> value type
   * @return object property value
   */
  getObjectValue<T>(obj: any, property: string): T {
    return obj ? obj[property] : obj;
  },

  /**
   * Deep clone of a object.
   *
   * @param obj object to clone
   * @param <T> object type
   */
  clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  },

  setObjectPropertyValue(obj: any, keyParts: string[], propValue: any): any {
    const objToProcess = {...obj}
    const keyParteProcess = [...keyParts];
    const propName = keyParteProcess[0];
    let value: any = ObjectUtil.getObjectValue(objToProcess, propName);

    if (keyParteProcess.length === 1) {
      objToProcess[propName] = propValue;
    } else if (!value || typeof value !== 'object' ) {
      value = {};
    }

    if (keyParteProcess.length > 1) {
      keyParteProcess.splice(0, 1)
      objToProcess[propName] = ObjectUtil.setObjectPropertyValue(value, keyParteProcess, propValue);
    }

    return obj;
  }
};
