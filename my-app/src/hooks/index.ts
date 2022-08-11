import { ethers } from 'ethers';
import { tokenContractAddress } from "c:/Users/vassi/Desktop/internship tasks/my-app/src/contracts/index";
import TokenABI from "../hooks/TokenABI";


const simpleContractInterface = new ethers.utils.Interface(tokenContractAddress);


export function useTransaction(){
    
}