export default (): any => {
  return {
    tsnameof: <T>(func?: (obj: T) => any): string => nameof<T>(func)
  }
}