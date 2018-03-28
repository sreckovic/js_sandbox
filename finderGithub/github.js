class Github {
  constructor() {
    this.clientId = '1217de777fa01fb35cb0';
    this.clientSecret = 'a8f53b47498f2698d83273afc3a160fbff8d7261';
    this.reposCount = 5;
    this.reposSort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${
        this.clientId
      }&client_secret=${this.clientSecret}`
    );

    const reposResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${
        this.reposCount
      }&sort=${this.reposSort}&client_id=${this.clientId}&client_secret=${
        this.clientSecret
      }`
    );

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return {
      profile: profile,
      //profile,
      repos: repos
    };
  }
}
