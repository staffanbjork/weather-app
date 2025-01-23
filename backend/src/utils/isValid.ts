const regExes: {[key: string]: RegExp} = {
  locality: /^[A-ZÅÄÖ][a-zåäö]+$/,
  longitude: /^(?:[1][0-9]|[2][0-4])(?:\.[0-9]{2,10})$/, // 10.00-24.99
  latitude: /^(?:[5][5-9]|[6][0-9])(?:\.[0-9]{2,10})$/, //55.00-69.99
};


  export default function isValid(varName: string, value: string) {
    return regExes[`${varName}`].test(value)
  }