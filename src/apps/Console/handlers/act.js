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
  methodName = 'addDerivatives'

  // methodParams = [
  //   'address',
  //   'string',
  //   'string',
  //   'string',
  //   'uint256',
  //   'uint256[]',
  //   'bytes4[]',
  // ]
  methodParams = ['address[]', 'address[]']

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
  methodArgs = [
    ['0x88D97d199b9ED37C29D846d00D443De980832a22'],
    ['0x9177a3354ee50bffbcc42c4c6bac27ed63979097'],
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
