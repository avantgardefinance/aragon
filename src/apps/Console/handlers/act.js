import { parseMethodCall } from '../console-utils'
import { encodeFunctionCallFromSignature } from '../web3-encoding-utils'

export default async function actHandler(params, { wrapper }) {
  const [
    selectedAgentInstance,
    targetAddress,
    methodWithArgs,
    ethAmount = '0',
  ] = params
  let [methodName, methodParams, methodArgs] = parseMethodCall(methodWithArgs)

  // methodName = 'registerAsset'
  // methodName = 'addDerivatives'
  // methodName = 'addAllowedMakers'
  // methodName = 'registerAdapters'
  // methodName = 'addPrimitives'

  // methodParams = [
  //   'address',
  //   'string',
  //   'string',
  //   'string',
  //   'uint256',
  //   'uint256[]',
  //   'bytes4[]',
  // ]
  // methodParams = ['address[]', 'address[]']
  methodParams = ['address[]', 'address[]', 'uint8[]']

  // methodArgs = [
  //   '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  //   'Uniswap',
  //   'UNI',
  //   '',
  //   '1000000000000000000',
  //   [],
  //   [],
  // ]

  // methodArgs = [
  //   '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
  //   'Aragon Network Token (v2)',
  //   'ANTv2',
  //   '',
  //   '1000000000000000000',
  //   [],
  //   [],
  // ]
  // methodArgs = [
  //   ['0x88D97d199b9ED37C29D846d00D443De980832a22'],
  //   ['0x9177a3354ee50bffbcc42c4c6bac27ed63979097'],
  // ]
  // methodArgs = [
  //   [
  //     '0x56178a0d5F301bAf6CF3e1Cd53d9863437345Bf9',
  //     '0xe0238DA09Cab56B3066F26F98657DccE801c16B9',
  //   ],
  // ]
  methodArgs = [
    [
      '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55', // BAND
      '0x4688a8b1F292FDaB17E9a90c8Bc379dC1DBd8713', // COVER
      '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b', // DPI
      '0x584bC13c7D411c00c01A62e8019472dE68768430', // HEGIC
      '0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26', // OGN
      '0x0258F474786DdFd37ABCE6df6BBb1Dd5dfC4434a', // ORN
      '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', // SUSHI
    ],
    [
      '0x919C77ACc7373D000b329c1276C76586ed2Dd19F', // BAND / USD
      '0x0ad50393F11FfAc4dd0fe5F1056448ecb75226Cf', // COVER / USD
      '0xD2A593BF7594aCE1faD597adb697b5645d5edDB2', // DPI / USD
      '0xBFC189aC214E6A4a35EBC281ad15669619b75534', // HEGIC / USD
      '0x2c881B6f3f6B5ff6C975813F87A4dad0b241C15b', // OGN / ETH
      '0xbA9B2a360eb8aBdb677d6d7f27E12De11AA052ef', // ORN / ETH
      '0xe572CeF69f43c2E488b33924AF04BDacE19079cf', // SUSHI / ETH
    ],
    ['1', '1', '1', '1', '0', '0', '0'],
  ]

  const methodSignature = methodParams
    ? `${methodName}(${methodParams.join(',')})`
    : `${methodName}()`

  const encodedFunctionCall = encodeFunctionCallFromSignature(
    methodSignature,
    methodArgs
  )

  const path = await wrapper.getTransactionPath(
    selectedAgentInstance,
    'execute(address,uint256,bytes)',
    [targetAddress, ethAmount, encodedFunctionCall]
  )
  return path
}
