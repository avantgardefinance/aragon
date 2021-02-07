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

  methodParams = ['address[]']

  methodArgs = [
    [
      '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b', // DPI
      '0xed91879919b71bb6905f23af0a68d231ecf87b14', // DMG
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
