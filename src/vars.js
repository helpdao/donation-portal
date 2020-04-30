export const currentNetwork = process.env.REACT_APP_ETH_NETWORK || 'rinkeby';

export const vars = {
  rinkeby: {
    chainId: 4,
    fortmatic: 'pk_test_701389F30161C509',
    templateFactory: '0xd0798582fb6d2a2e7fdb562868e28798d59d0c48',
    agentAppId: '0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a',
    daiAddress: '0x2448eE2641d78CC42D7AD76498917359D961A783'
  },
  mainnet: {
    chainId: 1,
    fortmatic: 'pk_live_6A088B7CE1848C16',
    templateFactory: '0xab5a11b8ad1276e8d079a771fc8eaa17fb3d263d',
    daiAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
  }
}