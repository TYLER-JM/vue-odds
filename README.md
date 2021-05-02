# Vue Odds

- At the moment, this is turning into a command line interface that writes sports betting odds returned from [this hockey api](https://api-sports.io/documentation/hockey/v1) into a personal google spreadsheeet.
- Eventually I'll move the functionality to a browser using Vue. Where various odds for games will be displayed in tables according to a user's selections


## Setup

1. Store Api credentials at `/private/api_headers.json` (where the `private` directory is at the root of the project): 

```
{
  "x-rapidapi-key": "SECRET_KEY",
  "x-rapidapi-host": "SECRET_HOST"
}
```

2. run `node start.js` in the command line, and make selections based on the prompts

3. *currently, only bet types **'Three Way'**, **'Moneyline'**, and **'Total'** are functioning. And only a sample set of data are being used

