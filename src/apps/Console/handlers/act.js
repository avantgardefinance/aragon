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

  methodParams = ['address[]', 'address[]']

  methodArgs = [
    [
      '0x67B66C99D3Eb37Fa76Aa3Ed1ff33E8e39F0b9c7A', // ibETH
      '0xDFe66B14D37C77F4E9b180cEb433d1b164f0281D', // stETH
    ],
    [
      '0x5f2E2E7FfbcAeE69d570D531A00228322632231E', // AlphaHomoraV1PriceFeed
      '0xE2B19FA2D662F4eEA51D394b71Ce7281214840C5', // StakehoundETHPriceFeed
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
