


export default class ParseLocalTime {
  timeZoneOffset: number;

  constructor() {
    this.timeZoneOffset = 1;
  }


  /**
   * Get last sunday of any given month.
   * @param year 
   * @param month 
   * @returns The last sunday of given month at 03.00.
   */
  #getLastSundayOfMonth(year: number, month: number) {
    const date = new Date(Date.UTC(year, month, 0));
    date.setUTCDate(date.getUTCDate() - date.getUTCDay());
    date.setUTCHours(3);
    return date;
  }

  /**
   * Calculates the timezone offset depending on DST.
   * @param dateString 
   * @returns Time offset in hours, 1 for CET and 2 for DST.
   */
  #calcTimezoneOffset(dateString: string) {
    const date = new Date(dateString);
    const dstStart = this.#getLastSundayOfMonth(
      date.getUTCFullYear(),
      3
    );
    const dstEnd = this.#getLastSundayOfMonth(
      date.getUTCFullYear(),
      10
    );
    return date >= dstStart && date <= dstEnd ? 2 : 1;
  }

  /**
   * Checks dateTime string, if dates far enough from start or end of DST
   * then set offset otherwise calculate exact start/end of DST.
   * @param dateString 
   * @returns Timezone offset in hours, 1 or 2 for DST.
   */
  #getOffset(dateString: string) {
    const month = Number(dateString.slice(5, 7));
    const day = Number(dateString.slice(8, 10));
    if ((month >= 4 && month < 10) || (month === 10 && day < 24)) {
      return 2;
    } else if (month < 3 || (month === 3 && day < 24) || month > 10) {
      return 1;
    } else {
      return this.#calcTimezoneOffset(dateString);
    }
  }

  /**
   * Parse UTC date to swedish local time taking DST in to account.
   * @param dateString 
   * @returns Object with month, day, and hour.
   */
  parseLocalDateTime(dateString: string) {
    const year = Number(dateString.slice(0, 4));
    const month = Number(dateString.slice(5, 7));
    const day = Number(dateString.slice(8, 10));
    const hour = dateString.slice(11, 13).startsWith("0")
      ? Number(dateString.slice(12, 13))
      : Number(dateString.slice(11, 13));
    
    this.timeZoneOffset = this.#getOffset(dateString);

    const dateTime = new Date(Date.UTC(year, month - 1, day, hour));
    dateTime.setUTCHours(dateTime.getUTCHours() + this.timeZoneOffset - 1);

    return {
      month: dateTime.getUTCMonth() + 1,
      day: dateTime.getUTCDate(),
      hour: dateTime.getUTCHours(),
    };
  }

  /**
   * Parse solar time in minutes to normal time format.
   * @param minutes 
   * @returns String in HH:MM format.
   */
  parseSolarTimeToString(minutes: number) {
    if (minutes >= 0 && minutes < 1440) {
      const floatHour = minutes / 60.0;
      let hour = Math.floor(floatHour);
      const floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
      let minute = Math.floor(floatMinute);
      const floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
      let second = Math.floor(floatSec + 0.5);
      if (second >= 30) {
        minute += 1;
      }
      if (minute > 59) {
        minute = 0;
        hour += 1;
      }
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    }
  }
}