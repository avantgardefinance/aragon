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
  methodName = 'registerAdapters'

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
  methodParams = ['address[]']

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
      '0x56a1892b2276bbb9968d1b5aa0000a71bf0fa7b8',
      '0x4205073e7AD2F9896F827DBCe496dd2306DB602e',
      '0xD050DC9E75f24Ae653d282D0cFb772871729e710',
      '0x972318a0f4935c3153a2AA4c81274DfF621B360b',
      '0x963E9C15a26d74085ABfC8B48280b650426F998e',
    ],
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
