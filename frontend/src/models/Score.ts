export interface Score {
  type: 'result' | 'name',
  name: string,
  score?: number
}