export const formatDateTime = {
  filters: {
    formatDateTime(val, separator = '-') {
      if (!val) return ''
      const dateTime = new Date(val)
      const year = dateTime.getFullYear()
      const month = `${dateTime.getMonth() + 1}`.padStart(2, '0')
      const date = `${dateTime.getDate()}`.padStart(2, '0')
      return `${year}${separator}${month}${separator}${date}`
    }
  }
}
