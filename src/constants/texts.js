export default {
  enterNameError: 'Please enter a name',
  codeVerifError: 'Code must have 4 digits',

  createGame: 'Create Game',
  joinGame: 'Join Game',
  continueGame: 'Continue Last Game',
  bringSoldiers: 'Bring Soldiers',
  dropSoldiers: 'Drop Soldiers',
  trainSoldiers: 'Train Soldiers',

  trainSoldiersInfo:
    'Be careful, training soldiers decreases the population. Try to keep them balanced',
  bringSoldiersInfo:
    "These soldiers come everywhere with you. Don't let your properties vulnerable",
  dropSoldiersInfo: 'Leave your soldiers home to keep your frontiers safe.',
  attackInfo:
    'Victory shall be yours, if your army is the strongest. Your soldiers will fight to the last one of them',
  buyPropertyInfo: 'Expand your domain! Dominate them all',
  buyFactoryInfo: (revenue) => `Be the wealthiest living soul. It generates ${revenue}$ per day`,

  buyFactory: (price) => `Buy Factory (${price}$)`,
  buyProperty: (price) => `Buy Property (${price}$)`,

  buyPropertySuccess: "You're getting stronger",
  trainSoldiersSuccess: 'Your defence almost impenetrable',
  buyFactorySuccess: 'Lemme see teh moneh',
  lose: 'Your army is good of nothing, you fool!',
  win: (soldiers) => `Very impresive! There are ${soldiers} worriors still alive`,
};
