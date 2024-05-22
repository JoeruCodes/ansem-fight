import { PublicKey} from "@solana/web3.js";

export function validateSolAddress(address){
    try{
        const pubkey = new PublicKey(address);
        const isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
        return isSolana
    }catch (err){
        return false
    }
}