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

  methodName = 'registerAsset'
  methodParams = [
    'address',
    'string',
    'string',
    'string',
    'uint256',
    'uint256[]',
    'bytes4[]',
  ]
  methodArgs = [
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    'Uniswap',
    'UNI',
    '',
    '1000000000000000000',
    [],
    [],
  ]

  const methodSignature = methodParams
    ? `${methodName}(${methodParams.join(',')})`
    : `${methodName}()`

  const encodedFunctionCall = encodeFunctionCallFromSignature(
    methodSignature,
    methodArgs
  )

  console.log(encodedFunctionCall)

  const path = await wrapper.getTransactionPath(
    selectedAgentInstance,
    'execute(address,uint256,bytes)',
    [targetAddress, ethAmount, encodedFunctionCall]
  )
  return path
}
