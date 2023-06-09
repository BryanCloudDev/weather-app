class GeoLocationService {

  private getLocation() {
    return new Promise<GeolocationCoordinates>(( resolve, reject ) => {
      if (!navigator.geolocation) {
        reject(new GeolocationPositionError());
      }

      navigator.geolocation.getCurrentPosition(
        ( position ) => resolve(position.coords),
        ( error ) => reject(error)
      );
    });
  }

  async getUserLocation() {
    const userConsent = confirm("¿Permites que se acceda a tu ubicación para proporcionarte informacion del clima?");
    if (userConsent) {
      const { latitude, longitude } = await this.getLocation();

      return {
        latitude,
        longitude
      }
    }

    return {
      latitude: 0,
      longitude: 0
    }
  }
}


export { GeoLocationService };