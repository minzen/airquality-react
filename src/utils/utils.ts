export const timestampToDate = (ts: number): string => {
  if (ts) {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(ts)
  }
  return ''
}
