export const GAUGE_SETTINGS = {
  VIEW_BOX_SIZE_PX: 100,
  TRACK_WIDTH_PX: 12,
  TRACK_COLOR: `rgba(0, 131, 255, 0.2)`,
  TRACK_SIZE_DEGREES: 280,
  TRACK_FILL_PERCENT() {
    return this.TRACK_SIZE_DEGREES / 360;
  },
  VIEW_BOX_PX() {
    return `0 0 ${this.VIEW_BOX_SIZE_PX} ${this.VIEW_BOX_SIZE_PX}`;
  },
  RADIUS() {
    return this.VIEW_BOX_SIZE_PX / 2 - this.TRACK_WIDTH_PX / 2;
  },
  CIRCUMFERENCE() {
    return 2 * Math.PI * this.RADIUS();
  },
  CXY() {
    return this.VIEW_BOX_SIZE_PX * 0.5;
  },
  DASH_ARRAY() {
    return this.CIRCUMFERENCE();
  },
  TRACK_DASH_ARRAY() {
    return this.CIRCUMFERENCE();
  },
  STROKE_COLOR(variant: string, value: number) {
    return variant === "humidity"
      ? this.COLORS.HUMIDITY.COLOR(value)
      : this.COLORS.PRESSURE.COLOR(value);
  },
  TRACK_FILL_PERCENTAGE() {
    return this.TRACK_SIZE_DEGREES / 360;
  },
  TRACK_DASH_OFFSET() {
    return this.CIRCUMFERENCE() * (1 - this.TRACK_FILL_PERCENTAGE());
  },
  TRACK_TRANSFORM() {
    return `rotate(${
      -(this.TRACK_SIZE_DEGREES / 2) - 90
    }, ${this.CXY()}, ${this.CXY()})`;
  },
  HUMIDITY_VALUE_PERCENTAGE(value: number) {
    return (value / 100) * this.TRACK_FILL_PERCENTAGE();
  },
  PRESSURE_STROKE_RATE(value: number) {
    return (value = value < 950 ? 950 : value > 1050 ? 1050 : value);
  },
  PRESSURE_VALUE_PERCENTAGE(value: number) {
    return (
      (Math.floor(this.PRESSURE_STROKE_RATE(value) - 950) / 100) *
      this.TRACK_FILL_PERCENTAGE()
    );
  },
  VALUE_PERCENTAGE(value: number, variant: string) {
    if (variant === "humidity") {
      return this.HUMIDITY_VALUE_PERCENTAGE(value);
    } else {
      return this.PRESSURE_VALUE_PERCENTAGE(value);
    }
  },
  VALUE_DASH_OFFSET(variant: string, value: number) {
    return this.CIRCUMFERENCE() * (1 - this.VALUE_PERCENTAGE(value, variant));
  },
  COLORS: {
    HUMIDITY: {
      BASE: 100,
      RATE(value: number) {
        return value / 100;
      },
      H: 204,
      S(value: number) {
        return this.BASE * this.RATE(value);
      },
      L: 50,
      A: 0.8,
      COLOR(value: number) {
        return `hsla(${this.H}, ${this.S(value)}%, ${this.L}%, ${this.A})`;
      },
    },
    PRESSURE: {
      BASE: 74,
      RATE(value: number) {
        value = value < 950 ? 950 : value > 1050 ? 1050 : value;
        return (100 - (value - 950)) / 100;
      },
      H(value: number) {
        return this.BASE * this.RATE(value);
      },
      S: 50,
      L: 50,
      A: 1.0,
      COLOR(value: number) {
        return `hsla(${this.H(value)}, ${this.S}%, ${this.L}%, ${this.A})`;
      },
    },
  },
};
