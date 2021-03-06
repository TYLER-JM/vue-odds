
class Game {
  constructor(props) {
    this.name = props.name,
    this.range = props.range,
    this.data = props.data,
    this.indexAway = props.indexAway
    this.indexHome = props.indexHome,
    this.setTotals = function(game) {
      this.data[1][0] = (game.teams[this.indexAway]);
      this.data[2][0] = (game.teams[this.indexHome]);
      this.data[1].push('Over');
      this.data[2].push('Under');
      game.sites.forEach(site => {
        this.data[0].push(`${site.site_nice} (${site.odds.totals.points[0]})`);
        this.data[1].push(Number(site.odds.totals.odds[0]).toFixed(2));
        this.data[2].push(Number(site.odds.totals.odds[1]).toFixed(2));
      });
    },
    this.setSpreads = function(game) {
      this.data[1][0] = (game.teams[this.indexAway]);
      this.data[2][0] = (game.teams[this.indexHome]);
      this.data[1].push(game.sites[0].odds.spreads.points[this.indexAway]);
      this.data[2].push(game.sites[0].odds.spreads.points[this.indexHome]);
      game.sites.forEach(site => {
        this.data[0].push(`${site.site_nice} (${site.odds.spreads.points[this.indexAway]})`);
        this.data[1].push(Number(site.odds.spreads.odds[this.indexAway]).toFixed(2));
        this.data[2].push(Number(site.odds.spreads.odds[this.indexHome]).toFixed(2));
      });
    },
    this.setMoneyline = function(game) {
      this.data[1].push(game.teams[this.indexAway]);
      this.data[2].push(game.teams[this.indexHome]);
      game.sites.forEach(site => {
        this.data[0].push(site.site_nice);
        this.data[1].push(Number(site.odds.h2h[this.indexAway]).toFixed(2))
        this.data[2].push(Number(site.odds.h2h[this.indexHome]).toFixed(2))
      });
    }
  }
}

module.exports = Game;
