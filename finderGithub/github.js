class Github {
  constructor() {
    this.clientId = '1217de777fa01fb35cb0';
    this.clientSecret = 'a8f53b47498f2698d83273afc3a160fbff8d7261';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${
        this.clientId
      }&client_secret=${this.clientSecret}`
    );

    const profile = await profileResponse.json();

    return {
      //profile: profile
      profile
    };
  }
}
