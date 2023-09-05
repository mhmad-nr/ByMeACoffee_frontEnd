import { ethers } from "ethers";
import { toast } from "react-toastify"
import { abi as bmaContractABI, address as bmaContractAddress } from "./contracts/buyMeACoffee.json";
import { abi as personContractABI } from "./contracts/Person.json";
export const rString = (str: string, max: number) => str.substring(0, max) + "..." + str.substring(str.length - max)
export const sameMembers = (firstArray: any[], secondArray: any[]) => {
    const containsAll = (first: any[], second: any[]) =>
        second.every(secondItem => first.includes(secondItem))

    return containsAll(firstArray, secondArray) && containsAll(secondArray, firstArray);
}
export const isValidAddress = (address: string): boolean => {
    const isAddress = ethers.utils.isAddress(address)
    if (!isAddress) return false
    const isZero = ethers.constants.AddressZero == address
    if (isZero) return false
    return true
}
type TypeContractProvider = {
    signerAddress: string,
    contractAddress: string,
    contractABI: any[]
}

export const contractProvider = async ({ signerAddress, contractAddress, contractABI }: TypeContractProvider) => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner(signerAddress)
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    return { signer, contract, provider }
}
export const personContractFactory = async (signerAddress: string, contractAddress: string) => {
    return await contractProvider({
        contractABI: personContractABI,
        contractAddress,
        signerAddress
    })
}
export const buyMeACoffeeContractFactory = async (signerAddress: string) => {
    return await contractProvider({
        contractABI: bmaContractABI,
        contractAddress: bmaContractAddress,
        signerAddress
    })
}

export const listenForEmitEvent = async (contract: ethers.Contract, eventName: string): Promise<any> => {
    return new Promise<any>((resolve) => {
        contract.on(eventName, resolve)
    })
}

export const listenForTransactionMine = async (transactionResponse: any, provider: ethers.providers.Web3Provider): Promise<any> => {
    return new Promise(() => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Mined in ${transactionReceipt.blockHash} successfully`);
        })
    })
}
export const saveToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast('Copied in clipboard', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export function concat<T>(one: T[], two: T[]): T[] {
    const c = one.concat(two)
    return c.filter((item, pos) => c.indexOf(item) === pos)
}