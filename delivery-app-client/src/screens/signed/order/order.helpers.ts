export class OrderHelper {
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  calcDistanceAsKm(...args: [number, number, number, number]) {
    const [lat1, lon1, lat2, lon2] = args;

    const R = 6371;

    const latitude = this.deg2rad(lat2 - lat1);
    const longitude = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(latitude / 2) * Math.sin(latitude / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(longitude / 2) *
        Math.sin(longitude / 2);

    const circle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * circle;
    return distance;
  }
}

export const orderHelper = new OrderHelper();
